import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// Requires DATABASE_URL env var set in Vercel (Neon connection string)
const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: NextRequest) {
  try {
    const { email, role } = await req.json();

    if (!email || !role) {
      return NextResponse.json({ error: "Email and role are required" }, { status: 400 });
    }

    // Check for duplicate
    const existing = await sql`SELECT id FROM waitlist WHERE email = ${email}`;
    if (existing.length > 0) {
      return NextResponse.json({ error: "Already registered" }, { status: 409 });
    }

    await sql`INSERT INTO waitlist (email, role) VALUES (${email}, ${role})`;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("join error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
