import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

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
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Stripe is not configured' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseServiceKey) {
    return res.status(500).json({ error: 'Database is not configured' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization required' });
  }

  const token = authHeader.replace('Bearer ', '');
  const { session_id } = req.body;

  if (!session_id || typeof session_id !== 'string') {
    return res.status(400).json({ error: 'session_id is required' });
  }

  try {
    const supabaseAuth = createClient(supabaseUrl, process.env.SUPABASE_ANON_KEY);
    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser(token);

    if (authError || !user) {
      return res.status(401).json({ error: 'Invalid or expired session' });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });
    const stripeSession = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items'],
    });

    if (stripeSession.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    const sessionEmail = stripeSession.customer_details?.email || stripeSession.customer_email;
    if (sessionEmail && sessionEmail.toLowerCase() !== (user.email || '').toLowerCase()) {
      return res.status(403).json({ error: 'Session does not match user' });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: existing } = await supabase
      .from('orders')
      .select('id')
      .eq('stripe_session_id', session_id)
      .single();

    if (existing) {
      return res.status(200).json({ success: true, orderId: existing.id });
    }

    const lineItems = stripeSession.line_items?.data || [];
    const items = lineItems.map((li) => ({
      product_name: li.description || 'Product',
      quantity: li.quantity,
      price: li.amount_total ? li.amount_total / 100 : 0,
    }));

    const total = stripeSession.amount_total ? stripeSession.amount_total / 100 : 0;
    const subtotal = stripeSession.amount_subtotal ? stripeSession.amount_subtotal / 100 : total;

    const { data: order, error: insertError } = await supabase
      .from('orders')
      .insert({
        stripe_session_id: session_id,
        user_id: user.id,
        customer_email: user.email,
        customer_name: stripeSession.customer_details?.name || user.user_metadata?.full_name || null,
        items,
        subtotal,
        tax: total - subtotal,
        total,
        status: 'paid',
      })
      .select('id')
      .single();

    if (insertError) {
      console.error('Order insert error:', insertError);
      return res.status(500).json({ error: 'Failed to save order' });
    }

    return res.status(200).json({ success: true, orderId: order.id });
  } catch (err) {
    console.error('create-order-from-session error:', err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}
