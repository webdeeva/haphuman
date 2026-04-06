"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CopyForLLM from "@/components/CopyForLLM";
import { ArrowLeft, ExternalLink } from "lucide-react";

const sections = [
  {
    id: "abstract",
    number: "00",
    title: "Abstract",
    color: "#06B6D4",
    content: `The Human Authorship Protocol (HAP) is a framework designed to define, measure, and verify human creative contribution within AI-assisted works. As generative AI systems increasingly produce content with minimal human input, traditional definitions of authorship and ownership are being challenged. HAP introduces a structured approach to capturing the human role in creative systems, enabling attribution, ownership, and monetization in an AI-driven economy.`,
  },
  {
    id: "introduction",
    number: "01",
    title: "Introduction",
    color: "#8B5CF6",
    content: `Artificial intelligence has drastically reduced the barrier to content creation. Music, art, writing, and media can now be generated with minimal effort.\n\nHowever, this introduces a fundamental problem: the separation of creation from authorship.\n\nCurrent systems fail to adequately represent human intent, creative direction, and iterative decision-making. HAP addresses this gap by establishing a new framework that centers the human creative process.`,
  },
  {
    id: "authorship-problem",
    number: "02",
    title: "The Authorship Problem",
    color: "#10B981",
    subsections: [
      {
        title: "2.1 Output vs Process",
        body: "Traditional authorship focuses on outputs: a song, a painting, a written work. AI systems disrupt this by generating outputs without clear human authorship.",
      },
      {
        title: "2.2 The Missing Layer",
        body: "The missing layer is the system of decisions that led to the output. Without capturing this layer, authorship becomes invisible and unverifiable.",
      },
    ],
  },
  {
    id: "defining-authorship",
    number: "03",
    title: "Defining Human Authorship",
    color: "#F59E0B",
    content: `HAP defines authorship as:\n\n"The structured set of human decisions that guide and shape AI-generated outputs."\n\nThis includes prompt systems (recipes), creative inputs, selection and refinement, and identity-based contributions.`,
  },
  {
    id: "core-components",
    number: "04",
    title: "Core Components",
    color: "#06B6D4",
    subsections: [
      {
        title: "4.1 Recipes (System Layer)",
        body: "Recipes are structured frameworks that define style, structure, tone, and output constraints. Recipes are repeatable and represent system-level authorship.",
      },
      {
        title: "4.2 Voice (Identity Layer)",
        body: "Voice represents human vocal input, identity-based contribution, and licensing potential. Voice is treated as a distinct asset class.",
      },
      {
        title: "4.3 Inputs (Creative Layer)",
        body: "Inputs include lyrics, composition guidance, and edits and modifications. All creative direction is logged as contribution.",
      },
      {
        title: "4.4 Iteration (Process Layer)",
        body: "HAP captures version history, decision points, and output selection. The refinement process is itself a record of authorship.",
      },
    ],
  },
  {
    id: "contribution-scoring",
    number: "05",
    title: "Contribution Scoring",
    color: "#8B5CF6",
    content: `HAP introduces a quantitative model: the Human Contribution Score (HCS).\n\nThis score evaluates the degree of human input, the level of creative control, and iterative involvement across all four layers.`,
    table: {
      headers: ["Component", "Contribution"],
      rows: [
        ["Recipe", "30%"],
        ["Voice", "20%"],
        ["Inputs", "25%"],
        ["Iteration", "15%"],
        ["AI Generation", "10%"],
      ],
      colors: ["#06B6D4", "#8B5CF6", "#10B981", "#F59E0B", "#475569"],
    },
  },
  {
    id: "data-structure",
    number: "06",
    title: "Data Structure",
    color: "#10B981",
    content: "Each creative work is associated with a structured authorship record:",
    codeBlock: `{
  "recipe_id": "hap_recipe_v2_001",
  "voice_id": "hap_voice_creator_001",
  "inputs": ["lyric_v1", "edit_line3", "intent_climax"],
  "iterations": ["v1", "v2_selected", "v3"],
  "contribution_score": 0.90,
  "timestamp": "2025-01-01T00:00:00Z",
  "owner_identity": "0x7f3a...b291"
}`,
  },
  {
    id: "blockchain",
    number: "07",
    title: "Blockchain Integration",
    color: "#F59E0B",
    content: "HAP supports optional on-chain anchoring for integrity and provenance.",
    subsections: [
      {
        title: "Stored On-Chain",
        body: "Hash of authorship data · Ownership reference · Timestamp · Creator wallet address",
      },
      {
        title: "Stored Off-Chain",
        body: "Audio files · Full prompt structures · Voice model data · Large creative datasets",
      },
    ],
  },
  {
    id: "ownership",
    number: "08",
    title: "Ownership Model",
    color: "#06B6D4",
    subsections: [
      {
        title: "8.1 Output Ownership",
        body: "The generated work — the final audio, image, or written piece produced by the AI system.",
      },
      {
        title: "8.2 System Ownership",
        body: "The recipe and creative framework — the human-designed process that guided the output.",
      },
      {
        title: "8.3 Identity Ownership",
        body: "Voice and creator identity — the human's unique contribution that can be licensed and monetized.",
      },
    ],
  },
  {
    id: "monetization",
    number: "09",
    title: "Monetization Model",
    color: "#8B5CF6",
    content: "HAP enables new economic models for creative work:",
    bullets: [
      "Recipe marketplaces — sell and license creative systems",
      "Voice licensing — monetize identity-based contributions",
      "Contribution-based revenue sharing",
      "Creative asset trading on decentralized platforms",
    ],
  },
  {
    id: "conclusion",
    number: "13",
    title: "Conclusion",
    color: "#06B6D4",
    content: `The Human Authorship Protocol establishes a new paradigm:\n\nAuthorship is not defined by output alone. It is defined by the system that creates it.\n\nHAP enables a future where human creativity remains central, even in an AI-driven world. By making the process measurable, verifiable, and monetizable, we ensure that human contribution is never lost in the age of artificial intelligence.`,
  },
  {
    id: "call-to-action",
    number: "14",
    title: "Call to Action",
    color: "#10B981",
    content: "Developers, creators, and platforms are invited to adopt and expand HAP.\n\nTogether, we can define the standard for authorship in the age of AI.",
  },
];

function SectionBlock({ section, index }: { section: typeof sections[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="glass rounded-2xl p-8 mb-6"
      style={{ borderColor: `${section.color}18` }}
      id={section.id}
    >
      {/* Section header */}
      <div className="flex items-baseline gap-4 mb-6">
        <span className="text-xs font-mono font-bold opacity-30" style={{ color: section.color }}>
          {section.number}
        </span>
        <h2 className="text-xl font-bold text-white">{section.title}</h2>
      </div>

      {/* Content */}
      {section.content && (
        <div className="text-slate-400 leading-relaxed whitespace-pre-line mb-4">
          {section.content}
        </div>
      )}

      {/* Subsections */}
      {section.subsections && (
        <div className="space-y-5 mt-4">
          {section.subsections.map((sub) => (
            <div key={sub.title} className="pl-4 border-l-2" style={{ borderColor: `${section.color}30` }}>
              <h3 className="text-sm font-bold mb-2" style={{ color: section.color }}>
                {sub.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">{sub.body}</p>
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      {section.table && (
        <div className="mt-6 overflow-hidden rounded-xl border border-slate-700/40">
          <table className="w-full text-sm font-mono">
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                {section.table.headers.map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs text-slate-500 font-bold uppercase tracking-widest">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, i) => (
                <tr key={row[0]} className="border-t border-slate-700/30">
                  <td className="px-4 py-3" style={{ color: section.table!.colors[i] }}>
                    {row[0]}
                  </td>
                  <td className="px-4 py-3 text-slate-300 font-bold">{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Code block */}
      {section.codeBlock && (
        <div className="mt-4 rounded-xl overflow-hidden" style={{ background: "rgba(4,8,18,0.9)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="px-4 py-2 border-b border-slate-700/30 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500/60" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
            <div className="w-2 h-2 rounded-full bg-green-500/60" />
            <span className="text-xs font-mono text-slate-600 ml-2">authorship-record.json</span>
          </div>
          <pre className="p-5 text-xs font-mono text-emerald-400 overflow-auto leading-relaxed">
            {section.codeBlock}
          </pre>
        </div>
      )}

      {/* Bullets */}
      {section.bullets && (
        <ul className="mt-4 space-y-2">
          {section.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-sm text-slate-400">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: section.color }} />
              {b}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

export default function WhitepaperPage() {
  return (
    <main className="relative min-h-screen">
      <CopyForLLM />
      {/* Background */}
      <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] opacity-5"
          style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)" }}
        />
      </div>

      <Navbar />

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-16 relative z-10">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-mono text-slate-500 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Protocol
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-cyan-500/60" />
            <span className="text-xs font-mono text-cyan-400/80 tracking-widest uppercase">
              Whitepaper · v1.0
            </span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Human Authorship
            <br />
            <span className="gradient-text">Protocol</span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed mb-8">
            A technical and conceptual framework for defining, measuring, and verifying
            human creative contribution within AI-assisted works.
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="glass rounded-xl px-4 py-2 text-xs font-mono text-slate-400">
              Published: 2025
            </div>
            <div className="glass rounded-xl px-4 py-2 text-xs font-mono text-slate-400">
              Version: 1.0
            </div>
            <div className="glass rounded-xl px-4 py-2 text-xs font-mono text-cyan-400">
              Status: Open Standard
            </div>
          </div>
        </motion.div>

        {/* Table of contents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6 mb-12"
        >
          <h2 className="text-sm font-bold font-mono text-slate-500 uppercase tracking-widest mb-4">
            Table of Contents
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-3 text-sm font-mono text-slate-400 hover:text-cyan-400 transition-colors py-1"
              >
                <span className="text-xs opacity-40" style={{ color: s.color }}>
                  {s.number}
                </span>
                {s.title}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Sections */}
        {sections.map((section, i) => (
          <SectionBlock key={section.id} section={section} index={i} />
        ))}

        {/* CTA at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div
            className="inline-flex items-center gap-2 px-1 py-1 rounded-2xl"
            style={{ background: "linear-gradient(135deg, #06B6D4, #8B5CF6)" }}
          >
            <Link
              href="/#join"
              className="flex items-center gap-2 px-6 py-3 rounded-[14px] bg-bg-primary text-white font-bold text-sm font-mono hover:bg-transparent transition-colors duration-300"
            >
              Join the Protocol
              <ExternalLink size={14} />
            </Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
