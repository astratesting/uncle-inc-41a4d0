import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/sign-in');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white font-display">Analytics</h1>
        <p className="mt-2 text-gray-400">
          Track your validation metrics and user testing insights.
        </p>
      </div>

      <div className="bg-[#111118] border border-gray-800 rounded-xl p-12 text-center">
        <span className="text-5xl">◉</span>
        <h2 className="mt-4 text-xl font-bold text-white font-display">
          No analytics data yet
        </h2>
        <p className="mt-2 text-gray-400 max-w-md mx-auto">
          Analytics will appear here once you start running validation tests on your projects.
        </p>
      </div>
    </div>
  );
}
