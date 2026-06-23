"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const origin = window.location.origin;
    const { error: authError } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${origin}/api/auth/callback?next=/reset-password`,
      }
    );

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <div className="text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600/20 border border-indigo-500/30 mx-auto mb-4">
          <Mail className="h-6 w-6 text-indigo-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">Check Your Email</h1>
        <p className="text-gray-400 text-sm mb-6">
          We sent a password reset link to <strong className="text-white">{email}</strong>
        </p>
        <Link
          href="/sign-in"
          className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white text-center mb-1">
        Reset Password
      </h1>
      <p className="text-gray-400 text-sm text-center mb-6">
        Enter your email and we&apos;ll send you a reset link
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          <Mail className="h-4 w-4" />
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>

      <p className="text-sm text-gray-400 text-center mt-6">
        Remember your password?{" "}
        <Link
          href="/sign-in"
          className="text-indigo-400 hover:text-indigo-300 font-medium"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
