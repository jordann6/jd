"use client";

import { useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [label, setLabel] = useState("Copy");

  const copy = () => {
    navigator.clipboard.writeText(email).then(
      () => {
        setLabel("Copied");
        setTimeout(() => setLabel("Copy"), 1800);
      },
      () => setLabel("Copy failed"),
    );
  };

  return (
    <div className="email-row">
      <a className="email" href={`mailto:${email}`}>
        {email}
      </a>
      <button type="button" className="copy" onClick={copy}>
        {label}
      </button>
    </div>
  );
}
