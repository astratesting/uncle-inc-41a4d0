import { User } from "lucide-react";

interface DashboardHeaderProps {
  userName: string;
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  return (
    <header className="h-16 border-b border-charcoal-800 bg-charcoal-950/60 backdrop-blur-sm flex items-center justify-between px-6">
      <div>
        <h2 className="text-lg font-semibold text-ivory">
          Welcome back, {userName}
        </h2>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs px-2.5 py-1 rounded-full border border-gold/30 bg-gold/10 text-gold font-medium">
          Free Plan
        </span>
        <div className="h-8 w-8 rounded-full bg-charcoal-800 border border-charcoal-700 flex items-center justify-center">
          <User className="h-4 w-4 text-charcoal-400" />
        </div>
      </div>
    </header>
  );
}
