import { BrandIcon } from "./Brand";
import {
  landingZones,
  moreSolutions,
  platformSlug,
  type Cloud,
} from "@/lib/solutions";

export function LandingZones() {
  return (
    <section className="sec lz-band" id="solutions" aria-labelledby="lz-title">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Featured solutions</span>
          <h2 id="lz-title">Three clouds.</h2>
        </div>

        <div className="lz-grid">
          {landingZones.map((s) => (
            <article className="lz" key={s.slug}>
              <div className="lz-img" aria-hidden="true">
                <Scene cloud={s.cloud} />
              </div>
              <div className="lz-body">
                <span className={`cloud-label ${s.cloud}`}>
                  <BrandIcon name={s.cloud} />
                  {s.label}
                </span>
                <h3>{s.title}</h3>
                <p>{s.summary}</p>
                <button type="button" className="link-btn" data-open={s.slug}>
                  Explore solution <span className="arr" aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="platform">
          <div>
            <span className="eyebrow">Multicloud developer platform</span>
            <h3>Help your team get from idea to launch.</h3>
            <p>
              A shared platform that makes it easier to launch and manage
              applications across cloud providers. A developer fills in a short
              form and gets a code repository, a delivery pipeline, a database,
              and a running service, set up the approved way.
            </p>
            <div className="stats">
              <div className="stat">
                <b>3 clouds</b>
                <span>one request format</span>
              </div>
              <div className="stat">
                <b>10 policies</b>
                <span>mapped to SOC 2 and CIS</span>
              </div>
              <div className="stat">
                <b>0 stored keys</b>
                <span>short-lived access only</span>
              </div>
            </div>
            <button type="button" className="btn btn-mint" data-open={platformSlug}>
              Explore the platform <span className="arr" aria-hidden="true">→</span>
            </button>
          </div>
          <div className="flow" aria-label="One shared platform serving AWS, Azure, and Google Cloud">
            <div className="flow-top">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" />
                <path d="m3 12 9 4.5 9-4.5" />
                <path d="m3 16.5 9 4.5 9-4.5" />
              </svg>
              <div>
                <b>Shared platform</b>
                <span>Template · Review · Deploy</span>
              </div>
            </div>
            <svg className="flow-lines" viewBox="0 0 360 44" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M180 0 V20 M60 44 V28 Q60 20 68 20 H292 Q300 20 300 28 V44 M180 20 V44"
                fill="none"
                stroke="var(--mint)"
                strokeWidth="1.5"
              />
              <circle cx="180" cy="20" r="3" fill="var(--mint)" />
            </svg>
            <div className="flow-clouds">
              <div className="ftile">
                <BrandIcon name="aws" />
                AWS<small>ECS Fargate · RDS</small>
              </div>
              <div className="ftile">
                <BrandIcon name="azure" />
                Azure<small>Container Apps · Postgres</small>
              </div>
              <div className="ftile">
                <BrandIcon name="gcp" />
                Google Cloud<small>Cloud Run · Cloud SQL</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MoreSolutions() {
  return (
    <section className="sec" id="more-solutions" aria-labelledby="more-title">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">More solutions</span>
          <h2 id="more-title">Security, reliability, and cost, solved live</h2>
          <p>
            Select any solution to see its architecture diagram, the full case
            study, and the code.
          </p>
        </div>
        <div className="sol-grid">
          {moreSolutions.map((s) => (
            <button type="button" className="sol" data-open={s.slug} key={s.slug}>
              <span className="sol-k">
                <BrandIcon name={s.cloud} />
                {s.label}
              </span>
              <span className="sol-t">{s.title}</span>
              <span className="sol-s">{s.summary}</span>
              <span className="sol-go">
                View solution <span aria-hidden="true">→</span>
              </span>
            </button>
          ))}
        </div>
        <p className="more">
          Every solution, with full write-ups, is on{" "}
          <a href="/work/">jordandesigns.io/work</a>.
        </p>
      </div>
    </section>
  );
}

// Small architectural scenes for the landing zone cards, one per cloud.
function Scene({ cloud }: { cloud: Cloud }) {
  if (cloud === "aws")
    return (
      <svg viewBox="0 0 320 170" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sk-aws" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e9d9c6" />
            <stop offset="1" stopColor="#f6ece0" />
          </linearGradient>
        </defs>
        <rect width="320" height="170" fill="url(#sk-aws)" />
        <path d="M0 108 L40 92 L78 100 L120 84 L160 98 L200 90 L200 120 L0 120 Z" fill="#c9b7a6" opacity=".7" />
        <rect y="118" width="320" height="52" fill="#e4dbd0" />
        <polygon points="70,128 220,128 238,118 88,118" fill="#efe8de" />
        <rect x="70" y="128" width="150" height="16" fill="#d8cdbf" />
        <polygon points="220,40 262,26 262,152 220,152" fill="#d3c8ba" />
        <rect x="192" y="40" width="28" height="112" fill="#e6ddd1" />
      </svg>
    );
  if (cloud === "azure")
    return (
      <svg viewBox="0 0 320 170" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sk-azure" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#bcd3e6" />
            <stop offset="1" stopColor="#e6eff6" />
          </linearGradient>
        </defs>
        <rect width="320" height="170" fill="url(#sk-azure)" />
        <rect y="112" width="320" height="18" fill="#7fa3bf" />
        <rect y="130" width="320" height="40" fill="#dfe6ea" />
        <path d="M40 150 V70 Q40 40 110 34 L190 30 V150 Z" fill="#cfd8de" />
        <path d="M190 30 Q240 36 250 70 V150 H190 Z" fill="#b6c3cc" />
        <rect x="210" y="132" width="90" height="10" fill="#eef2f4" />
      </svg>
    );
  return (
    <svg viewBox="0 0 320 170" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sk-gcp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d2e0dc" />
          <stop offset="1" stopColor="#eef3f1" />
        </linearGradient>
      </defs>
      <rect width="320" height="170" fill="url(#sk-gcp)" />
      <rect y="124" width="320" height="46" fill="#e2e8e5" />
      <path d="M110 150 V60 Q190 18 300 30 V150 Z" fill="#b9c9c4" />
      <path d="M150 150 V78 Q210 52 300 56 V150 Z" fill="#cdd9d5" />
      <polygon points="196,150 260,150 270,140 206,140" fill="#eef3f1" />
      <rect x="196" y="110" width="64" height="40" fill="#dde6e2" />
    </svg>
  );
}
