import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CATEGORIES,
  categoryMeta,
  categoryFromSlug,
  isCloud,
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
    title: `${m.heading} · jordandesigns.io`,
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
            {isCloud(category) ? "Cloud" : "Focus area"} · {count} build{count === 1 ? "" : "s"}
          </span>
          <h1 className="page-title">{m.heading}</h1>
          <p>{m.blurb}</p>
        </div>
        <ProjectIndex
          initial={{
            cloud: isCloud(category) ? category : null,
            focus: isCloud(category) ? null : category,
            caseStudies: false,
          }}
        />
      </div>
    </section>
  );
}
