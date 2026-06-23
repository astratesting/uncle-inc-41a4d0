"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { FolderKanban, Users, FlaskConical, Star } from "lucide-react";

interface SignupData {
  total: number;
  verified: number;
  byDay: { day: string; count: number }[];
}

export default function DashboardPage() {
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
        setData({ total: 0, verified: 0, byDay: [] });
        setLoading(false);
      });
  }, []);

  const signupsByDay = data?.byDay ?? [];
  const totalSignups = data?.total ?? 0;
  const maxCount = Math.max(...signupsByDay.map((d) => d.count), 1);

  const stats = [
    {
      label: "Total Signups",
      value: totalSignups,
      icon: Users,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      label: "Active Tests",
      value: 0,
      icon: FolderKanban,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Total Testers",
      value: 0,
      icon: FlaskConical,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Avg Score",
      value: "\u2014",
      icon: Star,
      color: "text-gold-600",
      bg: "bg-gold-50",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900">
          Overview
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Welcome to Uncle Inc. — your AI-assisted MVP dashboard
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <div className="flex items-center gap-3">
                <div
                  className={`h-10 w-10 rounded-xl ${stat.bg} flex items-center justify-center`}
                >
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                  <p className="text-xl font-heading font-bold text-gray-900">
                    {loading ? "..." : stat.value}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Signups by day chart */}
      <Card>
        <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">
          Signups This Week
        </h3>
        {loading ? (
          <div className="text-sm text-gray-400">Loading chart...</div>
        ) : (
          <div className="flex items-end gap-3 h-40">
            {signupsByDay.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-gray-500">{d.count}</span>
                <div
                  className="w-full rounded-t-lg bg-violet-200 transition-all"
                  style={{
                    height: `${(d.count / maxCount) * 100}%`,
                    minHeight: d.count > 0 ? "8px" : "2px",
                  }}
                />
                <span className="text-xs text-gray-400">{d.day}</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
