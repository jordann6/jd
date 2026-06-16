import { marqueeItems } from "@/lib/site";

export default function Marquee() {
  const block = marqueeItems.map((it, i) => (
    <span key={`${it}-${i}`} style={{ display: "contents" }}>
      <span className={i % 2 === 1 ? "dim" : undefined}>{it}</span>
      <span className="sep">●</span>
    </span>
  ));
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee__track">
        {block}
        {block}
      </div>
    </div>
  );
}
