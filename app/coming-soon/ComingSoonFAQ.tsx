"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What is Uncle Inc.?",
    a: "Uncle Inc. is a software development company building digital products and platforms for businesses and consumers. We focus on creating reliable, scalable technology solutions — not vaporware or demos.",
  },
  {
    q: "When will the product launch?",
    a: "We're actively building and will launch when we're confident in delivering exceptional quality. Join the waitlist to be the first to know — no hard date yet, and we'd rather be honest about that.",
  },
  {
    q: "How can I get early access?",
    a: "Enter your email in the waitlist form above. When we're ready to welcome early users, you'll be among the first to hear from us. No payment or commitment required.",
  },
  {
    q: "What kind of products are you building?",
    a: "We build digital products and platforms that serve both businesses and consumers — from web applications to enterprise solutions. Our focus is on precision engineering and solving real problems, not chasing trends.",
  },
];

export function ComingSoonFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-28 px-6">
      <div className="absolute inset-0 bg-ink" />
      <div className="absolute inset-0 lattice-overlay opacity-30" />

      <div className="relative z-10 mx-auto max-w-3xl">
        {/* Section header */}
        <div className="text-center mb-20">
          <p className="text-xs font-mono font-semibold tracking-[0.25em] uppercase text-cyan-400 mb-4">
            Questions
          </p>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">
            Frequently Asked
          </h2>
          <div className="mx-auto flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-indigo-500/40" />
            <div className="h-1 w-1 rotate-45 bg-indigo-500" />
            <div className="h-px w-12 bg-indigo-500/40" />
          </div>
        </div>

        <div className="divide-y divide-white/10 border-t border-b border-white/10">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between py-6 text-left group"
              >
                <span className="text-base font-body font-medium text-white/90 pr-4 group-hover:text-white transition-colors">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-indigo-400 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-40 pb-6" : "max-h-0"
                }`}
              >
                <p className="text-sm font-body text-white/50 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
