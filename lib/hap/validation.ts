import { z } from "zod";

const voicePermissionsSchema = z.object({
  licensed_uses: z.array(z.string()).default([]),
  prohibited_uses: z.array(z.string()).default([]),
  expiry: z.string().default(""),
  revocable: z.boolean().default(true),
});

export const createRecordSchema = z.object({
  domain_profile: z.enum(["music", "visual_art", "written_content"]).default("music"),
  recipe: z.object({
    style: z.string().min(1),
    structure: z.string().default(""),
    tone: z.string().default(""),
    bpm_min: z.number().optional(),
    bpm_max: z.number().optional(),
    key: z.string().optional(),
    mode: z.enum(["major", "minor"]).optional(),
    constraints: z.array(z.string()).default([]),
  }),
  voice: z.object({
    voice_id: z.string(),
    voice_permissions: voicePermissionsSchema,
  }),
  inputs: z.object({
    knowledge_context: z.object({
      schema_version: z.literal("1.0"),
      domain_expertise: z.string().optional(),
      sources: z.array(z.object({
        title: z.string().trim().min(1),
        kind: z.enum(["original_writing", "dataset", "lecture", "knowledge_base", "training_material", "other"]),
        relationship: z.enum(["own_work", "licensed", "public_domain", "third_party"]),
        reference: z.string().optional(),
        contribution: z.string().optional(),
      })),
      ai_methods: z.array(z.enum(["context", "retrieval", "instructions", "fine_tuning", "other"])),
      preparation: z.string().optional(),
      ai_system: z.string().optional(),
      human_role: z.string().optional(),
      ai_role: z.string().optional(),
    }).optional(),
    text: z.string().optional(),
    lyrics: z.string().optional(),
    note: z.string().optional(),
    intent: z.string().optional(),
    edits: z.array(z.object({ line: z.number(), action: z.string() })).optional(),
  }).default({}),
  iterations: z.array(z.object({
    version: z.string(),
    selected: z.boolean(),
    notes: z.string(),
    timestamp: z.string().optional(),
  })).default([]),
  curation: z.object({
    decision: z.enum(["primary_keep", "archive", "discard"]).default("primary_keep"),
    selected_cid: z.string().optional(),
    timestamp: z.string().optional(),
  }).default({ decision: "primary_keep" }),
  owner_identity: z.string().optional(),
  pin_to_ipfs: z.boolean().default(false),
}).superRefine((data, ctx) => {
  if (data.domain_profile === "music" && !data.voice.voice_id.trim()) {
    ctx.addIssue({ code: "custom", path: ["voice", "voice_id"], message: "A voice identifier is required for the music profile." });
  }
});


// Validate a completed snapshot without rebuilding its identity or timestamps.
export const recordSnapshotSchema = z.object({
  hap_version: z.literal("2.1"),
  record_id: z.string().regex(/^hap_record_[0-9]{8}_[a-f0-9]+$/),
  domain_profile: z.enum(["music", "visual_art", "written_content"]),
  created_at: z.iso.datetime(),
  recipe: createRecordSchema.shape.recipe.extend({ recipe_id: z.string().min(1), recipe_cid: z.string().optional() }),
  voice: createRecordSchema.shape.voice,
  inputs: createRecordSchema.shape.inputs,
  iterations: createRecordSchema.shape.iterations,
  curation: z.object({
    decision: z.enum(["primary_keep", "archive", "discard"]),
    selected_cid: z.string().optional(),
    timestamp: z.iso.datetime(),
    hcs_contribution: z.number().min(0).max(1),
  }),
  hcs_components: z.object({ recipe: z.number().min(0).max(1), inputs: z.number().min(0).max(1), voice: z.number().min(0).max(1), iteration: z.number().min(0).max(1), curation: z.number().min(0).max(1) }),
  contribution_score: z.number().min(0).max(1),
  hcs_tier: z.enum(["primary_human_authorship", "collaborative_authorship", "ai_assisted_creation", "ai_generated"]),
  owner_identity: z.string().optional(),
});
