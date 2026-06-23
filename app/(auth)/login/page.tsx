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
    <div>
      <div className="text-center mb-6">
        <h1 className="font-heading text-2xl font-bold text-charcoal">Welcome back</h1>
        <p className="text-charcoal-400 text-sm mt-1">Sign in to your account</p>
      </div>

      {verified === "true" && (
        <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">
          Email verified! You can now sign in.
        </div>
      )}
      {verified === "already" && (
        <div className="mb-4 p-3 rounded-lg bg-honey-50 border border-honey-200 text-honey-700 text-sm">
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
            autoComplete="current-password"
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
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-charcoal-400">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-violet font-semibold hover:text-coral transition-colors">Sign up</Link>
      </p>
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
