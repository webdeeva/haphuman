"use client";

import { Plus, Trash2, Check, X } from "lucide-react";
import type { HAPIteration } from "@/lib/hap/types";

interface Props {
  value: HAPIteration[];
  onChange: (v: HAPIteration[]) => void;
}

export default function IterationStep({ value, onChange }: Props) {
  const add = () => {
    const next = `v${value.length + 1}`;
    onChange([...value, { version: next, selected: false, notes: "" }]);
  };

  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));

  const update = (i: number, patch: Partial<HAPIteration>) =>
    onChange(value.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-400 leading-relaxed">
        Log each version you created or reviewed. Rejection decisions are as meaningful as selections — they document your creative judgment.
      </p>

      {value.length === 0 && (
        <div className="glass rounded-sm p-6 text-center"
          style={{ border: "1px solid rgba(183,201,165,0.12)" }}>
          <p className="text-sm text-slate-400 font-mono">No iterations logged yet.</p>
        </div>
      )}

      {value.map((it, i) => (
        <div
          key={i}
          className="glass rounded-sm p-5"
          style={{ border: `1px solid ${it.selected ? "rgba(183,201,165,0.25)" : "rgba(255,255,255,0.06)"}` }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <input
                aria-label={`Version ${i + 1} name`}
                type="text"
                value={it.version}
                onChange={(e) => update(i, { version: e.target.value })}
                className="w-16 bg-transparent border rounded-sm px-2 py-1 text-xs font-mono text-white focus:outline-none text-center"
                style={{ borderColor: "rgba(183,201,165,0.3)" }}
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => update(i, { selected: true })}
                  aria-pressed={it.selected}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-mono transition-all"
                  style={{
                    background: it.selected ? "rgba(183,201,165,0.15)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${it.selected ? "#b7c9a5" : "rgba(255,255,255,0.08)"}`,
                    color: it.selected ? "#b7c9a5" : "#aab4ac",
                  }}
                >
                  <Check size={11} /> Selected
                </button>
                <button
                  type="button"
                  onClick={() => update(i, { selected: false })}
                  aria-pressed={!it.selected}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-mono transition-all"
                  style={{
                    background: !it.selected ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${!it.selected ? "#d8a293" : "rgba(255,255,255,0.08)"}`,
                    color: !it.selected ? "#d8a293" : "#aab4ac",
                  }}
                >
                  <X size={11} /> Rejected
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => remove(i)}
              aria-label={`Remove ${it.version}`}
              className="text-slate-400 hover:text-red-400 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>

          <textarea
            aria-label={`Notes for ${it.version}`}
            rows={2}
            placeholder={it.selected ? "Why did you keep this one?" : "Why did you reject this version?"}
            value={it.notes}
            onChange={(e) => update(i, { notes: e.target.value })}
            className="w-full bg-transparent border rounded-sm px-3 py-2 text-sm font-mono text-white focus:outline-none resize-none"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-sm text-sm font-mono font-medium transition-all"
        style={{
          border: "1px dashed rgba(183,201,165,0.3)",
          color: "#b7c9a5",
          background: "rgba(183,201,165,0.04)",
        }}
      >
        <Plus size={14} />
        Add version
      </button>
    </div>
  );
}
