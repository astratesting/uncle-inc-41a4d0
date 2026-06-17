import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#1e1e2e] bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm text-[#8888a0]">
          &copy; {new Date().getFullYear()} Uncle Inc. All rights reserved.
        </span>
        <div className="flex items-center gap-6 text-sm text-[#8888a0]">
          <Link
            href="/privacy"
            className="hover:text-[#e4e4ec] transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="hover:text-[#e4e4ec] transition-colors"
          >
            Terms
          </Link>
          <a
            href="mailto:hello@uncleinc.com"
            className="hover:text-[#e4e4ec] transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
