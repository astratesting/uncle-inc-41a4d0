import { FileText, Wand2, Users } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Describe Your Idea",
    description:
      "Write a brief description of your startup concept. Our AI analyzes your market, competitors, and target audience automatically.",
  },
  {
    number: "02",
    icon: Wand2,
    title: "AI Builds Your Prototype",
    description:
      "In minutes, Uncle Inc. generates a fully interactive prototype with realistic data, flows, and design. No code required.",
  },
  {
    number: "03",
    icon: Users,
    title: "Test with Real Users",
    description:
      "Share your prototype with our tester panel or your own audience. Collect feedback, analytics, and validation signals.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 bg-white/[0.02]">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Three simple steps from idea to validated prototype. No technical skills required.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-cyan-500/30 to-teal-500/20 hidden md:block" />

          <div className="flex flex-col gap-12">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="flex gap-6 md:gap-10 items-start">
                  <div className="relative flex-shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20 z-10 relative">
                      <Icon className="h-7 w-7 text-indigo-400" />
                    </div>
                  </div>
                  <div className="pt-1">
                    <span className="text-xs font-mono text-indigo-400 tracking-widest">
                      STEP {step.number}
                    </span>
                    <h3 className="text-xl font-semibold text-white mt-1 mb-2">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed max-w-lg">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
