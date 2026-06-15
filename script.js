/* ════════════════════════════════════════════════
   Jordan Nelson — Portfolio v2 (Editorial)
   ════════════════════════════════════════════════ */

/* Custom cursor */
(function () {
  const ring = document.getElementById("cursorRing");
  const dot = document.getElementById("cursorDot");
  const co = document.getElementById("cursorCoords");
  if (!ring || !dot || !co) return;
  let rx = innerWidth / 2,
    ry = innerHeight / 2;
  let x = rx,
    y = ry;
  addEventListener("mousemove", (e) => {
    x = e.clientX;
    y = e.clientY;
    dot.style.transform = `translate(${x - 2}px, ${y - 2}px)`;
    co.style.transform = `translate(${x + 18}px, ${y + 18}px)`;
    co.textContent = `+${x.toString().padStart(4, "0")}.000 / +${y.toString().padStart(4, "0")}.000`;
  });
  function tick() {
    rx += (x - rx) * 0.18;
    ry += (y - ry) * 0.18;
    ring.style.transform = `translate(${rx - 14}px, ${ry - 14}px)`;
    requestAnimationFrame(tick);
  }
  tick();
  const sel =
    "a, button, .proj__item, .contact__link, .skills__group .items span";
  document.addEventListener(
    "mouseover",
    (e) => {
      if (e.target.closest(sel)) ring.classList.add("cursor-active");
    },
    true,
  );
  document.addEventListener(
    "mouseout",
    (e) => {
      if (e.target.closest(sel)) ring.classList.remove("cursor-active");
    },
    true,
  );
})();

/* Live Chicago time */
(function () {
  const el = document.getElementById("ctClock");
  if (!el) return;
  const pad = (n) => n.toString().padStart(2, "0");
  function tick() {
    const d = new Date();
    const utc = d.getTime() + d.getTimezoneOffset() * 60000;
    const ct = new Date(utc - 6 * 3600000);
    el.textContent = `CT — ${pad(ct.getHours())}:${pad(ct.getMinutes())}:${pad(ct.getSeconds())}`;
  }
  tick();
  setInterval(tick, 1000);
})();

/* Marquee */
(function () {
  const mq = document.getElementById("mq");
  if (!mq) return;
  const items = [
    "Cloud",
    "DevOps",
    "Platform",
    "Reliability",
    "Security",
    "Automation",
    "Observability",
    "AI Infra",
  ];
  const block = items
    .map(
      (it, i) =>
        `<span${i % 2 === 1 ? ' class="dim"' : ""}>${it}</span><span class="sep">●</span>`,
    )
    .join("");
  mq.innerHTML = block + block;
})();

/* Projects (list + modal) */
const projects = [
  {
    num: "01",
    title: "Cost Intelligence",
    titleOut: "Dashboard",
    desc: "Lambda ingester pulls 90 days of Cost Explorer data into a DynamoDB single-table store daily, running z-score anomaly detection per service against a 30-day rolling baseline (threshold 2.5σ) and generating a 14-day linear regression forecast on aggregate spend. A second Lambda scans all account resources via the Resource Groups Tagging API and flags missing required tags. Results are served through an API Gateway HTTP API to a React frontend on S3 behind CloudFront with Origin Access Control. Three separate IAM execution roles enforce least-privilege access at each layer: ingester (ce:GetCostAndUsage, tag:GetResources, DynamoDB write), analyzer (DynamoDB read/write, SNS publish), and API (DynamoDB read only). SNS alert fires on every anomaly detection run that finds outliers. EventBridge Scheduler triggers ingestion at 01:00 UTC and analysis at 02:00 UTC. 34 resources provisioned in Terraform with S3 remote backend and native state locking, deployed via GitHub Actions OIDC.",
    tags: [
      "Lambda",
      "Cost Explorer",
      "DynamoDB",
      "API Gateway",
      "CloudFront",
      "React",
      "EventBridge Scheduler",
      "Terraform",
    ],
    link: "https://github.com/jordann6/aws-cost-intelligence-dashboard",
  },
  {
    num: "02",
    title: "Multi-Agent AI",
    titleOut: "Coding Orchestrator",
    desc: "Multi-agent system that routes natural language coding tasks to specialist agents through an orchestrator, fully asynchronous so submissions return a job ID in under two seconds while the coder runs the agentic loop in the background. API Gateway's 29-second integration timeout broke sequential Anthropic tool-use calls, so the orchestrator returns 202 immediately and the coder Lambda processes the loop independently, writing results to DynamoDB with 24-hour TTL. ARN-scoped least-privilege IAM isolates blast radius: the orchestrator can invoke only the coder Lambda, status can only read DynamoDB, and the coder cannot invoke any Lambda at all. The write_code, explain_code, and debug_code tools are deterministic Python functions returning structured scaffolds and AST metadata rather than recursive LLM calls, grounding the loop in real code analysis instead of model self-talk. Three separately sized Lambda packages, Secrets Manager for the Anthropic key, CloudWatch log groups with 14-day retention, and fully provisioned in Terraform.",
    tags: [
      "Lambda",
      "API Gateway",
      "DynamoDB",
      "Anthropic SDK",
      "Terraform",
      "Python",
      "IAM",
      "Secrets Manager",
    ],
    link: "https://github.com/jordann6/multi-agent-coding-orchestrator",
  },
  {
    num: "03",
    title: "Azure FinOps",
    titleOut: "Dashboard",
    desc: "Surfaces cloud spend trends, tagging gaps, cost anomalies, and budget forecasts before they hit the billing cycle. C# .NET 8 timer-triggered Azure Functions ingest the Cost Management API into Cosmos DB, running z-score anomaly detection against rolling baselines and 14-day linear regression forecasting per subscription. A second function scans the subscription against required tag policies, surfacing untagged resources with the specific missing tag details so cost attribution stays reliable. React frontend served from Azure Static Web Apps, all infrastructure provisioned in Terraform with system-assigned managed identity and zero stored credentials at the cost visibility layer.",
    tags: [
      "Azure Functions",
      "Cosmos DB",
      "React",
      "C# .NET 8",
      "Static Web Apps",
      "Terraform",
    ],
    link: "https://github.com/jordann6/azure-finops-dashboard",
  },
  {
    num: "04",
    title: "LLM Gateway",
    titleOut: "& Observability",
    desc: "Cuts LLM API costs by routing requests across OpenAI and Anthropic based on cost, latency, or quality strategy, with DynamoDB caching in front to deduplicate repeated prompts. FastAPI gateway runs on ECS Fargate behind an ALB, instrumented with a CloudWatch dashboard of 9 widgets and 3 alarms covering latency, error rate, and provider failover. An LLM-as-judge evaluation pipeline scores response quality on a nightly cadence, and a Lambda archives raw request and response pairs to S3 for replay and audit. Scale-to-zero scheduling drops the service overnight to keep idle cost near zero. 78 resources across 9 Terraform modules, deployed via GitHub Actions.",
    tags: [
      "ECS Fargate",
      "FastAPI",
      "Terraform",
      "DynamoDB",
      "Lambda",
      "CloudWatch",
    ],
    link: "https://github.com/jordann6/llm-gateway",
  },
  {
    num: "05",
    title: "Azure Zero Trust",
    titleOut: "Identity Pipeline",
    desc: "Seven-module Terraform pipeline enforcing Zero Trust across authentication, privileged access, workload identity, and threat detection on Azure. The identity layer provisions Entra ID users, groups, app registration, and managed identity with RBAC scoped to data plane resources — Key Vault carries no access policies and Storage Account has no shared keys. Five Conditional Access policies cover MFA enforcement, legacy auth blocking, device compliance, and risk-based sign-in controls. Defender for Cloud enabled at Standard tier across Key Vault, Storage, and ARM. Microsoft Sentinel onboarded with five scheduled analytics rules mapped to MITRE ATT&CK: brute force (T1110), unfamiliar sign-in location (T1078), PIM activation outside business hours, Key Vault access from unknown IP (T1552), and bulk user deletion (T1531). A Logic App playbook handles incident response via HTTP webhook. GitHub Actions authenticates via OIDC federated credential — no secrets stored anywhere in the pipeline.",
    tags: [
      "Microsoft Entra ID",
      "Microsoft Sentinel",
      "Defender for Cloud",
      "Key Vault",
      "Logic Apps",
      "Azure Monitor",
      "Terraform",
      "GitHub Actions OIDC",
    ],
    link: "https://github.com/jordann6/zero-trust-identity-pipeline",
  },
  {
    num: "06",
    title: "Cloud Security",
    titleOut: "Lab",
    desc: "End-to-end attack, detect, and respond case study across AWS and Kubernetes — 62 Terraform resources across 7 modules. The attack layer uses Pacu to execute a full MITRE ATT&CK kill chain: leaked IAM credentials → permission enumeration → privilege escalation from 1,039 to 15,319 permissions via policy attachment → S3 exfiltration of staged PII → lateral movement via STS role assumption. On the detection side, CloudTrail and VPC Flow Logs feed into an OpenSearch SIEM with a kill chain correlation dashboard. GuardDuty findings on IAM threats trigger an EventBridge rule that fires a Lambda to automatically disable compromised access keys. On Kubernetes, Falco runs as a DaemonSet with four custom rules catching 100% of simulated runtime attacks: shell spawning, sensitive file reads, unauthorized binary execution, and container escape via host mount. OPA Gatekeeper enforces three constraint templates blocking privileged containers, host namespace access, and root execution across all non-system namespaces.",
    tags: [
      "GuardDuty",
      "OpenSearch",
      "Falco",
      "OPA Gatekeeper",
      "EventBridge",
      "Lambda",
      "Pacu",
      "Terraform",
    ],
    link: "https://github.com/jordann6/cloud-security-lab",
  },
  {
    num: "07",
    title: "NBA Intel",
    titleOut: "Center",
    desc: "RAG-powered prop analysis platform combining live NBA data with semantic search. FastAPI backend with Azure OpenAI GPT-4o and Qdrant vector store using text-embedding-3-small. Defensive stats, injury feeds, roster injection, and trend windows. Self-hosted on K3s homelab with Cloudflare tunnel.",
    tags: ["FastAPI", "Azure OpenAI", "Qdrant", "RAG", "K3s", "Cloudflare"],
    link: "https://github.com/jordann6/nba-intel-center",
  },
  {
    num: "08",
    title: "NFL Reliability",
    titleOut: "Platform",
    desc: "Treats a public NFL sports API as a production data source and wraps ingestion with SRE-style observability. A Python ingestor service runs on Azure Container Apps, writing raw payloads to Blob Storage and routing schema failures to a quarantine container. The ingestor exposes custom Prometheus metrics — ingestion_runs_total, schema_validity_total, data_freshness_seconds, and ingestion_last_success_timestamp_seconds — scraped by a second container app running Prometheus. Azure Managed Grafana surfaces dashboards built on those SLIs. Managed identity grants the ingestor Storage Blob Data Contributor without credentials. ACR holds the ingestor image, Key Vault holds integration secrets, and Terraform modules provision every resource. Runbooks and PromQL burn-rate examples are documented under ops/.",
    tags: ["Azure Container Apps", "Prometheus", "Grafana", "Managed Grafana", "Azure Blob Storage", "Terraform", "SRE"],
    link: "https://github.com/jordann6/nfl-data-reliability-platform",
  },
  {
    num: "09",
    title: "Uptime",
    titleOut: "Monitor",
    desc: "Active health monitoring for jordandesigns.io running every five minutes via EventBridge. Each check runs three validations in a single Lambda invocation: HTTP status code, response body content match, and SSL certificate expiry. A failed check retries once before firing an SNS alert to avoid noise from transient blips. Results are logged to DynamoDB with 90-day TTL and published as CloudWatch custom metrics — IsHealthy, LatencyMs, and SSLDaysRemaining. Two alarms gate on those metrics: site-down triggers on two consecutive failures, high-latency triggers when average response exceeds three seconds across three periods. A CloudWatch dashboard surfaces all four signals with threshold annotations. SSL alerts fire at 30 days warning and 7 days critical. Optional SMS subscription (conditional on a phone number variable) adds a second alert channel alongside email.",
    tags: ["EventBridge", "Lambda", "CloudWatch", "DynamoDB", "SNS", "Python", "Terraform"],
    link: "https://github.com/jordann6/website-uptime-monitor",
  },
  {
    num: "10",
    title: "Azure DevSecOps",
    titleOut: "Pipeline",
    desc: "Four-stage security-gated CI/CD pipeline for a containerized Flask app deployed to AKS via blue/green rollout. Bandit SAST and pip-audit CVE scanning run first, then Checkov validates both Terraform and Kubernetes manifests. The Docker image is built for linux/amd64, scanned by Trivy (blocks on unfixed CRITICAL/HIGH), and pushed to ACR only after passing. OWASP ZAP then runs a baseline DAST scan against a live container before the deploy stage applies manifests to AKS via envsubst image substitution. Containers run as non-root with allowPrivilegeEscalation=false, readOnlyRootFilesystem, all capabilities dropped, and seccompProfile: RuntimeDefault. AKS has local admin disabled, AAD RBAC enforced, and OIDC issuer enabled for workload identity. GitHub Actions authenticates to Azure via OIDC — no stored credentials.",
    tags: ["AKS", "ACR", "Bandit", "Trivy", "OWASP ZAP", "Checkov", "GitHub Actions OIDC", "Terraform"],
    link: "https://github.com/jordann6/azure-devsecops-project",
  },
  {
    num: "11",
    title: "Event-Driven",
    titleOut: "AWS Remediation",
    desc: "Fully automated remediation pipeline triggered by a CloudWatch metric alarm — no manual intervention in the hot path. When EC2 CPU utilization exceeds 80% for two consecutive 5-minute periods, CloudWatch publishes a state-change event to EventBridge, which invokes a Python Lambda directly. The Lambda routes on event type: EventBridge alarm events trigger an EC2 reboot; manual invocations with an action field route to either lockdown_sg (revokes all open-world ingress rules from the security group) or enforce_tags (applies required Environment, ManagedBy, and Monitored tags to non-compliant instances). Every execution publishes a structured result to SNS and writes a JSON audit trail to CloudWatch Logs with 14-day retention. IAM policy scopes ec2:RebootInstances to the specific instance ARN and sns:Publish to the specific topic ARN. Terraform provisions all resources including the alarm, EventBridge rule, Lambda permission, and log group. GitHub Actions deploys via OIDC with Bandit SAST and pip-audit gates before apply.",
    tags: ["Lambda", "EventBridge", "CloudWatch", "EC2", "SNS", "Terraform", "Python", "GitHub Actions OIDC"],
    link: "https://github.com/jordann6/event-driven-aws-remediation",
  },
  {
    num: "12",
    title: "Super Bowl",
    titleOut: "Intel Center",
    desc: "Cloud-native scouting report pipeline built for Super Bowl LX. Python extracts and processes NFLverse datasets, with manual override logic to handle API synchronization lags that would otherwise produce stale prop line comparisons. Azure OpenAI GPT-4o analyzes player prop lines against seasonal averages to generate automated performance reports. Infrastructure provisioned in Terraform: Azure OpenAI resource, Key Vault for the API key, and managed identity for keyless access. The service is containerized in Docker for environment parity between local dev and cloud, with images built and pushed to GitHub Container Registry via GitHub Actions.",
    tags: ["Azure OpenAI", "GPT-4o", "Key Vault", "Managed Identity", "Docker", "Terraform", "Python"],
    link: "https://github.com/jordann6/sb-intel-center",
  },
  {
    num: "13",
    title: "Cloud Resume",
    titleOut: "Challenge",
    desc: "Portfolio site served from S3 through CloudFront with TLS and custom domain via Route 53. Visitor counter powered by API Gateway, Lambda (Python), and DynamoDB. GitHub Actions CI/CD syncs to S3 and invalidates cache on push. All infrastructure defined in Terraform.",
    tags: [
      "S3",
      "CloudFront",
      "Lambda",
      "DynamoDB",
      "Terraform",
      "GitHub Actions",
    ],
    link: "https://github.com/jordann6/cloud-resume-challenge",
  },
  {
    num: "14",
    title: "Azure Automated",
    titleOut: "Backup System",
    desc: "Blob storage backup vault with automated daily verification via Logic App (08:00 UTC). Managed identity authenticates the workflow to Blob Storage over MSI — no connection strings or API keys stored anywhere. Versioning preserves every write as a recoverable point, 7-day soft delete covers accidental removal, and a lifecycle policy automatically tiers blobs Hot → Cool (30d) → Archive (90d) → Delete (365d) to minimize storage cost over time. Optional SendGrid HTTP action sends a daily confirmation email once the blob list succeeds. All 9 resources provisioned in Terraform with an Azure Blob remote backend, deployed and validated end-to-end via GitHub Actions OIDC.",
    tags: [
      "Azure Blob Storage",
      "Logic Apps",
      "Managed Identity",
      "RBAC",
      "Lifecycle Management",
      "Terraform",
      "GitHub Actions OIDC",
    ],
    link: "https://github.com/jordann6/azure-backup-system",
  },
  {
    num: "15",
    title: "AWS Automated",
    titleOut: "Backup System",
    desc: "S3 backup vault with automated daily verification via Lambda (08:00 UTC). IAM execution role authenticates the function to S3 — no access keys or credentials stored anywhere. Versioning preserves every write as a recoverable point, noncurrent versions archive to Glacier at 7 days and expire at 90 days, and a lifecycle policy automatically tiers objects Standard → Standard-IA (30d) → Glacier (90d) → Delete (365d) to minimize storage cost over time. Optional SendGrid HTTP call sends a daily confirmation email once the object list succeeds. 15 resources provisioned in Terraform with an S3 remote backend and native state locking, deployed and validated end-to-end via GitHub Actions OIDC.",
    tags: [
      "S3",
      "Lambda",
      "EventBridge Scheduler",
      "IAM",
      "Lifecycle Management",
      "Terraform",
      "GitHub Actions OIDC",
    ],
    link: "https://github.com/jordann6/aws-backup-system",
  },
  {
    num: "17",
    title: "AI Inventory",
    titleOut: "Tracker",
    desc: "Serverless inventory management REST API with on-demand AI analysis powered by Amazon Bedrock. Lambda routes GET, POST, and DELETE requests against a DynamoDB table. POST /items/{id}/analyze sends item data — name, SKU, category, quantity, and reorder threshold — to Claude 3.5 Haiku via InvokeModel, returning a structured JSON recommendation with stock status (ok / low / critical), a one-sentence reorder suggestion, and a suggested reorder quantity. IAM execution role scoped to exact DynamoDB actions and the specific Bedrock model ARN — no broader permissions granted. API Gateway v2 HTTP API with five explicit routes at payload format 2.0. All infrastructure provisioned in Terraform with S3 remote backend, deployed via GitHub Actions OIDC with no stored credentials.",
    tags: ["Lambda", "Amazon Bedrock", "DynamoDB", "API Gateway v2", "IAM", "Terraform", "Python", "GitHub Actions OIDC"],
    link: "https://github.com/jordann6/aws-ai-inventory-tracker",
  },
  {
    num: "18",
    title: "Serverless Document",
    titleOut: "Intelligence",
    desc: "Event-driven document extraction pipeline on Azure Functions triggered by Blob Storage uploads. Dropping any file into the raw container fires a Python 3.11 blob trigger, which submits the document to Azure AI Document Intelligence (prebuilt-document model), extracts key-value pairs and raw content, writes a structured JSON result to a processed container, and upserts a metadata row to Table Storage for fast querying — all without touching the raw blob. Two storage accounts isolate the Functions runtime from document storage. System-assigned Managed Identity with six scoped RBAC role assignments handles all service-to-service auth — no connection strings or API keys anywhere in application config. All infrastructure provisioned in Terraform with an Azure Blob remote backend, deployed via GitHub Actions federated credentials.",
    tags: ["Azure Functions", "Azure AI Document Intelligence", "Blob Storage", "Table Storage", "Managed Identity", "Terraform", "Python", "GitHub Actions OIDC"],
    link: "https://github.com/jordann6/azure-document-intelligence",
  },
  {
    num: "19",
    title: "Customer Inquiry",
    titleOut: "Manager",
    desc: "Serverless customer inquiry intake API with automated dual-notification on every new submission. POST /inquiries stores the inquiry in DynamoDB and synchronously fires two SES emails — an internal alert to the support team and a confirmation to the customer — via a sender-scoped IAM policy condition (ses:FromAddress). GET /inquiries supports a ?status= query parameter backed by a DynamoDB Global Secondary Index on status + created_at, enabling efficient filtered queries without a table scan. PATCH /inquiries/{id}/status moves inquiries through a defined lifecycle: open → in-progress → resolved → closed. API Gateway v2 HTTP API with four explicit routes, Lambda proxy integration at payload format 2.0, and least-privilege IAM execution role scoped to DynamoDB CRUD and the GSI. All infrastructure provisioned in Terraform with S3 remote backend, deployed via GitHub Actions OIDC.",
    tags: ["Lambda", "API Gateway v2", "DynamoDB", "SES", "IAM", "Terraform", "Python", "GitHub Actions OIDC"],
    link: "https://github.com/jordann6/aws-customer-inquiry-manager",
  },
  {
    num: "16",
    title: "Arch Linux",
    titleOut: "Homelab",
    desc: "Repurposed a T2 MacBook into a dedicated infrastructure lab running Arch Linux with K3s. Hosts development workloads, vector databases, and project backends. Full writeup covering the build process, networking, and cluster configuration.",
    tags: ["Arch Linux", "K3s", "Kubernetes", "Networking", "Homelab"],
    link: "https://substack.com/@jordann6/p-183075828",
  },
  {
    num: "20",
    title: "AWS Developer",
    titleOut: "Platform",
    desc: "Internal Developer Platform on EKS that gives application teams a paved road. ArgoCD app-of-apps GitOps reconciles every platform component from Git. Crossplane with an IRSA-authenticated AWS provider exposes a self-service Bucket API: a developer's one-line claim provisions a real S3 bucket hardened by default with AES256 encryption, versioning, all four public-access-block settings, and an owning-team tag, with no static credentials anywhere. Kyverno enforces an owning-team label as admission policy in flagged namespaces. A Backstage golden-path template scaffolds a new service complete with a Dockerfile, a hardened Helm chart, and an ArgoCD Application so it is GitOps-deployable the moment it exists. EKS, VPC, OIDC, and the scoped IRSA role provisioned in Terraform with an S3 remote state backend. Verified end to end against real AWS, then torn down clean.",
    tags: [
      "EKS",
      "ArgoCD",
      "Crossplane",
      "Kyverno",
      "Backstage",
      "IRSA",
      "Terraform",
      "GitOps",
    ],
    link: "https://github.com/jordann6/aws-developer-platform",
  },
  {
    num: "21",
    title: "Azure Developer",
    titleOut: "Platform",
    desc: "Internal Developer Platform on AKS, the Azure counterpart to the AWS platform built on a different toolchain to show the paved-road pattern is not cloud or tool specific. Flux reconciles the platform from Git via GitRepository, Kustomization, and HelmRelease. Crossplane with an Azure provider authenticated through Azure Workload Identity exposes a self-service StorageAccount API: a claim provisions a real storage account hardened by default with TLS1_2 minimum, HTTPS-only traffic, public blob access disabled, and infrastructure encryption, with no client secrets. Kyverno enforces owning-team labels as admission policy. AKS with OIDC issuer and workload identity, plus a federated user-assigned managed identity, provisioned in Terraform with an Azure Storage state backend. Verified end to end against real Azure, then torn down clean.",
    tags: [
      "AKS",
      "Flux",
      "Crossplane",
      "Workload Identity",
      "Kyverno",
      "Terraform",
      "GitOps",
    ],
    link: "https://github.com/jordann6/azure-developer-platform",
  },
  {
    num: "22",
    title: "Azure Landing",
    titleOut: "Zone",
    desc: "Enterprise-grade Azure landing zone built entirely in Terraform. Establishes the governance foundation that workload subscriptions inherit: a four-level management group hierarchy (org root, Platform, Workloads, Sandbox), three custom Azure Policy definitions assigned at the Workloads management group scope (require owner tag, deny public IPs, allowed locations), and a hub-spoke network. Hub VNet carries correctly-named and minimum-sized reserved subnets for Azure Firewall, VPN Gateway, and Bastion alongside an active management subnet with an internet-deny NSG. A reusable Terraform module vends new spokes with a single call: it provisions the spoke resource group, spoke VNet, workload subnet, and both directions of VNet peering. Two spokes (Platform, Sandbox) demonstrated. Verified end to end against real Azure, then torn down clean.",
    tags: [
      "Management Groups",
      "Azure Policy",
      "Hub-Spoke",
      "VNet Peering",
      "Terraform",
      "Governance",
    ],
    link: "https://github.com/jordann6/azure-landing-zone",
  },
];

(function () {
  const root = document.getElementById("projList");
  if (!root) return;
  root.innerHTML = projects
    .map(
      (p) => `
    <a class="proj__item" data-num="${p.num}" href="#">
      <div class="proj__num">/${p.num}</div>
      <div class="proj__main">
        <div class="proj__title">${p.title} <span class="out">${p.titleOut}</span></div>
        <div class="proj__hover-tags">
          ${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
        </div>
      </div>
      <span class="proj__arrow">↗</span>
    </a>
  `,
    )
    .join("");
  root.addEventListener("click", (e) => {
    const it = e.target.closest(".proj__item");
    if (!it) return;
    e.preventDefault();
    openModal(projects.find((p) => p.num === it.dataset.num));
  });
})();

function openModal(p) {
  const root = document.getElementById("modalRoot");
  if (!root || !p) return;
  root.innerHTML = `
    <div class="modal-mask">
      <div class="modal">
        <div style="display:flex;justify-content:space-between;margin-bottom:24px;font-family:var(--font-mono);font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:var(--text-dim)">
          <span>↳ Project /${p.num}</span><span class="closeM" style="cursor:pointer">Close ✕</span>
        </div>
        <h3 style="font-family:var(--font-display);font-weight:700;font-size:48px;line-height:0.95;letter-spacing:-0.02em;text-transform:uppercase;color:var(--white);margin-bottom:24px">
          ${p.title} <span style="-webkit-text-stroke:1px var(--white);-webkit-text-fill-color:transparent">${p.titleOut}</span>
        </h3>
        <p style="font-size:15px;line-height:1.8;color:var(--text-secondary);margin-bottom:32px;max-width:60ch">${p.desc}</p>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:36px">
          ${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
        </div>
        <a class="btn btn--primary" href="${p.link}" target="_blank" rel="noopener noreferrer">${p.link.includes("github") ? "View on GitHub" : "Read on Substack"} <span class="arrow">↗</span></a>
      </div>
    </div>`;
  const close = () => (root.innerHTML = "");
  root.querySelector(".modal-mask").addEventListener("click", (e) => {
    if (
      e.target.classList.contains("modal-mask") ||
      e.target.classList.contains("closeM")
    )
      close();
  });
}

/* Skills */
const skills = [
  {
    label: "/Languages",
    tags: ["Python", "JavaScript", "Bash", "Go", "C#", "SQL"],
  },
  { label: "/Cloud", tags: ["AWS", "Azure", "GCP"] },
  { label: "/Infra", tags: ["Docker", "Kubernetes", "Linux", "Terraform"] },
  { label: "/Pipelines", tags: ["GitHub Actions", "CI/CD"] },
  {
    label: "/Observability",
    tags: ["Prometheus", "Grafana", "PromQL", "Falco"],
  },
  {
    label: "/AI Infra",
    tags: [
      "LLM Gateway",
      "RAG Pipelines",
      "Vector Search",
      "OpenAI / Anthropic",
    ],
  },
];

(function () {
  const root = document.getElementById("skillsGrid");
  if (!root) return;
  root.innerHTML = skills
    .map(
      (g) => `
    <div class="skills__group">
      <div class="label">${g.label}</div>
      <div class="items">${g.tags.map((t, i) => `<span>${t}${i < g.tags.length - 1 ? "," : ""}</span>`).join("")}</div>
    </div>
  `,
    )
    .join("");
})();

/* Reveal on scroll + nav active state */
(function () {
  const obs = new IntersectionObserver(
    (es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

  const navLinks = document.querySelectorAll(".nav__link");
  const sections = [
    "hero",
    "about",
    "experience",
    "projects",
    "skills",
    "certs",
    "contact",
  ];
  const railPos = document.getElementById("railPos");
  const obs2 = new IntersectionObserver(
    (es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          const id = e.target.id;
          navLinks.forEach((l) =>
            l.classList.toggle("active", l.dataset.target === id),
          );
          const idx = sections.indexOf(id);
          if (idx >= 0 && railPos)
            railPos.textContent = `${(idx + 1).toString().padStart(2, "0")} / ${sections.length.toString().padStart(2, "0")}`;
        }
      });
    },
    { threshold: 0.5 },
  );
  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el) obs2.observe(el);
  });

  navLinks.forEach((l) =>
    l.addEventListener("click", (e) => {
      e.preventDefault();
      const t = document.getElementById(l.dataset.target);
      if (t)
        window.scrollTo({
          top: t.getBoundingClientRect().top + window.scrollY - 40,
          behavior: "smooth",
        });
    }),
  );
})();

/* Visitor counter */
(function () {
  const API_ENDPOINT =
    "https://673vy98pwa.execute-api.us-east-1.amazonaws.com/prod/count";
  const el = document.getElementById("count");
  const mirror = document.querySelector(".count-mirror");
  if (!el) return;
  fetch(API_ENDPOINT)
    .then((r) => {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    })
    .then((data) => {
      let visits = 0;
      if (data.visits) {
        visits = data.visits;
      } else if (data.body) {
        const body =
          typeof data.body === "string" ? JSON.parse(data.body) : data.body;
        visits = body.visits || body.count || 0;
      }
      const formatted = visits.toLocaleString();
      el.textContent = formatted;
      if (mirror) mirror.textContent = formatted;
    })
    .catch(() => {
      el.textContent = "---";
      if (mirror) mirror.textContent = "---";
    });
})();
