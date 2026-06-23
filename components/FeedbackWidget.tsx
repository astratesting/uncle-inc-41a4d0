"use client";

import { useState, type FormEvent } from "react";
import { MessageSquare, X, Star } from "lucide-react";

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
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center bg-charcoal text-ivory shadow-lg hover:bg-charcoal-600 transition-colors premium-shadow"
          aria-label="Send feedback"
        >
          <MessageSquare className="h-5 w-5" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-80 bg-white border border-gold-200/40 shadow-xl premium-shadow-lg animate-slide-up">
          <div className="flex items-center justify-between p-5 border-b border-gold-200/30">
            <h3 className="text-sm font-heading font-semibold text-charcoal">
              Send Feedback
            </h3>
            <button
              onClick={handleClose}
              className="text-charcoal-300 hover:text-charcoal transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-5">
            {submitted ? (
              <div className="text-center py-8">
                <div className="flex h-12 w-12 items-center justify-center border border-gold-300 bg-gold-50 mx-auto mb-4">
                  <Star className="h-5 w-5 text-gold-500 fill-gold-500" />
                </div>
                <p className="text-sm font-heading font-semibold text-charcoal mb-1">
                  Thank you
                </p>
                <p className="text-xs text-charcoal-400 font-light">
                  Your feedback helps us improve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-xs font-body font-medium text-charcoal-400 mb-2.5 block tracking-wide uppercase">
                    How would you rate your experience?
                  </label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        onClick={() => setRating(star)}
                        className="p-0.5"
                      >
                        <Star
                          className={`h-5 w-5 transition-colors ${
                            star <= (hoveredStar || rating)
                              ? "text-gold-400 fill-gold-400"
                              : "text-charcoal-200"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-body font-medium text-charcoal-400 mb-2 block tracking-wide uppercase">
                    Your feedback
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you think..."
                    rows={3}
                    className="w-full border border-gold-200/50 bg-ivory px-4 py-3 text-sm text-charcoal placeholder-charcoal-300 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/20 resize-none font-body"
                  />
                </div>

                {error && (
                  <p className="text-xs text-burgundy-500">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-charcoal text-ivory py-3 text-sm font-body font-semibold tracking-wide uppercase hover:bg-charcoal-800 transition-colors disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Feedback"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
