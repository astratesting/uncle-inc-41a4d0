"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { UserPlus } from "lucide-react";

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

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-200 mx-auto mb-4">
          <UserPlus className="h-6 w-6 text-emerald-600" />
        </div>
        <h1 className="text-2xl font-heading font-bold text-gray-900 mb-1">
          Check Your Email
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          We sent a verification link to{" "}
          <strong className="text-gray-900">{email}</strong>. Click the link
          to activate your account.
        </p>
        <Link href="/sign-in">
          <Button variant="outline" size="lg" className="w-full">
            Back to Sign In
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-gray-900 text-center mb-1">
        Create Account
      </h1>
      <p className="text-gray-500 text-sm text-center mb-6">
        Start building with Uncle Inc.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          placeholder="Jane Smith"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          <UserPlus className="h-4 w-4" />
          {loading ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-400 mt-6">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-violet-600 hover:text-violet-700 font-medium"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
