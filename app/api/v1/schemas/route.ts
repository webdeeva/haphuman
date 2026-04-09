// GET /api/v1/schemas — serve the HAP JSON Schema 2020-12 spec

import { NextResponse } from "next/server";

const AUTHORSHIP_SCHEMA = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://haphuman.xyz/schemas/v2.1/authorship-record.json",
  "title": "HAP Authorship Record",
  "type": "object",
  "required": ["hap_version", "record_id", "domain_profile", "recipe", "voice", "hcs_components", "contribution_score", "hcs_tier"],
  "properties": {
    "hap_version": { "const": "2.1" },
    "record_id": { "type": "string", "pattern": "^hap_record_[0-9]{8}_[a-f0-9]+$" },
    "domain_profile": { "enum": ["music", "visual_art", "written_content"] },
    "created_at": { "type": "string", "format": "date-time" },
    "recipe": {
      "type": "object",
      "required": ["recipe_id", "style"],
      "properties": {
        "recipe_id": { "type": "string" },
        "style": { "type": "string" },
        "structure": { "type": "string" },
        "tone": { "type": "string" },
        "bpm_min": { "type": "number" },
        "bpm_max": { "type": "number" },
        "key": { "type": "string" },
        "mode": { "enum": ["major", "minor"] },
        "constraints": { "type": "array", "items": { "type": "string" } },
        "recipe_cid": { "type": "string" }
      }
    },
    "voice": {
      "type": "object",
      "required": ["voice_id", "voice_permissions"],
      "properties": {
        "voice_id": { "type": "string" },
        "voice_permissions": {
          "type": "object",
          "required": ["licensed_uses", "prohibited_uses", "expiry", "revocable"],
          "properties": {
            "licensed_uses": { "type": "array", "items": { "type": "string" } },
            "prohibited_uses": { "type": "array", "items": { "type": "string" } },
            "expiry": { "type": "string", "format": "date-time" },
            "revocable": { "type": "boolean" }
          }
        }
      }
    },
    "inputs": {
      "type": "object",
      "properties": {
        "lyrics": { "type": "string" },
        "note": { "type": "string" },
        "intent": { "type": "string" }
      }
    },
    "iterations": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["version", "selected", "notes"],
        "properties": {
          "version": { "type": "string" },
          "selected": { "type": "boolean" },
          "notes": { "type": "string" },
          "timestamp": { "type": "string", "format": "date-time" }
        }
      }
    },
    "curation": {
      "type": "object",
      "required": ["decision", "timestamp"],
      "properties": {
        "decision": { "enum": ["primary_keep", "archive", "discard"] },
        "selected_cid": { "type": "string" },
        "hcs_contribution": { "type": "number" },
        "timestamp": { "type": "string", "format": "date-time" }
      }
    },
    "hcs_components": {
      "type": "object",
      "required": ["recipe", "inputs", "voice", "iteration", "curation"],
      "properties": {
        "recipe":    { "type": "number", "minimum": 0, "maximum": 1 },
        "inputs":    { "type": "number", "minimum": 0, "maximum": 1 },
        "voice":     { "type": "number", "minimum": 0, "maximum": 1 },
        "iteration": { "type": "number", "minimum": 0, "maximum": 1 },
        "curation":  { "type": "number", "minimum": 0, "maximum": 1 }
      }
    },
    "contribution_score": { "type": "number", "minimum": 0, "maximum": 1 },
    "hcs_tier": { "enum": ["primary_human_authorship", "collaborative_authorship", "ai_assisted_creation", "ai_generated"] },
    "ipfs_cid": { "type": "string" },
    "onchain_anchor": {
      "type": "object",
      "properties": {
        "chain": { "type": "string" },
        "chain_id": { "type": "number" },
        "transaction_hash": { "type": "string" },
        "anchored_hash": { "type": "string" },
        "timestamp": { "type": "string", "format": "date-time" },
        "block_number": { "type": "number" }
      }
    },
    "owner_identity": { "type": "string" }
  }
};

export async function GET() {
  return NextResponse.json(AUTHORSHIP_SCHEMA, {
    headers: {
      "Content-Type": "application/schema+json",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
