const capabilities = [
  {
    title: "Digital Products",
    description:
      "Full-cycle product development — from ideation and prototyping through design, engineering, and launch. We build web and mobile platforms that users actually want.",
  },
  {
    title: "Platform Engineering",
    description:
      "Scalable, reliable infrastructure and architecture designed to grow with your business. Every platform we ship is built for performance under real-world pressure.",
  },
  {
    title: "Technological Solutions",
    description:
      "We integrate modern AI, automation, and data tools into business workflows — reducing manual effort and unlocking capabilities that weren't possible before.",
  },
  {
    title: "End-to-End Delivery",
    description:
      "From first conversation to production release, we own the full lifecycle. No handoffs, no gaps — just a single team accountable for the outcome.",
  },
];

export function Features() {
  return (
    <section id="what-we-build" className="relative py-28 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-ink" />
      <div className="absolute inset-0 lattice-overlay-flame opacity-30" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-20">
          <p className="text-xs font-mono font-semibold tracking-[0.25em] uppercase text-acid mb-4">
            What We Do
          </p>
          <h2 className="text-4xl sm:text-5xl font-display font-black text-white mb-6">
            What We&apos;re Building
          </h2>
          <div className="mx-auto flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-flame/40" />
            <div className="h-1 w-1 rotate-45 bg-flame" />
            <div className="h-px w-12 bg-flame/40" />
          </div>
        </div>

        {/* Capability cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap, i) => (
            <div
              key={cap.title}
              className="group relative bg-ink-50/50 border border-white/5 p-8 transition-all duration-300 hover:border-flame/30 animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Accent bar */}
              <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-flame to-magenta opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-flame transition-colors">
                  {cap.title}
                </h3>
                <p className="text-white/50 leading-relaxed text-sm">
                  {cap.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
