"use client";

import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";

interface FeedbackEntry {
  id: string;
  email: string;
  response: string;
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
  const [feedbackText, setFeedbackText] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response: feedbackText }),
      });

      if (res.ok) {
        const data = await res.json();
        setFeedback((prev) => [
          {
            id: data.entry.id,
            email: data.entry.email,
            response: data.entry.response,
            createdAt: data.entry.createdAt,
          },
          ...prev,
        ]);
        setFeedbackText("");
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/80 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">
            <span className="gradient-text">Micro-Survey</span>
          </h2>
          <p className="text-xs text-[#8888a0] mt-0.5">
            Collect insights from your users
          </p>
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-teal-400" />
          <span className="text-sm font-mono text-teal-400">
            {feedback.length} {feedback.length === 1 ? "response" : "responses"}
          </span>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-[#0a0a0f] border border-[#1e1e2e] mb-4">
        <p className="text-sm font-medium text-[#e4e4ec] mb-3">
          What&apos;s your biggest marketing challenge?
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Type your response..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#12121a] border border-[#1e1e2e] text-[#e4e4ec] placeholder:text-[#8888a0] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors text-sm"
          />
          <button
            type="submit"
            disabled={loading || !feedbackText.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
        {success && (
          <p className="text-xs text-teal-400 mt-2">
            Thanks for your feedback!
          </p>
        )}
      </div>

      {/* Feedback Responses */}
      {feedback.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-[#8888a0] uppercase tracking-wider mb-3">
            All Responses
          </h3>
          <div className="max-h-64 overflow-y-auto space-y-2">
            {feedback.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-[#0d0d16] border border-[#1e1e2e]"
              >
                <MessageSquare className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#e4e4ec]">
                    &ldquo;{entry.response}&rdquo;
                  </p>
                  <span className="text-xs text-[#666]">
                    {entry.email} &middot;{" "}
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
