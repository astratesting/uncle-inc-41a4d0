import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/sign-in');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white font-display">Settings</h1>
        <p className="mt-2 text-gray-400">
          Manage your account and preferences.
        </p>
      </div>

      <div className="bg-[#111118] border border-gray-800 rounded-xl p-8">
        <h2 className="text-xl font-bold text-white font-display mb-4">
          Account
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <p className="text-white">{user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Plan
            </label>
            <p className="text-white">Free</p>
          </div>
        </div>
      </div>
    </div>
  );
}
