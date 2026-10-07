import "../globals.css";
import { buildVol, siteVersion } from "@/lib/build";
import FrameHud from "@/components/FrameHud";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";

// The case-study pages keep the editorial design system and its chrome.
export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FrameHud vol={buildVol} version={siteVersion} />
      <Nav />
      <main>{children}</main>
      <Footer />
      <RevealInit />
    </>
  );
}
