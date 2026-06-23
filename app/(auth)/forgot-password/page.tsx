"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // In a real app, this would send a reset email.
    // Since we have no email service, we simulate it.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <div className="text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-50 border border-violet-200 mx-auto mb-4">
          <Mail className="h-6 w-6 text-violet-600" />
        </div>
        <h1 className="text-2xl font-heading font-bold text-gray-900 mb-1">Check Your Email</h1>
        <p className="text-gray-500 text-sm mb-6">
          We sent a password reset link to{" "}
          <strong className="text-gray-900">{email}</strong>
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-violet-600 hover:text-violet-700 font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-gray-900 text-center mb-1">
        Reset Password
      </h1>
      <p className="text-gray-500 text-sm text-center mb-6">
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
        />

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>

      <Link
        href="/login"
        className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500 hover:text-gray-700 font-medium"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to sign in
      </Link>
    </div>
  );
}
