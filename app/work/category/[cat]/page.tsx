import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CATEGORIES,
  categoryMeta,
  categoryFromSlug,
  projectsByCategory,
} from "@/lib/projects";
import ProjectIndex from "@/components/ProjectIndex";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ cat: categoryMeta[c].slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cat: string }>;
}): Promise<Metadata> {
  const { cat } = await params;
  const category = categoryFromSlug(cat);
  if (!category) return { title: "Work · jordandesigns.io" };
  const m = categoryMeta[category];
  return {
    title: `${m.title === "GCP" ? "Google Cloud" : m.title} work · jordandesigns.io`,
    description: m.blurb,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ cat: string }>;
}) {
  const { cat } = await params;
  const category = categoryFromSlug(cat);
  if (!category) notFound();
  const m = categoryMeta[category];
  const count = projectsByCategory(category).length;

  const name = category === "GCP" ? "Google Cloud" : m.title;

  return (
    <section className="sec work">
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span aria-hidden="true">/</span>
          <a href="/work/">All work</a>
        </nav>
        <div className="sec-head">
          <span className="eyebrow">
            Focus area · {count} build{count === 1 ? "" : "s"}
          </span>
          <h1 className="page-title">{name} work</h1>
          <p>{m.blurb}</p>
        </div>
        <ProjectIndex initial={category} />
      </div>
    </section>
  );
}
