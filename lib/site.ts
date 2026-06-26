export interface ExperienceRow {
  year: string;
  company: string;
  role: string;
  stack: string[];
}

export const experience: ExperienceRow[] = [
  {
    year: "2025—\nNOW",
    company: "Snorkel AI, Inc.",
    role: "DevOps Engineer",
    stack: ["GitHub Actions", "Kubernetes", "AKS", "AWS Lambda", "EventBridge", "CloudWatch", "Boto3", "Bandit", "Trivy", "OWASP ZAP", "Checkov"],
  },
  {
    year: "2025—\nNOW",
    company: "Independent Practice",
    role: "Cloud Engineer",
    stack: ["Azure Functions", "Cosmos DB", "Terraform", "Lambda", "CloudWatch", "EventBridge", "VNet", "Key Vault", "C#"],
  },
  {
    year: "2024—\n2025",
    company: "Wiggs CPA",
    role: "IT Support Specialist",
    stack: ["Azure", "AWS", "Terraform", "Python", "Bash", "Entra ID"],
  },
  {
    year: "2022—\n2024",
    company: "Wiggs CPA",
    role: "Desktop Specialist",
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
