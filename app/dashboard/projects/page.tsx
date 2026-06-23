import { projects } from "@/lib/demo-data";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-ivory">Projects</h1>
        <p className="text-charcoal-400 mt-1">All your validation projects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-xl border border-charcoal-700 bg-charcoal-800/50 p-6"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-ivory">{project.name}</h3>
              <span className="inline-flex items-center rounded-full bg-gold/10 px-2.5 py-0.5 text-xs font-medium text-gold">
                {project.status}
              </span>
            </div>
            <p className="text-sm text-charcoal-400 mb-4">{project.description}</p>
            <div className="flex items-center gap-4 mb-3">
              <div className="flex-1">
                <div className="h-2 rounded-full bg-charcoal-700 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gold"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
              <span className="text-xs text-charcoal-500">{project.progress}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-1">
                {project.team.map((member) => (
                  <span
                    key={member}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-charcoal-700 text-xs font-medium text-charcoal-300 ring-2 ring-charcoal-800"
                  >
                    {member}
                  </span>
                ))}
              </div>
              <span className="text-xs text-charcoal-500">{project.updatedAt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}