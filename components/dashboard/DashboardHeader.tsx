import { User } from "lucide-react";

interface DashboardHeaderProps {
  userName: string;
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  return (
    <header className="h-16 border-b border-gray-200 bg-white/60 backdrop-blur-sm flex items-center justify-between px-6">
      <div>
        <h2 className="text-lg font-heading font-semibold text-gray-900">
          Welcome back, {userName}
        </h2>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs px-2.5 py-1 rounded-full border border-violet-200 bg-violet-50 text-violet-700 font-medium">
          Demo Mode
        </span>
        <div className="h-8 w-8 rounded-full bg-violet-100 border border-violet-200 flex items-center justify-center">
          <User className="h-4 w-4 text-violet-600" />
        </div>
      </div>
    </header>
  );
}
