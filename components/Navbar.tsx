"use client";

import { useState } from "react";
import Link from "next/link";
import { Compass, Menu, X } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Compass className="h-5 w-5 text-indigo-400 group-hover:text-cyan-400 transition-colors" />
            <span className="text-lg font-heading font-bold tracking-tight text-white group-hover:text-gradient-indigo transition-colors">
              Uncle Inc.
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#what-we-build"
              className="text-xs font-mono text-white/40 hover:text-indigo-400 transition-colors tracking-wide uppercase"
            >
              What We Build
            </a>
            <a
              href="#faq"
              className="text-xs font-mono text-white/40 hover:text-indigo-400 transition-colors tracking-wide uppercase"
            >
              FAQ
            </a>
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-5 py-2 text-xs font-mono font-semibold text-white tracking-wide uppercase hover:bg-indigo-500 transition-colors glow-indigo"
            >
              Join the Waitlist
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-white/60 hover:text-white"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 border-t border-white/5 pt-4 animate-fade-in">
            <div className="flex flex-col gap-3">
              <a
                href="#what-we-build"
                onClick={() => setOpen(false)}
                className="text-xs font-mono text-white/40 hover:text-indigo-400 py-1 tracking-wide uppercase"
              >
                What We Build
              </a>
              <a
                href="#faq"
                onClick={() => setOpen(false)}
                className="text-xs font-mono text-white/40 hover:text-indigo-400 py-1 tracking-wide uppercase"
              >
                FAQ
              </a>
              <a href="#waitlist" onClick={() => setOpen(false)}>
                <span className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-5 py-2 text-xs font-mono font-semibold text-white tracking-wide uppercase hover:bg-indigo-500 transition-colors w-full justify-center glow-indigo">
                  Join the Waitlist
                </span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
