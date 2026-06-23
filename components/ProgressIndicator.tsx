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
    <div className="flex items-center justify-between mb-2">
      {steps.map((s, i) => (
        <div key={s.id} className="flex items-center flex-1">
          <div className="flex flex-col items-center flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                currentStep >= s.id
                  ? "bg-[#1A3A5C] text-white"
                  : "bg-[#E2E8F0] text-[#94A3B8]"
              }`}
            >
              {currentStep > s.id ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                s.id
              )}
            </div>
            <span className="text-xs text-[#64748B] mt-1 text-center hidden sm:block">
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`h-0.5 flex-1 mx-2 rounded transition-colors ${
                currentStep > s.id ? "bg-[#1A3A5C]" : "bg-[#E2E8F0]"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
