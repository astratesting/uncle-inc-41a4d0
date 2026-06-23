import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyDemoSession } from "@/lib/auth";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { FeedbackWidget } from "@/components/FeedbackWidget";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jar = await cookies();
  const session = jar.get("demo-session")?.value;
  const user = session ? verifyDemoSession(session) : null;

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-charcoal-950">
      <Sidebar />
      <div className="ml-60">
        <DashboardHeader userName={user.name} />
        <main className="p-6">{children}</main>
      </div>
      <FeedbackWidget />
    </div>
  );
}
