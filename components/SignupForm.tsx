"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { trackEvent } from "./Analytics";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !password) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Check your email to verify your account.");
        setEmail("");
        setPassword("");
        // Track signup event via Plausible-compatible endpoint
        trackEvent("signup", { method: "email" });
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-md rounded-lg border border-teal-500/30 bg-teal-500/10 p-6 text-center backdrop-blur-sm">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-teal-500/20">
          <Check className="h-5 w-5 text-teal-400" />
        </div>
        <p className="text-sm font-body text-teal-300">{message}</p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setMessage("");
          }}
          className="mt-4 text-xs font-mono text-white/40 hover:text-white/60 transition-colors"
        >
          Sign up another account
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm font-body text-white placeholder:text-white/30 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 backdrop-blur-sm transition-colors"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          className="flex-1 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm font-body text-white placeholder:text-white/30 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 backdrop-blur-sm transition-colors"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="group w-full inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-6 py-3 text-sm font-body font-semibold text-white transition-all hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed glow-indigo"
      >
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Get Early Access
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
      {status === "error" && (
        <p className="text-xs font-body text-red-400 text-center">{message}</p>
      )}
      <p className="text-xs text-white/30 font-body text-center">
        We&apos;ll send a verification email. No spam, ever.
      </p>
    </form>
  );
}
