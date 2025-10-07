export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getSiteFromRequest } from "@/lib/getSite";

export async function POST(req) {
  try {
    const { itemId, userHash } = await req.json();
    if (!itemId) return NextResponse.json({ error: "Missing itemId" }, { status: 400 });

    const site = getSiteFromRequest(req);            // <-- here
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
    const ua = req.headers.get("user-agent") || null;

    await sql/*sql*/`
      INSERT INTO pitch.votes (site_slug, item_id, user_hash, ip, user_agent)
      VALUES (${site}, ${itemId}, ${userHash ?? null}, ${ip}, ${ua})
    `;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("vote error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
