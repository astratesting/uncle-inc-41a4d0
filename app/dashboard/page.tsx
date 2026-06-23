"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserData {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  isAdmin: boolean;
}

interface MeResponse {
  user: UserData;
  stats: { totalSignups: number };
}

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
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

  if (!data) return null;

  const { user, stats } = data;

  return (
    <div className="min-h-screen bg-ivory">
      {/* Nav */}
      <nav className="border-b border-charcoal-100 bg-ivory/80 backdrop-blur-lg">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-heading font-bold text-xl text-charcoal tracking-tight">
            Uncle Inc.
          </Link>
          <div className="flex items-center gap-4">
            {user.isAdmin && (
              <Link href="/admin" className="text-sm font-medium text-charcoal-400 hover:text-charcoal transition-colors">
                Admin
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-charcoal-400 hover:text-burgundy transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="font-heading text-3xl font-bold text-charcoal mb-2">
          Welcome{user.name ? `, ${user.name}` : ""}
        </h1>
        <p className="text-charcoal-400 text-sm mb-8">Your Uncle Inc. dashboard</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="rounded-xl border border-charcoal-100 bg-white p-6">
            <p className="text-xs font-semibold text-charcoal-300 uppercase tracking-wider mb-1">Your Email</p>
            <p className="text-sm font-medium text-charcoal">{user.email}</p>
          </div>
          <div className="rounded-xl border border-charcoal-100 bg-white p-6">
            <p className="text-xs font-semibold text-charcoal-300 uppercase tracking-wider mb-1">Total Signups</p>
            <p className="font-heading text-3xl font-bold text-burgundy">{stats.totalSignups}</p>
          </div>
          <div className="rounded-xl border border-charcoal-100 bg-white p-6">
            <p className="text-xs font-semibold text-charcoal-300 uppercase tracking-wider mb-1">Member Since</p>
            <p className="text-sm font-medium text-charcoal">
              {new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-charcoal-100 bg-white p-6">
          <h2 className="font-heading text-lg font-bold text-charcoal mb-4">Getting Started</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-teal-500" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </span>
              <span className="text-sm text-charcoal">Your account is verified and active</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              </span>
              <span className="text-sm text-charcoal">Explore AI-assisted MVP prototyping tools</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              </span>
              <span className="text-sm text-charcoal">Launch and track your first project</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
