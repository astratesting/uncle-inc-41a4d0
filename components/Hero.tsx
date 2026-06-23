"use client";

import { Suspense } from "react";
import { SignupForm } from "@/components/SignupForm";
import { SignupCounter } from "@/components/SignupCounter";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Decorative keystone shape */}
      <div className="absolute top-20 right-0 translate-x-1/3 -translate-y-1/4 opacity-[0.04] pointer-events-none">
        <svg width="500" height="500" viewBox="0 0 200 200" fill="none">
          <path
            d="M100 10 L170 50 L190 140 L140 190 L60 190 L10 140 L30 50 Z"
            fill="currentColor"
            className="text-charcoal"
          />
        </svg>
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        {/* COMING SOON badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-charcoal text-ivory text-xs font-mono font-semibold tracking-widest uppercase mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          Coming Soon
        </div>

        <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-charcoal leading-[1.1] mb-6 animate-slide-up">
          Uncle Inc.
        </h1>

        <p className="font-heading text-xl sm:text-2xl text-charcoal-500 font-medium mb-4 animate-slide-up [animation-delay:100ms]">
          Marketing Strategy, Rebuilt for Founders
        </p>

        <p className="text-lg text-charcoal-400 max-w-xl mx-auto mb-6 leading-relaxed animate-slide-up [animation-delay:200ms]">
          Uncle Inc. helps early-stage startup founders build data-driven
          marketing strategies using the Narrative Funnel model — turning
          founder stories into measurable growth engines.
        </p>

        {/* Public signup counter badge */}
        <div className="mb-10 animate-slide-up [animation-delay:250ms]">
          <Suspense fallback={null}>
            <SignupCounter />
          </Suspense>
        </div>

        <div id="signup" className="animate-slide-up [animation-delay:300ms]">
          <Suspense fallback={null}>
            <SignupForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
