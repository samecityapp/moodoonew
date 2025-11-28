import { supabase } from '../lib/supabase';

export async function uploadProductImage(file: File, productId?: number): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = productId ? `${productId}/${fileName}` : `temp/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

export async function uploadMultipleProductImages(
  files: File[],
  productId?: number
): Promise<string[]> {
  const uploadPromises = files.map(file => uploadProductImage(file, productId));
  return Promise.all(uploadPromises);
}

export async function deleteProductImage(url: string): Promise<void> {
  const path = url.split('/product-images/').pop();
  if (!path) return;

  const { error } = await supabase.storage
    .from('product-images')
    .remove([path]);

  if (error) {
    throw error;
  }
}

export async function deleteMultipleProductImages(urls: string[]): Promise<void> {
  const paths = urls
    .map(url => url.split('/product-images/').pop())
    .filter(Boolean) as string[];

  if (paths.length === 0) return;

  const { error } = await supabase.storage
    .from('product-images')
    .remove(paths);

  if (error) {
    throw error;
  }
}
