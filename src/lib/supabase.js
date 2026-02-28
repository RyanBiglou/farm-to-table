import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Using static data.');
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Fetch all farms
export async function getFarms() {
  if (!supabase) return null;
  
  const { data, error } = await supabase
    .from('farms')
    .select('*')
    .order('distance', { ascending: true });
  
  if (error) {
    console.error('Error fetching farms:', error);
    return null;
  }
  
  // Transform to match existing data structure
  return data.map(farm => ({
    id: farm.id,
    name: farm.name,
    owner: farm.owner,
    description: farm.description,
    shortDescription: farm.short_description,
    location: farm.location,
    distance: farm.distance,
    rating: parseFloat(farm.rating),
    reviewCount: farm.review_count,
    established: farm.established,
    image: farm.image,
    coverImage: farm.cover_image,
    specialties: farm.specialties || [],
    certifications: farm.certifications || [],
    practices: farm.practices || []
  }));
}

// Fetch single farm by ID
export async function getFarmById(id) {
  if (!supabase) return null;
  
  const { data, error } = await supabase
    .from('farms')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching farm:', error);
    return null;
  }
  
  return {
    id: data.id,
    name: data.name,
    owner: data.owner,
    description: data.description,
    shortDescription: data.short_description,
    location: data.location,
    distance: data.distance,
    rating: parseFloat(data.rating),
    reviewCount: data.review_count,
    established: data.established,
    image: data.image,
    coverImage: data.cover_image,
    specialties: data.specialties || [],
    certifications: data.certifications || [],
    practices: data.practices || []
  };
}

// Fetch all products
export async function getProducts() {
  if (!supabase) return null;
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('name', { ascending: true });
  
  if (error) {
    console.error('Error fetching products:', error);
    return null;
  }
  
  return data.map(product => ({
    id: product.id,
    farmId: product.farm_id,
    name: product.name,
    description: product.description,
    price: parseFloat(product.price),
    unit: product.unit,
    category: product.category,
    image: product.image,
    inStock: product.in_stock,
    organic: product.organic
  }));
}

// Fetch products by farm ID
export async function getProductsByFarmId(farmId) {
  if (!supabase) return null;
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('farm_id', farmId);
  
  if (error) {
    console.error('Error fetching products:', error);
    return null;
  }
  
  return data.map(product => ({
    id: product.id,
    farmId: product.farm_id,
    name: product.name,
    description: product.description,
    price: parseFloat(product.price),
    unit: product.unit,
    category: product.category,
    image: product.image,
    inStock: product.in_stock,
    organic: product.organic
  }));
}

// Fetch orders for the current user (requires authenticated session)
export async function getOrdersByUserId(userId) {
  if (!supabase || !userId) return [];
  
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
  
  return (data || []).map(order => ({
    id: order.id,
    stripeSessionId: order.stripe_session_id,
    customerEmail: order.customer_email,
    customerName: order.customer_name,
    items: order.items || [],
    subtotal: order.subtotal ? parseFloat(order.subtotal) : 0,
    tax: order.tax ? parseFloat(order.tax) : 0,
    total: order.total ? parseFloat(order.total) : 0,
    status: order.status,
    createdAt: order.created_at,
  }));
}

// Create an order
export async function createOrder(orderData) {
  if (!supabase) return null;
  
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating order:', error);
    return null;
  }
  
  return data;
}

