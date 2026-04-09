// Diagnostic endpoint — remove after debugging
import { NextResponse } from "next/server";

export async function GET() {
  const rawKey = process.env.GUAPCOIN_PRIVATE_KEY ?? "";
  const keyDiag = { raw_length: rawKey.length, trimmed_length: rawKey.trim().length, starts_with_0x: rawKey.startsWith("0x") };

  const jwt = process.env.PINATA_JWT;
  if (!jwt) return NextResponse.json({ pinata: "JWT_MISSING", key: keyDiag });

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
    return NextResponse.json({ status: res.status, data, key: keyDiag });
  } catch (err) {
    return NextResponse.json({ pinata: "FETCH_ERROR", error: String(err) });
  }
}
