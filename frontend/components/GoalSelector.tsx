"use client";

import { useState } from "react";
import { Target, Rocket, DollarSign, Compass, ArrowRight, ArrowLeft } from "lucide-react";

const GOALS = [
  {
    id: "validate",
    label: "Validate an idea",
    description: "Test if your concept has real market demand",
    icon: Target,
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
    hoverBorder: "hover:border-teal-500/40",
  },
  {
    id: "build",
    label: "Build an MVP",
    description: "Get a working prototype into users' hands fast",
    icon: Rocket,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    hoverBorder: "hover:border-indigo-500/40",
  },
  {
    id: "funding",
    label: "Get funding ready",
    description: "Prepare pitch materials and traction data",
    icon: DollarSign,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    hoverBorder: "hover:border-yellow-500/40",
  },
  {
    id: "explore",
    label: "Just exploring",
    description: "See what Uncle Inc. can do for founders",
    icon: Compass,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    hoverBorder: "hover:border-cyan-500/40",
  },
] as const;

interface GoalSelectorProps {
  onComplete: (goal: string) => void;
  onBack: () => void;
}

export function GoalSelector({ onComplete, onBack }: GoalSelectorProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleContinue() {
    if (!selected) return;
    setLoading(true);
    onComplete(selected);
  }

  return (
    <div className="animate-slide-up">
      <p className="text-sm text-[#8888a0] text-center mb-6">
        What brings you here? We&apos;ll tailor your experience.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {GOALS.map((goal) => {
          const Icon = goal.icon;
          const isSelected = selected === goal.id;

          return (
            <button
              key={goal.id}
              type="button"
              onClick={() => setSelected(goal.id)}
              className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                isSelected
                  ? `${goal.bg} ${goal.border} ring-1 ring-opacity-30`
                  : `bg-[#0a0a0f] border-[#1e1e2e] ${goal.hoverBorder}`
              }`}
              style={
                isSelected
                  ? {
                      boxShadow: `0 0 12px ${
                        goal.id === "validate"
                          ? "rgba(20,184,166,0.15)"
                          : goal.id === "build"
                          ? "rgba(79,70,229,0.15)"
                          : goal.id === "funding"
                          ? "rgba(234,179,8,0.15)"
                          : "rgba(6,182,212,0.15)"
                      }`,
                    }
                  : undefined
              }
            >
              <Icon
                className={`w-5 h-5 mb-2 ${
                  isSelected ? goal.color : "text-[#8888a0]"
                }`}
              />
              <p
                className={`text-sm font-medium ${
                  isSelected ? "text-[#e4e4ec]" : "text-[#8888a0]"
                }`}
              >
                {goal.label}
              </p>
              <p className="text-xs text-[#8888a0] mt-0.5 leading-relaxed">
                {goal.description}
              </p>
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-[#8888a0] hover:text-[#e4e4ec] border border-[#1e1e2e] hover:border-[#2e2e3e] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          type="button"
          onClick={handleContinue}
          disabled={!selected || loading}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors"
        >
          {loading ? "Setting up..." : "Continue"}
          {!loading && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
