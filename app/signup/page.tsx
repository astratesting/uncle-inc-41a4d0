"use client";

import { useState, type FormEvent, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function SignupContent() {
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [verifyUrl, setVerifyUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const formError = searchParams.get("error");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setVerifyUrl("");
    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        setLoading(false);
        return;
      }

      if (data.verifyUrl) {
        setVerifyUrl(data.verifyUrl);
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
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h2 className="font-heading text-xl font-bold text-charcoal mb-2">
                Check your email
              </h2>
              <p className="text-charcoal-400 text-sm mb-6">
                We sent a verification link to <strong>{email}</strong>
              </p>

              {verifyUrl && (
                <div className="p-4 rounded-lg bg-ivory border border-charcoal-100 mb-4">
                  <p className="text-xs text-charcoal-400 mb-2">
                    Since we can&apos;t send real emails yet, use this verification link:
                  </p>
                  <a
                    href={verifyUrl}
                    className="text-sm font-medium text-burgundy hover:text-burgundy-800 break-all underline"
                  >
                    {verifyUrl}
                  </a>
                </div>
              )}

              <Link
                href="/"
                className="text-sm text-charcoal-400 hover:text-charcoal transition-colors"
              >
                &larr; Back to home
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
          <p className="text-charcoal-400 text-sm mt-1">Join the waitlist</p>
        </div>

        <div className="rounded-2xl border border-charcoal-100 bg-white p-8">
          {(error || formError) && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error || (formError === "invalid_token" ? "Invalid or expired verification link." : formError === "missing_token" ? "Missing verification token." : "Something went wrong.")}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-charcoal-600 mb-1.5">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-2.5 rounded-lg border border-charcoal-200 bg-ivory-50 text-charcoal placeholder:text-charcoal-300 focus:outline-none focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy transition-all text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-charcoal-600 mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-charcoal-200 bg-ivory-50 text-charcoal placeholder:text-charcoal-300 focus:outline-none focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy transition-all text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-2.5 rounded-lg bg-charcoal text-ivory font-semibold text-sm hover:bg-charcoal-800 transition-colors disabled:opacity-50"
            >
              {loading ? "Signing up..." : "Join the Waitlist"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-charcoal-400">
              Already have an account?{" "}
              <Link href="/login" className="text-burgundy hover:text-burgundy-800 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <div className="w-8 h-8 border-2 border-charcoal-200 border-t-burgundy rounded-full animate-spin" />
      </div>
    }>
      <SignupContent />
    </Suspense>
  );
}
