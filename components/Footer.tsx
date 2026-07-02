import Telemetry from "./Telemetry";

// Evaluated once at build time; every deploy is a build, so this is the
// honest "last deployed" timestamp.
const deployedAt =
  new Date().toISOString().slice(0, 16).replace("T", " ") + " UTC";

export default function Footer() {
  return (
    <>
      <Telemetry deployedAt={deployedAt} />
      <footer className="footer">
        <span>© 2026 Jordan</span>
        <span className="footer__c">↳ Designed &amp; Operated by jd</span>
        <span className="footer__r">
          Built on <span className="lit">AWS</span> · jordandesigns.io
        </span>
      </footer>
    </>
  );
}
