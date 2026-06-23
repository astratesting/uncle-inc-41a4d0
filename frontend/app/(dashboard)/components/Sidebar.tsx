"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Flame,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Overview", href: "/overview", icon: LayoutDashboard },
  { label: "Signups", href: "/overview", icon: Users },
  { label: "Feedback", href: "/overview", icon: MessageSquare },
  { label: "Projects", href: "/dashboard/projects", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#E8E0D8] flex flex-col shadow-sm lg:flex hidden">
      {/* Logo */}
      <div className="flex items-center gap-2.5 h-16 px-6 border-b border-[#E8E0D8]">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#F97316] flex items-center justify-center">
          <Flame className="w-4.5 h-4.5 text-white" />
        </div>
        <span className="font-heading text-lg font-bold text-[#1F1F1F] tracking-tight">
          Uncle Inc.
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/20"
                  : "text-[#6B7280] hover:text-[#1F1F1F] hover:bg-[#F5F0EB]"
              )}
            >
              <Icon className="w-[18px] h-[18px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="p-3 border-t border-[#E8E0D8]">
        <form action="/api/auth/sign-out" method="POST">
          <button
            type="submit"
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-[#6B7280] hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-[18px] h-[18px]" />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
