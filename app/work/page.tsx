import type { Metadata } from "next";
import Link from "next/link";
import { projects, CATEGORIES, categoryMeta, caseStudyMeta } from "@/lib/projects";
import ProjectIndex from "@/components/ProjectIndex";

export const metadata: Metadata = {
  title: "Work — Index — Jordan",
  description:
    "Selected cloud, platform, and AI engineering work across AWS and Azure. Filter by AWS, Azure, AI, or Platform.",
};

export default function WorkIndex() {
  return (
    <section className="stage work">
      <Link href="/" className="cs__back">
        ← Back to Home
      </Link>

      <div className="cs__eyebrow">
        <span>↳ Index</span>
        <span className="cat">{projects.length} projects</span>
      </div>
      <h1 className="cs__title">
        Selected <span className="out">Work</span>
      </h1>
      <p className="cs__lede">
        Cloud, platform, and AI engineering across AWS and Azure, defined as code
        and built to deploy, demo, and destroy. Browse all, or jump to a focus
        area.
      </p>

      <div className="work__cats">
        {CATEGORIES.map((c) => (
          <Link key={c} href={`/work/category/${categoryMeta[c].slug}/`}>
            {c}
          </Link>
        ))}
        <Link href={`/work/${caseStudyMeta.slug}/`}>{caseStudyMeta.title}</Link>
      </div>

      <ProjectIndex initial="All" linked />
    </section>
  );
}
