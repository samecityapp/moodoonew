import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import type { Product } from '../services/products';

interface ProductDetailPageProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetailPage({ product, onClose }: ProductDetailPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  function nextImage() {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  }

  function prevImage() {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-white overflow-y-auto"
    >
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-50 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-gray-100 transition-colors shadow-lg"
        aria-label="Close"
      >
        <X size={20} />
      </button>

      <div className="min-h-screen pt-20 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            <div className="relative">
              <div className="sticky top-24">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      layoutId={currentImageIndex === 0 ? `product-image-${product.id}` : undefined}
                      src={product.images[currentImageIndex]}
                      alt={product.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>

                {product.images.length > 1 && (
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative flex-shrink-0 w-20 h-24 overflow-hidden bg-gray-100 transition-all ${
                          currentImageIndex === index
                            ? 'ring-2 ring-black'
                            : 'opacity-50 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.title} - ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4">
                  {product.title}
                </h1>
                <p className="text-3xl font-light text-gray-900">
                  ₺{product.price.toLocaleString('tr-TR')}
                </p>
              </div>

              {product.description && (
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {product.description}
                  </p>
                </div>
              )}

              <div className="space-y-4 pt-4 border-t border-gray-200">
                {product.dimensions && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Boyutlar</span>
                    <span className="text-sm text-gray-900">{product.dimensions}</span>
                  </div>
                )}
                {product.materials && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Materyaller</span>
                    <span className="text-sm text-gray-900">{product.materials}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Stok Durumu</span>
                  <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `${product.stock} adet mevcut` : 'Stokta yok'}
                  </span>
                </div>
              </div>

              <div className="pt-8">
                <a
                  href={product.shopier_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-black text-white px-8 py-4 text-center hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingBag size={20} />
                  <span className="font-medium">Satın Al</span>
                </a>
                <p className="text-xs text-gray-500 text-center mt-4">
                  Güvenli ödeme için Shopier'a yönlendirileceksiniz
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
