"use client";

import { useState } from "react";
import { Star, Send, CheckCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface FeedbackWidgetInlineProps {
  context: string;
  placeholder?: string;
}

export function FeedbackWidgetInline({
  context,
  placeholder = "Tell us what you think...",
}: FeedbackWidgetInlineProps) {
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!feedbackText.trim() || rating === 0) return;

    setLoading(true);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          response: feedbackText,
          rating,
          context,
        }),
      });

      if (res.ok) {
        setFeedbackText("");
        setRating(0);
        setSuccess(true);
        trackEvent("inline_feedback_submitted", { context, rating });
        setTimeout(() => setSuccess(false), 3000);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 rounded-xl bg-[#0a0a0f]/60 border border-[#1e1e2e]">
      <p className="text-sm font-medium text-[#e4e4ec] mb-3">
        How did we do? Quick feedback:
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Star rating */}
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
                className={`w-5 h-5 transition-colors ${
                  star <= (hoveredRating || rating)
                    ? "fill-[#F59E0B] text-[#F59E0B]"
                    : "text-[#1e1e2e]"
                }`}
              />
            </button>
          ))}
        </div>

        <textarea
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder={placeholder}
          rows={2}
          className="w-full px-3 py-2 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e] text-[#e4e4ec] placeholder:text-[#8888a0] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 resize-none text-sm"
        />

        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={loading || !feedbackText.trim() || rating === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-3 h-3" />
            {loading ? "Sending..." : "Send"}
          </button>
          {success && (
            <span className="flex items-center gap-1 text-xs text-teal-400">
              <CheckCircle className="w-3 h-3" />
              Thanks!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
