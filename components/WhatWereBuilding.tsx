const items = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    title: "Custom Software Solutions",
    description:
      "Tailored software solutions built specifically for your business needs — designed, developed, and delivered with precision.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    title: "Modern Platforms That Scale",
    description:
      "Scalable platforms designed to grow with your business — built on modern architecture for reliability under real-world pressure.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    title: "Technology That Solves Problems",
    description:
      "We focus on solving real-world challenges with technology that makes a meaningful difference — no unnecessary complexity.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    title: "End-to-End Development",
    description:
      "From concept to launch, we handle the full lifecycle — a single team accountable for the outcome, no gaps or handoffs.",
  },
];

export function WhatWereBuilding() {
  return (
    <section id="what-we-build" className="relative py-28 px-6 bg-soft-white">
      {/* Beam accent divider */}
      <div className="beam-accent absolute top-0 left-0 right-0 h-px" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-20">
          <p className="text-xs font-heading font-semibold tracking-[0.25em] uppercase text-sky-400 mb-4">
            What We Do
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-dark-text mb-6">
            What We&apos;re Building
          </h2>
          <p className="max-w-xl mx-auto text-dark-text/50 font-body text-lg">
            Digital products and platforms engineered for the real world.
          </p>
        </div>

        {/* Benefit grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              className="group calm-card p-8 lg:p-10 hover:border-sky-200/80 transition-all duration-300"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-sky-50 text-sky-400 flex items-center justify-center group-hover:bg-sky-100 transition-colors duration-300">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-dark-text mb-2">
                    {item.title}
                  </h3>
                  <p className="text-dark-text/50 font-body leading-relaxed text-[15px]">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
