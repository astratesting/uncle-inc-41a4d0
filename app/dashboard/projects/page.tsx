import { projects } from "@/lib/demo-data";

export default function ProjectsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900">Projects</h1>
        <p className="text-gray-500 mt-1">All your development projects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-2xl border border-gray-200 bg-white p-6 hover:border-violet-200 hover:shadow-md hover:shadow-violet-50 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-heading font-semibold text-gray-900">{project.name}</h3>
              <span className="inline-flex items-center rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-medium text-violet-700 border border-violet-200">
                {project.status}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-4">{project.description}</p>
            <div className="flex items-center gap-4 mb-3">
              <div className="flex-1">
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-coral-400"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
              <span className="text-xs text-gray-500">{project.progress}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-1">
                {project.team.map((member) => (
                  <span
                    key={member}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-xs font-medium text-violet-700 ring-2 ring-white"
                  >
                    {member}
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-400">{project.updatedAt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
