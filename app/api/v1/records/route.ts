// POST /api/v1/records — create a HAP record, optionally pin to IPFS

import { NextRequest, NextResponse } from "next/server";
import { createRecordSchema } from "@/lib/hap/validation";
import { assembleRecord } from "@/lib/hap/record";
import { pinRecord } from "@/lib/hap/ipfs";
import type { CreateRecordRequest } from "@/lib/hap/types";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = createRecordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data as CreateRecordRequest & { pin_to_ipfs: boolean };
    const record = assembleRecord(data);

    let ipfs_cid: string | undefined;
    let publication_error: string | undefined;

    if (data.pin_to_ipfs) {
      try {
        ipfs_cid = await pinRecord(record);
        record.ipfs_cid = ipfs_cid;
      } catch (err) {
        console.error("IPFS pin failed:", err);
        publication_error = "Record created, but publication failed. Copy the record and try publishing again.";
      }
    }

    return NextResponse.json({ record, ipfs_cid, publication_error }, { status: 201 });
  } catch (err) {
    console.error("POST /api/v1/records error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
