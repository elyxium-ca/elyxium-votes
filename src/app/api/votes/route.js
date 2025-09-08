import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT item_id, COUNT(*)::int as count
      FROM votes_rmbl_tor
      GROUP BY item_id
    `);

    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching votes:", err);
    return NextResponse.json(
      { error: "Database query failed", details: err.message },
      { status: 500 }
    );
  }
}
