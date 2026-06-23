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

    try {
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
    } catch {
      setError("Authentication service unavailable. Please try again later.");
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 border border-gold/20 mx-auto mb-4">
          <Mail className="h-6 w-6 text-gold" />
        </div>
        <h1 className="text-2xl font-bold text-ivory mb-1">Check Your Email</h1>
        <p className="text-charcoal-400 text-sm mb-6">
          We sent a password reset link to <strong className="text-ivory">{email}</strong>
        </p>
        <Link
          href="/sign-in"
          className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-light font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-ivory text-center mb-1">
        Reset Password
      </h1>
      <p className="text-charcoal-400 text-sm text-center mb-6">
        Enter your email and we&apos;ll send a reset link
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
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2">
            <p className="text-xs text-red-400">{error}</p>
          </div>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          <Mail className="h-4 w-4" />
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>

      <Link
        href="/sign-in"
        className="mt-6 inline-flex items-center gap-2 text-sm text-gold hover:text-gold-light font-medium"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to sign in
      </Link>
    </div>
  );
}
