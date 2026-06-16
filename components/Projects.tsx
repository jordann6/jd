"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { projects, CATEGORIES, type Category, type Project } from "@/lib/projects";

type Filter = Category | "All";

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [modal, setModal] = useState<Project | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: projects.length };
    CATEGORIES.forEach((cat) => {
      c[cat] = projects.filter((p) => p.categories.includes(cat)).length;
    });
    return c;
  }, []);

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.categories.includes(filter)),
    [filter],
  );

  return (
    <section id="projects" className="stage proj">
      <div className="sec-head reveal">
        <span className="sec-head__num">/03</span>
        <h2 className="sec-head__title">Index</h2>
        <span className="sec-head__meta">
          Selected works
          <br />
          {visible.length} of {projects.length}
        </span>
      </div>

      <div className="proj__filters reveal">
        {(["All", ...CATEGORIES] as Filter[]).map((f) => (
          <button
            key={f}
            className={`filter-chip${filter === f ? " active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f} <span className="count">{counts[f]}</span>
          </button>
        ))}
      </div>

      <div className="proj__list reveal">
        {visible.map((p) =>
          p.caseStudy ? (
            <Link className="proj__item" key={p.num} href={`/work/${p.caseStudy}`}>
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
    </section>
  );
}
