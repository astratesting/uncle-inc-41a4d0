import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default function NewProjectPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/projects"
          className="text-[#8888a0] hover:text-[#e4e4ec] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">New Project</h1>
          <p className="text-sm text-[#8888a0] mt-1">
            Create a new MVP prototype
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-[#1e1e2e] bg-[#0d0d16] p-8 text-center">
        <p className="text-[#8888a0]">
          Project creation will be available soon. Check back shortly!
        </p>
      </div>
    </div>
  );
}
