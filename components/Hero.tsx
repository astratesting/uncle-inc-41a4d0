export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 lattice-overlay-navy" />

      {/* Radial gradient accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(74,144,217,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,197,94,0.06),transparent_60%)]" />

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cobalt/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cobalt/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* COMING SOON badge */}
        <div className="mb-10 inline-flex animate-slide-up">
          <div className="relative">
            <div className="bg-cobalt text-white px-8 py-3 font-mono text-xs font-semibold tracking-[0.3em] uppercase rounded-sm">
              Coming Soon
            </div>
            <div className="absolute -inset-[2px] bg-gradient-to-r from-cobalt via-green-accent to-cobalt rounded-sm -z-10 opacity-60 blur-sm" />
          </div>
        </div>

        {/* Company name */}
        <h1 className="font-display text-7xl sm:text-8xl md:text-9xl font-black text-white mb-8 tracking-tight animate-fade-in">
          Uncle Inc.
        </h1>

        {/* Tagline */}
        <p className="text-2xl sm:text-3xl font-heading font-semibold text-cobalt mb-8 animate-slide-up">
          Building Digital Solutions for Modern Problems
        </p>

        {/* Value prop */}
        <p className="max-w-2xl mx-auto text-lg text-white/60 font-body leading-relaxed mb-12 animate-slide-up">
          We craft digital products and platforms that solve real problems for businesses and consumers. From web applications to enterprise infrastructure, every solution is engineered with precision and built to scale.
        </p>

        {/* Single CTA */}
        <div className="animate-slide-up">
          <a
            href="#waitlist"
            className="inline-flex items-center gap-3 bg-green-accent hover:bg-green-accent-600 text-white px-10 py-4 font-mono text-sm font-semibold tracking-wide uppercase transition-all glow-green"
          >
            Get Early Access
          </a>
        </div>
      </div>
    </section>
  );
}
