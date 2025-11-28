export default function Hero() {
  return (
    <section className="relative h-[60vh] md:h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden mt-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 via-background to-background" />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] animate-pulse" />

      <h1 className="font-serif text-5xl md:text-7xl mb-4 text-gray-900 tracking-tight leading-[1.1]">
        May The Light <br className="md:hidden" /> <span className="italic font-light">Be With You</span>
      </h1>
      <p className="font-sans text-gray-500 max-w-md mx-auto mb-8 font-light leading-relaxed">
        Handcrafted stained glass art that transforms sunlight into a living emotion in your home.
      </p>
    </section>
  );
}
