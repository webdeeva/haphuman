// POST /api/v1/records — create a HAP record, optionally pin to IPFS

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { assembleRecord } from "@/lib/hap/record";
import { pinRecord } from "@/lib/hap/ipfs";
import type { CreateRecordRequest } from "@/lib/hap/types";

const voicePermissionsSchema = z.object({
  licensed_uses: z.array(z.string()).default([]),
  prohibited_uses: z.array(z.string()).default([]),
  expiry: z.string(),
  revocable: z.boolean().default(true),
});

const schema = z.object({
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data as CreateRecordRequest & { pin_to_ipfs: boolean };
    const record = assembleRecord(data);

    let ipfs_cid: string | undefined;

    if (data.pin_to_ipfs) {
      try {
        ipfs_cid = await pinRecord(record);
        record.ipfs_cid = ipfs_cid;
      } catch (err) {
        console.error("IPFS pin failed:", err);
        // Don't fail the whole request — record is still valid without IPFS
      }
    }

    return NextResponse.json({ record, ipfs_cid }, { status: 201 });
  } catch (err) {
    console.error("POST /api/v1/records error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
