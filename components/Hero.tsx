export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Soft gradient background */}
      <div className="absolute inset-0 calm-gradient" />

      {/* Beam light accents */}
      <div className="absolute inset-0 beam-glow" />
      <div className="absolute top-0 left-1/4 w-px h-64 bg-gradient-to-b from-sky-300/20 to-transparent" />
      <div className="absolute top-0 right-1/3 w-px h-48 bg-gradient-to-b from-mint-300/15 to-transparent" />
      <div className="absolute bottom-0 left-1/2 w-px h-32 bg-gradient-to-t from-sand-300/10 to-transparent" />

      {/* Subtle beam accent top */}
      <div className="beam-accent absolute top-0 left-0 right-0 h-px" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* COMING SOON badge */}
        <div className="mb-10 inline-flex animate-fade-in">
          <span className="inline-block bg-dark-text text-soft-white px-6 py-2 font-heading text-xs font-semibold tracking-[0.25em] uppercase rounded-full">
            Coming Soon
          </span>
        </div>

        {/* Company name */}
        <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-dark-text mb-6 tracking-tight animate-fade-in leading-[0.9]">
          Uncle Inc.
        </h1>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl md:text-3xl font-heading font-semibold text-sky-400 mb-8 animate-slide-up">
          Building Digital Solutions for Modern Problems
        </p>

        {/* Value prop */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-dark-text/60 font-body leading-relaxed mb-12 animate-slide-up">
          We build digital products and platforms that help businesses and consumers
          solve modern challenges — from concept to launch, engineered with care.
        </p>

        {/* Sign Up CTA */}
        <div className="animate-slide-up">
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 bg-dark-text text-soft-white px-8 py-4 rounded-full font-heading text-sm font-semibold tracking-wide uppercase hover:bg-dark-text-700 transition-all duration-300 soft-shadow-lg hover:scale-[1.02]"
          >
            Sign Up
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
