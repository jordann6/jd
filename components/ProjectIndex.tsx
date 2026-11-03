"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  projects,
  CLOUD_CATEGORIES,
  FOCUS_CATEGORIES,
  LANDING_ZONE_CORE,
  categoryMeta,
  isCloud,
  type CloudCategory,
  type FocusCategory,
  type Project,
} from "@/lib/projects";
import { BrandIcon } from "@/components/home/Brand";
import { plain } from "@/components/home/Diagrams";
import type { Cloud } from "@/lib/solutions";

const CLOUD_ICONS: Record<CloudCategory, Cloud> = { AWS: "aws", Azure: "azure", GCP: "gcp" };

export interface FilterState {
  cloud: CloudCategory | null;
  focus: FocusCategory | null;
  caseStudies: boolean;
}

function matches(p: Project, f: FilterState) {
  return (
    (!f.cloud || p.categories.includes(f.cloud)) &&
    (!f.focus || p.categories.includes(f.focus)) &&
    (!f.caseStudies || !!p.caseStudy)
  );
}

const bySlug = (slug: string | null) =>
  [...CLOUD_CATEGORIES, ...FOCUS_CATEGORIES].find((c) => categoryMeta[c].slug === slug);

/**
 * The full catalog for /work and its category pages. A cloud row and a focus
 * row combine, plus a case-studies-only toggle. Category pages preset the
 * filter; on /work the current filter is mirrored into the query string so a
 * view can be shared. Case-study cards link to their page; the rest open a
 * dialog with the description and repo links.
 */
export default function ProjectIndex({
  initial = { cloud: null, focus: null, caseStudies: false },
  syncUrl = false,
}: {
  initial?: FilterState;
  syncUrl?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [modal, setModal] = useState<Project | null>(null);
  const [f, setF] = useState<FilterState>(initial);

  // Restore a shared view (/work/?cloud=azure&focus=security&cs=1).
  useEffect(() => {
    if (!syncUrl) return;
    const q = new URLSearchParams(window.location.search);
    const cloud = bySlug(q.get("cloud"));
    const focus = bySlug(q.get("focus"));
    setF({
      cloud: cloud && isCloud(cloud) ? cloud : null,
      focus: focus && !isCloud(focus) ? focus : null,
      caseStudies: q.get("cs") === "1",
    });
  }, [syncUrl]);

  const update = (next: FilterState) => {
    setF(next);
    if (!syncUrl) return;
    const q = new URLSearchParams();
    if (next.cloud) q.set("cloud", categoryMeta[next.cloud].slug);
    if (next.focus) q.set("focus", categoryMeta[next.focus].slug);
    if (next.caseStudies) q.set("cs", "1");
    const qs = q.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  };

  const count = (g: Partial<FilterState>) =>
    projects.filter((p) => matches(p, { ...f, ...g })).length;

  const visible = useMemo(() => projects.filter((p) => matches(p, f)), [f]);

  // Results are grouped by cloud. Projects that run on more than one cloud get
  // their own group rather than appearing twice. Under the landing zone
  // filter, each cloud's landing zone leads its group.
  const coreRank = (p: Project) => {
    const i = LANDING_ZONE_CORE.indexOf(p.num);
    return f.focus === "LandingZones" && i >= 0 ? i : 99;
  };
  const groups: { key: string; title: string; cloud?: CloudCategory; items: Project[] }[] = [
    ...CLOUD_CATEGORIES.map((c) => ({
      key: c,
      title: categoryMeta[c].label,
      cloud: c,
      items: visible.filter((p) => {
        const cl = p.categories.filter(isCloud);
        return cl.length === 1 && cl[0] === c;
      }),
    })),
    {
      key: "multi",
      title: "Across clouds",
      items: visible.filter((p) => p.categories.filter(isCloud).length > 1),
    },
  ]
    .map((g) => ({ ...g, items: [...g.items].sort((x, y) => coreRank(x) - coreRank(y)) }))
    .filter((g) => g.items.length);

  const open = (p: Project) => {
    setModal(p);
    dialog.current?.showModal();
    document.documentElement.classList.add("locked");
  };

  return (
    <>
      <div className="filters" role="group" aria-label="Filter work">
        <div className="chips" role="group" aria-label="Focus">
          <button
            type="button"
            className="chip"
            aria-pressed={!f.focus}
            onClick={() => update({ ...f, focus: null })}
          >
            All <span className="count">{count({ focus: null })}</span>
          </button>
          {FOCUS_CATEGORIES.map((c) => {
            const n = count({ focus: c });
            return (
              <button
                key={c}
                type="button"
                className="chip"
                aria-pressed={f.focus === c}
                disabled={n === 0 && f.focus !== c}
                onClick={() => update({ ...f, focus: f.focus === c ? null : c })}
              >
                {categoryMeta[c].label} <span className="count">{n}</span>
              </button>
            );
          })}
        </div>
        <label className="cs-toggle">
          <input
            type="checkbox"
            checked={f.caseStudies}
            onChange={(e) => update({ ...f, caseStudies: e.target.checked })}
          />
          Case studies only <span className="count">{count({ caseStudies: true })}</span>
        </label>
      </div>

      <p className="filter-result" aria-live="polite">
        Showing {visible.length} of {projects.length}
        {f.cloud && (
          <>
            {" "}on {categoryMeta[f.cloud].label} ·{" "}
            <button type="button" className="inline-open" onClick={() => update({ ...f, cloud: null })}>
              show every cloud
            </button>
          </>
        )}
      </p>

      {groups.map((g) => (
        <div key={g.key}>
          <h2 className="pgroup-h">
            {g.cloud ? (
              <BrandIcon name={CLOUD_ICONS[g.cloud]} />
            ) : (
              CLOUD_CATEGORIES.filter((c) => g.items.some((p) => p.categories.includes(c))).map((c) => (
                <BrandIcon key={c} name={CLOUD_ICONS[c]} />
              ))
            )}
            {g.title} <span className="count">{g.items.length}</span>
          </h2>
          <div className="pgrid">
            {g.items.map((p) => {
              const inner = <CardBody p={p} showClouds={!g.cloud} />;
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
        </div>
      ))}
      {visible.length === 0 && (
        <p className="filter-empty">
          Nothing matches that combination.{" "}
          <button
            type="button"
            className="inline-open"
            onClick={() => update({ cloud: null, focus: null, caseStudies: false })}
          >
            Clear filters
          </button>
        </p>
      )}

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
          <span className="eyebrow">{modal?.categories.map((c) => categoryMeta[c].label).join(" · ")}</span>
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

function CardBody({ p, showClouds = true }: { p: Project; showClouds?: boolean }) {
  const clouds = showClouds ? p.categories.filter(isCloud) : [];
  return (
    <>
      <span className="sol-k">
        {clouds.map((c) => (
          <BrandIcon key={c} name={CLOUD_ICONS[c]} />
        ))}
        {clouds.map((c) => categoryMeta[c].label).join(" · ")}
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
