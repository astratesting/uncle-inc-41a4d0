"use client";

import { Lightbulb, Cpu, Users, Check } from "lucide-react";

interface ProgressIndicatorProps {
  currentStage: 1 | 2 | 3;
}

const stages = [
  {
    id: 1,
    label: "Idea Captured",
    icon: Lightbulb,
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
  },
  {
    id: 2,
    label: "Prototype Generated",
    icon: Cpu,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
  },
  {
    id: 3,
    label: "Testers Invited",
    icon: Users,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
];

export function ProgressIndicator({ currentStage }: ProgressIndicatorProps) {
  return (
    <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/80 p-6 mb-6 animate-fade-in">
      <h3 className="text-sm font-medium text-[#8888a0] mb-4 uppercase tracking-wider">
        Your Progress
      </h3>
      <div className="flex items-center gap-2">
        {stages.map((stage, idx) => {
          const isComplete = stage.id <= currentStage;
          const isCurrent = stage.id === currentStage;
          const Icon = stage.icon;

          return (
            <div key={stage.id} className="flex items-center flex-1">
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                    isComplete
                      ? `${stage.bg} ${stage.border}`
                      : "bg-[#0a0a0f] border-[#1e1e2e]"
                  }`}
                >
                  {isComplete && stage.id < currentStage ? (
                    <Check className={`w-4 h-4 ${stage.color}`} />
                  ) : (
                    <Icon
                      className={`w-4 h-4 ${
                        isComplete ? stage.color : "text-[#8888a0]"
                      }`}
                    />
                  )}
                </div>
                <span
                  className={`text-xs font-medium truncate ${
                    isCurrent
                      ? "text-[#e4e4ec]"
                      : isComplete
                      ? stage.color
                      : "text-[#8888a0]"
                  }`}
                >
                  {stage.label}
                </span>
              </div>
              {idx < stages.length - 1 && (
                <div
                  className={`flex-1 h-px mx-3 ${
                    stage.id < currentStage ? "bg-teal-500/30" : "bg-[#1e1e2e]"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
