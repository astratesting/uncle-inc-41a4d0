"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { LogIn, Play } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Local demo fallback — works without real credentials
    if (email === "demo@demo.app" && password === "demo123") {
      window.location.href = "/api/auth/demo-signin";
      return;
    }

    // For real auth, this would connect to a backend
    setError("Invalid credentials. Try the demo account: demo@demo.app / demo123");
    setLoading(false);
  }

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-gray-900 text-center mb-1">
        Welcome Back
      </h1>
      <p className="text-gray-500 text-sm text-center mb-6">
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
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-3 text-gray-400">or sign in with email</span>
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
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          <LogIn className="h-4 w-4" />
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-violet-600 hover:text-violet-700 font-medium">
          Sign up
        </Link>
      </p>
    </div>
  );
}
