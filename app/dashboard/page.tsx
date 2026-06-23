import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Users, TrendingUp, Activity, Lightbulb, ArrowRight, Shield } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();

  // Fetch real signup counts
  const { count: totalSignups } = await supabase
    .from("signups")
    .select("*", { count: "exact", head: true });

  const { count: verifiedSignups } = await supabase
    .from("signups")
    .select("*", { count: "exact", head: true })
    .eq("verified", true);

  const statCards = [
    {
      label: "Total Signups",
      value: String(totalSignups ?? 0),
      change: "All-time registrations",
      icon: Users,
      color: "text-violet-600",
      bg: "bg-violet-50",
      border: "border-violet-200",
    },
    {
      label: "Verified",
      value: String(verifiedSignups ?? 0),
      change: "Email-confirmed accounts",
      icon: Shield,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    },
    {
      label: "Pending",
      value: String((totalSignups ?? 0) - (verifiedSignups ?? 0)),
      change: "Awaiting email verification",
      icon: Activity,
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-200",
    },
    {
      label: "Conversion",
      value: totalSignups
        ? `${Math.round(((verifiedSignups ?? 0) / totalSignups) * 100)}%`
        : "—",
      change: "Verified / total signups",
      icon: TrendingUp,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Real-time signup metrics for Uncle Inc.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-2xl font-heading font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`h-10 w-10 rounded-xl ${stat.bg} border ${stat.border} flex items-center justify-center`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">{stat.change}</p>
          </Card>
        ))}
      </div>

      {/* Getting Started */}
      <Card>
        <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">
          Getting Started
        </h3>
        <div className="space-y-3">
          {[
            { done: true, text: "Set up Supabase authentication" },
            { done: true, text: "Create signup flow with email verification" },
            { done: true, text: "Build admin dashboard with real-time analytics" },
            { done: false, text: "Deploy your first MVP project" },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className={`h-6 w-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  step.done
                    ? "bg-emerald-500 border-emerald-500"
                    : "border-gray-300"
                }`}
              >
                {step.done && (
                  <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span
                className={`text-sm ${
                  step.done ? "text-gray-500 line-through" : "text-gray-900"
                }`}
              >
                {step.text}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/dashboard/analytics">
          <Card glow className="cursor-pointer h-full">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-semibold text-gray-900">View Analytics</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Signup trends and engagement data
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
          </Card>
        </Link>
        <Link href="/dashboard/settings">
          <Card glow className="cursor-pointer h-full">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-semibold text-gray-900">Account Settings</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Manage your profile and preferences
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
