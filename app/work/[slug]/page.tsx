import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/lib/caseStudies";
import { getDiagram } from "@/lib/diagrams";
import { getArchitecture } from "@/lib/architecture";
import { projects } from "@/lib/projects";
import { contact } from "@/lib/solutions";
import { ArchitectureFigure, FlowDiagram, plain } from "@/components/home/Diagrams";
import { BrandIcon } from "@/components/home/Brand";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return { title: "Case study · jordandesigns.io" };
  return {
    title: `${cs.title} ${cs.titleOut} · Case study · jordandesigns.io`,
    description: cs.lede,
  };
}

// The IDP repository is still private; its page links out without code.
const PRIVATE_REPOS = new Set(["multi-cloud-developer-platform"]);

const CLOUDS = [
  { key: "AWS", icon: "aws" },
  { key: "Azure", icon: "azure" },
  { key: "GCP", icon: "gcp" },
] as const;

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();
  const diagram = getDiagram(slug);
  const architecture = getArchitecture(slug);
  const title = `${cs.title} ${cs.titleOut}`;
  const project = projects.find((p) => p.caseStudy === slug);
  const clouds = CLOUDS.filter((c) => project?.categories.includes(c.key));

  return (
    <article className="cs-page">
      <div className="wrap cs-wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <a href="/#solutions">Solutions</a>
          <span aria-hidden="true">/</span>
          <a href="/work/case-studies/">Case studies</a>
        </nav>

        <header className="cs-head">
          <span className="eyebrow">{cs.category}</span>
          <h1 className="page-title">{title}</h1>
          <p className="cs-lede">{plain(cs.lede)}</p>
          {clouds.length > 0 && (
            <div className="cloud-chips" aria-label="Cloud providers">
              {clouds.map((c) => (
                <span className="cchip" key={c.key}>
                  <BrandIcon name={c.icon} />
                  {c.key === "GCP" ? "Google Cloud" : c.key === "Azure" ? "Microsoft Azure" : "AWS"}
                </span>
              ))}
            </div>
          )}
        </header>

        <dl className="dlg-meta">
          {cs.meta.map((m) => (
            <div key={m.k}>
              <dt>{m.k}</dt>
              <dd>{m.v}</dd>
            </div>
          ))}
        </dl>

        <div className="dlg-links">
          {PRIVATE_REPOS.has(slug) ? (
            <span className="fchip">Repository private for now</span>
          ) : (
            <a className="btn btn-primary" href={cs.repo} target="_blank" rel="noopener noreferrer">
              <BrandIcon name="github" />
              Code on GitHub
            </a>
          )}
          <a className="btn btn-ghost" href="/#contact">
            Discuss a solution
          </a>
        </div>

        {architecture && <ArchitectureFigure image={architecture} title={title} />}
        {diagram && <FlowDiagram diagram={diagram} />}

        <div className="cs-blocks">
          {cs.blocks.map((b) => (
            <section className="cblock" key={b.num}>
              <h2>{b.heading}</h2>
              {b.paragraphs?.map((p, i) => (
                <p key={i}>{plain(p)}</p>
              ))}
              {b.bullets && (
                <ul>
                  {b.bullets.map((li, i) => (
                    <li key={i}>{plain(li)}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {cs.receipt && (
          <div className="receipt">
            <h2>Live run receipt</h2>
            <dl>
              {cs.receipt.rows.map((r) => (
                <div key={r.k}>
                  <dt>{r.k}</dt>
                  <dd>{plain(r.v)}</dd>
                </div>
              ))}
              <div className="total">
                <dt>{cs.receipt.total.k}</dt>
                <dd>{plain(cs.receipt.total.v)}</dd>
              </div>
            </dl>
          </div>
        )}

        <div className="dlg-stack">
          <h2>Built with</h2>
          <div className="tags">
            {cs.stack.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="cs-cta">
        <div className="wrap">
          <h2>Want something like this for your cloud?</h2>
          <div className="cta-row">
            <a className="btn btn-mint" href={contact.calendly}>
              Start a conversation <span className="arr" aria-hidden="true">→</span>
            </a>
            <a className="btn btn-ghost-light" href="/work/case-studies/">
              More case studies
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
