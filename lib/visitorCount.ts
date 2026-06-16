// Single shared fetch so the counter increments once per page load even though
// both the hero and the frame HUD display it.
const API_ENDPOINT =
  "https://673vy98pwa.execute-api.us-east-1.amazonaws.com/prod/count";

let cached: Promise<string> | null = null;

export function fetchVisitorCount(): Promise<string> {
  if (cached) return cached;
  cached = fetch(API_ENDPOINT)
    .then((r) => {
      if (!r.ok) throw new Error(String(r.status));
      return r.json();
    })
    .then((data) => {
      let visits = 0;
      if (data.visits) {
        visits = data.visits;
      } else if (data.body) {
        const body =
          typeof data.body === "string" ? JSON.parse(data.body) : data.body;
        visits = body.visits || body.count || 0;
      }
      return Number(visits).toLocaleString();
    })
    .catch(() => "---");
  return cached;
}
