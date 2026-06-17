import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/sign-in');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white font-display">Projects</h1>
          <p className="mt-2 text-gray-400">
            Create and manage your startup validation projects.
          </p>
        </div>
        <button className="px-6 py-3 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-medium rounded-lg transition-colors">
          New Project
        </button>
      </div>

      <div className="bg-[#111118] border border-gray-800 rounded-xl p-12 text-center">
        <span className="text-5xl">⊞</span>
        <h2 className="mt-4 text-xl font-bold text-white font-display">
          No projects yet
        </h2>
        <p className="mt-2 text-gray-400 max-w-md mx-auto">
          Create your first project to start validating your startup idea with AI-powered prototyping and real user testing.
        </p>
        <button className="mt-6 px-6 py-3 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-medium rounded-lg transition-colors">
          Create Your First Project
        </button>
      </div>
    </div>
  );
}
