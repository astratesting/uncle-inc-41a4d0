"use client";

import { Suspense, useState } from "react";
import { SignupForm } from "@/components/SignupForm";
import { CompassMotif } from "@/components/CompassMotif";
import { useSearchParams } from "next/navigation";

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-heading font-bold text-xl text-gray-900 tracking-tight">
          Uncle Inc.
        </span>
        <a
          href="#signup"
          className="text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors"
        >
          Join the Waitlist
        </a>
      </div>
    </nav>
  );
}

function VerificationBanner() {
  const searchParams = useSearchParams();
  const verified = searchParams.get("verified");

  if (verified === "true") {
    return (
      <div className="mt-8 p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm">
        Your email has been verified! You&rsquo;re on the list.
      </div>
    );
  }
  if (verified === "already") {
    return (
      <div className="mt-8 p-4 rounded-xl bg-honey-50 border border-honey-200 text-honey-700 text-sm">
        You&rsquo;re already verified and on the list!
      </div>
    );
  }
  return null;
}

function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Background compass */}
      <div className="absolute top-16 right-0 translate-x-1/4 -translate-y-1/4 opacity-[0.07] pointer-events-none">
        <CompassMotif className="w-[500px] h-[500px] text-violet-500" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 border border-violet-200 mb-8">
          <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
          <span className="text-sm font-medium text-violet-700 tracking-wide uppercase">
            Coming Soon
          </span>
        </div>

        <h1 className="font-heading font-extrabold text-5xl md:text-6xl lg:text-7xl tracking-tight text-gray-900 leading-[1.1]">
          Uncle Inc.
        </h1>

        <p className="mt-5 text-xl md:text-2xl font-heading font-semibold text-gray-700 leading-relaxed">
          Data-driven marketing strategy for early-stage startup founders
        </p>

        <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
          Most founders waste months and thousands on marketing that doesn&rsquo;t work. Uncle uses a Narrative Funnel model to help you find the right channels, craft compelling stories, and acquire customers predictably — without the guesswork or wasted ad spend.
        </p>

        <Suspense fallback={null}>
          <VerificationBanner />
        </Suspense>

        <div className="mt-10" id="signup">
          <SignupForm />
        </div>
      </div>
    </section>
  );
}

function WhatWeBuild() {
  const benefits = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Stop guessing which channels work",
      desc: "We analyze your market, audience, and budget to identify the highest-ROI marketing channels before you spend a dollar.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: "Predictable customer acquisition",
      desc: "Our Narrative Funnel model maps your story to each stage of the buyer journey, turning strangers into customers on a repeatable cadence.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Cut wasted ad spend",
      desc: "Data-backed recommendations mean you invest where it counts. No more burning runway on experiments that don't convert.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Strategy built on real data, not vibes",
      desc: "Every recommendation is backed by market data and competitor analysis, so you can pitch investors and partners with confidence.",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-violet-600 tracking-wide uppercase mb-3">
            What We&rsquo;re Building
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 tracking-tight">
            Marketing that finally makes sense for founders
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-4">
                {b.icon}
              </div>
              <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2">
                {b.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "What stage of startup is this for?",
      a: "Uncle is built for early-stage founders — pre-seed through Series A — who have a product or MVP but haven't figured out repeatable customer acquisition. If you're spending money on marketing but can't predict results, we can help.",
    },
    {
      q: "Is this a marketing agency?",
      a: "No. Uncle gives you a data-driven strategy and actionable playbook tailored to your startup. You stay in control of execution. Think of it as having a senior marketing strategist on demand, not an agency managing your ad accounts.",
    },
    {
      q: "How is this different from just reading marketing blogs?",
      a: "Blogs give generic advice. Uncle analyzes your specific market, competitors, audience, and budget to build a strategy that's unique to your startup. The Narrative Funnel model ties everything together into a coherent story, not a collection of tactics.",
    },
    {
      q: "When will Uncle be available?",
      a: "We're building the product now and will be launching to early access soon. Sign up with your email and we'll notify you as soon as it's ready. Early members will get priority access and founder-friendly pricing.",
    },
  ];

  return (
    <section className="py-20 px-6 bg-gray-50/50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-violet-600 tracking-wide uppercase mb-3">
            FAQ
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 tracking-tight">
            Common questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl bg-white border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors"
              >
                <span className="font-heading font-semibold text-gray-900">
                  {faq.q}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4">
                  <p className="text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-gray-100">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <CompassMotif className="w-8 h-8 text-violet-500" />
          <span className="font-heading font-bold text-gray-900">
            Uncle Inc.
          </span>
        </div>
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Uncle Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function ComingSoonPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WhatWeBuild />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
