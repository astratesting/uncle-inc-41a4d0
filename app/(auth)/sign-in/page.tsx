"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { LogIn, Play } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Authentication service unavailable. Try the demo instead.");
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white text-center mb-1">
        Welcome Back
      </h1>
      <p className="text-gray-400 text-sm text-center mb-6">
        Sign in to your Uncle Inc. account
      </p>

      {/* Demo Sign-in Button */}
      <a href="/api/auth/demo-signin" className="block mb-6">
        <Button variant="outline" size="lg" className="w-full">
          <Play className="h-4 w-4" />
          Try Live Demo
        </Button>
      </a>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-800" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-charcoal-900 px-3 text-gray-500">or sign in with email</span>
        </div>
      </div>

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
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2">
            <p className="text-xs text-red-400">{error}</p>
          </div>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          <LogIn className="h-4 w-4" />
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-6 space-y-3 text-center">
        <Link
          href="/forgot-password"
          className="block text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Forgot your password?
        </Link>
        <p className="text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
