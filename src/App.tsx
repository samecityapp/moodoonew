import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Admin from './pages/Admin';
import ProductDetailPage from './pages/ProductDetail';
import type { Product } from './services/products';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'admin' | 'product'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function handleAdminLogout() {
    setCurrentPage('home');
  }

  if (currentPage === 'admin') {
    return <Admin onLogout={handleAdminLogout} onHomeClick={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'product' && selectedProduct) {
    return (
      <ProductDetailPage
        product={selectedProduct}
        onClose={() => {
          setSelectedProduct(null);
          setCurrentPage('home');
        }}
      />
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 selection:bg-rose-200">
      <Navbar
        onAdminClick={() => setCurrentPage('admin')}
        onLogoClick={() => setCurrentPage('home')}
      />
      <Hero />
      <ProductGrid
        onProductClick={(product) => {
          setSelectedProduct(product);
          setCurrentPage('product');
        }}
      />
    </main>
  );
}

export default App;
