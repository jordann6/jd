import type { Diagram } from "@/lib/diagrams";

export default function CaseDiagram({ diagram }: { diagram: Diagram }) {
  return (
    <figure className="cs__flow reveal">
      <div className="flow">
        {diagram.cols.map((col, ci) => (
          <div className="flow__group" key={ci}>
            <div className="flow__col">
              {col.nodes.map((n, ni) => (
                <div
                  className={`flow__node${n.accent ? " accent" : ""}`}
                  key={ni}
                >
                  <div className="nl">{n.label}</div>
                  {n.sub && <div className="ns">{n.sub}</div>}
                </div>
              ))}
            </div>
            {ci < diagram.cols.length - 1 && (
              <div className="flow__arrow" aria-hidden>
                →
              </div>
            )}
          </div>
        ))}
      </div>
      <figcaption>↳ {diagram.caption}</figcaption>
    </figure>
  );
}
