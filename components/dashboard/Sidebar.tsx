"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  LogOut,
  FolderKanban,
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
    <aside className="fixed left-0 top-0 bottom-0 w-60 border-r border-charcoal-800 bg-charcoal-950/80 backdrop-blur-sm flex flex-col z-30">
      {/* Logo */}
      <div className="p-5 border-b border-charcoal-800">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="text-lg font-serif font-semibold tracking-tight text-ivory group-hover:text-gold transition-colors">
            Uncle Inc.
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-gold/10 text-gold border border-gold/20"
                  : "text-charcoal-400 hover:text-ivory hover:bg-charcoal-800/50"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="p-3 border-t border-charcoal-800">
        <a
          href="/api/auth/signout"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-charcoal-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200 w-full"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </a>
      </div>
    </aside>
  );
}
