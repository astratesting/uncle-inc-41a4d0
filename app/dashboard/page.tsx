import { Card } from "@/components/ui/Card";
import { Users, TrendingUp, Activity, Lightbulb, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const statCards = [
    {
      label: "Getting Started",
      value: "1",
      change: "Set up your first project",
      icon: Lightbulb,
      color: "text-violet-600",
      bg: "bg-violet-50",
      border: "border-violet-200",
    },
    {
      label: "In Development",
      value: "0",
      change: "No active builds yet",
      icon: Activity,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
    {
      label: "Completed",
      value: "0",
      change: "Launch your first MVP",
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    },
    {
      label: "Team Members",
      value: "1",
      change: "Invite collaborators",
      icon: Users,
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-200",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Overview of your development projects
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
                <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
              </div>
              <div className={`${stat.bg} rounded-xl p-2.5`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
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
            { step: "Complete your profile", done: true },
            { step: "Submit your first project brief", done: false },
            { step: "Invite a team member", done: false },
            { step: "Review your first build", done: false },
          ].map((item) => (
            <div
              key={item.step}
              className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50/50"
            >
              <div
                className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                  item.done
                    ? "border-emerald-400 bg-emerald-50"
                    : "border-gray-300 bg-white"
                }`}
              >
                {item.done && (
                  <svg
                    className="h-3.5 w-3.5 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span
                className={`text-sm ${
                  item.done
                    ? "text-gray-500 line-through"
                    : "text-gray-800 font-medium"
                }`}
              >
                {item.step}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card>
        <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/dashboard/projects"
            className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-violet-300 hover:bg-violet-50/50 transition-all group"
          >
            <div>
              <p className="font-medium text-gray-900 text-sm">
                View Projects
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Manage your development projects
              </p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-violet-600 transition-colors" />
          </Link>
          <Link
            href="/dashboard/analytics"
            className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-violet-300 hover:bg-violet-50/50 transition-all group"
          >
            <div>
              <p className="font-medium text-gray-900 text-sm">
                View Analytics
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Signup metrics and feedback data
              </p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-violet-600 transition-colors" />
          </Link>
        </div>
      </Card>
    </div>
  );
}
