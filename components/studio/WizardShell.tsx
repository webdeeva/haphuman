"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const STEPS = ["Creative brief", "Voice permissions", "Original inputs", "Version history", "Final selection"];
interface Props {
  currentStep: number;
  stepLabels?: string[];
  visibleSteps?: number[];
  children: React.ReactNode;
  onBack?: () => void;
  onNext?: () => void;
  onNextLabel?: string;
  nextDisabled?: boolean;
  isFinalStep?: boolean;
}

export default function WizardShell({ currentStep, stepLabels, visibleSteps = [0, 1, 2, 3, 4], children, onBack, onNext, onNextLabel, nextDisabled, isFinalStep }: Props) {
  const labels = stepLabels ?? STEPS;
  const heading = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(currentStep);
  useEffect(() => {
    if (previousStep.current !== currentStep) {
      heading.current?.focus();
      heading.current?.scrollIntoView({ block: "start" });
      previousStep.current = currentStep;
    }
  }, [currentStep]);
  return <div className="hap-surface">
    <a className="skip-link" href="#main">Skip to form</a><Navbar />
    <main id="main" className="hap-wrap wizard-layout">
      <aside className="wizard-sidebar">
        <Link className="hap-text-link" href="/studio">← Back to Studio</Link>
        <p className="hap-eyebrow">Your record / In progress</p>
        <ol className="wizard-progress" aria-label="Record progress">{visibleSteps.map((step, i) => <li key={step} aria-current={currentStep === step ? "step" : undefined} data-complete={step < currentStep}><span>{step < currentStep ? "✓" : String(i + 1).padStart(2, "0")}</span><span>{labels[step]}</span></li>)}</ol>
        <p className="wizard-note">Your work has a history.<br />Give it room in the record.</p>
      </aside>
      <div className="wizard-content">
        <header className="wizard-heading"><p className="hap-eyebrow">Step {visibleSteps.indexOf(currentStep) + 1} / {visibleSteps.length}</p><h1 ref={heading} tabIndex={-1}>{labels[currentStep]}</h1></header>
        <p className="session-note">This draft stays in the current tab. Generate and copy your record before leaving or reloading.</p>
        <div className="studio-form">{children}</div>
        <div className="wizard-actions">{onBack ? <button className="hap-secondary" onClick={onBack}>← Previous step</button> : <span />}{onNext && <button className="hap-button" onClick={onNext} disabled={nextDisabled}>{onNextLabel ?? (isFinalStep ? "Generate record" : "Continue")} <span aria-hidden="true">↗</span></button>}</div>
      </div>
    </main><Footer />
  </div>;
}
