/*
  # Add materials column to products table

  1. Changes
    - Add 'materials' column to products table
    - Type: text (nullable)
    - Used to store product material information

  2. Notes
    - Column is optional (nullable)
    - No default value needed
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'materials'
  ) THEN
    ALTER TABLE products ADD COLUMN materials text;
  END IF;
END $$;
