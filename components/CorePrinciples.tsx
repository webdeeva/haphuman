"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GitBranch, CheckCircle2, Fingerprint, Coins } from "lucide-react";

const principles = [
  {
    number: "01",
    icon: <GitBranch className="w-6 h-6" />,
    title: "System-Based Authorship",
    body: "Human creativity is expressed through structured systems, not just final outputs. The recipe, the voice, the process  -  these are the authorship.",
    color: "#06B6D4",
    accent: "cyan",
  },
  {
    number: "02",
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "Verifiable Contribution",
    body: "Every creative action is tracked and measurable. Contribution is not claimed  -  it is proven through structured records and immutable logs.",
    color: "#8B5CF6",
    accent: "purple",
  },
  {
    number: "03",
    icon: <Fingerprint className="w-6 h-6" />,
    title: "Persistent Identity",
    body: "Creators are permanently tied to their work through identity, voice models, and authorship records that cannot be erased or reassigned.",
    color: "#10B981",
    accent: "emerald",
  },
  {
    number: "04",
    icon: <Coins className="w-6 h-6" />,
    title: "Monetizable Creativity",
    body: "Authorship becomes a tradeable asset. Creative systems can be sold, licensed, and reused  -  building wealth from the process, not just the output.",
    color: "#F59E0B",
    accent: "amber",
  },
];

export default function CorePrinciples() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: header */}
          <div className="lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-px w-8 bg-purple-500/60" />
              <span className="text-xs font-mono text-purple-400/80 tracking-widest uppercase">
                Core Principles
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
            >
              Built on
              <br />
              <span className="gradient-text">four pillars</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-400 leading-relaxed"
            >
              HAP does not retrofit old copyright logic. It builds a new foundation
              specifically engineered for the age of human-AI co-creation.
            </motion.p>

            {/* Visual element */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 relative"
            >
              <div className="w-48 h-48 mx-auto lg:mx-0 relative">
                {/* Rings */}
                {[1, 2, 3].map((r) => (
                  <motion.div
                    key={r}
                    className="absolute inset-0 rounded-full border"
                    style={{
                      borderColor: `rgba(6,182,212,${0.15 / r})`,
                      margin: `${r * 12}px`,
                    }}
                    animate={{ rotate: r % 2 === 0 ? 360 : -360 }}
                    transition={{
                      duration: 12 + r * 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                ))}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text font-mono">HAP</div>
                    <div className="text-xs text-slate-500 font-mono tracking-widest mt-1">
                      v2.0
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: principles */}
          <div className="flex flex-col gap-5">
            {principles.map((p, i) => (
              <motion.div
                key={p.number}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                className="glass rounded-2xl p-6 group hover:scale-[1.01] transition-transform duration-300"
                style={{ borderColor: `${p.color}18` }}
              >
                <div className="flex items-start gap-5">
                  {/* Number */}
                  <div
                    className="text-xs font-mono font-bold opacity-40 mt-1 w-6 shrink-0"
                    style={{ color: p.color }}
                  >
                    {p.number}
                  </div>

                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${p.color}12`, color: p.color }}
                  >
                    {p.icon}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{p.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
