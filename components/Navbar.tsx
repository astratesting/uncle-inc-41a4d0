"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-warm-offwhite/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-lg font-heading font-bold tracking-tight text-gray-900 group-hover:text-violet-600 transition-colors">
              Uncle Inc.
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <a
              href="#what-we-build"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium"
            >
              What We Build
            </a>
            <a
              href="#faq"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium"
            >
              FAQ
            </a>
            <a href="/api/auth/demo-signin">
              <Button variant="outline" size="sm">
                <Play className="h-3.5 w-3.5" />
                View Live Demo
              </Button>
            </a>
            <a href="#waitlist">
              <Button size="sm">
                Join the Waitlist
              </Button>
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-gray-500 hover:text-gray-900"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 border-t border-gray-200 pt-4 animate-fade-in">
            <div className="flex flex-col gap-3">
              <a
                href="#what-we-build"
                onClick={() => setOpen(false)}
                className="text-sm text-gray-600 hover:text-gray-900 py-1 font-medium"
              >
                What We Build
              </a>
              <a
                href="#faq"
                onClick={() => setOpen(false)}
                className="text-sm text-gray-600 hover:text-gray-900 py-1 font-medium"
              >
                FAQ
              </a>
              <a href="/api/auth/demo-signin" onClick={() => setOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  <Play className="h-3.5 w-3.5" />
                  View Live Demo
                </Button>
              </a>
              <a href="#waitlist" onClick={() => setOpen(false)}>
                <Button size="sm" className="w-full">
                  Join the Waitlist
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
