"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What does Uncle Inc. build?",
    a: "We develop digital products and platforms that help businesses and consumers solve modern challenges.",
  },
  {
    q: "When will the product launch?",
    a: "We're actively building and will share updates with early access members first.",
  },
  {
    q: "How can I stay updated?",
    a: "Join the waitlist above and we'll notify you when we're ready to launch.",
  },
  {
    q: "Who is behind Uncle Inc.?",
    a: "Uncle Inc. is a software development company focused on creating meaningful technology solutions.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-28 px-6 bg-soft-white">
      {/* Beam accent divider */}
      <div className="beam-accent absolute top-0 left-0 right-0 h-px" />

      <div className="relative z-10 mx-auto max-w-3xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-xs font-heading font-semibold tracking-[0.25em] uppercase text-sky-400 mb-4">
            Questions
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-dark-text mb-6">
            Frequently Asked
          </h2>
        </div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="calm-card overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-sky-50/30 transition-colors duration-200"
                >
                  <span className="text-base font-heading font-semibold text-dark-text pr-4">
                    {item.q}
                  </span>
                  <svg
                    className={`w-5 h-5 flex-shrink-0 text-sky-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-6 text-dark-text/50 font-body leading-relaxed text-[15px]">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
