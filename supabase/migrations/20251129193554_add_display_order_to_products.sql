/*
  # Add display_order column to products table

  1. Changes
    - Add `display_order` column to `products` table
      - Type: integer
      - Default: 0
      - Used for custom sorting order in admin interface
    - Set initial display_order values based on created_at (oldest first)
    - Add index on display_order for better query performance

  2. Notes
    - Existing products will get sequential display_order values
    - New products will default to 0 and can be reordered by admin
*/

-- Add display_order column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'display_order'
  ) THEN
    ALTER TABLE products ADD COLUMN display_order integer DEFAULT 0;
  END IF;
END $$;

-- Set initial display_order values based on created_at
UPDATE products
SET display_order = subquery.row_num
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at ASC) as row_num
  FROM products
) AS subquery
WHERE products.id = subquery.id;

-- Create index on display_order for better performance
CREATE INDEX IF NOT EXISTS idx_products_display_order ON products(display_order);