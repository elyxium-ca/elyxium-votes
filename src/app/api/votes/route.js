export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getSiteFromRequestUrl, getSiteFromReferer } from "@/lib/getSite";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const siteFromQuery = url.searchParams.get("site");
    let site =
      siteFromQuery ||
      getSiteFromReferer(req) ||
      getSiteFromRequestUrl(req) ||
      "default";

    const rows = await sql/*sql*/`
      SELECT item_id, COUNT(*)::int AS count
      FROM pitch.votes
      WHERE site_slug = ${site}
      GROUP BY item_id
      ORDER BY count DESC
    `;

    return NextResponse.json(rows);
  } catch (err) {
    console.error("votes aggregate error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
