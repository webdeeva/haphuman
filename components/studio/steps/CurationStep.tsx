"use client";

import { MousePointerClick } from "lucide-react";
import type { HAPCuration, HAPIteration } from "@/lib/hap/types";

interface Props {
  value: Partial<HAPCuration>;
  iterations: HAPIteration[];
  onChange: (v: Partial<HAPCuration>) => void;
}

const DECISIONS = [
  { value: "primary_keep", label: "Primary Keep", desc: "This is the final version I'm releasing", color: "#10B981" },
  { value: "archive", label: "Archive", desc: "Keeping it but not releasing", color: "#06B6D4" },
  { value: "discard", label: "Discard", desc: "Documenting but not using", color: "#475569" },
] as const;

export default function CurationStep({ value, iterations, onChange }: Props) {
  const selectedVersion = iterations.find((it) => it.selected);

  return (
    <div className="space-y-7">
      <div className="glass rounded-xl p-5 flex items-start gap-4"
        style={{ border: "1px solid rgba(236,72,153,0.2)" }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "rgba(236,72,153,0.1)", color: "#EC4899" }}>
          <MousePointerClick size={18} />
        </div>
        <div>
          <p className="text-sm font-bold text-white mb-1">The act of choosing matters</p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Curation is a distinct HAP component. The decision to keep a specific output is itself a human creative act — separate from iteration — and contributes 10% to your HCS.
          </p>
        </div>
      </div>

      {selectedVersion && (
        <div className="glass rounded-xl p-4"
          style={{ border: "1px solid rgba(16,185,129,0.2)" }}>
          <p className="text-xs font-mono text-emerald-400/70 mb-1">Selected version from Iteration step</p>
          <p className="text-sm font-mono text-white">{selectedVersion.version}</p>
          <p className="text-xs text-slate-400 mt-1">{selectedVersion.notes}</p>
        </div>
      )}

      <div>
        <label className="block text-xs font-mono text-slate-400 mb-3 uppercase tracking-wider">
          What are you doing with this output?
        </label>
        <div className="space-y-3">
          {DECISIONS.map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => onChange({ ...value, decision: d.value })}
              className="w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200"
              style={{
                background: value.decision === d.value ? `${d.color}10` : "rgba(255,255,255,0.02)",
                border: `1px solid ${value.decision === d.value ? d.color : "rgba(255,255,255,0.06)"}`,
              }}
            >
              <div
                className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                style={{ borderColor: value.decision === d.value ? d.color : "#334155" }}
              >
                {value.decision === d.value && (
                  <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                )}
              </div>
              <div>
                <p className="text-sm font-bold font-mono" style={{ color: value.decision === d.value ? d.color : "#94a3b8" }}>
                  {d.label}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{d.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">
          Output CID (optional)
        </label>
        <input
          type="text"
          placeholder="bafybeig... (IPFS CID of the audio file, if you have it)"
          value={value.selected_cid ?? ""}
          onChange={(e) => onChange({ ...value, selected_cid: e.target.value })}
          className="w-full bg-transparent border rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none"
          style={{ borderColor: "rgba(236,72,153,0.2)" }}
        />
      </div>
    </div>
  );
}
