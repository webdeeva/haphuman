// GET /api/v1/records/[id] — fetch a record by IPFS CID or record_id

import { NextRequest, NextResponse } from "next/server";
import { fetchRecord } from "@/lib/hap/ipfs";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // If it looks like a CID (starts with baf or Qm), fetch from IPFS
  if (id.startsWith("baf") || id.startsWith("Qm")) {
    try {
      const record = await fetchRecord(id);
      return NextResponse.json({ record });
    } catch (err) {
      console.error("IPFS fetch error:", err);
      return NextResponse.json({ error: "Record not found on IPFS" }, { status: 404 });
    }
  }

  // Otherwise we'd query a DB — for MVP, return not implemented
  return NextResponse.json(
    { error: "Direct record lookup requires IPFS CID. Pass the CID returned at creation." },
    { status: 400 }
  );
}
