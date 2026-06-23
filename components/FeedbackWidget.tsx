"use client";

import { useState, type FormEvent } from "react";
import { MessageSquare, X, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

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

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Please sign in to submit feedback");
      setLoading(false);
      return;
    }

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
    // Reset form after animation
    setTimeout(() => {
      setSubmitted(false);
      setRating(0);
      setMessage("");
      setError("");
    }, 300);
  }

  return (
    <>
      {/* Toggle Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-500 transition-all duration-200 hover:scale-105"
          aria-label="Open feedback"
        >
          <MessageSquare className="h-5 w-5" />
        </button>
      )}

      {/* Panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-80 rounded-xl border border-gray-800 bg-ink/95 backdrop-blur-md shadow-2xl animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
            <h3 className="text-sm font-semibold text-white">Quick Feedback</h3>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-white transition-colors"
              aria-label="Close feedback"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4">
            {submitted ? (
              <div className="text-center py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600/20 border border-teal-500/30 mx-auto mb-3">
                  <Star className="h-5 w-5 text-teal-400 fill-teal-400" />
                </div>
                <p className="text-sm font-medium text-white">Thank you!</p>
                <p className="text-xs text-gray-500 mt-1">
                  Your feedback helps us improve
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Star Rating */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    How would you rate your experience?
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className="p-0.5 transition-transform hover:scale-110"
                        aria-label={`Rate ${star} stars`}
                      >
                        <Star
                          className={`h-6 w-6 transition-colors ${
                            star <= (hoveredStar || rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-600"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="feedback-message"
                    className="block text-xs font-medium text-gray-400 mb-1.5"
                  >
                    Tell us more (optional)
                  </label>
                  <textarea
                    id="feedback-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What can we improve?"
                    maxLength={1000}
                    rows={3}
                    className="w-full rounded-lg border border-gray-700 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 resize-none"
                  />
                </div>

                {error && (
                  <p className="text-xs text-red-400">{error}</p>
                )}

                <Button
                  type="submit"
                  size="sm"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Submit Feedback"}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
