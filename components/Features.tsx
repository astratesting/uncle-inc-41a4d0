import { Globe, Layers, Cpu, Shield } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Web & Mobile Platforms",
    description:
      "We design and build responsive web applications and mobile experiences that reach users wherever they are.",
  },
  {
    icon: Layers,
    title: "End-to-End Product Development",
    description:
      "From initial concept through design, development, and launch — we handle the full product lifecycle so you can focus on your business.",
  },
  {
    icon: Cpu,
    title: "Intelligent Automation",
    description:
      "We integrate modern AI and automation tools into business workflows, reducing manual effort and unlocking new capabilities.",
  },
  {
    icon: Shield,
    title: "Scalable Architecture",
    description:
      "Every platform we build is designed to grow with your needs — reliable infrastructure that performs under pressure.",
  },
];

export function Features() {
  return (
    <section id="what-we-build" className="relative py-28 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-ink" />
      <div className="absolute inset-0 lattice-overlay opacity-30" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-20">
          <p className="text-xs font-mono font-semibold tracking-[0.25em] uppercase text-cyan-400 mb-4">
            Capabilities
          </p>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">
            What We&apos;re Building
          </h2>
          <div className="mx-auto flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-indigo-500/40" />
            <div className="h-1 w-1 rotate-45 bg-indigo-500" />
            <div className="h-px w-12 bg-indigo-500/40" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group rounded-lg border border-white/5 bg-ink-100/50 p-8 hover:border-indigo-500/20 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors mb-5">
                  <Icon className="h-7 w-7 text-indigo-400" />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/50 font-body leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
