import { Layers, Zap, Target, TrendingUp } from "lucide-react";

const items = [
  {
    icon: Layers,
    title: "Modern Digital Products",
    description:
      "Digital products and platforms designed for modern businesses — built to perform, scale, and delight.",
  },
  {
    icon: Zap,
    title: "Ideas to Execution",
    description:
      "Technology solutions that bridge the gap between ideas and execution, turning vision into reality.",
  },
  {
    icon: Target,
    title: "Precision Engineering",
    description:
      "Scalable software built with precision and purpose — every line of code serves a clear function.",
  },
  {
    icon: TrendingUp,
    title: "Innovation-Driven Development",
    description:
      "Innovation-driven development for businesses and consumers who demand reliable, forward-thinking solutions.",
  },
];

export function WhatWereBuilding() {
  return (
    <section id="what-we-build" className="relative py-28 px-6 bg-white">
      {/* Subtle lattice overlay */}
      <div className="absolute inset-0 lattice-overlay opacity-50" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-20">
          <p className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-gold-500 mb-4">
            Our Vision
          </p>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-charcoal mb-6">
            What We&apos;re Building
          </h2>
          <div className="mx-auto flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gold-300/60" />
            <div className="h-1 w-1 rotate-45 bg-gold-400" />
            <div className="h-px w-12 bg-gold-300/60" />
          </div>
        </div>

        {/* Benefit grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative bg-ivory border border-gold-200/40 p-10 hover:border-gold-300/60 transition-all duration-500 premium-shadow hover:premium-shadow-lg"
              >
                {/* Corner accent */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold-300/50 transition-colors duration-300 group-hover:border-gold-400" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold-300/50 transition-colors duration-300 group-hover:border-gold-400" />

                <div className="flex h-14 w-14 items-center justify-center border border-gold-300/40 bg-white mb-6 transition-colors duration-300 group-hover:bg-gold-50 group-hover:border-gold-400/60">
                  <Icon className="h-6 w-6 text-gold-500" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-charcoal mb-3">
                  {item.title}
                </h3>
                <p className="text-charcoal-400 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
