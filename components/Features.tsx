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
    <section id="what-we-build" className="py-24 px-4 bg-white">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-4">
            What We&apos;re Building
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Technological solutions designed to solve real problems for
            businesses and consumers alike.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-gray-200 bg-warm-offwhite p-8 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-50 transition-all duration-300"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 group-hover:bg-violet-200 transition-colors mb-5">
                  <Icon className="h-7 w-7 text-violet-600" />
                </div>
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
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
