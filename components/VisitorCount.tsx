"use client";

import { useEffect, useState } from "react";
import { fetchVisitorCount } from "@/lib/visitorCount";

export default function VisitorCount({ fallback = "—" }: { fallback?: string }) {
  const [count, setCount] = useState(fallback);
  useEffect(() => {
    let active = true;
    fetchVisitorCount().then((c) => {
      if (active) setCount(c);
    });
    return () => {
      active = false;
    };
  }, []);
  return <>{count}</>;
}
