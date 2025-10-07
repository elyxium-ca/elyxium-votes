// src/lib/getSite.js
export function getSiteFromHostAndPath(hostname, path) {
  if (!hostname) return "default";
  const parts = hostname.split(".");

  // subdomain: <site>.votes.elyxium.ca or <site>.votes.localhost
  if (parts.length >= 3 && parts[1] === "votes" && parts[0] !== "www") {
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

export function getSiteFromRequestUrl(req) {
  // NOTE: req.url for API is like https://votes.elyxium.ca/api/vote (no /site/<slug>)
  // so this alone won't find path-mode. We'll also try Referer in the routes.
  const { hostname, pathname } = new URL(req.url);
  return getSiteFromHostAndPath(hostname, pathname);
}

export function getSiteFromReferer(req) {
  const ref = req.headers.get("referer");
  if (!ref) return null;
  try {
    const { hostname, pathname } = new URL(ref);
    return getSiteFromHostAndPath(hostname, pathname);
  } catch {
    return null;
  }
}
