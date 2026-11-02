"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { WritingBrief, WritingInputs } from "@/components/studio/steps/WritingStep";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WizardShell from "@/components/studio/WizardShell";
import RecipeStep from "@/components/studio/steps/RecipeStep";
import VoiceStep from "@/components/studio/steps/VoiceStep";
import InputsStep from "@/components/studio/steps/InputsStep";
import IterationStep from "@/components/studio/steps/IterationStep";
import CurationStep from "@/components/studio/steps/CurationStep";
import HCSResult from "@/components/studio/HCSResult";
import type { StudioState, HAPRecord } from "@/lib/hap/types";

const INITIAL_STATE: StudioState = {
  step: 0,
  recipe: {},
  voice: { voice_permissions: { licensed_uses: [], prohibited_uses: [], revocable: true } },
  inputs: {},
  iterations: [],
  curation: { decision: "primary_keep" },
};

function CreateWizard() {
  const searchParams = useSearchParams();
  const [domain, setDomain] = useState<"music" | "written_content">(searchParams.get("domain") === "written_content" ? "written_content" : "music");
  const writing = domain === "written_content";
  const [state, setState] = useState<StudioState>(INITIAL_STATE);
  const [record, setRecord] = useState<HAPRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ipfsCid, setIpfsCid] = useState<string | undefined>();
  const [txHash, setTxHash] = useState<string | undefined>();
  const [pinning, setPinning] = useState(false);
  const [anchoring, setAnchoring] = useState(false);

  const set = <K extends keyof StudioState>(k: K, v: StudioState[K]) =>
    setState((s) => ({ ...s, [k]: v }));

  const canAdvance = () => {
    if (state.step === 0) return !!state.recipe.style;
    if (state.step === 1) return writing || !!state.voice.voice_id;
    if (writing && state.step === 2) return (state.inputs.knowledge_context?.sources ?? []).every(source => source.title.trim().length > 0);
    return true;
  };

  const submit = async () => {
    setLoading(true);
    setError(null);
    try {
      const body = {
        domain_profile: domain,
        recipe: state.recipe,
        voice: writing ? { voice_id: "", voice_permissions: { licensed_uses: [], prohibited_uses: [], expiry: "", revocable: false } } : state.voice,
        inputs: state.inputs,
        iterations: state.iterations,
        curation: state.curation,
        pin_to_ipfs: false,
      };

      const res = await fetch("/api/v1/records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Failed to create record");
      }

      const data = await res.json();
      setRecord(data.record);
      if (data.ipfs_cid) setIpfsCid(data.ipfs_cid);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handlePin = async () => {
    if (!record) return;
    setPinning(true);
    setError(null);
    try {
      const res = await fetch("/api/v1/records/pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ record }),
      });
      const data = await res.json();
      if (!res.ok || !data.ipfs_cid) throw new Error(data.error ?? "Publication failed. Please try again.");
      setIpfsCid(data.ipfs_cid);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Publication failed.");
    } finally {
      setPinning(false);
    }
  };

  const handleAnchor = async () => {
    if (!ipfsCid) return;
    setAnchoring(true);
    setError(null);
    try {
      const res = await fetch(`/api/v1/records/${ipfsCid}/anchor`, { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.transaction_hash) throw new Error(data.error ?? "Anchoring failed. Please try again.");
      setTxHash(data.transaction_hash);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Anchoring failed.");
    } finally {
      setAnchoring(false);
    }
  };

  // Result screen
  if (record) {
    return (
      <div className="hap-surface">
        <a className="skip-link" href="#main">Skip to record</a><Navbar />
        <main id="main" className="hap-wrap result-wrap">
          <header className="interior-heading result-heading">
            <p className="hap-eyebrow">HAP Studio / Record generated</p>
            <h1>Your work.<br /><em>Your record.</em></h1>
            <Link className="hap-text-link" href="/studio">Start another record ↗</Link>
          </header>
          {error && <p className="form-error" role="alert">{error}</p>}
          <HCSResult
            record={record}
            onPin={handlePin}
            onAnchor={handleAnchor}
            pinning={pinning}
            anchoring={anchoring}
            ipfsCid={ipfsCid}
            txHash={txHash}
          />
        </main><Footer />
      </div>
    );
  }

  return (
    <>
      <WizardShell
        currentStep={state.step}
        stepLabels={writing ? ["Writing brief", "Voice (not applicable)", "Writing & knowledge", "Draft history", "Final selection"] : undefined}
        visibleSteps={writing ? [0, 2, 3, 4] : undefined}
        onBack={state.step > 0 ? () => set("step", writing && state.step === 2 ? 0 : state.step - 1) : undefined}
        onNext={
          state.step < 4
            ? () => set("step", writing && state.step === 0 ? 2 : state.step + 1)
            : submit
        }
        onNextLabel={
          state.step === 4
            ? loading ? "Generating..." : "Generate Record"
            : undefined
        }
        nextDisabled={!canAdvance() || loading}
        isFinalStep={state.step === 4}
      >
        {error && (
          <div className="form-error" role="alert">
            {error}
          </div>
        )}

        {state.step === 0 && (
          <div className="space-y-7"><label className="block space-y-2"><span className="text-sm">What are you documenting?</span><select aria-label="Work type" className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3" value={domain} onChange={e => { setDomain(e.target.value as typeof domain); setState(INITIAL_STATE); }}><option value="music">Music & sound</option><option value="written_content">Written work</option></select></label>{writing ? <WritingBrief value={state.recipe} onChange={v => set("recipe", v)} /> : <RecipeStep value={state.recipe} onChange={(v) => set("recipe", v)} />}</div>
        )}
        {state.step === 1 && (
          <VoiceStep value={state.voice} onChange={(v) => set("voice", v)} />
        )}
        {state.step === 2 && (
          writing ? <WritingInputs value={state.inputs} onChange={v => set("inputs", v)} /> : <InputsStep value={state.inputs} onChange={(v) => set("inputs", v)} />
        )}
        {state.step === 3 && (
          <IterationStep value={state.iterations} onChange={(v) => set("iterations", v)} />
        )}
        {state.step === 4 && (
          <CurationStep
            value={state.curation}
            iterations={state.iterations}
            onChange={(v) => set("curation", v)}
          />
        )}
      </WizardShell>
    </>
  );
}

export default function CreatePage() {
  return <Suspense fallback={<div className="hap-surface"><Navbar /><main className="hap-wrap interior-heading" role="status"><p className="hap-eyebrow">HAP Studio</p><h1>Preparing your workspace…</h1></main></div>}><CreateWizard /></Suspense>;
}
