"use client";

import type { HAPRecipe } from "@/lib/hap/types";

const STYLES = ["Lo-fi Hip Hop", "Trap", "Ambient", "R&B", "Electronic", "Jazz", "Pop", "Drill", "Soul", "Afrobeats"];
const STRUCTURES = ["Verse - Chorus - Bridge", "Verse - Chorus", "Intro - Verse - Outro", "Loop-based", "Through-composed"];
const TONES = ["Melancholic", "Energetic", "Dark", "Euphoric", "Nostalgic", "Aggressive", "Dreamy", "Tense"];
const KEYS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const CONSTRAINTS = ["vinyl_crackle", "minor_key", "heavy_bass", "no_drums", "reverb_heavy", "distortion", "808s", "vocal_chops"];

interface Props {
  value: Partial<HAPRecipe>;
  onChange: (v: Partial<HAPRecipe>) => void;
}

function ChipSelect({ options, selected, onToggle, color }: {
  options: string[]; selected: string; onToggle: (v: string) => void; color: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onToggle(o)}
          className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200"
          style={{
            background: selected === o ? `${color}18` : "rgba(255,255,255,0.03)",
            border: `1px solid ${selected === o ? color : "rgba(255,255,255,0.08)"}`,
            color: selected === o ? color : "#64748b",
          }}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function MultiChipSelect({ options, selected, onToggle, color }: {
  options: string[]; selected: string[]; onToggle: (v: string) => void; color: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onToggle(o)}
          className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200"
          style={{
            background: selected.includes(o) ? `${color}18` : "rgba(255,255,255,0.03)",
            border: `1px solid ${selected.includes(o) ? color : "rgba(255,255,255,0.08)"}`,
            color: selected.includes(o) ? color : "#64748b",
          }}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export default function RecipeStep({ value, onChange }: Props) {
  const set = (k: keyof HAPRecipe, v: unknown) => onChange({ ...value, [k]: v });

  const toggleConstraint = (c: string) => {
    const cur = value.constraints ?? [];
    set("constraints", cur.includes(c) ? cur.filter((x) => x !== c) : [...cur, c]);
  };

  return (
    <div className="space-y-7">
      <Field label="Style" required>
        <ChipSelect options={STYLES} selected={value.style ?? ""} onToggle={(v) => set("style", v)} color="#06B6D4" />
      </Field>

      <Field label="Structure">
        <ChipSelect options={STRUCTURES} selected={value.structure ?? ""} onToggle={(v) => set("structure", v)} color="#06B6D4" />
      </Field>

      <Field label="Tone">
        <ChipSelect options={TONES} selected={value.tone ?? ""} onToggle={(v) => set("tone", v)} color="#06B6D4" />
      </Field>

      <div className="grid grid-cols-2 gap-5">
        <Field label="BPM Range">
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="70"
              value={value.bpm_min ?? ""}
              onChange={(e) => set("bpm_min", e.target.value ? Number(e.target.value) : undefined)}
              className="w-full bg-transparent border rounded-xl px-3 py-2 text-sm font-mono text-white focus:outline-none"
              style={{ borderColor: "rgba(6,182,212,0.2)" }}
            />
            <span className="text-slate-600 font-mono text-xs">to</span>
            <input
              type="number"
              placeholder="90"
              value={value.bpm_max ?? ""}
              onChange={(e) => set("bpm_max", e.target.value ? Number(e.target.value) : undefined)}
              className="w-full bg-transparent border rounded-xl px-3 py-2 text-sm font-mono text-white focus:outline-none"
              style={{ borderColor: "rgba(6,182,212,0.2)" }}
            />
          </div>
        </Field>

        <Field label="Key + Mode">
          <div className="flex gap-2">
            <select
              value={value.key ?? ""}
              onChange={(e) => set("key", e.target.value)}
              className="flex-1 bg-transparent border rounded-xl px-3 py-2 text-sm font-mono text-white focus:outline-none"
              style={{ borderColor: "rgba(6,182,212,0.2)", background: "rgba(4,8,18,0.8)" }}
            >
              <option value="">Key</option>
              {KEYS.map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
            <select
              value={value.mode ?? ""}
              onChange={(e) => set("mode", e.target.value as "major" | "minor")}
              className="flex-1 bg-transparent border rounded-xl px-3 py-2 text-sm font-mono text-white focus:outline-none"
              style={{ borderColor: "rgba(6,182,212,0.2)", background: "rgba(4,8,18,0.8)" }}
            >
              <option value="">Mode</option>
              <option value="major">Major</option>
              <option value="minor">Minor</option>
            </select>
          </div>
        </Field>
      </div>

      <Field label="Constraints">
        <MultiChipSelect
          options={CONSTRAINTS}
          selected={value.constraints ?? []}
          onToggle={toggleConstraint}
          color="#06B6D4"
        />
      </Field>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">
        {label}{required && <span className="text-cyan-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
