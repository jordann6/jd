"use client";

import { useEffect } from "react";

const CALENDLY_URL = "https://calendly.com/jordandn6";

export default function CalendlyEmbed() {
  useEffect(() => {
    const id = "calendly-widget-script";
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.id = id;
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <div
      className="calendly-inline-widget calendly-embed"
      data-url={`${CALENDLY_URL}?hide_gdpr_banner=1`}
    />
  );
}
