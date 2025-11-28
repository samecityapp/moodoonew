/*
  # Create Storage Bucket for Product Images

  1. Storage Setup
    - Create 'product-images' bucket
    - Set as public bucket for easy access
    - Allow image file types (JPEG, PNG, WebP, GIF)
    - Set file size limit to 5MB per image

  2. Security Policies
    - Allow public read access for all images
    - Allow authenticated insert for new images
    - Allow authenticated update for existing images
    - Allow authenticated delete for image cleanup

  3. Important Notes
    - Images are publicly accessible via URL
    - Only authenticated users (admin) can upload/delete
    - File size limit helps prevent abuse
*/

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read access for product images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can upload product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can update product images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'product-images')
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can delete product images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'product-images');
