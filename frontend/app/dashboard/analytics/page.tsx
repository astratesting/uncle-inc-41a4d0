"use client";

import { useEffect, useState } from "react";
import { BarChart3, Users, Target, TrendingUp } from "lucide-react";

export default function AnalyticsPage() {
  const [data, setData] = useState<{
    count: number;
    verified: number;
    target: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/signup-count")
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const progress = data ? Math.min((data.verified / data.target) * 100, 100) : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-sm text-[#8888a0] mt-1">
          Track your MVP performance and user engagement
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 rounded-xl border border-[#1e1e2e] bg-[#0d0d16]">
          <div className="w-6 h-6 border-2 border-[#c9a96e] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : data ? (
        <>
          {/* Signup Progress */}
          <div className="rounded-xl border border-[#1e1e2e] bg-[#0d0d16] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Signup Goal Progress</h2>
                <p className="text-sm text-[#8888a0]">
                  {data.verified} of {data.target} verified signups
                </p>
              </div>
            </div>
            <div className="w-full bg-[#1e1e2e] rounded-full h-3 mb-2">
              <div
                className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-[#8888a0]">
              <span>{data.verified} verified</span>
              <span>{data.target} target</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-[#1e1e2e] bg-[#0d0d16] p-5">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-5 h-5 text-cyan-400" />
                <span className="text-sm text-[#8888a0]">Verified Users</span>
              </div>
              <p className="text-3xl font-bold">{data.verified}</p>
            </div>
            <div className="rounded-xl border border-[#1e1e2e] bg-[#0d0d16] p-5">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-5 h-5 text-[#c9a96e]" />
                <span className="text-sm text-[#8888a0]">Target</span>
              </div>
              <p className="text-3xl font-bold">{data.target}</p>
            </div>
            <div className="rounded-xl border border-[#1e1e2e] bg-[#0d0d16] p-5">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span className="text-sm text-[#8888a0]">Progress</span>
              </div>
              <p className="text-3xl font-bold">{Math.round(progress)}%</p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center rounded-xl border border-[#1e1e2e] bg-[#0d0d16]">
          <div className="w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
            <BarChart3 className="w-9 h-9 text-cyan-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Analytics Coming Soon</h2>
          <p className="text-sm text-[#8888a0] max-w-md">
            Once you create projects and start gathering user feedback, detailed
            analytics and insights will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
