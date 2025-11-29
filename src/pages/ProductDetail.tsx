import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, ShoppingBag, X as XIcon } from 'lucide-react';
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

  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-gray-50 overflow-y-auto"
      >
        <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors"
              aria-label="Geri"
            >
              <ArrowLeft size={20} />
              <span className="font-serif text-lg">Moodoo Studio</span>
            </button>
          </div>
        </header>

        <div className="min-h-screen pt-16 pb-12 px-0 md:px-8 md:pt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-3 md:gap-8 lg:gap-16">
            <div className="relative">
              <div className="sticky top-16 md:top-24">
                <div
                  className="relative aspect-square md:aspect-[3/4] w-full overflow-hidden bg-gray-100 cursor-pointer"
                  onClick={() => setFullScreenImage(product.images[currentImageIndex])}
                >
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

            <div className="space-y-8 px-4 md:px-0">
              <div className="text-center md:text-left">
                <h1 className="font-serif text-3xl md:text-4xl text-gray-900 mb-1.5">
                  {product.title}
                </h1>
                <p className="text-base md:text-2xl font-medium tracking-tight text-gray-900" style={{ fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                  ₺{product.price.toLocaleString('tr-TR')}
                </p>
              </div>

              {product.description && (
                <div className="prose prose-gray max-w-none text-center md:text-left bg-white border border-gray-200 rounded-2xl p-6">
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {product.description}
                  </p>
                </div>
              )}

              <div className="space-y-4 pt-4 border-t border-gray-200">
                {product.dimensions && (
                  <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-1 md:gap-0">
                    <span className="text-sm font-medium text-gray-500">Boyutlar</span>
                    <span className="text-sm text-gray-900">{product.dimensions}</span>
                  </div>
                )}
                {product.materials && (
                  <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-1 md:gap-0">
                    <span className="text-sm font-medium text-gray-500">Materyaller</span>
                    <span className="text-sm text-gray-900">{product.materials}</span>
                  </div>
                )}
                <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-1 md:gap-0">
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

      <AnimatePresence>
        {fullScreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setFullScreenImage(null)}
          >
            <button
              onClick={() => setFullScreenImage(null)}
              className="absolute top-6 right-6 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors text-white"
              aria-label="Kapat"
            >
              <XIcon size={24} />
            </button>
            <img
              src={fullScreenImage}
              alt={product.title}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
