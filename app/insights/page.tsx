import Link from "next/link";

export const metadata = {
  title: "Onboarding Insights — Uncle Inc.",
  description:
    "Internal dashboard: Top 3 onboarding friction points, before/after analysis, implementation status, and success metrics.",
};

type Status = "IMPLEMENTED" | "PLANNED";

const frictionPoints = [
  {
    number: "01",
    title: "Cold Start (Empty Dashboard)",
    problem:
      "New users land on a blank dashboard with no guidance, no context, and no clear next step. Over 50% of new signups bounce before creating their first project — the empty state feels like a dead end.",
    before: {
      label: "Before",
      items: [
        "Empty dashboard with zero onboarding",
        "No guidance on where to begin",
        ">50% bounce rate on first visit",
        "Users must figure out the product alone",
      ],
    },
    after: {
      label: "After",
      items: [
        "Guided First Project Wizard on login",
        "Personalized greeting with founder context",
        "Single-input idea submission form",
        "Skeleton prototype rendered in <3s",
      ],
    },
    status: "IMPLEMENTED" as Status,
    phase: "Phase 1",
    metrics: [
      { label: "Target", value: ">70% wizard completion" },
      { label: "Current", value: "Phase 1 shipped" },
    ],
  },
  {
    number: "02",
    title: "Value Proposition Clarity Gap",
    problem:
      "Abstract 'AI-Assisted MVP Development Platform' language doesn't communicate concrete value. Single-step signup skips goal segmentation. Technical labels alienate non-technical founders. Users sign up but don't understand what they'll get.",
    before: {
      label: "Before",
      items: [
        "Abstract platform-centric headline",
        "Single-step signup, no goal context",
        "Technical labels (e.g. 'project config')",
        "No feedback mechanism during onboarding",
      ],
    },
    after: {
      label: "After",
      items: [
        "Benefit-first headline: what you get, not what it is",
        "2-step signup with goal segmentation",
        "Founder-native labels throughout UI",
        "FeedbackWidget for real-time signal collection",
      ],
    },
    status: "IMPLEMENTED" as Status,
    phase: "Phase 2",
    metrics: [
      { label: "Target", value: ">80% value prop clarity" },
      { label: "Current", value: "Phase 2 shipped" },
    ],
  },
  {
    number: "03",
    title: "Time-to-First-Value Latency",
    problem:
      "30+ minutes from signup to first prototype. No progress feedback during generation. Users see a blank screen and abandon before the product delivers anything useful. High drop-off between signup and first output.",
    before: {
      label: "Before",
      items: [
        "30+ min signup-to-prototype latency",
        "No progress indicator during generation",
        "Blank screen while waiting",
        "High abandonment before first output",
      ],
    },
    after: {
      label: "After",
      items: [
        "Skeleton prototype in <3s",
        "Full prototype in <90s",
        "3-stage progress indicator (analyzing → generating → refining)",
        "Visible progress at every step",
      ],
    },
    status: "PLANNED" as Status,
    phase: "Phase 3",
    metrics: [
      { label: "Target", value: "<5s to first output" },
      { label: "Target", value: ">60% generation completion" },
    ],
  },
];

function StatusBadge({ status }: { status: Status }) {
  const isImplemented = status === "IMPLEMENTED";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
        isImplemented
          ? "bg-gold-100 text-gold-700"
          : "bg-charcoal-50 text-charcoal-400"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isImplemented ? "bg-gold" : "bg-charcoal-300"
        }`}
      />
      {status}
    </span>
  );
}

function StateBlock({
  items,
  variant,
  label,
}: {
  items: string[];
  variant: "before" | "after";
  label: string;
}) {
  const isBefore = variant === "before";
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`inline-block w-2 h-2 rounded-full ${
            isBefore ? "bg-burgundy" : "bg-gold"
          }`}
        />
        <span
          className={`text-xs font-semibold uppercase tracking-widest ${
            isBefore ? "text-burgundy" : "text-gold"
          }`}
        >
          {label}
        </span>
      </div>
      <div
        className={`rounded-xl border p-5 min-h-[180px] flex flex-col gap-2.5 ${
          isBefore
            ? "bg-charcoal/[0.03] border-charcoal-100"
            : "bg-ivory border-gold-200 shadow-sm shadow-gold-100/50"
        }`}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className={`text-sm flex items-start gap-2 ${
              isBefore ? "text-charcoal-400" : "text-charcoal-600"
            }`}
          >
            {isBefore ? (
              <svg
                className="w-4 h-4 mt-0.5 flex-shrink-0 text-burgundy/40"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            )}
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function InsightsPage() {
  const implemented = frictionPoints.filter(
    (fp) => fp.status === "IMPLEMENTED"
  ).length;
  const planned = frictionPoints.filter(
    (fp) => fp.status === "PLANNED"
  ).length;

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
              Back to Landing
            </Link>
            <span className="text-xs px-3 py-1.5 rounded-full bg-charcoal text-ivory font-mono font-semibold tracking-wider uppercase">
              Internal
            </span>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-[73px]" />

      {/* Header + Health Summary */}
      <section className="pt-16 pb-6 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-charcoal text-ivory text-xs font-mono font-semibold tracking-widest uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-gold" />
            Product Insights
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-charcoal leading-tight mb-4">
            Onboarding Friction Analysis
          </h1>
          <p className="text-lg text-charcoal-400 max-w-2xl leading-relaxed mb-10">
            Top 3 friction points identified from ops analysis sessions, with
            before/after comparisons, implementation status, and success
            targets.
          </p>

          {/* Health Status Cards */}
          <div className="grid sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl border border-charcoal-100 bg-white">
              <div className="text-xs text-charcoal-400 uppercase tracking-wider font-semibold mb-2">
                Overall Status
              </div>
              <div className="font-heading text-2xl font-bold text-charcoal">
                {implemented}/{frictionPoints.length}
              </div>
              <div className="text-xs text-charcoal-300 mt-1">
                Friction points addressed
              </div>
            </div>
            <div className="p-5 rounded-xl border border-gold-200 bg-gold-50/50">
              <div className="text-xs text-gold-700 uppercase tracking-wider font-semibold mb-2">
                Implemented
              </div>
              <div className="font-heading text-2xl font-bold text-gold">
                {implemented}
              </div>
              <div className="text-xs text-charcoal-400 mt-1">
                Phases shipped
              </div>
            </div>
            <div className="p-5 rounded-xl border border-charcoal-100 bg-white">
              <div className="text-xs text-charcoal-400 uppercase tracking-wider font-semibold mb-2">
                Planned
              </div>
              <div className="font-heading text-2xl font-bold text-charcoal-500">
                {planned}
              </div>
              <div className="text-xs text-charcoal-300 mt-1">
                Awaiting implementation
              </div>
            </div>
            <div className="p-5 rounded-xl border border-charcoal-100 bg-white">
              <div className="text-xs text-charcoal-400 uppercase tracking-wider font-semibold mb-2">
                Health
              </div>
              <div className="font-heading text-2xl font-bold text-gold">
                Improving
              </div>
              <div className="text-xs text-charcoal-300 mt-1">
                2 of 3 fixes live
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Friction Point Cards */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto space-y-16">
          {frictionPoints.map((fp) => (
            <article
              key={fp.number}
              className="rounded-2xl border border-charcoal-100 bg-white p-6 sm:p-8"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <span className="font-mono text-sm font-semibold text-gold bg-gold/10 rounded-lg px-3 py-1.5 flex-shrink-0">
                    {fp.number}
                  </span>
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-charcoal mb-1">
                      {fp.title}
                    </h2>
                    <div className="flex items-center gap-3 mt-2">
                      <StatusBadge status={fp.status} />
                      <span className="text-xs text-charcoal-300 font-mono">
                        {fp.phase}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Problem Statement */}
              <div className="mb-8 p-4 rounded-xl border border-burgundy-100 bg-burgundy-50/30">
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="w-4 h-4 text-burgundy"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-burgundy">
                    Problem
                  </span>
                </div>
                <p className="text-sm text-charcoal-500 leading-relaxed">
                  {fp.problem}
                </p>
              </div>

              {/* Before / After */}
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <StateBlock
                  items={fp.before.items}
                  variant="before"
                  label={fp.before.label}
                />
                <StateBlock
                  items={fp.after.items}
                  variant="after"
                  label={fp.after.label}
                />
              </div>

              {/* Metrics */}
              <div className="flex flex-wrap gap-3">
                {fp.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="px-4 py-2.5 rounded-lg border border-charcoal-100 bg-charcoal/[0.02]"
                  >
                    <div className="text-xs text-charcoal-300 mb-0.5">
                      {m.label}
                    </div>
                    <div className="text-sm font-semibold text-charcoal">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
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
                INTERNAL
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-sm text-charcoal-400 hover:text-charcoal transition-colors"
              >
                Home
              </Link>
              <Link
                href="/onboarding-fixes"
                className="text-sm text-charcoal-400 hover:text-charcoal transition-colors"
              >
                Onboarding Fixes
              </Link>
            </div>
            <p className="text-sm text-charcoal-300">
              &copy; {new Date().getFullYear()} Uncle Inc. Internal use only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
