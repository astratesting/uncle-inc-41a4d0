export function Footer() {
  return (
    <footer className="bg-charcoal border-t border-charcoal-600">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-sm font-heading font-semibold text-ivory tracking-wide">
            Uncle Inc.
          </span>

          <div className="flex items-center gap-8">
            <a
              href="#what-we-build"
              className="text-xs text-charcoal-300 hover:text-gold-400 transition-colors font-body tracking-wide uppercase"
            >
              What We Build
            </a>
            <a
              href="#faq"
              className="text-xs text-charcoal-300 hover:text-gold-400 transition-colors font-body tracking-wide uppercase"
            >
              FAQ
            </a>
            <a
              href="#waitlist"
              className="text-xs text-charcoal-300 hover:text-gold-400 transition-colors font-body tracking-wide uppercase"
            >
              Waitlist
            </a>
          </div>

          <p className="text-xs text-charcoal-400 font-body">
            &copy; 2026 Uncle Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
