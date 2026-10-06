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
  "multi-region-failover": {
    caption: "One failure, two clocks: DNS shifts traffic in seconds while EventBridge crosses regions to promote the replica",
    cols: [
      { nodes: [{ label: "Route 53", sub: "health check · 10s" }] },
      {
        nodes: [
          { label: "DNS Failover", sub: "standby answers ~60s" },
          { label: "CloudWatch", sub: "alarm · us-east-1" },
        ],
      },
      { nodes: [{ label: "EventBridge", sub: "cross-region bus" }] },
      {
        nodes: [
          { label: "Failover Lambda", sub: "PromoteReadReplica", accent: true },
          { label: "SNS", sub: "operator notify" },
        ],
      },
      { nodes: [{ label: "RDS Replica", sub: "promoted · writable", accent: true }] },
    ],
  },
  "aws-developer-platform": {
    caption: "Self-service paved road — claim to hardened, cost-attributed AWS resource, no static credentials",
    cols: [
      { nodes: [{ label: "Developer", sub: "Backstage template" }] },
      { nodes: [{ label: "Git", sub: "app-of-apps · FinOps gate" }] },
      {
        nodes: [
          { label: "ArgoCD", sub: "reconcile" },
          { label: "Kyverno", sub: "attribution + hardening" },
          { label: "OpenCost", sub: "spend by namespace" },
        ],
      },
      {
        nodes: [
          { label: "Crossplane", sub: "IRSA provider", accent: true },
          { label: "External Secrets", sub: "IRSA" },
        ],
      },
      {
        nodes: [
          { label: "S3 Bucket", sub: "SSE-KMS · TLS-only · tagged", accent: true },
          { label: "Secrets Manager", sub: "adp/*" },
        ],
      },
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
  "azure-aks-runtime-security": {
    caption: "Defense in depth on AKS — Kyverno blocks unsafe pods at admission, Falco detects what an exempt workload does at runtime, Defender watches the cloud plane",
    cols: [
      { nodes: [{ label: "Pod Deploy", sub: "create request" }] },
      { nodes: [{ label: "Kyverno", sub: "admission · deny unsafe", accent: true }] },
      { nodes: [{ label: "AKS Pod", sub: "runs in exempt ns" }] },
      { nodes: [{ label: "Falco", sub: "eBPF · 5 ATT&CK rules", accent: true }] },
      {
        nodes: [
          { label: "Defender", sub: "cloud threat alerts" },
          { label: "Log Analytics", sub: "correlation" },
        ],
      },
    ],
  },
  "gpu-index-api": {
    caption: "A read-through cache in front of index-only plans: the hot path went from 166.6ms to 23.8ms",
    cols: [
      { nodes: [{ label: "Client", sub: "1,114 req/s · p95 8.3ms" }] },
      { nodes: [{ label: "ALB", sub: "ECS Fargate · no NAT" }] },
      {
        nodes: [
          { label: "FastAPI", sub: "async · Pydantic v2", accent: true },
          { label: "Rate Limit", sub: "token bucket · fails open" },
        ],
      },
      { nodes: [{ label: "Redis", sub: "read-through · 99.7% hit", accent: true }] },
      { nodes: [{ label: "PostgreSQL", sub: "index-only · 23.8ms", accent: true }] },
    ],
  },
  "secrets-lifecycle": {
    caption: "Consumer maps from CloudTrail turn a stale secret into an ordered runbook, then a separately-permissioned executor rotates the ones an operator approves",
    cols: [
      {
        nodes: [
          { label: "Go Scanner λ", sub: "worker pool · metadata only", accent: true },
          { label: "Explicit Deny", sub: "GetSecretValue · kms:ViaService" },
        ],
      },
      { nodes: [{ label: "DynamoDB", sub: "normalized inventory" }] },
      {
        nodes: [
          { label: "Analyzer λ", sub: "Athena · 90d CloudTrail", accent: true },
          { label: "Bedrock", sub: "runbook · strict JSON" },
        ],
      },
      {
        nodes: [
          { label: "Security Hub", sub: "ASFF findings" },
          { label: "S3 Evidence", sub: "Object Lock · governance" },
          { label: "Dashboard", sub: "static · S3" },
        ],
      },
      {
        nodes: [
          { label: "Executor λ", sub: "opt-in · tag-scoped role", accent: true },
          { label: "Four-Step Rotate", sub: "create · set · test · finish" },
        ],
      },
    ],
  },
  "azure-finops-dashboard": {
    caption: "Daily ingest, then statistics: sigma-tiered anomalies and a 14-day projection, all under one managed identity",
    cols: [
      { nodes: [{ label: "Timer Triggers", sub: "06:00 · 06:30 · 07:00 UTC" }] },
      { nodes: [{ label: "Cost Mgmt API", sub: "7-day actuals by resource" }] },
      {
        nodes: [
          { label: "Ingest Fn", sub: "C# .NET 8 · upsert" },
          { label: "Anomaly Fn", sub: "30d rolling · 2σ", accent: true },
          { label: "Forecast Fn", sub: "14d linear trend" },
        ],
      },
      { nodes: [{ label: "Cosmos DB", sub: "RBAC only · key auth off", accent: true }] },
      {
        nodes: [
          { label: "HTTP API", sub: "5 endpoints" },
          { label: "React SPA", sub: "Static Web Apps", accent: true },
        ],
      },
    ],
  },
  "azure-landing-zone": {
    caption: "One governed base, two workloads landing on it: policy is inherited from the management group, and the portal's failover is measured, not claimed",
    cols: [
      { nodes: [{ label: "Management Groups", sub: "Deny · CIS · HIPAA", accent: true }] },
      {
        nodes: [
          { label: "Hub VNet", sub: "Firewall · Bastion" },
          { label: "Spokes", sub: "dev · test · sandbox" },
        ],
      },
      {
        nodes: [
          { label: "Private AKS", sub: "etcd CMK · UDR egress", accent: true },
          { label: "PostgreSQL HA", sub: "zone-redundant" },
        ],
      },
      {
        nodes: [
          { label: "Front Door", sub: "Premium · WAF", accent: true },
          { label: "Container Apps", sub: "2 regions · Private Link" },
        ],
      },
      { nodes: [{ label: "SQL Failover Group", sub: "7.3 s · 0 writes lost", accent: true }] },
    ],
  },
  "aws-serverless-lakehouse": {
    caption: "Crawl what you do not control, declare what you do: the same query scans 156 B curated against 2.09 MB raw",
    cols: [
      { nodes: [{ label: "Orders CSV", sub: "50k rows · seed 42" }] },
      { nodes: [{ label: "S3 raw/", sub: "as produced upstream" }] },
      { nodes: [{ label: "Glue Crawler", sub: "infers schema · no DDL", accent: true }] },
      { nodes: [{ label: "Athena CTAS", sub: "declared contract", accent: true }] },
      {
        nodes: [
          { label: "S3 curated/", sub: "Snappy Parquet · 156 B", accent: true },
          { label: "athena-results/", sub: "7-day expiry" },
        ],
      },
    ],
  },
  "dbt-analytics-athena": {
    caption: "Transformations and their correctness checks are both versioned code, and one command reconciles the warehouse or fails the build",
    cols: [
      { nodes: [{ label: "dbt seed", sub: "5k rows · seed 42" }] },
      { nodes: [{ label: "Bronze", sub: "raw_orders · as-is" }] },
      { nodes: [{ label: "Silver", sub: "stg_orders view · typed", accent: true }] },
      {
        nodes: [
          { label: "category_revenue", sub: "by category · country", accent: true },
          { label: "daily_revenue", sub: "one row per day · AOV", accent: true },
        ],
      },
      {
        nodes: [
          { label: "12 Tests", sub: "gate every build", accent: true },
          { label: "Reconciliation", sub: "gold to silver, to the cent" },
        ],
      },
    ],
  },
  "gcp-workload-identity-federation": {
    caption: "A signed token becomes an hour-long credential, and the pool refuses everything else at the door",
    cols: [
      {
        nodes: [
          { label: "GitHub Actions", sub: "OIDC token · repo + ref" },
          { label: "AWS IAM Role", sub: "signed GetCallerIdentity" },
        ],
      },
      { nodes: [{ label: "Pool Provider", sub: "attribute condition", accent: true }] },
      {
        nodes: [
          { label: "principalSet", sub: "read by repo · write by ref", accent: true },
          { label: "gh-deployer", sub: "impersonation, for contrast" },
        ],
      },
      {
        nodes: [
          { label: "Secret Manager", sub: "CMEK encrypted" },
          { label: "Artifact Registry", sub: "same key" },
          { label: "GCS", sub: "write on main only" },
        ],
      },
      { nodes: [{ label: "Org Policy", sub: "key creation impossible", accent: true }] },
    ],
  },
  "gcp-landing-zone": {
    caption: "Nobody holds standing prod access: Terraform applies as one impersonated identity, and the perimeter decides what may leave",
    cols: [
      { nodes: [{ label: "sa-terraform", sub: "impersonated · no key", accent: true }] },
      {
        nodes: [
          { label: "Organization", sub: "15 constraints · 3 CEL" },
          { label: "PAM", sub: "1h prod · approved" },
        ],
      },
      {
        nodes: [
          { label: "Project Factory", sub: "folder · audit · CMEK" },
          { label: "Org Sinks", sub: "BigQuery · 13 alerts" },
        ],
      },
      {
        nodes: [
          { label: "VPC-SC", sub: "restricted Shared VPC", accent: true },
          { label: "Cloud NGFW", sub: "FQDN egress · PSC" },
        ],
      },
      {
        nodes: [
          { label: "Private GKE", sub: "BinAuthz · WI", accent: true },
          { label: "Cloud SQL HA", sub: "CMEK · DR replica" },
        ],
      },
    ],
  },
  "aws-landing-zone": {
    caption: "Guardrails live above the account, so a workload inherits them and cannot switch them off, and its only way out is the inspected hub",
    cols: [
      { nodes: [{ label: "Organization", sub: "8 accounts · 4 OUs", accent: true }] },
      {
        nodes: [
          { label: "SCPs", sub: "region · S3 · detective" },
          { label: "Identity Center", sub: "personas · short sessions" },
        ],
      },
      {
        nodes: [
          { label: "Org CloudTrail", sub: "Object Lock · KMS" },
          { label: "Security acct", sub: "GuardDuty · Sec Hub · secrets scan" },
        ],
      },
      {
        nodes: [
          { label: "Transit Gateway", sub: "RAM-shared hub" },
          { label: "Network Firewall", sub: "domain allowlist", accent: true },
        ],
      },
      {
        nodes: [
          { label: "Private EKS", sub: "IRSA · KMS secrets", accent: true },
          { label: "RDS Multi-AZ", sub: "Vault Lock backup" },
          { label: "Golden AMI", sub: "STIG + CIS · SSM only" },
        ],
      },
    ],
  },
  "gcp-supply-chain-security": {
    caption: "The signing key and the policy that checks it never share a project, so bypassing the gate takes two compromises",
    cols: [
      { nodes: [{ label: "Cloud Build", sub: "dedicated identity" }] },
      {
        nodes: [
          { label: "Artifact Registry", sub: "resolved to a digest" },
          { label: "Packer bake", sub: "hardened image family" },
        ],
      },
      {
        nodes: [
          { label: "Artifact Analysis", sub: "synchronous scan" },
          { label: "KMS asymmetric key", sub: "signs only if clean", accent: true },
        ],
      },
      {
        nodes: [
          { label: "Binary Authorization", sub: "verify only, cannot sign", accent: true },
          { label: "trustedImageProjects", sub: "one project allowed" },
        ],
      },
      {
        nodes: [
          { label: "Cloud Run", sub: "attested digest admitted" },
          { label: "Unsigned digest", sub: "refused at deploy" },
        ],
      },
    ],
  },
  "gcp-gke-config-sync": {
    caption: "Two paths to cluster state: one loop that reconciles, one gate that refuses",
    cols: [
      { nodes: [{ label: "GitHub", sub: "config/ on main" }] },
      { nodes: [{ label: "Config Sync", sub: "polls every 15s" }] },
      {
        nodes: [
          { label: "Reconciler", sub: "applies · reverts drift", accent: true },
          { label: "Policy Controller", sub: "admission webhook", accent: true },
        ],
      },
      {
        nodes: [
          { label: "team-a", sub: "quota · RBAC · NetworkPolicy" },
          { label: "Refused", sub: "unapproved registry" },
        ],
      },
      { nodes: [{ label: "Cloud NAT", sub: "only egress path" }] },
    ],
  },
  "gcp-zero-trust-access": {
    caption: "One identity, one role, one object: the answer changes with which side of the perimeter the request came from",
    cols: [
      {
        nodes: [
          { label: "Administrator", sub: "identity + network" },
          { label: "Analyst SA", sub: "impersonated, no key" },
        ],
      },
      {
        nodes: [
          { label: "Trusted level", sub: "identity AND ip" },
          { label: "Management level", sub: "identity only, break glass" },
        ],
      },
      {
        nodes: [
          { label: "IAP", sub: "IAM condition per request", accent: true },
          { label: "IAP TCP tunnel", sub: "ssh, no public IP" },
        ],
      },
      {
        nodes: [
          { label: "Service perimeter", sub: "storage + bigquery", accent: true },
          { label: "Cloud Run", sub: "iap_enabled" },
        ],
      },
      {
        nodes: [
          { label: "Read from inside", sub: "admitted" },
          { label: "Same role, outside", sub: "refused, VPC-SC" },
        ],
      },
    ],
  },
  "hpc-slurm-cluster": {
    caption: "One binary, one grid, two fabrics: the only thing that changes is what the halo exchange runs over",
    cols: [
      { nodes: [{ label: "SSM send-command", sub: "no key, no port 22" }] },
      { nodes: [{ label: "Head node", sub: "slurmctld · private" }] },
      {
        nodes: [
          { label: "compute queue", sub: "c6i.large · ENA" },
          { label: "efa queue", sub: "c5n.9xlarge · EFA", accent: true },
        ],
      },
      {
        nodes: [
          { label: "17.5% comm", sub: "3.290s blocked" },
          { label: "0.8% comm", sub: "0.176s blocked", accent: true },
        ],
      },
      { nodes: [{ label: "FSx Lustre", sub: "S3 association · /scratch" }] },
    ],
  },
  "gpu-platform": {
    caption: "The gauge everyone graphs says the card is full; occupancy says a little over half of it, and the difference has a price",
    cols: [
      { nodes: [{ label: "Kueue", sub: "tenant quota \u00b7 preemption" }] },
      { nodes: [{ label: "Karpenter", sub: "spot GPU node in 47s" }] },
      {
        nodes: [
          { label: "GPU Operator", sub: "device plugin \u00b7 time-slicing" },
          { label: "DCGM exporter", sub: "SM_ACTIVE, not GPU_UTIL", accent: true },
        ],
      },
      {
        nodes: [
          { label: "GPU_UTIL 100%", sub: "the card looks full" },
          { label: "SM_ACTIVE 45.82%", sub: "$0.0168 of $0.0310 idle", accent: true },
        ],
      },
      { nodes: [{ label: "Collector", sub: "DynamoDB \u00b7 reaper in dry-run" }] },
    ],
  },
  "golden-path-finops-copilot": {
    caption:
      "Plain-language request to a reviewed pull request: the model only proposes, deterministic tools and an OPA gate decide, and nothing reaches Terraform until a human merges",
    cols: [
      { nodes: [{ label: "Developer", sub: "plain-language request" }] },
      { nodes: [{ label: "Claude on Bedrock", sub: "drives tool loop \u00b7 IAM/SigV4", accent: true }] },
      {
        nodes: [
          { label: "right_size", sub: "cheapest that fits" },
          { label: "estimate_cost", sub: "region-aware \u00b7 Infracost" },
          { label: "check_budget", sub: "team envelope" },
        ],
      },
      { nodes: [{ label: "OPA / Rego", sub: "deny tags \u00b7 GPU \u00b7 budget \u00b7 host posture", accent: true }] },
      { nodes: [{ label: "Pull Request", sub: "tfvars \u00b7 cost \u00b7 rationale", accent: true }] },
      { nodes: [{ label: "Human merge", sub: "then Terraform applies", accent: true }] },
    ],
  },
  "multi-cloud-developer-platform": {
    caption: "One API, three clouds: a reviewed pull request becomes infrastructure on the team's cloud, with no static credentials",
    cols: [
      {
        nodes: [
          {
            label: "Developer",
            sub: "Backstage template",
          },
        ],
      },
      {
        nodes: [
          {
            label: "GitHub",
            sub: "reviewed PR · CI",
          },
        ],
      },
      {
        nodes: [
          {
            label: "Argo CD",
            sub: "sync main",
          },
          {
            label: "Kyverno",
            sub: "10 policies · admission",
          },
        ],
      },
      {
        nodes: [
          {
            label: "Crossplane v2",
            sub: "Database · WebService",
            accent: true,
          },
        ],
      },
      {
        nodes: [
          {
            label: "AWS",
            sub: "RDS · ECS Fargate",
            accent: true,
          },
          {
            label: "GCP",
            sub: "Cloud SQL · Cloud Run",
            accent: true,
          },
          {
            label: "Azure",
            sub: "Flexible Server · Container Apps",
            accent: true,
          },
        ],
      },
    ],
  },
};

export function getDiagram(slug: string): Diagram | undefined {
  return diagrams[slug];
}
