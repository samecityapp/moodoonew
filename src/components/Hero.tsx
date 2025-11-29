export default function Hero() {
  return (
    <header className="relative w-full py-20 md:py-32 overflow-hidden bg-slate-50">

      {/* BACKGROUND: Vibrant Mesh Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Orb 1: Purple/Blue (Top Right) */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 blur-[80px] opacity-20 animate-pulse" style={{ animationDuration: '10s' }} />
        {/* Orb 2: Rose/Orange (Top Left) */}
        <div className="absolute top-[-10%] left-[-20%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-rose-500 via-orange-400 to-yellow-300 blur-[90px] opacity-25" />
        {/* Orb 3: Cyan/Teal (Bottom Center) */}
        <div className="absolute bottom-[-20%] left-[20%] w-[700px] h-[500px] rounded-full bg-gradient-to-t from-cyan-400 via-teal-300 to-transparent blur-[100px] opacity-20 animate-bounce" style={{ animationDuration: '20s' }} />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 container mx-auto px-4 text-center">

        {/* Main Title
            - mb-2 on mobile (very tight gap)
            - md:mb-6 on desktop (more breathing room)
            - text-[11.5vw] ensures single line on mobile
        */}
        <h1 className="font-serif font-bold text-gray-900 tracking-tighter leading-none
                       mb-2 md:mb-6 drop-shadow-sm
                       text-[11.5vw] md:text-8xl lg:text-9xl">
          Moodoo Studio
        </h1>

        {/* Slogan */}
        <div className="flex items-center justify-center gap-3">
          <div className="hidden md:block w-12 h-[1px] bg-gradient-to-r from-transparent to-gray-400"></div>
          <h2 className="font-serif italic text-gray-600 whitespace-nowrap
                     text-base sm:text-lg md:text-3xl">
            May the light be with you
          </h2>
          <div className="hidden md:block w-12 h-[1px] bg-gradient-to-l from-transparent to-gray-400"></div>
        </div>

      </div>
    </header>
  );
}
