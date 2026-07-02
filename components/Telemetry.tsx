"use client";

import { useEffect, useState } from "react";
import { fetchVisitorCount } from "@/lib/visitorCount";

/**
 * The site reporting on itself: live counter API status and visit count,
 * plus build-time and infrastructure facts passed from the server layer.
 */
export default function Telemetry({ deployedAt }: { deployedAt: string }) {
  const [visits, setVisits] = useState("—");
  const [api, setApi] = useState<"wait" | "ok" | "err">("wait");

  useEffect(() => {
    let active = true;
    fetchVisitorCount().then((c) => {
      if (!active) return;
      setVisits(c);
      setApi(c === "---" ? "err" : "ok");
    });
    return () => {
      active = false;
    };
  }, []);

  const status =
    api === "ok" ? "Operational" : api === "err" ? "Degraded" : "Checking";

  return (
    <div className="telemetry" aria-label="Site telemetry">
      <span className="cell">
        <span className={`dot${api === "err" ? " err" : ""}`} />
        <span className="k">Status</span>
        <span className={api === "ok" ? "ok" : undefined}>{status}</span>
      </span>
      <span className="cell">
        <span className="k">Deployed</span>
        {deployedAt}
      </span>
      <span className="cell">
        <span className="k">Visits</span>
        {visits}
      </span>
      <span className="cell">
        <span className="k">Origin</span>
        Private S3 + CloudFront OAC
      </span>
      <span className="cell">
        <span className="k">Pipeline</span>
        GitHub Actions OIDC
      </span>
      <span className="cell">
        <span className="k">Counter</span>
        API Gateway + Lambda + DynamoDB
      </span>
    </div>
  );
}
