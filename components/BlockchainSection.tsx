"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link2, Database, Globe, Lock } from "lucide-react";

const onChain = [
  "Authorship data hash",
  "Ownership reference",
  "Timestamp",
  "Creator wallet",
];
const offChain = [
  "Audio / media files",
  "Full prompt structures",
  "Voice model data",
  "Large creative datasets",
];

const features = [
  {
    icon: <Lock className="w-5 h-5" />,
    title: "Integrity",
    desc: "Hashed records cannot be altered without detection.",
    color: "#06B6D4",
  },
  {
    icon: <Database className="w-5 h-5" />,
    title: "Scalability",
    desc: "Heavy assets stored off-chain for efficiency.",
    color: "#8B5CF6",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "Cost Efficiency",
    desc: "Only essential proofs touch the chain.",
    color: "#10B981",
  },
  {
    icon: <Link2 className="w-5 h-5" />,
    title: "Interoperability",
    desc: "Ownership tied to wallets, tradeable globally.",
    color: "#F59E0B",
  },
];

export default function BlockchainSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-0 w-1/2 h-full opacity-5"
          style={{ background: "radial-gradient(ellipse at left, #8B5CF6 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-px w-8 bg-purple-500/60" />
              <span className="text-xs font-mono text-purple-400/80 tracking-widest uppercase">
                On-Chain Integration
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
            >
              Built for the
              <br />
              <span className="gradient-text">decentralized</span>
              <br />
              creative economy
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-slate-400 leading-relaxed mb-10"
            >
              HAP supports optional on-chain anchoring. Authorship records can be hashed
              and stored on decentralized networks, with ownership tied to wallets and
              creative assets traded globally.
            </motion.p>

            <div className="grid grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="glass rounded-xl p-4"
                  style={{ borderColor: `${f.color}18` }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: `${f.color}15`, color: f.color }}
                  >
                    {f.icon}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{f.title}</h4>
                  <p className="text-xs text-slate-500">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: chain visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* On-chain block */}
            <div className="glass rounded-2xl p-6 mb-4" style={{ borderColor: "rgba(139,92,246,0.3)" }}>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-6 h-6 rounded flex items-center justify-center text-xs"
                  style={{ background: "rgba(139,92,246,0.2)", color: "#8B5CF6" }}
                >
                  ⛓
                </div>
                <span className="text-sm font-bold font-mono text-purple-400">ON-CHAIN</span>
                <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 pulse-ring" />
              </div>
              <div className="space-y-2">
                {onChain.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    className="flex items-center gap-3 text-sm"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    <span className="font-mono text-slate-300">{item}</span>
                    <span className="ml-auto text-xs font-mono text-emerald-400">✓ stored</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Connector */}
            <div className="flex items-center gap-2 px-6 my-2">
              <div className="flex-1 h-px bg-slate-700/50" />
              <div className="text-xs font-mono text-slate-600">HAP Bridge</div>
              <div className="flex-1 h-px bg-slate-700/50" />
            </div>

            {/* Off-chain block */}
            <div className="glass rounded-2xl p-6" style={{ borderColor: "rgba(6,182,212,0.2)" }}>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-6 h-6 rounded flex items-center justify-center text-xs"
                  style={{ background: "rgba(6,182,212,0.15)", color: "#06B6D4" }}
                >
                  ☁
                </div>
                <span className="text-sm font-bold font-mono text-cyan-400">OFF-CHAIN</span>
              </div>
              <div className="space-y-2">
                {offChain.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.7 + i * 0.08 }}
                    className="flex items-center gap-3 text-sm"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" />
                    <span className="font-mono text-slate-400">{item}</span>
                    <span className="ml-auto text-xs font-mono text-slate-600">encrypted</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
