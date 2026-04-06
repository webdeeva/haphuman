"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function SolutionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Center glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[800px] h-[400px] opacity-8"
          style={{
            background:
              "radial-gradient(ellipse, rgba(6,182,212,0.15) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 mb-6"
        >
          <div className="h-px w-8 bg-cyan-500/60" />
          <span className="text-xs font-mono text-cyan-400/80 tracking-widest uppercase">
            The Solution
          </span>
          <div className="h-px w-8 bg-cyan-500/60" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-8"
        >
          <span className="text-white">Authorship is not</span>
          <br />
          <span className="text-slate-500 line-through decoration-red-500/60">
            the output
          </span>
          <br />
          <span className="gradient-text">the system behind it</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12"
        >
          HAP introduces a new standard: human creativity is expressed through structured
          systems  -  recipes, voice, inputs, and iteration  -  not just final outputs.
        </motion.p>

        {/* Big statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="inline-block relative"
        >
          <div
            className="rounded-2xl p-px"
            style={{
              background: "linear-gradient(135deg, #06B6D4, #8B5CF6, #10B981)",
            }}
          >
            <div className="rounded-2xl px-8 py-6 bg-bg-primary">
              <p className="text-xl font-mono font-bold text-white">
                <span className="text-cyan-400">HAP</span>.defineAuthorship(
                <span className="text-purple-400">systemOfDecisions</span>);
              </p>
            </div>
          </div>
          {/* Glow */}
          <div
            className="absolute inset-0 rounded-2xl blur-xl opacity-30 -z-10"
            style={{
              background: "linear-gradient(135deg, #06B6D4, #8B5CF6)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
