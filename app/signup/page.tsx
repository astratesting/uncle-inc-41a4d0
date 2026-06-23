"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
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
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
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
      <div className="min-h-screen flex items-center justify-center px-4 bg-ivory">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="font-heading font-bold text-2xl text-charcoal">
              Uncle Inc.
            </Link>
          </div>
          <div className="rounded-2xl border border-charcoal-100 bg-white p-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-teal-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h1 className="font-heading text-2xl font-bold text-charcoal mb-2">Check Your Email</h1>
              <p className="text-charcoal-400 text-sm mb-4">
                We&apos;ve sent a verification link to <strong className="text-charcoal">{email}</strong>.
                Click the link to activate your account.
              </p>
              {devVerifyUrl && (
                <div className="p-4 rounded-xl bg-gold-50 border border-gold-200 text-left mb-4">
                  <p className="text-xs font-semibold text-gold-700 mb-2">Dev Mode — Verification Link:</p>
                  <a href={devVerifyUrl} className="text-xs text-burgundy underline break-all">
                    {devVerifyUrl}
                  </a>
                </div>
              )}
              <Link href="/login" className="text-sm text-burgundy font-semibold hover:text-burgundy-800">
                Go to Login →
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-ivory">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="font-heading font-bold text-2xl text-charcoal">
            Uncle Inc.
          </Link>
          <p className="text-charcoal-400 text-sm mt-1">Create your account</p>
        </div>

        <div className="rounded-2xl border border-charcoal-100 bg-white p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-1.5">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-lg border border-charcoal-200 bg-white px-4 py-2.5 text-sm text-charcoal placeholder-charcoal-300 focus:outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy transition-all"
              />
            </div>
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
                className="w-full rounded-lg border border-charcoal-200 bg-white px-4 py-2.5 text-sm text-charcoal placeholder-charcoal-300 focus:outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy transition-all"
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
                className="w-full rounded-lg border border-charcoal-200 bg-white px-4 py-2.5 text-sm text-charcoal placeholder-charcoal-300 focus:outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy transition-all"
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
                className="w-full rounded-lg border border-charcoal-200 bg-white px-4 py-2.5 text-sm text-charcoal placeholder-charcoal-300 focus:outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy transition-all"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-charcoal text-ivory font-semibold text-sm hover:bg-charcoal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-charcoal-400">
            Already have an account?{" "}
            <Link href="/login" className="text-burgundy font-semibold hover:text-burgundy-800">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
