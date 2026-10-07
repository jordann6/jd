import type { Metadata } from "next";
import { caseStudyMeta, caseStudyProjects } from "@/lib/projects";
import ProjectIndex from "@/components/ProjectIndex";

export const metadata: Metadata = {
  title: `${caseStudyMeta.title} · jordandesigns.io`,
  description: caseStudyMeta.blurb,
};

export default function CaseStudiesPage() {
  const count = caseStudyProjects().length;

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
            Deep dives · {count} case stud{count === 1 ? "y" : "ies"}
          </span>
          <h1 className="page-title">Case studies</h1>
          <p>{caseStudyMeta.blurb}</p>
        </div>
        <ProjectIndex initial="Case Study" />
      </div>
    </section>
  );
}
