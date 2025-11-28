export default function Hero() {
  return (
    <header className="relative w-full pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">

      {/* Pastel Stained Glass / Mesh Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-[-50%] left-[-10%] w-[70%] h-[150%] rounded-full bg-gradient-to-r from-rose-100 via-purple-100 to-orange-100 blur-[80px] opacity-80 animate-pulse"
          style={{ animationDuration: '8s' }}
        />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[120%] rounded-full bg-gradient-to-b from-blue-100 via-teal-100 to-amber-50 blur-[100px] opacity-70" />
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[80%] rounded-full bg-yellow-100/60 blur-[60px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">

        {/* Main Title */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 tracking-tight leading-none mb-3">
          Moodoo Studio
        </h1>

        {/* Slogan - Single Line with decorative lines */}
        <div className="flex items-center justify-center gap-3">
          <span className="hidden md:block w-12 h-[1px] bg-gray-400/50"></span>
          <h2 className="font-serif italic text-lg sm:text-xl md:text-2xl text-gray-600 whitespace-nowrap">
            May the light be with you
          </h2>
          <span className="hidden md:block w-12 h-[1px] bg-gray-400/50"></span>
        </div>

      </div>
    </header>
  );
}
