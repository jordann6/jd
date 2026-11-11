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
    slug: "eks-network-segmentation",
    title: "Kubernetes Network Segmentation",
    label: "Kubernetes security · AWS",
    cloud: "aws",
    summary:
      "Assumes one service is already compromised and proves, path by path on a live cluster, how little it can reach once network rules are in place.",
  },
  {
    slug: "gcp-supply-chain-security",
    title: "Supply Chain Security",
    label: "Supply chain security · GCP",
    cloud: "gcp",
    summary:
      "A signature over a digest, not a check on where an image came from. An unsigned container gets refused at deploy, even one built by the same pipeline, with the attestor named in the denial.",
  },
  {
    slug: "multi-region-failover",
    title: "Multi-Region Failover",
    label: "Site reliability · AWS",
    cloud: "aws",
    summary:
      "Automatic disaster recovery. When a region fails, traffic moves and the backup database takes over without manual steps.",
  },
  {
    slug: "k8s-self-healing-platform",
    title: "Self-Healing Kubernetes",
    label: "Kubernetes reliability · AWS + Azure",
    cloud: "aws",
    summary:
      "Breaks live clusters on AWS and Azure on purpose, from bad releases and dead servers to rotated passwords and an active intruder, and measures whether they recover on their own.",
  },
  {
    slug: "azure-secrets-lifecycle",
    title: "Secrets Lifecycle",
    label: "Cloud security · Azure",
    cloud: "azure",
    summary:
      "Finds passwords and keys that are overdue for rotation, and proves against the live cloud that its own access is read-only.",
  },
  {
    slug: "cost-intelligence-dashboard",
    title: "Cost Intelligence Dashboard",
    label: "FinOps · AWS",
    cloud: "aws",
    summary:
      "Shows who owns the spend, where money is wasted, what each request costs, and what next month will cost.",
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
    tag: "Kubernetes",
    title: "Kubernetes",
    desc: "Clusters on all three clouds, run from Git, with network rules between services, runtime threat detection, and policies that block unsafe workloads before they start.",
    rel: [
      { slug: "k8s-self-healing-platform", label: "Self-healing Kubernetes" },
      ", ",
      { slug: "eks-network-segmentation", label: "EKS network segmentation" },
      ", ",
      { slug: "azure-aks-runtime-security", label: "AKS runtime security" },
      ", ",
      { slug: "gcp-gke-config-sync", label: "GKE GitOps with Config Sync" },
    ],
  },
  {
    tag: "DevOps",
    title: "CI/CD",
    desc: "Continuous integration and delivery. Every change is tested and deployed automatically, so releases are small and routine.",
    rel: [
      { slug: "release-guard", label: "Verified .NET delivery" },
      ", ",
      { slug: "aws-landing-zone", label: "Gated infrastructure pipeline" },
      ", ",
      { slug: "gcp-supply-chain-security", label: "Software supply chain security" },
    ],
  },
  {
    tag: "DevOps",
    title: "Infrastructure as code",
    desc: "Cloud resources defined in versioned files, so any environment can be rebuilt exactly, reviewed, or removed on demand.",
    rel: [
      "Every solution here, written in Terraform; ",
      { slug: "aws-landing-zone", label: "applied through a gated pipeline" },
      " and ",
      { slug: "aws-landing-zone", label: "checked daily for drift" },
    ],
  },
  {
    tag: "DevOps",
    title: "GitOps",
    desc: "The code repository is the source of truth. Only reviewed, approved changes reach the live system.",
    rel: [
      { slug: platformSlug, label: "Multicloud developer platform" },
      ", ",
      { slug: "release-guard", label: "Verified .NET delivery" },
    ],
  },
  {
    tag: "DevOps",
    title: "DevSecOps",
    desc: "Security scans run inside the pipeline, catching leaked passwords and vulnerable software before release.",
    rel: [
      { slug: "gcp-supply-chain-security", label: "Software supply chain security" },
      ", ",
      { slug: "release-guard", label: "Verified .NET delivery" },
    ],
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
    rel: [
      { slug: "aws-incident-responder", label: "Incident responder" },
      ", ",
      { slug: "k8s-self-healing-platform", label: "Self-healing Kubernetes" },
      ", ",
      { slug: "aws-landing-zone", label: "AWS landing zone" },
    ],
  },
  {
    tag: "SRE",
    title: "Postmortems and decision records",
    desc: "Every failure and major choice written down with its cause and fix, so it does not happen twice.",
    rel: [
      { slug: platformSlug, label: "Multicloud developer platform" },
      ", ",
      { slug: "release-guard", label: "Verified .NET delivery" },
    ],
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

/** Every case study the homepage can open: the solution cards plus any study a
 * service card links to that is not itself a card. */
export const dialogSlugs = [
  ...new Set([
    ...solutionSlugs,
    ...services.flatMap((s) => s.rel.flatMap((r) => (typeof r === "string" ? [] : [r.slug]))),
  ]),
];

export const contact = {
  email: "jordandn6@outlook.com",
  calendly: "https://calendly.com/jordandn6/30min",
  linkedin: "https://www.linkedin.com/in/jordan-nelson-aa0828165/",
  github: "https://github.com/jordann6",
  site: "https://jordandesigns.io",
};
