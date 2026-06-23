"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-lg border-b border-[#1e1e2e]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        <Link href="/" className="text-lg font-bold tracking-tight">
          <span className="gradient-text">Uncle Inc.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="#features"
            className="text-sm text-[#8888a0] hover:text-[#e4e4ec] transition-colors"
          >
            Features
          </Link>
          <Link
            href="#waitlist"
            className="text-sm text-[#8888a0] hover:text-[#e4e4ec] transition-colors"
          >
            Join Waitlist
          </Link>
          <Link
            href="/sign-in"
            className="text-sm text-[#8888a0] hover:text-[#e4e4ec] transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="text-sm px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#e4e4ec]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0d0d16] border-b border-[#1e1e2e] px-6 py-4 space-y-3">
          <Link
            href="#features"
            className="block text-sm text-[#8888a0] hover:text-[#e4e4ec] transition-colors"
            onClick={() => setOpen(false)}
          >
            Features
          </Link>
          <Link
            href="#waitlist"
            className="block text-sm text-[#8888a0] hover:text-[#e4e4ec] transition-colors"
            onClick={() => setOpen(false)}
          >
            Join Waitlist
          </Link>
          <Link
            href="/sign-in"
            className="block text-sm text-[#8888a0] hover:text-[#e4e4ec] transition-colors"
            onClick={() => setOpen(false)}
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="block text-sm px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-center transition-colors"
            onClick={() => setOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
