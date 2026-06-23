"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What does Uncle Inc. do?",
    a: "Uncle Inc. is a software development company that builds digital products and platforms. We work with businesses and entrepreneurs to turn ideas into working software — from web and mobile apps to backend systems and automation tools.",
  },
  {
    q: "What kind of clients do you work with?",
    a: "We work with startups, growing businesses, and established companies that need custom software solutions. Whether you're launching a new product or modernizing an existing platform, we can help.",
  },
  {
    q: "When will your products be available?",
    a: "We're currently building our first suite of products and platforms. Join the waitlist to be among the first to know when we launch. We'll share updates on our progress and early access opportunities.",
  },
  {
    q: "How can I get in touch?",
    a: "The best way to stay informed is to join our waitlist — we'll send updates as we get closer to launch. For partnership or business inquiries, you can also reach us at hello@uncleinc.com.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-4 bg-white">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-lg">
            Everything you need to know about Uncle Inc.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-200 ${
                  isOpen
                    ? "border-violet-200 bg-violet-50/50 shadow-sm"
                    : "border-gray-200 bg-warm-offwhite hover:border-gray-300"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-base font-heading font-semibold text-gray-900">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-gray-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-violet-500" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-600 leading-relaxed">{faq.a}</p>
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
