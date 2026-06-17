import { FolderKanban, Plus } from "lucide-react";
import Link from "next/link";

export function ProjectList() {
  return (
    <div className="rounded-xl border border-[#1e1e2e] bg-[#0d0d16] p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Recent Projects</h2>
        <Link
          href="/dashboard/projects"
          className="text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
        >
          View all
        </Link>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
          <FolderKanban className="w-7 h-7 text-indigo-400" />
        </div>
        <h3 className="text-base font-semibold mb-2">No projects yet</h3>
        <p className="text-sm text-[#8888a0] max-w-sm mb-6">
          Create your first MVP prototype and start validating your startup
          idea with real user feedback.
        </p>
        <Link
          href="/dashboard/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Project
        </Link>
      </div>
    </div>
  );
}
