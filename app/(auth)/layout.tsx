import { Compass } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/20 border border-indigo-500/30">
              <Compass className="h-5 w-5 text-indigo-400" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
              Uncle Inc.
            </span>
          </Link>
        </div>

        {/* Auth card */}
        <div className="rounded-2xl border border-gray-800 bg-white/[0.03] backdrop-blur-sm p-8">
          {children}
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          By continuing, you agree to Uncle Inc.&apos;s{" "}
          <Link href="/terms" className="text-indigo-400 hover:text-indigo-300">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-indigo-400 hover:text-indigo-300">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
