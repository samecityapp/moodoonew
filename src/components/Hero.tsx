export default function Hero() {
  return (
    <header className="relative w-full pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden bg-white">

      {/* CONTENT */}
      <div className="relative z-10 container mx-auto px-4 text-center flex flex-col items-center justify-center">

        {/* Main Title */}
        <h1 className="font-serif font-bold tracking-tighter leading-none
                       mb-3 md:mb-6 drop-shadow-sm
                       text-[11.5vw] sm:text-7xl md:text-8xl lg:text-9xl"
            style={{ color: '#C9463D' }}>
          Moodoo Studio
        </h1>

        {/* Slogan */}
        <div className="flex items-center justify-center gap-4">
          <div className="hidden md:block w-16 h-[1px] bg-gradient-to-r from-transparent to-gray-400"></div>
          <h2 className="font-serif italic text-gray-600
                     text-lg sm:text-xl md:text-3xl">
            May the light be with you
          </h2>
          <div className="hidden md:block w-12 h-[1px] bg-gradient-to-l from-transparent to-gray-400"></div>
        </div>

      </div>
    </header>
  );
}
