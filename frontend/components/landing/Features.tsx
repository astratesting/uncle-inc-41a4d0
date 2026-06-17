import {
  Zap,
  Users,
  BarChart3,
  Brain,
  Plug,
  Rocket,
} from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Rapid Prototyping",
    description:
      "Describe your idea and our AI generates a functional, interactive prototype in hours — not weeks. Iterate fast with instant previews.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
  },
  {
    icon: Users,
    title: "User Testing",
    description:
      "Share your prototype with real users and capture feedback, session recordings, and heatmaps to understand exactly what works.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    icon: BarChart3,
    title: "Launch Analytics",
    description:
      "Track engagement, conversion funnels, and retention metrics from day one. Make data-driven decisions about your product direction.",
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
  },
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description:
      "Our AI analyzes user behavior patterns and surfaces actionable recommendations to improve your product-market fit.",
    color: "text-indigo-300",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
  },
  {
    icon: Plug,
    title: "Seamless Collaboration",
    description:
      "Invite co-founders, advisors, and early testers. Real-time collaboration keeps everyone aligned on the product vision.",
    color: "text-cyan-300",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    icon: Rocket,
    title: "One-Click Deploy",
    description:
      "When you're ready, deploy your validated MVP to production with a single click. Custom domains, SSL, and hosting included.",
    color: "text-teal-300",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
  },
];

export function Features() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Everything you need to{" "}
          <span className="gradient-text">validate & launch</span>
        </h2>
        <p className="text-lg text-[#8888a0] max-w-2xl mx-auto">
          Stop guessing. Start building with data-backed confidence. Our
          integrated platform covers the entire validation lifecycle.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className={`p-6 rounded-2xl border ${feature.border} ${feature.bg} backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300`}
            >
              <div
                className={`w-10 h-10 rounded-xl ${feature.bg} border ${feature.border} flex items-center justify-center mb-4`}
              >
                <Icon className={`w-5 h-5 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-[#8888a0] leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
