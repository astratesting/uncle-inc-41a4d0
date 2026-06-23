"use client";

import { useState, useEffect } from "react";
import posthog from "posthog-js";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [signupCount, setSignupCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/signup-count")
      .then((res) => res.json())
      .then((data) => setSignupCount(data.count))
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message);
        posthog.capture("signup_email_submitted", { email });
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@startup.com"
          required
          className="flex-1 px-5 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all text-base"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-7 py-3.5 rounded-xl bg-violet-500 text-white font-semibold font-heading hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === "loading" ? "Joining..." : "Join the Waitlist"}
        </button>
      </form>

      {status === "success" && (
        <p className="mt-3 text-sm text-green-700 bg-green-50 rounded-lg px-4 py-2 text-center">
          {message}
        </p>
      )}
      {status === "error" && (
        <p className="mt-3 text-sm text-red-700 bg-red-50 rounded-lg px-4 py-2 text-center">
          {message}
        </p>
      )}

      {signupCount !== null && signupCount > 0 && (
        <p className="mt-4 text-sm text-gray-500 text-center">
          {signupCount} {signupCount === 1 ? "founder has" : "founders have"} already joined
        </p>
      )}
    </div>
  );
}
