import { experience } from "@/lib/site";

export default function Experience() {
  return (
    <section id="experience" className="stage exp">
      <div className="sec-head reveal">
        <span className="sec-head__num">/02</span>
        <h2 className="sec-head__title">Work</h2>
        <span className="sec-head__meta">
          Selected positions
          <br />
          2022 — Present
        </span>
      </div>
      <div className="reveal">
        {experience.map((row, i) => (
          <div className="exp__row" key={`${row.company}-${i}`}>
            <div className="yr">
              {row.year.split("\n").map((line, j) => (
                <span key={j}>
                  {line}
                  {j === 0 ? <br /> : null}
                </span>
              ))}
            </div>
            <div className="co">
              <div className="label">↳ Employer</div>
              <div className="name">{row.company}</div>
            </div>
            <div className="body">
              <div className="role">{row.role}</div>
              <div className="stack">
                {row.stack.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
