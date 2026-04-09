// Diagnostic endpoint — remove after debugging
import { NextResponse } from "next/server";

export async function GET() {
  const jwt = process.env.PINATA_JWT;
  if (!jwt) return NextResponse.json({ pinata: "JWT_MISSING" });

  try {
    const res = await fetch("https://api.pinata.cloud/data/testAuthentication", {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    const body = await res.json();
    return NextResponse.json({ pinata: res.status === 200 ? "OK" : "FAIL", status: res.status, body });
  } catch (err) {
    return NextResponse.json({ pinata: "FETCH_ERROR", error: String(err) });
  }
}
