"use client";

import { useState } from "react";
import { Star, Send, CheckCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface FeedbackEntry {
  id: string;
  email: string;
  response: string;
  rating: number;
  createdAt: string;
}

export function FeedbackWidget({
  initialFeedback,
  feedbackCount,
}: {
  initialFeedback: FeedbackEntry[];
  feedbackCount: number;
}) {
  const [feedback, setFeedback] = useState(initialFeedback);
  const [count, setCount] = useState(feedbackCount);
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen(true);
    trackEvent("widget_open");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!feedbackText.trim() || rating === 0) return;

    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response: feedbackText, rating }),
      });

      if (res.ok) {
        const data = await res.json();
        setFeedback((prev) => [
          {
            id: data.entry.id,
            email: data.entry.email,
            response: data.entry.response,
            rating: data.entry.rating,
            createdAt: data.entry.createdAt,
          },
          ...prev,
        ]);
        setFeedbackText("");
        setRating(0);
        setCount((c) => c + 1);
        setSuccess(true);
        trackEvent("widget_submit", { rating });
        setTimeout(() => setSuccess(false), 3000);
      }
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) {
    return (
      <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/80 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              <span className="gradient-text">Micro-Survey</span>
            </h2>
            <p className="text-xs text-[#8888a0] mt-0.5">
              {count} submission{count !== 1 ? "s" : ""} collected
            </p>
          </div>
          <button
            onClick={handleOpen}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
          >
            Give Feedback
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/80 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">
            <span className="gradient-text">Micro-Survey</span>
          </h2>
          <p className="text-xs text-[#8888a0] mt-0.5">
            {count} submission{count !== 1 ? "s" : ""} collected
          </p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-xs text-[#8888a0] hover:text-[#e4e4ec] transition-colors"
        >
          Collapse
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Star rating */}
        <div>
          <label className="block text-sm font-medium text-[#e4e4ec] mb-2">
            How would you rate your experience?
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-7 h-7 transition-colors ${
                    star <= (hoveredRating || rating)
                      ? "fill-[#F59E0B] text-[#F59E0B]"
                      : "text-[#1e1e2e]"
                  }`}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-2 text-sm text-[#8888a0] self-center">
                {rating}/5
              </span>
            )}
          </div>
        </div>

        {/* Open text */}
        <div>
          <label
            htmlFor="feedback-text"
            className="block text-sm font-medium text-[#e4e4ec] mb-1.5"
          >
            Your feedback
          </label>
          <textarea
            id="feedback-text"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Tell us what you think..."
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#1e1e2e] text-[#e4e4ec] placeholder:text-[#8888a0] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/30 resize-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading || !feedbackText.trim() || rating === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 bg-[#7C3AED] text-white hover:bg-[#6D28D9] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            {loading ? "Sending..." : "Submit"}
          </button>
          {success && (
            <span className="flex items-center gap-1 text-sm text-[#14b8a6]">
              <CheckCircle className="w-4 h-4" />
              Thanks for your feedback!
            </span>
          )}
        </div>
      </form>

      {/* Recent verbatim responses */}
      {feedback.length > 0 && (
        <div className="mt-6 pt-4 border-t border-[#1e1e2e]">
          <h3 className="text-sm font-medium text-[#e4e4ec] mb-3">
            Recent Responses
          </h3>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {feedback.slice(0, 5).map((entry) => (
              <div
                key={entry.id}
                className="p-3 rounded-lg bg-[#0a0a0f]/60 border border-[#1e1e2e]"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= entry.rating
                            ? "fill-[#F59E0B] text-[#F59E0B]"
                            : "text-[#1e1e2e]"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[#8888a0]">
                    {entry.email.split("@")[0]}
                  </span>
                </div>
                <p className="text-sm text-[#e4e4ec]">{entry.response}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
