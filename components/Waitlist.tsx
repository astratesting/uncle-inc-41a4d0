"use client";

import { useState, type FormEvent } from "react";
import { Check, Loader2, Mail } from "lucide-react";
import { trackSignup } from "@/lib/analytics";
import { SignupCounter } from "./SignupCounter";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "verifying" | "verified" | "error">("idle");
  const [message, setMessage] = useState("");
  const [verifyUrl, setVerifyUrl] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "You're on the list. Please verify your email.");
        setVerifyUrl(data.verifyUrl || "");
        trackSignup(email);
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  async function handleVerify() {
    if (!verifyUrl) return;
    setStatus("verifying");
    try {
      const res = await fetch(verifyUrl);
      const data = await res.json();
      if (res.ok) {
        setStatus("verified");
        setMessage("Email verified! You're confirmed on the waitlist.");
      } else {
        setStatus("error");
        setMessage(data.message || "Verification failed. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <section id="waitlist" className="relative py-28 px-6 bg-white">
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* Section header */}
        <p className="text-xs font-mono font-semibold tracking-[0.25em] uppercase text-cobalt mb-4">
          Early Access
        </p>
        <h2 className="text-4xl sm:text-5xl font-display font-black text-navy mb-6">
          Join the Waitlist
        </h2>
        <div className="mx-auto flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-12 bg-cobalt/30" />
          <div className="h-1 w-1 rotate-45 bg-cobalt" />
          <div className="h-px w-12 bg-cobalt/30" />
        </div>
        <p className="text-gray-600 font-body mb-10 max-w-lg mx-auto">
          Be among the first to experience what we&apos;re building. Sign up, verify your email, and get priority access at launch.
        </p>

        {/* Signup counter */}
        <div className="mb-12">
          <SignupCounter />
        </div>

        {/* Form card */}
        <div className="bg-gray-50 border border-gray-200 p-8 sm:p-10">
          {status === "success" || status === "verifying" || status === "verified" ? (
            <div className="animate-fade-in">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center bg-green-accent/10 rounded-full">
                {status === "verified" ? (
                  <Check className="h-7 w-7 text-green-accent" />
                ) : (
                  <Mail className="h-7 w-7 text-cobalt" />
                )}
              </div>
              <p className="font-display text-2xl font-black text-navy mb-3">
                {status === "verified" ? "You're Verified!" : "Almost There"}
              </p>
              <p className="text-sm text-gray-600 font-body mb-6">
                {message}
              </p>
              {(status === "success" || status === "verifying") && verifyUrl && (
                <button
                  onClick={handleVerify}
                  disabled={status === "verifying"}
                  className="inline-flex items-center gap-2 bg-green-accent hover:bg-green-accent-600 disabled:opacity-50 text-white px-8 py-3 font-mono text-sm font-semibold tracking-wide uppercase transition-colors glow-green"
                >
                  {status === "verifying" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify My Email"
                  )}
                </button>
              )}
              {status === "verified" && (
                <p className="text-xs text-gray-400 font-mono">
                  We&apos;ll notify you when we launch.
                </p>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="waitlist-email"
                  className="block text-sm font-heading font-bold text-navy mb-2 text-left"
                >
                  Email address
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full bg-white border border-gray-300 px-5 py-4 text-sm text-navy placeholder:text-gray-400 focus:border-cobalt focus:ring-1 focus:ring-cobalt/30 focus:outline-none transition-colors font-mono"
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-red-500 font-body">{message}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-green-accent hover:bg-green-accent-600 disabled:opacity-50 text-white py-4 px-6 font-mono text-sm font-semibold tracking-wide uppercase transition-colors flex items-center justify-center gap-2 glow-green"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Joining...
                  </>
                ) : (
                  "Get Early Access"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
