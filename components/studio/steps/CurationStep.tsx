"use client";

import { MousePointerClick } from "lucide-react";
import type { HAPCuration, HAPIteration } from "@/lib/hap/types";

interface Props {
  value: Partial<HAPCuration>;
  iterations: HAPIteration[];
  onChange: (v: Partial<HAPCuration>) => void;
}

const DECISIONS = [
  { value: "primary_keep", label: "Primary Keep", desc: "This is the final version I'm releasing", color: "#b7c9a5" },
  { value: "archive", label: "Archive", desc: "Keeping it but not releasing", color: "#b7c9a5" },
  { value: "discard", label: "Discard", desc: "Documenting but not using", color: "#aab4ac" },
] as const;

export default function CurationStep({ value, iterations, onChange }: Props) {
  const selectedVersion = iterations.find((it) => it.selected);

  return (
    <div className="space-y-7">
      <div className="glass rounded-sm p-5 flex items-start gap-4"
        style={{ border: "1px solid rgba(183,201,165,0.2)" }}>
        <div className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0"
          style={{ background: "rgba(183,201,165,0.1)", color: "#b7c9a5" }}>
          <MousePointerClick size={18} />
        </div>
        <div>
          <p className="text-sm font-bold text-white mb-1">The act of choosing matters</p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Curation is a distinct HAP component. The current scoring heuristic assigns weight to your selection. This records a declared choice; it does not verify human agency or establish authorship.
          </p>
        </div>
      </div>

      {selectedVersion && (
        <div className="glass rounded-sm p-4"
          style={{ border: "1px solid rgba(183,201,165,0.2)" }}>
          <p className="text-xs font-mono text-hap-accent mb-1">First retained version from your history</p>
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
              aria-pressed={value.decision === d.value}
              className="w-full flex items-center gap-4 p-4 rounded-sm text-left transition-all duration-200"
              style={{
                background: value.decision === d.value ? `${d.color}10` : "rgba(255,255,255,0.02)",
                border: `1px solid ${value.decision === d.value ? d.color : "rgba(255,255,255,0.06)"}`,
              }}
            >
              <div
                className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                style={{ borderColor: value.decision === d.value ? d.color : "#aab4ac" }}
              >
                {value.decision === d.value && (
                  <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                )}
              </div>
              <div>
                <p className="text-sm font-bold font-mono" style={{ color: value.decision === d.value ? d.color : "#94a3b8" }}>
                  {d.label}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{d.desc}</p>
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
          aria-label="Output CID (optional)"
          type="text"
          placeholder="bafybeig... (IPFS CID of the final work, if you have it)"
          value={value.selected_cid ?? ""}
          onChange={(e) => onChange({ ...value, selected_cid: e.target.value })}
          className="w-full bg-transparent border rounded-sm px-4 py-2.5 text-sm font-mono text-white focus:outline-none"
          style={{ borderColor: "rgba(183,201,165,0.2)" }}
        />
      </div>
    </div>
  );
}
