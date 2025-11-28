import { motion } from 'framer-motion';
import type { Product } from '../services/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group cursor-pointer flex flex-col gap-3"
    >
      <a href={product.shopier_url} target="_blank" rel="noopener noreferrer">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100/50">
          <img
            src={product.images[0]}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-white/0 transition-colors duration-500 group-hover:bg-white/10" />
        </div>

        <div className="mt-2 text-center">
          <h3 className="font-serif text-lg text-gray-900 group-hover:text-black transition-colors">
            {product.title}
          </h3>
          <p className="font-sans text-sm font-light text-gray-500 mt-1">
            ₺{product.price.toLocaleString('tr-TR')}
          </p>
          {product.dimensions && (
            <p className="font-sans text-xs text-gray-400 mt-0.5">
              {product.dimensions}
            </p>
          )}
        </div>
      </a>
    </motion.div>
  );
}
