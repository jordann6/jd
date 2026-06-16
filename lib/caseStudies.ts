export interface CaseBlock {
  num: string;
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface CaseStudy {
  slug: string;
  num: string;
  title: string;
  titleOut: string;
  category: string;
  lede: string;
  meta: { k: string; v: string }[];
  blocks: CaseBlock[];
  stack: string[];
  repo: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "aws-developer-platform",
    num: "20",
    title: "AWS Developer",
    titleOut: "Platform",
    category: "AWS · Platform",
    lede: "An internal developer platform on EKS that gives application teams a paved road: a one-line claim provisions hardened, policy-compliant AWS infrastructure with no static credentials anywhere.",
    meta: [
      { k: "Role", v: "Platform Eng" },
      { k: "Cloud", v: "AWS" },
      { k: "Control plane", v: "EKS" },
      { k: "IaC", v: "Terraform" },
    ],
    blocks: [
      {
        num: "/01",
        heading: "Problem",
        paragraphs: [
          "Application teams should not have to hand-write S3 buckets, wire IAM, and remember every hardening checkbox to ship a service. Doing so spreads inconsistent, often insecure infrastructure across an org and makes every new service a bespoke review.",
          "The goal was a paved road: a self-service interface where a developer declares what they need, and the platform returns a real, hardened, policy-compliant resource without ever touching cloud credentials.",
        ],
      },
      {
        num: "/02",
        heading: "Approach",
        bullets: [
          "ArgoCD app-of-apps GitOps reconciles every platform component from Git, so the cluster's desired state is version-controlled and auditable.",
          "Crossplane with an IRSA-authenticated AWS provider exposes a self-service Bucket API: a developer's one-line claim provisions a real S3 bucket, no static credentials in the path.",
          "Buckets are hardened by default: AES256 encryption, versioning, all four public-access-block settings, and a mandatory owning-team tag.",
          "Kyverno enforces an owning-team label as an admission policy in flagged namespaces, so non-compliant workloads are rejected at the API server.",
          "A Backstage golden-path template scaffolds a new service with a Dockerfile, a hardened Helm chart, and an ArgoCD Application, GitOps-deployable the moment it exists.",
        ],
      },
      {
        num: "/03",
        heading: "Architecture",
        paragraphs: [
          "EKS, the VPC, the OIDC provider, and the scoped IRSA role are all provisioned in Terraform with an S3 remote state backend. Crossplane assumes the IRSA role to act on AWS, which keeps credential material out of pods entirely.",
          "The platform layer (ArgoCD, Crossplane, Kyverno, Backstage) is itself reconciled by GitOps, so the boundary between cluster bootstrap (Terraform) and platform configuration (Git) is explicit.",
        ],
      },
      {
        num: "/04",
        heading: "Outcome",
        paragraphs: [
          "A developer's one-line claim yields a production-grade, hardened S3 bucket with zero credential handling and guaranteed tagging for cost attribution and ownership.",
          "Verified end to end against real AWS, then torn down clean, demonstrating the full provision-and-destroy lifecycle rather than a screenshot.",
        ],
      },
    ],
    stack: ["EKS", "ArgoCD", "Crossplane", "Kyverno", "Backstage", "IRSA", "Terraform", "GitOps"],
    repo: "https://github.com/jordann6/aws-developer-platform",
  },
  {
    slug: "azure-developer-platform",
    num: "21",
    title: "Azure Developer",
    titleOut: "Platform",
    category: "Azure · Platform",
    lede: "The Azure counterpart to the AWS platform, built on a deliberately different toolchain to prove the paved-road pattern is not cloud or tool specific.",
    meta: [
      { k: "Role", v: "Platform Eng" },
      { k: "Cloud", v: "Azure" },
      { k: "Control plane", v: "AKS" },
      { k: "IaC", v: "Terraform" },
    ],
    blocks: [
      {
        num: "/01",
        heading: "Problem",
        paragraphs: [
          "A paved-road platform is only convincing if it generalizes. Building one on AWS proves it works once; rebuilding the same developer experience on Azure with a different GitOps and identity stack proves the pattern, not the tooling.",
        ],
      },
      {
        num: "/02",
        heading: "Approach",
        bullets: [
          "Flux reconciles the platform from Git via GitRepository, Kustomization, and HelmRelease, the Azure-native counterpart to the AWS app-of-apps model.",
          "Crossplane with an Azure provider, authenticated through Azure Workload Identity, exposes a self-service StorageAccount API.",
          "A claim provisions a real storage account hardened by default: TLS1_2 minimum, HTTPS-only traffic, public blob access disabled, and infrastructure encryption, with no client secrets.",
          "Kyverno enforces owning-team labels as admission policy, identical governance intent to the AWS build.",
        ],
      },
      {
        num: "/03",
        heading: "Architecture",
        paragraphs: [
          "AKS with the OIDC issuer and workload identity enabled, plus a federated user-assigned managed identity, is provisioned in Terraform with an Azure Storage state backend.",
          "Workload Identity replaces IRSA as the credential-free bridge between the cluster and the cloud control plane, the key substitution that makes the pattern portable.",
        ],
      },
      {
        num: "/04",
        heading: "Outcome",
        paragraphs: [
          "Same developer experience as the AWS platform (one claim, one hardened resource, no secrets) delivered on an entirely different toolchain.",
          "Verified end to end against real Azure, then torn down clean.",
        ],
      },
    ],
    stack: ["AKS", "Flux", "Crossplane", "Workload Identity", "Kyverno", "Terraform", "GitOps"],
    repo: "https://github.com/jordann6/azure-developer-platform",
  },
  {
    slug: "aws-incident-responder",
    num: "23",
    title: "AWS Incident",
    titleOut: "Responder",
    category: "AWS · Platform · AI",
    lede: "Automated incident response where the runbook is a visual, version-controlled n8n workflow rather than glue code, with an LLM summarizing the incident in plain English.",
    meta: [
      { k: "Role", v: "Cloud / SRE" },
      { k: "Cloud", v: "AWS" },
      { k: "Runtime", v: "ECS Fargate" },
      { k: "Cost", v: "~$1/day" },
    ],
    blocks: [
      {
        num: "/01",
        heading: "Problem",
        paragraphs: [
          "Incident remediation logic buried in Lambda code is hard to read, hard to change, and invisible to anyone who is not the author. The aim was a runbook that is both automated and legible: a workflow a responder can read, reason about, and version-control.",
          "It is the deliberate counterpart to an earlier Lambda-glued remediation project: same incident class, a visual runbook instead of code.",
        ],
      },
      {
        num: "/02",
        heading: "Approach",
        bullets: [
          "A CloudWatch alarm on a target EC2 instance (CPU at or above 80% for two 5-minute periods) publishes to an SNS topic, delivered over HTTPS to n8n.",
          "The workflow confirms its own SNS subscription programmatically, then asks Claude Haiku for a plain-English incident summary and a recommended next step.",
          "It posts an incident card to Slack, reboots the instance via the EC2 API signed with SigV4, then waits and re-checks the alarm with DescribeAlarms to either resolve or escalate.",
          "Remediation runs under a least-privilege IAM user scoped to RebootInstances on the single target ARN plus read-only enrichment.",
        ],
      },
      {
        num: "/03",
        heading: "Architecture",
        paragraphs: [
          "n8n runs on ECS Fargate behind an ALB with an ACM certificate on a Route 53 subdomain. Secrets are pulled from SSM SecureString parameters at task start, so nothing sensitive lives in Terraform state.",
          "The whole stack is provisioned in Terraform and built to deploy, demo, and destroy for about a dollar a day.",
        ],
      },
      {
        num: "/04",
        heading: "Outcome",
        paragraphs: [
          "A self-healing incident loop that detects, explains, notifies, remediates, and verifies, with the entire decision path visible as a workflow diagram rather than opaque code.",
          "Paired with an Azure counterpart built on Container Apps and Entra service principals to demonstrate the same pattern across clouds.",
        ],
      },
    ],
    stack: ["ECS Fargate", "n8n", "CloudWatch", "SNS", "Claude Haiku", "ALB", "ACM", "Terraform"],
    repo: "https://github.com/jordann6/aws-incident-responder",
  },
  {
    slug: "cost-intelligence-dashboard",
    num: "01",
    title: "Cost Intelligence",
    titleOut: "Dashboard",
    category: "AWS · FinOps",
    lede: "A serverless FinOps platform that detects spend anomalies and forecasts cost before the billing period closes, with least-privilege isolation at every layer.",
    meta: [
      { k: "Role", v: "Cloud / FinOps" },
      { k: "Cloud", v: "AWS" },
      { k: "Resources", v: "34 (Terraform)" },
      { k: "Pattern", v: "Serverless" },
    ],
    blocks: [
      {
        num: "/01",
        heading: "Problem",
        paragraphs: [
          "Cloud spend surprises arrive after the billing period closes, when it is too late to act. Untagged resources make attribution impossible. The goal was to surface anomalies and a forward forecast early enough to do something about them.",
        ],
      },
      {
        num: "/02",
        heading: "Approach",
        bullets: [
          "A Lambda ingester pulls 90 days of Cost Explorer data into a DynamoDB single-table store daily.",
          "It runs z-score anomaly detection per service against a 30-day rolling baseline at a 2.5σ threshold, and generates a 14-day linear regression forecast on aggregate spend.",
          "A second Lambda scans all account resources via the Resource Groups Tagging API and flags missing required tags.",
          "An SNS alert fires on every analysis run that finds outliers; EventBridge Scheduler triggers ingestion at 01:00 UTC and analysis at 02:00 UTC.",
        ],
      },
      {
        num: "/03",
        heading: "Architecture",
        paragraphs: [
          "Results are served through an API Gateway HTTP API to a React frontend on S3 behind CloudFront with Origin Access Control.",
          "Three separate IAM execution roles enforce least privilege at each layer: the ingester (ce:GetCostAndUsage, tag:GetResources, DynamoDB write), the analyzer (DynamoDB read/write, SNS publish), and the API (DynamoDB read only).",
        ],
      },
      {
        num: "/04",
        heading: "Outcome",
        paragraphs: [
          "Spend anomalies are flagged before the billing period closes, and tagging gaps surface with the specific missing tag so cost attribution stays reliable.",
          "34 resources provisioned in Terraform with an S3 remote backend and native state locking, deployed via GitHub Actions OIDC.",
        ],
      },
    ],
    stack: ["Lambda", "Cost Explorer", "DynamoDB", "API Gateway", "CloudFront", "React", "EventBridge Scheduler", "Terraform"],
    repo: "https://github.com/jordann6/aws-cost-intelligence-dashboard",
  },
  {
    slug: "cloud-security-lab",
    num: "06",
    title: "Cloud Security",
    titleOut: "Lab",
    category: "AWS · Platform · Security",
    lede: "An end-to-end attack, detect, and respond lab across AWS and Kubernetes, executing a full MITRE ATT&CK kill chain and the detection and response controls that catch it.",
    meta: [
      { k: "Role", v: "Cloud Security" },
      { k: "Cloud", v: "AWS + K8s" },
      { k: "Resources", v: "62 (Terraform)" },
      { k: "Framework", v: "MITRE ATT&CK" },
    ],
    blocks: [
      {
        num: "/01",
        heading: "Problem",
        paragraphs: [
          "Detection rules are only trustworthy if you have seen them fire against a real attack. This lab builds both sides: an offensive kill chain and the defensive controls that should catch it, so detection efficacy is demonstrated rather than assumed.",
        ],
      },
      {
        num: "/02",
        heading: "Attack",
        bullets: [
          "Pacu executes a full MITRE ATT&CK kill chain: leaked IAM credentials, permission enumeration, privilege escalation from 1,039 to 15,319 permissions via policy attachment.",
          "Then S3 exfiltration of staged PII and lateral movement via STS role assumption.",
        ],
      },
      {
        num: "/03",
        heading: "Detect & Respond",
        bullets: [
          "CloudTrail and VPC Flow Logs feed an OpenSearch SIEM with a kill-chain correlation dashboard.",
          "GuardDuty findings on IAM threats trigger an EventBridge rule that fires a Lambda to automatically disable compromised access keys.",
          "On Kubernetes, Falco runs as a DaemonSet with four custom rules catching 100% of simulated runtime attacks: shell spawning, sensitive file reads, unauthorized binary execution, and container escape via host mount.",
          "OPA Gatekeeper enforces three constraint templates blocking privileged containers, host namespace access, and root execution across all non-system namespaces.",
        ],
      },
      {
        num: "/04",
        heading: "Outcome",
        paragraphs: [
          "A closed loop from exploitation to automated containment, with every control demonstrated against a live attack rather than described in the abstract.",
          "62 Terraform resources across 7 modules, deployable and destroyable on demand.",
        ],
      },
    ],
    stack: ["GuardDuty", "OpenSearch", "Falco", "OPA Gatekeeper", "EventBridge", "Lambda", "Pacu", "Terraform"],
    repo: "https://github.com/jordann6/cloud-security-lab",
  },
  {
    slug: "multi-agent-coding-orchestrator",
    num: "02",
    title: "Multi-Agent AI",
    titleOut: "Orchestrator",
    category: "AWS · AI",
    lede: "A fully asynchronous multi-agent system that routes natural-language coding tasks to specialist agents, designed around API Gateway's timeout instead of against it.",
    meta: [
      { k: "Role", v: "AI Infra" },
      { k: "Cloud", v: "AWS" },
      { k: "Pattern", v: "Async agents" },
      { k: "Model", v: "Anthropic" },
    ],
    blocks: [
      {
        num: "/01",
        heading: "Problem",
        paragraphs: [
          "Agentic loops that make sequential model tool-use calls routinely run longer than API Gateway's hard 29-second integration timeout, which breaks any synchronous request/response design.",
          "The system had to return fast, run the loop reliably in the background, and keep blast radius contained between agents.",
        ],
      },
      {
        num: "/02",
        heading: "Approach",
        bullets: [
          "The orchestrator returns 202 with a job ID in under two seconds, then the coder Lambda processes the agentic loop independently, writing results to DynamoDB with a 24-hour TTL.",
          "ARN-scoped least-privilege IAM isolates blast radius: the orchestrator can invoke only the coder Lambda, status can only read DynamoDB, and the coder cannot invoke any Lambda at all.",
          "The write_code, explain_code, and debug_code tools are deterministic Python functions returning structured scaffolds and AST metadata, grounding the loop in real code analysis instead of recursive LLM self-talk.",
        ],
      },
      {
        num: "/03",
        heading: "Architecture",
        paragraphs: [
          "Three separately sized Lambda packages, Secrets Manager for the Anthropic key, and CloudWatch log groups with 14-day retention, all provisioned in Terraform.",
        ],
      },
      {
        num: "/04",
        heading: "Outcome",
        paragraphs: [
          "A resilient async pattern that turns a platform constraint (the 29-second timeout) into the architecture, with grounded tools and tightly scoped permissions per agent.",
        ],
      },
    ],
    stack: ["Lambda", "API Gateway", "DynamoDB", "Anthropic SDK", "Terraform", "Python", "IAM", "Secrets Manager"],
    repo: "https://github.com/jordann6/multi-agent-coding-orchestrator",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
