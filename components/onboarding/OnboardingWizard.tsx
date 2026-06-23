'use client';

import { useState } from 'react';
import { ProgressIndicator } from './ProgressIndicator';
import { LoadingSkeleton } from '../ui/LoadingSkeleton';

interface WizardProps {
  userName?: string;
}

export function OnboardingWizard({ userName }: WizardProps) {
  const [step, setStep] = useState<'idle' | 'describing' | 'generating' | 'done'>('idle');
  const [idea, setIdea] = useState('');
  const [prototypeUrl, setPrototypeUrl] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) {
      setError('Tell us your idea in a few words — even one sentence works!');
      return;
    }
    setError('');
    setIsSubmitting(true);
    setStep('generating');

    try {
      const res = await fetch('/api/prototype/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea: idea.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setPrototypeUrl(data.prototypeUrl || '');
        setStep('done');
        
        fetch('/api/onboarding/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ event: 'wizard_completed', idea: idea.trim() }),
        }).catch(() => {});
      } else {
        setError(data.error || 'Something went wrong. Try again?');
        setStep('idle');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
      setStep('idle');
    } finally {
      setIsSubmitting(false);
    }
  };

  const firstName = userName?.split(' ')[0] || 'Founder';

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1A3A5C] mb-3">
          Welcome, {firstName}! 👋
        </h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Let&apos;s validate your startup idea in the next 5 minutes. No code, no waiting, no guesswork.
        </p>
      </div>

      <ProgressIndicator currentStep={step === 'idle' ? 0 : step === 'generating' ? 1 : step === 'done' ? 2 : 0} />

      {(step === 'idle' || step === 'describing') && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mt-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#22C55E]/10 text-[#22C55E] text-sm font-bold">
              1
            </span>
            <h2 className="text-xl font-semibold text-[#1A3A5C]">
              Describe your idea
            </h2>
          </div>
          
          <form onSubmit={handleSubmit}>
            <label htmlFor="idea" className="block text-sm font-medium text-gray-700 mb-2">
              What problem are you solving and for whom?
            </label>
            <textarea
              id="idea"
              rows={4}
              value={idea}
              onChange={(e) => {
                setIdea(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g., A tool that helps freelance designers automatically chase unpaid invoices without the awkward conversation"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90D9] focus:border-[#4A90D9] outline-none transition-all resize-none text-gray-900 placeholder:text-gray-400"
              disabled={isSubmitting}
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            )}
            <div className="mt-5 flex items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A3A5C] text-white font-semibold rounded-lg hover:bg-[#152f4a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    Generate My Prototype
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
              <span className="text-sm text-gray-500">Free · No credit card</span>
            </div>
          </form>
        </div>
      )}

      {step === 'generating' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mt-8">
          <LoadingSkeleton />
        </div>
      )}

      {step === 'done' && (
        <div className="bg-white rounded-xl shadow-sm border border-[#22C55E]/30 p-6 md:p-8 mt-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#22C55E]/10 mb-4">
              <svg className="w-8 h-8 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#1A3A5C] mb-2">
              Your prototype is ready! 🎉
            </h2>
            <p className="text-gray-600">
              We generated a clickable prototype based on your idea. Here&apos;s what happens next:
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3 p-4 bg-[#F8FAFC] rounded-lg">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#4A90D9] text-white text-xs font-bold">1</span>
              <div>
                <p className="font-semibold text-[#1A3A5C]">Review your prototype</p>
                <p className="text-sm text-gray-600">Click through the interactive prototype and see how your idea comes to life.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-[#F8FAFC] rounded-lg">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#4A90D9] text-white text-xs font-bold">2</span>
              <div>
                <p className="font-semibold text-[#1A3A5C]">Share with testers</p>
                <p className="text-sm text-gray-600">Send the prototype link to 5-10 potential users and gather real feedback.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-[#F8FAFC] rounded-lg">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#4A90D9] text-white text-xs font-bold">3</span>
              <div>
                <p className="font-semibold text-[#1A3A5C]">Iterate based on data</p>
                <p className="text-sm text-gray-600">Use real user feedback to refine your idea before writing a single line of code.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                setStep('idle');
                setIdea('');
                setPrototypeUrl('');
              }}
              className="px-6 py-3 bg-[#1A3A5C] text-white font-semibold rounded-lg hover:bg-[#152f4a] transition-colors"
            >
              Validate Another Idea
            </button>
            <button
              onClick={() => {
                setStep('idle');
                setIdea('');
                setPrototypeUrl('');
              }}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Explore Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
