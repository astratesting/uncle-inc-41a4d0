'use client';

import { useState } from 'react';
import ProgressIndicator from './ProgressIndicator';

interface OnboardingWizardProps {
  userName: string;
}

export default function OnboardingWizard({ userName }: OnboardingWizardProps) {
  const [step, setStep] = useState(0);
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [prototype, setPrototype] = useState<{
    name: string;
    description: string;
    features: string[];
    nextSteps: string[];
  } | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!idea.trim()) return;
    setStep(1);
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/prototype/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea: idea.trim() }),
      });

      if (!res.ok) throw new Error('Failed to generate prototype');

      const data = await res.json();
      setPrototype(data);
      setStep(2);
    } catch {
      setError('Something went wrong. Please try again.');
      setStep(0);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(0);
    setIdea('');
    setPrototype(null);
    setError('');
  };

  return (
    <div className="rounded-2xl p-6 md:p-8" style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e0d8' }}>
      <ProgressIndicator currentStep={step} />

      <div className="mt-8">
        {/* Step 0: Describe Idea */}
        {step === 0 && (
          <div className="animate-fade-in">
            <h3 className="text-xl font-bold mb-2" style={{ color: '#1a1a1a', fontFamily: 'Georgia, serif' }}>
              What&apos;s your idea?
            </h3>
            <p className="text-sm mb-6" style={{ color: '#666' }}>
              Describe what you want to build in a sentence or two. We&apos;ll help you validate it.
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: '#722F3715', color: '#722F37', border: '1px solid #722F3730' }}>
                {error}
              </div>
            )}

            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="e.g., A marketplace that connects pet owners with local dog walkers who have availability right now..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-colors resize-none"
              style={{ borderColor: '#e2e0d8', color: '#1a1a1a', backgroundColor: '#FFFBF5' }}
            />
            <p className="text-xs mt-2" style={{ color: '#a8a29e' }}>
              The more specific you are, the better your prototype will be.
            </p>

            <button
              onClick={handleSubmit}
              disabled={!idea.trim()}
              className="mt-6 w-full py-3 rounded-lg text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-40"
              style={{ backgroundColor: '#C8A951', color: '#1a1a1a' }}
            >
              Generate Prototype
            </button>
          </div>
        )}

        {/* Step 1: Loading */}
        {step === 1 && (
          <div className="animate-fade-in text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ backgroundColor: '#C8A95115' }}>
              <svg className="w-8 h-8 animate-spin" style={{ color: '#C8A951' }} fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#1a1a1a', fontFamily: 'Georgia, serif' }}>
              Generating your prototype...
            </h3>
            <p className="text-sm" style={{ color: '#666' }}>
              We&apos;re analyzing your idea and building a validation plan. This takes a moment.
            </p>
            <div className="mt-6 flex justify-center gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full animate-bounce"
                  style={{
                    backgroundColor: '#C8A951',
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Results */}
        {step === 2 && prototype && (
          <div className="animate-slide-up">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#22c55e15' }}>
                <svg className="w-5 h-5" style={{ color: '#22c55e' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold" style={{ color: '#1a1a1a', fontFamily: 'Georgia, serif' }}>
                Your Prototype is Ready
              </h3>
            </div>

            <div className="rounded-xl p-5 mb-4" style={{ backgroundColor: '#FFFBF5', border: '1px solid #e2e0d8' }}>
              <h4 className="font-semibold text-base mb-1" style={{ color: '#1a1a1a' }}>
                {prototype.name}
              </h4>
              <p className="text-sm" style={{ color: '#666' }}>
                {prototype.description}
              </p>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2" style={{ color: '#1a1a1a' }}>
                Core Features
              </h4>
              <ul className="space-y-2">
                {prototype.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#57534e' }}>
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: '#C8A95115', color: '#C8A951' }}>
                      {i + 1}
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-2" style={{ color: '#1a1a1a' }}>
                Recommended Next Steps
              </h4>
              <ul className="space-y-2">
                {prototype.nextSteps.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#57534e' }}>
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#22c55e' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: '#1a1a1a', color: '#FFFBF5' }}
            >
              Validate Another Idea
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
