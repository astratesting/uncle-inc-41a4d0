"use client";

import { Suspense } from "react";
import { Hero } from "@/components/Hero";
import { WhatWereBuilding } from "@/components/WhatWereBuilding";
import { FAQ } from "@/components/FAQ";

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ivory/80 backdrop-blur-lg border-b border-charcoal-100">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-heading font-bold text-xl text-charcoal tracking-tight">
          Uncle Inc.
        </span>
        <a
          href="#signup"
          className="text-sm font-semibold text-burgundy hover:text-burgundy-800 transition-colors"
        >
          Join the Waitlist
        </a>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-charcoal-100">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-heading font-bold text-charcoal">
          Uncle Inc.
        </span>
        <div className="flex items-center gap-6 text-sm text-charcoal-400">
          <a href="#" className="hover:text-charcoal transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-charcoal transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-charcoal transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function ComingSoonPage() {
  return (
    <main className="min-h-screen bg-ivory">
      <Nav />
      <Suspense fallback={null}>
        <Hero />
      </Suspense>
      <WhatWereBuilding />
      <FAQ />
      <Footer />
    </main>
  );
}
