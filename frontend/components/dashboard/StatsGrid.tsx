import { BarChart3, FolderKanban, Users, TrendingUp } from "lucide-react";

const STATS = [
  {
    label: "Total Projects",
    value: "0",
    icon: FolderKanban,
    trend: "Start your first project",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
  },
  {
    label: "Active Testers",
    value: "0",
    icon: Users,
    trend: "Coming soon",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    label: "Test Sessions",
    value: "0",
    icon: BarChart3,
    trend: "Coming soon",
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
  },
  {
    label: "Insights Generated",
    value: "0",
    icon: TrendingUp,
    trend: "Coming soon",
    color: "text-indigo-300",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
  },
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`p-5 rounded-xl border ${stat.border} ${stat.bg} backdrop-blur-sm`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-[#8888a0] uppercase tracking-wider">
                {stat.label}
              </span>
              <Icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div className={`text-2xl font-bold ${stat.color} font-mono`}>
              {stat.value}
            </div>
            <p className="text-xs text-[#8888a0] mt-1">{stat.trend}</p>
          </div>
        );
      })}
    </div>
  );
}
