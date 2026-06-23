const items = [
  {
    title: "Digital Products",
    description:
      "Full-cycle product development — from ideation and prototyping through design, engineering, and launch. Web and mobile platforms built to perform.",
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

export function WhatWereBuilding() {
  return (
    <section id="what-we-build" className="relative py-28 px-6 bg-white">
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-20">
          <p className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-cobalt mb-4">
            What We Do
          </p>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-navy mb-6">
            What We&apos;re Building
          </h2>
          <div className="mx-auto flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-cobalt-300/60" />
            <div className="h-1 w-1 rotate-45 bg-cobalt" />
            <div className="h-px w-12 bg-cobalt-300/60" />
          </div>
        </div>

        {/* Benefit grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="group relative bg-gray-50 border border-gray-200 p-8 transition-all duration-300 hover:border-cobalt/30 hover:shadow-lg animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-cobalt to-green-accent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <h3 className="font-heading text-xl font-bold text-navy mb-3 group-hover:text-cobalt transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm font-body">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
