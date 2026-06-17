'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'What is Uncle Inc.?',
    answer:
      'Uncle Inc. is an AI-assisted MVP development platform designed for early-stage startup founders. It helps you validate, prototype, test, and launch your startup idea without needing a technical co-founder or writing code.',
  },
  {
    question: 'Do I need to know how to code?',
    answer:
      'No! Uncle Inc. is built for non-technical founders. Our AI-powered tools handle the technical heavy lifting, letting you focus on validating your idea and talking to customers.',
  },
  {
    question: 'How is this different from other no-code tools?',
    answer:
      'Unlike traditional no-code builders that only help you build, Uncle Inc. integrates the entire validation workflow — from customer discovery and prototyping to user testing and analytics — in one platform. We help you figure out WHAT to build before you invest time building it.',
  },
  {
    question: 'How does the free tier work?',
    answer:
      'Our free tier gives you one active project with 5 testers, basic analytics, and 10 AI prototyping credits per month. It\'s perfect for validating your first startup idea. No credit card required.',
  },
  {
    question: 'Can I upgrade or downgrade at any time?',
    answer:
      'Absolutely. You can upgrade to Pro or Team at any time as your needs grow, and downgrade back to Free if you need to. Your data is always preserved.',
  },
  {
    question: 'Is my startup idea safe?',
    answer:
      'Yes. We take data privacy seriously. Your ideas, prototypes, and user testing data are encrypted and never shared with third parties. We also never train our AI models on your proprietary data.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white font-display">
            Frequently asked{' '}
            <span className="gradient-text">questions</span>
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-[#111118] border border-gray-800 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-medium text-white font-display">
                  {faq.question}
                </span>
                <span
                  className={`text-xl text-gray-400 transition-transform ${
                    openIndex === i ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6">
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
