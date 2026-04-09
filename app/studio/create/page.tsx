"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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

export default function CreatePage() {
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
    if (state.step === 1) return !!state.voice.voice_id;
    return true;
  };

  const submit = async () => {
    setLoading(true);
    setError(null);
    try {
      const body = {
        domain_profile: "music",
        recipe: state.recipe,
        voice: state.voice,
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
    try {
      const res = await fetch("/api/v1/records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain_profile: record.domain_profile,
          recipe: record.recipe,
          voice: record.voice,
          inputs: record.inputs,
          iterations: record.iterations,
          curation: record.curation,
          pin_to_ipfs: true,
        }),
      });
      const data = await res.json();
      if (data.ipfs_cid) setIpfsCid(data.ipfs_cid);
    } catch (err) {
      console.error("Pin error:", err);
    } finally {
      setPinning(false);
    }
  };

  const handleAnchor = async () => {
    if (!ipfsCid) return;
    setAnchoring(true);
    try {
      const res = await fetch(`/api/v1/records/${ipfsCid}/anchor`, { method: "POST" });
      const data = await res.json();
      if (data.transaction_hash) setTxHash(data.transaction_hash);
    } catch (err) {
      console.error("Anchor error:", err);
    } finally {
      setAnchoring(false);
    }
  };

  // Result screen
  if (record) {
    return (
      <div className="min-h-screen bg-bg-primary text-white">
        <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-6 pt-10 pb-24">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-xs font-mono text-emerald-400/70 mb-1">Record generated</div>
              <h1 className="text-2xl font-bold text-white">Your HAP Record</h1>
            </div>
            <Link href="/studio"
              className="flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-white transition-colors">
              <ArrowLeft size={13} /> New record
            </Link>
          </div>
          <HCSResult
            record={record}
            onPin={handlePin}
            onAnchor={handleAnchor}
            pinning={pinning}
            anchoring={anchoring}
            ipfsCid={ipfsCid}
            txHash={txHash}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Back link above wizard */}
      <div className="fixed top-5 left-6 z-50">
        <Link href="/studio"
          className="flex items-center gap-2 text-xs font-mono text-slate-600 hover:text-slate-300 transition-colors">
          <ArrowLeft size={13} /> Studio
        </Link>
      </div>

      <WizardShell
        currentStep={state.step}
        onBack={state.step > 0 ? () => set("step", state.step - 1) : undefined}
        onNext={
          state.step < 4
            ? () => set("step", state.step + 1)
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
          <div className="mb-4 p-3 rounded-xl text-xs font-mono text-red-400"
            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
            {error}
          </div>
        )}

        {state.step === 0 && (
          <RecipeStep value={state.recipe} onChange={(v) => set("recipe", v)} />
        )}
        {state.step === 1 && (
          <VoiceStep value={state.voice} onChange={(v) => set("voice", v)} />
        )}
        {state.step === 2 && (
          <InputsStep value={state.inputs} onChange={(v) => set("inputs", v)} />
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
