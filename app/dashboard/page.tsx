"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserData {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
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
        <div className="w-8 h-8 border-2 border-charcoal-200 border-t-violet rounded-full animate-spin" />
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
              <Link href="/admin" className="text-sm font-medium text-violet hover:text-coral transition-colors">
                Admin
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-charcoal-400 hover:text-charcoal transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-charcoal">Dashboard</h1>
          <p className="text-charcoal-400 mt-1">Welcome back, {user.name || user.email}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl border border-charcoal-100 bg-white p-5">
            <p className="text-sm text-charcoal-400 mb-1">Email</p>
            <p className="font-semibold text-charcoal truncate">{user.email}</p>
          </div>
          <div className="rounded-xl border border-charcoal-100 bg-white p-5">
            <p className="text-sm text-charcoal-400 mb-1">Status</p>
            <div className="flex items-center gap-2">
              <span className={`inline-block w-2 h-2 rounded-full ${user.emailVerified ? "bg-emerald-500" : "bg-honey"}`} />
              <span className="font-semibold text-charcoal">
                {user.emailVerified ? "Verified" : "Unverified"}
              </span>
            </div>
          </div>
          <div className="rounded-xl border border-charcoal-100 bg-white p-5">
            <p className="text-sm text-charcoal-400 mb-1">Member Since</p>
            <p className="font-semibold text-charcoal">
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Verification Banner */}
        {!user.emailVerified && (
          <div className="mb-8 p-4 rounded-xl border border-honey/30 bg-honey/5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-honey/10 border border-honey/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-honey" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-charcoal text-sm">Verify your email</p>
                <p className="text-charcoal-400 text-sm mt-0.5">
                  Please check your inbox and click the verification link to unlock all features.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Getting Started */}
        <div className="rounded-xl border border-charcoal-100 bg-white p-6">
          <h2 className="font-heading text-lg font-bold text-charcoal mb-4">Getting Started</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${user.emailVerified ? "bg-emerald-500 text-white" : "bg-charcoal-100 text-charcoal-400"}`}>
                {user.emailVerified ? "✓" : "1"}
              </span>
              <span className={user.emailVerified ? "text-charcoal-400 line-through" : "text-charcoal"}>Verify your email</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-5 h-5 rounded-full bg-charcoal-100 text-charcoal-400 flex items-center justify-center text-xs">2</span>
              <span className="text-charcoal">Complete your profile</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-5 h-5 rounded-full bg-charcoal-100 text-charcoal-400 flex items-center justify-center text-xs">3</span>
              <span className="text-charcoal">Create your first project</span>
            </div>
          </div>
        </div>

        {/* Community Stats */}
        <div className="mt-6 rounded-xl border border-violet/20 bg-violet/5 p-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet/10 border border-violet/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-violet" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-charcoal">{stats.totalSignups} verified members</p>
              <p className="text-xs text-charcoal-400">Building the future together</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
