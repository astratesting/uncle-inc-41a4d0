import Link from "next/link";
import { Compass } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-800/50 py-12 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-indigo-400" />
            <span className="text-sm font-semibold text-white">Uncle Inc.</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              Terms of Service
            </Link>
            <a
              href="mailto:hello@uncleinc.com"
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Uncle Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
