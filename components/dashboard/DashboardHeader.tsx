import { createClient } from "@/lib/supabase/server";
import { User } from "lucide-react";

export async function DashboardHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const displayName =
    user?.user_metadata?.name || user?.email?.split("@")[0] || "Founder";

  return (
    <header className="h-16 border-b border-gray-800 bg-ink/60 backdrop-blur-sm flex items-center justify-between px-6">
      <div>
        <h2 className="text-lg font-semibold text-white">
          Welcome back, {displayName}
        </h2>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs px-2.5 py-1 rounded-full border border-indigo-500/30 bg-indigo-600/10 text-indigo-400 font-medium">
          Free Plan
        </span>
        <div className="h-8 w-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
          <User className="h-4 w-4 text-indigo-400" />
        </div>
      </div>
    </header>
  );
}
