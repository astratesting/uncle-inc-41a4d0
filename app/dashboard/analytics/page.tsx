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
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      label: "Last 7 Days",
      value: 8,
      icon: TrendingUp,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Feedback Submissions",
      value: 23,
      icon: MessageSquare,
      color: "text-honey-600",
      bg: "bg-honey-50",
    },
    {
      label: "Avg. Rating",
      value: "4.2",
      icon: BarChart3,
      color: "text-coral-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">
          Signup metrics and engagement data
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <div className="flex items-center gap-3">
              <div className={`${m.bg} rounded-xl p-2.5`}>
                <m.icon className={`h-5 w-5 ${m.color}`} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {m.label}
                </p>
                <p className="text-2xl font-heading font-bold text-gray-900 mt-0.5">
                  {m.value}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Signup Chart */}
      <Card>
        <h3 className="text-lg font-heading font-semibold text-gray-900 mb-6">
          Signups This Week
        </h3>
        <div className="flex items-end justify-between gap-3 h-48">
          {mockSignupsByDay.map((d) => {
            const height = Math.max((d.count / maxCount) * 100, 8);
            return (
              <div
                key={d.day}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <span className="text-xs font-medium text-gray-600">
                  {d.count}
                </span>
                <div className="w-full flex justify-center">
                  <div
                    className="w-full max-w-[48px] rounded-t-lg bg-gradient-to-t from-violet-500 to-violet-400 transition-all duration-500"
                    style={{ height: `${height}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400">{d.day}</span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Recent Activity Table */}
      <Card>
        <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">
          Recent Activity
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { event: "Waitlist signup", source: "Landing page", date: "Today, 2:30 PM" },
                { event: "Feedback submitted", source: "Dashboard widget", date: "Today, 11:15 AM" },
                { event: "Demo sign-in", source: "Auth flow", date: "Yesterday, 4:00 PM" },
                { event: "Waitlist signup", source: "Landing page", date: "Yesterday, 9:45 AM" },
                { event: "Page view", source: "Landing page", date: "2 days ago" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="py-3 px-2 text-gray-900 font-medium">{row.event}</td>
                  <td className="py-3 px-2 text-gray-500">{row.source}</td>
                  <td className="py-3 px-2 text-gray-400">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
