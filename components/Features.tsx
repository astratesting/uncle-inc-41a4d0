import { Rocket, Users, BarChart3, Brain, RefreshCw, LayoutDashboard } from "lucide-react";
import { Card } from "@/components/ui/Card";

const features = [
  {
    icon: Rocket,
    title: "AI Prototyping",
    description:
      "Turn your idea into a clickable prototype in minutes, not months. Our AI generates interactive UI from natural language.",
  },
  {
    icon: Users,
    title: "User Testing",
    description:
      "Get real feedback from your target audience with built-in testing panels and structured feedback collection.",
  },
  {
    icon: BarChart3,
    title: "Launch Analytics",
    description:
      "Track engagement, drop-offs, and conversion with actionable dashboards that tell you what to fix next.",
  },
  {
    icon: Brain,
    title: "Smart Validation",
    description:
      "AI-powered market analysis helps you validate assumptions before building, using real market signals.",
  },
  {
    icon: RefreshCw,
    title: "Rapid Iteration",
    description:
      "Pivot fast with instant prototype updates based on user feedback. Ship changes in hours, not weeks.",
  },
  {
    icon: LayoutDashboard,
    title: "Founder Dashboard",
    description:
      "One place to manage your entire validation workflow. From idea to validated MVP, all in one view.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything You Need to{" "}
            <span className="gradient-text">Validate</span> Your Startup
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            From idea to validated prototype, Uncle Inc. provides every tool you need
            to make sure you&apos;re building something people actually want.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} glow className="group">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/20 mb-4 group-hover:bg-indigo-500/20 transition-colors">
                  <Icon className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
