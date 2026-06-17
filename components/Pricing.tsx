import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "forever",
    description: "Perfect for validating your first idea.",
    features: [
      "1 MVP prototype",
      "Up to 10 testers",
      "Basic analytics",
      "AI idea analysis",
      "Community support",
    ],
    cta: "Get Started",
    href: "/sign-up",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For serious founders shipping multiple MVPs.",
    features: [
      "Unlimited MVPs",
      "Up to 100 testers per project",
      "Advanced analytics & heatmaps",
      "Custom domain deployment",
      "Priority AI processing",
      "Export to code (React/Next.js)",
      "Email support",
    ],
    cta: "Start Pro",
    href: "/sign-up",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$99",
    period: "/month",
    description: "For teams and agencies validating at scale.",
    features: [
      "Everything in Pro",
      "Up to 5 team members",
      "500 testers per project",
      "White-label reports",
      "API access",
      "Priority support",
      "Custom integrations",
    ],
    cta: "Start Team",
    href: "/sign-up",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Simple, Transparent{" "}
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Start free, upgrade when you need more. No hidden fees, no surprise bills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              glow
              className={
                plan.highlighted
                  ? "border-indigo-500/50 shadow-[0_0_30px_rgba(79,70,229,0.1)] relative"
                  : ""
              }
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-indigo-600 px-3 py-0.5 text-xs font-medium text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-sm text-gray-400">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href={plan.href}>
                <Button
                  variant={plan.highlighted ? "primary" : "outline"}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
