import { Sidebar } from "@/components/dashboard/Sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/lib/store";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/sign-in");
  }

  const user = getUserByEmail(session.user.email);
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-ink">
      <Sidebar />
      <div className="ml-[250px]">
        <header className="h-16 flex items-center justify-between px-6 border-b border-[#1e1e2e] bg-[#0a0a0f]/80 backdrop-blur-sm">
          <div>
            <h1 className="text-sm text-[#8888a0]">
              Welcome back,{" "}
              <span className="text-[#e4e4ec] font-medium">{user.name}</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`text-xs px-3 py-1 rounded-full border ${
                user.verified
                  ? "text-teal-400 bg-teal-500/10 border-teal-500/20"
                  : "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
              }`}
            >
              {user.verified ? "Verified" : "Unverified"}
            </span>
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-400">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
