"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function CTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("You're on the list! We'll be in touch soon.");
        setEmail("");
      } else {
        const data = await res.json();
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <section id="waitlist" className="max-w-7xl mx-auto px-6 py-24">
      <div className="relative rounded-3xl border border-[#1e1e2e] bg-[#0d0d16] p-8 sm:p-12 lg:p-16 text-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[100px]" />
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Ready to{" "}
            <span className="gradient-text">build smarter</span>?
          </h2>
          <p className="text-lg text-[#8888a0] max-w-xl mx-auto mb-8">
            Join our waitlist to get early access and be the first to know when
            Uncle Inc. launches.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full sm:flex-1 px-5 py-3 rounded-xl bg-[#0a0a0f] border border-[#1e1e2e] text-[#e4e4ec] placeholder:text-[#8888a0] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors font-mono text-sm"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full sm:w-auto inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-colors"
            >
              {status === "loading" ? (
                "Joining..."
              ) : (
                <>
                  Join Waitlist
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {status === "success" && (
            <p className="mt-4 text-sm text-teal-400">{message}</p>
          )}
          {status === "error" && (
            <p className="mt-4 text-sm text-red-400">{message}</p>
          )}
        </div>
      </div>
    </section>
  );
}
