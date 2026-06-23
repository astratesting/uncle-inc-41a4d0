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
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg shadow-violet-600/25 hover:bg-violet-700 transition-colors"
          aria-label="Open feedback"
        >
          <MessageSquare className="h-5 w-5" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-80 rounded-2xl border border-gray-200 bg-white shadow-xl animate-slide-up">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-sm font-heading font-semibold text-gray-900">
              Send Feedback
            </h3>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-4">
            {submitted ? (
              <div className="text-center py-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 mx-auto mb-3">
                  <Star className="h-6 w-6 text-emerald-600" />
                </div>
                <p className="text-sm font-heading font-semibold text-gray-900 mb-1">
                  Thank you!
                </p>
                <p className="text-xs text-gray-500">
                  Your feedback helps us improve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-2 block">
                    How would you rate your experience?
                  </label>
                  <div className="flex gap-1">
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
                          className={`h-6 w-6 transition-colors ${
                            star <= (hoveredStar || rating)
                              ? "text-honey-500 fill-honey-500"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">
                    Your feedback
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you think..."
                    rows={3}
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-500 resize-none"
                  />
                </div>

                {error && (
                  <p className="text-xs text-red-500">{error}</p>
                )}

                <Button
                  type="submit"
                  size="md"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Feedback"}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
