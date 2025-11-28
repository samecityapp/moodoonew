/*
  # Fix products table policies to allow anonymous access

  1. Changes
    - Drop existing authenticated-only policies
    - Create new policies that allow anonymous access
    - This is a temporary solution for testing
    - In production, proper authentication should be implemented

  2. Security Notes
    - WARNING: This makes the products table publicly writable
    - Should be replaced with proper authentication in production
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can insert products" ON products;
DROP POLICY IF EXISTS "Authenticated users can update products" ON products;
DROP POLICY IF EXISTS "Authenticated users can delete products" ON products;

-- Create new policies allowing anonymous access
CREATE POLICY "Anyone can insert products"
  ON products
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update products"
  ON products
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete products"
  ON products
  FOR DELETE
  TO anon, authenticated
  USING (true);
