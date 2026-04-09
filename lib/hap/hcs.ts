// HAP v2.1 — HCS Calculation Engine

import type { HCSComponents, HCSTier, DomainProfile, HAPRecord } from "./types";

// Default weights per domain profile
export const DOMAIN_WEIGHTS: Record<DomainProfile, HCSComponents> = {
  music: {
    recipe: 0.30,
    inputs: 0.25,
    voice: 0.20,
    iteration: 0.15,
    curation: 0.10,
  },
  visual_art: {
    recipe: 0.35,
    inputs: 0.20,
    voice: 0.05,
    iteration: 0.25,
    curation: 0.15,
  },
  written_content: {
    recipe: 0.25,
    inputs: 0.40,
    voice: 0.05,
    iteration: 0.20,
    curation: 0.10,
  },
};

// Presence multipliers — components are only counted if substantively filled
function recipePresence(recipe: HAPRecord["recipe"]): number {
  let score = 0;
  if (recipe.style) score += 0.3;
  if (recipe.structure) score += 0.2;
  if (recipe.tone) score += 0.2;
  if (recipe.bpm_min || recipe.bpm_max) score += 0.15;
  if (recipe.key) score += 0.1;
  if ((recipe.constraints ?? []).length > 0) score += 0.05;
  return Math.min(score, 1);
}

function voicePresence(voice: HAPRecord["voice"]): number {
  if (!voice.voice_id) return 0;
  let score = 0.4;
  if ((voice.voice_permissions.licensed_uses ?? []).length > 0) score += 0.3;
  if ((voice.voice_permissions.prohibited_uses ?? []).length > 0) score += 0.2;
  if (voice.voice_permissions.expiry) score += 0.1;
  return Math.min(score, 1);
}

function inputsPresence(inputs: HAPRecord["inputs"]): number {
  let score = 0;
  if ((inputs.lyrics ?? "").length > 20) score += 0.5;
  if ((inputs.note ?? "").length > 10) score += 0.3;
  if (inputs.intent) score += 0.2;
  return Math.min(score, 1);
}

function iterationPresence(iterations: HAPRecord["iterations"]): number {
  if (iterations.length === 0) return 0;
  const hasRejections = iterations.some((i) => !i.selected);
  const hasNotes = iterations.every((i) => i.notes.length > 5);
  let score = Math.min(iterations.length * 0.25, 0.75);
  if (hasRejections) score += 0.15;
  if (hasNotes) score += 0.10;
  return Math.min(score, 1);
}

function curationPresence(curation: HAPRecord["curation"]): number {
  if (curation.decision === "primary_keep") return 1;
  if (curation.decision === "archive") return 0.5;
  return 0.2;
}

export function calculateHCS(record: HAPRecord): {
  components: HCSComponents;
  score: number;
  tier: HCSTier;
} {
  const weights = DOMAIN_WEIGHTS[record.domain_profile];

  const components: HCSComponents = {
    recipe: weights.recipe * recipePresence(record.recipe),
    voice: weights.voice * voicePresence(record.voice),
    inputs: weights.inputs * inputsPresence(record.inputs),
    iteration: weights.iteration * iterationPresence(record.iterations),
    curation: weights.curation * curationPresence(record.curation),
  };

  const score = parseFloat(
    (
      components.recipe +
      components.voice +
      components.inputs +
      components.iteration +
      components.curation
    ).toFixed(2)
  );

  const tier = scoreTier(score);

  return { components, score, tier };
}

export function scoreTier(score: number): HCSTier {
  if (score >= 0.8) return "primary_human_authorship";
  if (score >= 0.5) return "collaborative_authorship";
  if (score >= 0.2) return "ai_assisted_creation";
  return "ai_generated";
}

export function tierLabel(tier: HCSTier): string {
  const labels: Record<HCSTier, string> = {
    primary_human_authorship: "Primary Human Authorship",
    collaborative_authorship: "Collaborative Authorship",
    ai_assisted_creation: "AI-Assisted Creation",
    ai_generated: "AI-Generated",
  };
  return labels[tier];
}

export function tierColor(tier: HCSTier): string {
  const colors: Record<HCSTier, string> = {
    primary_human_authorship: "#10B981",
    collaborative_authorship: "#06B6D4",
    ai_assisted_creation: "#F59E0B",
    ai_generated: "#475569",
  };
  return colors[tier];
}
