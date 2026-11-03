import { BrandIcon } from "./Brand";

const BENEFITS = [
  {
    title: "Build with confidence",
    sub: "Organized foundations, written as code",
    icon: (
      <>
        <path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" />
        <path d="m3 12 9 4.5 9-4.5" />
        <path d="m3 16.5 9 4.5 9-4.5" />
      </>
    ),
  },
  {
    title: "Keep security in view",
    sub: "Clear controls and governance",
    icon: <path d="M12 3 5 6v5c0 4.4 3 8.3 7 10 4-1.7 7-5.6 7-10V6l-7-3Z" />,
  },
  {
    title: "See where money goes",
    sub: "Costs labeled and checked",
    icon: (
      <>
        <path d="M4 20V10" />
        <path d="M10 20V4" />
        <path d="M16 20v-7" />
        <path d="M22 20H2" />
      </>
    ),
  },
  {
    title: "Make delivery simpler",
    sub: "Consistent tools for your team",
    icon: (
      <>
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <path d="M16 5.2a3 3 0 0 1 0 5.6" />
        <path d="M18 14.3c1.8.8 3 2.6 3 4.7" />
      </>
    ),
  },
];

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <span className="eyebrow">Jordan · Multi-Cloud Engineer</span>
            <h1 id="hero-title">A stronger foundation for your cloud.</h1>
            <p className="lede">
              Secure, well-organized cloud environments on AWS, Azure, and
              Google Cloud, shaped around your team.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href="#solutions">
                Explore my solutions <span className="arr" aria-hidden="true">→</span>
              </a>
              <a className="btn btn-ghost" href="#contact">
                Discuss a solution
              </a>
            </div>
            <div className="cloud-chips" aria-label="Cloud providers">
              <span className="cchip">
                <BrandIcon name="aws" />
                AWS
              </span>
              <span className="cchip">
                <BrandIcon name="azure" />
                Microsoft Azure
              </span>
              <span className="cchip">
                <BrandIcon name="gcp" />
                Google Cloud
              </span>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <Slabs />
          </div>
        </div>

        <div className="bene">
          {BENEFITS.map((b) => (
            <div className="bene-item" key={b.title}>
              <span className="ico">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {b.icon}
                </svg>
              </span>
              <div>
                <h3>{b.title}</h3>
                <p>{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Three stacked slabs under an arch: the "foundation" metaphor.
function Slabs() {
  return (
    <svg viewBox="0 0 520 420">
      <defs>
        <linearGradient id="arch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ebe5db" />
          <stop offset="1" stopColor="#f3efe8" />
        </linearGradient>
        <radialGradient id="slab-shadow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#0f2233" stopOpacity=".22" />
          <stop offset="1" stopColor="#0f2233" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d="M150 400 V190 A170 170 0 0 1 490 190 V400 Z" fill="url(#arch)" />
      <ellipse cx="270" cy="372" rx="230" ry="26" fill="url(#slab-shadow)" />
      <g className="slab">
        <polygon points="60,270 360,270 430,230 130,230" fill="#33485c" />
        <polygon points="360,270 430,230 430,320 360,360" fill="#132232" />
        <rect x="60" y="270" width="300" height="90" fill="#1c2e3f" />
      </g>
      <g className="slab s2">
        <polygon points="130,190 350,190 410,156 190,156" fill="#c2dad5" />
        <polygon points="350,190 410,156 410,236 350,270" fill="#6f9993" />
        <rect x="130" y="190" width="220" height="80" fill="#8fb5ae" />
      </g>
      <g className="slab s3">
        <polygon points="190,95 340,95 390,67 240,67" fill="#f6f3ee" />
        <polygon points="340,95 390,67 390,162 340,190" fill="#cdc7bd" />
        <rect x="190" y="95" width="150" height="95" fill="#e6e1d8" />
      </g>
    </svg>
  );
}
