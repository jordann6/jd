export interface DiagramNode {
  label: string;
  sub?: string;
  accent?: boolean;
}

export interface DiagramCol {
  nodes: DiagramNode[];
}

export interface Diagram {
  caption: string;
  cols: DiagramCol[];
}

// Hand-authored left-to-right architecture flows, keyed by case-study slug.
// A column with multiple nodes renders them stacked (a branch / fan-out).
export const diagrams: Record<string, Diagram> = {
  "aws-developer-platform": {
    caption: "Self-service paved road — claim to hardened AWS resource, no static credentials",
    cols: [
      { nodes: [{ label: "Developer", sub: "Backstage template" }] },
      { nodes: [{ label: "Git", sub: "app-of-apps" }] },
      {
        nodes: [
          { label: "ArgoCD", sub: "reconcile" },
          { label: "Kyverno", sub: "admission policy" },
        ],
      },
      { nodes: [{ label: "Crossplane", sub: "IRSA provider", accent: true }] },
      { nodes: [{ label: "S3 Bucket", sub: "AES256 · versioned · tagged", accent: true }] },
    ],
  },
  "azure-developer-platform": {
    caption: "Same paved road on Azure — Flux + Workload Identity replace ArgoCD + IRSA",
    cols: [
      { nodes: [{ label: "Developer", sub: "claim" }] },
      { nodes: [{ label: "Git", sub: "GitRepository" }] },
      {
        nodes: [
          { label: "Flux", sub: "Kustomization" },
          { label: "Kyverno", sub: "admission policy" },
        ],
      },
      { nodes: [{ label: "Crossplane", sub: "Workload Identity", accent: true }] },
      { nodes: [{ label: "Storage Acct", sub: "TLS1.2 · no public", accent: true }] },
    ],
  },
  "aws-incident-responder": {
    caption: "Alarm to SNS to n8n runbook — enrich, notify, remediate, then verify",
    cols: [
      { nodes: [{ label: "CloudWatch", sub: "alarm · CPU ≥ 80%" }] },
      { nodes: [{ label: "SNS", sub: "HTTPS delivery" }] },
      { nodes: [{ label: "n8n", sub: "ECS Fargate · ALB · ACM", accent: true }] },
      {
        nodes: [
          { label: "Claude Haiku", sub: "summary", accent: true },
          { label: "Slack", sub: "incident card" },
          { label: "EC2 Reboot", sub: "SigV4 · scoped IAM" },
        ],
      },
      { nodes: [{ label: "DescribeAlarms", sub: "resolve / escalate" }] },
    ],
  },
  "cost-intelligence-dashboard": {
    caption: "Scheduled ingest and analysis to a single-table store, served behind CloudFront",
    cols: [
      { nodes: [{ label: "EventBridge", sub: "scheduler 01:00/02:00" }] },
      {
        nodes: [
          { label: "Ingester λ", sub: "Cost Explorer" },
          { label: "Analyzer λ", sub: "z-score · forecast", accent: true },
        ],
      },
      { nodes: [{ label: "DynamoDB", sub: "single-table" }] },
      {
        nodes: [
          { label: "API Gateway", sub: "HTTP API" },
          { label: "SNS", sub: "anomaly alert" },
        ],
      },
      { nodes: [{ label: "React / S3", sub: "CloudFront · OAC", accent: true }] },
    ],
  },
  "cloud-security-lab": {
    caption: "Attack to detect to respond — Pacu kill chain, SIEM correlation, automated containment",
    cols: [
      { nodes: [{ label: "Pacu", sub: "leaked IAM creds" }] },
      {
        nodes: [
          { label: "PrivEsc", sub: "1k → 15k perms" },
          { label: "S3 Exfil + STS", sub: "lateral movement" },
        ],
      },
      { nodes: [{ label: "CloudTrail", sub: "+ VPC Flow Logs" }] },
      {
        nodes: [
          { label: "OpenSearch", sub: "kill-chain SIEM", accent: true },
          { label: "GuardDuty", sub: "IAM threat" },
          { label: "Falco + OPA", sub: "K8s runtime" },
        ],
      },
      { nodes: [{ label: "EventBridge λ", sub: "disable keys", accent: true }] },
    ],
  },
  "multi-agent-coding-orchestrator": {
    caption: "Async by design — return a job ID in under 2s, run the agentic loop in the background",
    cols: [
      { nodes: [{ label: "Client", sub: "NL coding task" }] },
      { nodes: [{ label: "Orchestrator λ", sub: "202 + job ID", accent: true }] },
      {
        nodes: [
          { label: "Coder λ", sub: "agentic loop", accent: true },
          { label: "Anthropic", sub: "tool use" },
        ],
      },
      { nodes: [{ label: "DynamoDB", sub: "24h TTL" }] },
      { nodes: [{ label: "Status λ", sub: "poll job" }] },
    ],
  },
};

export function getDiagram(slug: string): Diagram | undefined {
  return diagrams[slug];
}
