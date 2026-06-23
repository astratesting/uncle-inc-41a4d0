"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserData {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  isAdmin?: boolean;
}

interface MeResponse {
  user: UserData;
  stats: { totalSignups: number };
}

interface SignupCountResponse {
  count: number;
  target: number;
  percentage: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<MeResponse | null>(null);
  const [signupData, setSignupData] = useState<SignupCountResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(async (res) => {
        if (!res.ok) {
          router.push("/login");
          return;
        }
        return res.json();
      })
      .then((d) => {
        if (d) setData(d);
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));

    fetch("/api/signup-count")
      .then((r) => r.json())
      .then((d) => setSignupData(d))
      .catch(() => {});
  }, [router]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  }

  async function handleFeedback() {
    if (!feedback.trim()) return;
    await fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "feedback",
        properties: { message: feedback },
      }),
    });
    setFeedbackSent(true);
    setFeedback("");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFBF5]">
        <div className="w-8 h-8 border-2 border-charcoal-200 border-t-violet-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) return null;

  const { user } = data;

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <nav className="border-b border-charcoal-100 bg-ivory/80 backdrop-blur-lg">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-heading font-bold text-xl text-charcoal tracking-tight">
            Uncle Inc.
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-charcoal-400">{user.email}</span>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-charcoal-400 hover:text-charcoal transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-heading font-bold text-charcoal mb-2">
            Welcome back, {user.name || "Founder"}
          </h1>
          <p className="text-charcoal-400">
            You&apos;re part of the founding cohort building the future of MVP development.
          </p>
        </div>

        {/* Signup Counter */}
        <div className="rounded-2xl border border-charcoal-100 bg-white p-8 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-charcoal mb-4">Founding Cohort Progress</h2>

          <div className="flex items-end justify-between mb-3">
            <div>
              <span className="text-5xl font-bold text-charcoal">
                {signupData?.count ?? "—"}
              </span>
              <span className="text-charcoal-300 text-lg ml-2">
                / {signupData?.target ?? 10} founders
              </span>
            </div>
            <span className="text-sm font-medium text-violet-600">
              {signupData?.percentage ?? 0}%
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-charcoal-100 overflow-hidden mb-3">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 via-coral-500 to-honey-500 transition-all duration-700"
              style={{ width: `${signupData?.percentage ?? 0}%` }}
            />
          </div>

          <p className="text-sm text-charcoal-400">
            {signupData && signupData.count >= signupData.target
              ? "Cohort is full! Stay tuned for the next wave."
              : `${(signupData?.target ?? 10) - (signupData?.count ?? 0)} spots remaining in the founding cohort.`}
          </p>
        </div>

        {/* Feedback Widget */}
        <div className="rounded-2xl border border-charcoal-100 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-charcoal mb-2">Share Your Feedback</h2>
          <p className="text-sm text-charcoal-400 mb-4">
            What features are you most excited about? What would make this product a must-have for you?
          </p>

          {feedbackSent ? (
            <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm">
              Thanks for your feedback! It helps us build exactly what founders need.
            </div>
          ) : (
            <div>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-charcoal-200 bg-white text-charcoal placeholder-charcoal-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
                placeholder="I'm most excited about..."
              />
              <button
                onClick={handleFeedback}
                disabled={!feedback.trim()}
                className="mt-3 px-6 py-2.5 rounded-xl bg-violet-600 text-white font-medium text-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Submit feedback
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
