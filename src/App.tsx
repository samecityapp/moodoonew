import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Admin from './pages/Admin';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'admin'>('home');

  function handleAdminLogout() {
    setCurrentPage('home');
  }

  if (currentPage === 'admin') {
    return <Admin onLogout={handleAdminLogout} onHomeClick={() => setCurrentPage('home')} />;
  }

  return (
    <main className="min-h-screen pb-20 bg-background text-primary font-sans antialiased selection:bg-black selection:text-white">
      <Navbar
        onAdminClick={() => setCurrentPage('admin')}
        onLogoClick={() => setCurrentPage('home')}
      />
      <Hero />
      <ProductGrid />
    </main>
  );
}

export default App;
