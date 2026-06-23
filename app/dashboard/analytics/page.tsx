'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface AnalyticsData {
  totalSignups: number;
  verifiedSignups: number;
  target: number;
  progress: number;
  recentSignups: Array<{
    name: string;
    email: string;
    companyName: string;
    verified: boolean;
    createdAt: string;
  }>;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/analytics/signups')
      .then(res => {
        if (res.status === 401) {
          window.location.href = '/login';
          return;
        }
        return res.json();
      })
      .then(data => {
        if (data) {
          setData(data);
        }
      })
      .catch(() => setError('Failed to load analytics'))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFBF5' }}>
      {/* Top Nav */}
      <nav className="border-b" style={{ borderColor: '#e2e0d8', backgroundColor: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight" style={{ color: '#1a1a1a', fontFamily: 'Georgia, serif' }}>
            Uncle Inc.
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm" style={{ color: '#666' }}>Dashboard</Link>
            <form action="/api/logout" method="POST">
              <button type="submit" className="text-sm px-3 py-1.5 rounded-lg transition-colors" style={{ backgroundColor: '#1a1a1a', color: '#FFFBF5' }}>
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: '#1a1a1a', fontFamily: 'Georgia, serif' }}>Analytics Dashboard</h1>
            <p className="mt-1" style={{ color: '#666' }}>Track verified signups and user growth</p>
          </div>
        </div>

        {loading && (
          <div className="text-center py-12" style={{ color: '#666' }}>Loading analytics...</div>
        )}

        {error && (
          <div className="p-4 rounded-lg" style={{ backgroundColor: '#722F3715', color: '#722F37' }}>{error}</div>
        )}

        {data && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="rounded-2xl p-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e0d8' }}>
                <p className="text-sm mb-1" style={{ color: '#666' }}>Total Signups</p>
                <p className="text-4xl font-bold" style={{ color: '#1a1a1a' }}>{data.totalSignups}</p>
              </div>

              <div className="rounded-2xl p-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e0d8' }}>
                <p className="text-sm mb-1" style={{ color: '#666' }}>Verified Users</p>
                <p className="text-4xl font-bold" style={{ color: '#C8A951' }}>{data.verifiedSignups}</p>
              </div>

              <div className="rounded-2xl p-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e0d8' }}>
                <p className="text-sm mb-1" style={{ color: '#666' }}>Target: 10 Verified Users</p>
                <p className="text-4xl font-bold" style={{ color: data.verifiedSignups >= 10 ? '#22C55E' : '#722F37' }}>
                  {data.verifiedSignups >= 10 ? '✓ Reached!' : `${data.verifiedSignups}/10`}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="rounded-2xl p-6 mb-8" style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e0d8' }}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium" style={{ color: '#1a1a1a' }}>Progress to 10 Verified Users</span>
                <span className="text-sm font-bold" style={{ color: '#C8A951' }}>{data.progress}%</span>
              </div>
              <div className="w-full h-3 rounded-full" style={{ backgroundColor: '#e2e0d8' }}>
                <div
                  className="h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${data.progress}%`,
                    backgroundColor: data.progress >= 100 ? '#22C55E' : '#C8A951',
                  }}
                />
              </div>
              <p className="text-xs mt-2" style={{ color: '#999' }}>
                {10 - data.verifiedSignups > 0
                  ? `${10 - data.verifiedSignups} more verified users needed to reach target`
                  : 'Target reached! 🎉'}
              </p>
            </div>

            {/* Recent Signups Table */}
            <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e0d8' }}>
              <div className="px-6 py-4 border-b" style={{ borderColor: '#e2e0d8' }}>
                <h2 className="text-lg font-semibold" style={{ color: '#1a1a1a' }}>Recent Signups</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: '#FFFBF5' }}>
                      <th className="text-left px-6 py-3 font-medium" style={{ color: '#666' }}>Name</th>
                      <th className="text-left px-6 py-3 font-medium" style={{ color: '#666' }}>Email</th>
                      <th className="text-left px-6 py-3 font-medium" style={{ color: '#666' }}>Company</th>
                      <th className="text-center px-6 py-3 font-medium" style={{ color: '#666' }}>Verified</th>
                      <th className="text-left px-6 py-3 font-medium" style={{ color: '#666' }}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentSignups.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-12" style={{ color: '#999' }}>
                          No signups yet. Share your signup link to get started!
                        </td>
                      </tr>
                    ) : (
                      data.recentSignups.map((signup, i) => (
                        <tr key={i} className="border-t" style={{ borderColor: '#e2e0d8' }}>
                          <td className="px-6 py-3" style={{ color: '#1a1a1a' }}>{signup.name}</td>
                          <td className="px-6 py-3" style={{ color: '#666' }}>{signup.email}</td>
                          <td className="px-6 py-3" style={{ color: '#666' }}>{signup.companyName}</td>
                          <td className="px-6 py-3 text-center">
                            {signup.verified ? (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: '#22C55E15', color: '#22C55E' }}>
                                ✓ Verified
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: '#C8A95115', color: '#C8A951' }}>
                                Pending
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-3" style={{ color: '#999' }}>{formatDate(signup.createdAt)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
