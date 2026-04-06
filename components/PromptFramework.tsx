"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LAYERS = [
  {
    id: "recipe",
    label: "RECIPE",
    color: "#06B6D4",
    bg: "rgba(6,182,212,0.08)",
    border: "rgba(6,182,212,0.3)",
    icon: "⬡",
    lines: [
      '{ "style": "lo-fi-hip-hop",',
      '  "bpm": { "min": 70, "max": 85 },',
      '  "constraints": ["minor_key",',
      '    "vinyl_crackle"] }',
    ],
  },
  {
    id: "voice",
    label: "VOICE",
    color: "#8B5CF6",
    bg: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.3)",
    icon: "◈",
    lines: [
      "voice_id: hap_voice_creator_001",
      "identity: verified ✓",
      "licensed: music_gen, remix",
      "revocable: true",
    ],
  },
  {
    id: "input",
    label: "INPUT",
    color: "#10B981",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.3)",
    icon: "◎",
    lines: [
      '"Climax at 1:45; chorus vocal',
      ' distant, like a memory"',
      "lyric_cid: bafybeig...001",
      "intent: emotional_climax",
    ],
  },
  {
    id: "iteration",
    label: "ITERATION",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.3)",
    icon: "⟳",
    lines: [
      "v1 → rejected: tempo too fast",
      "v2 → rejected: needs reverb",
      "v3 → candidate",
      "decision_log: 3 rejections",
    ],
  },
  {
    id: "curation",
    label: "CURATION",
    color: "#EC4899",
    bg: "rgba(236,72,153,0.08)",
    border: "rgba(236,72,153,0.3)",
    icon: "✦",
    lines: [
      'selected: "v3"',
      '"The space in the chorus is right."',
      "hcs_contribution: 0.10",
      "tier: primary_human_authorship",
    ],
  },
];

const SCORE_SEGMENTS = [
  { label: "Recipe", pct: 30, color: "#06B6D4" },
  { label: "Inputs", pct: 25, color: "#10B981" },
  { label: "Voice", pct: 20, color: "#8B5CF6" },
  { label: "Iteration", pct: 15, color: "#F59E0B" },
  { label: "Curation", pct: 10, color: "#EC4899" },
];

export default function PromptFramework() {
  const [activeLayer, setActiveLayer] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // Auto-advance layers
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLayer((prev) => {
        const next = (prev + 1) % LAYERS.length;
        if (next === 0) setShowScore(true);
        return next;
      });
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Reset typing when layer changes
  useEffect(() => {
    setTypedLines([]);
    setLineIndex(0);
    setCharIndex(0);
    setShowScore(false);
  }, [activeLayer]);

  // Typing effect
  useEffect(() => {
    const layer = LAYERS[activeLayer];
    if (lineIndex >= layer.lines.length) return;

    const currentLine = layer.lines[lineIndex];
    if (charIndex < currentLine.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 22);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setTypedLines((prev) => [...prev, currentLine]);
        setLineIndex((l) => l + 1);
        setCharIndex(0);
      }, 120);
      return () => clearTimeout(t);
    }
  }, [activeLayer, lineIndex, charIndex]);

  const currentLayer = LAYERS[activeLayer];

  return (
    <div className="w-full max-w-lg mx-auto select-none">
      {/* Terminal window */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "rgba(6,12,24,0.95)",
          border: `1px solid ${currentLayer.border}`,
          boxShadow: `0 0 40px ${currentLayer.color}22, 0 20px 80px rgba(0,0,0,0.6)`,
          transition: "border-color 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        {/* Title bar */}
        <div
          className="px-4 py-3 flex items-center gap-3"
          style={{ borderBottom: `1px solid ${currentLayer.border}40` }}
        >
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <span className="text-xs font-mono text-slate-500">
              hap://authorship-protocol/v2
            </span>
          </div>
          <div
            className="text-xs font-mono px-2 py-0.5 rounded"
            style={{ color: currentLayer.color, background: `${currentLayer.color}15` }}
          >
            LIVE
          </div>
        </div>

        {/* Layer tabs */}
        <div
          className="flex border-b"
          style={{ borderColor: `${currentLayer.border}30` }}
        >
          {LAYERS.map((layer, i) => (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(i)}
              className="flex-1 py-2 text-[10px] font-mono font-bold tracking-widest transition-all duration-300"
              style={{
                color: i === activeLayer ? layer.color : "#475569",
                background:
                  i === activeLayer ? `${layer.color}10` : "transparent",
                borderBottom:
                  i === activeLayer ? `2px solid ${layer.color}` : "2px solid transparent",
              }}
            >
              {layer.icon} {layer.label}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div className="p-5 font-mono text-xs min-h-[160px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayer}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {/* Typed lines */}
              {typedLines.map((line, i) => (
                <div key={i} className="mb-1 flex gap-2">
                  <span style={{ color: currentLayer.color }} className="opacity-50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-slate-300">{line}</span>
                </div>
              ))}
              {/* Currently typing line */}
              {lineIndex < currentLayer.lines.length && (
                <div className="mb-1 flex gap-2">
                  <span style={{ color: currentLayer.color }} className="opacity-50">
                    {String(lineIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="text-slate-300">
                    {currentLayer.lines[lineIndex].slice(0, charIndex)}
                    <span className="cursor inline-block w-2 h-3.5 bg-slate-300 align-middle ml-0.5" />
                  </span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Score panel */}
        <AnimatePresence>
          {showScore && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t"
              style={{ borderColor: "rgba(6,182,212,0.15)" }}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">
                    Human Contribution Score
                  </span>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-sm font-bold font-mono" style={{ color: "#06B6D4" }}>HCS 0.90</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ background: "rgba(16,185,129,0.15)", color: "#10B981" }}>Primary Authorship</span>
                  </motion.div>
                </div>
                <div className="flex h-2 rounded-full overflow-hidden gap-px">
                  {SCORE_SEGMENTS.map((seg, i) => (
                    <motion.div
                      key={seg.label}
                      initial={{ flex: 0 }}
                      animate={{ flex: seg.pct }}
                      transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                      className="h-full rounded-sm"
                      style={{ background: seg.color }}
                      title={`${seg.label}: ${seg.pct}%`}
                    />
                  ))}
                </div>
                <div className="flex gap-3 mt-2 flex-wrap">
                  {SCORE_SEGMENTS.map((seg) => (
                    <div key={seg.label} className="flex items-center gap-1">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: seg.color }}
                      />
                      <span className="text-[9px] font-mono text-slate-500">
                        {seg.label} {seg.pct}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom status bar */}
        <div
          className="px-4 py-2 flex items-center justify-between"
          style={{ borderTop: `1px solid ${currentLayer.border}20` }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full pulse-ring"
              style={{ background: currentLayer.color }}
            />
            <span className="text-[10px] font-mono" style={{ color: currentLayer.color }}>
              AUTHORSHIP ACTIVE
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-600">
            HAP v2.1 · {new Date().toISOString().slice(0, 10)}
          </span>
        </div>
      </div>

      {/* Layer progress dots */}
      <div className="flex justify-center gap-2 mt-4">
        {LAYERS.map((layer, i) => (
          <button
            key={layer.id}
            onClick={() => setActiveLayer(i)}
            className="transition-all duration-300"
            style={{
              width: i === activeLayer ? 24 : 6,
              height: 6,
              borderRadius: 3,
              background: i === activeLayer ? layer.color : "#1e3a5f",
            }}
          />
        ))}
      </div>
    </div>
  );
}
