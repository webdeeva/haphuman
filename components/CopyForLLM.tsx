"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Bot } from "lucide-react";

const HAP_MARKDOWN = `# Human Authorship Protocol (HAP)  -  Whitepaper v2.1
**haphuman.xyz** | Created by: Aquarius Maximus  -  Founder of HAP | Co-produced with Claude (Anthropic)

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
Versions, refinements, selection decisions. Rejection decisions are as meaningful as selections  -  they document creative judgment.

### Curation (Final Selection)
The human act of choosing which output to keep  -  a distinct creative decision tracked as its own HCS component.

---

## Human Contribution Score (HCS)

HCS = Sum of all human-driven components. AI Remainder = 1 − HCS.

### HCS Components (Music Profile)

| Component | Intentionality | Reproducibility | Defensibility | Default Weight |
|-----------|---------------|----------------|---------------|----------------|
| Recipe | High | High | High | 30% |
| Inputs | High | High | High | 25% |
| Voice | High | High | Medium | 20% |
| Iteration | Medium | Medium | High | 15% |
| Curation | Medium | Low | Medium | 10% |

### HCS Tiers

| HCS Range | Tier | Meaning |
|-----------|------|---------|
| 0.80–1.00 | Primary Human Authorship | Human creative direction dominates throughout |
| 0.50–0.79 | Collaborative Authorship | Significant human input with substantial AI generation |
| 0.20–0.49 | AI-Assisted Creation | AI-led output with human curation and light direction |
| 0.00–0.19 | AI-Generated | Minimal human contribution beyond prompt input |

### Domain Profiles

**Music (Default):** Recipe 30% / Inputs 25% / Voice 20% / Iteration 15% / Curation 10%
**Visual Art:** Recipe 35% / Iteration 25% / Inputs 20% / Curation 15% / Voice 5%
**Written Content:** Inputs 40% / Recipe 25% / Iteration 20% / Curation 10% / Voice 5%

---

## Data Structure (v2.1)

\`\`\`json
{
  "hap_version": "2.1",
  "record_id": "hap_record_20250101_001",
  "domain_profile": "music",
  "recipe": { "recipe_id": "hap_recipe_v2_001", "recipe_cid": "bafybeig...abc123" },
  "voice": {
    "voice_id": "hap_voice_creator_001",
    "voice_permissions": {
      "licensed_uses": ["music_generation", "remix"],
      "prohibited_uses": ["advertising", "political_content"],
      "expiry": "2027-01-01T00:00:00Z",
      "revocable": true
    }
  },
  "hcs_components": { "recipe": 0.30, "inputs": 0.25, "voice": 0.20, "iteration": 0.15, "curation": 0.10 },
  "contribution_score": 1.00,
  "hcs_tier": "primary_human_authorship",
  "onchain_anchor": {
    "chain": "polygon",
    "transaction_hash": "0xabc123...",
    "anchored_hash": "sha256:9f86d081...",
    "timestamp": "2025-01-01T00:00:00Z"
  },
  "owner_identity": "0x7f3a...b291"
}
\`\`\`

---

## Blockchain Integration

HAP supports optional on-chain anchoring using a hybrid architecture.

**On-Chain:** Hash of authorship data · Ownership reference · Timestamp · Creator wallet
**Off-Chain (IPFS):** Audio files · Full prompt structures · Voice model data · Large datasets

**Chain selection:** Ethereum Mainnet (high-value works) · Polygon (high-volume platforms) · Arweave (archival) · Base (consumer apps)

---

## Legal Framework

### Copyright
The US Copyright Office requires human authorship. HAP records document the kind of intentional creative control that copyright frameworks look for.

- **0.80–1.00 HCS:** Most likely to support a copyright claim
- **0.50–0.79 HCS:** May support partial protection over human-shaped elements
- **Below 0.50:** Unlikely to qualify under current US standards

HAP is a documentation framework, not a legal service.

### Voice Data and Biometric Privacy
- GDPR Article 9: Biometric data requires explicit consent and DPIA
- BIPA (Illinois): Written consent required; $1,000–$5,000 per violation
- Voice models stored off-chain, encrypted; on-chain contains only non-reversible hash
- Platforms must implement right-to-deletion workflows

### Jurisdiction Notes
- **US:** HAP records document intentional creative decisions relevant to copyright standards
- **EU:** Recipe and Input components map to "author's own intellectual creation" standard
- **UK:** System-level authorship aligns with CDPA s.9(3) computer-generated works provision

---

## Dispute Resolution

Three-tier process for Ownership, Derivation, Voice Identity, and Contribution disputes.

**First Principle:** The earlier on-chain anchor takes precedence in ownership disputes.

- **Tier 1:** Automated similarity check (85% threshold triggers notification)
- **Tier 2:** HAP Registry structured mediation (21-day resolution target)
- **Tier 3:** External arbitration (WIPO, AAA, National Arbitration Forum)

**Anti-gaming:** Bad faith registration voided · Dispute filing stake · 90-day cooling-off period

---

## Relationship to C2PA

C2PA (backed by Adobe, Microsoft, Google) embeds provenance metadata into files. HAP and C2PA are complementary, not competing.

| Dimension | C2PA | HAP |
|-----------|------|-----|
| Core question | Where did this come from? | Who shaped it, and how? |
| Human contribution | Not measured | Measured via HCS |
| Ownership model | Not addressed | Output, system, identity |
| Monetization | Not addressed | Recipe markets, voice licensing |

**Analogy:** C2PA is a shipping manifest. HAP is a deed of ownership.

---

## Worked Example  -  Jordan Ellis (AI-Assisted Music Track)

1. **Recipe:** Lo-fi hip hop, 70–85 BPM, minor key, vinyl texture → registered on IPFS
2. **Voice:** Encrypted voice model, music_gen + remix permitted, advertising prohibited, revocable
3. **Inputs:** Lyric file + note: "Climax at 1:45; chorus vocal distant, like a memory"
4. **Iteration:** v1 rejected (tempo too fast) · v2 rejected (needs reverb) · v3 selected
5. **HCS:** Recipe(0.30) + Inputs(0.25) + Voice(0.20) + Iteration(0.15) + Curation(0.10) = 1.00
6. **Anchored:** SHA-256 hash → Polygon smart contract → tx: 0xdef456...
7. **Monetization:** Output license (film sync) + Recipe license + Voice license  -  all from one HAP record
8. **Dispute:** 71% similarity claim → below 85% threshold → upheld in 18 days

---

## Ownership Model

- **Output Ownership**  -  The generated work
- **System Ownership**  -  The recipe and framework (ownable independently)
- **Identity Ownership**  -  Voice and creator identity (licensable with granular permissions)

---

## Monetization Model

- Recipe marketplaces  -  license reusable creative systems
- Voice licensing  -  monetize vocal identity under defined permissions
- Contribution-based revenue sharing  -  proportional to HCS components
- Creative asset trading on decentralized platforms

---

## Use Cases

- AI music platforms
- Digital art marketplaces
- Content creation tools
- Voice licensing systems
- Creator economies

---

## Future Directions

- Open API specification and SDK for cross-platform standardization
- W3C DID integration for verified human identity binding
- Legal alignment with evolving copyright frameworks across jurisdictions
- Algorithmic HCS validation tools for platform implementers
- Cross-platform recipe and voice marketplaces

---

## Vision

A world where:
- Creativity is trackable
- Ownership is provable
- Systems are more valuable than outputs
- Human identity remains central in an AI-driven creative economy

---

## Disclaimer

HAP is a documentation and attribution framework. It is not a legal service and does not provide legal advice. Creators and platform implementers should consult qualified legal counsel regarding copyright, privacy, and regulatory compliance in their jurisdictions.

---

*Human Authorship Protocol v2.1  -  haphuman.xyz*
*Created by Aquarius Maximus  -  Founder of HAP | Co-produced with Claude (Anthropic)*
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
                Copies the full HAP protocol content as clean markdown  -  ready to paste into any LLM context window.
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
