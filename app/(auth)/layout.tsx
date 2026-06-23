import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-ivory">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet/10 border border-violet/20">
              <svg className="h-5 w-5 text-violet" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9 9 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            </div>
            <span className="font-heading font-bold text-xl text-charcoal tracking-tight group-hover:text-violet transition-colors">
              Uncle Inc.
            </span>
          </Link>
        </div>

        {/* Auth card */}
        <div className="rounded-2xl border border-charcoal-100 bg-white p-8 shadow-sm">
          {children}
        </div>

        <p className="text-center text-xs text-charcoal-400 mt-6">
          By continuing, you agree to Uncle Inc.&apos;s{" "}
          <Link href="#" className="text-violet hover:text-violet/80 transition-colors">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-violet hover:text-violet/80 transition-colors">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
