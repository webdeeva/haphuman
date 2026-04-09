// HAP v2.1 — Core TypeScript types
// These are the canonical types used across the API, SDK, and Studio

export type DomainProfile = "music" | "visual_art" | "written_content";

export type HCSTier =
  | "primary_human_authorship"
  | "collaborative_authorship"
  | "ai_assisted_creation"
  | "ai_generated";

// ─── Recipe ──────────────────────────────────────────────────────────────────

export interface HAPRecipe {
  recipe_id: string;
  style: string;
  structure: string;
  tone: string;
  bpm_min?: number;
  bpm_max?: number;
  key?: string;
  mode?: "major" | "minor";
  constraints?: string[];
  recipe_cid?: string; // IPFS CID after pinning
}

// ─── Voice ───────────────────────────────────────────────────────────────────

export interface VoicePermissions {
  licensed_uses: string[];
  prohibited_uses: string[];
  expiry: string; // ISO 8601
  revocable: boolean;
}

export interface HAPVoice {
  voice_id: string;
  voice_permissions: VoicePermissions;
}

// ─── Inputs ──────────────────────────────────────────────────────────────────

export interface HAPInputs {
  lyrics?: string;
  note?: string;
  intent?: string;
  edits?: { line: number; action: string }[];
}

// ─── Iteration ───────────────────────────────────────────────────────────────

export interface HAPIteration {
  version: string;
  selected: boolean;
  notes: string;
  timestamp?: string;
}

// ─── Curation ────────────────────────────────────────────────────────────────

export interface HAPCuration {
  selected_cid?: string; // CID of the chosen output file
  decision: "primary_keep" | "archive" | "discard";
  hcs_contribution: number;
  timestamp: string;
}

// ─── HCS Components ──────────────────────────────────────────────────────────

export interface HCSComponents {
  recipe: number;
  inputs: number;
  voice: number;
  iteration: number;
  curation: number;
}

// ─── On-chain anchor ─────────────────────────────────────────────────────────

export interface OnChainAnchor {
  chain: string;
  chain_id: number;
  transaction_hash: string;
  anchored_hash: string; // sha256 of the record JSON
  timestamp: string;
  block_number?: number;
}

// ─── Full HAP Record ─────────────────────────────────────────────────────────

export interface HAPRecord {
  hap_version: "2.1";
  record_id: string;
  domain_profile: DomainProfile;
  created_at: string;
  recipe: HAPRecipe;
  voice: HAPVoice;
  inputs: HAPInputs;
  iterations: HAPIteration[];
  curation: HAPCuration;
  hcs_components: HCSComponents;
  contribution_score: number;
  hcs_tier: HCSTier;
  ipfs_cid?: string; // CID of the full record pinned to IPFS
  onchain_anchor?: OnChainAnchor;
  owner_identity?: string; // wallet address
}

// ─── API request/response shapes ─────────────────────────────────────────────

export interface CreateRecordRequest {
  domain_profile: DomainProfile;
  recipe: Omit<HAPRecipe, "recipe_id" | "recipe_cid">;
  voice: HAPVoice;
  inputs: HAPInputs;
  iterations: HAPIteration[];
  curation: Omit<HAPCuration, "hcs_contribution">;
  owner_identity?: string;
  pin_to_ipfs?: boolean;
}

export interface CreateRecordResponse {
  record: HAPRecord;
  ipfs_cid?: string;
}

export interface AnchorRecordResponse {
  record_id: string;
  transaction_hash: string;
  anchored_hash: string;
  chain_id: number;
  block_number?: number;
  timestamp: string;
}

// ─── Studio wizard state ──────────────────────────────────────────────────────

export interface StudioVoiceState {
  voice_id?: string;
  voice_permissions: Partial<VoicePermissions>;
}

export interface StudioState {
  step: number;
  recipe: Partial<HAPRecipe>;
  voice: StudioVoiceState;
  inputs: HAPInputs;
  iterations: HAPIteration[];
  curation: Partial<HAPCuration>;
}
