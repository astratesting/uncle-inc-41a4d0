"use client";

import { useEffect, useState } from "react";
import { BarChart3, Users, TrendingUp, Mail } from "lucide-react";

interface StatsData {
  signups: { total: number; verified: number };
  events: Record<string, number>;
  recentPageViews: number;
}

const ICON_MAP = [Users, Mail, BarChart3, TrendingUp];

export function StatsGrid() {
  const [stats, setStats] = useState<StatsData | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setStats(data);
      })
      .catch(() => {});
  }, []);

  const statCards = [
    {
      label: "Total Signups",
      value: stats?.signups.total ?? 0,
      trend: stats ? `${stats.signups.verified} verified` : "Loading...",
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20",
    },
    {
      label: "Verified Users",
      value: stats?.signups.verified ?? 0,
      trend: stats
        ? `${stats.signups.total > 0 ? Math.round((stats.signups.verified / stats.signups.total) * 100) : 0}% rate`
        : "Loading...",
      color: "text-teal-400",
      bg: "bg-teal-500/10",
      border: "border-teal-500/20",
    },
    {
      label: "Page Views",
      value: stats?.events.page_view ?? 0,
      trend: stats ? `${stats.recentPageViews} this week` : "Loading...",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
    },
    {
      label: "Logins",
      value: stats?.events.login ?? 0,
      trend: stats
        ? `${stats.events.signup_started} signup attempts`
        : "Loading...",
      color: "text-indigo-300",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, i) => {
        const Icon = ICON_MAP[i];
        return (
          <div
            key={stat.label}
            className={`p-5 rounded-xl border ${stat.border} ${stat.bg} backdrop-blur-sm`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-[#8888a0] uppercase tracking-wider">
                {stat.label}
              </span>
              <Icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div className={`text-2xl font-bold ${stat.color} font-mono`}>
              {stat.value}
            </div>
            <p className="text-xs text-[#8888a0] mt-1">{stat.trend}</p>
          </div>
        );
      })}
    </div>
  );
}
