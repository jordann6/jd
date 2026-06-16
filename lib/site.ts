export interface ExperienceRow {
  year: string;
  company: string;
  role: string;
  bullets: string[];
  stack: string[];
}

export const experience: ExperienceRow[] = [
  {
    year: "2025—\nNOW",
    company: "Snorkel AI, Inc.",
    role: "DevOps Engineer",
    bullets: [
      "Integrated Bandit, Trivy, OWASP ZAP, and Checkov into a unified GitHub Actions DevSecOps pipeline with policy-violation build gates, reducing bad build promotion by 90%.",
      "Deployed Kubernetes blue-green rollouts on AKS with kubectl traffic switching and readiness-probe-gated rollbacks, eliminating downtime and cutting deployment failures by ~70%.",
      "Automated EC2 recovery using Lambda, EventBridge, and CloudWatch metric alarms with Boto3 remediation on latency degradation, cutting MTTR by ~40% with zero on-call engagement.",
    ],
    stack: ["GitHub Actions", "Kubernetes", "AKS", "AWS Lambda", "EventBridge", "CloudWatch", "Boto3", "Bandit", "Trivy", "OWASP ZAP", "Checkov"],
  },
  {
    year: "2025—\nNOW",
    company: "Independent Practice",
    role: "Cloud Engineer",
    bullets: [
      "Engineered a cost-visibility platform using Azure Functions (C# .NET 8), Cosmos DB, and Terraform with z-score anomaly detection and 14-day regression forecasting, flagging spend anomalies before billing periods closed.",
      "Configured production monitoring using Lambda (Python 3.13), EventBridge, and CloudWatch custom metrics (IsHealthy, LatencyMs, SSLDaysRemaining) with 5-minute intervals and dual-threshold alarms, detecting outages before users reported them.",
      "Enforced VNet segmentation, NSG allow-list rules, and Key Vault RBAC across a multi-VM Azure environment using Terraform, limiting lateral movement risk on any compromised workload.",
    ],
    stack: ["Azure Functions", "Cosmos DB", "Terraform", "Lambda", "CloudWatch", "EventBridge", "VNet", "Key Vault", "C#"],
  },
  {
    year: "2024—\n2025",
    company: "Wiggs CPA",
    role: "IT Support Specialist",
    bullets: [
      "Executed a cloud rehosting migration from AWS to Azure with full service dependency mapping.",
      "Provisioned and rightsized Azure infrastructure with IaC, maintaining 99%+ uptime post-migration.",
      "Engineered Python & Bash scripts for Entra ID auth remediation — resolution time down ~50%.",
    ],
    stack: ["Azure", "AWS", "Terraform", "Python", "Bash", "Entra ID"],
  },
  {
    year: "2022—\n2024",
    company: "Wiggs CPA",
    role: "Desktop Specialist",
    bullets: [
      "Standardized diagnostic runbooks, reducing complex incident resolution time by ~30% and streamlining Tier-2 handoffs.",
      "Resolved 40+ monthly MFA and authentication incidents while maintaining high first-contact resolution rates.",
    ],
    stack: ["Active Directory", "MFA", "Runbooks", "Incident Response"],
  },
];

export interface SkillGroup {
  label: string;
  tags: string[];
}

export const skills: SkillGroup[] = [
  { label: "/Languages", tags: ["Python", "JavaScript", "Bash", "Go", "C#", "SQL"] },
  { label: "/Cloud", tags: ["AWS", "Azure", "GCP"] },
  { label: "/Infra", tags: ["Docker", "Kubernetes", "Linux", "Terraform"] },
  { label: "/Pipelines", tags: ["GitHub Actions", "CI/CD"] },
  { label: "/Observability", tags: ["Prometheus", "Grafana", "PromQL", "Falco"] },
  { label: "/AI Infra", tags: ["LLM Gateway", "RAG Pipelines", "Vector Search", "OpenAI / Anthropic"] },
];

export interface Cert {
  sigil: string;
  sub: string;
  name: string;
  provider: string;
  status: "Active" | "Expired";
}

export const certs: Cert[] = [
  { sigil: "AWS", sub: "SAA—C03", name: "Solutions Architect Associate", provider: "Amazon Web Services", status: "Active" },
  { sigil: "AZ", sub: "—104", name: "Azure Administrator Associate", provider: "Microsoft Azure", status: "Expired" },
];

export const marqueeItems = [
  "Cloud",
  "DevOps",
  "Platform",
  "Reliability",
  "Security",
  "Automation",
  "Observability",
  "AI Infra",
];
