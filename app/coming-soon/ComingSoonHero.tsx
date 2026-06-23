import { Compass } from "lucide-react";

export function ComingSoonHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Lattice background */}
      <div className="absolute inset-0 lattice-overlay" />

      {/* Radial gradient accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.08),transparent_60%)]" />

      {/* Decorative geometric elements */}
      <div className="absolute top-28 left-10 h-32 w-32 border border-indigo-500/20 rotate-45 animate-fade-in" />
      <div
        className="absolute bottom-32 right-16 h-24 w-24 border border-cyan-500/15 rotate-12 animate-fade-in"
        style={{ animationDelay: "0.3s" }}
      />
      <div
        className="absolute top-1/3 right-1/4 h-16 w-16 border border-teal-500/15 rounded-full animate-fade-in"
        style={{ animationDelay: "0.5s" }}
      />

      {/* Compass motif */}
      <div className="absolute top-24 right-20 opacity-10 animate-spin-slow">
        <Compass className="h-40 w-40 text-indigo-400" strokeWidth={0.5} />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* COMING SOON badge */}
        <div className="mb-10 inline-flex animate-slide-up">
          <div className="relative">
            <div className="bg-indigo-600 text-white px-8 py-3 font-mono text-xs font-semibold tracking-[0.3em] uppercase rounded-sm">
              Coming Soon
            </div>
            <div className="absolute -inset-[2px] bg-gradient-to-r from-indigo-500 via-cyan-500 to-teal-500 rounded-sm -z-10 opacity-60 blur-sm" />
          </div>
        </div>

        {/* Company name */}
        <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white animate-slide-up mb-6">
          Uncle{" "}
          <span className="text-gradient-indigo">Inc.</span>
        </h1>

        {/* Tagline */}
        <p
          className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-white/90 mb-6 animate-slide-up"
          style={{ animationDelay: "0.15s" }}
        >
          Precision Software. Real Results.
        </p>

        {/* Value prop */}
        <p
          className="mx-auto max-w-2xl text-lg sm:text-xl text-white/60 font-body leading-relaxed mb-10 animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          We are building digital products and platforms that turn ambitious ideas
          into reliable, scalable technology — for businesses and consumers who
          demand quality over shortcuts.
        </p>

        {/* Scroll hint */}
        <div
          className="mt-16 flex flex-col items-center gap-2 animate-fade-in"
          style={{ animationDelay: "1s" }}
        >
          <span className="text-xs font-mono text-white/30 tracking-widest uppercase">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-indigo-400/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
