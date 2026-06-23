import { Compass } from "lucide-react";
import { ComingSoonHero } from "./ComingSoonHero";
import { WhatWereBuilding } from "./WhatWereBuilding";
import { ComingSoonWaitlist } from "./ComingSoonWaitlist";
import { ComingSoonFAQ } from "./ComingSoonFAQ";

export const metadata = {
  title: "Coming Soon — Uncle Inc.",
  description:
    "Uncle Inc. is building digital products and platforms for businesses and consumers. Join the waitlist for early access.",
};

export default function ComingSoonPage() {
  return (
    <main className="bg-ink min-h-screen">
      {/* Minimal header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-ink/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            <div className="flex items-center gap-2">
              <Compass className="h-5 w-5 text-indigo-400" />
              <span className="text-lg font-heading font-bold tracking-tight text-white">
                Uncle Inc.
              </span>
            </div>
          </div>
        </div>
      </header>

      <ComingSoonHero />
      <WhatWereBuilding />
      <ComingSoonWaitlist />
      <ComingSoonFAQ />

      {/* Footer */}
      <footer className="bg-ink-100 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-indigo-400" />
              <span className="text-sm font-heading font-semibold text-white tracking-wide">
                Uncle Inc.
              </span>
            </div>
            <p className="text-xs text-white/25 font-mono">
              &copy; 2026 Uncle Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
