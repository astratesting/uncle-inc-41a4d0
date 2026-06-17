import { BarChart3 } from "lucide-react";

export const dynamic = "force-dynamic";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-sm text-[#8888a0] mt-1">
          Track your MVP performance and user engagement
        </p>
      </div>

      <div className="flex flex-col items-center justify-center py-16 text-center rounded-xl border border-[#1e1e2e] bg-[#0d0d16]">
        <div className="w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
          <BarChart3 className="w-9 h-9 text-cyan-400" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Analytics Coming Soon</h2>
        <p className="text-sm text-[#8888a0] max-w-md">
          Once you create projects and start gathering user feedback, detailed
          analytics and insights will appear here.
        </p>
      </div>
    </div>
  );
}
