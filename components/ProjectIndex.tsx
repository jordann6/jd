"use client";

import { useMemo, useRef, useState } from "react";
import {
  projects,
  CATEGORIES,
  categoryMeta,
  caseStudyMeta,
  CASE_STUDY_FILTER,
  type Category,
  type Project,
} from "@/lib/projects";
import { BrandIcon } from "@/components/home/Brand";
import { plain } from "@/components/home/Diagrams";
import type { Cloud } from "@/lib/solutions";

type Filter = Category | "All" | typeof CASE_STUDY_FILTER;

const CLOUD_ICONS: Partial<Record<Category, Cloud>> = { AWS: "aws", Azure: "azure", GCP: "gcp" };

const LABELS: Partial<Record<Filter, string>> = { GCP: "Google Cloud" };

function hrefFor(f: Filter): string {
  if (f === "All") return "/work/";
  if (f === CASE_STUDY_FILTER) return `/work/${caseStudyMeta.slug}/`;
  return `/work/category/${categoryMeta[f].slug}/`;
}

/**
 * The full catalog for /work and its category pages. Filter chips are real
 * links, so the visible filter comes from the page's `initial` prop and every
 * view is shareable. Case-study cards link to their page; the rest open a
 * dialog with the description and repo links.
 */
export default function ProjectIndex({ initial = "All" }: { initial?: Filter }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [modal, setModal] = useState<Project | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = {
      All: projects.length,
      [CASE_STUDY_FILTER]: projects.filter((p) => p.caseStudy).length,
    };
    CATEGORIES.forEach((cat) => {
      c[cat] = projects.filter((p) => p.categories.includes(cat)).length;
    });
    return c;
  }, []);

  const visible = useMemo(() => {
    if (initial === "All") return projects;
    if (initial === CASE_STUDY_FILTER) return projects.filter((p) => p.caseStudy);
    return projects.filter((p) => p.categories.includes(initial as Category));
  }, [initial]);

  const filters = ["All", ...CATEGORIES, CASE_STUDY_FILTER] as Filter[];

  const open = (p: Project) => {
    setModal(p);
    dialog.current?.showModal();
    document.documentElement.classList.add("locked");
  };

  return (
    <>
      <nav className="chips" aria-label="Filter work">
        {filters.map((f) => (
          <a
            key={f}
            href={hrefFor(f)}
            className="chip"
            aria-current={initial === f ? "page" : undefined}
          >
            {CLOUD_ICONS[f as Category] && <BrandIcon name={CLOUD_ICONS[f as Category]!} />}
            {LABELS[f] ?? f} <span className="count">{counts[f]}</span>
          </a>
        ))}
      </nav>

      <div className="pgrid">
        {visible.map((p) => {
          const inner = <CardBody p={p} />;
          return p.caseStudy ? (
            <a className="pcard" key={p.num} href={`/work/${p.caseStudy}/`}>
              {inner}
              <span className="sol-go">
                Read the case study <span aria-hidden="true">→</span>
              </span>
            </a>
          ) : (
            <button type="button" className="pcard" key={p.num} onClick={() => open(p)}>
              {inner}
              <span className="sol-go">
                View details <span aria-hidden="true">→</span>
              </span>
            </button>
          );
        })}
      </div>

      <dialog
        className="dlg dlg-sm"
        ref={dialog}
        aria-labelledby="proj-title"
        onClose={() => document.documentElement.classList.remove("locked")}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current.close();
        }}
      >
        <div className="dlg-bar">
          <span className="eyebrow">{modal?.categories.join(" · ")}</span>
          <button
            type="button"
            className="dlg-close"
            aria-label="Close project details"
            onClick={() => dialog.current?.close()}
          >
            Close ✕
          </button>
        </div>
        {modal && (
          <div className="dlg-body">
            <h2 id="proj-title">
              {modal.title} {modal.titleOut}
            </h2>
            <p className="dlg-lede">{plain(modal.desc)}</p>
            <div className="tags">
              {modal.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <div className="dlg-links">
              {(
                modal.links ?? [
                  {
                    label: modal.link.includes("github") ? "Code on GitHub" : "Read on Substack",
                    href: modal.link,
                  },
                ]
              ).map((l) => (
                <a
                  className="btn btn-primary"
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

function CardBody({ p }: { p: Project }) {
  const clouds = p.categories.filter((c) => CLOUD_ICONS[c]);
  return (
    <>
      <span className="sol-k">
        {clouds.map((c) => (
          <BrandIcon key={c} name={CLOUD_ICONS[c]!} />
        ))}
        {p.categories.map((c) => LABELS[c] ?? c).join(" · ")}
        {p.caseStudy && <span className="badge">Case study</span>}
      </span>
      <span className="sol-t">
        {p.title} {p.titleOut}
      </span>
      <span className="ptags">
        {p.tags.slice(0, 4).map((t) => (
          <span key={t}>{t}</span>
        ))}
        {p.tags.length > 4 && <span>+{p.tags.length - 4}</span>}
      </span>
    </>
  );
}
