import Link from "next/link";

export const metadata = {
  title: "Onboarding Insights — Uncle Inc.",
  description:
    "Internal dashboard: Top 3 onboarding friction points, before/after analysis, implementation status, and success metrics.",
};

type Status = "IMPLEMENTED" | "IN PROGRESS" | "PLANNED";
type Severity = "critical" | "high" | "medium";

const frictionPoints = [
  {
    number: "01",
    title: "Cold Start — Empty Dashboard",
    severity: "critical" as Severity,
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
    targetMetrics: [
      { label: "Bounce Rate", before: ">50%", after: "<15%" },
      { label: "Wizard Completion", before: "N/A", after: ">70%" },
      { label: "Time to First Project", before: "N/A", after: "<60s" },
    ],
  },
  {
    number: "02",
    title: "Value Proposition Clarity Gap",
    severity: "high" as Severity,
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
    targetMetrics: [
      { label: "Signup Completion", before: "~60%", after: ">85%" },
      { label: "Value Prop Clarity", before: "Unknown", after: ">80%" },
      { label: "Goal Segmentation", before: "None", after: "100% tagged" },
    ],
  },
  {
    number: "03",
    title: "Time-to-First-Value Latency",
    severity: "medium" as Severity,
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
    targetMetrics: [
      { label: "Time to Skeleton", before: "N/A", after: "<3s" },
      { label: "Time to Full Prototype", before: "30+ min", after: "<90s" },
      { label: "Generation Abandonment", before: "High", after: "<40%" },
    ],
  },
];

const severityConfig: Record<
  Severity,
  { bg: string; border: string; text: string; dot: string; label: string }
> = {
  critical: {
    bg: "bg-[#722F37]/10",
    border: "border-[#722F37]/30",
    text: "text-[#722F37]",
    dot: "bg-[#722F37]",
    label: "Critical",
  },
  high: {
    bg: "bg-[#C9A96E]/10",
    border: "border-[#C9A96E]/30",
    text: "text-[#8B7340]",
    dot: "bg-[#C9A96E]",
    label: "High",
  },
  medium: {
    bg: "bg-[#2D2D2D]/5",
    border: "border-[#2D2D2D]/20",
    text: "text-[#2D2D2D]/70",
    dot: "bg-[#2D2D2D]/50",
    label: "Medium",
  },
};

function SeverityBadge({ severity }: { severity: Severity }) {
  const cfg = severityConfig[severity];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ${cfg.bg} ${cfg.border} border ${cfg.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const styles: Record<Status, string> = {
    IMPLEMENTED: "bg-[#C9A96E]/15 text-[#7C590B] border-[#C9A96E]/30",
    "IN PROGRESS": "bg-[#2D2D2D]/5 text-[#2D2D2D]/70 border-[#2D2D2D]/20",
    PLANNED: "bg-[#2D2D2D]/5 text-[#2D2D2D]/50 border-[#2D2D2D]/10",
  };
  const dots: Record<Status, string> = {
    IMPLEMENTED: "bg-[#C9A96E]",
    "IN PROGRESS": "bg-[#2D2D2D]/60",
    PLANNED: "bg-[#2D2D2D]/30",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide border ${styles[status]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status]}`} />
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
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: isBefore ? "#722F37" : "#C9A96E",
          }}
        />
        <span
          className="text-[11px] font-semibold uppercase tracking-[0.15em]"
          style={{ color: isBefore ? "#722F37" : "#8B7340" }}
        >
          {label}
        </span>
      </div>
      <div
        className="rounded-xl border p-5 min-h-[180px] flex flex-col gap-2.5"
        style={{
          backgroundColor: isBefore
            ? "rgba(45,45,45,0.03)"
            : "rgba(255,255,240,1)",
          borderColor: isBefore
            ? "rgba(45,45,45,0.12)"
            : "rgba(201,169,110,0.3)",
          boxShadow: isBefore
            ? "none"
            : "0 1px 3px rgba(201,169,110,0.08)",
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="text-[13px] flex items-start gap-2.5 leading-relaxed"
            style={{
              color: isBefore
                ? "rgba(45,45,45,0.5)"
                : "rgba(45,45,45,0.75)",
            }}
          >
            {isBefore ? (
              <svg
                className="w-4 h-4 mt-0.5 flex-shrink-0"
                style={{ color: "rgba(114,47,55,0.4)" }}
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
                className="w-4 h-4 mt-0.5 flex-shrink-0"
                style={{ color: "#C9A96E" }}
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
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFF0" }}>
      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl"
        style={{
          borderColor: "rgba(45,45,45,0.1)",
          backgroundColor: "rgba(255,255,240,0.85)",
        }}
      >
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#2D2D2D",
            }}
          >
            Uncle Inc.
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm transition-colors hover:opacity-80"
              style={{ color: "rgba(45,45,45,0.5)" }}
            >
              Back to Landing
            </Link>
            <span
              className="text-[11px] px-3 py-1.5 rounded-full font-mono font-semibold tracking-[0.1em] uppercase"
              style={{
                backgroundColor: "#2D2D2D",
                color: "#FFFFF0",
              }}
            >
              Internal
            </span>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-[73px]" />

      {/* Header + Summary Stats */}
      <section className="pt-16 pb-6 px-6">
        <div className="max-w-5xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-mono font-semibold tracking-[0.15em] uppercase mb-6"
            style={{ backgroundColor: "#2D2D2D", color: "#FFFFF0" }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "#C9A96E" }}
            />
            Product Insights
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold leading-tight mb-4"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#2D2D2D",
            }}
          >
            Onboarding Friction Analysis
          </h1>
          <p
            className="text-lg max-w-2xl leading-relaxed mb-10"
            style={{ color: "rgba(45,45,45,0.55)" }}
          >
            Top 3 friction points identified from ops analysis sessions, with
            before/after comparisons, severity indicators, implementation status,
            and success targets.
          </p>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Fixes Implemented */}
            <div
              className="p-5 rounded-xl border"
              style={{
                borderColor: "rgba(201,169,110,0.3)",
                backgroundColor: "rgba(201,169,110,0.06)",
              }}
            >
              <div
                className="text-[11px] uppercase tracking-[0.12em] font-semibold mb-2"
                style={{ color: "#8B7340" }}
              >
                Fixes Implemented
              </div>
              <div
                className="text-3xl font-bold"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#C9A96E",
                }}
              >
                {implemented}
                <span
                  className="text-base font-normal"
                  style={{ color: "rgba(45,45,45,0.3)" }}
                >
                  /{frictionPoints.length}
                </span>
              </div>
              <div
                className="text-[11px] mt-1"
                style={{ color: "rgba(45,45,45,0.35)" }}
              >
                Phases shipped
              </div>
            </div>

            {/* Planned */}
            <div
              className="p-5 rounded-xl border"
              style={{
                borderColor: "rgba(45,45,45,0.1)",
                backgroundColor: "rgba(255,255,255,0.6)",
              }}
            >
              <div
                className="text-[11px] uppercase tracking-[0.12em] font-semibold mb-2"
                style={{ color: "rgba(45,45,45,0.45)" }}
              >
                Planned
              </div>
              <div
                className="text-3xl font-bold"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "rgba(45,45,45,0.4)",
                }}
              >
                {planned}
              </div>
              <div
                className="text-[11px] mt-1"
                style={{ color: "rgba(45,45,45,0.3)" }}
              >
                Awaiting implementation
              </div>
            </div>

            {/* Target: Bounce Rate */}
            <div
              className="p-5 rounded-xl border"
              style={{
                borderColor: "rgba(45,45,45,0.1)",
                backgroundColor: "rgba(255,255,255,0.6)",
              }}
            >
              <div
                className="text-[11px] uppercase tracking-[0.12em] font-semibold mb-2"
                style={{ color: "rgba(45,45,45,0.45)" }}
              >
                Target: Bounce Rate
              </div>
              <div
                className="text-3xl font-bold"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#2D2D2D",
                }}
              >
                &lt;15%
              </div>
              <div
                className="text-[11px] mt-1"
                style={{ color: "rgba(45,45,45,0.3)" }}
              >
                Down from &gt;50%
              </div>
            </div>

            {/* Target: First Value */}
            <div
              className="p-5 rounded-xl border"
              style={{
                borderColor: "rgba(45,45,45,0.1)",
                backgroundColor: "rgba(255,255,255,0.6)",
              }}
            >
              <div
                className="text-[11px] uppercase tracking-[0.12em] font-semibold mb-2"
                style={{ color: "rgba(45,45,45,0.45)" }}
              >
                Target: Time to Value
              </div>
              <div
                className="text-3xl font-bold"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#2D2D2D",
                }}
              >
                &lt;90s
              </div>
              <div
                className="text-[11px] mt-1"
                style={{ color: "rgba(45,45,45,0.3)" }}
              >
                Down from 30+ min
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Friction Point Cards */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          {frictionPoints.map((fp) => {
            const sev = severityConfig[fp.severity];
            return (
              <article
                key={fp.number}
                className="rounded-2xl border overflow-hidden"
                style={{
                  borderColor: "rgba(45,45,45,0.1)",
                  backgroundColor: "rgba(255,255,255,0.7)",
                }}
              >
                {/* Severity stripe */}
                <div
                  className="h-1"
                  style={{
                    backgroundColor:
                      fp.severity === "critical"
                        ? "#722F37"
                        : fp.severity === "high"
                          ? "#C9A96E"
                          : "rgba(45,45,45,0.2)",
                  }}
                />

                <div className="p-6 sm:p-8">
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div className="flex items-start gap-4">
                      <span
                        className="text-sm font-mono font-semibold rounded-lg px-3 py-1.5 flex-shrink-0"
                        style={{
                          color: "#C9A96E",
                          backgroundColor: "rgba(201,169,110,0.1)",
                        }}
                      >
                        {fp.number}
                      </span>
                      <div>
                        <h2
                          className="text-2xl font-bold mb-1"
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            color: "#2D2D2D",
                          }}
                        >
                          {fp.title}
                        </h2>
                        <div className="flex items-center gap-3 mt-2 flex-wrap">
                          <StatusBadge status={fp.status} />
                          <SeverityBadge severity={fp.severity} />
                          <span
                            className="text-[11px] font-mono"
                            style={{ color: "rgba(45,45,45,0.35)" }}
                          >
                            {fp.phase}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Problem Statement */}
                  <div
                    className="mb-8 p-4 rounded-xl border"
                    style={{
                      borderColor: "rgba(114,47,55,0.15)",
                      backgroundColor: "rgba(114,47,55,0.04)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="#722F37"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        />
                      </svg>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: "#722F37" }}
                      >
                        Problem
                      </span>
                    </div>
                    <p
                      className="text-[13px] leading-relaxed"
                      style={{ color: "rgba(45,45,45,0.6)" }}
                    >
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

                  {/* Target Metrics Comparison */}
                  <div
                    className="mb-6 p-4 rounded-xl border"
                    style={{
                      borderColor: "rgba(45,45,45,0.08)",
                      backgroundColor: "rgba(45,45,45,0.02)",
                    }}
                  >
                    <div
                      className="text-[11px] uppercase tracking-[0.12em] font-semibold mb-3"
                      style={{ color: "rgba(45,45,45,0.4)" }}
                    >
                      Success Metrics
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {fp.targetMetrics.map((m, i) => (
                        <div key={i} className="text-center">
                          <div
                            className="text-[11px] mb-2"
                            style={{ color: "rgba(45,45,45,0.4)" }}
                          >
                            {m.label}
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <span
                              className="text-sm font-semibold line-through"
                              style={{ color: "rgba(114,47,55,0.5)" }}
                            >
                              {m.before}
                            </span>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="#C9A96E"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                              />
                            </svg>
                            <span
                              className="text-sm font-bold"
                              style={{ color: "#2D2D2D" }}
                            >
                              {m.after}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Phase Metrics */}
                  <div className="flex flex-wrap gap-3">
                    {fp.metrics.map((m, i) => (
                      <div
                        key={i}
                        className="px-4 py-2.5 rounded-lg border"
                        style={{
                          borderColor: "rgba(45,45,45,0.1)",
                          backgroundColor: "rgba(45,45,45,0.02)",
                        }}
                      >
                        <div
                          className="text-[11px] mb-0.5"
                          style={{ color: "rgba(45,45,45,0.35)" }}
                        >
                          {m.label}
                        </div>
                        <div
                          className="text-sm font-semibold"
                          style={{ color: "#2D2D2D" }}
                        >
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="border-t py-12 px-6"
        style={{ borderColor: "rgba(45,45,45,0.1)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span
                className="text-lg font-bold tracking-tight"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#2D2D2D",
                }}
              >
                Uncle Inc.
              </span>
              <span
                className="text-[11px] font-mono tracking-[0.1em]"
                style={{ color: "rgba(45,45,45,0.3)" }}
              >
                INTERNAL
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-sm transition-colors hover:opacity-80"
                style={{ color: "rgba(45,45,45,0.45)" }}
              >
                Home
              </Link>
              <Link
                href="/onboarding-fixes"
                className="text-sm transition-colors hover:opacity-80"
                style={{ color: "rgba(45,45,45,0.45)" }}
              >
                Onboarding Fixes
              </Link>
            </div>
            <p
              className="text-sm"
              style={{ color: "rgba(45,45,45,0.3)" }}
            >
              &copy; {new Date().getFullYear()} Uncle Inc. Internal use only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
