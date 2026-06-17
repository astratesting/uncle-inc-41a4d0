import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/sign-in');

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: '◈' },
    { label: 'Projects', href: '/dashboard/projects', icon: '⊞' },
    { label: 'Analytics', href: '/dashboard/analytics', icon: '◉' },
    { label: 'Settings', href: '/dashboard/settings', icon: '⚙' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      <aside className="w-64 bg-[#0d0d15] border-r border-gray-800 flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <Link href="/dashboard" className="text-xl font-bold text-white font-display">
            Uncle Inc.
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1a25] transition-colors"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#4f46e5] flex items-center justify-center text-sm font-bold">
              {user.email?.[0].toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user.email}
              </p>
            </div>
          </div>
          <form action="/api/auth/signout" method="post" className="mt-3">
            <button
              type="submit"
              className="w-full text-left text-sm text-gray-400 hover:text-white transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
