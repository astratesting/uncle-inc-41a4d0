"use client";

import { useState, useEffect } from "react";
import { Star, MessageSquare, TrendingUp } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface FeedbackEntry {
  id: string;
  email: string;
  response: string;
  rating: number;
  createdAt: string;
}

export function FeedbackDashboard() {
  const [data, setData] = useState<{
    feedback: FeedbackEntry[];
    count: number;
    avgRating: number;
  } | null>(null);

  useEffect(() => {
    trackEvent("dashboard_view");

    async function fetchData() {
      try {
        const res = await fetch("/api/feedback");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch {
        // silent
      }
    }
    fetchData();

    // Poll every 10s for real-time feel
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!data) {
    return (
      <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/80 p-6 animate-pulse">
        <div className="h-4 bg-[#1e1e2e] rounded w-1/3 mb-4"></div>
        <div className="h-8 bg-[#1e1e2e] rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/80 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          <span className="gradient-text">Feedback Overview</span>
        </h2>
        <span className="text-xs text-[#8888a0]">Live</span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-[#0a0a0f]/60 border border-[#1e1e2e]">
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="w-4 h-4 text-[#7C3AED]" />
            <span className="text-xs text-[#8888a0]">Submissions</span>
          </div>
          <p className="text-2xl font-bold text-[#e4e4ec]">{data.count}</p>
        </div>
        <div className="p-4 rounded-xl bg-[#0a0a0f]/60 border border-[#1e1e2e]">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-xs text-[#8888a0]">Avg Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-[#e4e4ec]">
              {data.avgRating > 0 ? data.avgRating.toFixed(1) : "\u2014"}
            </p>
            {data.avgRating > 0 && (
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${
                      s <= Math.round(data.avgRating)
                        ? "fill-[#F59E0B] text-[#F59E0B]"
                        : "text-[#1e1e2e]"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Verbatim responses list */}
      {data.feedback.length > 0 ? (
        <div>
          <h3 className="text-sm font-medium text-[#e4e4ec] mb-3">
            Recent Verbatim Responses
          </h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {data.feedback
              .slice()
              .reverse()
              .slice(0, 10)
              .map((entry) => (
                <div
                  key={entry.id}
                  className="p-3 rounded-lg bg-[#0a0a0f]/60 border border-[#1e1e2e]"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
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
                    <span className="text-xs text-[#8888a0]">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-[#e4e4ec]">{entry.response}</p>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-6">
          <MessageSquare className="w-8 h-8 text-[#1e1e2e] mx-auto mb-2" />
          <p className="text-sm text-[#8888a0]">No feedback submissions yet</p>
        </div>
      )}
    </div>
  );
}
