import { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, LogOut, Package } from 'lucide-react';
import { getAllProducts, deleteProduct, createProduct, updateProduct, type Product, type NewProduct } from '../services/products';
import ProductModal from '../components/ProductModal';

interface AdminProps {
  onLogout: () => void;
  onHomeClick: () => void;
}

export default function Admin({ onLogout, onHomeClick }: AdminProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveProduct(productData: NewProduct) {
    if (editingProduct) {
      const updated = await updateProduct(editingProduct.id, productData);
      setProducts(products.map(p => p.id === editingProduct.id ? updated : p));
      setEditingProduct(null);
    } else {
      const newProduct = await createProduct(productData);
      setProducts([newProduct, ...products]);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Bu eseri silmek istediğinize emin misiniz?')) return;

    try {
      await deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      alert('Silme başarısız: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata'));
    }
  }

  function handleEdit(product: Product) {
    setEditingProduct(product);
    setIsModalOpen(true);
  }

  function handleAddNew() {
    setEditingProduct(null);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setEditingProduct(null);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            onClick={onHomeClick}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Package className="w-6 h-6 text-black" />
            <div className="text-left">
              <h1 className="font-serif text-xl font-bold">Moodoo Studio</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-full transition-colors"
          >
            <LogOut size={16} />
            Çıkış
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif text-gray-900">Eserler</h2>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
          >
            <Plus size={18} />
            Yeni Eser Ekle
          </button>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <p className="text-gray-500">Eserler yükleniyor...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center">
            <p className="text-gray-400">Henüz hiç ürün eklenmemiş.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium">Görsel</th>
                  <th className="px-6 py-4 font-medium">Eser Adı</th>
                  <th className="px-6 py-4 font-medium">Fiyat</th>
                  <th className="px-6 py-4 font-medium">Boyut</th>
                  <th className="px-6 py-4 font-medium">Stok</th>
                  <th className="px-6 py-4 font-medium">Öne Çıkan</th>
                  <th className="px-6 py-4 font-medium text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{product.title}</div>
                      {product.description && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {product.description}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      ₺{product.price.toLocaleString('tr-TR')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {product.dimensions || '-'}
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          product.is_featured
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {product.is_featured ? 'Evet' : 'Hayır'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        title="Düzenle"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        title="Sil"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
    </div>
  );
}
