"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";

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
      className="relative py-28 px-6 bg-charcoal overflow-hidden"
    >
      {/* Lattice pattern on dark */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(201,169,110,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(201,169,110,0.07) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Radial accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.08),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* Decorative top element */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gold-500/30" />
          <div className="h-1.5 w-1.5 rotate-45 bg-gold-400/60" />
          <div className="h-px w-16 bg-gold-500/30" />
        </div>

        <h2 className="text-4xl sm:text-5xl font-heading font-bold text-ivory mb-6">
          Join the Waitlist
        </h2>
        <p className="text-charcoal-300 text-lg leading-relaxed font-light mb-12 max-w-lg mx-auto">
          Be the first to know when Uncle Inc. launches. No spam — just
          early access and thoughtful updates.
        </p>

        {status === "success" ? (
          <div className="inline-flex items-center gap-3 border border-gold-500/30 bg-gold-500/10 px-8 py-5 text-gold-300 font-medium">
            <Check className="h-5 w-5" />
            <span>{message}</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-0 max-w-lg mx-auto"
          >
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white/5 border border-white/15 text-ivory placeholder-charcoal-400 px-6 py-4 font-body text-base focus:outline-none focus:border-gold-400/60 focus:ring-1 focus:ring-gold-400/30 transition-all"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="group inline-flex items-center justify-center gap-2 bg-gold-400 text-charcoal px-8 py-4 font-body text-sm font-semibold tracking-wide uppercase hover:bg-gold-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {status === "loading" ? (
                "Sending..."
              ) : (
                <>
                  Get Early Access
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-4 text-sm text-burgundy-400">{message}</p>
        )}
      </div>
    </section>
  );
}
