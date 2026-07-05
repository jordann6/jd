import Link from "next/link";
import { capabilities } from "@/lib/site";

export default function Capabilities() {
  return (
    <section id="capabilities" className="stage caps">
      <div className="sec-head reveal">
        <span className="sec-head__num">/02</span>
        <h2 className="sec-head__title">Focus</h2>
        <span className="sec-head__meta">
          Core capabilities
          <br />
          Proven in production
        </span>
      </div>
      <div className="caps__grid reveal">
        {capabilities.map((c) => (
          <div className="cap" key={c.num}>
            <div className="cap__num">/{c.num}</div>
            <h3 className="cap__title">{c.title}</h3>
            <p className="cap__blurb">{c.blurb}</p>
            <div className="cap__proofs">
              {c.proofs.map((p) =>
                p.internal ? (
                  <Link className="cap__proof" key={p.label} href={p.href}>
                    {p.label} <span className="arrow">→</span>
                  </Link>
                ) : (
                  <a
                    className="cap__proof"
                    key={p.label}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {p.label} <span className="arrow">↗</span>
                  </a>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
