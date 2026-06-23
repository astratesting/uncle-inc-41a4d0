'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface SignupMetrics {
  totalSignups: number;
  totalVerified: number;
  verifiedAccountUsers: number;
  verifiedWaitlist: number;
  totalAccountUsers: number;
  totalWaitlist: number;
  conversionRate: number;
  daily: { date: string; signups: number; verified: number }[];
  recentSignups: {
    name: string;
    email: string;
    company: string;
    verified: boolean;
    createdAt: string;
    source: string;
  }[];
}

export default function AdminAnalyticsPage() {
  const router = useRouter();
  const [metrics, setMetrics] = useState<SignupMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/analytics/signup-metrics')
      .then(async (r) => {
        if (r.status === 403) {
          router.push('/dashboard');
          return null;
        }
        if (!r.ok) {
          router.push('/login');
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (data) setMetrics(data);
      })
      .catch(() => setError('Failed to load analytics'))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <div className="w-8 h-8 border-2 border-charcoal-200 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <p className="text-charcoal-500">{error || 'No data available'}</p>
      </div>
    );
  }

  // Find max daily value for chart scaling
  const maxDaily = Math.max(...metrics.daily.map(d => d.signups), 1);

  return (
    <div className="min-h-screen bg-ivory">
      {/* Nav */}
      <nav className="border-b border-charcoal-100 bg-ivory/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-heading text-xl font-bold tracking-tight text-charcoal">
            Uncle Inc.
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-sm text-charcoal-400 hover:text-charcoal transition-colors">
              Admin
            </Link>
            <Link href="/dashboard" className="text-sm text-charcoal-400 hover:text-charcoal transition-colors">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="font-heading text-3xl font-bold text-charcoal mb-2">Signup Analytics</h1>
          <p className="text-charcoal-400">Real-time signup metrics from your data store.</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard label="Total Signups" value={metrics.totalSignups} />
          <StatCard label="Verified" value={metrics.totalVerified} accent />
          <StatCard label="Conversion Rate" value={`${metrics.conversionRate}%`} />
          <StatCard label="Account Users" value={metrics.verifiedAccountUsers} sub={`${metrics.verifiedWaitlist} waitlist`} />
        </div>

        {/* Daily signups chart */}
        <div className="bg-white rounded-xl border border-charcoal-100 p-6 mb-10">
          <h2 className="font-heading text-lg font-semibold text-charcoal mb-6">Daily Signups (Last 30 Days)</h2>
          <div className="flex items-end gap-1 h-40">
            {metrics.daily.map((day) => (
              <div key={day.date} className="flex-1 flex flex-col items-center group relative">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:block z-10">
                  <div className="bg-charcoal text-ivory text-xs px-2 py-1 rounded whitespace-nowrap">
                    {day.date}: {day.signups} signup{day.signups !== 1 ? 's' : ''}
                  </div>
                </div>
                <div className="w-full flex flex-col justify-end" style={{ height: '140px' }}>
                  {day.signups > 0 ? (
                    <div
                      className="w-full rounded-t bg-gold/80 hover:bg-gold transition-colors"
                      style={{ height: `${(day.signups / maxDaily) * 140}px`, minHeight: '4px' }}
                    />
                  ) : (
                    <div className="w-full h-[1px] bg-charcoal-100" />
                  )}
                </div>
                <span className="text-[9px] text-charcoal-300 mt-1 truncate w-full text-center">
                  {day.date.slice(5)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Source breakdown */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-xl border border-charcoal-100 p-6">
            <h2 className="font-heading text-lg font-semibold text-charcoal mb-4">Source Breakdown</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-charcoal-500">Account Signups</span>
                <span className="font-semibold text-charcoal">{metrics.totalAccountUsers}</span>
              </div>
              <div className="w-full bg-charcoal-50 rounded-full h-2">
                <div
                  className="bg-gold rounded-full h-2"
                  style={{ width: `${metrics.totalSignups > 0 ? (metrics.totalAccountUsers / metrics.totalSignups) * 100 : 0}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-charcoal-500">Waitlist Signups</span>
                <span className="font-semibold text-charcoal">{metrics.totalWaitlist}</span>
              </div>
              <div className="w-full bg-charcoal-50 rounded-full h-2">
                <div
                  className="bg-charcoal-300 rounded-full h-2"
                  style={{ width: `${metrics.totalSignups > 0 ? (metrics.totalWaitlist / metrics.totalSignups) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-charcoal-100 p-6">
            <h2 className="font-heading text-lg font-semibold text-charcoal mb-4">Verification Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-charcoal-500">Verified</span>
                <span className="font-semibold text-green-700">{metrics.totalVerified}</span>
              </div>
              <div className="w-full bg-charcoal-50 rounded-full h-2">
                <div
                  className="bg-green-500 rounded-full h-2"
                  style={{ width: `${metrics.totalSignups > 0 ? (metrics.totalVerified / metrics.totalSignups) * 100 : 0}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-charcoal-500">Pending</span>
                <span className="font-semibold text-charcoal-400">{metrics.totalSignups - metrics.totalVerified}</span>
              </div>
              <div className="w-full bg-charcoal-50 rounded-full h-2">
                <div
                  className="bg-charcoal-200 rounded-full h-2"
                  style={{ width: `${metrics.totalSignups > 0 ? ((metrics.totalSignups - metrics.totalVerified) / metrics.totalSignups) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recent signups table */}
        <div className="bg-white rounded-xl border border-charcoal-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-charcoal-100">
            <h2 className="font-heading text-lg font-semibold text-charcoal">Recent Signups</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-charcoal-50/50">
                  <th className="text-left px-6 py-3 font-medium text-charcoal-500">Name</th>
                  <th className="text-left px-6 py-3 font-medium text-charcoal-500">Email</th>
                  <th className="text-left px-6 py-3 font-medium text-charcoal-500">Company</th>
                  <th className="text-left px-6 py-3 font-medium text-charcoal-500">Source</th>
                  <th className="text-left px-6 py-3 font-medium text-charcoal-500">Status</th>
                  <th className="text-left px-6 py-3 font-medium text-charcoal-500">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-50">
                {metrics.recentSignups.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-charcoal-300">
                      No signups yet.
                    </td>
                  </tr>
                ) : (
                  metrics.recentSignups.map((s, i) => (
                    <tr key={i} className="hover:bg-charcoal-50/30">
                      <td className="px-6 py-3 text-charcoal font-medium">{s.name || '—'}</td>
                      <td className="px-6 py-3 text-charcoal-500">{s.email}</td>
                      <td className="px-6 py-3 text-charcoal-500">{s.company || '—'}</td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                          s.source === 'account' ? 'bg-gold/10 text-gold-700' : 'bg-charcoal-50 text-charcoal-500'
                        }`}>
                          {s.source}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                          s.verified ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {s.verified ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-charcoal-400 text-xs">
                        {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : '—'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, accent, sub }: { label: string; value: string | number; accent?: boolean; sub?: string }) {
  return (
    <div className="bg-white rounded-xl border border-charcoal-100 p-5">
      <p className="text-xs text-charcoal-400 uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-2xl font-bold font-heading ${accent ? 'text-gold-700' : 'text-charcoal'}`}>{value}</p>
      {sub && <p className="text-xs text-charcoal-300 mt-0.5">{sub}</p>}
    </div>
  );
}
