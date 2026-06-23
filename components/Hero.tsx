import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Lattice background */}
      <div className="absolute inset-0 lattice-overlay" />

      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,169,110,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(114,47,55,0.05),transparent_60%)]" />

      {/* Decorative geometric elements */}
      <div className="absolute top-20 left-10 h-32 w-32 border border-gold-200/30 rotate-45 animate-fade-in" />
      <div className="absolute bottom-32 right-16 h-24 w-24 border border-burgundy-200/20 rotate-12 animate-fade-in" style={{ animationDelay: "0.3s" }} />
      <div className="absolute top-1/3 right-1/4 h-16 w-16 border border-gold-200/20 rounded-full animate-fade-in" style={{ animationDelay: "0.5s" }} />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* COMING SOON badge / ribbon */}
        <div className="mb-10 inline-flex animate-slide-up">
          <div className="relative">
            <div className="bg-charcoal text-ivory px-8 py-3 font-body text-xs font-semibold tracking-[0.3em] uppercase">
              Coming Soon
            </div>
            {/* Ribbon tails */}
            <div className="absolute -left-3 top-0 h-full w-3 bg-charcoal-800" style={{ clipPath: "polygon(100% 0, 0 50%, 100% 100%)" }} />
            <div className="absolute -right-3 top-0 h-full w-3 bg-charcoal-800" style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }} />
          </div>
        </div>

        {/* Company name */}
        <h1
          className="font-heading text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-charcoal animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          Uncle Inc.
        </h1>

        {/* Tagline */}
        <p
          className="mt-6 text-2xl sm:text-3xl lg:text-4xl font-heading font-light text-gold-500 italic animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          Where Ideas Meet Execution
        </p>

        {/* Decorative divider */}
        <div
          className="mx-auto mt-8 mb-8 flex items-center justify-center gap-3 animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="h-px w-16 bg-gold-300/50" />
          <div className="h-1.5 w-1.5 rotate-45 bg-gold-400" />
          <div className="h-px w-16 bg-gold-300/50" />
        </div>

        {/* Value proposition */}
        <p
          className="mx-auto max-w-2xl text-lg sm:text-xl text-charcoal-400 leading-relaxed font-body font-light animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          We build digital products and platforms designed for modern businesses.
          From concept to launch, we bridge the gap between ambitious ideas and
          real-world execution — crafting technology solutions with precision and purpose.
        </p>

        {/* CTA */}
        <div className="mt-12 animate-slide-up" style={{ animationDelay: "0.5s" }}>
          <a
            href="#waitlist"
            className="group inline-flex items-center gap-3 bg-charcoal text-ivory px-10 py-4 font-body text-sm font-semibold tracking-wide uppercase hover:bg-charcoal-800 transition-all duration-300 premium-shadow hover:premium-shadow-lg"
          >
            Join the Waitlist
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
