import { Lightbulb, Users, BarChart3, Zap } from "lucide-react";
import { Card } from "@/components/ui/Card";

const features = [
  {
    icon: Lightbulb,
    title: "AI-Powered Validation",
    description:
      "Analyze market fit and competition with AI before investing time and money. Get insights in minutes, not weeks.",
  },
  {
    icon: Users,
    title: "Real User Testing",
    description:
      "Get structured feedback from actual potential users, not just friends and family. Know what real people think.",
  },
  {
    icon: Zap,
    title: "Rapid Prototyping",
    description:
      "Transform ideas into interactive prototypes in minutes, not months. No code required — just describe your idea.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Decisions",
    description:
      "Track engagement signals to know exactly what to build next. Make decisions based on evidence, not guesswork.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-4 bg-charcoal-800/30">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ivory mb-4">
            Why Validate{" "}
            <span className="text-gradient-gold">First</span>?
          </h2>
          <p className="text-charcoal-400 max-w-2xl mx-auto text-lg">
            Most startups fail because they build something nobody wants. Uncle
            Inc. helps you test before you invest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="group">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10 border border-gold/20 mb-4 group-hover:bg-gold/20 transition-colors">
                  <Icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="text-lg font-semibold text-ivory mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-charcoal-400 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
