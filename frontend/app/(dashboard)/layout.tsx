import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Sidebar } from "./components/Sidebar";
import { DashboardHeader } from "./components/DashboardHeader";
import "./dashboard-globals.css";

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

  return (
    <div className="dashboard-root min-h-screen bg-warm-offwhite font-body">
      <Sidebar />
      <div className="lg:pl-64">
        <DashboardHeader user={user} />
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
