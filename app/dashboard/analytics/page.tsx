"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { BarChart3, Users, MessageSquare, TrendingUp } from "lucide-react";

interface SignupData {
  total: number;
  byDay: { day: string; count: number }[];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<SignupData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics/signups")
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        setData({ total: 0, byDay: [] });
        setLoading(false);
      });
  }, []);

  const signupsByDay = data?.byDay ?? [];
  const totalSignups = data?.total ?? 0;
  const maxCount = Math.max(...signupsByDay.map((d) => d.count), 1);

  const metrics = [
    {
      label: "Total Signups",
      value: totalSignups,
      icon: Users,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      label: "Last 7 Days",
      value: signupsByDay.reduce((sum, d) => sum + d.count, 0),
      icon: TrendingUp,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Feedback Submissions",
      value: 0,
      icon: MessageSquare,
      color: "text-gold-600",
      bg: "bg-gold-50",
    },
    {
      label: "Avg. Rating",
      value: "—",
      icon: BarChart3,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">
          Signup metrics and engagement data
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <div className="flex items-center gap-3">
              <div className={`${m.bg} rounded-xl p-2.5`}>
                <m.icon className={`h-5 w-5 ${m.color}`} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {m.label}
                </p>
                <p className="text-2xl font-heading font-bold text-gray-900 mt-0.5">
                  {loading ? "—" : m.value}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Signups Bar Chart */}
      <Card>
        <h3 className="text-lg font-heading font-semibold text-gray-900 mb-6">
          Signups — Last 7 Days
        </h3>
        {loading ? (
          <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
            Loading data...
          </div>
        ) : (
          <div className="flex items-end justify-between gap-3 h-48">
            {signupsByDay.map((d) => (
              <div
                key={d.day}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <span className="text-xs font-medium text-gray-500">
                  {d.count}
                </span>
                <div className="w-full flex items-end justify-center" style={{ height: "140px" }}>
                  <div
                    className="w-full max-w-[48px] rounded-t-lg bg-gradient-to-t from-violet-600 to-violet-400 transition-all duration-500"
                    style={{
                      height: `${
                        maxCount > 0 ? (d.count / maxCount) * 100 : 0
                      }%`,
                      minHeight: d.count > 0 ? "8px" : "2px",
                    }}
                  />
                </div>
                <span className="text-xs text-gray-400 font-medium">
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Recent Activity Table */}
      <Card>
        <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">
          Recent Activity
        </h3>
        <div className="text-sm text-gray-500 text-center py-8">
          No activity yet. Signup data will appear here as users register.
        </div>
      </Card>
    </div>
  );
}
