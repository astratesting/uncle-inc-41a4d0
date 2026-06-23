import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-warm-offwhite">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <span className="text-xl font-heading font-bold tracking-tight text-gray-900 group-hover:text-violet-600 transition-colors">
              Uncle Inc.
            </span>
          </Link>
        </div>

        {/* Auth card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          {children}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          By continuing, you agree to Uncle Inc.&apos;s{" "}
          <Link href="/" className="text-violet-600 hover:text-violet-700">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/" className="text-violet-600 hover:text-violet-700">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
