import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

export type Product = Database['public']['Tables']['products']['Row'];
export type NewProduct = Database['public']['Tables']['products']['Insert'];

export async function getAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getProductById(id: number) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function createProduct(product: NewProduct) {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProduct(id: number, updates: Partial<NewProduct>) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProduct(id: number) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function updateProductDisplayOrder(productId: number, newOrder: number) {
  const { error } = await supabase
    .from('products')
    .update({ display_order: newOrder })
    .eq('id', productId);

  if (error) throw error;
}

export async function reorderProducts(orderedIds: number[]) {
  const updates = orderedIds.map((id, index) => ({
    id,
    display_order: index + 1
  }));

  for (const update of updates) {
    await updateProductDisplayOrder(update.id, update.display_order);
  }
}
