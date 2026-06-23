import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Users, TrendingUp, Activity, Zap } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();

  // Get real signup count from profiles table
  const { count: signupCount } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  // Get feedback count
  const { count: feedbackCount } = await supabase
    .from("feedback")
    .select("*", { count: "exact", head: true });

  const stats = [
    {
      label: "Total Signups",
      value: signupCount ?? 0,
      icon: Users,
      color: "text-indigo-400",
      bg: "bg-indigo-600/10",
      border: "border-indigo-500/20",
    },
    {
      label: "Active Users",
      value: signupCount ?? 0,
      icon: Activity,
      color: "text-cyan-400",
      bg: "bg-cyan-600/10",
      border: "border-cyan-500/20",
    },
    {
      label: "Feedback Received",
      value: feedbackCount ?? 0,
      icon: TrendingUp,
      color: "text-teal-400",
      bg: "bg-teal-600/10",
      border: "border-teal-500/20",
    },
    {
      label: "Growth Rate",
      value: "—",
      icon: Zap,
      color: "text-yellow-400",
      bg: "bg-yellow-600/10",
      border: "border-yellow-500/20",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">
          Overview of your platform metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-white mt-2 font-mono">
                  {stat.value}
                </p>
              </div>
              <div
                className={`${stat.bg} ${stat.border} border rounded-lg p-2.5`}
              >
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">
          Getting Started
        </h3>
        <div className="space-y-3">
          {[
            {
              step: 1,
              title: "Set up your Supabase tables",
              desc: "Create 'profiles' and 'feedback' tables in your Supabase project",
              done: false,
            },
            {
              step: 2,
              title: "Configure Row Level Security",
              desc: "Enable RLS on your tables to protect user data",
              done: false,
            },
            {
              step: 3,
              title: "Share your signup link",
              desc: "Direct users to /sign-up to start collecting signups",
              done: false,
            },
          ].map((item) => (
            <div
              key={item.step}
              className="flex items-start gap-3 p-3 rounded-lg border border-gray-800 bg-white/[0.02]"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600/20 border border-indigo-500/30 text-xs font-bold text-indigo-400">
                {item.step}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{item.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
