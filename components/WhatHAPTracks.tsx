"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, Mic, PenLine, RotateCcw } from "lucide-react";

const tracks = [
  {
    id: "recipes",
    icon: <BookOpen className="w-5 h-5" />,
    title: "Recipes",
    subtitle: "Creative Systems",
    color: "#06B6D4",
    desc: "Structured frameworks that guide AI output. Style, structure, tone, and arrangement — all defined by the human author.",
    tags: ["Style Tokens", "Output Constraints", "Structural Logic", "Tone Profiles"],
    code: `recipe.create({
  style: "cinematic-dark",
  structure: "verse-chorus-bridge",
  tone: "introspective-urgency",
  arrangement: "orchestral-sparse"
});`,
  },
  {
    id: "voice",
    icon: <Mic className="w-5 h-5" />,
    title: "Voice",
    subtitle: "Identity Layer",
    color: "#8B5CF6",
    desc: "Human vocal input, identity contribution, and licensing permissions. Voice is treated as a distinct, monetizable asset class.",
    tags: ["Voice Models", "Identity Proof", "License Terms", "Signature Hash"],
    code: `voice.register({
  identity: "creator_001",
  model: "hap_voice_v3",
  license: "commercial",
  signature: "0x7f3a...b291"
});`,
  },
  {
    id: "inputs",
    icon: <PenLine className="w-5 h-5" />,
    title: "Inputs",
    subtitle: "Creative Direction",
    color: "#10B981",
    desc: "Lyrics, edits, and compositional intent. Every piece of creative direction is logged as a contribution to the final work.",
    tags: ["Lyric Input", "Structural Edits", "Intent Vectors", "Composition Cues"],
    code: `input.submit({
  lyrics: "Through the noise I remain",
  edit: { line: 3, action: "extend" },
  intent: "emotional_climax",
  direction: "+complexity"
});`,
  },
  {
    id: "iteration",
    icon: <RotateCcw className="w-5 h-5" />,
    title: "Iteration",
    subtitle: "Process Layer",
    color: "#F59E0B",
    desc: "Version history, decision points, and output selection. The refinement process itself is a record of creative authorship.",
    tags: ["Version History", "Decision Log", "Selection Events", "Process Depth"],
    code: `iteration.log({
  versions: ["v1", "v2", "v3"],
  selected: "v2",
  decisions: 4,
  refinement_depth: "high"
});`,
  },
];

export default function WhatHAPTracks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTrack, setActiveTrack] = useState(0);

  const active = tracks[activeTrack];

  return (
    <section ref={ref} id="framework" className="relative py-32 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="h-px w-8 bg-emerald-500/60" />
            <span className="text-xs font-mono text-emerald-400/80 tracking-widest uppercase">
              What HAP Tracks
            </span>
            <div className="h-px w-8 bg-emerald-500/60" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Four layers of{" "}
            <span className="gradient-text-green">human contribution</span>
          </motion.h2>
        </div>

        {/* Track selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tracks.map((track, i) => (
            <motion.button
              key={track.id}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.08 }}
              onClick={() => setActiveTrack(i)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-mono font-medium transition-all duration-300"
              style={{
                background: i === activeTrack ? `${track.color}18` : "rgba(10,22,40,0.4)",
                border: `1px solid ${i === activeTrack ? track.color : "rgba(255,255,255,0.06)"}`,
                color: i === activeTrack ? track.color : "#475569",
                boxShadow:
                  i === activeTrack ? `0 0 20px ${track.color}20` : "none",
              }}
            >
              <span style={{ color: i === activeTrack ? track.color : "#64748b" }}>
                {track.icon}
              </span>
              {track.title}
            </motion.button>
          ))}
        </div>

        {/* Active track detail */}
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Info card */}
          <div
            className="glass rounded-2xl p-8"
            style={{ borderColor: `${active.color}20` }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
              style={{ background: `${active.color}15`, color: active.color }}
            >
              {active.icon}
            </div>
            <div className="mb-1 text-xs font-mono tracking-widest uppercase" style={{ color: active.color }}>
              {active.subtitle}
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{active.title}</h3>
            <p className="text-slate-400 leading-relaxed mb-6">{active.desc}</p>

            <div className="flex flex-wrap gap-2">
              {active.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-3 py-1 rounded-full"
                  style={{
                    background: `${active.color}10`,
                    border: `1px solid ${active.color}25`,
                    color: active.color,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Code card */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(4,8,18,0.9)",
              border: `1px solid ${active.color}20`,
            }}
          >
            <div
              className="px-4 py-3 flex items-center gap-2 border-b"
              style={{ borderColor: `${active.color}15` }}
            >
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="text-xs font-mono text-slate-600 ml-2">
                hap.{active.id}.ts
              </span>
            </div>
            <pre
              className="p-6 text-sm font-mono leading-relaxed overflow-auto"
              style={{ color: "#e2e8f0" }}
            >
              <code>
                {active.code.split("\n").map((line, i) => {
                  const colored = line
                    .replace(
                      /(".*?")/g,
                      `<span style="color: #10B981;">$1</span>`
                    )
                    .replace(
                      /(\w+)(?=:)/g,
                      `<span style="color: ${active.color};">$1</span>`
                    )
                    .replace(
                      /(recipe|voice|input|iteration)(?=\.)/,
                      `<span style="color: #8B5CF6; font-weight: bold;">$1</span>`
                    );
                  return (
                    <div key={i} className="flex gap-3">
                      <span className="text-slate-700 w-4 text-right shrink-0">
                        {i + 1}
                      </span>
                      <span
                        dangerouslySetInnerHTML={{ __html: colored }}
                      />
                    </div>
                  );
                })}
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
