import { Card } from "@/components/ui/Card";
import { FolderKanban } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900">Projects</h1>
        <p className="text-gray-500 text-sm mt-1">All your development projects</p>
      </div>

      <Card>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="h-12 w-12 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-center mb-4">
            <FolderKanban className="h-6 w-6 text-violet-600" />
          </div>
          <h3 className="text-lg font-heading font-semibold text-gray-900 mb-1">
            No projects yet
          </h3>
          <p className="text-sm text-gray-500 max-w-sm">
            Submit your first project brief and our team will start building your MVP.
          </p>
        </div>
      </Card>
    </div>
  );
}
