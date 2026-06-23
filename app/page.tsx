import { Suspense } from "react";
import { Hero } from "@/components/Hero";
import { WhatWereBuilding } from "@/components/WhatWereBuilding";
import { FAQ } from "@/components/FAQ";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-charcoal-100 bg-ivory/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-heading text-xl font-bold tracking-tight text-charcoal"
          >
            Uncle Inc.
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/onboarding-fixes"
              className="text-sm text-charcoal-400 hover:text-charcoal transition-colors"
            >
              How We Fixed Onboarding
            </Link>
            <a
              href="#signup"
              className="text-sm px-4 py-2 rounded-lg font-semibold bg-gold text-charcoal hover:bg-gold-400 transition-colors"
            >
              Get Early Access
            </a>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-[73px]" />

      {/* Hero with COMING SOON badge, company name, tagline, value prop, and signup form */}
      <Suspense>
        <Hero />
      </Suspense>

      {/* What We're Building — 4 benefit bullets */}
      <WhatWereBuilding />

      {/* FAQ — 4 honest Q&As */}
      <FAQ />

      {/* Footer */}
      <footer className="border-t border-charcoal-100 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="font-heading text-lg font-bold tracking-tight text-charcoal">
                Uncle Inc.
              </span>
              <span className="text-xs text-charcoal-300 font-mono tracking-wider">
                EST. 2025
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="mailto:hello@uncleinc.com"
                className="text-sm text-charcoal-400 hover:text-charcoal transition-colors"
              >
                Contact
              </a>
            </div>
            <p className="text-sm text-charcoal-300">
              &copy; {new Date().getFullYear()} Uncle Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
