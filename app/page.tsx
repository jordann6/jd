import { caseStudies } from "@/lib/caseStudies";
import { getDiagram } from "@/lib/diagrams";
import { getArchitecture } from "@/lib/architecture";
import { solutionSlugs } from "@/lib/solutions";
import Hero from "@/components/home/Hero";
import { LandingZones, MoreSolutions } from "@/components/home/Solutions";
import { About, Approach, Contact, Services } from "@/components/home/Sections";
import SolutionDialog, { type SolutionStudy } from "@/components/home/SolutionDialog";

// Only the ten featured case studies ship to the client, for the dialog.
const studies: Record<string, SolutionStudy> = Object.fromEntries(
  solutionSlugs.map((slug) => {
    const cs = caseStudies.find((c) => c.slug === slug);
    if (!cs) throw new Error(`lib/solutions.ts names unknown case study: ${slug}`);
    return [
      slug,
      { ...cs, diagram: getDiagram(slug) ?? null, architecture: getArchitecture(slug) ?? null },
    ];
  }),
);

export default function Home() {
  return (
    <>
      <Hero />
      <LandingZones />
      <MoreSolutions />
      <Services />
      <Approach />
      <About />
      <Contact />
      <SolutionDialog studies={studies} />
    </>
  );
}
