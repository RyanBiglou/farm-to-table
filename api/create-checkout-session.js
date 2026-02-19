import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const MAX_ITEMS = 50;
const MAX_QUANTITY = 99;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,https://farm-to-tablevercel.vercel.app').split(',').map(s => s.trim());

function getCorsOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return ALLOWED_ORIGINS[0] || '*';
  return ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0] || null;
}

export default async function handler(req, res) {
  const corsOrigin = process.env.NODE_ENV === 'production' ? getCorsOrigin(req) : (req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Origin', corsOrigin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY is not set');
    return res.status(500).json({ error: 'Stripe is not configured' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY) must be set');
    return res.status(500).json({ error: 'Checkout is not configured' });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0 || items.length > MAX_ITEMS) {
      return res.status(400).json({ error: 'Invalid or too many items' });
    }

    const productIds = [...new Set(items.map(i => i.productId).filter(Boolean))];
    if (productIds.length === 0) {
      return res.status(400).json({ error: 'Each item must include productId' });
    }

    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, name, price, in_stock')
      .in('id', productIds);

    if (productsError || !products?.length) {
      return res.status(400).json({ error: 'Invalid products' });
    }

    const productMap = Object.fromEntries(products.map(p => [p.id, p]));
    const lineItems = [];
    for (const item of items) {
      const productId = Number(item.productId);
      const product = productMap[productId];
      if (!product) continue;
      const qty = Math.min(MAX_QUANTITY, Math.max(1, parseInt(item.quantity, 10) || 1));
      if (product.in_stock === false) continue;
      const priceCents = Math.round(Number(product.price) * 100);
      if (!Number.isFinite(priceCents) || priceCents < 1) continue;
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: { name: String(product.name).slice(0, 500) },
          unit_amount: priceCents,
        },
        quantity: qty,
      });
    }

    if (lineItems.length === 0) {
      return res.status(400).json({ error: 'No valid line items' });
    }

    const origin = (req.headers.origin && ALLOWED_ORIGINS.includes(req.headers.origin))
      ? req.headers.origin
      : (ALLOWED_ORIGINS[0] || 'https://farm-to-tablevercel.vercel.app');
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      ui_mode: 'embedded',
      return_url: `${origin}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
    });

    return res.status(200).json({ clientSecret: session.client_secret });
  } catch (error) {
    console.error('Stripe error:', error);
    return res.status(500).json({ error: error.message });
  }
}
