"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AlertTriangle, HelpCircle, Lock, DollarSign } from "lucide-react";

const problems = [
  {
    icon: <HelpCircle className="w-5 h-5" />,
    question: "Who created it?",
    desc: "AI outputs blur the line between tool and creator. Traditional attribution frameworks collapse entirely.",
    color: "#EF4444",
  },
  {
    icon: <Lock className="w-5 h-5" />,
    question: "What did the human contribute?",
    desc: "Without a structured layer, the depth of human creative direction is invisible and unverifiable.",
    color: "#F59E0B",
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    question: "Who owns it?",
    desc: "Legal frameworks were built for human-only creation. AI-generated content creates a vacuum of ownership.",
    color: "#8B5CF6",
  },
  {
    icon: <DollarSign className="w-5 h-5" />,
    question: "How can it be monetized?",
    desc: "Without provable authorship, creative systems cannot be licensed, traded, or fairly compensated.",
    color: "#06B6D4",
  },
];

export default function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="protocol" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-5"
          style={{ background: "radial-gradient(circle, #EF4444 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="h-px w-8 bg-red-500/60" />
          <span className="text-xs font-mono text-red-400/80 tracking-widest uppercase">
            The Problem
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
        >
          AI can generate everything.
          <br />
          <span className="gradient-text-warm">Platforms answer nothing.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 text-lg max-w-2xl mb-16 leading-relaxed"
        >
          Artificial intelligence has eliminated the barrier to content generation. Music, art,
          writing  -  produced instantly. But the fundamental questions of authorship remain
          unanswered.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-5">
          {problems.map((p, i) => (
            <motion.div
              key={p.question}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="glass rounded-2xl p-6 group hover:scale-[1.02] transition-transform duration-300"
              style={{ borderColor: `${p.color}20` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${p.color}15`, color: p.color }}
                >
                  {p.icon}
                </div>
                <div>
                  <h3
                    className="text-base font-bold mb-2 font-mono"
                    style={{ color: p.color }}
                  >
                    {p.question}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
