export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getSiteFromRequestUrl, getSiteFromReferer } from "@/lib/getSite";

export async function POST(req) {
  try {
    const body = await req.json();
    const { itemId, userHash, site: siteFromBody } = body || {};
    if (!itemId) return NextResponse.json({ error: "Missing itemId" }, { status: 400 });

    // 1) body.site (authoritative from client) -> 2) ?site= -> 3) Referer -> 4) host only -> 'default'
    const url = new URL(req.url);
    const siteFromQuery = url.searchParams.get("site");
    let site =
      siteFromBody ||
      siteFromQuery ||
      getSiteFromReferer(req) ||
      getSiteFromRequestUrl(req) ||
      "default";

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
    const ua = req.headers.get("user-agent") || null;

    await sql/*sql*/`
      INSERT INTO pitch.votes (site_slug, item_id, user_hash, ip, user_agent)
      VALUES (${site}, ${itemId}, ${userHash ?? null}, ${ip}, ${ua})
    `;

    return NextResponse.json({ ok: true, site });
  } catch (err) {
    console.error("vote error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
