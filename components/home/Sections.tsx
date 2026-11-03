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

// A brief intro right under the hero: who, where, and on what terms.
export function About() {
  return (
    <section className="intro" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <div className="intro-card">
          <div className="intro-copy">
            <span className="eyebrow">About</span>
            <h2 id="about-title">Hi, I&apos;m Jordan.</h2>
            <p>
              I&apos;m a multi-cloud engineer. I architect and build
              infrastructure on AWS, Microsoft Azure, and Google Cloud,
              following each provider&apos;s best practices and shaping the
              result around the business it serves.
            </p>
          </div>
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
