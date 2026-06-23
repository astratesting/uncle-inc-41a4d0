"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What exactly does Uncle Inc. do?",
    a: "Uncle Inc. helps you validate startup ideas before you commit to building them. Describe your idea, our AI analyzes the market and competition, generates an interactive prototype, and lets you test it with real users. You get concrete data on whether people want what you're planning to build.",
  },
  {
    q: "Do I need technical skills to use this?",
    a: "No. You describe your startup idea in plain language, and Uncle Inc. generates a working prototype you can share with potential users. If you decide to build, we can export clean React/Next.js code as a starting point.",
  },
  {
    q: "How does user testing work?",
    a: "You can recruit testers from our panel matching your target demographic, or share a link with your own audience. Testers interact with the prototype and provide structured feedback. You see engagement data, completion rates, and direct quotes in your dashboard.",
  },
  {
    q: "Is my idea kept private?",
    a: "Yes. Your ideas and prototypes are private by default. Testers see only the prototype — not your concept documents, strategy notes, or any other data in your account.",
  },
  {
    q: "How is this different from building an MVP?",
    a: "Traditional MVPs take weeks or months to build. Uncle Inc. generates interactive prototypes in minutes and connects you with real testers in hours. You get validation signals in days instead of months, at a fraction of the cost.",
  },
  {
    q: "What does it cost?",
    a: "We're launching with a free tier that lets you validate one idea with up to 10 testers. Paid plans for founders who need unlimited projects and advanced features will follow. Join the waitlist to be notified when we launch.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-4 bg-charcoal-800/30">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ivory mb-4">
            Questions & Answers
          </h2>
          <p className="text-charcoal-400 max-w-xl mx-auto">
            Common questions about how Uncle Inc. works.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-xl border border-charcoal-700 bg-charcoal-800/50 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left"
                >
                  <span className="text-sm font-medium text-ivory pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-charcoal-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-4">
                    <p className="text-sm text-charcoal-400 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}