import "./home.css";
import { caseStudies } from "@/lib/caseStudies";
import { getDiagram } from "@/lib/diagrams";
import { solutionSlugs } from "@/lib/solutions";
import { BrandSprite } from "@/components/home/Brand";
import { SiteFooter, SiteHeader } from "@/components/home/Chrome";
import Hero from "@/components/home/Hero";
import { LandingZones, MoreSolutions } from "@/components/home/Solutions";
import { About, Approach, Contact, Services } from "@/components/home/Sections";
import SolutionDialog, { type SolutionStudy } from "@/components/home/SolutionDialog";

// Only the ten featured case studies ship to the client, for the dialog.
const studies: Record<string, SolutionStudy> = Object.fromEntries(
  solutionSlugs.map((slug) => {
    const cs = caseStudies.find((c) => c.slug === slug);
    if (!cs) throw new Error(`lib/solutions.ts names unknown case study: ${slug}`);
    return [slug, { ...cs, diagram: getDiagram(slug) ?? null }];
  }),
);

export default function Home() {
  return (
    <>
      <BrandSprite />
      <a className="skip" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <LandingZones />
        <MoreSolutions />
        <Services />
        <Approach />
        <About />
        <Contact />
      </main>
      <SiteFooter />
      <SolutionDialog studies={studies} />
    </>
  );
}
