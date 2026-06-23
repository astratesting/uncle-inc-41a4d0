"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

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
        setMessage(data.message || "You're on the list. We'll be in touch.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <section
      id="waitlist"
      className="relative py-28 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink-100 to-ink" />

      {/* Lattice pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(79,70,229,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(79,70,229,0.05) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Radial accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* Decorative top element */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-indigo-500/40" />
          <div className="h-1.5 w-1.5 rotate-45 bg-indigo-500" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-indigo-500/40" />
        </div>

        <p className="text-xs font-mono font-semibold tracking-[0.25em] uppercase text-cyan-400 mb-4">
          Early Access
        </p>

        <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">
          Join the Waitlist
        </h2>

        <p className="text-lg text-white/50 font-body mb-10 max-w-xl mx-auto">
          Be among the first to experience what we&apos;re building. Get early access and help shape the future of our platform.
        </p>

        {status === "success" ? (
          <div className="rounded-lg border border-teal-500/30 bg-teal-500/10 p-6 max-w-md mx-auto backdrop-blur-sm">
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
              Add another email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto max-w-md">
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm font-body text-white placeholder:text-white/30 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 backdrop-blur-sm transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="group inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-indigo-600 to-cyan-600 px-6 py-3 text-sm font-body font-semibold text-white transition-all hover:from-indigo-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Join
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
            {status === "error" && (
              <p className="mt-3 text-xs font-body text-red-400">{message}</p>
            )}
            <p className="mt-4 text-xs text-white/25 font-body">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        )}

        {/* Decorative bottom element */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-teal-500/40" />
          <div className="h-1.5 w-1.5 rotate-45 bg-teal-500" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-teal-500/40" />
        </div>
      </div>
    </section>
  );
}
