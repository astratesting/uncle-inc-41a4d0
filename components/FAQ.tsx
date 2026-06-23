"use client";

import { useState } from "react";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    {
      q: "Who is Uncle Inc. for?",
      a: "Early-stage startup founders who need growth traction — not more advice. If you've got a product and need users, we're built for you.",
    },
    {
      q: "What does your consulting actually look like?",
      a: "We embed with your team for focused growth sprints: channel testing, funnel optimization, messaging experiments, and first-user acquisition. You get a clear strategy and measurable results — no fluff.",
    },
    {
      q: "What stage should my startup be at?",
      a: "You should have a working product (even an early one) and be ready to acquire users. If you're pre-product, we'll help you get there — but our sweet spot is post-MVP growth.",
    },
    {
      q: "When can I get started?",
      a: "We're onboarding founders from the waitlist in waves. Sign up to be among the first to get access — priority goes to founders with an active product.",
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
