import Link from 'next/link';

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-white font-display">
            Uncle Inc.
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/sign-in"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="px-4 py-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white text-sm font-medium rounded-lg transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
