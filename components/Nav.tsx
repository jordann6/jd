"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

// Targets are sections on the homepage. Plain <a> tags (not next/link) so the
// jump home is a full page load and the homepage's own stylesheet loads clean.
const LINKS = [
  { num: "01", label: "Services", target: "services" },
  { num: "02", label: "Solutions", target: "solutions" },
  { num: "03", label: "Approach", target: "approach" },
  { num: "04", label: "About", target: "about" },
  { num: "05", label: "Contact", target: "contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [active, setActive] = useState("hero");

  useEffect(() => {
    if (!onHome) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.5 },
    );
    LINKS.map((l) => l.target)
      .concat("hero")
      .forEach((id) => {
        const el = document.getElementById(id);
        if (el) obs.observe(el);
      });
    return () => obs.disconnect();
  }, [onHome]);

  const handleClick = (e: React.MouseEvent, target: string) => {
    if (!onHome) return; // let the /#target link navigate
    e.preventDefault();
    const el = document.getElementById(target);
    if (el)
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 40,
        behavior: "smooth",
      });
  };

  return (
    <nav className="nav">
      <a href="/" className="nav__logo" aria-label="jordandesigns.io home">
        <Logo />
        Jordan<span className="dim-dot">.</span>
      </a>
      <ul className="nav__links">
        {LINKS.map((l) => (
          <li key={l.target}>
            <a
              href={`/#${l.target}`}
              className={`nav__link${active === l.target ? " active" : ""}`}
              onClick={(e) => handleClick(e, l.target)}
            >
              <span className="num">{l.num}</span>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="nav__time">
        <span>
          <span className="label">Status</span>Available
        </span>
        <a
          href="/#contact"
          className="nav__cta"
          onClick={(e) => handleClick(e, "contact")}
        >
          Let&apos;s Talk <span className="arrow">→</span>
        </a>
      </div>
    </nav>
  );
}
