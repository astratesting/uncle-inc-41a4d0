"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AuthFormCard } from "@/components/ui/AuthFormCard";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";
  const initialCode = searchParams.get("code") || "";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Verification failed");
        setLoading(false);
        return;
      }

      setVerified(true);
      setTimeout(() => router.push("/sign-in"), 2000);
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  if (verified) {
    return (
      <AuthFormCard title="Email verified!" subtitle="Redirecting you to sign in...">
        <div className="text-center py-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-sm text-[#8888a0]">
            Your account has been verified. You can now sign in.
          </p>
        </div>
      </AuthFormCard>
    );
  }

  return (
    <AuthFormCard
      title="Verify your email"
      subtitle="Enter the 6-digit code shown below"
    >
      {/* Display the verification code prominently since no email service */}
      {initialCode && (
        <div className="mb-6 p-4 rounded-xl bg-teal-500/10 border border-teal-500/20 text-center">
          <p className="text-xs text-[#8888a0] mb-2 uppercase tracking-wider">
            Your verification code
          </p>
          <p className="text-3xl font-mono font-bold text-teal-400 tracking-[0.3em]">
            {initialCode}
          </p>
          <p className="text-xs text-[#8888a0] mt-2">
            Copy this code and enter it below
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="code"
            className="block text-sm font-medium text-[#e4e4ec] mb-1.5"
          >
            Verification Code
          </label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            maxLength={6}
            placeholder="Enter 6-digit code"
            className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#1e1e2e] text-[#e4e4ec] placeholder:text-[#8888a0] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors font-mono text-sm text-center tracking-[0.3em]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
        >
          {loading ? "Verifying..." : "Verify Account"}
        </button>

        <p className="text-center text-sm text-[#8888a0]">
          <Link
            href="/sign-up"
            className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
          >
            Back to sign up
          </Link>
        </p>
      </form>
    </AuthFormCard>
  );
}
