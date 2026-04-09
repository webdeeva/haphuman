// Diagnostic endpoint — remove after debugging
import { NextResponse } from "next/server";

export async function GET() {
  const jwt = process.env.PINATA_JWT;
  if (!jwt) return NextResponse.json({ pinata: "JWT_MISSING" });

  // Test a real pin call with a tiny payload
  try {
    const body = {
      pinataContent: { test: true, ts: Date.now() },
      pinataMetadata: { name: "hap_diagnostic_test" },
      pinataOptions: { cidVersion: 1 },
    };

    const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json({ status: res.status, data });
  } catch (err) {
    return NextResponse.json({ pinata: "FETCH_ERROR", error: String(err) });
  }
}
