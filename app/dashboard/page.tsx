import { Card } from "@/components/ui/Card";
import { Users, TrendingUp, Activity, Zap, Lightbulb, ArrowRight } from "lucide-react";
import Link from "next/link";
import { projects, stats } from "@/lib/demo-data";

export default function DashboardPage() {
  const statCards = [
    {
      label: "Active Projects",
      value: stats[0].value,
      change: stats[0].change,
      icon: Lightbulb,
      color: "text-gold",
      bg: "bg-gold/10",
      border: "border-gold/20",
    },
    {
      label: "In Development",
      value: stats[1].value,
      change: stats[1].change,
      icon: Activity,
      color: "text-blue-400",
      bg: "bg-blue-600/10",
      border: "border-blue-500/20",
    },
    {
      label: "Completed",
      value: stats[2].value,
      change: stats[2].change,
      icon: TrendingUp,
      color: "text-emerald-400",
      bg: "bg-emerald-600/10",
      border: "border-emerald-500/20",
    },
    {
      label: "Team Members",
      value: stats[3].value,
      change: stats[3].change,
      icon: Users,
      color: "text-purple-400",
      bg: "bg-purple-600/10",
      border: "border-purple-500/20",
    },
  ];

  const recentProjects = projects.slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-serif font-bold text-ivory">Dashboard</h1>
        <p className="text-charcoal-400 text-sm mt-1">
          Overview of your validation projects
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-ivory mt-2 font-mono">
                  {stat.value}
                </p>
                <p className="text-xs text-charcoal-500 mt-1">{stat.change}</p>
              </div>
              <div className={`${stat.bg} ${stat.border} border rounded-lg p-2.5`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Projects */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-ivory">Recent Projects</h3>
          <Link
            href="/dashboard/projects"
            className="text-sm text-gold hover:text-gold-light transition-colors inline-flex items-center gap-1"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="space-y-3">
          {recentProjects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between p-3 rounded-lg border border-charcoal-800 bg-charcoal-900/30"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-1">
                  {project.team.slice(0, 3).map((member) => (
                    <span
                      key={member}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-charcoal-700 text-xs font-medium text-charcoal-300 ring-2 ring-charcoal-800"
                    >
                      {member}
                    </span>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium text-ivory">{project.name}</p>
                  <p className="text-xs text-charcoal-500">{project.status}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="w-24">
                  <div className="h-2 rounded-full bg-charcoal-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gold"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-charcoal-500 mt-1 block">{project.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
