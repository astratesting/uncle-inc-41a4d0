"use client";

import { useState, useEffect, useCallback } from "react";
import { OnboardingWizard } from "./OnboardingWizard";
import { ProgressIndicator } from "./ProgressIndicator";
import { trackEvent } from "@/lib/analytics";
import { X, Mail } from "lucide-react";

interface DashboardShellProps {
  userName: string;
  userEmail: string;
  children: React.ReactNode;
}

export function DashboardShell({ userName, userEmail, children }: DashboardShellProps) {
  const [showWizard, setShowWizard] = useState(false);
  const [wizardComplete, setWizardComplete] = useState(false);
  const [idea, setIdea] = useState("");
  const [stage, setStage] = useState<1 | 2 | 3>(1);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationDismissed, setNotificationDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("uncle_onboarding_dismissed");
    if (!dismissed) {
      setShowWizard(true);
    } else {
      const savedIdea = localStorage.getItem("uncle_idea");
      if (savedIdea) {
        setIdea(savedIdea);
        setWizardComplete(true);
        setStage(2);
      }
    }
  }, []);

  const handleWizardComplete = useCallback((newIdea: string) => {
    setShowWizard(false);
    setWizardComplete(true);
    localStorage.setItem("uncle_onboarding_dismissed", "true");

    if (newIdea) {
      setIdea(newIdea);
      setStage(2);
      localStorage.setItem("uncle_idea", newIdea);
      // Show email notification prompt after a beat
      setTimeout(() => setShowNotification(true), 1500);
    }
  }, []);

  function handleNotifyMe() {
    trackEvent("notification_signup", { idea });
    setShowNotification(false);
    setNotificationDismissed(true);
  }

  function handleDismissNotification() {
    setShowNotification(false);
    setNotificationDismissed(true);
  }

  return (
    <div>
      {/* Onboarding Wizard */}
      {showWizard && (
        <OnboardingWizard
          userName={userName || userEmail.split("@")[0]}
          onComplete={handleWizardComplete}
        />
      )}

      {/* Progress Indicator (shown after wizard completes) */}
      {wizardComplete && idea && (
        <ProgressIndicator currentStage={stage} />
      )}

      {/* Email notification toast */}
      {showNotification && (
        <div className="rounded-2xl border border-teal-500/20 bg-teal-500/5 p-4 mb-6 animate-slide-up flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
              <Mail className="w-4 h-4 text-teal-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#e4e4ec]">
                We&apos;ll email you when your prototype is ready
              </p>
              <p className="text-xs text-[#8888a0]">
                Sent to {userEmail}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleNotifyMe}
              className="px-4 py-2 rounded-xl text-xs font-medium bg-teal-600 hover:bg-teal-500 text-white transition-colors"
            >
              Notify me
            </button>
            <button
              onClick={handleDismissNotification}
              className="p-1 text-[#8888a0] hover:text-[#e4e4ec] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Existing dashboard content */}
      {children}
    </div>
  );
}
