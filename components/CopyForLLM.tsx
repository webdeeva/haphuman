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

**Important:** HCS is a documentation metric, not a legal threshold. Copyright eligibility is a qualitative legal question that no score or framework can resolve. HCS tiers are descriptive indicators only — copyright eligibility is determined by applicable law and cannot be established by any score.

### HCS Components (Music Profile)

| Component | Intentionality | Reproducibility | Defensibility | Default Weight |
|-----------|---------------|----------------|---------------|----------------|
| Recipe | High | High | High | 30% |
| Inputs | High | High | High | 25% |
| Voice | High | High | Medium | 20% |
| Iteration | Medium | Medium | High | 15% |
| Curation | Medium | Low | Medium | 10% |

Note on Curation: Courts have been inconsistent on whether selection alone constitutes authorship. HAP tracks curation as a documented decision — it does not imply curation alone creates a copyright claim.

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
The US Copyright Office requires human authorship (see Thaler v. Perlmutter, 2023). HAP records document the kind of intentional creative control that copyright frameworks look for.

- **0.80–1.00 HCS:** Most likely to support a copyright claim
- **0.50–0.79 HCS:** May support partial protection over human-shaped elements
- **Below 0.50:** Unlikely to qualify under current US standards

HAP is a documentation framework, not a legal service. HCS tiers are descriptive indicators — they are not legal determinations.

### Voice Data and Biometric Privacy
- GDPR Article 9: Biometric data requires explicit consent and DPIA. Hashed biometric data may still constitute personal data under GDPR if re-identification is possible — the on-chain hash is a design mitigation, not a compliance solution.
- BIPA (Illinois): Written consent required plus a public retention/destruction policy before collection. Liability accrues per collection event — aggregate exposure can be substantial. Obtain qualified BIPA counsel before implementing voice data collection.
- State law: Biometric and voice-adjacent privacy laws vary widely and are rapidly evolving (Texas, Washington, New York, California, and others). This document is not a complete survey of applicable law.
- Voice models stored off-chain, encrypted; on-chain contains only non-reversible hash
- Platforms must implement right-to-deletion workflows

### Jurisdiction Notes
- **US:** HAP records document intentional creative decisions relevant to copyright standards
- **EU:** Recipe and Input components are designed to document "author's own intellectual creation" — EU member states implement this standard differently; jurisdiction-specific legal review is required
- **UK:** System-level authorship is relevant to CDPA s.9(3), but this provision is under active legislative review and may be narrowed or repealed — do not rely on it without current qualified UK IP counsel

---

## Dispute Resolution

Three-tier process for Ownership, Derivation, Voice Identity, and Contribution disputes.

**First Principle:** On-chain anchoring creates evidentiary support for priority of creation — it does not confer automatic legal priority. Courts do not automatically defer to blockchain timestamps. Chain-of-title disputes, fraud, or errors may override an earlier anchor.

- **Tier 1:** Automated similarity check (85% threshold triggers notification)
- **Tier 2:** HAP Registry structured mediation (21-day resolution target)
- **Tier 3:** External arbitration (WIPO, AAA, JAMS, ICC) — smart contracts are not uniformly enforceable in all jurisdictions; confirm arbitration clause enforceability with local counsel

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
- **System Ownership**  -  The recipe and framework (ownable as trade secret, contractual license, or sui generis right under HAP terms — not protectable under copyright, which excludes systems and methods; see Defend Trade Secrets Act for undisclosed recipes)
- **Identity Ownership**  -  Voice and creator identity (licensable with granular permissions)

---

## Monetization Model

Note: "license," "sell," and "revenue sharing" have distinct legal meanings. A license conveys permission to use under defined terms without transferring ownership. A sale transfers ownership. Revenue sharing distributes proceeds without creating ownership interests.

- Recipe licensing  -  grant permission to use a creative system under defined terms
- Voice licensing  -  monetize vocal identity under defined permissions
- Contribution-based revenue sharing  -  proportional to HCS components
- Creative asset licensing and transfer on decentralized platforms

**Securities notice:** Fractional ownership interests sold to multiple parties on decentralized platforms may constitute investment contracts subject to SEC regulation under the Howey test. Platforms offering contribution-based revenue sharing or fractionalized creative assets must obtain qualified securities counsel before deployment.

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

## Limitations

HAP cannot guarantee copyright protection for any work. No HCS score, tier, or on-chain record creates a copyright or establishes ownership as a matter of law.

HAP does not replace legal counsel. Creators and platforms in regulated jurisdictions must engage qualified legal professionals.

HAP does not create enforceable rights by itself. The legal weight of documented decisions depends on jurisdiction and applicable law.

HAP records do not prove human agency. Platforms must design appropriate identity verification if human agency is material to their use case.

**Version protocol:** Records are interpreted under the schema version in effect at creation. A v2.1 record is governed by v2.1 schema definitions regardless of subsequent releases. Version-specific schemas: haphuman.xyz/schemas/v{version}/

---

## Disclaimer

HAP is a documentation and attribution framework. It is not a legal service and does not provide legal advice. Nothing in this document constitutes legal, financial, or investment advice.

HCS scores and tiers are descriptive indicators only. They do not constitute legal determinations of copyright eligibility, ownership, or authorship.

On-chain anchoring provides evidentiary support, not automatic legal priority or enforceable rights.

Biometric and voice data collection is subject to complex and rapidly evolving federal, state, and international privacy law. This document is illustrative only and does not constitute compliance guidance.

Revenue-sharing and fractional ownership models may implicate securities law. This document does not constitute securities advice.

Creators, platforms, and investors should consult qualified legal counsel regarding copyright, privacy, securities, and regulatory compliance before implementing or relying on any aspect of this framework.

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
