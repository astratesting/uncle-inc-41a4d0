"use client";

import { useState, type FormEvent, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const verified = searchParams.get("verified");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-ivory">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="font-heading font-bold text-2xl text-charcoal">
            Uncle Inc.
          </Link>
          <p className="text-charcoal-400 text-sm mt-1">Welcome back</p>
        </div>

        <div className="rounded-2xl border border-charcoal-100 bg-white p-8">
          {verified === "true" && (
            <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
              Email verified! You can now sign in.
            </div>
          )}
          {verified === "already" && (
            <div className="mb-4 p-3 rounded-lg bg-gold-50 border border-gold-200 text-gold-700 text-sm">
              Email already verified. Sign in below.
            </div>
          )}

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
                autoComplete="current-password"
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
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-charcoal-400">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-burgundy font-semibold hover:text-burgundy-800">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}
