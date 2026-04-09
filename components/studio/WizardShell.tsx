"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const STEPS = [
  { label: "Recipe", color: "#06B6D4" },
  { label: "Voice", color: "#8B5CF6" },
  { label: "Inputs", color: "#10B981" },
  { label: "Iteration", color: "#F59E0B" },
  { label: "Curation", color: "#EC4899" },
];

interface Props {
  currentStep: number;
  children: React.ReactNode;
  onBack?: () => void;
  onNext?: () => void;
  onNextLabel?: string;
  nextDisabled?: boolean;
  isFinalStep?: boolean;
}

export default function WizardShell({
  currentStep,
  children,
  onBack,
  onNext,
  onNextLabel,
  nextDisabled,
  isFinalStep,
}: Props) {
  const step = STEPS[currentStep];

  return (
    <div className="min-h-screen bg-bg-primary text-white">
      <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-6 pt-10 pb-24">
        {/* Step indicators */}
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((s, i) => {
            const done = i < currentStep;
            const active = i === currentStep;
            return (
              <div key={s.label} className="flex items-center gap-2 flex-1">
                <div className="flex flex-col items-center gap-1">
                  <motion.div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono border transition-all duration-300"
                    style={{
                      background: done ? s.color : active ? `${s.color}18` : "rgba(255,255,255,0.03)",
                      borderColor: done || active ? s.color : "rgba(255,255,255,0.08)",
                      color: done ? "#000" : active ? s.color : "#475569",
                    }}
                  >
                    {done ? <Check size={12} /> : i + 1}
                  </motion.div>
                  <span className="text-[10px] font-mono hidden sm:block"
                    style={{ color: active ? s.color : done ? "#64748b" : "#334155" }}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 h-px mb-5"
                    style={{ background: i < currentStep ? STEPS[i].color : "rgba(255,255,255,0.06)" }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step label */}
        <div className="mb-6">
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: step.color }}>
            Step {currentStep + 1} of {STEPS.length}
          </span>
          <h2 className="text-2xl font-bold text-white mt-1">{step.label}</h2>
        </div>

        {/* Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          {onBack ? (
            <button
              onClick={onBack}
              className="px-5 py-2.5 rounded-xl text-sm font-mono font-medium text-slate-400 hover:text-white transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              Back
            </button>
          ) : <div />}

          {onNext && (
            <button
              onClick={onNext}
              disabled={nextDisabled}
              className="px-6 py-2.5 rounded-xl text-sm font-bold font-mono text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]"
              style={{
                background: nextDisabled
                  ? "rgba(255,255,255,0.06)"
                  : `linear-gradient(135deg, ${step.color}, ${STEPS[Math.min(currentStep + 1, 4)].color})`,
                boxShadow: nextDisabled ? "none" : `0 0 20px ${step.color}30`,
              }}
            >
              {onNextLabel ?? (isFinalStep ? "Generate Record" : "Continue")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
