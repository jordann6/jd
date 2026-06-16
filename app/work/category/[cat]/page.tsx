import type { Metadata } from "next";
import Link from "next/link";
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
  if (!category) return { title: "Work — Jordan" };
  const m = categoryMeta[category];
  return {
    title: `${m.title} Work — Jordan`,
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
    <section className="stage work">
      <Link href="/work/" className="cs__back">
        ← All Work
      </Link>

      <div className="cs__eyebrow">
        <span>↳ Focus area</span>
        <span className="cat">
          {count} {category} project{count === 1 ? "" : "s"}
        </span>
      </div>
      <h1 className="cs__title">
        {m.title} <span className="out">Work</span>
      </h1>
      <p className="cs__lede">{m.blurb}</p>

      <ProjectIndex initial={category} linked />
    </section>
  );
}
