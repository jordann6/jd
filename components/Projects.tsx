import Link from "next/link";
import { projects } from "@/lib/projects";
import ProjectIndex from "./ProjectIndex";

export default function Projects() {
  return (
    <section id="projects" className="stage proj">
      <div className="sec-head reveal">
        <span className="sec-head__num">/03</span>
        <h2 className="sec-head__title">Index</h2>
        <span className="sec-head__meta">
          Selected works
          <br />
          {projects.length} indexed
        </span>
      </div>

      <ProjectIndex initial="All" />

      <div className="proj__more reveal">
        <Link href="/work/" className="btn btn--ghost">
          Open Full Index <span className="arrow">→</span>
        </Link>
      </div>
    </section>
  );
}
