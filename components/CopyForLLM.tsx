"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Bot } from "lucide-react";

const HAP_MARKDOWN = `# Human Authorship Protocol (HAP)
**haphuman.xyz** | Created by: Aquarius Maximus — Founder of HAP | Co-produced with Claude (Anthropic)

---

## Overview

The Human Authorship Protocol (HAP) is a framework for identifying, structuring, and verifying human creative contribution within AI-generated works.

As artificial intelligence transforms how content is created, ownership and authorship have become unclear. HAP restores that clarity by tracking the human decisions behind every output.

---

## The Problem

AI can generate music, art, and content instantly. But:

- Who created it?
- What did the human actually contribute?
- Who owns it?
- How can it be monetized?

Most platforms cannot answer these questions.

---

## The Solution

**Authorship is not just the output. Authorship is the system behind the output.**

HAP defines authorship as: *The structured set of human decisions that guide and shape AI-generated outputs.*

---

## Core Principles

### 1. System-Based Authorship
Human creativity is expressed through structured systems, not just final outputs.

### 2. Verifiable Contribution
Every creative action is tracked and measurable.

### 3. Persistent Identity
Creators are tied to their work through identity, voice, and authorship records.

### 4. Monetizable Creativity
Authorship becomes an asset that can be sold, licensed, and reused.

---

## What HAP Tracks

### Recipes (Creative Systems)
Structured frameworks that guide AI output:
- Style
- Structure
- Tone
- Arrangement

### Voice (Identity Layer)
- Human voice input
- Voice models
- Licensing permissions

### Inputs (Creative Direction)
- Lyrics
- Edits
- Compositional intent

### Iteration (Process)
- Versions
- Refinements
- Selection decisions

---

## Human Contribution Score (HCS)

A measurable representation of how much of a work is driven by human input versus AI generation.

| Component | Contribution |
|-----------|-------------|
| Recipe | 30% |
| Voice | 20% |
| Inputs | 25% |
| Iteration | 15% |
| AI Generation | 10% |

**Total Human Contribution: 90%**

---

## Data Structure

Each creative work is associated with a structured authorship record:

\`\`\`json
{
  "recipe_id": "hap_recipe_v2_001",
  "voice_id": "hap_voice_creator_001",
  "inputs": ["lyric_v1", "edit_line3", "intent_climax"],
  "iterations": ["v1", "v2_selected", "v3"],
  "contribution_score": 0.90,
  "timestamp": "2025-01-01T00:00:00Z",
  "owner_identity": "0x7f3a...b291"
}
\`\`\`

---

## Blockchain Integration

HAP supports optional on-chain anchoring.

**Stored On-Chain:**
- Hash of authorship data
- Ownership reference
- Timestamp
- Creator wallet address

**Stored Off-Chain:**
- Audio files
- Full prompt structures
- Voice model data
- Large creative datasets

---

## Ownership Model

- **Output Ownership** — The generated work
- **System Ownership** — The recipe and framework
- **Identity Ownership** — Voice and creator identity

---

## Monetization Model

- Recipe marketplaces
- Voice licensing
- Contribution-based revenue sharing
- Creative asset trading on decentralized platforms

---

## Use Cases

- AI music platforms
- Digital art marketplaces
- Content creation tools
- Voice licensing systems
- Creator economies

---

## Whitepaper

### Abstract

The Human Authorship Protocol (HAP) is a framework designed to define, measure, and verify human creative contribution within AI-assisted works. As generative AI systems increasingly produce content with minimal human input, traditional definitions of authorship and ownership are being challenged. HAP introduces a structured approach to capturing the human role in creative systems, enabling attribution, ownership, and monetization in an AI-driven economy.

### 1. Introduction

Artificial intelligence has drastically reduced the barrier to content creation. Music, art, writing, and media can now be generated with minimal effort.

However, this introduces a fundamental problem: **the separation of creation from authorship.**

Current systems fail to adequately represent:
- Human intent
- Creative direction
- Iterative decision-making

### 2. The Authorship Problem

#### 2.1 Output vs Process
Traditional authorship focuses on outputs: a song, a painting, a written work. AI systems disrupt this by generating outputs without clear human authorship.

#### 2.2 The Missing Layer
The missing layer is the system of decisions that led to the output. Without capturing this layer, authorship becomes invisible and unverifiable.

### 3. Defining Human Authorship

HAP defines authorship as:

> The structured set of human decisions that guide and shape AI-generated outputs.

This includes prompt systems (recipes), creative inputs, selection and refinement, and identity-based contributions.

### 4. Core Components

#### 4.1 Recipes (System Layer)
Recipes are structured frameworks that define style, structure, tone, and output constraints. Recipes are repeatable and represent system-level authorship.

#### 4.2 Voice (Identity Layer)
Voice represents human vocal input, identity-based contribution, and licensing potential. Voice is treated as a distinct asset class.

#### 4.3 Inputs (Creative Layer)
Inputs include lyrics, composition guidance, edits and modifications.

#### 4.4 Iteration (Process Layer)
HAP captures version history, decision points, and output selection. The refinement process is itself a record of authorship.

### 5. Contribution Scoring

HAP introduces a quantitative model: the **Human Contribution Score (HCS)**.

This score evaluates:
- Degree of human input
- Level of creative control
- Iterative involvement

| Component | Contribution |
|-----------|-------------|
| Recipe | 30% |
| Voice | 20% |
| Inputs | 25% |
| Iteration | 15% |
| AI Generation | 10% |

### 6. Blockchain Integration

HAP supports optional on-chain anchoring:
- Stored on-chain: hash of authorship data, ownership reference, timestamp
- Stored off-chain: audio files, full prompt structures, large datasets

This ensures integrity, scalability, and cost efficiency.

### 7. Ownership Model

HAP distinguishes between:
- **Output Ownership** — The generated work
- **System Ownership** — The recipe and framework
- **Identity Ownership** — Voice and creator identity

### 8. Monetization Model

HAP enables:
- Recipe marketplaces
- Voice licensing
- Contribution-based revenue sharing
- Creative asset trading

### 9. Future Directions

- Standardization across platforms
- Integration with decentralized identity systems
- Legal alignment with evolving copyright frameworks
- Expansion into multiple creative industries

### 10. Conclusion

The Human Authorship Protocol establishes a new paradigm:

**Authorship is not defined by output alone. It is defined by the system that creates it.**

HAP enables a future where human creativity remains central, even in an AI-driven world.

---

## Vision

A world where:
- Creativity is trackable
- Ownership is provable
- Systems are more valuable than outputs

---

*Human Authorship Protocol v2.0 — haphuman.xyz*
*Created by Aquarius Maximus — Founder of HAP | Co-produced with Claude (Anthropic)*
`;

export default function CopyForLLM() {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(HAP_MARKDOWN);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Tooltip panel */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="glass rounded-2xl p-4 w-64 mb-1"
              style={{ border: "1px solid rgba(6,182,212,0.2)" }}
            >
              <p className="text-xs font-mono text-slate-400 leading-relaxed mb-3">
                Copies the full HAP protocol content as clean markdown — ready to paste into any LLM context window.
              </p>
              <button
                onClick={handleCopy}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold font-mono transition-all duration-300"
                style={{
                  background: copied
                    ? "linear-gradient(135deg, #10B981, #06B6D4)"
                    : "linear-gradient(135deg, #06B6D4, #8B5CF6)",
                  boxShadow: "0 0 20px rgba(6,182,212,0.25)",
                }}
              >
                {copied ? (
                  <>
                    <Check size={14} />
                    Copied to clipboard
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Copy full content
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB */}
        <motion.button
          onClick={() => setOpen((v) => !v)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-3 rounded-2xl font-mono text-xs font-bold text-white shadow-lg transition-all duration-300"
          style={{
            background: open
              ? "linear-gradient(135deg, #8B5CF6, #06B6D4)"
              : "rgba(10,22,40,0.9)",
            border: "1px solid rgba(6,182,212,0.3)",
            boxShadow: "0 0 24px rgba(6,182,212,0.15), 0 8px 32px rgba(0,0,0,0.4)",
            backdropFilter: "blur(20px)",
          }}
        >
          <Bot size={14} className="text-cyan-400" />
          <span className="text-slate-200">Copy for LLMs</span>
        </motion.button>
      </div>
    </>
  );
}
