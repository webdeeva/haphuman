"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CopyForLLM from "@/components/CopyForLLM";
import { ArrowLeft, ExternalLink } from "lucide-react";

type Section = {
  id: string;
  number: string;
  title: string;
  color: string;
  content?: string;
  subsections?: { title: string; body: string; code?: string }[];
  table?: { headers: string[]; rows: string[][]; colors?: string[] };
  comparisonTable?: { headers: string[]; rows: string[][] };
  codeBlock?: string;
  codeLabel?: string;
  bullets?: string[];
  steps?: { number: string; title: string; body: string; code?: string }[];
  callout?: string;
  disclaimer?: string;
};

const sections: Section[] = [
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
    callout: "The structured set of human decisions that guide and shape AI-generated outputs.",
    content: `This includes prompt systems (recipes), creative inputs, selection and refinement, curation, and identity-based contributions.`,
  },
  {
    id: "core-components",
    number: "04",
    title: "Core Components",
    color: "#06B6D4",
    subsections: [
      {
        title: "4.1 Recipes (System Layer)",
        body: "Recipes are structured frameworks that define style, structure, tone, and output constraints. Recipes are repeatable and represent system-level authorship. They are ownable, licensable, and sellable independently of any output they produce.",
      },
      {
        title: "4.2 Voice (Identity Layer)",
        body: "Voice represents human vocal input and identity-based contribution. Voice is treated as a distinct asset class with granular licensing permissions. Voice data is biometric in nature and subject to strict privacy protections (see Section 10).",
      },
      {
        title: "4.3 Inputs (Creative Layer)",
        body: "Inputs include lyrics, composition guidance, edits and modifications, and any explicit creative direction provided by the human.",
      },
      {
        title: "4.4 Iteration (Process Layer)",
        body: "HAP captures version history, decision points, and output selection. Rejection decisions are as meaningful as selection decisions  -  they document creative judgment.",
      },
      {
        title: "4.5 Curation (Selection Layer)",
        body: "The final act of selecting which output to keep is a distinct human contribution. Curation is tracked as its own component in the Human Contribution Score.",
      },
    ],
  },
  {
    id: "hcs",
    number: "05",
    title: "Human Contribution Score (HCS)",
    color: "#8B5CF6",
    content: "HAP introduces a quantitative model: the Human Contribution Score (HCS).",
    subsections: [
      {
        title: "5.1 What the HCS Measures",
        body: "The HCS is the sum of all human-driven creative components. AI's role is the remainder  -  it is not listed as a component of the human score.\n\nHCS = Sum of all human-driven components\nAI Remainder = 1 − HCS",
      },
      {
        title: "5.2 Weighting Rationale",
        body: "Weights are assigned based on three criteria: Intentionality (does this component require deliberate human decision-making?), Reproducibility (would removing this component significantly change the output?), and Defensibility (can this component be documented as evidence of authorship?).",
      },
    ],
    table: {
      headers: ["Component", "Intentionality", "Reproducibility", "Defensibility", "Default Weight (Music)"],
      rows: [
        ["Recipe", "High", "High", "High", "30%"],
        ["Inputs", "High", "High", "High", "25%"],
        ["Voice", "High", "High", "Medium", "20%"],
        ["Iteration", "Medium", "Medium", "High", "15%"],
        ["Curation", "Medium", "Low", "Medium", "10%"],
      ],
      colors: ["#06B6D4", "#10B981", "#8B5CF6", "#F59E0B", "#EC4899"],
    },
  },
  {
    id: "domain-profiles",
    number: "05b",
    title: "Domain Profiles & HCS Tiers",
    color: "#10B981",
    content: "Different creative industries have different contribution patterns. HAP defines three default domain profiles:",
    subsections: [
      {
        title: "Music (Default)",
        body: "Recipe 30% / Inputs 25% / Voice 20% / Iteration 15% / Curation 10%",
      },
      {
        title: "Visual Art",
        body: "Recipe 35% / Iteration 25% / Inputs 20% / Curation 15% / Voice 5%",
      },
      {
        title: "Written Content",
        body: "Inputs 40% / Recipe 25% / Iteration 20% / Curation 10% / Voice 5%",
      },
    ],
    table: {
      headers: ["HCS Range", "Tier", "Meaning"],
      rows: [
        ["0.80 – 1.00", "Primary Human Authorship", "Human creative direction dominates throughout"],
        ["0.50 – 0.79", "Collaborative Authorship", "Significant human input with substantial AI generation"],
        ["0.20 – 0.49", "AI-Assisted Creation", "AI-led output with human curation and light direction"],
        ["0.00 – 0.19", "AI-Generated", "Minimal human contribution beyond prompt input"],
      ],
      colors: ["#10B981", "#06B6D4", "#F59E0B", "#475569"],
    },
  },
  {
    id: "data-structure",
    number: "06",
    title: "Data Structure",
    color: "#F59E0B",
    content: "Each creative work is associated with a structured authorship record:",
    codeLabel: "authorship-record-v2.1.json",
    codeBlock: `{
  "hap_version": "2.1",
  "record_id": "hap_record_20250101_001",
  "domain_profile": "music",
  "recipe": {
    "recipe_id": "hap_recipe_v2_001",
    "recipe_cid": "bafybeig...abc123",
    "storage_provider": "pinata",
    "description": "Lo-fi hip hop, 70-85 BPM, minor key, vinyl texture"
  },
  "voice": {
    "voice_id": "hap_voice_creator_001",
    "voice_model_cid": "bafybeig...def456",
    "storage_provider": "pinata",
    "voice_permissions": {
      "licensed_uses": ["music_generation", "remix"],
      "prohibited_uses": ["advertising", "political_content"],
      "expiry": "2027-01-01T00:00:00Z",
      "revocable": true
    }
  },
  "inputs": [{ "input_id": "lyric_v1", "input_cid": "bafybeig...ghi789", "storage_provider": "pinata" }],
  "iterations": [
    { "version": "v1", "selected": false, "notes": "Tempo too fast." },
    { "version": "v2_selected", "selected": true, "notes": "This one. Keep." }
  ],
  "hcs_components": {
    "recipe": 0.30, "inputs": 0.25, "voice": 0.20,
    "iteration": 0.15, "curation": 0.10
  },
  "contribution_score": 0.90,
  "hcs_tier": "primary_human_authorship",
  "onchain_anchor": {
    "chain": "polygon",
    "transaction_hash": "0xabc123...",
    "anchored_hash": "sha256:9f86d081...",
    "timestamp": "2025-01-01T00:00:00Z"
  },
  "owner_identity": "0x7f3a...b291"
}`,
  },
  {
    id: "blockchain",
    number: "07",
    title: "Blockchain Integration",
    color: "#8B5CF6",
    content: "HAP supports optional on-chain anchoring using a hybrid architecture. Compact cryptographic proofs go on-chain; actual creative assets go off-chain in a content-addressed system (IPFS).",
    subsections: [
      {
        title: "Stored On-Chain",
        body: "Hash of authorship data · Ownership reference · Timestamp · Creator wallet address",
      },
      {
        title: "Stored Off-Chain",
        body: "Audio files · Full prompt structures · Voice model data · Large creative datasets",
      },
      {
        title: "The Anchoring Process",
        body: "1. Finalize the record  -  all off-chain assets uploaded to IPFS, CIDs written into JSON.\n2. Hash the record  -  SHA-256 hash of canonical JSON computed.\n3. Write to chain  -  hash, creator wallet, and Unix timestamp written to smart contract.\n4. Store the record  -  complete JSON record uploaded to IPFS.",
      },
    ],
    table: {
      headers: ["Chain", "Pros", "Cons", "Recommended Use"],
      rows: [
        ["Guapcoin (EVM)", "Native HAP chain, low cost, EVM-compatible", "Purpose-built for HAP", "HAP authorship records - recommended"],
        ["Ethereum Mainnet", "Highest security, widest trust", "High gas costs", "High-value commercial works"],
        ["Polygon", "Low cost, EVM-compatible", "Less decentralized", "High-volume platforms"],
        ["Arweave", "Permanent storage built-in", "Different model, not EVM", "Archival / long-term records"],
        ["Base", "Low cost, Coinbase-backed, EVM", "Newer, less battle-tested", "Consumer apps, music platforms"],
      ],
      colors: ["#F59E0B", "#06B6D4", "#8B5CF6", "#10B981", "#EC4899"],
    },
  },
  {
    id: "ownership",
    number: "08",
    title: "Ownership Model",
    color: "#06B6D4",
    subsections: [
      {
        title: "8.1 Output Ownership",
        body: "The generated work  -  the final audio, image, or written piece produced by the AI system.",
      },
      {
        title: "8.2 System Ownership",
        body: "The recipe and creative framework  -  the human-designed process that guided the output. Recipes are ownable and licensable independently.",
      },
      {
        title: "8.3 Identity Ownership",
        body: "Voice and creator identity  -  the human's unique biometric contribution that can be licensed with granular permissions and revoked at any time.",
      },
    ],
  },
  {
    id: "monetization",
    number: "09",
    title: "Monetization Model",
    color: "#10B981",
    content: "HAP enables new economic models for creative work:",
    bullets: [
      "Recipe marketplaces  -  sell or license reusable creative systems independently of any output",
      "Voice licensing  -  monetize vocal identity under defined permissions (use case, expiry, jurisdiction)",
      "Contribution-based revenue sharing  -  revenue split proportional to HCS components",
      "Creative asset trading on decentralized platforms",
    ],
  },
  {
    id: "legal",
    number: "10",
    title: "Legal Framework",
    color: "#EF4444",
    subsections: [
      {
        title: "10.1 Copyright and AI-Generated Works",
        body: "The US Copyright Office has established that copyright requires human authorship. HAP's HCS and its components are designed to document the kind of human creative control that copyright frameworks look for.\n\nWorks in the Primary Human Authorship tier (0.80–1.00) are most likely to support a copyright claim. Works in the Collaborative Authorship tier (0.50–0.79) may support partial protection. Works below 0.50 are unlikely to qualify under current US standards.\n\nHAP is a documentation and attribution framework, not a legal service.",
      },
      {
        title: "10.2 Jurisdiction Considerations",
        body: "United States: The Copyright Office requires human authorship. HAP records document intentional creative decisions directly relevant to this standard.\n\nEuropean Union: EU copyright requires a work to be the \"author's own intellectual creation.\" HAP's Recipe and Input components map directly to this standard.\n\nUnited Kingdom: The CDPA s.9(3) provision grants copyright to the person who made the \"arrangements necessary\" for the creation. HAP's system-level authorship model aligns well with this framing.",
      },
      {
        title: "10.3 Voice Data and Biometric Privacy",
        body: "GDPR (EU/EEA): Biometric data is a \"special category\" under Article 9. Processing requires explicit consent and a DPIA.\n\nBIPA (Illinois, USA): Requires written informed consent before collecting voiceprints. Statutory damages: $1,000–$5,000 per violation.\n\nHAP's design response: Voice models stored off-chain and encrypted. On-chain record contains only a non-reversible hash. Platforms must implement a right-to-deletion workflow.",
        code: `"voice_permissions": {
  "licensed_uses": ["music_generation", "remix"],
  "prohibited_uses": ["advertising", "political_content"],
  "expiry": "2026-01-01T00:00:00Z",
  "revocable": true,
  "jurisdiction_restrictions": ["US", "EU"]
}`,
      },
      {
        title: "10.4 HAP Records as Legal Evidence",
        body: "What makes a HAP record legally useful: Timestamp integrity (on-chain anchoring proves creation date), Chain of custody (iteration history documents the process), Identity binding (owner wallet links record to a specific entity).\n\nWhat HAP records cannot do: They cannot prove that a human (rather than a script) made the documented decisions. They do not constitute legal proof of copyright ownership  -  they constitute evidence in support of a claim.",
      },
      {
        title: "10.5 Liability Boundaries",
        body: "HAP as a protocol does not assume liability for the legality of generated content, the accuracy of HCS scores as legal determinations, or the enforceability of voice licensing terms. Platforms implementing HAP are solely responsible for legal compliance in their operating jurisdictions.",
      },
    ],
  },
  {
    id: "offchain",
    number: "11",
    title: "Off-Chain Data Integrity",
    color: "#F59E0B",
    content: "HAP mandates content-addressed storage for all off-chain assets. The recommended implementation is IPFS, which assigns every file a CID (Content Identifier)  -  a cryptographic fingerprint. If a file changes by even a single byte, its CID changes, making tampering immediately detectable. Platforms must use an IPFS pinning service (e.g. Pinata, web3.storage) to guarantee off-chain asset persistence. Unpinned assets may be garbage collected and permanently lost.",
    subsections: [
      {
        title: "11.1 Deletion and Privacy Rights",
        body: "On-chain data (hash, wallet, timestamp) is never personal data under GDPR. Off-chain data can be deleted  -  the on-chain hash becomes an orphaned proof that something existed without revealing the content. This satisfies GDPR without requiring blockchain modification.\n\nVoice model deletion must be a one-click workflow that unpins IPFS data, revokes the CID in the platform index, and logs the deletion event.",
      },
    ],
  },
  {
    id: "disputes",
    number: "12",
    title: "Dispute Resolution",
    color: "#8B5CF6",
    content: "HAP defines a three-tier dispute resolution process for four dispute types: Ownership, Derivation, Voice Identity, and Contribution disputes.",
    callout: "In any ownership or derivation dispute, the earlier on-chain anchor takes precedence, unless evidence of fraud or bad faith registration is demonstrated.",
    subsections: [
      {
        title: "Tier 1  -  Automated Similarity Check (Platform Level)",
        body: "Before registration, the platform runs an automated similarity check. Recipes scoring above 85% similarity trigger a notification to both parties. Voice models above threshold trigger an identity verification request.",
      },
      {
        title: "Tier 2  -  Structured Mediation (HAP Registry Level)",
        body: "A formal Dispute Notice is submitted. The registered owner has 14 days to respond. A HAP Resolver reviews evidence and issues a recommendation within 21 days. Outcomes: Uphold, Transfer, Co-register, or Escalate. All proceedings logged on-chain.",
      },
      {
        title: "Tier 3  -  External Arbitration",
        body: "For unresolved or high-value disputes. HAP provides structured evidence packages to recognized arbitration bodies including WIPO, AAA, and the National Arbitration Forum.",
      },
      {
        title: "Anti-Gaming Protections",
        body: "Bad faith registration penalty: Voided registration and flagged account. Dispute filing stake: A nominal token deposit required, returned if upheld. Cooling-off period: 90-day bar on re-filing the same dispute without new evidence. Timestamps cannot be backdated: On-chain anchor is set at block confirmation.",
      },
      {
        title: "12.5 Dispute Record Schema",
        body: "All disputes generate a structured on-chain record:",
        code: `{
  "dispute_id": "hap_dispute_20250201_001",
  "disputed_record_id": "hap_record_20250101_001",
  "dispute_type": "ownership",
  "filed_by": "0xabc1...1234",
  "filed_against": "0x7f3a...b291",
  "filed_at": "2025-02-01T00:00:00Z",
  "status": "resolved",
  "tier": 2,
  "evidence_submitted": [
    "bafybeig...evidence001",
    "bafybeig...evidence002"
  ],
  "resolver_id": "hap_resolver_007",
  "recommendation": "uphold",
  "resolved_at": "2025-02-19T00:00:00Z",
  "onchain_anchor": {
    "chain": "polygon",
    "transaction_hash": "0xdisp789...",
    "timestamp": "2025-02-19T00:00:00Z"
  }
}`,
      },
      {
        title: "12.6 Collaboration and Split Attribution",
        body: "Multi-party works use a Collaboration Record. HCS components are attributed across multiple owner_identity addresses. Contribution shares must sum to 1.0. All collaborative works should have a signed attribution agreement stored as an off-chain document with its CID in the record.",
        code: `{
  "hap_version": "2.1",
  "record_id": "hap_collab_20250101_001",
  "collaboration": true,
  "contributors": [
    {
      "identity": "0x7f3a...b291",
      "role": "recipe_author",
      "hcs_components": { "recipe": 0.30, "iteration": 0.08 },
      "contribution_share": 0.55
    },
    {
      "identity": "0xabc1...1234",
      "role": "vocalist",
      "hcs_components": { "voice": 0.20, "inputs": 0.15, "curation": 0.10 },
      "contribution_share": 0.45
    }
  ],
  "total_hcs": 0.83,
  "hcs_tier": "collaborative_authorship",
  "attribution_agreement_cid": "bafybeig...agreement001"
}`,
      },
    ],
  },
  {
    id: "c2pa",
    number: "13",
    title: "Relationship to C2PA",
    color: "#06B6D4",
    content: "The C2PA (Coalition for Content Provenance and Authenticity) specification is an open technical standard for embedding content provenance metadata into media files. It is backed by Adobe, Microsoft, Google, Sony, and others. C2PA and HAP are complementary, not competing.",
    callout: "C2PA is the provenance layer  -  it tells you where a file came from. HAP is the authorship and ownership layer  -  it tells you who made the creative decisions and who owns the rights. C2PA is a shipping manifest. HAP is a deed of ownership.",
    comparisonTable: {
      headers: ["Dimension", "C2PA", "HAP"],
      rows: [
        ["Core question", "Where did this content come from?", "Who shaped this content, and how?"],
        ["Primary mechanism", "Signed manifest embedded in file", "Structured authorship record, on-chain anchored"],
        ["Human contribution", "Not measured", "Measured via HCS"],
        ["Creative system capture", "Not captured", "Recipe layer"],
        ["Voice identity", "Not addressed", "Voice layer with licensing"],
        ["Ownership model", "Not addressed", "Output, system, and identity ownership"],
        ["Monetization", "Not addressed", "Recipe marketplaces, voice licensing"],
        ["Blockchain", "Not used", "Optional on-chain anchoring"],
      ],
    },
    codeLabel: "c2pa-integration.json",
    codeBlock: `"c2pa": {
  "manifest_identifier": "urn:c2pa:manifest:abc123xyz",
  "claim_generator": "Adobe Firefly 3.0",
  "manifest_cid": "bafybeig...c2pa456",
  "verified": true
}`,
  },
  {
    id: "worked-example",
    number: "14",
    title: "Worked Example  -  AI-Assisted Music Track",
    color: "#10B981",
    content: "Jordan Ellis | Wallet: 0x7f3a...b291 | Domain: Music | Platform: SoundForge HAP",
    steps: [
      {
        number: "01",
        title: "Design a Recipe",
        body: "Jordan designs a reusable creative system: lo-fi hip hop, 70–85 BPM, minor key only, vinyl crackle texture required, melancholic tone, 4-layer maximum.\n\nUploaded to IPFS → CID: bafybeigdyrzt5...\nRegistered as: hap_recipe_v2_001\n\nEstablished: A reusable, timestamped, owned creative system  -  before any track is made.",
      },
      {
        number: "02",
        title: "Register Voice",
        body: "Jordan records vocal reference samples. Platform creates an encrypted voice model.\n\nRegistered as: hap_voice_creator_jordy_001\nPermissions: Music generation and remix permitted. Advertising, political, and adult content prohibited. Expires January 1, 2027. Revocable.\n\nEstablished: Vocal identity as a licensed asset generating royalty income independently of any track.",
      },
      {
        number: "03",
        title: "Provide Inputs",
        body: "Lyric file v1 and compositional note: \"Climax at 1:45; chorus vocal should feel distant, like a memory.\"\n\nEstablished: Explicit creative intent is documented and content-addressed.",
      },
      {
        number: "04",
        title: "AI Generation and Iteration",
        body: "v1  -  Rejected: \"Tempo too fast, loses the late-night feel.\"\nv2  -  Rejected: \"Chorus needs to feel further away  -  more reverb, lower in the mix.\"\nv3  -  Selected: \"This one. The space in the chorus is right. Keep.\"\n\nEstablished: Rejection decisions document creative judgment  -  not just the final output.",
      },
      {
        number: "05",
        title: "HCS Calculation",
        body: "Recipe (0.30) + Inputs (0.25) + Voice (0.20) + Iteration (0.15) + Curation (0.10) = 1.00\nHCS = 0.90 → Tier: Primary Human Authorship",
      },
      {
        number: "06",
        title: "On-Chain Anchoring",
        body: "1. Canonical JSON hashed: sha256:9f86d081...\n2. Hash + wallet + timestamp written to Polygon smart contract\n3. Transaction hash: 0xdef456...\n4. Complete record uploaded to IPFS\n\nEstablished: Permanent, publicly verifiable proof of authorship  -  tamper-evident and independently verifiable.",
      },
      {
        number: "07",
        title: "Monetization",
        body: "Three months later, a sync licensing platform finds the track:\n\n• Output license  -  rights to use the track in a film\n• Recipe license  -  a second producer licenses Jordan's recipe to make similar tracks\n• Voice license  -  a third party licenses Jordan's voice model for AI-generated harmonies\n\nAll three traceable to a single HAP record.",
      },
      {
        number: "08",
        title: "Dispute",
        body: "Another creator claims Jordan's recipe was derived from theirs (registered December 2024).\n\nTier 1: Automated similarity check returns 71%  -  below 85% threshold. No hold.\nTier 2: HAP Resolver reviews both records. Overlap attributed to shared genre conventions. Recommendation: Uphold Jordan's registration.\nResolved in 18 days. Dispute record logged on-chain.",
      },
    ],
  },
  {
    id: "schemas",
    number: "15",
    title: "Formal Schema Specification",
    color: "#06B6D4",
    content: "HAP v2.1 defines three canonical JSON schemas. Full machine-readable JSON Schema 2020-12 specifications are available at haphuman.xyz/schemas/v2.1/",
    subsections: [
      {
        title: "15.1 Authorship Record Schema",
        body: "The primary HAP record. Required fields: hap_version, record_id, domain_profile, hcs_components, contribution_score, hcs_tier, onchain_anchor, owner_identity.",
        code: `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://haphuman.xyz/schemas/v2.1/authorship-record.json",
  "title": "HAP Authorship Record",
  "type": "object",
  "required": ["hap_version","record_id","domain_profile","hcs_components",
               "contribution_score","hcs_tier","onchain_anchor","owner_identity"],
  "properties": {
    "hap_version": { "type": "string", "const": "2.1" },
    "record_id": { "type": "string" },
    "domain_profile": { "enum": ["music","visual_art","written_content","custom"] },
    "contribution_score": { "type": "number", "minimum": 0, "maximum": 1 },
    "hcs_tier": {
      "enum": ["primary_human_authorship","collaborative_authorship",
               "ai_assisted_creation","ai_generated"]
    },
    "hcs_components": {
      "type": "object",
      "properties": {
        "recipe":    { "type": "number", "minimum": 0, "maximum": 1 },
        "inputs":    { "type": "number", "minimum": 0, "maximum": 1 },
        "voice":     { "type": "number", "minimum": 0, "maximum": 1 },
        "iteration": { "type": "number", "minimum": 0, "maximum": 1 },
        "curation":  { "type": "number", "minimum": 0, "maximum": 1 }
      }
    }
  }
}`,
      },
      {
        title: "15.2 Dispute Record Schema",
        body: "Required fields: dispute_id, disputed_record_id, dispute_type, filed_by, filed_against, filed_at, status, tier.",
        code: `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://haphuman.xyz/schemas/v2.1/dispute-record.json",
  "title": "HAP Dispute Record",
  "type": "object",
  "required": ["dispute_id","disputed_record_id","dispute_type",
               "filed_by","filed_against","filed_at","status","tier"],
  "properties": {
    "dispute_type": {
      "enum": ["ownership","derivation","voice_identity","contribution"]
    },
    "status": {
      "enum": ["pending","under_review","resolved","escalated","withdrawn"]
    },
    "tier": { "type": "integer", "minimum": 1, "maximum": 3 },
    "recommendation": {
      "enum": ["uphold","transfer","co_register","escalate","dismissed"]
    }
  }
}`,
      },
      {
        title: "15.3 Collaboration Record Schema",
        body: "Extends the authorship record for multi-party works. The sum of all contributor contribution_share values must equal 1.0.",
        code: `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://haphuman.xyz/schemas/v2.1/collaboration-record.json",
  "title": "HAP Collaboration Record",
  "allOf": [{ "$ref": "authorship-record.json" }],
  "properties": {
    "collaboration": { "type": "boolean", "const": true },
    "contributors": {
      "type": "array",
      "minItems": 2,
      "items": {
        "type": "object",
        "required": ["identity","role","hcs_components","contribution_share"],
        "properties": {
          "identity":           { "type": "string" },
          "role":               { "type": "string" },
          "contribution_share": { "type": "number", "minimum": 0, "maximum": 1 },
          "hcs_components":     { "type": "object" }
        }
      }
    },
    "attribution_agreement_cid": { "type": "string" }
  }
}`,
      },
    ],
  },
  {
    id: "future",
    number: "16",
    title: "Future Directions",
    color: "#8B5CF6",
    bullets: [
      "Standardization across platforms via open API specification and SDK",
      "Integration with W3C Decentralized Identifiers (DIDs) for verified human identity binding",
      "Legal alignment with evolving copyright frameworks across jurisdictions",
      "Expansion of domain profiles beyond music, visual art, and written content",
      "Algorithmic HCS validation tools for platform implementers",
      "Cross-platform recipe and voice marketplaces",
    ],
  },
  {
    id: "conclusion",
    number: "17",
    title: "Conclusion",
    color: "#06B6D4",
    callout: "Authorship is not defined by output alone. It is defined by the system that creates it.",
    content: `HAP enables a future where human creativity remains central, even in an AI-driven world. By making the process measurable, verifiable, and monetizable, we ensure that human contribution is never lost in the age of artificial intelligence.`,
  },
  {
    id: "disclaimer",
    number: " - ",
    title: "Disclaimer",
    color: "#475569",
    disclaimer: "HAP is a documentation and attribution framework. It is not a legal service and does not provide legal advice. Nothing in this document constitutes legal, financial, or investment advice. Creators and platform implementers should consult qualified legal counsel regarding copyright, privacy, and regulatory compliance in their specific jurisdictions.",
  },
];

function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <div className="mt-4 rounded-xl overflow-hidden" style={{ background: "rgba(4,8,18,0.9)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="px-4 py-2 border-b border-slate-700/30 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-red-500/60" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
        <div className="w-2 h-2 rounded-full bg-green-500/60" />
        <span className="text-xs font-mono text-slate-600 ml-2">{label ?? "record.json"}</span>
      </div>
      <pre className="p-5 text-xs font-mono text-emerald-400 overflow-auto leading-relaxed">{code}</pre>
    </div>
  );
}

function SectionBlock({ section, index }: { section: Section; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.3) }}
      className="glass rounded-2xl p-8 mb-6"
      style={{ borderColor: `${section.color}18` }}
      id={section.id}
    >
      {/* Header */}
      <div className="flex items-baseline gap-4 mb-6">
        <span className="text-xs font-mono font-bold opacity-30" style={{ color: section.color }}>
          {section.number}
        </span>
        <h2 className="text-xl font-bold text-white">{section.title}</h2>
      </div>

      {/* Callout */}
      {section.callout && (
        <div className="rounded-xl px-5 py-4 mb-5 border-l-4" style={{ background: `${section.color}08`, borderColor: section.color }}>
          <p className="text-sm font-medium italic" style={{ color: section.color }}>&ldquo;{section.callout}&rdquo;</p>
        </div>
      )}

      {/* Content */}
      {section.content && (
        <div className="text-slate-400 leading-relaxed whitespace-pre-line mb-4">{section.content}</div>
      )}

      {/* Disclaimer */}
      {section.disclaimer && (
        <div className="rounded-xl px-5 py-4 border" style={{ background: "rgba(71,85,105,0.1)", borderColor: "rgba(71,85,105,0.3)" }}>
          <p className="text-sm text-slate-500 leading-relaxed">{section.disclaimer}</p>
        </div>
      )}

      {/* Subsections */}
      {section.subsections && (
        <div className="space-y-5 mt-4">
          {section.subsections.map((sub) => (
            <div key={sub.title} className="pl-4 border-l-2" style={{ borderColor: `${section.color}30` }}>
              <h3 className="text-sm font-bold mb-2" style={{ color: section.color }}>{sub.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">{sub.body}</p>
              {sub.code && <CodeBlock code={sub.code} />}
            </div>
          ))}
        </div>
      )}

      {/* Standard table */}
      {section.table && (
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-700/40">
          <table className="w-full text-sm font-mono">
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                {section.table.headers.map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs text-slate-500 font-bold uppercase tracking-widest whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, i) => (
                <tr key={row[0]} className="border-t border-slate-700/30">
                  <td className="px-4 py-3 font-medium whitespace-nowrap" style={{ color: section.table!.colors?.[i] ?? section.color }}>{row[0]}</td>
                  {row.slice(1).map((cell, j) => (
                    <td key={j} className="px-4 py-3 text-slate-400 text-xs leading-relaxed">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Comparison table */}
      {section.comparisonTable && (
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-700/40">
          <table className="w-full text-sm font-mono">
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                {section.comparisonTable.headers.map((h, i) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest whitespace-nowrap"
                    style={{ color: i === 1 ? "#475569" : i === 2 ? "#06B6D4" : "#64748b" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.comparisonTable.rows.map((row) => (
                <tr key={row[0]} className="border-t border-slate-700/30">
                  <td className="px-4 py-3 text-slate-500 text-xs font-medium whitespace-nowrap">{row[0]}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs leading-relaxed">{row[1]}</td>
                  <td className="px-4 py-3 text-cyan-400 text-xs leading-relaxed">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Code block */}
      {section.codeBlock && <CodeBlock code={section.codeBlock} label={section.codeLabel} />}

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

      {/* Steps */}
      {section.steps && (
        <div className="mt-4 space-y-4">
          {section.steps.map((step) => (
            <div key={step.number} className="rounded-xl p-5" style={{ background: `${section.color}06`, border: `1px solid ${section.color}15` }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono shrink-0"
                  style={{ background: `${section.color}20`, color: section.color }}>
                  {step.number}
                </div>
                <h4 className="text-sm font-bold text-white">{step.title}</h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line pl-10">{step.body}</p>
              {step.code && <div className="pl-10 mt-2"><CodeBlock code={step.code} /></div>}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function WhitepaperPage() {
  return (
    <main className="relative min-h-screen">
      <CopyForLLM />
      <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-5"
          style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)" }} />
      </div>

      <Navbar />

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-16 relative z-10">
        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-10">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-mono text-slate-500 hover:text-cyan-400 transition-colors">
            <ArrowLeft size={14} />
            Back to Protocol
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-cyan-500/60" />
            <span className="text-xs font-mono text-cyan-400/80 tracking-widest uppercase">Whitepaper · v2.1</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Human Authorship<br /><span className="gradient-text">Protocol</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed mb-8">
            A technical framework for defining, measuring, and verifying human creative contribution within AI-assisted works  -  including legal considerations, dispute resolution, blockchain architecture, and C2PA integration.
          </p>
          <div className="flex flex-wrap gap-3">
            {[["Published", "2026"], ["Version", "2.1"], ["Status", "Open Standard"], ["Author", "Aquarius Maximus"]].map(([k, v]) => (
              <div key={k} className="glass rounded-xl px-4 py-2 text-xs font-mono">
                <span className="text-slate-600">{k}: </span>
                <span className="text-slate-300">{v}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Table of contents */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6 mb-12">
          <h2 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-widest mb-4">Table of Contents</h2>
          <div className="grid sm:grid-cols-2 gap-1">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`}
                className="flex items-center gap-3 text-sm font-mono text-slate-400 hover:text-cyan-400 transition-colors py-1">
                <span className="text-xs opacity-40 w-6 shrink-0" style={{ color: s.color }}>{s.number}</span>
                {s.title}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Sections */}
        {sections.map((section, i) => (
          <SectionBlock key={section.id} section={section} index={i} />
        ))}

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-1 py-1 rounded-2xl"
            style={{ background: "linear-gradient(135deg, #06B6D4, #8B5CF6)" }}>
            <Link href="/#join"
              className="flex items-center gap-2 px-6 py-3 rounded-[14px] bg-bg-primary text-white font-bold text-sm font-mono hover:bg-transparent transition-colors duration-300">
              Join the Protocol <ExternalLink size={14} />
            </Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
