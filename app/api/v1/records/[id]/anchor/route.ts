// POST /api/v1/records/[id]/anchor — anchor an existing record to Guapcoin

import { NextRequest, NextResponse } from "next/server";
import { fetchRecord } from "@/lib/hap/ipfs";
import { anchorOnGuapcoin } from "@/lib/hap/chain";
import type { AnchorRecordResponse } from "@/lib/hap/types";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // id here is the IPFS CID
  if (!id.startsWith("baf") && !id.startsWith("Qm")) {
    return NextResponse.json(
      { error: "id must be an IPFS CID (starts with baf or Qm)" },
      { status: 400 }
    );
  }

  try {
    // Fetch the record from IPFS
    const record = await fetchRecord(id);

    // Anchor on Guapcoin
    const result = await anchorOnGuapcoin(record, id);

    const response: AnchorRecordResponse = {
      record_id: record.record_id,
      transaction_hash: result.transaction_hash,
      anchored_hash: result.anchored_hash,
      chain_id: 71111,
      block_number: result.block_number,
      timestamp: result.timestamp,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Anchor error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
