// HAP v2.1 — Record factory

import { createHash } from "crypto";
import { v4 as uuidv4 } from "uuid";
import { calculateHCS } from "./hcs";
import type {
  HAPRecord,
  CreateRecordRequest,
  HAPIteration,
  HAPCuration,
} from "./types";

export function buildRecordId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const short = uuidv4().split("-")[0];
  return `hap_record_${date}_${short}`;
}

export function buildRecipeId(): string {
  const short = uuidv4().split("-")[0];
  return `hap_recipe_${short}`;
}

export function hashRecord(record: HAPRecord): string {
  const json = JSON.stringify(record, Object.keys(record).sort());
  return "sha256:" + createHash("sha256").update(json).digest("hex");
}

export function assembleRecord(req: CreateRecordRequest): HAPRecord {
  const now = new Date().toISOString();

  // Ensure curation has a timestamp
  const curation: HAPCuration = {
    decision: req.curation.decision ?? "primary_keep",
    selected_cid: req.curation.selected_cid,
    hcs_contribution: 0, // filled by HCS engine below
    timestamp: req.curation.timestamp ?? now,
  };

  // Normalise iterations timestamps
  const iterations: HAPIteration[] = req.iterations.map((it) => ({
    ...it,
    timestamp: it.timestamp ?? now,
  }));

  const partial: HAPRecord = {
    hap_version: "2.1",
    record_id: buildRecordId(),
    domain_profile: req.domain_profile,
    created_at: now,
    recipe: {
      recipe_id: buildRecipeId(),
      ...req.recipe,
    },
    voice: req.voice,
    inputs: req.inputs,
    iterations,
    curation,
    hcs_components: { recipe: 0, inputs: 0, voice: 0, iteration: 0, curation: 0 },
    contribution_score: 0,
    hcs_tier: "ai_generated",
    owner_identity: req.owner_identity,
  };

  const { components, score, tier } = calculateHCS(partial);

  partial.hcs_components = components;
  partial.curation.hcs_contribution = components.curation;
  partial.contribution_score = score;
  partial.hcs_tier = tier;

  return partial;
}
