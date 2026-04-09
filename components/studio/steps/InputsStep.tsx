"use client";

import type { HAPInputs } from "@/lib/hap/types";

const INTENTS = ["emotional_climax", "tension_build", "resolution", "energy_drop", "hook_moment", "breakdown", "intro_vibe", "outro_fade"];

interface Props {
  value: HAPInputs;
  onChange: (v: HAPInputs) => void;
}

export default function InputsStep({ value, onChange }: Props) {
  const set = (k: keyof HAPInputs, v: unknown) => onChange({ ...value, [k]: v });

  return (
    <div className="space-y-7">
      <div>
        <label className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">
          Lyrics / Text Input
        </label>
        <textarea
          rows={6}
          placeholder={"Through the noise I remain\nBeneath the weight of what I've claimed..."}
          value={value.lyrics ?? ""}
          onChange={(e) => set("lyrics", e.target.value)}
          className="w-full bg-transparent border rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none resize-none leading-relaxed"
          style={{ borderColor: "rgba(16,185,129,0.25)" }}
        />
        <p className="text-[11px] text-slate-600 font-mono mt-1.5">
          Paste your lyrics or any text you submitted as input to the AI.
        </p>
      </div>

      <div>
        <label className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">
          Composition Note
        </label>
        <textarea
          rows={3}
          placeholder="Climax at 1:45; chorus vocal distant, like a memory. Keep the hi-hats sparse."
          value={value.note ?? ""}
          onChange={(e) => set("note", e.target.value)}
          className="w-full bg-transparent border rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none resize-none leading-relaxed"
          style={{ borderColor: "rgba(16,185,129,0.25)" }}
        />
        <p className="text-[11px] text-slate-600 font-mono mt-1.5">
          Any direction you gave the AI about structure, feel, or specific moments.
        </p>
      </div>

      <div>
        <label className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">
          Creative Intent
        </label>
        <div className="flex flex-wrap gap-2">
          {INTENTS.map((intent) => (
            <button
              key={intent}
              type="button"
              onClick={() => set("intent", value.intent === intent ? "" : intent)}
              className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200"
              style={{
                background: value.intent === intent ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${value.intent === intent ? "#10B981" : "rgba(255,255,255,0.08)"}`,
                color: value.intent === intent ? "#10B981" : "#64748b",
              }}
            >
              {intent}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
