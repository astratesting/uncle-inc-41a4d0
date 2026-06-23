import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-charcoal-900">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <span className="text-xl font-serif font-semibold tracking-tight text-ivory group-hover:text-gold transition-colors">
              Uncle Inc.
            </span>
          </Link>
        </div>

        {/* Auth card */}
        <div className="rounded-2xl border border-charcoal-700 bg-charcoal-800/50 backdrop-blur-sm p-8">
          {children}
        </div>

        <p className="text-center text-xs text-charcoal-600 mt-6">
          By continuing, you agree to Uncle Inc.&apos;s{" "}
          <Link href="/" className="text-gold hover:text-gold-light">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/" className="text-gold hover:text-gold-light">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
