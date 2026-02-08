-- Create farms table
CREATE TABLE farms (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  owner TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  location TEXT,
  distance INTEGER,
  rating DECIMAL(2,1) DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,
  established INTEGER,
  image TEXT,
  cover_image TEXT,
  specialties TEXT[],
  certifications TEXT[],
  practices TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  farm_id INTEGER REFERENCES farms(id),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  unit TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT,
  in_stock BOOLEAN DEFAULT true,
  organic BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  stripe_session_id TEXT UNIQUE,
  customer_email TEXT,
  customer_name TEXT,
  shipping_address JSONB,
  items JSONB NOT NULL,
  subtotal DECIMAL(10,2),
  tax DECIMAL(10,2),
  total DECIMAL(10,2),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create profiles table for user accounts
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow public read access to farms and products
CREATE POLICY "Public can view farms" ON farms FOR SELECT USING (true);
CREATE POLICY "Public can view products" ON products FOR SELECT USING (true);

-- Only allow insert on orders (for checkout)
CREATE POLICY "Anyone can create orders" ON orders FOR INSERT WITH CHECK (true);

-- Profiles: Users can view and update their own profile
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Create a trigger to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample farm data
INSERT INTO farms (name, owner, description, short_description, location, distance, rating, review_count, established, image, cover_image, specialties, certifications, practices) VALUES
('Willowbrook Farm', 'Sarah & Tom Mitchell', 'A third-generation family farm nestled in the rolling hills, specializing in heirloom vegetables and free-range eggs.', 'Heirloom vegetables & free-range eggs', 'Meadow Valley, 12 miles away', 12, 4.9, 127, 1952, 'https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&q=80', 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80', ARRAY['Heirloom Tomatoes', 'Fresh Eggs', 'Seasonal Greens'], ARRAY['Organic', 'Non-GMO'], ARRAY['Crop Rotation', 'Natural Pest Control', 'Rainwater Harvesting']),
('Sunrise Orchards', 'Maria Gonzalez', 'Perched on sunny hillsides, our orchard has been growing the finest stone fruits and apples for over 40 years.', 'Stone fruits, apples & fresh-pressed cider', 'Hilltop Ridge, 8 miles away', 8, 4.8, 89, 1983, 'https://images.unsplash.com/photo-1595356700395-6f14b5c1f33f?w=800&q=80', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80', ARRAY['Peaches', 'Apples', 'Fresh Cider'], ARRAY['Organic'], ARRAY['Integrated Pest Management', 'Drip Irrigation', 'Companion Planting']),
('Green Pastures Dairy', 'The Johnson Family', 'Our happy cows graze on lush, pesticide-free pastures. We craft small-batch artisan cheeses.', 'Artisan cheeses & farm-fresh dairy', 'River Bend, 15 miles away', 15, 4.9, 203, 1967, 'https://images.unsplash.com/photo-1594771804886-a933bb2d609b?w=800&q=80', 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&q=80', ARRAY['Raw Milk', 'Aged Cheddar', 'Fresh Butter'], ARRAY['Grass-Fed', 'Hormone-Free'], ARRAY['Rotational Grazing', 'Pasture-Raised', 'Animal Welfare Certified']);

-- Insert sample product data
INSERT INTO products (farm_id, name, description, price, unit, category, image, in_stock, organic) VALUES
(1, 'Heirloom Tomato Medley', 'A gorgeous mix of Cherokee Purple, Brandywine, and Green Zebra tomatoes.', 6.99, 'lb', 'Vegetables', 'https://images.unsplash.com/photo-1546470427-0d4db154cde8?w=600&q=80', true, true),
(1, 'Farm Fresh Eggs', 'Dozen eggs from our happy, free-range hens. Rich orange yolks.', 7.50, 'dozen', 'Dairy & Eggs', 'https://images.unsplash.com/photo-1489761826784-04d8deae9845?w=600&q=80', true, true),
(1, 'Mixed Salad Greens', 'A tender mix of baby lettuces, arugula, and spinach.', 5.99, 'bunch', 'Vegetables', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80', true, true),
(2, 'Golden Peaches', 'Sun-ripened peaches picked at peak sweetness.', 4.99, 'lb', 'Fruits', 'https://images.unsplash.com/photo-1595124299548-b0a8ae3e2866?w=600&q=80', true, true),
(2, 'Honeycrisp Apples', 'Perfectly balanced sweet-tart flavor with an explosive crunch.', 3.99, 'lb', 'Fruits', 'https://images.unsplash.com/photo-1568702846914-96b305d2ebb7?w=600&q=80', true, true),
(2, 'Fresh-Pressed Apple Cider', 'Unfiltered, unpasteurized cider from heritage apple varieties.', 8.99, 'half gallon', 'Beverages', 'https://images.unsplash.com/photo-1572359031780-af1c1e4f5200?w=600&q=80', true, false),
(3, 'Raw Whole Milk', 'Creamy, grass-fed milk from our pasture-raised cows.', 9.99, 'gallon', 'Dairy & Eggs', 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&q=80', true, false),
(3, 'Aged Farmhouse Cheddar', 'Sharp, complex cheddar aged for 12 months.', 14.99, '8 oz', 'Dairy & Eggs', 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=600&q=80', true, false),
(3, 'Hand-Churned Butter', 'Rich, golden butter made in small batches.', 8.99, 'half lb', 'Dairy & Eggs', 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&q=80', true, false);

