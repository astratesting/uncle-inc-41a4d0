import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { BarChart3, Users, MessageSquare, TrendingUp } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const supabase = await createClient();

  // Get total signups
  const { count: totalSignups } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  // Get signups from last 7 days
  const sevenDaysAgo = new Date(
    Date.now() - 7 * 24 * 60 * 60 * 1000
  ).toISOString();
  const { count: recentSignups } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .gte("created_at", sevenDaysAgo);

  // Get total feedback
  const { count: totalFeedback } = await supabase
    .from("feedback")
    .select("*", { count: "exact", head: true });

  // Get average rating
  const { data: feedbackData } = await supabase
    .from("feedback")
    .select("rating");

  const avgRating =
    feedbackData && feedbackData.length > 0
      ? (
          feedbackData.reduce((sum, f) => sum + f.rating, 0) /
          feedbackData.length
        ).toFixed(1)
      : "—";

  // Get signups by day for the last 7 days (for chart display)
  const { data: signupsByDay } = await supabase
    .from("profiles")
    .select("created_at")
    .gte("created_at", sevenDaysAgo)
    .order("created_at", { ascending: true });

  // Group by day
  const dayCounts: Record<string, number> = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    const key = d.toLocaleDateString("en-US", { weekday: "short" });
    dayCounts[key] = 0;
  }
  if (signupsByDay) {
    for (const s of signupsByDay) {
      const key = new Date(s.created_at).toLocaleDateString("en-US", {
        weekday: "short",
      });
      if (key in dayCounts) {
        dayCounts[key]++;
      }
    }
  }
  const dayEntries = Object.entries(dayCounts);
  const maxCount = Math.max(...dayEntries.map(([, v]) => v), 1);

  const metrics = [
    {
      label: "Total Signups",
      value: totalSignups ?? 0,
      icon: Users,
      color: "text-indigo-400",
      bg: "bg-indigo-600/10",
    },
    {
      label: "Last 7 Days",
      value: recentSignups ?? 0,
      icon: TrendingUp,
      color: "text-cyan-400",
      bg: "bg-cyan-600/10",
    },
    {
      label: "Feedback Submissions",
      value: totalFeedback ?? 0,
      icon: MessageSquare,
      color: "text-teal-400",
      bg: "bg-teal-600/10",
    },
    {
      label: "Avg. Rating",
      value: avgRating,
      icon: BarChart3,
      color: "text-yellow-400",
      bg: "bg-yellow-600/10",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-gray-400 text-sm mt-1">
          Signup metrics and engagement data
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <div className="flex items-center gap-3">
              <div className={`${m.bg} rounded-lg p-2.5`}>
                <m.icon className={`h-5 w-5 ${m.color}`} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {m.label}
                </p>
                <p className="text-2xl font-bold text-white font-mono mt-0.5">
                  {m.value}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Signup Chart */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-6">
          Signups — Last 7 Days
        </h3>
        <div className="flex items-end gap-3 h-48">
          {dayEntries.map(([day, count]) => (
            <div
              key={day}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <span className="text-xs font-mono text-gray-400">{count}</span>
              <div className="w-full relative" style={{ height: "160px" }}>
                <div
                  className="absolute bottom-0 left-0 right-0 rounded-t-md bg-gradient-to-t from-indigo-600 to-indigo-400 transition-all duration-500"
                  style={{
                    height: `${(count / maxCount) * 100}%`,
                    minHeight: count > 0 ? "8px" : "2px",
                    opacity: count > 0 ? 1 : 0.2,
                  }}
                />
              </div>
              <span className="text-xs text-gray-500">{day}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Feedback Summary */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">
          Feedback Summary
        </h3>
        {totalFeedback === 0 || totalFeedback === null ? (
          <div className="text-center py-8">
            <MessageSquare className="h-8 w-8 text-gray-600 mx-auto mb-3" />
            <p className="text-sm text-gray-500">No feedback yet</p>
            <p className="text-xs text-gray-600 mt-1">
              Feedback submissions will appear here once users start responding
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-800 bg-white/[0.02]">
              <span className="text-sm text-gray-400">Total submissions</span>
              <span className="text-sm font-mono font-semibold text-white">
                {totalFeedback}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-800 bg-white/[0.02]">
              <span className="text-sm text-gray-400">Average rating</span>
              <span className="text-sm font-mono font-semibold text-white">
                {avgRating} / 5
              </span>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
