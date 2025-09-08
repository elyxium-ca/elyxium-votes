import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function test() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ DB connected, server time:", res.rows[0]);
  } catch (err) {
    console.error("❌ DB connection failed:", err);
  } finally {
    pool.end();
  }
}

test();
