"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Compass } from "lucide-react";

interface StatsData {
  total: number;
  counts: Record<string, number>;
  recentEntries: {
    id: string;
    frictionPoint: string;
    details: string;
    createdAt: string;
  }[];
}

const COLORS: Record<string, { bg: string; bar: string; text: string }> = {
  "Account creation": {
    bg: "bg-indigo-500/10",
    bar: "bg-indigo-500",
    text: "text-indigo-400",
  },
  "Understanding the product": {
    bg: "bg-cyan-500/10",
    bar: "bg-cyan-500",
    text: "text-cyan-400",
  },
  "Finding features": {
    bg: "bg-teal-500/10",
    bar: "bg-teal-500",
    text: "text-teal-400",
  },
  Other: {
    bg: "bg-amber-500/10",
    bar: "bg-amber-500",
    text: "text-amber-400",
  },
};

export default function FrictionDashboardPage() {
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/feedback/stats")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load stats");
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const maxCount = data ? Math.max(...Object.values(data.counts), 1) : 1;

  return (
    <div className="min-h-screen bg-ink">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800/50 bg-ink/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600/20 border border-indigo-500/30">
                <Compass className="h-5 w-5 text-indigo-400" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                Uncle Inc.
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/feedback" className="text-sm text-gray-400 hover:text-white transition-colors">
                Give Feedback
              </Link>
              <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-24 pb-16 px-4">
        <div className="mx-auto max-w-3xl animate-slide-up">
          <h1 className="font-sans text-3xl font-bold text-white mb-2">Friction Dashboard</h1>
          <p className="text-gray-400 text-sm mb-8">
            Aggregated onboarding feedback from new users
          </p>

          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-gray-700 border-t-indigo-500 rounded-full animate-spin" />
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {data && !error && (
            <>
              {/* Total count */}
              <div className="rounded-xl border border-gray-800 bg-white/[0.03] p-6 mb-6">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Total Responses
                </p>
                <p className="font-sans text-4xl font-bold text-white">{data.total}</p>
              </div>

              {/* Bar chart */}
              <div className="rounded-xl border border-gray-800 bg-white/[0.03] p-6 mb-6">
                <h2 className="text-sm font-semibold text-gray-300 mb-4">Friction Points</h2>
                <div className="space-y-4">
                  {Object.entries(data.counts).map(([label, count]) => {
                    const colors = COLORS[label] || COLORS["Other"];
                    const pct = data.total > 0 ? Math.round((count / data.total) * 100) : 0;
                    const barWidth = data.total > 0 ? (count / maxCount) * 100 : 0;

                    return (
                      <div key={label}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm text-gray-300">{label}</span>
                          <span className={`text-sm font-semibold ${colors.text}`}>
                            {count} <span className="text-gray-500 font-normal">({pct}%)</span>
                          </span>
                        </div>
                        <div className={`h-3 rounded-full ${colors.bg} overflow-hidden`}>
                          <div
                            className={`h-full rounded-full ${colors.bar} transition-all duration-700`}
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent entries */}
              <div className="rounded-xl border border-gray-800 bg-white/[0.03] p-6">
                <h2 className="text-sm font-semibold text-gray-300 mb-4">Recent Responses</h2>
                {data.recentEntries.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-8">
                    No feedback submitted yet. Share the feedback page with your users!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {data.recentEntries.map((entry) => {
                      const colors = COLORS[entry.frictionPoint] || COLORS["Other"];
                      return (
                        <div
                          key={entry.id}
                          className="rounded-lg border border-gray-800 bg-white/[0.02] p-4"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-xs font-semibold ${colors.text}`}>
                              {entry.frictionPoint}
                            </span>
                            <span className="text-xs text-gray-600">
                              {new Date(entry.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          {entry.details && (
                            <p className="text-sm text-gray-400 mt-1">{entry.details}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
