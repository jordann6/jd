"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Adds the `.in` class to `.reveal` elements as they scroll into view.
export default function RevealInit() {
  const pathname = usePathname();
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [pathname]);
  return null;
}
