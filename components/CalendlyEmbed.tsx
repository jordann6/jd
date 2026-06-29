"use client";

import { useEffect, useRef } from "react";

const CALENDLY_URL = "https://calendly.com/jordandn6";
const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

export default function CalendlyEmbed() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = ref.current;
    if (!parent) return;

    const init = () => {
      if (!window.Calendly || !ref.current) return;
      // Guard against double-init on re-render / client navigation.
      if (ref.current.querySelector("iframe")) return;
      window.Calendly.initInlineWidget({
        url: `${CALENDLY_URL}?hide_gdpr_banner=1`,
        parentElement: ref.current,
      });
    };

    // If the script is already present and loaded, init immediately.
    if (window.Calendly) {
      init();
      return;
    }

    const existing = document.getElementById(
      "calendly-widget-script",
    ) as HTMLScriptElement | null;

    if (existing) {
      existing.addEventListener("load", init);
      return () => existing.removeEventListener("load", init);
    }

    const s = document.createElement("script");
    s.id = "calendly-widget-script";
    s.src = SCRIPT_SRC;
    s.async = true;
    s.addEventListener("load", init);
    document.body.appendChild(s);

    return () => s.removeEventListener("load", init);
  }, []);

  return <div ref={ref} className="calendly-embed" />;
}
