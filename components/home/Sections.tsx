import { BrandIcon } from "./Brand";
import CopyEmail from "./CopyEmail";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import { contact, services } from "@/lib/solutions";

export function Services() {
  return (
    <section className="sec approach" id="services" aria-labelledby="services-title">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Services</span>
          <h2 id="services-title">Services and practices</h2>
          <p>
            From moving you into the cloud to keeping it secure, affordable, and
            running. Each card links to a solution where you can see it in
            action.
          </p>
        </div>
        <div className="svc-grid">
          {services.map((s) => (
            <article className="svc" key={s.title}>
              <span className="svc-tag">{s.tag}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <p className="rel">
                <b>See it in</b>
                {s.rel.map((r, i) =>
                  typeof r === "string" ? (
                    <span key={i}>{r}</span>
                  ) : (
                    <button key={i} type="button" className="inline-open" data-open={r.slug}>
                      {r.label}
                    </button>
                  ),
                )}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { title: "Understand", desc: "Your goals, current setup, compliance needs, budget, and team." },
  { title: "Design", desc: "An architecture that fits, with trade-offs written down so decisions are clear." },
  { title: "Build", desc: "Everything as code, delivered through automated, reviewed pipelines." },
  { title: "Prove and hand over", desc: "Live tests, monitoring, runbooks, and documentation your team can run with." },
];

export function Approach() {
  return (
    <section className="sec" id="approach" aria-labelledby="approach-title">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Approach</span>
          <h2 id="approach-title">Best practices from each provider, tailored to you</h2>
          <p>
            AWS, Microsoft Azure, and Google Cloud each publish guidance on
            building secure, reliable, cost-efficient systems. I start from that
            guidance and shape it around what your business needs.
          </p>
        </div>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <span className="n">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </li>
          ))}
        </ol>
        <p className="frameworks">
          Guided by <span className="fchip">AWS Well-Architected</span>
          <span className="fchip">Azure Well-Architected</span>
          <span className="fchip">Google Cloud Architecture Framework</span>
        </p>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="sec approach" id="about" aria-labelledby="about-title">
      <div className="wrap about">
        <div>
          <span className="eyebrow">About</span>
          <h2 id="about-title">Hi, I&apos;m Jordan.</h2>
        </div>
        <div className="about-copy">
          <p>
            I&apos;m a multi-cloud engineer. I architect and build infrastructure
            on AWS, Microsoft Azure, and Google Cloud, following each
            provider&apos;s best practices and shaping the result around the
            business it serves.
          </p>
          <div className="facts">
            <div className="fact">
              <span className="k">Based</span>
              <span className="v">Remote, or hybrid in Chicago</span>
            </div>
            <div className="fact">
              <span className="k">Available for</span>
              <span className="v">Full-time and contract (1099)</span>
            </div>
            <div className="fact">
              <span className="k">Certification</span>
              <span className="v">AWS Solutions Architect Associate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="sec close" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="close-grid">
          <div>
            <span className="eyebrow" style={{ color: "var(--mint)" }}>
              Contact
            </span>
            <h2 id="contact-title" style={{ marginTop: 12 }}>
              Let&apos;s build your next foundation.
            </h2>
            <p className="lede">
              Planning a migration, modernizing what you run, getting costs under
              control, or hiring for a cloud role? Open to full-time roles and
              contract (1099) engagements, remote or hybrid in Chicago. Book a
              time or reach out directly.
            </p>
          </div>
          <div className="contact-card">
            <div className="row">
              <span className="k">Book a 30-minute call</span>
              <a className="btn btn-mint" href={contact.calendly} style={{ alignSelf: "flex-start" }}>
                Start a conversation <span className="arr" aria-hidden="true">→</span>
              </a>
              <span className="hint">
                Pick a time below and I&apos;ll send a calendar invite with a
                video link.
              </span>
            </div>
            <div className="row">
              <span className="k">Email</span>
              <CopyEmail email={contact.email} />
            </div>
            <div className="row">
              <span className="k">Elsewhere</span>
              <div className="olinks">
                <a href={contact.linkedin}>
                  <BrandIcon name="linkedin" />
                  LinkedIn
                </a>
                <a href={contact.github}>
                  <BrandIcon name="github" />
                  GitHub
                </a>
                <a href="/work/">All work</a>
              </div>
            </div>
          </div>
        </div>
        <CalendlyEmbed />
      </div>
    </section>
  );
}
