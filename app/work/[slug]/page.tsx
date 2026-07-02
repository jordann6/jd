import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/lib/caseStudies";
import { getDiagram } from "@/lib/diagrams";
import CaseDiagram from "@/components/CaseDiagram";

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
  if (!cs) return { title: "Case Study — Jordan" };
  return {
    title: `${cs.title} ${cs.titleOut} — Case Study — Jordan`,
    description: cs.lede,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();
  const diagram = getDiagram(slug);

  return (
    <article className="cs">
      <Link href="/#projects" className="cs__back">
        ← Back to Index
      </Link>

      <div className="cs__eyebrow">
        <span>↳ Project /{cs.num}</span>
        <span className="cat">{cs.category}</span>
      </div>

      <h1 className="cs__title">
        {cs.title} <span className="out">{cs.titleOut}</span>
      </h1>

      <p className="cs__lede">{cs.lede}</p>

      <div className="cs__meta">
        {cs.meta.map((m) => (
          <div className="item" key={m.k}>
            <div className="k">{m.k}</div>
            <div className="v">{m.v}</div>
          </div>
        ))}
      </div>

      {diagram && <CaseDiagram diagram={diagram} />}

      {cs.blocks.map((b) => (
        <section className="cs__block" key={b.num}>
          <h2>
            <span className="num">{b.num}</span>
            {b.heading}
          </h2>
          {b.paragraphs?.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {b.bullets && (
            <ul>
              {b.bullets.map((li, i) => (
                <li key={i}>{li}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {cs.receipt && (
        <div className="cs__receipt">
          <div className="rhead">
            <span>↳ Run Receipt</span>
            <span>/{cs.num}</span>
          </div>
          {cs.receipt.rows.map((r) => (
            <div className="row" key={r.k}>
              <span className="k">{r.k}</span>
              <span>{r.v}</span>
            </div>
          ))}
          <div className="rtotal">
            <span>{cs.receipt.total.k}</span>
            <span className="v">{cs.receipt.total.v}</span>
          </div>
        </div>
      )}

      <div className="cs__stack">
        {cs.stack.map((t) => (
          <span className="tag" key={t}>
            {t}
          </span>
        ))}
      </div>

      <div className="cs__cta">
        <a
          className="btn btn--primary"
          href={cs.repo}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub <span className="arrow">↗</span>
        </a>
        <Link href="/#contact" className="btn btn--ghost">
          Schedule a Call <span className="arrow">↗</span>
        </Link>
      </div>
    </article>
  );
}
