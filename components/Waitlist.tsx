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
    <section id="waitlist" className="relative py-28 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink-100 to-ink" />

      {/* Lattice pattern */}
      <div className="absolute inset-0 lattice-overlay-flame" />

      {/* Radial accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,69,0,0.08),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* Section header */}
        <p className="text-xs font-mono font-semibold tracking-[0.25em] uppercase text-acid mb-4">
          Early Access
        </p>
        <h2 className="text-4xl sm:text-5xl font-display font-black text-white mb-6">
          Join the Waitlist
        </h2>
        <p className="text-white/50 mb-12 max-w-md mx-auto">
          Be the first to know when Uncle Inc. launches. No spam — just a
          single notification when we&apos;re ready.
        </p>

        {/* Form */}
        {status === "success" ? (
          <div className="flex flex-col items-center gap-4 animate-fade-in">
            <div className="flex h-14 w-14 items-center justify-center bg-acid/10">
              <Check className="h-7 w-7 text-acid" />
            </div>
            <p className="text-lg font-heading font-bold text-white">
              {message}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch gap-3 max-w-lg mx-auto"
          >
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full bg-ink border border-white/10 px-5 py-4 text-sm text-white placeholder:text-white/30 focus:border-flame/50 focus:outline-none transition-colors font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 bg-flame hover:bg-flame-600 disabled:opacity-50 text-white px-8 py-4 font-mono text-xs font-semibold tracking-wide uppercase transition-colors"
            >
              {status === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Join
                  <ArrowRight className="h-3 w-3" />
                </>
              )}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-4 text-sm text-flame">{message}</p>
        )}
      </div>
    </section>
  );
}
