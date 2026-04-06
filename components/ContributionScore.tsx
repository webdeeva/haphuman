"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const SEGMENTS = [
  { label: "Recipe", pct: 30, color: "#06B6D4", desc: "Creative system design" },
  { label: "Inputs", pct: 25, color: "#10B981", desc: "Creative direction" },
  { label: "Voice", pct: 20, color: "#8B5CF6", desc: "Identity contribution" },
  { label: "Iteration", pct: 15, color: "#F59E0B", desc: "Process refinement" },
  { label: "Curation", pct: 10, color: "#EC4899", desc: "Final selection" },
];

function ScoreRing({ animated }: { animated: boolean }) {
  const size = 220;
  const stroke = 16;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  let offset = 0;
  const gaps = 4;
  const totalGap = gaps * 2;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth={stroke}
        />
        {/* Segments */}
        {SEGMENTS.map((seg, i) => {
          const segDash = ((seg.pct / 100) * (circumference - totalGap));
          const dashArray = `${animated ? segDash : 0} ${circumference}`;
          const dashOffset = -(offset);
          offset += segDash + 2;

          return (
            <motion.circle
              key={seg.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={stroke}
              strokeDasharray={`${segDash} ${circumference}`}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              initial={{ strokeDasharray: `0 ${circumference}` }}
              animate={
                animated
                  ? { strokeDasharray: `${segDash} ${circumference}` }
                  : {}
              }
              transition={{ duration: 1, delay: i * 0.2, ease: "easeOut" }}
              style={{ filter: `drop-shadow(0 0 4px ${seg.color}60)` }}
            />
          );
        })}
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={animated ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-4xl font-bold font-mono gradient-text"
        >
          90%
        </motion.div>
        <div className="text-xs font-mono text-slate-500 tracking-wide mt-1">
          Human Score
        </div>
      </div>
    </div>
  );
}

export default function ContributionScore() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeSegment, setActiveSegment] = useState<number | null>(null);

  return (
    <section ref={ref} id="score" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5"
          style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="h-px w-8 bg-cyan-500/60" />
            <span className="text-xs font-mono text-cyan-400/80 tracking-widest uppercase">
              Contribution Score
            </span>
            <div className="h-px w-8 bg-cyan-500/60" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            The <span className="gradient-text">Human Contribution</span>
            <br />
            Score (HCS)
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-xl mx-auto"
          >
            The sum of all human-driven creative components across five layers. AI&apos;s role is the remainder — not a listed component. HCS = 1.0 means full human authorship. Creates legally-relevant, verifiable evidence of creative contribution.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Ring chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center gap-8"
          >
            <ScoreRing animated={inView} />

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              {SEGMENTS.map((seg, i) => (
                <button
                  key={seg.label}
                  onMouseEnter={() => setActiveSegment(i)}
                  onMouseLeave={() => setActiveSegment(null)}
                  className="flex items-center gap-2 transition-opacity duration-200"
                  style={{ opacity: activeSegment === null || activeSegment === i ? 1 : 0.4 }}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: seg.color }}
                  />
                  <span className="text-xs font-mono text-slate-400">
                    {seg.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Breakdown bars */}
          <div className="flex flex-col gap-5">
            {SEGMENTS.map((seg, i) => (
              <motion.div
                key={seg.label}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                onMouseEnter={() => setActiveSegment(i)}
                onMouseLeave={() => setActiveSegment(null)}
                className="group cursor-default"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span
                      className="text-sm font-bold font-mono"
                      style={{ color: seg.color }}
                    >
                      {seg.label}
                    </span>
                    <span className="text-xs text-slate-600 ml-2 font-mono">
                      — {seg.desc}
                    </span>
                  </div>
                  <span
                    className="text-sm font-bold font-mono"
                    style={{ color: seg.color }}
                  >
                    {seg.pct}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-800/60 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${seg.pct}%` } : {}}
                    transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{
                      background: seg.color,
                      boxShadow: `0 0 10px ${seg.color}60`,
                    }}
                  />
                </div>
              </motion.div>
            ))}

            {/* Total + tier */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2 }}
              className="mt-2 glass rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-mono text-slate-400">HCS (Music Profile)</span>
                <span className="text-lg font-bold font-mono gradient-text">1.00</span>
              </div>
              <div className="h-1 rounded-full bg-slate-800 mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: "100%" } : {}}
                  transition={{ duration: 1.2, delay: 1.3, ease: "easeOut" }}
                  className="h-full rounded-full animated-border"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-600">Tier</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.12)", color: "#10B981", border: "1px solid rgba(16,185,129,0.25)" }}>
                  Primary Human Authorship · 0.80–1.00
                </span>
              </div>
            </motion.div>

            {/* Tier reference */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.4 }}
              className="mt-3 space-y-1"
            >
              {[
                { range: "0.80–1.00", tier: "Primary Human Authorship", color: "#10B981" },
                { range: "0.50–0.79", tier: "Collaborative Authorship", color: "#06B6D4" },
                { range: "0.20–0.49", tier: "AI-Assisted Creation", color: "#F59E0B" },
                { range: "0.00–0.19", tier: "AI-Generated", color: "#475569" },
              ].map((t) => (
                <div key={t.tier} className="flex items-center justify-between px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.02)" }}>
                  <span className="text-[10px] font-mono" style={{ color: t.color }}>{t.range}</span>
                  <span className="text-[10px] font-mono text-slate-500">{t.tier}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
