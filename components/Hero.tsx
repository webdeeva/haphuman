"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Zap } from "lucide-react";
import PromptFramework from "./PromptFramework";


export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-ring" />
              <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase">
                Protocol Active · v2.0
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
            >
              <span className="text-white">Human</span>
              <br />
              <span className="gradient-text">Authorship</span>
              <br />
              <span className="text-white">Protocol</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-lg text-slate-400 leading-relaxed mb-10 max-w-lg"
            >
              A framework for identifying, structuring, and verifying{" "}
              <span className="text-cyan-400 font-medium">human creative contribution</span>{" "}
              within AI-generated works. Authorship is not just the output — it is{" "}
              <span className="text-purple-400 font-medium">the system behind it</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link
                href="#join"
                className="group flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm text-white transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #06B6D4, #8B5CF6)",
                  boxShadow: "0 0 30px rgba(6,182,212,0.3)",
                }}
              >
                Join the Protocol
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/whitepaper"
                className="group flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm text-slate-300 glass hover:text-white hover:border-cyan-500/30 transition-all duration-300"
              >
                Read Whitepaper
                <ArrowRight size={16} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-8"
            >
              {[
                { value: "5", label: "HAP Layers", icon: <Zap size={12} /> },
                { value: "4", label: "HCS Tiers", icon: <Shield size={12} /> },
                { value: "∞", label: "Creative Systems", icon: <Zap size={12} /> },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-2xl font-bold gradient-text font-mono">
                    {stat.value}
                  </span>
                  <span className="text-xs text-slate-500 font-mono tracking-wide">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Interactive Framework */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <PromptFramework />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono text-slate-600 tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-cyan-500/50 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
