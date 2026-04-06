"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Music, Palette, FileText, Mic, Users } from "lucide-react";

const cases = [
  {
    icon: <Music className="w-6 h-6" />,
    title: "AI Music Platforms",
    desc: "Track recipe authorship, voice contributions, and iteration decisions for every AI-assisted track.",
    color: "#06B6D4",
    stat: "Recipe + Voice",
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Digital Art Marketplaces",
    desc: "Attach verifiable authorship records to generative art, enabling provable provenance.",
    color: "#8B5CF6",
    stat: "Proof of Origin",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Content Creation Tools",
    desc: "Embed HAP scoring into writing and media tools to capture structured human contribution.",
    color: "#10B981",
    stat: "HCS Integration",
  },
  {
    icon: <Mic className="w-6 h-6" />,
    title: "Voice Licensing Systems",
    desc: "License human voice models with on-chain identity, clear terms, and contribution attribution.",
    color: "#F59E0B",
    stat: "Voice Asset Layer",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Creator Economies",
    desc: "Build platforms where creative systems  -  not just outputs  -  are the primary tradeable asset.",
    color: "#EF4444",
    stat: "System Ownership",
  },
];

export default function UseCases() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="vision" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="h-px w-8 bg-amber-500/60" />
            <span className="text-xs font-mono text-amber-400/80 tracking-widest uppercase">
              Use Cases
            </span>
            <div className="h-px w-8 bg-amber-500/60" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            A standard for every
            <br />
            <span className="gradient-text-warm">creative platform</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="glass rounded-2xl p-6 group hover:scale-[1.02] transition-all duration-300"
              style={{ borderColor: `${c.color}18` }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${c.color}12`, color: c.color }}
              >
                {c.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{c.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">{c.desc}</p>
              <div
                className="inline-flex text-xs font-mono px-2.5 py-1 rounded-full"
                style={{
                  background: `${c.color}10`,
                  border: `1px solid ${c.color}25`,
                  color: c.color,
                }}
              >
                {c.stat}
              </div>
            </motion.div>
          ))}

          {/* Vision card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            className="md:col-span-2 lg:col-span-1 rounded-2xl p-6 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(6,182,212,0.1), rgba(139,92,246,0.1))",
              border: "1px solid rgba(6,182,212,0.2)",
            }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10"
              style={{ background: "radial-gradient(circle, #06B6D4, transparent)" }} />
            <div className="relative z-10">
              <div className="text-2xl mb-3">✦</div>
              <h3 className="text-lg font-bold text-white mb-3">The Vision</h3>
              <div className="space-y-2">
                {[
                  "Creativity is trackable",
                  "Ownership is provable",
                  "Systems are more valuable than outputs",
                ].map((v) => (
                  <div key={v} className="flex items-center gap-2 text-sm">
                    <div className="w-1 h-1 rounded-full bg-cyan-400" />
                    <span className="text-slate-300">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
