"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-lg font-display font-black tracking-tight text-white group-hover:text-flame transition-colors">
              Uncle Inc.
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#what-we-build"
              className="text-xs font-mono text-white/40 hover:text-flame transition-colors tracking-wide uppercase"
            >
              What We Build
            </a>
            <a
              href="#feedback"
              className="text-xs font-mono text-white/40 hover:text-flame transition-colors tracking-wide uppercase"
            >
              Feedback
            </a>
            <a
              href="#faq"
              className="text-xs font-mono text-white/40 hover:text-flame transition-colors tracking-wide uppercase"
            >
              FAQ
            </a>
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 bg-flame px-5 py-2 text-xs font-mono font-semibold text-white tracking-wide uppercase hover:bg-flame-600 transition-colors glow-flame"
            >
              Join the Waitlist
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-white/60 hover:text-white"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/5 bg-ink/95 backdrop-blur-xl">
          <div className="px-6 py-6 space-y-4">
            <a
              href="#what-we-build"
              onClick={() => setOpen(false)}
              className="block text-xs font-mono text-white/40 hover:text-flame transition-colors tracking-wide uppercase"
            >
              What We Build
            </a>
            <a
              href="#feedback"
              onClick={() => setOpen(false)}
              className="block text-xs font-mono text-white/40 hover:text-flame transition-colors tracking-wide uppercase"
            >
              Feedback
            </a>
            <a
              href="#faq"
              onClick={() => setOpen(false)}
              className="block text-xs font-mono text-white/40 hover:text-flame transition-colors tracking-wide uppercase"
            >
              FAQ
            </a>
            <a
              href="#waitlist"
              onClick={() => setOpen(false)}
              className="block text-center bg-flame px-5 py-3 text-xs font-mono font-semibold text-white tracking-wide uppercase"
            >
              Join the Waitlist
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
