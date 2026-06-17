import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/sign-in');

  const stats = [
    { label: 'Active Projects', value: '0', icon: '⊞' },
    { label: 'Testers Invited', value: '0', icon: '⊕' },
    { label: 'Tests Completed', value: '0', icon: '✓' },
    { label: 'Insights Gathered', value: '0', icon: '◉' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white font-display">
          Welcome back{user.email ? `, ${user.email.split('@')[0]}` : ''}
        </h1>
        <p className="mt-2 text-gray-400">
          Here&apos;s what&apos;s happening with your startup validation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#111118] border border-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">{stat.label}</span>
              <span className="text-xl">{stat.icon}</span>
            </div>
            <p className="mt-2 text-3xl font-bold text-white font-display">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-[#111118] border border-gray-800 rounded-xl p-8">
        <h2 className="text-xl font-bold text-white font-display mb-4">
          Get Started
        </h2>
        <p className="text-gray-400 mb-6">
          Create your first project and start validating your startup idea with real users.
        </p>
        <a
          href="/dashboard/projects"
          className="inline-flex items-center px-6 py-3 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-medium rounded-lg transition-colors"
        >
          View Projects
        </a>
      </div>
    </div>
  );
}
