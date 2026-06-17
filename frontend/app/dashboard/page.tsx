import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { ProjectList } from "@/components/dashboard/ProjectList";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-[#8888a0] mt-1">
          Your startup validation overview
        </p>
      </div>

      <StatsGrid />
      <ProjectList />
    </div>
  );
}
