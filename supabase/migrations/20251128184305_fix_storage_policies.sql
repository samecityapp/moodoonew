/*
  # Fix Storage Policies for Product Images

  1. Changes
    - Drop existing restrictive policies
    - Add permissive policies for authenticated users
    - Allow anon users to also upload (for testing)

  2. Security Notes
    - In production, you should restrict to specific admin users
    - For now, we allow authenticated and anon for ease of use
*/

DROP POLICY IF EXISTS "Public read access for product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete product images" ON storage.objects;

CREATE POLICY "Anyone can read product images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'product-images');

CREATE POLICY "Anyone can upload product images"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Anyone can update product images"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'product-images')
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Anyone can delete product images"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'product-images');
