"use client";

import { useState } from "react";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    {
      q: "Who is Uncle Inc. for?",
      a: "Early-stage startup founders — especially non-technical ones — who want to validate their ideas and build MVPs without hiring a development team or finding a technical co-founder.",
    },
    {
      q: "Do I need to know how to code?",
      a: "No. Our platform is designed so you can describe your idea in natural language and the AI handles the prototyping. You stay focused on your vision and your users.",
    },
    {
      q: "What stage should my startup be at?",
      a: "Ideation through early traction. If you have an idea, a rough concept, or even just a problem you want to solve — Uncle Inc. can help you move forward.",
    },
    {
      q: "When will the platform be available?",
      a: "We're building in the open and will invite waitlist members in waves. Sign up to be among the first to get access.",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal text-center mb-14">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-charcoal-100 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-charcoal/[0.02] transition-colors"
              >
                <span className="font-semibold text-charcoal pr-4">
                  {faq.q}
                </span>
                <svg
                  className={`w-5 h-5 text-charcoal-300 flex-shrink-0 transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
              {open === i && (
                <div className="px-6 pb-4 text-charcoal-400 text-sm leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
