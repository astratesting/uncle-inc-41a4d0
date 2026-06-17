import { FolderKanban, Plus } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function ProjectsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-sm text-[#8888a0] mt-1">
            Manage your MVP prototypes
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-16 text-center rounded-xl border border-[#1e1e2e] bg-[#0d0d16]">
        <div className="w-20 h-20 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
          <FolderKanban className="w-9 h-9 text-indigo-400" />
        </div>
        <h2 className="text-xl font-semibold mb-2">No projects yet</h2>
        <p className="text-sm text-[#8888a0] max-w-md mb-8">
          Projects you create will appear here. Start by creating your first
          MVP prototype to validate your startup idea.
        </p>
        <Link
          href="/dashboard/projects/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Your First Project
        </Link>
      </div>
    </div>
  );
}
