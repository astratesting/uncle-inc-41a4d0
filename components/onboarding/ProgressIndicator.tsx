'use client';

interface ProgressIndicatorProps {
  currentStep: number; // 0, 1, 2
  steps?: string[];
}

const defaultSteps = ['Describe Idea', 'Generating Prototype', 'Review Results'];

export default function ProgressIndicator({ currentStep, steps = defaultSteps }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 w-full max-w-md mx-auto">
      {steps.map((step, i) => {
        const isActive = i === currentStep;
        const isComplete = i < currentStep;

        return (
          <div key={step} className="flex items-center gap-2 flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500"
                style={{
                  backgroundColor: isComplete ? '#22c55e' : isActive ? '#C8A951' : '#e7e5e4',
                  color: isComplete || isActive ? '#FFFFFF' : '#a8a29e',
                  boxShadow: isActive ? '0 0 0 4px #C8A95120' : 'none',
                }}
              >
                {isComplete ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className="text-[10px] mt-1 font-medium text-center whitespace-nowrap"
                style={{ color: isActive ? '#1a1a1a' : isComplete ? '#22c55e' : '#a8a29e' }}
              >
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className="h-0.5 flex-1 rounded-full transition-all duration-500 mt-[-14px]"
                style={{ backgroundColor: isComplete ? '#22c55e' : '#e7e5e4' }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
