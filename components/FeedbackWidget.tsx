"use client";

import { useState, type FormEvent } from "react";
import { MessageSquare, X, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }
    setError("");
    setLoading(true);

    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, message }),
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

  function handleClose() {
    setOpen(false);
    setTimeout(() => {
      setSubmitted(false);
      setRating(0);
      setMessage("");
      setError("");
    }, 300);
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gold text-charcoal-950 shadow-lg shadow-gold/20 hover:bg-gold-light transition-colors"
          aria-label="Open feedback"
        >
          <MessageSquare className="h-5 w-5" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-80 rounded-xl border border-charcoal-700 bg-charcoal-900 shadow-2xl shadow-black/40">
          <div className="flex items-center justify-between p-4 border-b border-charcoal-800">
            <h3 className="text-sm font-semibold text-ivory">Send Feedback</h3>
            <button
              onClick={handleClose}
              className="text-charcoal-500 hover:text-ivory transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {submitted ? (
            <div className="p-6 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 mx-auto mb-3">
                <Star className="h-5 w-5 text-emerald-400" />
              </div>
              <p className="text-sm font-medium text-ivory">Thank you!</p>
              <p className="text-xs text-charcoal-400 mt-1">
                Your feedback helps us improve.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <p className="text-xs text-charcoal-400 mb-2">How would you rate your experience?</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      className="p-0.5"
                    >
                      <Star
                        className={`h-6 w-6 transition-colors ${
                          star <= (hoveredStar || rating)
                            ? "text-gold fill-gold"
                            : "text-charcoal-600"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-charcoal-400 mb-1.5 block">
                  Your feedback
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you think..."
                  rows={3}
                  className="w-full rounded-lg border border-charcoal-700 bg-charcoal-800/50 px-3 py-2 text-sm text-ivory placeholder-charcoal-500 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold resize-none"
                />
              </div>

              {error && (
                <p className="text-xs text-red-400">{error}</p>
              )}

              <Button
                type="submit"
                size="sm"
                disabled={loading}
                className="w-full"
              >
                {loading ? "Sending..." : "Send Feedback"}
              </Button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
