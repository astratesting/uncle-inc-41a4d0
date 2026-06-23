"use client";

import { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";

export function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim(), rating }),
      });
      setSent(true);
      setMessage("");
      setRating(0);
    } catch {
      // silent fail
    }
    setLoading(false);
  }

  function handleClose() {
    setOpen(false);
    setSent(false);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-violet-600 text-white shadow-lg hover:bg-violet-700 transition-colors flex items-center justify-center z-50"
        aria-label="Send feedback"
      >
        <MessageSquare className="h-5 w-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
        <h4 className="text-sm font-heading font-semibold text-gray-900">
          Send Feedback
        </h4>
        <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
          <X className="h-4 w-4" />
        </button>
      </div>

      {sent ? (
        <div className="p-6 text-center">
          <p className="text-sm text-gray-600 mb-3">
            Thanks for your feedback!
          </p>
          <button
            onClick={handleClose}
            className="text-sm text-violet-600 hover:text-violet-700 font-medium"
          >
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">
              Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-lg ${
                    star <= rating ? "text-gold-400" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">
              Your feedback
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you think..."
              rows={3}
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !message.trim()}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-3.5 w-3.5" />
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      )}
    </div>
  );
}
