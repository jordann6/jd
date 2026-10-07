import { BrandIcon, JdLogo } from "./Brand";
import { contact } from "@/lib/solutions";
import VisitorCount from "@/components/VisitorCount";

function BrandLink({ label }: { label: string }) {
  return (
    <a className="brand" href="/#top" aria-label={label}>
      <JdLogo className="brand-mark" />
      <span className="brand-text">
        <span className="brand-name">
          jordandesigns<span className="tld">.io</span>
        </span>
        <span className="brand-sub">Cloud &amp; Platform Engineering</span>
      </span>
    </a>
  );
}

export function SiteHeader() {
  return (
    <header className="site-head">
      <div className="wrap">
        <BrandLink label="jordandesigns.io home" />
        <nav className="nav" aria-label="Main">
          <a href="/#services">Services</a>
          <a href="/#solutions">Solutions</a>
          <a href="/#approach">Approach</a>
          <a href="/#about">About</a>
          <a className="btn btn-primary" href="/#contact">
            Let&apos;s talk
          </a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <BrandLink label="jordandesigns.io, back to top" />
        <nav aria-label="Footer">
          <a href="/#services">Services</a>
          <a href="/#solutions">Solutions</a>
          <a href="/work/">All work</a>
          <a href="/#contact">Let&apos;s talk</a>
        </nav>
        <span className="visits">
          Visitors · <VisitorCount fallback="…" />
        </span>
        <div className="soc">
          <a href={contact.linkedin} aria-label="LinkedIn">
            <BrandIcon name="linkedin" />
          </a>
          <a href={contact.github} aria-label="GitHub">
            <BrandIcon name="github" />
          </a>
        </div>
      </div>
    </footer>
  );
}
