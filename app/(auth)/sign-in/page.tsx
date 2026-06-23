"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { LogIn } from "lucide-react";

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

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-gray-900 text-center mb-1">
        Welcome Back
      </h1>
      <p className="text-gray-500 text-sm text-center mb-6">
        Sign in to your Uncle Inc. account
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

      <div className="flex items-center justify-between mt-6 text-sm">
        <Link
          href="/forgot-password"
          className="text-violet-600 hover:text-violet-700 font-medium"
        >
          Forgot password?
        </Link>
        <span className="text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-violet-600 hover:text-violet-700 font-medium"
          >
            Sign up
          </Link>
        </span>
      </div>
    </div>
  );
}
