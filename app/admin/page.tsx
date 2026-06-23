"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: string;
}

interface AnalyticsEvent {
  event: string;
  path?: string;
  data?: Record<string, unknown>;
  properties?: Record<string, unknown>;
  distinctId?: string;
  timestamp: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [verifiedCount, setVerifiedCount] = useState(0);
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
        if (usersData) {
          setUsers(usersData.users || []);
          setVerifiedCount(usersData.verifiedCount || 0);
        }
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
        <div className="w-8 h-8 border-2 border-charcoal-200 border-t-violet rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory">
      {/* Nav */}
      <nav className="border-b border-charcoal-100 bg-ivory/80 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-heading font-bold text-xl text-charcoal tracking-tight">
            Uncle Inc.
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium text-charcoal-400 hover:text-charcoal transition-colors">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-charcoal-400 hover:text-charcoal transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-charcoal">Admin</h1>
          <p className="text-charcoal-400 mt-1">Manage users and view analytics</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-coral/10 border border-coral/20 text-coral text-sm">{error}</div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl border border-charcoal-100 bg-white p-5">
            <p className="text-sm text-charcoal-400 mb-1">Total Users</p>
            <p className="text-3xl font-bold text-charcoal">{users.length}</p>
          </div>
          <div className="rounded-xl border border-charcoal-100 bg-white p-5">
            <p className="text-sm text-charcoal-400 mb-1">Verified</p>
            <p className="text-3xl font-bold text-emerald-600">{verifiedCount}</p>
          </div>
          <div className="rounded-xl border border-charcoal-100 bg-white p-5">
            <p className="text-sm text-charcoal-400 mb-1">Analytics Events</p>
            <p className="text-3xl font-bold text-violet">{events.length}</p>
          </div>
        </div>

        {/* Users Table */}
        <div className="rounded-xl border border-charcoal-100 bg-white overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-charcoal-100">
            <h2 className="font-heading text-lg font-bold text-charcoal">All Users</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-charcoal-50 bg-ivory/50">
                  <th className="text-left px-6 py-3 font-medium text-charcoal-400">Email</th>
                  <th className="text-left px-6 py-3 font-medium text-charcoal-400">Name</th>
                  <th className="text-left px-6 py-3 font-medium text-charcoal-400">Verified</th>
                  <th className="text-left px-6 py-3 font-medium text-charcoal-400">Signed Up</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-charcoal-400">
                      No users yet
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="border-b border-charcoal-50 last:border-0 hover:bg-ivory/50 transition-colors">
                      <td className="px-6 py-3 text-charcoal font-medium">{user.email}</td>
                      <td className="px-6 py-3 text-charcoal-400">{user.name || "—"}</td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${user.emailVerified ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-honey-50 text-honey-700 border border-honey-200"}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${user.emailVerified ? "bg-emerald-500" : "bg-honey"}`} />
                          {user.emailVerified ? "Verified" : "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-charcoal-400">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Analytics */}
        <div className="rounded-xl border border-charcoal-100 bg-white overflow-hidden">
          <div className="px-6 py-4 border-b border-charcoal-100">
            <h2 className="font-heading text-lg font-bold text-charcoal">Recent Analytics</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-charcoal-50 bg-ivory/50">
                  <th className="text-left px-6 py-3 font-medium text-charcoal-400">Event</th>
                  <th className="text-left px-6 py-3 font-medium text-charcoal-400">Path</th>
                  <th className="text-left px-6 py-3 font-medium text-charcoal-400">Source</th>
                  <th className="text-left px-6 py-3 font-medium text-charcoal-400">Time</th>
                </tr>
              </thead>
              <tbody>
                {events.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-charcoal-400">
                      No events yet
                    </td>
                  </tr>
                ) : (
                  events.slice(0, 50).map((event, i) => (
                    <tr key={i} className="border-b border-charcoal-50 last:border-0 hover:bg-ivory/50 transition-colors">
                      <td className="px-6 py-3">
                        <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-violet/10 text-violet border border-violet/20">
                          {event.event}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-charcoal-400 font-mono text-xs">{event.path || "—"}</td>
                      <td className="px-6 py-3 text-charcoal-400 text-xs">{event.distinctId || "—"}</td>
                      <td className="px-6 py-3 text-charcoal-400 text-xs">
                        {new Date(event.timestamp).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
