import { Compass } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ink-100 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-indigo-400" />
            <span className="text-sm font-heading font-semibold text-white tracking-wide">
              Uncle Inc.
            </span>
          </div>

          <div className="flex items-center gap-8">
            <a
              href="#what-we-build"
              className="text-xs text-white/40 hover:text-indigo-400 transition-colors font-mono tracking-wide uppercase"
            >
              What We Build
            </a>
            <a
              href="#faq"
              className="text-xs text-white/40 hover:text-indigo-400 transition-colors font-mono tracking-wide uppercase"
            >
              FAQ
            </a>
            <a
              href="#waitlist"
              className="text-xs text-white/40 hover:text-indigo-400 transition-colors font-mono tracking-wide uppercase"
            >
              Waitlist
            </a>
          </div>

          <p className="text-xs text-white/25 font-mono">
            &copy; 2026 Uncle Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
