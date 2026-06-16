"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  projects,
  CATEGORIES,
  categoryMeta,
  type Category,
  type Project,
} from "@/lib/projects";

type Filter = Category | "All";

function hrefFor(f: Filter): string {
  return f === "All" ? "/work/" : `/work/category/${categoryMeta[f].slug}/`;
}

/**
 * Shared project index used in two modes:
 * - interactive (homepage): chips toggle a client-side filter.
 * - linked (route pages): chips are real links to /work/category/<cat>, and the
 *   visible filter is fixed by the page's `initial` prop so the page is shareable.
 */
export default function ProjectIndex({
  initial = "All",
  linked = false,
}: {
  initial?: Filter;
  linked?: boolean;
}) {
  const [filter, setFilter] = useState<Filter>(initial);
  const [modal, setModal] = useState<Project | null>(null);
  const active: Filter = linked ? initial : filter;

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: projects.length };
    CATEGORIES.forEach((cat) => {
      c[cat] = projects.filter((p) => p.categories.includes(cat)).length;
    });
    return c;
  }, []);

  const visible = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((p) => p.categories.includes(active as Category)),
    [active],
  );

  const filters = ["All", ...CATEGORIES] as Filter[];

  return (
    <>
      <div className="proj__filters reveal">
        {filters.map((f) =>
          linked ? (
            <Link
              key={f}
              href={hrefFor(f)}
              className={`filter-chip${active === f ? " active" : ""}`}
            >
              {f} <span className="count">{counts[f]}</span>
            </Link>
          ) : (
            <button
              key={f}
              className={`filter-chip${filter === f ? " active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f} <span className="count">{counts[f]}</span>
            </button>
          ),
        )}
      </div>

      <div className="proj__list reveal">
        {visible.map((p) =>
          p.caseStudy ? (
            <Link className="proj__item" key={p.num} href={`/work/${p.caseStudy}/`}>
              <div className="proj__num">/{p.num}</div>
              <div className="proj__main">
                <div className="proj__title">
                  {p.title} <span className="out">{p.titleOut}</span>
                  <span className="proj__casebadge">Case Study</span>
                </div>
                <div className="proj__hover-tags">
                  {p.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <span className="proj__arrow">↗</span>
            </Link>
          ) : (
            <button className="proj__item" key={p.num} onClick={() => setModal(p)}>
              <div className="proj__num">/{p.num}</div>
              <div className="proj__main">
                <div className="proj__title">
                  {p.title} <span className="out">{p.titleOut}</span>
                </div>
                <div className="proj__hover-tags">
                  {p.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <span className="proj__arrow">↗</span>
            </button>
          ),
        )}
      </div>

      {modal && (
        <div
          className="modal-mask"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModal(null);
          }}
        >
          <div className="modal">
            <div className="modal__top">
              <span>↳ Project /{modal.num}</span>
              <span className="modal__close" onClick={() => setModal(null)}>
                Close ✕
              </span>
            </div>
            <h3>
              {modal.title} <span className="out">{modal.titleOut}</span>
            </h3>
            <p className="modal__desc">{modal.desc}</p>
            <div className="modal__tags">
              {modal.tags.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
            <div className="modal__actions">
              <a
                className="btn btn--primary"
                href={modal.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {modal.link.includes("github") ? "View on GitHub" : "Read on Substack"}{" "}
                <span className="arrow">↗</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
