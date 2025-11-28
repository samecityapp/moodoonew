interface NavbarProps {
  onAdminClick: () => void;
  onLogoClick: () => void;
}

export default function Navbar({ onAdminClick, onLogoClick }: NavbarProps) {
  return (
    <nav className="fixed top-0 w-full z-40 glass-panel border-b-0 border-b-white/20 px-6 py-4 flex justify-between items-center">
      <button
        onClick={onLogoClick}
        className="font-serif text-2xl tracking-tighter font-bold hover:text-gray-700 transition-colors"
      >
        Moodoo Studio
      </button>
      <button
        onClick={onAdminClick}
        className="text-sm font-sans text-gray-500 hover:text-black transition-colors"
      >
        Admin
      </button>
    </nav>
  );
}
