// src/lib/getSite.js
export function getSiteFromHost(hostname, path) {
  if (!hostname) return "default";

  // subdomain: <site>.votes.elyxium.ca
  const parts = hostname.split(".");
  if (parts.length >= 4 && parts[1] === "votes" && parts[0] !== "www") {
    return parts[0];
  }

  // path: /site/<site>
  if (path) {
    const segs = path.split("/").filter(Boolean);
    const idx = segs.indexOf("site");
    if (idx >= 0 && segs[idx + 1]) return segs[idx + 1];
  }

  return "default";
}

export function getSiteFromRequestHeaders(headers) {
  const host = headers.get("x-forwarded-host") || headers.get("host") || "";
  const path = headers.get("x-invoke-path") || "";
  return getSiteFromHost(host, path);
}
