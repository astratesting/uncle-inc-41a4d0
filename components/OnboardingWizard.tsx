'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProgressIndicator from './ProgressIndicator';
import SkeletonPrototype from './SkeletonPrototype';

const STEPS = [
  { id: 1, label: 'Describe Your Idea', subtitle: 'One sentence is all it takes' },
  { id: 2, label: 'Define Your Audience', subtitle: 'Who needs this most?' },
  { id: 3, label: 'Review Your Prototype', subtitle: 'See what we built for you' },
];

export default function OnboardingWizard({ userName = 'Founder' }: { userName?: string }) {
  const [step, setStep] = useState(1);
  const [idea, setIdea] = useState('');
  const [audience, setAudience] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [prototypeUrl, setPrototypeUrl] = useState('');
  const router = useRouter();

  const handleIdeaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;
    setShowSkeleton(true);
    setIsGenerating(true);
    
    // Simulate prototype generation with skeleton
    setTimeout(() => {
      setIsGenerating(false);
      setShowSkeleton(false);
      setStep(3);
    }, 2500);
  };

  const handleAudienceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!audience.trim()) return;
    setStep(2);
  };

  const skipAudience = () => {
    setStep(2);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Personalized greeting */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#1A3A5C] mb-2">
          Welcome, {userName}! 👋
        </h2>
        <p className="text-[#64748B] text-lg">
          Let&apos;s validate your startup idea in under 3 minutes.
        </p>
        <p className="text-sm text-[#22C55E] mt-2 font-medium">
          42% of startups fail from no market need — you&apos;ll test before you build.
        </p>
      </div>

      {/* Progress indicator */}
      <ProgressIndicator steps={STEPS} currentStep={step} />

      {/* Step 1: Idea Input */}
      {step === 1 && (
        <form onSubmit={handleIdeaSubmit} className="mt-8">
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm">
            <label className="block text-sm font-semibold text-[#1A3A5C] mb-3">
              What are you building?
            </label>
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="e.g. A platform that connects freelance designers with startups who need quick branding work"
              className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] focus:ring-2 focus:ring-[#4A90D9] focus:border-transparent resize-none"
              rows={3}
              maxLength={280}
            />
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-[#94A3B8]">
                {idea.length}/280 characters
              </span>
              <button
                type="submit"
                disabled={!idea.trim() || isGenerating}
                className="px-6 py-2.5 bg-[#1A3A5C] text-white rounded-lg font-medium hover:bg-[#15304F] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isGenerating ? 'Generating...' : 'Build My Prototype →'}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Step 2: Audience Definition */}
      {step === 2 && (
        <form onSubmit={handleAudienceSubmit} className="mt-8">
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm">
            <label className="block text-sm font-semibold text-[#1A3A5C] mb-3">
              Who is this for? (optional)
            </label>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g. Early-stage startup founders without technical co-founders"
              className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] focus:ring-2 focus:ring-[#4A90D9] focus:border-transparent"
            />
            <div className="flex items-center justify-between mt-3 gap-3">
              <button
                type="button"
                onClick={skipAudience}
                className="text-sm text-[#64748B] hover:text-[#1A3A5C] underline"
              >
                Skip for now
              </button>
              <button
                type="submit"
                disabled={!audience.trim()}
                className="px-6 py-2.5 bg-[#4A90D9] text-white rounded-lg font-medium hover:bg-[#3A7BC8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Continue →
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Step 3: Prototype Review */}
      {step === 3 && (
        <div className="mt-8">
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#22C55E]/10 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#1A3A5C]">Prototype Ready!</h3>
                <p className="text-sm text-[#64748B]">Based on &quot;{idea.slice(0, 60)}{idea.length > 60 ? '...' : ''}&quot;</p>
              </div>
            </div>
            
            <div className="bg-[#F8FAFC] rounded-lg p-8 text-center border border-dashed border-[#E2E8F0]">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#4A90D9]/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[#4A90D9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-[#64748B] mb-4">
                Your interactive prototype is ready. Share it with potential users and collect real feedback — no code required.
              </p>
              <button
                onClick={() => router.push('/dashboard/projects')}
                className="px-6 py-2.5 bg-[#22C55E] text-white rounded-lg font-medium hover:bg-[#16A34A] transition-colors"
              >
                View My Prototype →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Skeleton loading state */}
      {showSkeleton && <SkeletonPrototype idea={idea} />}
    </div>
  );
}