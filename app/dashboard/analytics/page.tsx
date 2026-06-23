"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AnalyticsData {
  total: number;
  verified: number;
}

export default function AnalyticsPage() {
  const router = useRouter();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics/signups")
      .then(async (res) => {
        if (!res.ok) {
          router.push("/login");
          return;
        }
        return res.json();
      })
      .then((d) => {
        if (d) setData(d);
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <div className="w-8 h-8 border-2 border-charcoal-200 border-t-burgundy rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) return null;

  const conversionRate = data.total > 0 ? Math.round((data.verified / data.total) * 100) : 0;

  return (
    <div className="min-h-screen bg-ivory">
      {/* Nav */}
      <nav className="border-b border-charcoal-100 bg-ivory/80 backdrop-blur-lg">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-heading font-bold text-xl text-charcoal tracking-tight">
            Uncle Inc.
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium text-charcoal-400 hover:text-charcoal transition-colors">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="font-heading text-3xl font-bold text-charcoal mb-2">
          Analytics
        </h1>
        <p className="text-charcoal-400 text-sm mb-8">Signup metrics and conversion data</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="rounded-xl border border-charcoal-100 bg-white p-6">
            <p className="text-xs font-semibold text-charcoal-300 uppercase tracking-wider mb-1">Total Signups</p>
            <p className="font-heading text-3xl font-bold text-charcoal">{data.total}</p>
          </div>
          <div className="rounded-xl border border-charcoal-100 bg-white p-6">
            <p className="text-xs font-semibold text-charcoal-300 uppercase tracking-wider mb-1">Verified</p>
            <p className="font-heading text-3xl font-bold text-burgundy">{data.verified}</p>
          </div>
          <div className="rounded-xl border border-charcoal-100 bg-white p-6">
            <p className="text-xs font-semibold text-charcoal-300 uppercase tracking-wider mb-1">Conversion Rate</p>
            <p className="font-heading text-3xl font-bold text-gold">{conversionRate}%</p>
          </div>
        </div>

        <div className="rounded-xl border border-charcoal-100 bg-white p-6">
          <h2 className="font-heading text-lg font-bold text-charcoal mb-4">Overview</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-charcoal-600">Verified signups</span>
                <span className="font-medium text-charcoal">{data.verified} of {data.total}</span>
              </div>
              <div className="w-full bg-charcoal-100 rounded-full h-2">
                <div
                  className="bg-burgundy rounded-full h-2 transition-all"
                  style={{ width: `${conversionRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
