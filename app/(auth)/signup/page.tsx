"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [devVerifyUrl, setDevVerifyUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setDevVerifyUrl("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      if (data._dev_verifyUrl) {
        setDevVerifyUrl(data._dev_verifyUrl);
      }
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  if (success) {
    return (
      <div className="text-center">
        <div className="w-14 h-14 rounded-full bg-honey/10 border border-honey/20 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-honey" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
        <h1 className="font-heading text-2xl font-bold text-charcoal mb-2">Check Your Email</h1>
        <p className="text-charcoal-400 text-sm mb-4">
          We&apos;ve sent a verification link to <strong className="text-charcoal">{email}</strong>.
          Click the link to activate your account.
        </p>
        {devVerifyUrl && (
          <div className="p-4 rounded-xl bg-honey-50 border border-honey-200 text-left mb-4">
            <p className="text-xs font-semibold text-honey-700 mb-2">Dev Mode — Verification Link:</p>
            <a href={devVerifyUrl} className="text-xs text-violet underline break-all hover:text-coral transition-colors">
              {devVerifyUrl}
            </a>
          </div>
        )}
        <Link href="/login" className="text-sm text-violet font-semibold hover:text-coral transition-colors">
          Go to Login →
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="font-heading text-2xl font-bold text-charcoal">Create your account</h1>
        <p className="text-charcoal-400 text-sm mt-1">Join Uncle Inc. today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1.5">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@startup.com"
            required
            autoComplete="email"
            className="w-full rounded-lg border border-charcoal-200 bg-white px-4 py-2.5 text-sm text-charcoal placeholder-charcoal-300 focus:outline-none focus:ring-2 focus:ring-violet/30 focus:border-violet transition-all"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-1.5">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            autoComplete="new-password"
            className="w-full rounded-lg border border-charcoal-200 bg-white px-4 py-2.5 text-sm text-charcoal placeholder-charcoal-300 focus:outline-none focus:ring-2 focus:ring-violet/30 focus:border-violet transition-all"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-charcoal mb-1.5">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
            autoComplete="new-password"
            className="w-full rounded-lg border border-charcoal-200 bg-white px-4 py-2.5 text-sm text-charcoal placeholder-charcoal-300 focus:outline-none focus:ring-2 focus:ring-violet/30 focus:border-violet transition-all"
          />
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-coral/10 border border-coral/20 text-coral text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg bg-violet text-white font-semibold text-sm hover:bg-violet/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-charcoal-400">
        Already have an account?{" "}
        <Link href="/login" className="text-violet font-semibold hover:text-coral transition-colors">Sign in</Link>
      </p>
    </div>
  );
}
