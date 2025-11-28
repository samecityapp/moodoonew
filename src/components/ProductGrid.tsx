import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { getAllProducts, type Product } from '../services/products';

interface ProductGridProps {
  onProductClick?: (product: Product) => void;
}

export default function ProductGrid({ onProductClick }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="px-4 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[4/5] bg-gray-200 rounded-sm" />
              <div className="mt-2 h-4 bg-gray-200 rounded w-3/4 mx-auto" />
              <div className="mt-1 h-3 bg-gray-200 rounded w-1/2 mx-auto" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-4 md:px-12 max-w-7xl mx-auto text-center py-20">
        <p className="text-gray-500 font-sans">{error}</p>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="px-4 md:px-12 max-w-7xl mx-auto text-center py-20">
        <p className="text-gray-500 font-sans">No products available yet.</p>
      </section>
    );
  }

  return (
    <section className="relative z-20 px-4 md:px-8 max-w-[1600px] mx-auto pb-20 pt-4">

      {/* Section Header */}
      <div className="flex items-center justify-between mb-8 px-2">
        <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Latest Collection</span>
        <span className="text-xs text-gray-400">{products.length} Arts Available</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onClick={onProductClick} />
        ))}
      </div>
    </section>
  );
}
