"use client";

import { useState, useEffect } from "react";

interface Stats {
  total: number;
  verified: number;
  goal: number;
}

export function SignupCounter() {
  const [stats, setStats] = useState<Stats>({ total: 0, verified: 0, goal: 10 });

  useEffect(() => {
    let mounted = true;

    async function fetchStats() {
      try {
        const res = await fetch("/api/stats");
        if (res.ok && mounted) {
          const data = await res.json();
          setStats(data);
        }
      } catch {
        // silently fail
      }
    }

    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const percentage = Math.min((stats.total / stats.goal) * 100, 100);

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-mono text-white/60">
          <span className="text-green-accent font-bold">{stats.total}</span> of{" "}
          <span className="text-white font-bold">{stats.goal}</span> spots claimed
        </span>
        <span className="text-xs font-mono text-white/40">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full h-2 bg-navy-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-accent rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
