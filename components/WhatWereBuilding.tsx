"use client";

export function WhatWereBuilding() {
  const benefits = [
    {
      title: "Growth Playbooks, Not Guesswork",
      description:
        "We build data-driven acquisition strategies tailored to your stage, audience, and budget — so every dollar moves the needle.",
    },
    {
      title: "Rapid Experimentation",
      description:
        "Test messaging, channels, and funnels in days instead of months. We run the experiments so you can focus on what's working.",
    },
    {
      title: "First-User Acquisition",
      description:
        "Get your first 100 paying users through targeted outreach, referral loops, and channel partnerships — not paid ads alone.",
    },
    {
      title: "Founders Stay in Control",
      description:
        "We plug into your team as a growth partner, not a black box. You see the data, the strategy, and the results — in real time.",
    },
  ];

  return (
    <section className="py-20 px-6 bg-charcoal/[0.02]">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal text-center mb-4">
          What We&rsquo;re Building
        </h2>
        <p className="text-charcoal-400 text-center max-w-2xl mx-auto mb-14">
          Growth marketing consulting built for startup founders — data-driven
          strategies, rapid execution, and real traction from day one.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="p-6 rounded-2xl bg-ivory border border-charcoal-100 hover:border-gold-300 transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="mt-1 w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-3.5 h-3.5 text-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </span>
                <div>
                  <h3 className="font-heading font-semibold text-charcoal mb-1">
                    {b.title}
                  </h3>
                  <p className="text-sm text-charcoal-400 leading-relaxed">
                    {b.description}
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
