import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { FeedbackWidget } from "@/components/FeedbackWidget";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const displayName =
    user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "User";

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-60">
        <DashboardHeader userName={displayName} />
        <main className="p-6">{children}</main>
      </div>
      <FeedbackWidget />
    </div>
  );
}
