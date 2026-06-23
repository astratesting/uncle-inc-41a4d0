"use client";

import { Suspense } from "react";
import { SignupForm } from "@/components/SignupForm";
import { useSearchParams } from "next/navigation";

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
      <div className="mt-8 p-4 rounded-xl bg-gold-50 border border-gold-200 text-gold-700 text-sm">
        You&rsquo;re already verified and on the list!
      </div>
    );
  }
  return null;
}

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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-charcoal text-ivory text-xs font-mono font-semibold tracking-widest uppercase mb-8">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          Coming Soon
        </div>

        <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-charcoal leading-[1.1] mb-6">
          Uncle Inc.
        </h1>

        <p className="font-heading text-xl sm:text-2xl text-charcoal-500 font-medium mb-4">
          Build your MVP without a technical co-founder.
        </p>

        <p className="text-lg text-charcoal-400 max-w-xl mx-auto mb-10 leading-relaxed">
          We help early-stage founders validate startup ideas and ship working
          MVPs using AI-assisted prototyping, built-in user testing, and launch
          analytics — so you can go from concept to market-ready product, fast.
        </p>

        <div id="signup">
          <Suspense fallback={null}>
            <SignupForm />
          </Suspense>
          <VerificationBanner />
        </div>
      </div>
    </section>
  );
}
