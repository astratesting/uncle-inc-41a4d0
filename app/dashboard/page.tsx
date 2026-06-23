import { Card } from "@/components/ui/Card";
import { Users, TrendingUp, Activity, Zap, Lightbulb, ArrowRight } from "lucide-react";
import Link from "next/link";
import { projects, stats, recentActivity } from "@/lib/demo-data";

export default function DashboardPage() {
  const statCards = [
    {
      label: "Active Projects",
      value: stats[0].value,
      change: stats[0].change,
      icon: Lightbulb,
      color: "text-violet-600",
      bg: "bg-violet-50",
      border: "border-violet-200",
    },
    {
      label: "In Development",
      value: stats[1].value,
      change: stats[1].change,
      icon: Activity,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
    {
      label: "Completed",
      value: stats[2].value,
      change: stats[2].change,
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    },
    {
      label: "Team Members",
      value: stats[3].value,
      change: stats[3].change,
      icon: Users,
      color: "text-coral-600",
      bg: "bg-orange-50",
      border: "border-orange-200",
    },
  ];

  const recentProjects = projects.slice(0, 3);

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
              </div>
              <div className={`${stat.bg} ${stat.border} border rounded-xl p-2.5`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <Zap className="h-3 w-3 text-honey-500" />
              <span className="text-xs text-gray-500">{stat.change}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Projects */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-gray-900">
            Recent Projects
          </h3>
          <Link
            href="/dashboard/projects"
            className="text-sm text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          {recentProjects.map((project) => (
            <div
              key={project.id}
              className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-violet-200 hover:bg-violet-50/30 transition-all duration-200"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-gray-900 truncate">
                    {project.name}
                  </h4>
                  <span className="inline-flex items-center rounded-full bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-700 border border-violet-200">
                    {project.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {project.description}
                </p>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="w-24">
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-coral-400"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-gray-500 w-8 text-right">
                  {project.progress}%
                </span>
              </div>

              <div className="flex -space-x-1 flex-shrink-0">
                {project.team.map((member) => (
                  <span
                    key={member}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-xs font-medium text-violet-700 ring-2 ring-white"
                  >
                    {member}
                  </span>
                ))}
              </div>

              <span className="text-xs text-gray-400 flex-shrink-0">
                {project.updatedAt}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Activity */}
      <Card>
        <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-3">
          {recentActivity.map((activity) => {
            const typeColors = {
              milestone: "bg-violet-100 text-violet-600",
              deploy: "bg-emerald-100 text-emerald-600",
              feedback: "bg-honey-100 text-honey-600",
              update: "bg-blue-100 text-blue-600",
            };
            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div
                  className={`mt-0.5 h-2 w-2 rounded-full flex-shrink-0 ${
                    typeColors[activity.type]?.split(" ")[0] || "bg-gray-200"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700">{activity.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">
                      {activity.project}
                    </span>
                    <span className="text-xs text-gray-300">·</span>
                    <span className="text-xs text-gray-400">
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
