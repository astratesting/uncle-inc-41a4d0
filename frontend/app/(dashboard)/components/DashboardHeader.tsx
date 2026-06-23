import type { User } from "@supabase/supabase-js";

interface DashboardHeaderProps {
  user: User;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const email = user.email ?? "founder@startup.com";
  const initial = email.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-6 lg:px-8 bg-white/80 backdrop-blur-md border-b border-[#E8E0D8]">
      <div>
        <h1 className="font-heading text-lg font-semibold text-[#1F1F1F]">
          Welcome back
        </h1>
        <p className="text-xs text-[#6B7280] -mt-0.5">{email}</p>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-[#7C3AED] bg-[#7C3AED]/10 px-3 py-1 rounded-full border border-[#7C3AED]/20">
          Free Plan
        </span>
        <div
          className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#F97316] flex items-center justify-center text-sm font-bold text-white shadow-sm"
          title={email}
        >
          {initial}
        </div>
      </div>
    </header>
  );
}
