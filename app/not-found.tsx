// Self-contained on purpose: a stylesheet imported here would be bundled into
// every route (the root not-found sits in the root segment), so the homepage
// and /work styles would leak into each other. Inline styles only.
const css = `
body{margin:0;background:#f6f3ee;color:#0f2233;font-family:var(--font-sans),Helvetica,Arial,sans-serif}
.nf{max-width:720px;margin:0 auto;padding:120px 24px;display:flex;flex-direction:column;gap:18px}
.nf small{font-family:var(--font-mono),monospace;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#0f5e66}
.nf h1{margin:0;font-size:clamp(36px,6vw,56px);letter-spacing:-.03em;line-height:1.05}
.nf p{margin:0;color:#4d5966;font-size:18px}
.nf nav{display:flex;flex-wrap:wrap;gap:12px;margin-top:12px}
.nf a{display:inline-flex;align-items:center;min-height:48px;padding:12px 22px;border-radius:10px;font-weight:600;text-decoration:none;border:1.5px solid #0f5e66;color:#0f5e66}
.nf a:first-child{background:#0f5e66;color:#fff}
@media (prefers-color-scheme:dark){body{background:#0c1620;color:#eef3f5}.nf p{color:#a9b8c3}.nf small,.nf a{color:#6fc7bd;border-color:#6fc7bd}.nf a:first-child{background:#6fc7bd;color:#0c1620}}
`;

export default function NotFound() {
  return (
    <main className="nf">
      <style>{css}</style>
      <small>jordandesigns.io · Error 404</small>
      <h1>That page does not exist.</h1>
      <p>The page may have moved, or the link is off.</p>
      <nav aria-label="Recovery">
        <a href="/">Back home →</a>
        <a href="/work/">All work</a>
      </nav>
    </main>
  );
}
