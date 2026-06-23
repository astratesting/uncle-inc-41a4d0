"use client";

interface Step {
  id: number;
  label: string;
  subtitle: string;
}

export default function ProgressIndicator({
  steps,
  currentStep,
}: {
  steps: Step[];
  currentStep: number;
}) {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step) => (
        <div key={step.id} className="flex-1 flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step.id <= currentStep
                ? "bg-sky-400 text-white"
                : "bg-dark-text/10 text-dark-text/40"
            }`}
          >
            {step.id}
          </div>
          <span className="mt-2 text-xs font-heading text-dark-text/50 text-center">
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
}
