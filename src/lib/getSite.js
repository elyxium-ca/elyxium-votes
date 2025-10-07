export function getSiteFromHost(hostname, path) {
  if (!hostname) return "default";

  const parts = hostname.split(".");
  // prod subdomain: <site>.votes.elyxium.ca
  if (parts.length >= 4 && parts[1] === "votes" && parts[0] !== "www") {
    return parts[0];
  }

  // path: /site/<slug>
  if (path) {
    const segs = path.split("/").filter(Boolean);
    const idx = segs.indexOf("site");
    if (idx >= 0 && segs[idx + 1]) return segs[idx + 1];
  }

  return "default";
}

// ✅ Use the real request URL (works on Vercel + locally)
export function getSiteFromRequest(req) {
  const { hostname, pathname } = new URL(req.url);
  return getSiteFromHost(hostname, pathname);
}
