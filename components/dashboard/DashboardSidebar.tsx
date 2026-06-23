"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  BarChart3,
  Settings,
} from "lucide-react";
import { clsx } from "clsx";

const links = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Projects", icon: FolderOpen },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-60 border-r border-charcoal-700/50 bg-charcoal-800/30">
      <div className="flex h-16 items-center px-6 border-b border-charcoal-700/50">
        <Link
          href="/dashboard"
          className="font-serif font-semibold text-ivory"
        >
          Uncle Inc.
        </Link>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive =
            pathname === link.href ||
            (link.href !== "/dashboard" &&
              pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-charcoal-700/50 text-ivory"
                  : "text-charcoal-400 hover:text-ivory hover:bg-charcoal-800"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-charcoal-700/50">
        <a
          href="/api/auth/signout"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-charcoal-500 hover:text-ivory hover:bg-charcoal-800 transition-colors"
        >
          Sign Out
        </a>
      </div>
    </aside>
  );
}