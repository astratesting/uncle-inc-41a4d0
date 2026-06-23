"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface AnalyticsEvent {
  event: string;
  distinctId: string;
  properties?: Record<string, unknown>;
  timestamp: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/users").then(async (r) => {
        if (r.status === 403) {
          router.push("/dashboard");
          return null;
        }
        if (!r.ok) {
          router.push("/login");
          return null;
        }
        return r.json();
      }),
      fetch("/api/admin/analytics").then(async (r) => {
        if (!r.ok) return { events: [] };
        return r.json();
      }),
    ])
      .then(([usersData, analyticsData]) => {
        if (usersData) setUsers(usersData.users || []);
        setEvents(analyticsData?.events || []);
      })
      .catch(() => setError("Failed to load admin data"))
      .finally(() => setLoading(false));
  }, [router]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <div className="w-8 h-8 border-2 border-charcoal-200 border-t-burgundy rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory">
      <nav className="border-b border-charcoal-100 bg-ivory/80 backdrop-blur-lg">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-heading font-bold text-xl text-charcoal tracking-tight">
            Uncle Inc.
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium text-charcoal-400 hover:text-charcoal transition-colors">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="text-sm font-medium text-charcoal-400 hover:text-burgundy transition-colors">
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="font-heading text-3xl font-bold text-charcoal mb-2">Admin Dashboard</h1>
        <p className="text-charcoal-400 text-sm mb-8">Manage users and view analytics</p>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="rounded-xl border border-charcoal-100 bg-white p-6">
            <p className="text-xs font-semibold text-charcoal-300 uppercase tracking-wider mb-1">Verified Users</p>
            <p className="font-heading text-3xl font-bold text-burgundy">{users.length}</p>
          </div>
          <div className="rounded-xl border border-charcoal-100 bg-white p-6">
            <p className="text-xs font-semibold text-charcoal-300 uppercase tracking-wider mb-1">Analytics Events</p>
            <p className="font-heading text-3xl font-bold text-burgundy">{events.length}</p>
          </div>
        </div>

        {/* Users Table */}
        <div className="rounded-xl border border-charcoal-100 bg-white p-6 mb-8">
          <h2 className="font-heading text-lg font-bold text-charcoal mb-4">Verified Users</h2>
          {users.length === 0 ? (
            <p className="text-sm text-charcoal-400">No verified users yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-charcoal-100">
                    <th className="text-left py-2 font-semibold text-charcoal-400">Name</th>
                    <th className="text-left py-2 font-semibold text-charcoal-400">Email</th>
                    <th className="text-left py-2 font-semibold text-charcoal-400">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-charcoal-50 last:border-0">
                      <td className="py-2.5 text-charcoal">{u.name || "—"}</td>
                      <td className="py-2.5 text-charcoal">{u.email}</td>
                      <td className="py-2.5 text-charcoal-400">
                        {new Date(u.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Analytics Events */}
        <div className="rounded-xl border border-charcoal-100 bg-white p-6">
          <h2 className="font-heading text-lg font-bold text-charcoal mb-4">Analytics Events</h2>
          {events.length === 0 ? (
            <p className="text-sm text-charcoal-400">No events recorded yet.</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {events.slice(0, 50).map((ev, i) => (
                <div key={i} className="flex items-start gap-3 py-2 border-b border-charcoal-50 last:border-0">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-mono bg-charcoal text-ivory flex-shrink-0">
                    {ev.event}
                  </span>
                  <span className="text-xs text-charcoal-400 flex-shrink-0">
                    {new Date(ev.timestamp).toLocaleString()}
                  </span>
                  <span className="text-xs text-charcoal-300 truncate">{ev.distinctId}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
