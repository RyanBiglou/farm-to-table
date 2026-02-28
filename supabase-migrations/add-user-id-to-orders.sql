-- Add user_id to orders table for linking orders to authenticated users
ALTER TABLE orders ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Allow users to view their own orders (drop first in case of re-run)
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
CREATE POLICY "Users can view own orders" ON orders FOR SELECT
  USING (user_id = auth.uid());
