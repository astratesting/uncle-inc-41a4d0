"use client";

import { useState, useEffect } from "react";
import { Lightbulb, ArrowRight, Sparkles, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { FeedbackWidgetInline } from "./FeedbackWidgetInline";

interface OnboardingWizardProps {
  userName: string;
  onComplete: (idea: string) => void;
}

type WizardStep = "greeting" | "idea" | "generating" | "done";

export function OnboardingWizard({ userName, onComplete }: OnboardingWizardProps) {
  const [step, setStep] = useState<WizardStep>("greeting");
  const [idea, setIdea] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    trackEvent("onboarding_wizard_shown");
  }, []);

  function handleIdeaSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!idea.trim()) return;
    setStep("generating");
    trackEvent("onboarding_idea_submitted", { idea: idea.trim() });

    // Simulate prototype generation
    setTimeout(() => {
      setStep("done");
      trackEvent("onboarding_prototype_generated");
      onComplete(idea.trim());
    }, 3000);
  }

  function handleSkip() {
    trackEvent("onboarding_wizard_skipped");
    onComplete("");
  }

  function handleDismiss() {
    trackEvent("onboarding_wizard_dismissed");
    onComplete("");
  }

  return (
    <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/80 p-6 mb-6 animate-fade-in">
      {/* Step: Greeting */}
      {step === "greeting" && (
        <div className="animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">
                  <span className="gradient-text">Welcome aboard, {userName}!</span>
                </h2>
                <p className="text-xs text-[#8888a0] mt-0.5">
                  Let&apos;s get your first idea rolling
                </p>
              </div>
            </div>
            <button
              onClick={handleSkip}
              className="text-xs text-[#8888a0] hover:text-[#e4e4ec] transition-colors"
            >
              Skip for now
            </button>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-[#0a0a0f]/60 border border-[#1e1e2e]">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-[#e4e4ec] font-medium mb-1">
                  What&apos;s your startup idea? One sentence is enough.
                </p>
                <p className="text-xs text-[#8888a0]">
                  We&apos;ll generate a clickable prototype you can share with testers in seconds.
                </p>
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); if (idea.trim()) setStep("idea"); }} className="mt-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="e.g. A marketplace for dog walkers in urban areas"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-[#1e1e2e] text-[#e4e4ec] placeholder:text-[#8888a0] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors text-sm"
                />
                <button
                  type="submit"
                  disabled={!idea.trim()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                  Go
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Step: Idea confirmation (brief) then straight to generating */}
      {step === "idea" && (
        <div className="animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-teal-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#e4e4ec]">Great idea!</h2>
                <p className="text-xs text-[#8888a0] mt-0.5">&quot;{idea}&quot;</p>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 text-[#8888a0] hover:text-[#e4e4ec] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleIdeaSubmit}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Generate Prototype
          </button>
        </div>
      )}

      {/* Step: Generating prototype with skeleton */}
      {step === "generating" && (
        <div className="animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center animate-pulse-glow">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#e4e4ec]">
                Generating your prototype...
              </h2>
              <p className="text-xs text-[#8888a0] mt-0.5">
                Building &quot;{idea}&quot;
              </p>
            </div>
          </div>

          {/* Skeleton card */}
          <div className="space-y-3">
            <div className="h-4 w-3/4 rounded bg-[#1e1e2e] animate-pulse" />
            <div className="h-4 w-1/2 rounded bg-[#1e1e2e] animate-pulse" />
            <div className="h-32 w-full rounded-xl bg-[#1e1e2e] animate-pulse" />
            <div className="flex gap-3">
              <div className="h-8 w-24 rounded-lg bg-[#1e1e2e] animate-pulse" />
              <div className="h-8 w-24 rounded-lg bg-[#1e1e2e] animate-pulse" />
            </div>
          </div>
        </div>
      )}

      {/* Step: Done */}
      {step === "done" && (
        <div className="animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-teal-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">
                  <span className="gradient-text">Prototype ready!</span>
                </h2>
                <p className="text-xs text-[#8888a0] mt-0.5">
                  Your idea &quot;{idea}&quot; is now a clickable prototype
                </p>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="text-xs text-[#8888a0] hover:text-[#e4e4ec] transition-colors"
            >
              Dismiss
            </button>
          </div>

          <div className="p-4 rounded-xl bg-[#0a0a0f]/60 border border-[#1e1e2e]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#e4e4ec] font-medium">Prototype Preview</p>
                <p className="text-xs text-[#8888a0] mt-1">Click to view your generated prototype</p>
              </div>
              <button
                onClick={() => {
                  trackEvent("onboarding_prototype_viewed");
                  setShowFeedback(true);
                }}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-teal-600 hover:bg-teal-500 text-white transition-colors"
              >
                View Prototype
              </button>
            </div>
          </div>

          {/* Feedback after prototype view */}
          {showFeedback && (
            <div className="mt-4 animate-slide-up">
              <FeedbackWidgetInline
                context="onboarding_prototype"
                placeholder="How does the prototype look? Any tweaks?"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
