"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthFormCard } from "@/components/ui/AuthFormCard";
import { GoalSelector } from "@/components/GoalSelector";
import { trackEvent } from "@/lib/analytics";

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleStepOne(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, companyName }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      trackEvent("signup_step1_complete");
      setStep(2);
      setLoading(false);
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  async function handleGoalComplete(goal: string) {
    setLoading(true);
    setError("");

    try {
      // Store goal in profile metadata
      await fetch("/api/auth/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal, email }),
      });

      trackEvent("signup_step2_goal_selected", { goal });

      // Sign in the user
      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.error) {
        // If auto sign-in fails, redirect to sign-in page
        router.push("/sign-in");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("Something went wrong. Please try signing in.");
      setLoading(false);
    }
  }

  return (
    <AuthFormCard
      title={step === 1 ? "Create your account" : "Almost there!"}
      subtitle={
        step === 1
          ? "Start building your MVP in minutes"
          : "Help us personalize your experience"
      }
    >
      {step === 1 ? (
        <form onSubmit={handleStepOne} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#e4e4ec] mb-1.5"
            >
              Your name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Jane Founder"
              className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#1e1e2e] text-[#e4e4ec] placeholder:text-[#8888a0] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-[#e4e4ec] mb-1.5"
            >
              Startup name{" "}
              <span className="text-[#8888a0] font-normal">(optional)</span>
            </label>
            <input
              id="company"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Acme Inc."
              className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#1e1e2e] text-[#e4e4ec] placeholder:text-[#8888a0] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#e4e4ec] mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@startup.com"
              className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#1e1e2e] text-[#e4e4ec] placeholder:text-[#8888a0] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#e4e4ec] mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              placeholder="Min. 8 characters"
              className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#1e1e2e] text-[#e4e4ec] placeholder:text-[#8888a0] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          >
            {loading ? "Creating account..." : "Continue"}
          </button>

          <p className="text-center text-sm text-[#8888a0]">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </form>
      ) : (
        <GoalSelector
          onComplete={handleGoalComplete}
          onBack={() => setStep(1)}
        />
      )}
    </AuthFormCard>
  );
}
