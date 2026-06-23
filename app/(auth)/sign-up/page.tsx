"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { UserPlus, Play } from "lucide-react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

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
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
    } catch {
      setError("Authentication service unavailable. Try the demo instead.");
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 mx-auto mb-4">
          <UserPlus className="h-6 w-6 text-emerald-400" />
        </div>
        <h1 className="text-2xl font-bold text-ivory mb-2">Check Your Email</h1>
        <p className="text-charcoal-400 text-sm mb-6">
          We&apos;ve sent a confirmation link to <strong className="text-ivory">{email}</strong>.
          Click the link to activate your account.
        </p>
        <Link
          href="/sign-in"
          className="text-sm text-gold hover:text-gold-light font-medium"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-ivory text-center mb-1">
        Create Account
      </h1>
      <p className="text-charcoal-400 text-sm text-center mb-6">
        Start validating your startup ideas
      </p>

      {/* Demo Button */}
      <a href="/api/auth/demo-signin" className="block mb-6">
        <Button variant="outline" size="lg" className="w-full">
          <Play className="h-4 w-4" />
          Try Live Demo
        </Button>
      </a>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-charcoal-700" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-charcoal-800 px-3 text-charcoal-500">or create an account</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <Input
          label="Password"
          type="password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Repeat your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          autoComplete="new-password"
        />

        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2">
            <p className="text-xs text-red-400">{error}</p>
          </div>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          <UserPlus className="h-4 w-4" />
          {loading ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-charcoal-400">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-gold hover:text-gold-light font-medium transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
