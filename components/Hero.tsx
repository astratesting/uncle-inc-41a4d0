export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Lattice background */}
      <div className="absolute inset-0 lattice-overlay-flame" />

      {/* Radial gradient accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,69,0,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(233,30,140,0.08),transparent_60%)]" />

      {/* Decorative ledger lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-flame/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-magenta/20 to-transparent" />
      <div className="absolute top-20 left-10 h-32 w-px bg-flame/10" />
      <div className="absolute top-20 left-10 h-px w-32 bg-flame/10" />
      <div className="absolute bottom-32 right-16 h-24 w-px bg-magenta/10" />
      <div className="absolute bottom-32 right-16 h-px w-24 bg-magenta/10" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* COMING SOON badge */}
        <div className="mb-10 inline-flex animate-slide-up">
          <div className="relative">
            <div className="bg-flame text-white px-8 py-3 font-mono text-xs font-semibold tracking-[0.3em] uppercase rounded-sm">
              Coming Soon
            </div>
            <div className="absolute -inset-[2px] bg-gradient-to-r from-flame via-magenta to-acid rounded-sm -z-10 opacity-60 blur-sm" />
          </div>
        </div>

        {/* Company name */}
        <h1 className="font-display text-7xl sm:text-8xl md:text-9xl font-black text-white mb-8 tracking-tight animate-fade-in">
          Uncle Inc.
        </h1>

        {/* Tagline */}
        <p className="text-2xl sm:text-3xl font-heading font-bold text-gradient-flame mb-8 animate-fade-in" style={{ animationDelay: "0.15s" }}>
          Building Digital Products That Matter
        </p>

        {/* Value proposition */}
        <p className="max-w-2xl mx-auto text-lg text-white/60 leading-relaxed mb-12 animate-fade-in font-body" style={{ animationDelay: "0.3s" }}>
          We build digital products and platforms that solve real problems for
          businesses and consumers. From concept to launch, Uncle Inc. delivers
          technological solutions engineered for the modern world.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.45s" }}>
          <a
            href="#feedback"
            className="inline-flex items-center gap-2 bg-flame hover:bg-flame-600 text-white px-8 py-4 font-mono text-sm font-semibold tracking-wide uppercase transition-all glow-flame"
          >
            Tell Us What You Need
          </a>
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 border border-white/15 hover:border-flame/50 text-white px-8 py-4 font-mono text-sm font-semibold tracking-wide uppercase transition-all hover:text-flame"
          >
            Join the Waitlist
          </a>
        </div>
      </div>
    </section>
  );
}
