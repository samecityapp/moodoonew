export default function Hero() {
  return (
    <header className="relative w-full pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">

      {/* BACKGROUND EFFECT (Abstract Glass Rainbow Layers) */}
      <div className="absolute inset-0 z-0 bg-white">

        {/* Layer 1: Red/Orange Base */}
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] rounded-[40%] bg-gradient-to-br from-red-200/40 via-orange-200/30 to-transparent blur-3xl opacity-70 animate-pulse" style={{ animationDuration: '12s' }} />

        {/* Layer 2: Yellow/Green - Glassy Element */}
        <div className="absolute top-[10%] right-[-20%] w-[70%] h-[90%] rounded-[35%] rotate-12 bg-gradient-to-bl from-yellow-200/40 via-green-200/30 to-transparent backdrop-blur-md border-2 border-white/10 shadow-lg opacity-60 animate-pulse" style={{ animationDuration: '15s', animationDelay: '2s' }} />

        {/* Layer 3: Blue/Indigo - Glassy Element */}
        <div className="absolute bottom-[-30%] left-[10%] w-[90%] h-[70%] rounded-[45%] -rotate-12 bg-gradient-to-tr from-blue-200/40 via-indigo-200/30 to-transparent backdrop-blur-xl border border-white/20 shadow-xl opacity-50 animate-pulse" style={{ animationDuration: '18s', animationDelay: '4s' }} />

        {/* Layer 4: Purple/Pink Overlay */}
        <div className="absolute top-[40%] left-[30%] w-[50%] h-[50%] rounded-full bg-gradient-to-r from-purple-200/30 to-pink-200/30 blur-2xl opacity-40 animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />

        {/* Global Overlay for Better Text Contrast */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 container mx-auto px-6 text-center">

        {/* Main Title */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 tracking-tight leading-none mb-3 drop-shadow-sm">
          Moodoo Studio
        </h1>

        {/* Slogan - Single Line Logic */}
        <div className="flex items-center justify-center gap-3">
          <span className="hidden md:block w-12 h-[1px] bg-gray-400/50"></span>
          <h2 className="font-serif italic text-lg sm:text-xl md:text-2xl text-gray-700 whitespace-nowrap drop-shadow-sm">
            May the light be with you
          </h2>
          <span className="hidden md:block w-12 h-[1px] bg-gray-400/50"></span>
        </div>

      </div>
    </header>
  );
}
