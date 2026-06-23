"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  BarChart3,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 w-60 bg-white border-r border-gray-200 z-30 flex flex-col">
      {/* Logo */}
      <div className="p-5">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600 to-coral-400 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="font-heading font-bold text-lg text-gray-900">
            Uncle Inc.
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" &&
              pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-violet-50 text-violet-700 border border-violet-200"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon
                className={`h-5 w-5 ${
                  isActive ? "text-violet-600" : "text-gray-400"
                }`}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Sign Out */}
      <div className="p-3 border-t border-gray-100">
        <a
          href="/api/auth/signout"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
        >
          <LogOut className="h-5 w-5 text-gray-400" />
          Sign Out
        </a>
      </div>
    </aside>
  );
}
