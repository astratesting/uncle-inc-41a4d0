"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Compass } from "lucide-react";

const OPTIONS = [
  "Account creation",
  "Understanding the product",
  "Finding features",
  "Other",
] as const;

export default function FeedbackPage() {
  const [selected, setSelected] = useState<string>("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ frictionPoint: selected, details }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Submission failed");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center animate-slide-up">
          <div className="w-16 h-16 rounded-full bg-teal-500/10 border border-teal-500/30 mx-auto mb-6 flex items-center justify-center">
            <svg className="w-8 h-8 text-teal-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="font-sans text-2xl font-bold text-white mb-2">Thanks for your feedback!</h1>
          <p className="text-gray-400 text-sm mb-8">Your input helps us improve the onboarding experience.</p>
          <Link href="/">
            <Button variant="outline" size="md">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800/50 bg-ink/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600/20 border border-indigo-500/30">
                <Compass className="h-5 w-5 text-indigo-400" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                Uncle Inc.
              </span>
            </Link>
            <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-24 pb-16 px-4">
        <div className="mx-auto max-w-lg animate-slide-up">
          <h1 className="font-sans text-3xl font-bold text-white mb-2">Onboarding Feedback</h1>
          <p className="text-gray-400 text-sm mb-8">
            Help us improve — what made signing up harder than it should be?
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Radio options */}
            <fieldset>
              <legend className="text-sm font-medium text-gray-300 mb-3">
                What was the hardest part of signing up?
              </legend>
              <div className="space-y-2">
                {OPTIONS.map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-all duration-200 ${
                      selected === opt
                        ? "border-indigo-500 bg-indigo-500/10 text-white"
                        : "border-gray-700 bg-white/[0.03] text-gray-300 hover:border-gray-600"
                    }`}
                  >
                    <input
                      type="radio"
                      name="friction"
                      value={opt}
                      checked={selected === opt}
                      onChange={() => setSelected(opt)}
                      className="sr-only"
                    />
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                        selected === opt
                          ? "border-indigo-500"
                          : "border-gray-600"
                      }`}
                    >
                      {selected === opt && (
                        <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                      )}
                    </span>
                    <span className="text-sm">{opt}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Optional text field */}
            <div>
              <label htmlFor="details" className="block text-sm font-medium text-gray-300 mb-1.5">
                Anything else you&apos;d like to share? <span className="text-gray-500">(optional)</span>
              </label>
              <textarea
                id="details"
                rows={4}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Tell us more about your experience..."
                className="w-full rounded-lg border border-gray-700 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 hover:border-gray-600 resize-none"
              />
            </div>

            {/* Error message */}
            {status === "error" && (
              <p className="text-sm text-red-400">{errorMsg}</p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              disabled={!selected || status === "loading"}
              className="w-full"
            >
              {status === "loading" ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </span>
              ) : (
                "Submit Feedback"
              )}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
