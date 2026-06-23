"use client";

import { useState, type FormEvent } from "react";

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
        setMessage(data.message || "You're on the list!");
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
    <section id="waitlist" className="relative py-28 px-6">
      {/* Soft gradient background */}
      <div className="absolute inset-0 calm-gradient" />

      {/* Beam accents */}
      <div className="beam-accent absolute top-0 left-0 right-0 h-px" />
      <div className="absolute inset-0 beam-glow" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* Section header */}
        <p className="text-xs font-heading font-semibold tracking-[0.25em] uppercase text-sky-400 mb-4">
          Early Access
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-dark-text mb-6">
          Get Early Access
        </h2>
        <p className="max-w-lg mx-auto text-dark-text/50 font-body text-lg mb-12">
          Join the waitlist and be the first to know when we launch.
          No spam — just honest updates.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="flex-1 px-5 py-4 rounded-full bg-white border border-sky-100 text-dark-text placeholder:text-dark-text/30 font-body text-base focus:outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100 transition-all duration-200 soft-shadow"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-8 py-4 rounded-full bg-dark-text text-soft-white font-heading text-sm font-semibold tracking-wide uppercase hover:bg-dark-text-700 disabled:opacity-50 transition-all duration-300 soft-shadow-lg hover:scale-[1.02] whitespace-nowrap"
          >
            {status === "loading" ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Joining...
              </span>
            ) : (
              "Join the Waitlist"
            )}
          </button>
        </form>

        {/* Status message */}
        {message && (
          <div
            className={`mt-6 px-6 py-3 rounded-full inline-block font-body text-sm ${
              status === "success"
                ? "bg-mint-50 text-mint-700 border border-mint-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </section>
  );
}
