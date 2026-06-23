import { Card } from "@/components/ui/Card";
import { BarChart3, Users, MessageSquare, TrendingUp } from "lucide-react";

const mockSignupsByDay = [
  { day: "Mon", count: 3 },
  { day: "Tue", count: 7 },
  { day: "Wed", count: 5 },
  { day: "Thu", count: 12 },
  { day: "Fri", count: 8 },
  { day: "Sat", count: 4 },
  { day: "Sun", count: 6 },
];

const maxCount = Math.max(...mockSignupsByDay.map((d) => d.count), 1);

export default function AnalyticsPage() {
  const metrics = [
    {
      label: "Total Signups",
      value: 45,
      icon: Users,
      color: "text-indigo-400",
      bg: "bg-indigo-600/10",
    },
    {
      label: "Last 7 Days",
      value: 8,
      icon: TrendingUp,
      color: "text-cyan-400",
      bg: "bg-cyan-600/10",
    },
    {
      label: "Feedback Submissions",
      value: 23,
      icon: MessageSquare,
      color: "text-teal-400",
      bg: "bg-teal-600/10",
    },
    {
      label: "Avg. Rating",
      value: "4.2",
      icon: BarChart3,
      color: "text-yellow-400",
      bg: "bg-yellow-600/10",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-serif font-bold text-ivory">Analytics</h1>
        <p className="text-charcoal-400 text-sm mt-1">
          Signup metrics and engagement data
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <div className="flex items-center gap-3">
              <div className={`${m.bg} rounded-lg p-2.5`}>
                <m.icon className={`h-5 w-5 ${m.color}`} />
              </div>
              <div>
                <p className="text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                  {m.label}
                </p>
                <p className="text-2xl font-bold text-ivory font-mono mt-0.5">
                  {m.value}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Signup Chart */}
      <Card>
        <h3 className="text-lg font-semibold text-ivory mb-6">
          Signups — Last 7 Days
        </h3>
        <div className="flex items-end gap-3 h-48">
          {mockSignupsByDay.map((entry) => (
            <div
              key={entry.day}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <span className="text-xs font-mono text-charcoal-400">
                {entry.count}
              </span>
              <div className="w-full relative" style={{ height: "160px" }}>
                <div
                  className="absolute bottom-0 left-0 right-0 rounded-t-md bg-gradient-to-t from-gold-dark to-gold transition-all duration-500"
                  style={{
                    height: `${(entry.count / maxCount) * 100}%`,
                    minHeight: "8px",
                  }}
                />
              </div>
              <span className="text-xs text-charcoal-500">{entry.day}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Feedback Summary */}
      <Card>
        <h3 className="text-lg font-semibold text-ivory mb-4">
          Feedback Summary
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg border border-charcoal-800 bg-charcoal-900/30">
            <span className="text-sm text-charcoal-400">Total submissions</span>
            <span className="text-sm font-mono font-semibold text-ivory">23</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border border-charcoal-800 bg-charcoal-900/30">
            <span className="text-sm text-charcoal-400">Average rating</span>
            <span className="text-sm font-mono font-semibold text-ivory">4.2 / 5</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border border-charcoal-800 bg-charcoal-900/30">
            <span className="text-sm text-charcoal-400">Response rate</span>
            <span className="text-sm font-mono font-semibold text-ivory">68%</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
