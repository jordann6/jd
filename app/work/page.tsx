import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import ProjectIndex from "@/components/ProjectIndex";

export const metadata: Metadata = {
  title: "All work · jordandesigns.io",
  description:
    "Cloud, platform, security, FinOps, data, and AI engineering across AWS, Azure, and Google Cloud. Filter by focus area, grouped by cloud.",
};

export default function WorkIndex() {
  return (
    <section className="sec work">
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <a href="/">Home</a>
        </nav>
        <div className="sec-head">
          <span className="eyebrow">All work · {projects.length} builds</span>
          <h1 className="page-title">Everything I&apos;ve built</h1>
          <p>
            Cloud, platform, security, FinOps, data, and AI engineering across
            AWS, Azure, and Google Cloud, all defined as code and deployed for
            real. Pick a focus area; results are grouped by cloud.
          </p>
        </div>
        <ProjectIndex syncUrl />
      </div>
    </section>
  );
}
