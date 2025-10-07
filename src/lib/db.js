import { neon } from "@neondatabase/serverless";

let raw = process.env.DATABASE_URL || "";
raw = raw.trim()
  .replace(/^['"]|['"]$/g, "")   // strip surrounding quotes
  .replace(/^psql\s+/, "")       // strip accidental "psql "
  .replace(/([?&])channel_binding=[^&]+&?/, "$1") // drop channel_binding
  .replace(/[?&]$/, "");         // tidy trailing ? or &

if (!raw || !/^postgres(?:ql)?:\/\//i.test(raw)) {
  throw new Error(`DATABASE_URL is missing or invalid. Got: "${process.env.DATABASE_URL || ""}"`);
}

export const sql = neon(raw);
