"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What is Uncle Inc.?",
    a: "Uncle Inc. is a software development company building digital products and platforms for businesses and consumers. We provide technological solutions to modern problems — from web applications to enterprise platforms.",
  },
  {
    q: "When will you launch?",
    a: "We're actively building and will launch when we're confident in delivering exceptional quality. Join the waitlist to be the first to know.",
  },
  {
    q: "What kind of products do you build?",
    a: "We build digital products and platforms that serve both businesses and consumers — web apps, mobile experiences, automation tools, and scalable infrastructure. Our focus is precision engineering for real-world problems.",
  },
  {
    q: "How can I get involved early?",
    a: "Share your feedback through our widget on this page and join the waitlist. We read every submission and use it to shape what we build first.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-28 px-6">
      <div className="absolute inset-0 bg-ink" />
      <div className="absolute inset-0 lattice-overlay-flame opacity-30" />

      <div className="relative z-10 mx-auto max-w-3xl">
        {/* Section header */}
        <div className="text-center mb-20">
          <p className="text-xs font-mono font-semibold tracking-[0.25em] uppercase text-acid mb-4">
            Questions
          </p>
          <h2 className="text-4xl sm:text-5xl font-display font-black text-white mb-6">
            Frequently Asked
          </h2>
          <div className="mx-auto flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-flame/40" />
            <div className="h-1 w-1 rotate-45 bg-flame" />
            <div className="h-px w-12 bg-flame/40" />
          </div>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-white/5 bg-ink-50/30 transition-colors hover:border-flame/20"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-heading text-base font-bold text-white pr-4">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-flame flex-shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-white/50 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
