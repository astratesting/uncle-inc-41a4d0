import Link from "next/link";

export default function ConfirmPage() {
  return (
    <div className="relative w-full max-w-md p-8 rounded-2xl bg-white border border-[#E8E0D8] shadow-[0_4px_24px_rgba(124,58,237,0.06)] text-center animate-fade-in">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-[#7C3AED]"
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

      <h1 className="text-xl font-semibold text-[#1A1025] mb-2">
        Check your email
      </h1>
      <p className="text-sm text-[#6B5E7A] mb-6">
        We&apos;ve sent a confirmation link to your email address. Please click
        the link to verify your account and get started.
      </p>

      <Link
        href="/sign-in"
        className="inline-block px-6 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold transition-colors"
      >
        Go to Sign In
      </Link>
    </div>
  );
}
