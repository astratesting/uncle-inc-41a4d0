import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ProfileCard } from "@/components/dashboard/ProfileCard";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { ProjectList } from "@/components/dashboard/ProjectList";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-[#8888a0] mt-1">
          Your startup validation overview
        </p>
      </div>

      <ProfileCard user={user} profile={profile} />
      <StatsGrid />
      <ProjectList />
    </div>
  );
}
