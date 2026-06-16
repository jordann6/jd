import Link from "next/link";

export default function NotFound() {
  return (
    <article className="cs">
      <div className="cs__eyebrow">
        <span>↳ Error / 404</span>
        <span className="cat">Signal lost</span>
      </div>
      <h1 className="cs__title">
        Not <span className="out">Found</span>
      </h1>
      <p className="cs__lede">
        That route does not exist. The page may have moved, or the link is off.
      </p>
      <div className="cs__cta">
        <Link href="/" className="btn btn--primary">
          Back Home <span className="arrow">→</span>
        </Link>
      </div>
    </article>
  );
}
