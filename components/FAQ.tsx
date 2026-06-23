"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What is Uncle Inc.?",
    a: "Uncle Inc. is a software development company building digital products and platforms for businesses and consumers.",
  },
  {
    q: "When will the product launch?",
    a: "We're actively building and will launch when we're confident in delivering exceptional quality. Join the waitlist to be the first to know.",
  },
  {
    q: "How can I get early access?",
    a: "Simply enter your email in the waitlist form above. We'll notify you as soon as we're ready to welcome early users.",
  },
  {
    q: "Who is Uncle Inc. for?",
    a: "We're building for businesses and consumers who need reliable, innovative technology solutions to modern challenges.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-28 px-6 bg-ivory">
      <div className="absolute inset-0 lattice-overlay opacity-40" />

      <div className="relative z-10 mx-auto max-w-3xl">
        {/* Section header */}
        <div className="text-center mb-20">
          <p className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-gold-500 mb-4">
            Questions
          </p>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-charcoal mb-6">
            Frequently Asked
          </h2>
          <div className="mx-auto flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gold-300/60" />
            <div className="h-1 w-1 rotate-45 bg-gold-400" />
            <div className="h-px w-12 bg-gold-300/60" />
          </div>
        </div>

        <div className="divide-y divide-gold-200/40 border-t border-b border-gold-200/40">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-7 text-left group"
                >
                  <span className="text-lg font-heading font-semibold text-charcoal group-hover:text-charcoal-600 transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-gold-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40 pb-7" : "max-h-0"
                  }`}
                >
                  <p className="text-charcoal-400 leading-relaxed font-light pr-12">
                    {faq.a}
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
