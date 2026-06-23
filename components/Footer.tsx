export function Footer() {
  return (
    <footer className="border-t border-gray-200 py-12 px-4 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-sm font-heading font-bold text-gray-900">
            Uncle Inc.
          </span>

          <div className="flex items-center gap-6">
            <a
              href="mailto:hello@uncleinc.com"
              className="text-sm text-gray-500 hover:text-violet-600 transition-colors"
            >
              Contact
            </a>
            <a
              href="#faq"
              className="text-sm text-gray-500 hover:text-violet-600 transition-colors"
            >
              FAQ
            </a>
          </div>

          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Uncle Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
