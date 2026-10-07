export default function NotFound() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Error 404</span>
          <h1 className="page-title">That page does not exist.</h1>
          <p>The page may have moved, or the link is off.</p>
        </div>
        <div className="cta-row">
          <a className="btn btn-primary" href="/">
            Back home <span className="arr" aria-hidden="true">→</span>
          </a>
          <a className="btn btn-ghost" href="/work/">
            All work
          </a>
        </div>
      </div>
    </section>
  );
}
