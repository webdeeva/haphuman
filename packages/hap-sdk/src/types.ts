// @hap/sdk — Types (zero runtime dependencies, mirrors lib/hap/types.ts)

export type DomainProfile = "music" | "visual_art" | "written_content";

export type HCSTier =
  | "primary_human_authorship"
  | "collaborative_authorship"
  | "ai_assisted_creation"
  | "ai_generated";

export interface HAPRecipe {
  recipe_id: string;
  style: string;
  structure?: string;
  tone?: string;
  bpm_min?: number;
  bpm_max?: number;
  key?: string;
  mode?: "major" | "minor";
  constraints?: string[];
  recipe_cid?: string;
}

export interface VoicePermissions {
  licensed_uses: string[];
  prohibited_uses: string[];
  expiry: string;
  revocable: boolean;
}

export interface HAPVoice {
  voice_id: string;
  voice_permissions: VoicePermissions;
}

export interface HAPInputs {
  lyrics?: string;
  note?: string;
  intent?: string;
}

export interface HAPIteration {
  version: string;
  selected: boolean;
  notes: string;
  timestamp?: string;
}

export interface HAPCuration {
  selected_cid?: string;
  decision: "primary_keep" | "archive" | "discard";
  hcs_contribution: number;
  timestamp: string;
}

export interface HCSComponents {
  recipe: number;
  inputs: number;
  voice: number;
  iteration: number;
  curation: number;
}

export interface OnChainAnchor {
  chain: string;
  chain_id: number;
  transaction_hash: string;
  anchored_hash: string;
  timestamp: string;
  block_number?: number;
}

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
  ipfs_cid?: string;
  onchain_anchor?: OnChainAnchor;
  owner_identity?: string;
}

export interface CreateRecordRequest {
  domain_profile?: DomainProfile;
  recipe: Omit<HAPRecipe, "recipe_id" | "recipe_cid">;
  voice: HAPVoice;
  inputs?: HAPInputs;
  iterations?: HAPIteration[];
  curation?: Partial<HAPCuration>;
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

export interface HAPClientOptions {
  baseUrl: string;
  apiKey?: string;
}
