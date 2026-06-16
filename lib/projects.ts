export type Category = "AWS" | "Azure" | "AI" | "Platform";

export interface Project {
  num: string;
  title: string;
  titleOut: string;
  desc: string;
  tags: string[];
  categories: Category[];
  link: string;
  /** present when this project has a dedicated deep case-study page */
  caseStudy?: string;
}

export const CATEGORIES: Category[] = ["AWS", "Azure", "AI", "Platform"];

export const categoryMeta: Record<
  Category,
  { slug: string; title: string; blurb: string }
> = {
  AWS: {
    slug: "aws",
    title: "AWS",
    blurb:
      "Serverless, security, FinOps, and platform work on AWS, all defined in Terraform and shipped through GitHub Actions OIDC pipelines.",
  },
  Azure: {
    slug: "azure",
    title: "Azure",
    blurb:
      "Azure builds across identity, governance, FinOps, and AKS platforms, credential-free with managed identity and Workload Identity.",
  },
  AI: {
    slug: "ai",
    title: "AI",
    blurb:
      "AI-integrated systems: agent orchestration, RAG, LLM gateways, and Bedrock and Anthropic-backed automation on real cloud infrastructure.",
  },
  Platform: {
    slug: "platform",
    title: "Platform",
    blurb:
      "Platform engineering: Kubernetes, GitOps, internal developer platforms, and SRE-style observability across both clouds.",
  },
};

export function categoryFromSlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => categoryMeta[c].slug === slug);
}

export function projectsByCategory(cat: Category): Project[] {
  return projects.filter((p) => p.categories.includes(cat));
}

export const projects: Project[] = [
  {
    num: "01",
    title: "Cost Intelligence",
    titleOut: "Dashboard",
    desc: "Lambda ingester pulls 90 days of Cost Explorer data into a DynamoDB single-table store daily, running z-score anomaly detection per service against a 30-day rolling baseline (threshold 2.5σ) and generating a 14-day linear regression forecast on aggregate spend. A second Lambda scans all account resources via the Resource Groups Tagging API and flags missing required tags. Results are served through an API Gateway HTTP API to a React frontend on S3 behind CloudFront with Origin Access Control. Three separate IAM execution roles enforce least-privilege access at each layer: ingester (ce:GetCostAndUsage, tag:GetResources, DynamoDB write), analyzer (DynamoDB read/write, SNS publish), and API (DynamoDB read only). SNS alert fires on every anomaly detection run that finds outliers. EventBridge Scheduler triggers ingestion at 01:00 UTC and analysis at 02:00 UTC. 34 resources provisioned in Terraform with S3 remote backend and native state locking, deployed via GitHub Actions OIDC.",
    tags: ["Lambda", "Cost Explorer", "DynamoDB", "API Gateway", "CloudFront", "React", "EventBridge Scheduler", "Terraform"],
    categories: ["AWS"],
    link: "https://github.com/jordann6/aws-cost-intelligence-dashboard",
    caseStudy: "cost-intelligence-dashboard",
  },
  {
    num: "02",
    title: "Multi-Agent AI",
    titleOut: "Coding Orchestrator",
    desc: "Multi-agent system that routes natural language coding tasks to specialist agents through an orchestrator, fully asynchronous so submissions return a job ID in under two seconds while the coder runs the agentic loop in the background. API Gateway's 29-second integration timeout broke sequential Anthropic tool-use calls, so the orchestrator returns 202 immediately and the coder Lambda processes the loop independently, writing results to DynamoDB with 24-hour TTL. ARN-scoped least-privilege IAM isolates blast radius: the orchestrator can invoke only the coder Lambda, status can only read DynamoDB, and the coder cannot invoke any Lambda at all. The write_code, explain_code, and debug_code tools are deterministic Python functions returning structured scaffolds and AST metadata rather than recursive LLM calls, grounding the loop in real code analysis instead of model self-talk. Three separately sized Lambda packages, Secrets Manager for the Anthropic key, CloudWatch log groups with 14-day retention, and fully provisioned in Terraform.",
    tags: ["Lambda", "API Gateway", "DynamoDB", "Anthropic SDK", "Terraform", "Python", "IAM", "Secrets Manager"],
    categories: ["AWS", "AI"],
    link: "https://github.com/jordann6/multi-agent-coding-orchestrator",
    caseStudy: "multi-agent-coding-orchestrator",
  },
  {
    num: "03",
    title: "Azure FinOps",
    titleOut: "Dashboard",
    desc: "Surfaces cloud spend trends, tagging gaps, cost anomalies, and budget forecasts before they hit the billing cycle. C# .NET 8 timer-triggered Azure Functions ingest the Cost Management API into Cosmos DB, running z-score anomaly detection against rolling baselines and 14-day linear regression forecasting per subscription. A second function scans the subscription against required tag policies, surfacing untagged resources with the specific missing tag details so cost attribution stays reliable. React frontend served from Azure Static Web Apps, all infrastructure provisioned in Terraform with system-assigned managed identity and zero stored credentials at the cost visibility layer.",
    tags: ["Azure Functions", "Cosmos DB", "React", "C# .NET 8", "Static Web Apps", "Terraform"],
    categories: ["Azure"],
    link: "https://github.com/jordann6/azure-finops-dashboard",
  },
  {
    num: "04",
    title: "LLM Gateway",
    titleOut: "& Observability",
    desc: "Cuts LLM API costs by routing requests across OpenAI and Anthropic based on cost, latency, or quality strategy, with DynamoDB caching in front to deduplicate repeated prompts. FastAPI gateway runs on ECS Fargate behind an ALB, instrumented with a CloudWatch dashboard of 9 widgets and 3 alarms covering latency, error rate, and provider failover. An LLM-as-judge evaluation pipeline scores response quality on a nightly cadence, and a Lambda archives raw request and response pairs to S3 for replay and audit. Scale-to-zero scheduling drops the service overnight to keep idle cost near zero. 78 resources across 9 Terraform modules, deployed via GitHub Actions.",
    tags: ["ECS Fargate", "FastAPI", "Terraform", "DynamoDB", "Lambda", "CloudWatch"],
    categories: ["AWS", "AI"],
    link: "https://github.com/jordann6/llm-gateway",
  },
  {
    num: "05",
    title: "Azure Zero Trust",
    titleOut: "Identity Pipeline",
    desc: "Seven-module Terraform pipeline enforcing Zero Trust across authentication, privileged access, workload identity, and threat detection on Azure. The identity layer provisions Entra ID users, groups, app registration, and managed identity with RBAC scoped to data plane resources — Key Vault carries no access policies and Storage Account has no shared keys. Five Conditional Access policies cover MFA enforcement, legacy auth blocking, device compliance, and risk-based sign-in controls. Defender for Cloud enabled at Standard tier across Key Vault, Storage, and ARM. Microsoft Sentinel onboarded with five scheduled analytics rules mapped to MITRE ATT&CK: brute force (T1110), unfamiliar sign-in location (T1078), PIM activation outside business hours, Key Vault access from unknown IP (T1552), and bulk user deletion (T1531). A Logic App playbook handles incident response via HTTP webhook. GitHub Actions authenticates via OIDC federated credential — no secrets stored anywhere in the pipeline.",
    tags: ["Microsoft Entra ID", "Microsoft Sentinel", "Defender for Cloud", "Key Vault", "Logic Apps", "Azure Monitor", "Terraform", "GitHub Actions OIDC"],
    categories: ["Azure"],
    link: "https://github.com/jordann6/zero-trust-identity-pipeline",
  },
  {
    num: "06",
    title: "Cloud Security",
    titleOut: "Lab",
    desc: "End-to-end attack, detect, and respond case study across AWS and Kubernetes — 62 Terraform resources across 7 modules. The attack layer uses Pacu to execute a full MITRE ATT&CK kill chain: leaked IAM credentials → permission enumeration → privilege escalation from 1,039 to 15,319 permissions via policy attachment → S3 exfiltration of staged PII → lateral movement via STS role assumption. On the detection side, CloudTrail and VPC Flow Logs feed into an OpenSearch SIEM with a kill chain correlation dashboard. GuardDuty findings on IAM threats trigger an EventBridge rule that fires a Lambda to automatically disable compromised access keys. On Kubernetes, Falco runs as a DaemonSet with four custom rules catching 100% of simulated runtime attacks: shell spawning, sensitive file reads, unauthorized binary execution, and container escape via host mount. OPA Gatekeeper enforces three constraint templates blocking privileged containers, host namespace access, and root execution across all non-system namespaces.",
    tags: ["GuardDuty", "OpenSearch", "Falco", "OPA Gatekeeper", "EventBridge", "Lambda", "Pacu", "Terraform"],
    categories: ["AWS", "Platform"],
    link: "https://github.com/jordann6/cloud-security-lab",
    caseStudy: "cloud-security-lab",
  },
  {
    num: "07",
    title: "NBA Intel",
    titleOut: "Center",
    desc: "RAG-powered prop analysis platform combining live NBA data with semantic search. FastAPI backend with Azure OpenAI GPT-4o and Qdrant vector store using text-embedding-3-small. Defensive stats, injury feeds, roster injection, and trend windows. Self-hosted on K3s homelab with Cloudflare tunnel.",
    tags: ["FastAPI", "Azure OpenAI", "Qdrant", "RAG", "K3s", "Cloudflare"],
    categories: ["AI", "Platform"],
    link: "https://github.com/jordann6/nba-intel-center",
  },
  {
    num: "08",
    title: "NFL Reliability",
    titleOut: "Platform",
    desc: "Treats a public NFL sports API as a production data source and wraps ingestion with SRE-style observability. A Python ingestor service runs on Azure Container Apps, writing raw payloads to Blob Storage and routing schema failures to a quarantine container. The ingestor exposes custom Prometheus metrics — ingestion_runs_total, schema_validity_total, data_freshness_seconds, and ingestion_last_success_timestamp_seconds — scraped by a second container app running Prometheus. Azure Managed Grafana surfaces dashboards built on those SLIs. Managed identity grants the ingestor Storage Blob Data Contributor without credentials. ACR holds the ingestor image, Key Vault holds integration secrets, and Terraform modules provision every resource. Runbooks and PromQL burn-rate examples are documented under ops/.",
    tags: ["Azure Container Apps", "Prometheus", "Grafana", "Managed Grafana", "Azure Blob Storage", "Terraform", "SRE"],
    categories: ["Azure", "Platform"],
    link: "https://github.com/jordann6/nfl-data-reliability-platform",
  },
  {
    num: "09",
    title: "Uptime",
    titleOut: "Monitor",
    desc: "Active health monitoring for jordandesigns.io running every five minutes via EventBridge. Each check runs three validations in a single Lambda invocation: HTTP status code, response body content match, and SSL certificate expiry. A failed check retries once before firing an SNS alert to avoid noise from transient blips. Results are logged to DynamoDB with 90-day TTL and published as CloudWatch custom metrics — IsHealthy, LatencyMs, and SSLDaysRemaining. Two alarms gate on those metrics: site-down triggers on two consecutive failures, high-latency triggers when average response exceeds three seconds across three periods. A CloudWatch dashboard surfaces all four signals with threshold annotations. SSL alerts fire at 30 days warning and 7 days critical. Optional SMS subscription (conditional on a phone number variable) adds a second alert channel alongside email.",
    tags: ["EventBridge", "Lambda", "CloudWatch", "DynamoDB", "SNS", "Python", "Terraform"],
    categories: ["AWS"],
    link: "https://github.com/jordann6/website-uptime-monitor",
  },
  {
    num: "10",
    title: "Azure DevSecOps",
    titleOut: "Pipeline",
    desc: "Four-stage security-gated CI/CD pipeline for a containerized Flask app deployed to AKS via blue/green rollout. Bandit SAST and pip-audit CVE scanning run first, then Checkov validates both Terraform and Kubernetes manifests. The Docker image is built for linux/amd64, scanned by Trivy (blocks on unfixed CRITICAL/HIGH), and pushed to ACR only after passing. OWASP ZAP then runs a baseline DAST scan against a live container before the deploy stage applies manifests to AKS via envsubst image substitution. Containers run as non-root with allowPrivilegeEscalation=false, readOnlyRootFilesystem, all capabilities dropped, and seccompProfile: RuntimeDefault. AKS has local admin disabled, AAD RBAC enforced, and OIDC issuer enabled for workload identity. GitHub Actions authenticates to Azure via OIDC — no stored credentials.",
    tags: ["AKS", "ACR", "Bandit", "Trivy", "OWASP ZAP", "Checkov", "GitHub Actions OIDC", "Terraform"],
    categories: ["Azure", "Platform"],
    link: "https://github.com/jordann6/azure-devsecops-project",
  },
  {
    num: "11",
    title: "Event-Driven",
    titleOut: "AWS Remediation",
    desc: "Fully automated remediation pipeline triggered by a CloudWatch metric alarm — no manual intervention in the hot path. When EC2 CPU utilization exceeds 80% for two consecutive 5-minute periods, CloudWatch publishes a state-change event to EventBridge, which invokes a Python Lambda directly. The Lambda routes on event type: EventBridge alarm events trigger an EC2 reboot; manual invocations with an action field route to either lockdown_sg (revokes all open-world ingress rules from the security group) or enforce_tags (applies required Environment, ManagedBy, and Monitored tags to non-compliant instances). Every execution publishes a structured result to SNS and writes a JSON audit trail to CloudWatch Logs with 14-day retention. IAM policy scopes ec2:RebootInstances to the specific instance ARN and sns:Publish to the specific topic ARN. Terraform provisions all resources including the alarm, EventBridge rule, Lambda permission, and log group. GitHub Actions deploys via OIDC with Bandit SAST and pip-audit gates before apply.",
    tags: ["Lambda", "EventBridge", "CloudWatch", "EC2", "SNS", "Terraform", "Python", "GitHub Actions OIDC"],
    categories: ["AWS"],
    link: "https://github.com/jordann6/event-driven-aws-remediation",
  },
  {
    num: "12",
    title: "Super Bowl",
    titleOut: "Intel Center",
    desc: "Cloud-native scouting report pipeline built for Super Bowl LX. Python extracts and processes NFLverse datasets, with manual override logic to handle API synchronization lags that would otherwise produce stale prop line comparisons. Azure OpenAI GPT-4o analyzes player prop lines against seasonal averages to generate automated performance reports. Infrastructure provisioned in Terraform: Azure OpenAI resource, Key Vault for the API key, and managed identity for keyless access. The service is containerized in Docker for environment parity between local dev and cloud, with images built and pushed to GitHub Container Registry via GitHub Actions.",
    tags: ["Azure OpenAI", "GPT-4o", "Key Vault", "Managed Identity", "Docker", "Terraform", "Python"],
    categories: ["Azure", "AI"],
    link: "https://github.com/jordann6/sb-intel-center",
  },
  {
    num: "13",
    title: "Cloud Resume",
    titleOut: "Challenge",
    desc: "This site. Served from S3 through CloudFront with TLS and custom domain via Route 53, now a Next.js static export. Visitor counter powered by API Gateway, Lambda (Python), and DynamoDB. GitHub Actions CI/CD builds the site, syncs to S3, and invalidates cache on push. All infrastructure defined in Terraform with a private bucket locked to CloudFront via Origin Access Control.",
    tags: ["S3", "CloudFront", "Lambda", "DynamoDB", "Next.js", "Terraform", "GitHub Actions"],
    categories: ["AWS"],
    link: "https://github.com/jordann6/jd",
  },
  {
    num: "14",
    title: "Azure Automated",
    titleOut: "Backup System",
    desc: "Blob storage backup vault with automated daily verification via Logic App (08:00 UTC). Managed identity authenticates the workflow to Blob Storage over MSI — no connection strings or API keys stored anywhere. Versioning preserves every write as a recoverable point, 7-day soft delete covers accidental removal, and a lifecycle policy automatically tiers blobs Hot → Cool (30d) → Archive (90d) → Delete (365d) to minimize storage cost over time. Optional SendGrid HTTP action sends a daily confirmation email once the blob list succeeds. All 9 resources provisioned in Terraform with an Azure Blob remote backend, deployed and validated end-to-end via GitHub Actions OIDC.",
    tags: ["Azure Blob Storage", "Logic Apps", "Managed Identity", "RBAC", "Lifecycle Management", "Terraform", "GitHub Actions OIDC"],
    categories: ["Azure"],
    link: "https://github.com/jordann6/azure-backup-system",
  },
  {
    num: "15",
    title: "AWS Automated",
    titleOut: "Backup System",
    desc: "S3 backup vault with automated daily verification via Lambda (08:00 UTC). IAM execution role authenticates the function to S3 — no access keys or credentials stored anywhere. Versioning preserves every write as a recoverable point, noncurrent versions archive to Glacier at 7 days and expire at 90 days, and a lifecycle policy automatically tiers objects Standard → Standard-IA (30d) → Glacier (90d) → Delete (365d) to minimize storage cost over time. Optional SendGrid HTTP call sends a daily confirmation email once the object list succeeds. 15 resources provisioned in Terraform with an S3 remote backend and native state locking, deployed and validated end-to-end via GitHub Actions OIDC.",
    tags: ["S3", "Lambda", "EventBridge Scheduler", "IAM", "Lifecycle Management", "Terraform", "GitHub Actions OIDC"],
    categories: ["AWS"],
    link: "https://github.com/jordann6/aws-backup-system",
  },
  {
    num: "16",
    title: "Arch Linux",
    titleOut: "Homelab",
    desc: "Repurposed a T2 MacBook into a dedicated infrastructure lab running Arch Linux with K3s. Hosts development workloads, vector databases, and project backends. Full writeup covering the build process, networking, and cluster configuration.",
    tags: ["Arch Linux", "K3s", "Kubernetes", "Networking", "Homelab"],
    categories: ["Platform"],
    link: "https://substack.com/@jordann6/p-183075828",
  },
  {
    num: "17",
    title: "AI Inventory",
    titleOut: "Tracker",
    desc: "Serverless inventory management REST API with on-demand AI analysis powered by Amazon Bedrock. Lambda routes GET, POST, and DELETE requests against a DynamoDB table. POST /items/{id}/analyze sends item data — name, SKU, category, quantity, and reorder threshold — to Claude 3.5 Haiku via InvokeModel, returning a structured JSON recommendation with stock status (ok / low / critical), a one-sentence reorder suggestion, and a suggested reorder quantity. IAM execution role scoped to exact DynamoDB actions and the specific Bedrock model ARN — no broader permissions granted. API Gateway v2 HTTP API with five explicit routes at payload format 2.0. All infrastructure provisioned in Terraform with S3 remote backend, deployed via GitHub Actions OIDC with no stored credentials.",
    tags: ["Lambda", "Amazon Bedrock", "DynamoDB", "API Gateway v2", "IAM", "Terraform", "Python", "GitHub Actions OIDC"],
    categories: ["AWS", "AI"],
    link: "https://github.com/jordann6/aws-ai-inventory-tracker",
  },
  {
    num: "18",
    title: "Serverless Document",
    titleOut: "Intelligence",
    desc: "Event-driven document extraction pipeline on Azure Functions triggered by Blob Storage uploads. Dropping any file into the raw container fires a Python 3.11 blob trigger, which submits the document to Azure AI Document Intelligence (prebuilt-document model), extracts key-value pairs and raw content, writes a structured JSON result to a processed container, and upserts a metadata row to Table Storage for fast querying — all without touching the raw blob. Two storage accounts isolate the Functions runtime from document storage. System-assigned Managed Identity with six scoped RBAC role assignments handles all service-to-service auth — no connection strings or API keys anywhere in application config. All infrastructure provisioned in Terraform with an Azure Blob remote backend, deployed via GitHub Actions federated credentials.",
    tags: ["Azure Functions", "Azure AI Document Intelligence", "Blob Storage", "Table Storage", "Managed Identity", "Terraform", "Python", "GitHub Actions OIDC"],
    categories: ["Azure", "AI"],
    link: "https://github.com/jordann6/azure-document-intelligence",
  },
  {
    num: "19",
    title: "Customer Inquiry",
    titleOut: "Manager",
    desc: "Serverless customer inquiry intake API with automated dual-notification on every new submission. POST /inquiries stores the inquiry in DynamoDB and synchronously fires two SES emails — an internal alert to the support team and a confirmation to the customer — via a sender-scoped IAM policy condition (ses:FromAddress). GET /inquiries supports a ?status= query parameter backed by a DynamoDB Global Secondary Index on status + created_at, enabling efficient filtered queries without a table scan. PATCH /inquiries/{id}/status moves inquiries through a defined lifecycle: open → in-progress → resolved → closed. API Gateway v2 HTTP API with four explicit routes, Lambda proxy integration at payload format 2.0, and least-privilege IAM execution role scoped to DynamoDB CRUD and the GSI. All infrastructure provisioned in Terraform with S3 remote backend, deployed via GitHub Actions OIDC.",
    tags: ["Lambda", "API Gateway v2", "DynamoDB", "SES", "IAM", "Terraform", "Python", "GitHub Actions OIDC"],
    categories: ["AWS"],
    link: "https://github.com/jordann6/aws-customer-inquiry-manager",
  },
  {
    num: "20",
    title: "AWS Developer",
    titleOut: "Platform",
    desc: "Internal Developer Platform on EKS that gives application teams a paved road. ArgoCD app-of-apps GitOps reconciles every platform component from Git. Crossplane with an IRSA-authenticated AWS provider exposes a self-service Bucket API: a developer's one-line claim provisions a real S3 bucket hardened by default with AES256 encryption, versioning, all four public-access-block settings, and an owning-team tag, with no static credentials anywhere. Kyverno enforces an owning-team label as admission policy in flagged namespaces. A Backstage golden-path template scaffolds a new service complete with a Dockerfile, a hardened Helm chart, and an ArgoCD Application so it is GitOps-deployable the moment it exists. EKS, VPC, OIDC, and the scoped IRSA role provisioned in Terraform with an S3 remote state backend. Verified end to end against real AWS, then torn down clean.",
    tags: ["EKS", "ArgoCD", "Crossplane", "Kyverno", "Backstage", "IRSA", "Terraform", "GitOps"],
    categories: ["AWS", "Platform"],
    link: "https://github.com/jordann6/aws-developer-platform",
    caseStudy: "aws-developer-platform",
  },
  {
    num: "21",
    title: "Azure Developer",
    titleOut: "Platform",
    desc: "Internal Developer Platform on AKS, the Azure counterpart to the AWS platform built on a different toolchain to show the paved-road pattern is not cloud or tool specific. Flux reconciles the platform from Git via GitRepository, Kustomization, and HelmRelease. Crossplane with an Azure provider authenticated through Azure Workload Identity exposes a self-service StorageAccount API: a claim provisions a real storage account hardened by default with TLS1_2 minimum, HTTPS-only traffic, public blob access disabled, and infrastructure encryption, with no client secrets. Kyverno enforces owning-team labels as admission policy. AKS with OIDC issuer and workload identity, plus a federated user-assigned managed identity, provisioned in Terraform with an Azure Storage state backend. Verified end to end against real Azure, then torn down clean.",
    tags: ["AKS", "Flux", "Crossplane", "Workload Identity", "Kyverno", "Terraform", "GitOps"],
    categories: ["Azure", "Platform"],
    link: "https://github.com/jordann6/azure-developer-platform",
    caseStudy: "azure-developer-platform",
  },
  {
    num: "22",
    title: "Azure Landing",
    titleOut: "Zone",
    desc: "Enterprise-grade Azure landing zone built entirely in Terraform. Establishes the governance foundation that workload subscriptions inherit: a four-level management group hierarchy (org root, Platform, Workloads, Sandbox), three custom Azure Policy definitions assigned at the Workloads management group scope (require owner tag, deny public IPs, allowed locations), and a hub-spoke network. Hub VNet carries correctly-named and minimum-sized reserved subnets for Azure Firewall, VPN Gateway, and Bastion alongside an active management subnet with an internet-deny NSG. A reusable Terraform module vends new spokes with a single call: it provisions the spoke resource group, spoke VNet, workload subnet, and both directions of VNet peering. Two spokes (Platform, Sandbox) demonstrated. Verified end to end against real Azure, then torn down clean.",
    tags: ["Management Groups", "Azure Policy", "Hub-Spoke", "VNet Peering", "Terraform", "Governance"],
    categories: ["Azure", "Platform"],
    link: "https://github.com/jordann6/azure-landing-zone",
  },
  {
    num: "23",
    title: "AWS Incident",
    titleOut: "Responder",
    desc: "Automated incident response where the runbook is an n8n workflow rather than glue code. A CloudWatch alarm on a target EC2 instance (CPUUtilization at or above 80% for two 5-minute periods) publishes to an SNS topic, which delivers over HTTPS to n8n running on ECS Fargate behind an ALB with an ACM certificate on a Route 53 subdomain. The workflow confirms its own SNS subscription programmatically, asks Claude Haiku for a plain-English incident summary and recommended next step, posts an incident card to Slack, reboots the instance via the EC2 API signed with SigV4, then waits and re-checks the alarm with DescribeAlarms to either mark the incident resolved or escalate. Remediation runs under a least-privilege IAM user scoped to RebootInstances on the single target ARN plus read-only enrichment, and n8n secrets are pulled from SSM SecureString parameters at task start so nothing sensitive lives in Terraform state. The deliberate counterpart to the Lambda-glued event-driven-aws-remediation project: same incident class, a visual and version-controlled runbook instead of code. Built to deploy, demo, and destroy for about a dollar a day.",
    tags: ["ECS Fargate", "n8n", "CloudWatch", "SNS", "Claude Haiku", "ALB", "ACM", "Terraform"],
    categories: ["AWS", "AI", "Platform"],
    link: "https://github.com/jordann6/aws-incident-responder",
    caseStudy: "aws-incident-responder",
  },
  {
    num: "24",
    title: "Azure Incident",
    titleOut: "Responder",
    desc: "The Azure counterpart to the AWS incident responder, built on a deliberately different toolchain to show cross-cloud range. An Azure Monitor metric alert on a target VM (Percentage CPU at or above 80% over a 5-minute window) fires through an action group webhook, posting the common alert schema to n8n running on Azure Container Apps, which serves a publicly trusted HTTPS endpoint with no load balancer or certificate to manage. The runbook asks Claude Haiku for a plain-English incident summary, posts an incident card to Slack, restarts the VM through the Azure Management API authenticated with an OAuth2 client-credentials service principal scoped to Virtual Machine Contributor on the single target, then waits and re-queries the Percentage CPU metric to mark the incident resolved or escalate. n8n credentials are generated by Terraform and held only in the private azurerm state backend, so nothing sensitive is committed. Same runbook-as-workflow pattern as the AWS build, mapped onto Azure Monitor, Container Apps, and Entra service principals. Built to deploy, demo, and destroy for about a dollar a day.",
    tags: ["Container Apps", "n8n", "Azure Monitor", "Action Groups", "Claude Haiku", "Entra ID", "Terraform"],
    categories: ["Azure", "AI", "Platform"],
    link: "https://github.com/jordann6/azure-incident-responder",
  },
  {
    num: "25",
    title: "Azure VM",
    titleOut: "Hardening",
    desc: "Immutable golden-image pipeline that bakes a CIS-style hardening baseline into an Ubuntu 22.04 image, then deploys a hardened jump host from it, filling the VM config-management gap in an otherwise serverless and Kubernetes portfolio. An Ansible role applies the baseline across sshd (no root login, no password auth, strong ciphers and key exchange), auditd, fail2ban, sysctl kernel parameters, PAM password policy, and filesystem module blacklisting, with every control toggleable. Molecule tests the role in a container on every push via GitHub Actions (converge, verify, idempotence), so a broken control fails CI before it is ever baked into an image. Packer's azure-arm builder runs the role as a provisioner against a transient build VM and captures a managed image, authenticated through the Azure CLI so no secret ever touches a file. Terraform then deploys a jump host from that image into a Z1-style management subnet behind an internet-deny NSG that allows SSH from a single source, with a use_existing_hub switch to drop the host into a live azure-landing-zone hub instead. Terraform owns every cloud resource and Ansible does in-OS configuration only, keeping the tool boundary clean. Built to deploy, demo, and destroy for under a dollar.",
    tags: ["Packer", "Ansible", "Molecule", "Terraform", "Azure VM", "CIS"],
    categories: ["Azure", "Platform"],
    link: "https://github.com/jordann6/azure-vm-hardening",
  },
];
