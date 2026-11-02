import { NextRequest, NextResponse } from "next/server";
import { recordSnapshotSchema } from "@/lib/hap/validation";
import { canonicalRecordJSON } from "@/lib/hap/hash";
import { calculateHCS } from "@/lib/hap/hcs";
import { pinRecord } from "@/lib/hap/ipfs";

export async function POST(req: NextRequest) {
  let body;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "Expected a JSON record." }, { status: 400 }); }
  const parsed = recordSnapshotSchema.safeParse(body?.record);
  if (!parsed.success) return NextResponse.json({ error: "Invalid record snapshot.", details: parsed.error.flatten() }, { status: 400 });
  // Reject normalization or silently dropped fields: pin exactly the reviewed snapshot.
  if (canonicalRecordJSON(parsed.data) !== canonicalRecordJSON(body.record)) {
    return NextResponse.json({ error: "The snapshot contains unsupported or missing fields. Use the original generated record without adding publication metadata." }, { status: 400 });
  }
  const calculated = calculateHCS(parsed.data);
  if (calculated.score !== parsed.data.contribution_score || calculated.tier !== parsed.data.hcs_tier || canonicalRecordJSON(calculated.components) !== canonicalRecordJSON(parsed.data.hcs_components) || parsed.data.curation.hcs_contribution !== calculated.components.curation) {
    return NextResponse.json({ error: "The snapshot score does not match its inputs. Generate a new record after editing inputs." }, { status: 400 });
  }
  if (!process.env.PINATA_JWT) return NextResponse.json({ error: "Public storage is not configured. Your record is still available to copy." }, { status: 503 });
  try {
    const ipfs_cid = await pinRecord(parsed.data);
    return NextResponse.json({ record_id: parsed.data.record_id, ipfs_cid });
  } catch (error) {
    console.error("Snapshot publication failed:", error);
    return NextResponse.json({ error: "Publication failed. Your record is unchanged; please try again." }, { status: 502 });
  }
}
