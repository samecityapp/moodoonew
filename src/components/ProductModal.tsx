import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Product, NewProduct } from '../services/products';
import { uploadMultipleProductImages, deleteProductImage } from '../services/storage';
import ImageUpload from './ImageUpload';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: NewProduct) => Promise<void>;
  product?: Product | null;
}

export default function ProductModal({ isOpen, onClose, onSave, product }: ProductModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    shopier_url: '',
    description: '',
    materials: '',
    dimensions: '',
    stock: '1',
    is_featured: false
  });
  const [newImages, setNewImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        price: product.price.toString(),
        shopier_url: product.shopier_url,
        description: product.description || '',
        materials: product.materials || '',
        dimensions: product.dimensions || '',
        stock: product.stock.toString(),
        is_featured: product.is_featured
      });
      setExistingImages(product.images);
      setNewImages([]);
      setRemovedImages([]);
    } else {
      setFormData({
        title: '',
        price: '',
        shopier_url: '',
        description: '',
        materials: '',
        dimensions: '',
        stock: '1',
        is_featured: false
      });
      setExistingImages([]);
      setNewImages([]);
      setRemovedImages([]);
    }
    setError('');
  }, [product, isOpen]);

  function handleRemoveExisting(url: string) {
    setExistingImages(existingImages.filter(img => img !== url));
    setRemovedImages([...removedImages, url]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (existingImages.length === 0 && newImages.length === 0) {
      setError('En az bir fotoğraf eklemelisiniz.');
      return;
    }

    setLoading(true);

    try {
      let finalImageUrls = [...existingImages];

      if (newImages.length > 0) {
        const uploadedUrls = await uploadMultipleProductImages(newImages, product?.id);
        finalImageUrls = [...finalImageUrls, ...uploadedUrls];
      }

      if (removedImages.length > 0) {
        await Promise.all(
          removedImages.map(url => deleteProductImage(url).catch(() => {}))
        );
      }

      const productData: NewProduct = {
        title: formData.title,
        price: parseFloat(formData.price),
        shopier_url: formData.shopier_url,
        description: formData.description || null,
        materials: formData.materials || null,
        dimensions: formData.dimensions || null,
        stock: parseInt(formData.stock),
        is_featured: formData.is_featured,
        images: finalImageUrls
      };

      await onSave(productData);
      onClose();
    } catch (err) {
      console.error('Save error details:', err);
      const errorMessage = err instanceof Error ? err.message : 'Kaydederken bir hata oluştu';
      setError(errorMessage);
      alert('HATA: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
          <h2 className="font-serif text-2xl font-bold">
            {product ? 'Eseri Düzenle' : 'Yeni Eser Ekle'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <ImageUpload
            images={newImages}
            onImagesChange={setNewImages}
            existingUrls={existingImages}
            onRemoveExisting={handleRemoveExisting}
            maxImages={10}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Eser Adı *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Amóre Chili"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fiyat (₺) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="10500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stok *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shopier URL *
            </label>
            <input
              type="url"
              required
              value={formData.shopier_url}
              onChange={(e) => setFormData({ ...formData, shopier_url: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="https://www.shopier.com/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Açıklama
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Bu özel tasarım vitray..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Materyaller
              </label>
              <input
                type="text"
                value={formData.materials}
                onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Orijinal vitray camı, bakır folyo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Boyutlar
              </label>
              <input
                type="text"
                value={formData.dimensions}
                onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="35cm x 45cm"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_featured"
              checked={formData.is_featured}
              onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
              className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
            />
            <label htmlFor="is_featured" className="ml-2 text-sm text-gray-700">
              Öne çıkan ürün olarak işaretle
            </label>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-black text-white rounded-sm hover:bg-gray-800 transition-colors disabled:bg-gray-400"
            >
              {loading ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
