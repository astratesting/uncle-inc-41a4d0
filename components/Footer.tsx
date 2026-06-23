export function Footer() {
  return (
    <footer className="border-t border-charcoal-700/50 py-12 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-sm font-serif font-semibold text-ivory">
            Uncle Inc.
          </span>

          <div className="flex items-center gap-6">
            <a
              href="mailto:hello@uncleinc.com"
              className="text-sm text-charcoal-500 hover:text-charcoal-300 transition-colors"
            >
              Contact
            </a>
          </div>

          <p className="text-sm text-charcoal-600">
            &copy; {new Date().getFullYear()} Uncle Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}