import type { ArchitectureImage } from "@/lib/architecture";
import type { Diagram } from "@/lib/diagrams";

// Older case-study copy uses em dashes; the site voice uses commas.
export function plain(s: string) {
  return s.replace(/\s*—\s*/g, ", ");
}

/** The repo's official-icon architecture diagram, framed in white for both themes. */
export function ArchitectureFigure({
  image,
  title,
}: {
  image: ArchitectureImage;
  title: string;
}) {
  return (
    <figure className="arch">
      <div className="diagram-head">
        <span>Architecture</span>
        <a href={image.src} target="_blank" rel="noopener noreferrer">
          Open full size ↗
        </a>
      </div>
      <div className="arch-frame">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
        <img
          src={image.src}
          width={image.width}
          height={image.height}
          alt={`Architecture diagram for ${title}`}
          loading="lazy"
          decoding="async"
        />
      </div>
    </figure>
  );
}

/** The hand-authored left-to-right flow from lib/diagrams.ts. */
export function FlowDiagram({ diagram }: { diagram: Diagram }) {
  return (
    <figure className="diagram">
      <div className="diagram-head">
        <span>How it flows</span>
      </div>
      <div className="diagram-scroll">
        <div className="diagram-flow">
          {diagram.cols.map((col, i) => (
            <FlowCol key={i} first={i === 0} nodes={col.nodes} />
          ))}
        </div>
      </div>
      <figcaption>{plain(diagram.caption)}</figcaption>
    </figure>
  );
}

function FlowCol({
  nodes,
  first,
}: {
  nodes: Diagram["cols"][number]["nodes"];
  first: boolean;
}) {
  return (
    <>
      {!first && <span className="arrow">→</span>}
      <div className="dcol">
        {nodes.map((n) => (
          <div key={n.label} className={`dnode${n.accent ? " accent" : ""}`}>
            <span className="dl">{n.label}</span>
            {n.sub && <span className="ds">{n.sub}</span>}
          </div>
        ))}
      </div>
    </>
  );
}
