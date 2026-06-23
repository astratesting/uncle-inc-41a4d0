import Link from "next/link";

export const metadata = {
  title: "Onboarding Friction Fixes — Uncle Inc.",
  description:
    "How we identified and solved the 3 biggest onboarding friction points: Cold Start, Value Prop Clarity, and Time-to-First-Value.",
};

const frictionPoints = [
  {
    number: "01",
    title: "Cold Start / Empty Dashboard",
    problem:
      "New users land on a blank dashboard with no guidance, no context, and no clear next step. The empty state feels like a dead end — users don't know where to begin, and drop off before experiencing any value.",
    solution: "Guided Onboarding Wizard",
    solutionDetail:
      "A step-by-step wizard that walks founders through describing their startup idea, selecting a growth goal, and generating their first prototype — all within 60 seconds of signing up. The empty dashboard is replaced with a purposeful first experience.",
    before: {
      label: "Before",
      visual: [
        { type: "empty-state", text: "Welcome to Uncle Inc." },
        { type: "gap" },
        { type: "muted", text: "No projects yet" },
        { type: "muted", text: "Create your first project to get started" },
        { type: "gap" },
        { type: "disabled", text: "+ New Project" },
      ],
    },
    after: {
      label: "After",
      visual: [
        { type: "header", text: "Welcome! Let's build your growth strategy" },
        { type: "progress", step: 1, total: 3, label: "Step 1 of 3" },
        { type: "input", text: "Describe your startup idea..." },
        { type: "input", text: "Who is your target audience?" },
        { type: "primary", text: "Continue →" },
      ],
    },
  },
  {
    number: "02",
    title: "Value Prop Clarity",
    problem:
      "Users sign up but don't understand what Uncle Inc. actually does for them. The landing page promises 'data-driven growth' but the product experience doesn't make the value tangible. Users ask: 'What am I getting, exactly?'",
    solution: "Step-by-Step Clarity with Concrete Outcomes",
    solutionDetail:
      "Each onboarding step now shows a concrete, tangible outcome. Instead of abstract promises, users see exactly what they'll receive: a tailored growth playbook, channel-specific strategies, and a 30-day execution plan — all personalized to their startup.",
    before: {
      label: "Before",
      visual: [
        { type: "empty-state", text: "Your Dashboard" },
        { type: "gap" },
        { type: "muted", text: "Growth Score: —" },
        { type: "muted", text: "Active Campaigns: 0" },
        { type: "muted", text: "Users Acquired: 0" },
        { type: "gap" },
        { type: "muted", text: "Data-driven growth strategies" },
      ],
    },
    after: {
      label: "After",
      visual: [
        { type: "header", text: "Here's what you'll get:" },
        { type: "check", text: "Personalized growth playbook" },
        { type: "check", text: "Channel-specific acquisition strategies" },
        { type: "check", text: "30-day execution timeline" },
        { type: "check", text: "Weekly experiment recommendations" },
        { type: "primary", text: "Generate My Strategy →" },
      ],
    },
  },
  {
    number: "03",
    title: "Time-to-First-Value",
    problem:
      "Even motivated users face a long wait between signup and seeing anything useful. Loading screens, empty states, and multi-step forms create friction. Users feel like nothing is happening and abandon before the product delivers.",
    solution: "Skeleton Loading & Instant Feedback",
    solutionDetail:
      "Skeleton loading states replace blank screens, giving users an immediate sense that something is happening. Progress indicators show exactly how far along they are. The result: perceived wait time drops, and users stay engaged through the generation process.",
    before: {
      label: "Before",
      visual: [
        { type: "empty-state", text: "Generating your strategy..." },
        { type: "gap" },
        { type: "spinner" },
        { type: "gap" },
        { type: "muted", text: "This may take a moment" },
        { type: "gap" },
        { type: "gap" },
      ],
    },
    after: {
      label: "After",
      visual: [
        { type: "header", text: "Building your growth strategy" },
        { type: "progress-bar", pct: 72 },
        { type: "skeleton", w: "full" },
        { type: "skeleton", w: "3/4" },
        { type: "skeleton", w: "1/2" },
        { type: "muted", text: "Analyzing your market & competitors..." },
      ],
    },
  },
];

function BeforeAfterCard({
  data,
  variant,
}: {
  data: { label: string; visual: { type: string; text?: string; step?: number; total?: number; label?: string; pct?: number; w?: string }[] };
  variant: "before" | "after";
}) {
  const isBefore = variant === "before";

  return (
    <div className="flex-1 min-w-0">
      <div
        className={`flex items-center gap-2 mb-3 ${isBefore ? "justify-start" : "justify-start"}`}
      >
        <span
          className={`inline-block w-2 h-2 rounded-full ${isBefore ? "bg-burgundy" : "bg-gold"}`}
        />
        <span
          className={`text-xs font-semibold uppercase tracking-widest ${isBefore ? "text-burgundy" : "text-gold"}`}
        >
          {data.label}
        </span>
      </div>

      <div
        className={`rounded-xl border p-5 min-h-[280px] flex flex-col gap-2.5 ${
          isBefore
            ? "bg-charcoal/[0.03] border-charcoal-100"
            : "bg-ivory border-gold-200 shadow-sm shadow-gold-100/50"
        }`}
      >
        {data.visual.map((item, i) => {
          if (item.type === "gap") {
            return <div key={i} className="h-3" />;
          }

          if (item.type === "empty-state") {
            return (
              <div
                key={i}
                className="text-center py-3 text-charcoal-300 text-sm font-heading"
              >
                {item.text}
              </div>
            );
          }

          if (item.type === "header") {
            return (
              <div
                key={i}
                className="text-sm font-semibold text-charcoal font-heading mb-1"
              >
                {item.text}
              </div>
            );
          }

          if (item.type === "muted") {
            return (
              <div
                key={i}
                className="text-xs text-charcoal-300 py-1.5 px-3 rounded-lg bg-charcoal/[0.04]"
              >
                {item.text}
              </div>
            );
          }

          if (item.type === "disabled") {
            return (
              <div
                key={i}
                className="text-xs text-charcoal-300 py-2 px-4 rounded-lg border border-charcoal-100 text-center bg-charcoal/[0.02] cursor-not-allowed"
              >
                {item.text}
              </div>
            );
          }

          if (item.type === "input") {
            return (
              <div
                key={i}
                className="text-xs text-charcoal-400 py-2.5 px-3 rounded-lg border border-charcoal-200 bg-white"
              >
                {item.text}
              </div>
            );
          }

          if (item.type === "primary") {
            return (
              <div
                key={i}
                className="text-xs font-semibold text-charcoal py-2.5 px-4 rounded-lg bg-gold text-center mt-1"
              >
                {item.text}
              </div>
            );
          }

          if (item.type === "check") {
            return (
              <div key={i} className="flex items-center gap-2 text-sm text-charcoal-600">
                <svg
                  className="w-4 h-4 text-gold flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                {item.text}
              </div>
            );
          }

          if (item.type === "progress") {
            const steps = Array.from({ length: item.total || 3 }, (_, i) => i);
            return (
              <div key={i} className="flex items-center gap-2 mb-1">
                {steps.map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 flex-1 rounded-full ${
                      s < (item.step || 1) ? "bg-gold" : "bg-charcoal-100"
                    }`}
                  />
                ))}
                <span className="text-xs text-charcoal-400 ml-1">
                  {item.label}
                </span>
              </div>
            );
          }

          if (item.type === "progress-bar") {
            return (
              <div key={i} className="mb-1">
                <div className="flex justify-between text-xs text-charcoal-400 mb-1">
                  <span>Progress</span>
                  <span>{item.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-charcoal-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gold transition-all duration-700"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            );
          }

          if (item.type === "skeleton") {
            const wClass =
              item.w === "full"
                ? "w-full"
                : item.w === "3/4"
                  ? "w-3/4"
                  : "w-1/2";
            return (
              <div
                key={i}
                className={`h-3 rounded-md bg-charcoal/[0.08] animate-pulse ${wClass}`}
              />
            );
          }

          if (item.type === "spinner") {
            return (
              <div key={i} className="flex justify-center py-2">
                <div className="w-6 h-6 border-2 border-charcoal-200 border-t-gold rounded-full animate-spin" />
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}

export default function OnboardingFixesPage() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-charcoal-100 bg-ivory/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-heading text-xl font-bold tracking-tight text-charcoal"
          >
            Uncle Inc.
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-charcoal-400 hover:text-charcoal transition-colors"
            >
              Home
            </Link>
            <a
              href="#signup"
              className="text-sm px-4 py-2 rounded-lg font-semibold bg-gold text-charcoal hover:bg-gold-400 transition-colors"
            >
              Get Early Access
            </a>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-[73px]" />

      {/* Hero */}
      <section className="pt-16 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-charcoal text-ivory text-xs font-mono font-semibold tracking-widest uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-gold" />
            Product Deep-Dive
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-charcoal leading-tight mb-4">
            Onboarding Friction Fixes
          </h1>
          <p className="text-lg text-charcoal-400 max-w-2xl mx-auto leading-relaxed">
            We identified the 3 biggest barriers preventing founders from
            reaching their first &ldquo;aha moment&rdquo; — and rebuilt the
            onboarding experience to eliminate each one.
          </p>
        </div>
      </section>

      {/* Friction Points */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto space-y-20">
          {frictionPoints.map((fp) => (
            <article key={fp.number} id={`friction-${fp.number}`}>
              {/* Number + Title */}
              <div className="flex items-start gap-4 mb-6">
                <span className="font-mono text-sm font-semibold text-gold bg-gold/10 rounded-lg px-3 py-1.5 flex-shrink-0">
                  {fp.number}
                </span>
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal mb-2">
                    {fp.title}
                  </h2>
                  <p className="text-charcoal-400 leading-relaxed max-w-3xl">
                    {fp.problem}
                  </p>
                </div>
              </div>

              {/* Solution */}
              <div className="ml-0 sm:ml-16 mb-8 p-5 rounded-xl border border-gold-200 bg-gold-50/50">
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="w-4 h-4 text-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-charcoal">
                    Fix: {fp.solution}
                  </span>
                </div>
                <p className="text-sm text-charcoal-500 leading-relaxed">
                  {fp.solutionDetail}
                </p>
              </div>

              {/* Before / After */}
              <div className="ml-0 sm:ml-16 grid sm:grid-cols-2 gap-6">
                <BeforeAfterCard data={fp.before} variant="before" />
                <BeforeAfterCard data={fp.after} variant="after" />
              </div>

              {/* Divider */}
              <div className="ml-0 sm:ml-16 mt-16 border-t border-charcoal-100" />
            </article>
          ))}
        </div>
      </section>

      {/* Summary */}
      <section className="py-16 px-6 bg-charcoal/[0.02]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal mb-4">
            The Result
          </h2>
          <p className="text-charcoal-400 leading-relaxed mb-8 max-w-xl mx-auto">
            By addressing Cold Start, Value Prop Clarity, and Time-to-First-Value,
            every founder who signs up now reaches a meaningful outcome within
            their first session — not their third.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {[
              { metric: "3→1", label: "Sessions to first value" },
              { metric: "< 60s", label: "Time to first output" },
              { metric: "0%↑", label: "Empty dashboard drop-off" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-5 rounded-xl border border-charcoal-100 bg-ivory"
              >
                <div className="font-heading text-3xl font-bold text-gold mb-1">
                  {stat.metric}
                </div>
                <div className="text-xs text-charcoal-400">{stat.label}</div>
              </div>
            ))}
          </div>
          <a
            href="#signup"
            className="inline-block text-sm px-6 py-3 rounded-lg font-semibold bg-gold text-charcoal hover:bg-gold-400 transition-colors"
          >
            Try the New Onboarding
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-charcoal-100 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="font-heading text-lg font-bold tracking-tight text-charcoal">
                Uncle Inc.
              </span>
              <span className="text-xs text-charcoal-300 font-mono tracking-wider">
                EST. 2025
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-sm text-charcoal-400 hover:text-charcoal transition-colors"
              >
                Home
              </Link>
              <a
                href="mailto:hello@uncleinc.com"
                className="text-sm text-charcoal-400 hover:text-charcoal transition-colors"
              >
                Contact
              </a>
            </div>
            <p className="text-sm text-charcoal-300">
              &copy; {new Date().getFullYear()} Uncle Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
