"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CaseStudy } from "@/lib/caseStudies";
import type { Diagram } from "@/lib/diagrams";
import type { ArchitectureImage } from "@/lib/architecture";
import { ArchitectureFigure, FlowDiagram, plain } from "./Diagrams";

export type SolutionStudy = CaseStudy & {
  diagram: Diagram | null;
  architecture: ArchitectureImage | null;
};

// The IDP repository is still private; its case study links out without code.
const PRIVATE_REPOS = new Set(["multi-cloud-developer-platform"]);

// Any element with data-open="<slug>" opens that solution's case study. The
// cards stay server-rendered buttons; this one listener does the rest.
export default function SolutionDialog({
  studies,
}: {
  studies: Record<string, SolutionStudy>;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const [slug, setSlug] = useState<string | null>(null);

  const open = useCallback(
    (next: string, from: HTMLElement | null) => {
      if (!studies[next]) return;
      trigger.current = from;
      setSlug(next);
      const d = ref.current;
      if (d && !d.open) d.showModal();
      document.documentElement.classList.add("locked");
    },
    [studies],
  );

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-open]");
      if (!el) return;
      e.preventDefault();
      open(el.dataset.open!, el);
    };
    document.addEventListener("click", onClick);
    const hash = window.location.hash.slice(1);
    if (studies[hash]) open(hash, document.querySelector(`[data-open="${hash}"]`));
    return () => document.removeEventListener("click", onClick);
  }, [open, studies]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  }, [slug]);

  const onClose = () => {
    document.documentElement.classList.remove("locked");
    trigger.current?.focus();
  };

  const c = slug ? studies[slug] : null;
  const rows = c?.receipt ? [...c.receipt.rows, c.receipt.total] : [];

  return (
    <dialog
      className="dlg"
      ref={ref}
      aria-labelledby="dlg-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) ref.current.close();
      }}
    >
      <div className="dlg-bar">
        <span className="eyebrow">{c?.category}</span>
        <button
          type="button"
          className="dlg-close"
          aria-label="Close solution details"
          onClick={() => ref.current?.close()}
        >
          Close ✕
        </button>
      </div>
      <div className="dlg-body" ref={bodyRef}>
        {c && (
          <>
            <h2 id="dlg-title">
              {c.title} {c.titleOut}
            </h2>
            <p className="dlg-lede">{plain(c.lede)}</p>
            <dl className="dlg-meta">
              {c.meta.map((m) => (
                <div key={m.k}>
                  <dt>{m.k}</dt>
                  <dd>{m.v}</dd>
                </div>
              ))}
            </dl>
            <div className="dlg-links">
              <a className="btn btn-primary" href={`/work/${c.slug}/`}>
                Read the full case study
              </a>
              {!PRIVATE_REPOS.has(c.slug) && (
                <a className="btn btn-ghost" href={c.repo}>
                  Code on GitHub
                </a>
              )}
            </div>
            {c.architecture && (
              <ArchitectureFigure image={c.architecture} title={`${c.title} ${c.titleOut}`} />
            )}
            {c.diagram && <FlowDiagram diagram={c.diagram} />}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {c.blocks.map((b) => (
                <section className="cblock" key={b.heading}>
                  <h3>{b.heading}</h3>
                  {b.paragraphs?.map((p, i) => <p key={i}>{plain(p)}</p>)}
                  {b.bullets && (
                    <ul>
                      {b.bullets.map((t, i) => (
                        <li key={i}>{plain(t)}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
            {c.receipt && (
              <div className="receipt">
                <h3>Live run receipt</h3>
                <dl>
                  {rows.map((r, i) => (
                    <div key={r.k} className={i === rows.length - 1 ? "total" : undefined}>
                      <dt>{r.k}</dt>
                      <dd>{plain(r.v)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            <div className="dlg-stack">
              <h3>Built with</h3>
              <div className="tags">
                {c.stack.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
