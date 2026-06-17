import Link from "next/link";

export default function ConfirmPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-ink">
      <div className="relative w-full max-w-md p-8 rounded-2xl border border-[#1e1e2e] bg-[#12121a]/80 backdrop-blur-xl text-center animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-teal-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 7.89a2 2 0 002.83 0L21 4"
            />
          </svg>
        </div>

        <h1 className="text-xl font-semibold mb-2">Check your email</h1>
        <p className="text-sm text-[#8888a0] mb-6">
          We&apos;ve sent a confirmation link to your email address. Please
          click the link to verify your account and get started.
        </p>

        <Link
          href="/sign-in"
          className="inline-block px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors"
        >
          Go to Sign In
        </Link>
      </div>
    </div>
  );
}
