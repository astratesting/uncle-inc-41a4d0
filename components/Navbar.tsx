"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-charcoal-700/50 bg-charcoal-900/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
          >
            <span className="text-lg font-serif font-semibold tracking-tight text-ivory group-hover:text-gold transition-colors">
              Uncle Inc.
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-sm text-charcoal-400 hover:text-ivory transition-colors"
            >
              Features
            </a>
            <a
              href="#faq"
              className="text-sm text-charcoal-400 hover:text-ivory transition-colors"
            >
              FAQ
            </a>
            <a href="/api/auth/demo-signin">
              <Button variant="outline" size="sm">
                <Play className="h-3.5 w-3.5" />
                View Live Demo
              </Button>
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-charcoal-400 hover:text-ivory"
            aria-label="Toggle menu"
          >
            {open ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 border-t border-charcoal-800 mt-2 pt-4">
            <div className="flex flex-col gap-3">
              <a
                href="#features"
                onClick={() => setOpen(false)}
                className="text-sm text-charcoal-400 hover:text-ivory transition-colors py-2"
              >
                Features
              </a>
              <a
                href="#faq"
                onClick={() => setOpen(false)}
                className="text-sm text-charcoal-400 hover:text-ivory transition-colors py-2"
              >
                FAQ
              </a>
              <a
                href="/api/auth/demo-signin"
                className="mt-2"
              >
                <Button variant="outline" size="sm" className="w-full">
                  <Play className="h-3.5 w-3.5" />
                  View Live Demo
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
