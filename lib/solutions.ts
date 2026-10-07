// Homepage content. Every solution slug must exist in lib/caseStudies.ts: the
// card opens that case study in a dialog and links to /work/<slug>/.

export type Cloud = "aws" | "azure" | "gcp";

export interface SolutionCard {
  slug: string;
  title: string;
  label: string;
  cloud: Cloud;
  summary: string;
}

export const landingZones: SolutionCard[] = [
  {
    slug: "aws-landing-zone",
    title: "AWS landing zone",
    label: "AWS",
    cloud: "aws",
    summary:
      "Eight separate accounts for security, shared services, applications, and experiments, with rules set once at the top.",
  },
  {
    slug: "azure-landing-zone",
    title: "Azure landing zone",
    label: "Microsoft Azure",
    cloud: "azure",
    summary:
      "A foundation for sensitive data where every new subscription inherits the security and tagging rules automatically.",
  },
  {
    slug: "gcp-landing-zone",
    title: "Google Cloud landing zone",
    label: "Google Cloud",
    cloud: "gcp",
    summary:
      "A full organization built as code, where nobody holds permanent admin rights and only signed software runs.",
  },
];

export const platformSlug = "multi-cloud-developer-platform";

export const moreSolutions: SolutionCard[] = [
  {
    slug: "multi-region-failover",
    title: "Multi-Region Failover",
    label: "Site reliability · AWS",
    cloud: "aws",
    summary:
      "Automatic disaster recovery. When a region fails, traffic moves and the backup database takes over without manual steps.",
  },
  {
    slug: "secrets-lifecycle",
    title: "Secrets Lifecycle",
    label: "Cloud security · AWS",
    cloud: "aws",
    summary:
      "Finds stored passwords and keys that are overdue for rotation and traces why each one was missed.",
  },
  {
    slug: "gpu-platform",
    title: "GPU Scheduling and FinOps",
    label: "AI infrastructure and FinOps · AWS",
    cloud: "aws",
    summary:
      "Shows whether expensive GPU hardware is doing useful work, shares it across teams, and runs on lower-cost spare capacity.",
  },
  {
    slug: "azure-finops-dashboard",
    title: "Azure FinOps Dashboard",
    label: "FinOps · Azure",
    cloud: "azure",
    summary:
      "Shows who owns the Azure spend, which resources changed behavior, and where money is wasted, with tagging enforced by policy.",
  },
  {
    slug: "azure-aks-runtime-security",
    title: "Kubernetes Runtime Security",
    label: "Cloud security · Azure",
    cloud: "azure",
    summary:
      "Layered protection for a running cluster: unsafe deployments are blocked, attacks are detected live, and the security team is alerted.",
  },
  {
    slug: "gcp-supply-chain-security",
    title: "Software Supply Chain Security",
    label: "DevSecOps · Google Cloud",
    cloud: "gcp",
    summary:
      "Only software built and signed by the company's own pipeline can run in production. Anything else is refused.",
  },
];

export const solutionSlugs = [
  ...landingZones.map((s) => s.slug),
  platformSlug,
  ...moreSolutions.map((s) => s.slug),
];

/** A plain-text run, or a link that opens a solution's case study. */
export type RelPart = string | { slug: string; label: string };

export interface Service {
  tag: string;
  title: string;
  desc: string;
  rel: RelPart[];
}

const lzLinks: RelPart[] = [
  { slug: "aws-landing-zone", label: "AWS" },
  ", ",
  { slug: "azure-landing-zone", label: "Azure" },
  ", and ",
  { slug: "gcp-landing-zone", label: "Google Cloud" },
  " landing zones",
];

export const services: Service[] = [
  {
    tag: "Migration",
    title: "Cloud migration",
    desc: "Moving applications and data into the cloud, or from one provider to another, with the secure foundation, access rules, and a rollback plan in place before anything moves.",
    rel: [...lzLinks, ", built to receive workloads"],
  },
  {
    tag: "Modernization",
    title: "Cloud modernization",
    desc: "Updating older systems to run in containers or serverless services, so they scale on demand and cost less to run.",
    rel: [
      { slug: platformSlug, label: "Multicloud developer platform" },
      ", ",
      { slug: "azure-aks-runtime-security", label: "Kubernetes runtime security" },
    ],
  },
  {
    tag: "DevOps",
    title: "CI/CD",
    desc: "Continuous integration and delivery. Every change is tested and deployed automatically, so releases are small and routine.",
    rel: [{ slug: "gcp-supply-chain-security", label: "Software supply chain security" }],
  },
  {
    tag: "DevOps",
    title: "Infrastructure as code",
    desc: "Cloud resources defined in versioned files, so any environment can be rebuilt exactly, reviewed, or removed on demand.",
    rel: ["Every solution here, written in Terraform"],
  },
  {
    tag: "DevOps",
    title: "GitOps",
    desc: "The code repository is the source of truth. Only reviewed, approved changes reach the live system.",
    rel: [{ slug: platformSlug, label: "Multicloud developer platform" }],
  },
  {
    tag: "DevOps",
    title: "DevSecOps",
    desc: "Security scans run inside the pipeline, catching leaked passwords and vulnerable software before release.",
    rel: [{ slug: "gcp-supply-chain-security", label: "Software supply chain security" }],
  },
  {
    tag: "Governance",
    title: "Policy as code",
    desc: "Company rules written as automated checks that approve or reject changes on their own, mapped to standards such as CIS, SOC 2, and HIPAA.",
    rel: [
      { slug: "azure-landing-zone", label: "Azure landing zone" },
      ", ",
      { slug: platformSlug, label: "developer platform" },
    ],
  },
  {
    tag: "Security",
    title: "Least privilege",
    desc: "People and systems get only the access they need, often for a limited time, with no long-lived passwords or keys.",
    rel: [
      { slug: "gcp-landing-zone", label: "Google Cloud landing zone" },
      ", ",
      { slug: "secrets-lifecycle", label: "Secrets lifecycle" },
    ],
  },
  {
    tag: "FinOps",
    title: "Cost visibility",
    desc: "Every resource labeled with an owner and cost center, waste surfaced, and expensive changes caught before they reach the bill.",
    rel: [
      { slug: "azure-finops-dashboard", label: "Azure FinOps dashboard" },
      ", ",
      { slug: "gpu-platform", label: "GPU scheduling and FinOps" },
    ],
  },
  {
    tag: "SRE",
    title: "Observability",
    desc: "Metrics, logs, and dashboards that show what a system is doing and why, before customers notice a problem.",
    rel: [
      { slug: "gpu-platform", label: "GPU scheduling and FinOps" },
      ", ",
      { slug: "azure-aks-runtime-security", label: "Kubernetes runtime security" },
    ],
  },
  {
    tag: "SRE",
    title: "SLOs and error budgets",
    desc: "A reliability target, such as 99.9% uptime, with alerts that fire when the system is on track to miss it.",
    rel: [{ slug: "azure-landing-zone", label: "Azure landing zone" }],
  },
  {
    tag: "SRE",
    title: "Automated failover",
    desc: "When a server, database, or region fails, traffic moves to a healthy copy without manual work.",
    rel: [
      { slug: "multi-region-failover", label: "Multi-region failover" },
      ", ",
      { slug: "azure-landing-zone", label: "Azure landing zone" },
    ],
  },
  {
    tag: "SRE",
    title: "Incident runbooks",
    desc: "Written, often automated, steps for responding to known problems, so recovery does not depend on one person.",
    rel: [{ slug: "aws-landing-zone", label: "AWS landing zone" }],
  },
  {
    tag: "SRE",
    title: "Postmortems and decision records",
    desc: "Every failure and major choice written down with its cause and fix, so it does not happen twice.",
    rel: [{ slug: platformSlug, label: "Multicloud developer platform" }],
  },
  {
    tag: "Automation",
    title: "Golden images",
    desc: "Pre-hardened server templates, so every new machine starts secure and identical.",
    rel: [
      { slug: "aws-landing-zone", label: "AWS" },
      " and ",
      { slug: "gcp-landing-zone", label: "Google Cloud" },
      " landing zones",
    ],
  },
];

export const contact = {
  email: "jordandn6@outlook.com",
  calendly: "https://calendly.com/jordandn6/30min",
  linkedin: "https://www.linkedin.com/in/jordan-nelson-aa0828165/",
  github: "https://github.com/jordann6",
  site: "https://jordandesigns.io",
};
