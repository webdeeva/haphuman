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
        Log each version you generated. Rejection decisions are as meaningful as selections — they document your creative judgment.
      </p>

      {value.length === 0 && (
        <div className="glass rounded-xl p-6 text-center"
          style={{ border: "1px solid rgba(245,158,11,0.12)" }}>
          <p className="text-sm text-slate-500 font-mono">No iterations logged yet.</p>
        </div>
      )}

      {value.map((it, i) => (
        <div
          key={i}
          className="glass rounded-xl p-5"
          style={{ border: `1px solid ${it.selected ? "rgba(245,158,11,0.25)" : "rgba(255,255,255,0.06)"}` }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={it.version}
                onChange={(e) => update(i, { version: e.target.value })}
                className="w-16 bg-transparent border rounded-lg px-2 py-1 text-xs font-mono text-white focus:outline-none text-center"
                style={{ borderColor: "rgba(245,158,11,0.3)" }}
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => update(i, { selected: true })}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all"
                  style={{
                    background: it.selected ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${it.selected ? "#10B981" : "rgba(255,255,255,0.08)"}`,
                    color: it.selected ? "#10B981" : "#475569",
                  }}
                >
                  <Check size={11} /> Selected
                </button>
                <button
                  type="button"
                  onClick={() => update(i, { selected: false })}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all"
                  style={{
                    background: !it.selected ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${!it.selected ? "#EF4444" : "rgba(255,255,255,0.08)"}`,
                    color: !it.selected ? "#EF4444" : "#475569",
                  }}
                >
                  <X size={11} /> Rejected
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => remove(i)}
              className="text-slate-700 hover:text-red-400 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>

          <textarea
            rows={2}
            placeholder={it.selected ? "Why did you keep this one?" : "Why did you reject this version?"}
            value={it.notes}
            onChange={(e) => update(i, { notes: e.target.value })}
            className="w-full bg-transparent border rounded-xl px-3 py-2 text-sm font-mono text-white focus:outline-none resize-none"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-mono font-medium transition-all"
        style={{
          border: "1px dashed rgba(245,158,11,0.3)",
          color: "#F59E0B",
          background: "rgba(245,158,11,0.04)",
        }}
      >
        <Plus size={14} />
        Add version
      </button>
    </div>
  );
}
