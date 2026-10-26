export interface DiagramNode {
  label: string;
  /** Official service icon in public/icons/, named provider-category-service. */
  icon?: string;
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
      { nodes: [{ label: "Route 53", icon: "aws-network-route-53", sub: "health check · 10s" }] },
      {
        nodes: [
          { label: "DNS Failover", icon: "aws-network-route-53-hosted-zone", sub: "standby answers ~60s" },
          { label: "CloudWatch", icon: "aws-management-cloudwatch", sub: "alarm · us-east-1" },
        ],
      },
      { nodes: [{ label: "EventBridge", icon: "aws-integration-eventbridge", sub: "cross-region bus" }] },
      {
        nodes: [
          { label: "Failover Lambda", icon: "aws-compute-lambda", sub: "PromoteReadReplica", accent: true },
          { label: "SNS", icon: "aws-integration-simple-notification-service-sns", sub: "operator notify" },
        ],
      },
      { nodes: [{ label: "RDS Replica", icon: "aws-database-rds", sub: "promoted · writable", accent: true }] },
    ],
  },
  "aws-developer-platform": {
    caption: "Self-service paved road, claim to hardened, cost-attributed AWS resource, no static credentials",
    cols: [
      { nodes: [{ label: "Developer", icon: "onprem-client-user", sub: "Backstage template" }] },
      { nodes: [{ label: "Git", icon: "onprem-vcs-git", sub: "app-of-apps · FinOps gate" }] },
      {
        nodes: [
          { label: "ArgoCD", icon: "onprem-gitops-argocd", sub: "reconcile" },
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
          { label: "S3 Bucket", icon: "aws-storage-simple-storage-service-s3", sub: "SSE-KMS · TLS-only · tagged", accent: true },
          { label: "Secrets Manager", icon: "aws-security-secrets-manager", sub: "adp/*" },
        ],
      },
    ],
  },
  "azure-developer-platform": {
    caption: "Same paved road on Azure, Flux + Workload Identity replace ArgoCD + IRSA",
    cols: [
      { nodes: [{ label: "Developer", icon: "onprem-client-user", sub: "claim" }] },
      { nodes: [{ label: "Git", icon: "onprem-vcs-git", sub: "GitRepository" }] },
      {
        nodes: [
          { label: "Flux", icon: "onprem-gitops-flux", sub: "Kustomization" },
          { label: "Kyverno", sub: "admission policy" },
        ],
      },
      { nodes: [{ label: "Crossplane", sub: "Workload Identity", accent: true }] },
      { nodes: [{ label: "Storage Acct", icon: "azure-storage-storage-accounts", sub: "TLS1.2 · no public", accent: true }] },
    ],
  },
  "aws-incident-responder": {
    caption: "Alarm to SNS to n8n runbook, enrich, notify, remediate, then verify",
    cols: [
      { nodes: [{ label: "CloudWatch", icon: "aws-management-cloudwatch", sub: "alarm · CPU ≥ 80%" }] },
      { nodes: [{ label: "SNS", icon: "aws-integration-simple-notification-service-sns", sub: "HTTPS delivery" }] },
      { nodes: [{ label: "n8n", icon: "saas-automation-n8n", sub: "ECS Fargate · ALB · ACM", accent: true }] },
      {
        nodes: [
          { label: "Claude Haiku", icon: "aws-ml-bedrock", sub: "summary", accent: true },
          { label: "Slack", icon: "saas-chat-slack", sub: "incident card" },
          { label: "EC2 Reboot", icon: "aws-compute-ec2", sub: "SigV4 · scoped IAM" },
        ],
      },
      { nodes: [{ label: "DescribeAlarms", icon: "aws-management-cloudwatch", sub: "resolve / escalate" }] },
    ],
  },
  "cost-intelligence-dashboard": {
    caption: "Scheduled ingest and analysis to a single-table store, served behind CloudFront",
    cols: [
      { nodes: [{ label: "EventBridge", icon: "aws-integration-eventbridge", sub: "scheduler 01:00/02:00" }] },
      {
        nodes: [
          { label: "Ingester λ", icon: "aws-compute-lambda", sub: "Cost Explorer" },
          { label: "Analyzer λ", icon: "aws-compute-lambda", sub: "z-score · forecast", accent: true },
        ],
      },
      { nodes: [{ label: "DynamoDB", icon: "aws-database-dynamodb", sub: "single-table" }] },
      {
        nodes: [
          { label: "API Gateway", icon: "aws-network-api-gateway", sub: "HTTP API" },
          { label: "SNS", icon: "aws-integration-simple-notification-service-sns", sub: "anomaly alert" },
        ],
      },
      { nodes: [{ label: "React / S3", icon: "aws-network-cloudfront", sub: "CloudFront · OAC", accent: true }] },
    ],
  },
  "cloud-security-lab": {
    caption: "Attack to detect to respond, Pacu kill chain, SIEM correlation, automated containment",
    cols: [
      { nodes: [{ label: "Pacu", icon: "programming-language-python", sub: "leaked IAM creds" }] },
      {
        nodes: [
          { label: "PrivEsc", icon: "aws-security-identity-and-access-management-iam", sub: "1k → 15k perms" },
          { label: "S3 Exfil + STS", icon: "aws-storage-simple-storage-service-s3", sub: "lateral movement" },
        ],
      },
      { nodes: [{ label: "CloudTrail", icon: "aws-management-cloudtrail", sub: "+ VPC Flow Logs" }] },
      {
        nodes: [
          { label: "OpenSearch", icon: "aws-analytics-amazon-opensearch-service", sub: "kill-chain SIEM", accent: true },
          { label: "GuardDuty", icon: "aws-security-guardduty", sub: "IAM threat" },
          { label: "Falco + OPA", sub: "K8s runtime" },
        ],
      },
      { nodes: [{ label: "EventBridge λ", icon: "aws-compute-lambda", sub: "disable keys", accent: true }] },
    ],
  },
  "multi-agent-coding-orchestrator": {
    caption: "Async by design, return a job ID in under 2s, run the agentic loop in the background",
    cols: [
      { nodes: [{ label: "Client", icon: "onprem-client-client", sub: "NL coding task" }] },
      { nodes: [{ label: "Orchestrator λ", icon: "aws-compute-lambda", sub: "202 + job ID", accent: true }] },
      {
        nodes: [
          { label: "Coder λ", icon: "aws-compute-lambda", sub: "agentic loop", accent: true },
          { label: "Anthropic", sub: "tool use" },
        ],
      },
      { nodes: [{ label: "DynamoDB", icon: "aws-database-dynamodb", sub: "24h TTL" }] },
      { nodes: [{ label: "Status λ", icon: "aws-compute-lambda", sub: "poll job" }] },
    ],
  },
  "azure-aks-runtime-security": {
    caption: "Defense in depth on AKS, Kyverno blocks unsafe pods at admission, Falco detects what an exempt workload does at runtime, Defender watches the cloud plane",
    cols: [
      { nodes: [{ label: "Pod Deploy", icon: "k8s-compute-pod", sub: "create request" }] },
      { nodes: [{ label: "Kyverno", sub: "admission · deny unsafe", accent: true }] },
      { nodes: [{ label: "AKS Pod", icon: "azure-compute-kubernetes-services", sub: "runs in exempt ns" }] },
      { nodes: [{ label: "Falco", sub: "eBPF · 5 ATT&CK rules", accent: true }] },
      {
        nodes: [
          { label: "Defender", icon: "azure-security-microsoft-defender-for-cloud", sub: "cloud threat alerts" },
          { label: "Log Analytics", icon: "azure-analytics-log-analytics-workspaces", sub: "correlation" },
        ],
      },
    ],
  },
  "gpu-index-api": {
    caption: "A read-through cache in front of index-only plans: the hot path went from 166.6ms to 23.8ms",
    cols: [
      { nodes: [{ label: "Client", icon: "onprem-client-client", sub: "1,114 req/s · p95 8.3ms" }] },
      { nodes: [{ label: "ALB", icon: "aws-network-elastic-load-balancing", sub: "ECS Fargate · no NAT" }] },
      {
        nodes: [
          { label: "FastAPI", icon: "programming-framework-fastapi", sub: "async · Pydantic v2", accent: true },
          { label: "Rate Limit", sub: "token bucket · fails open" },
        ],
      },
      { nodes: [{ label: "Redis", icon: "aws-database-elasticache-for-redis", sub: "read-through · 99.7% hit", accent: true }] },
      { nodes: [{ label: "PostgreSQL", icon: "aws-database-rds-postgresql-instance", sub: "index-only · 23.8ms", accent: true }] },
    ],
  },
  "secrets-lifecycle": {
    caption: "Consumer maps from CloudTrail turn a stale secret into an ordered runbook, then a separately-permissioned executor rotates the ones an operator approves",
    cols: [
      {
        nodes: [
          { label: "Go Scanner λ", icon: "aws-compute-lambda", sub: "worker pool · metadata only", accent: true },
          { label: "Explicit Deny", icon: "aws-security-identity-and-access-management-iam", sub: "GetSecretValue · kms:ViaService" },
        ],
      },
      { nodes: [{ label: "DynamoDB", icon: "aws-database-dynamodb", sub: "normalized inventory" }] },
      {
        nodes: [
          { label: "Analyzer λ", icon: "aws-compute-lambda", sub: "Athena · 90d CloudTrail", accent: true },
          { label: "Bedrock", icon: "aws-ml-bedrock", sub: "runbook · strict JSON" },
        ],
      },
      {
        nodes: [
          { label: "Security Hub", icon: "aws-security-security-hub", sub: "ASFF findings" },
          { label: "S3 Evidence", icon: "aws-storage-simple-storage-service-s3", sub: "Object Lock · governance" },
          { label: "Dashboard", icon: "aws-storage-simple-storage-service-s3", sub: "static · S3" },
        ],
      },
      {
        nodes: [
          { label: "Executor λ", icon: "aws-compute-lambda", sub: "opt-in · tag-scoped role", accent: true },
          { label: "Four-Step Rotate", icon: "aws-security-secrets-manager", sub: "create · set · test · finish" },
        ],
      },
    ],
  },
  "azure-finops-dashboard": {
    caption: "Daily ingest, then statistics: sigma-tiered anomalies and a 14-day projection, all under one managed identity",
    cols: [
      { nodes: [{ label: "Timer Triggers", icon: "azure-compute-function-apps", sub: "06:00 · 06:30 · 07:00 UTC" }] },
      { nodes: [{ label: "Cost Mgmt API", sub: "7-day actuals by resource" }] },
      {
        nodes: [
          { label: "Ingest Fn", icon: "azure-compute-function-apps", sub: "C# .NET 8 · upsert" },
          { label: "Anomaly Fn", icon: "azure-compute-function-apps", sub: "30d rolling · 2σ", accent: true },
          { label: "Forecast Fn", icon: "azure-compute-function-apps", sub: "14d linear trend" },
        ],
      },
      { nodes: [{ label: "Cosmos DB", icon: "azure-database-cosmos-db", sub: "RBAC only · key auth off", accent: true }] },
      {
        nodes: [
          { label: "HTTP API", icon: "azure-compute-function-apps", sub: "5 endpoints" },
          { label: "React SPA", icon: "azure-web-static-apps", sub: "Static Web Apps", accent: true },
        ],
      },
    ],
  },
  "azure-landing-zone": {
    caption: "One governed base, two workloads landing on it: policy is inherited from the management group, and the portal's failover is measured, not claimed",
    cols: [
      { nodes: [{ label: "Management Groups", icon: "azure-general-management-groups", sub: "Deny · CIS · HIPAA", accent: true }] },
      {
        nodes: [
          { label: "Hub VNet", icon: "azure-network-firewall", sub: "Firewall · Bastion" },
          { label: "Spokes", icon: "azure-network-virtual-networks", sub: "dev · test · sandbox" },
        ],
      },
      {
        nodes: [
          { label: "Private AKS", icon: "azure-compute-kubernetes-services", sub: "etcd CMK · UDR egress", accent: true },
          { label: "PostgreSQL HA", icon: "azure-database-database-for-postgresql-servers", sub: "zone-redundant" },
        ],
      },
      {
        nodes: [
          { label: "Front Door", icon: "azure-network-front-doors", sub: "Premium · WAF", accent: true },
          { label: "Container Apps", icon: "azure-compute-container-apps", sub: "2 regions · Private Link" },
        ],
      },
      { nodes: [{ label: "SQL Failover Group", icon: "azure-database-sql-databases", sub: "7.3 s · 0 writes lost", accent: true }] },
    ],
  },
  "aws-serverless-lakehouse": {
    caption: "Crawl what you do not control, declare what you do: the same query scans 156 B curated against 2.09 MB raw",
    cols: [
      { nodes: [{ label: "Orders CSV", sub: "50k rows · seed 42" }] },
      { nodes: [{ label: "S3 raw/", icon: "aws-storage-simple-storage-service-s3", sub: "as produced upstream" }] },
      { nodes: [{ label: "Glue Crawler", icon: "aws-analytics-glue-crawlers", sub: "infers schema · no DDL", accent: true }] },
      { nodes: [{ label: "Athena CTAS", icon: "aws-analytics-athena", sub: "declared contract", accent: true }] },
      {
        nodes: [
          { label: "S3 curated/", icon: "aws-storage-simple-storage-service-s3", sub: "Snappy Parquet · 156 B", accent: true },
          { label: "athena-results/", icon: "aws-storage-simple-storage-service-s3", sub: "7-day expiry" },
        ],
      },
    ],
  },
  "dbt-analytics-athena": {
    caption: "Transformations and their correctness checks are both versioned code, and one command reconciles the warehouse or fails the build",
    cols: [
      { nodes: [{ label: "dbt seed", icon: "onprem-analytics-dbt", sub: "5k rows · seed 42" }] },
      { nodes: [{ label: "Bronze", icon: "aws-analytics-athena", sub: "raw_orders · as-is" }] },
      { nodes: [{ label: "Silver", icon: "aws-analytics-athena", sub: "stg_orders view · typed", accent: true }] },
      {
        nodes: [
          { label: "category_revenue", icon: "aws-analytics-athena", sub: "by category · country", accent: true },
          { label: "daily_revenue", icon: "aws-analytics-athena", sub: "one row per day · AOV", accent: true },
        ],
      },
      {
        nodes: [
          { label: "12 Tests", icon: "onprem-analytics-dbt", sub: "gate every build", accent: true },
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
          { label: "GitHub Actions", icon: "onprem-ci-github-actions", sub: "OIDC token · repo + ref" },
          { label: "AWS IAM Role", icon: "aws-security-identity-and-access-management-iam-role", sub: "signed GetCallerIdentity" },
        ],
      },
      { nodes: [{ label: "Pool Provider", icon: "gcp-security-iam", sub: "attribute condition", accent: true }] },
      {
        nodes: [
          { label: "principalSet", icon: "gcp-security-iam", sub: "read by repo · write by ref", accent: true },
          { label: "gh-deployer", icon: "gcp-security-iam", sub: "impersonation, for contrast" },
        ],
      },
      {
        nodes: [
          { label: "Secret Manager", icon: "gcp-security-secret-manager", sub: "CMEK encrypted" },
          { label: "Artifact Registry", icon: "gcp-devtools-container-registry", sub: "same key" },
          { label: "GCS", icon: "gcp-storage-storage", sub: "write on main only" },
        ],
      },
      { nodes: [{ label: "Org Policy", icon: "gcp-security-resource-manager", sub: "key creation impossible", accent: true }] },
    ],
  },
  "gcp-landing-zone": {
    caption: "Nobody holds standing prod access: Terraform applies as one impersonated identity, and the perimeter decides what may leave",
    cols: [
      { nodes: [{ label: "sa-terraform", icon: "onprem-iac-terraform", sub: "impersonated · no key", accent: true }] },
      {
        nodes: [
          { label: "Organization", icon: "gcp-security-resource-manager", sub: "15 constraints · 3 CEL" },
          { label: "PAM", icon: "gcp-security-iam", sub: "1h prod · approved" },
        ],
      },
      {
        nodes: [
          { label: "Project Factory", icon: "gcp-security-resource-manager", sub: "folder · audit · CMEK" },
          { label: "Org Sinks", icon: "gcp-operations-logging", sub: "BigQuery · 13 alerts" },
        ],
      },
      {
        nodes: [
          { label: "VPC-SC", icon: "gcp-security-access-context-manager", sub: "restricted Shared VPC", accent: true },
          { label: "Cloud NGFW", icon: "gcp-network-firewall-rules", sub: "FQDN egress · PSC" },
        ],
      },
      {
        nodes: [
          { label: "Private GKE", icon: "gcp-compute-kubernetes-engine", sub: "BinAuthz · WI", accent: true },
          { label: "Cloud SQL HA", icon: "gcp-database-sql", sub: "CMEK · DR replica" },
        ],
      },
      {
        nodes: [
          { label: "Golden image VM", icon: "gcp-compute-compute-engine", sub: "mirror bake · IAP only" },
          { label: "Incident handler", icon: "gcp-security-security-command-center", sub: "SCC to quarantine", accent: true },
        ],
      },
    ],
  },
  "aws-landing-zone": {
    caption: "Guardrails live above the account, so a workload inherits them and cannot switch them off, and its only way out is the inspected hub",
    cols: [
      { nodes: [{ label: "Organization", icon: "aws-management-organizations", sub: "8 accounts · 4 OUs", accent: true }] },
      {
        nodes: [
          { label: "SCPs", icon: "aws-management-organizations-organizational-unit", sub: "region · S3 · detective" },
          { label: "Identity Center", icon: "aws-security-single-sign-on", sub: "personas · short sessions" },
        ],
      },
      {
        nodes: [
          { label: "Org CloudTrail", icon: "aws-management-cloudtrail", sub: "Object Lock · KMS" },
          { label: "Security acct", icon: "aws-security-guardduty", sub: "GuardDuty · forensics · secrets scan" },
        ],
      },
      {
        nodes: [
          { label: "Transit Gateway", icon: "aws-network-transit-gateway", sub: "RAM-shared hub" },
          { label: "Network Firewall", icon: "aws-network-network-firewall", sub: "domain allowlist", accent: true },
        ],
      },
      {
        nodes: [
          { label: "Private EKS", icon: "aws-compute-elastic-kubernetes-service", sub: "IRSA · KMS secrets", accent: true },
          { label: "RDS Multi-AZ", icon: "aws-database-rds", sub: "Vault Lock backup" },
          { label: "Golden AMI", icon: "aws-compute-ec2", sub: "STIG + CIS · SSM only" },
          { label: "us-west-2 standby", icon: "aws-network-route-53", sub: "replica · DNS failover" },
        ],
      },
    ],
  },
  "gcp-supply-chain-security": {
    caption: "The signing key and the policy that checks it never share a project, so bypassing the gate takes two compromises",
    cols: [
      { nodes: [{ label: "Cloud Build", icon: "gcp-devtools-build", sub: "dedicated identity" }] },
      {
        nodes: [
          { label: "Artifact Registry", icon: "gcp-devtools-container-registry", sub: "resolved to a digest" },
          { label: "Packer bake", icon: "gcp-compute-compute-engine", sub: "hardened image family" },
        ],
      },
      {
        nodes: [
          { label: "Artifact Analysis", icon: "gcp-security-security-scanner", sub: "synchronous scan" },
          { label: "KMS asymmetric key", icon: "gcp-security-key-management-service", sub: "signs only if clean", accent: true },
        ],
      },
      {
        nodes: [
          { label: "Binary Authorization", icon: "gcp-compute-binary-authorization", sub: "verify only, cannot sign", accent: true },
          { label: "trustedImageProjects", sub: "one project allowed" },
        ],
      },
      {
        nodes: [
          { label: "Cloud Run", icon: "gcp-compute-run", sub: "attested digest admitted" },
          { label: "Unsigned digest", sub: "refused at deploy" },
        ],
      },
    ],
  },
  "gcp-gke-config-sync": {
    caption: "Two paths to cluster state: one loop that reconciles, one gate that refuses",
    cols: [
      { nodes: [{ label: "GitHub", icon: "onprem-vcs-github", sub: "config/ on main" }] },
      { nodes: [{ label: "Config Sync", icon: "gcp-compute-kubernetes-engine", sub: "polls every 15s" }] },
      {
        nodes: [
          { label: "Reconciler", icon: "gcp-compute-kubernetes-engine", sub: "applies · reverts drift", accent: true },
          { label: "Policy Controller", icon: "gcp-compute-kubernetes-engine", sub: "admission webhook", accent: true },
        ],
      },
      {
        nodes: [
          { label: "team-a", sub: "quota · RBAC · NetworkPolicy" },
          { label: "Refused", sub: "unapproved registry" },
        ],
      },
      { nodes: [{ label: "Cloud NAT", icon: "gcp-network-nat", sub: "only egress path" }] },
    ],
  },
  "gcp-zero-trust-access": {
    caption: "One identity, one role, one object: the answer changes with which side of the perimeter the request came from",
    cols: [
      {
        nodes: [
          { label: "Administrator", icon: "onprem-client-user", sub: "identity + network" },
          { label: "Analyst SA", icon: "gcp-security-iam", sub: "impersonated, no key" },
        ],
      },
      {
        nodes: [
          { label: "Trusted level", icon: "gcp-security-access-context-manager", sub: "identity AND ip" },
          { label: "Management level", icon: "gcp-security-access-context-manager", sub: "identity only, break glass" },
        ],
      },
      {
        nodes: [
          { label: "IAP", icon: "gcp-security-iap", sub: "IAM condition per request", accent: true },
          { label: "IAP TCP tunnel", icon: "gcp-security-iap", sub: "ssh, no public IP" },
        ],
      },
      {
        nodes: [
          { label: "Service perimeter", icon: "gcp-security-access-context-manager", sub: "storage + bigquery", accent: true },
          { label: "Cloud Run", icon: "gcp-compute-run", sub: "iap_enabled" },
        ],
      },
      {
        nodes: [
          { label: "Read from inside", icon: "gcp-analytics-bigquery", sub: "admitted" },
          { label: "Same role, outside", sub: "refused, VPC-SC" },
        ],
      },
    ],
  },
  "hpc-slurm-cluster": {
    caption: "One binary, one grid, two fabrics: the only thing that changes is what the halo exchange runs over",
    cols: [
      { nodes: [{ label: "SSM send-command", icon: "aws-management-systems-manager", sub: "no key, no port 22" }] },
      { nodes: [{ label: "Head node", icon: "aws-compute-ec2", sub: "slurmctld · private" }] },
      {
        nodes: [
          { label: "compute queue", icon: "aws-compute-ec2", sub: "c6i.large · ENA" },
          { label: "efa queue", icon: "aws-compute-ec2", sub: "c5n.9xlarge · EFA", accent: true },
        ],
      },
      {
        nodes: [
          { label: "17.5% comm", sub: "3.290s blocked" },
          { label: "0.8% comm", sub: "0.176s blocked", accent: true },
        ],
      },
      { nodes: [{ label: "FSx Lustre", icon: "aws-storage-fsx-for-lustre", sub: "S3 association · /scratch" }] },
    ],
  },
  "gpu-platform": {
    caption: "The gauge everyone graphs says the card is full; occupancy says a little over half of it, and the difference has a price",
    cols: [
      { nodes: [{ label: "Kueue", sub: "tenant quota \u00b7 preemption" }] },
      { nodes: [{ label: "Karpenter", icon: "aws-compute-elastic-kubernetes-service", sub: "spot GPU node in 47s" }] },
      {
        nodes: [
          { label: "GPU Operator", icon: "aws-compute-elastic-kubernetes-service", sub: "device plugin \u00b7 time-slicing" },
          { label: "DCGM exporter", icon: "onprem-monitoring-prometheus", sub: "SM_ACTIVE, not GPU_UTIL", accent: true },
        ],
      },
      {
        nodes: [
          { label: "GPU_UTIL 100%", sub: "the card looks full" },
          { label: "SM_ACTIVE 45.82%", sub: "$0.0168 of $0.0310 idle", accent: true },
        ],
      },
      { nodes: [{ label: "Collector", icon: "aws-database-dynamodb", sub: "DynamoDB \u00b7 reaper in dry-run" }] },
    ],
  },
  "golden-path-finops-copilot": {
    caption:
      "Plain-language request to a reviewed pull request: the model only proposes, deterministic tools and an OPA gate decide, and nothing reaches Terraform until a human merges",
    cols: [
      { nodes: [{ label: "Developer", icon: "onprem-client-user", sub: "plain-language request" }] },
      { nodes: [{ label: "Claude on Bedrock", icon: "aws-ml-bedrock", sub: "drives tool loop \u00b7 IAM/SigV4", accent: true }] },
      {
        nodes: [
          { label: "right_size", sub: "cheapest that fits" },
          { label: "estimate_cost", sub: "region-aware \u00b7 Infracost" },
          { label: "check_budget", sub: "team envelope" },
        ],
      },
      { nodes: [{ label: "OPA / Rego", sub: "deny tags \u00b7 GPU \u00b7 budget \u00b7 host posture", accent: true }] },
      { nodes: [{ label: "Pull Request", icon: "onprem-vcs-github", sub: "tfvars \u00b7 cost \u00b7 rationale", accent: true }] },
      { nodes: [{ label: "Human merge", icon: "onprem-vcs-github", sub: "then Terraform applies", accent: true }] },
    ],
  },
  "multi-cloud-developer-platform": {
    caption: "One API, three clouds: a reviewed pull request becomes infrastructure on the team's cloud, with no static credentials",
    cols: [
      {
        nodes: [
          {
            label: "Developer", icon: "onprem-client-user",
            sub: "Backstage template",
          },
        ],
      },
      {
        nodes: [
          {
            label: "GitHub", icon: "onprem-vcs-github",
            sub: "reviewed PR · CI",
          },
        ],
      },
      {
        nodes: [
          {
            label: "Argo CD", icon: "onprem-gitops-argocd",
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
            label: "AWS", icon: "aws-compute-fargate",
            sub: "RDS · ECS Fargate",
            accent: true,
          },
          {
            label: "GCP", icon: "gcp-compute-run",
            sub: "Cloud SQL · Cloud Run",
            accent: true,
          },
          {
            label: "Azure", icon: "azure-compute-container-apps",
            sub: "Flexible Server · Container Apps",
            accent: true,
          },
        ],
      },
    ],
  },
  "release-guard": {
    caption: "The pipeline ships an artifact and waits; only the verifier inside the cluster can write the verdict",
    cols: [
      { nodes: [{ label: "10 PR checks", icon: "onprem-ci-github-actions", sub: "no cloud credentials" }] },
      {
        nodes: [
          { label: "Evidence gate", sub: "merged tree · tested tree" },
          { label: "Build + Trivy", icon: "onprem-security-trivy", sub: "SBOM · provenance" },
        ],
      },
      {
        nodes: [
          { label: "releasectl (C#)", icon: "programming-language-csharp", sub: "lease · DEPLOY record" },
          { label: "ECR OCI artifact", icon: "aws-compute-ec2-container-registry", sub: "pinned by digest" },
        ],
      },
      { nodes: [{ label: "Flux in EKS", icon: "onprem-gitops-flux", sub: "pulls · private API" }] },
      {
        nodes: [
          { label: "Verifier", icon: "programming-language-csharp", sub: "only VERIFY writer", accent: true },
          { label: "Fail blocks next", sub: "rollback · override", accent: true },
        ],
      },
    ],
  },
};

export function getDiagram(slug: string): Diagram | undefined {
  return diagrams[slug];
}
