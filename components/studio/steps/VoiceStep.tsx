"use client";

import { v4 as uuidv4 } from "uuid";
import type { StudioVoiceState, VoicePermissions } from "@/lib/hap/types";

const LICENSED = ["music_generation", "remix", "sync_licensing", "live_performance", "sample_pack"];
const PROHIBITED = ["advertising", "political_content", "adult_content", "impersonation", "news_media"];

interface Props {
  value: StudioVoiceState;
  onChange: (v: StudioVoiceState) => void;
}

function ToggleChip({ label, active, onToggle, color }: {
  label: string; active: boolean; onToggle: () => void; color: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      className="px-3 py-1.5 rounded-sm text-xs font-mono transition-all duration-200"
      style={{
        background: active ? `${color}18` : "rgba(255,255,255,0.03)",
        border: `1px solid ${active ? color : "rgba(255,255,255,0.08)"}`,
        color: active ? color : "#aab4ac",
      }}
    >
      {label}
    </button>
  );
}

export default function VoiceStep({ value, onChange }: Props) {
  const set = (k: keyof StudioVoiceState, v: unknown) => onChange({ ...value, [k]: v });
  const setPerm = (k: keyof VoicePermissions, v: unknown) =>
    onChange({ ...value, voice_permissions: { ...value.voice_permissions, [k]: v } });

  const toggleUse = (list: "licensed_uses" | "prohibited_uses", item: string) => {
    const cur: string[] = (value.voice_permissions[list] ?? []) as string[];
    setPerm(list, cur.includes(item) ? cur.filter((x) => x !== item) : [...cur, item]);
  };

  return (
    <div className="space-y-7">
      <div>
        <label className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">
          Voice ID <span className="text-hap-accent">*</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            aria-label="Voice ID"
            placeholder="hap_voice_creator_001"
            value={value.voice_id ?? ""}
            onChange={(e) => set("voice_id", e.target.value)}
            className="flex-1 bg-transparent border rounded-sm px-4 py-2.5 text-sm font-mono text-white focus:outline-none"
            style={{ borderColor: "rgba(183,201,165,0.3)" }}
          />
          <button
            type="button"
            onClick={() => set("voice_id", `hap_voice_${uuidv4().split("-")[0]}`)}
            className="px-4 py-2.5 rounded-sm text-xs font-mono transition-all"
            style={{ background: "rgba(183,201,165,0.1)", border: "1px solid rgba(183,201,165,0.25)", color: "#b7c9a5" }}
          >
            Generate
          </button>
        </div>
        <p className="text-[11px] text-slate-400 font-mono mt-1.5">
          An identifier for the vocal model you used. Generating an ID does not create a model or verify permission to use it.
        </p>
      </div>

      <div>
        <label className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">
          Licensed Uses
        </label>
        <div className="flex flex-wrap gap-2">
          {LICENSED.map((l) => (
            <ToggleChip
              key={l}
              label={l}
              active={(value.voice_permissions.licensed_uses ?? []).includes(l)}
              onToggle={() => toggleUse("licensed_uses", l)}
              color="#b7c9a5"
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">
          Prohibited Uses
        </label>
        <div className="flex flex-wrap gap-2">
          {PROHIBITED.map((p) => (
            <ToggleChip
              key={p}
              label={p}
              active={(value.voice_permissions.prohibited_uses ?? []).includes(p)}
              onToggle={() => toggleUse("prohibited_uses", p)}
              color="#d8a293"
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">
            License expiry (optional)
          </label>
          <input
            aria-label="License expiry"
            type="date"
            value={value.voice_permissions.expiry?.slice(0, 10) ?? ""}
            onChange={(e) =>
              setPerm("expiry", e.target.value ? new Date(e.target.value).toISOString() : "")
            }
            className="w-full bg-transparent border rounded-sm px-4 py-2.5 text-sm font-mono text-white focus:outline-none"
            style={{ borderColor: "rgba(183,201,165,0.3)", colorScheme: "dark" }}
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">
            Revocable
          </label>
          <div className="flex gap-3 pt-1">
            {[true, false].map((v) => (
              <button
                key={String(v)}
                type="button"
                onClick={() => setPerm("revocable", v)}
                aria-pressed={value.voice_permissions.revocable === v}
                className="flex-1 py-2.5 rounded-sm text-xs font-mono font-bold transition-all"
                style={{
                  background: value.voice_permissions.revocable === v ? "rgba(183,201,165,0.15)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${value.voice_permissions.revocable === v ? "#b7c9a5" : "rgba(255,255,255,0.08)"}`,
                  color: value.voice_permissions.revocable === v ? "#b7c9a5" : "#aab4ac",
                }}
              >
                {v ? "Yes" : "No"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
