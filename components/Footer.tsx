import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <Link href="/" className="text-xl font-bold text-white font-display">
              Uncle Inc.
            </Link>
            <p className="mt-2 text-sm text-gray-500">
              Validate, build, and launch your startup idea.
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/sign-in" className="hover:text-white transition-colors">
              Sign in
            </Link>
            <Link href="/sign-up" className="hover:text-white transition-colors">
              Sign up
            </Link>
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Uncle Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
