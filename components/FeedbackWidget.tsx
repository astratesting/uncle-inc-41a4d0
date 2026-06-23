"use client";

import { useState, type FormEvent } from "react";
import { Check, Loader2 } from "lucide-react";

export function FeedbackWidget() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!message.trim()) {
      setError("Please share your feedback");
      return;
    }
    setError("");
    setLoading(true);

    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, email: email || undefined }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to submit feedback");
      setLoading(false);
      return;
    }

    setSubmitted(true);
    setLoading(false);
  }

  function handleReset() {
    setSubmitted(false);
    setMessage("");
    setEmail("");
    setError("");
  }

  return (
    <section id="feedback" className="relative py-28 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink-100 to-ink" />
      <div className="absolute inset-0 lattice-overlay-flame" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(233,30,140,0.06),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-2xl">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-xs font-mono font-semibold tracking-[0.25em] uppercase text-acid mb-4">
            We Want to Hear From You
          </p>
          <h2 className="text-4xl sm:text-5xl font-display font-black text-white mb-6">
            Shape What We Build
          </h2>
          <div className="mx-auto flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-magenta/40" />
            <div className="h-1 w-1 rotate-45 bg-magenta" />
            <div className="h-px w-12 bg-magenta/40" />
          </div>
        </div>

        {/* Card */}
        <div className="bg-ink-50/50 border border-white/10 p-8 sm:p-10">
          {submitted ? (
            /* Thank you state */
            <div className="text-center py-8 animate-fade-in">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center bg-acid/10">
                <Check className="h-7 w-7 text-acid" />
              </div>
              <p className="font-display text-2xl font-black text-white mb-3">
                Thank you
              </p>
              <p className="text-sm text-white/50 mb-6">
                Your feedback has been recorded. We read every submission and
                it directly shapes what we build.
              </p>
              <button
                onClick={handleReset}
                className="text-xs font-mono text-flame hover:text-flame-400 tracking-wide uppercase transition-colors"
              >
                Submit another response
              </button>
            </div>
          ) : (
            /* Micro-survey form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="feedback-message"
                  className="block text-base font-heading font-bold text-white mb-3"
                >
                  What digital product challenge should we solve for you?
                </label>
                <textarea
                  id="feedback-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about a problem you wish technology could solve..."
                  rows={5}
                  className="w-full bg-ink border border-white/10 px-5 py-4 text-sm text-white placeholder:text-white/25 focus:border-flame/50 focus:outline-none transition-colors resize-none font-body"
                  maxLength={2000}
                />
                <p className="mt-2 text-xs text-white/25 font-mono text-right">
                  {message.length}/2000
                </p>
              </div>

              <div>
                <label
                  htmlFor="feedback-email"
                  className="block text-sm font-heading font-bold text-white/70 mb-2"
                >
                  Email{" "}
                  <span className="text-white/30 font-normal">(optional)</span>
                </label>
                <input
                  id="feedback-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-ink border border-white/10 px-5 py-4 text-sm text-white placeholder:text-white/25 focus:border-flame/50 focus:outline-none transition-colors font-mono"
                />
                <p className="mt-2 text-xs text-white/25">
                  Only if you&apos;d like us to follow up.
                </p>
              </div>

              {error && <p className="text-sm text-flame">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-flame hover:bg-flame-600 disabled:opacity-50 text-white py-4 px-6 font-mono text-sm font-semibold tracking-wide uppercase transition-colors flex items-center justify-center gap-2 glow-flame"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Feedback"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
