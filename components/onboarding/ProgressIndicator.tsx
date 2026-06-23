'use client';

interface ProgressIndicatorProps {
  currentStep: number;
}

const steps = [
  { label: 'Describe Idea', icon: '💡' },
  { label: 'Generate Prototype', icon: '⚡' },
  { label: 'Review & Share', icon: '🚀' },
];

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={step.label} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`
                    flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all duration-500
                    ${isCompleted ? 'bg-[#22C55E] text-white scale-100' : ''}
                    ${isCurrent ? 'bg-[#4A90D9] text-white scale-110 ring-4 ring-[#4A90D9]/20' : ''}
                    ${!isCompleted && !isCurrent ? 'bg-gray-200 text-gray-400' : ''}
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span>{step.icon}</span>
                  )}
                </div>
                <span
                  className={`mt-2 text-xs font-medium whitespace-nowrap transition-colors duration-300 ${
                    isCompleted ? 'text-[#22C55E]' : isCurrent ? 'text-[#4A90D9]' : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 mb-5">
                  <div className="h-1 rounded-full bg-gray-200">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isCompleted ? 'w-full bg-[#22C55E]' : isCurrent ? 'w-1/2 bg-[#4A90D9] animate-pulse' : 'w-0'
                      }`}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
