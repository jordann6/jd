import type { Metadata } from "next";
import Link from "next/link";
import { caseStudyMeta, caseStudyProjects } from "@/lib/projects";
import ProjectIndex from "@/components/ProjectIndex";

export const metadata: Metadata = {
  title: `${caseStudyMeta.title} — Jordan`,
  description: caseStudyMeta.blurb,
};

export default function CaseStudiesPage() {
  const count = caseStudyProjects().length;

  return (
    <section className="stage work">
      <Link href="/work/" className="cs__back">
        ← All Work
      </Link>

      <div className="cs__eyebrow">
        <span>↳ Deep dives</span>
        <span className="cat">
          {count} case stud{count === 1 ? "y" : "ies"}
        </span>
      </div>
      <h1 className="cs__title">
        Case <span className="out">Studies</span>
      </h1>
      <p className="cs__lede">{caseStudyMeta.blurb}</p>

      <ProjectIndex initial="Case Study" linked />
    </section>
  );
}
