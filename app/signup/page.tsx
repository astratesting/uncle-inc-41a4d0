"use client";

import { useState, useEffect, type FormEvent } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [signupCount, setSignupCount] = useState(0);

  useEffect(() => {
    fetch("/api/signup-count")
      .then((r) => r.json())
      .then((d) => setSignupCount(d.count))
      .catch(() => {});
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        setLoading(false);
        return;
      }

      setVerificationCode(data.verificationCode);
      setSignupCount(data.signupCount);
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#FFFBF5]">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="font-heading font-bold text-2xl text-charcoal">
              Uncle Inc.
            </Link>
          </div>

          <div className="rounded-2xl border border-charcoal-100 bg-white p-8 shadow-sm">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-charcoal mb-2">Check your email</h2>
              <p className="text-charcoal-400 text-sm mb-6">
                We sent a verification code to <span className="font-medium text-charcoal">{email}</span>
              </p>

              <div className="bg-violet-50 border border-violet-200 rounded-xl p-6 mb-6">
                <p className="text-sm text-charcoal-400 mb-2">Your verification code</p>
                <p className="text-4xl font-mono font-bold tracking-[0.3em] text-violet-600">
                  {verificationCode}
                </p>
              </div>

              <Link
                href={`/verify?email=${encodeURIComponent(email)}`}
                className="inline-flex items-center justify-center w-full py-3 px-4 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition-colors"
              >
                Enter Verification Code
              </Link>

              <p className="text-xs text-charcoal-300 mt-4">
                Code expires in 15 minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#FFFBF5]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="font-heading font-bold text-2xl text-charcoal">
            Uncle Inc.
          </Link>
          <p className="text-charcoal-400 text-sm mt-1">Join the founding cohort</p>
        </div>

        <div className="rounded-2xl border border-charcoal-100 bg-white p-8 shadow-sm">
          {signupCount > 0 && (
            <div className="mb-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-100">
                <div className="w-2 h-2 rounded-full bg-coral-500 animate-pulse" />
                <span className="text-sm font-medium text-violet-700">
                  {signupCount} founder{signupCount !== 1 ? "s" : ""} have joined
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-charcoal-600 mb-1.5">
                Full name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-charcoal-200 bg-white text-charcoal placeholder-charcoal-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                placeholder="Jane Smith"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-charcoal-600 mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-charcoal-200 bg-white text-charcoal placeholder-charcoal-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                placeholder="jane@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-charcoal-600 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 rounded-xl border border-charcoal-200 bg-white text-charcoal placeholder-charcoal-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                placeholder="At least 8 characters"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-violet-700 text-white font-semibold hover:from-violet-700 hover:to-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-charcoal-400">
              Already have an account?{" "}
              <Link href="/login" className="text-violet-600 hover:text-violet-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {signupCount > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs text-charcoal-400 mb-2">
              <span>Founding cohort progress</span>
              <span>{signupCount}/10</span>
            </div>
            <div className="w-full h-2 rounded-full bg-charcoal-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 via-coral-500 to-honey-500 transition-all duration-500"
                style={{ width: `${Math.min((signupCount / 10) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
