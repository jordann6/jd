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
  /** Terminal-styled run receipt: what was provisioned, proven, and torn down */
  receipt?: { rows: { k: string; v: string }[]; total: { k: string; v: string } };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "multi-region-failover",
    num: "03",
    title: "Multi-Region",
    titleOut: "Failover Manager",
    category: "AWS · Platform · SRE",
    lede: "Automated regional disaster recovery that treats failover as two problems on two clocks: DNS shifts traffic in about a minute while orchestration promotes the database behind it, demonstrated live against real AWS and torn down the same night.",
    meta: [
      { k: "Role", v: "Cloud / SRE" },
      { k: "Cloud", v: "AWS" },
      { k: "Regions", v: "us-east-1 + us-west-2" },
      { k: "Resources", v: "70 (Terraform)" },
    ],
    blocks: [
      {
        num: "/01",
        heading: "Problem",
        paragraphs: [
          "Stateless failover is a DNS feature. Stateful failover is not: a cross-region read replica keeps the data close, but something still has to decide the primary is gone and promote the standby to writable. Those two mechanisms run on different clocks, and gating traffic on the slower one extends the outage for no reason.",
          "The goal was a system where traffic shifts in seconds, the database promotes itself in minutes, and the window in between is honest and observable rather than hidden.",
        ],
      },
      {
        num: "/02",
        heading: "Approach",
        bullets: [
          "An identical serverless order API (API Gateway v2 and Lambda in private-subnet-only VPCs, no IGW or NAT) runs in us-east-1 and us-west-2 over an RDS PostgreSQL primary with an encrypted cross-region read replica.",
          "A Route 53 health check probes the primary /health endpoint every 10 seconds, and failover routing answers with the standby endpoint the moment it fails, with no automation in the traffic path.",
          "A CloudWatch alarm on the health check metric emits a state change that EventBridge forwards cross-region to the standby bus, where a failover Lambda verifies the replica is promotable, calls PromoteReadReplica idempotently, and publishes what it did to SNS.",
          "Until promotion completes, the standby serves reads and returns an honest 409 on writes, which makes the promotion itself observable as a behavior change rather than a log line.",
        ],
      },
      {
        num: "/03",
        heading: "Architecture",
        paragraphs: [
          "Every response component lives in the standby region on purpose: the machinery that answers a regional failure must not depend on the failing region. The health check metric only exists in us-east-1, which is exactly why the alarm's consequences are shipped out of that region immediately.",
          "Credentials live in Secrets Manager with cross-region replication reached through interface endpoints, TLS to PostgreSQL is verified against the RDS CA bundle, and the failover role can promote exactly one ARN. CI gates on Bandit, Checkov, and Trivy, with an OIDC-authenticated plan job and zero static keys.",
        ],
      },
      {
        num: "/04",
        heading: "Outcome",
        paragraphs: [
          "Demonstrated live: the primary was broken deliberately, DNS answered with the standby region in about 60 seconds, and the alarm-to-promotion automation fired about 100 seconds after the failure began. The promoted standby then accepted the same write it had correctly refused minutes earlier.",
          "All 70 resources were destroyed the same night, with every leftover check across both regions coming back empty. Total session cost was about a quarter.",
        ],
      },
    ],
    stack: ["Route 53", "RDS PostgreSQL", "Lambda", "EventBridge", "API Gateway v2", "Secrets Manager", "SNS", "Terraform"],
    repo: "https://github.com/jordann6/multi-region-failover-manager",
    receipt: {
      rows: [
        { k: "Provision", v: "70 resources across two regions, RDS primary plus encrypted cross-region replica, all Terraform" },
        { k: "Demo", v: "Primary broken live: DNS flipped in ~60s, alarm-to-promotion automation fired in ~100s" },
        { k: "Proof", v: "Standby returned 409 on writes as a replica, then 201 once promoted" },
        { k: "Destroy", v: "Torn down the same night, all leftover checks empty, zero residual billing" },
      ],
      total: { k: "Session cost", v: "About $0.25" },
    },
  },
  {
    slug: "aws-developer-platform",
    num: "21",
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
    receipt: {
      rows: [
        { k: "Provision", v: "EKS, VPC, OIDC provider, scoped IRSA role, Terraform with S3 remote state" },
        { k: "Demo", v: "One-line Crossplane claim returned a hardened, tagged S3 bucket with zero credential handling" },
        { k: "Policy", v: "Kyverno admission rejected unlabeled workloads at the API server" },
        { k: "Destroy", v: "Torn down clean after end-to-end verification against real AWS" },
      ],
      total: { k: "Lifecycle", v: "Deploy · Demo · Destroy" },
    },
  },
  {
    slug: "azure-developer-platform",
    num: "22",
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
    receipt: {
      rows: [
        { k: "Provision", v: "AKS with OIDC issuer, workload identity, federated managed identity, Terraform with Azure Storage state" },
        { k: "Demo", v: "StorageAccount claim provisioned hardened storage, TLS 1.2 minimum, no client secrets anywhere" },
        { k: "Policy", v: "Kyverno enforced owning-team labels as admission policy" },
        { k: "Destroy", v: "Torn down clean after end-to-end verification against real Azure" },
      ],
      total: { k: "Lifecycle", v: "Deploy · Demo · Destroy" },
    },
  },
  {
    slug: "aws-incident-responder",
    num: "24",
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
    receipt: {
      rows: [
        { k: "Provision", v: "n8n on ECS Fargate behind an ALB with ACM and Route 53, CloudWatch alarm, SNS, all Terraform" },
        { k: "Demo", v: "CPU alarm fired, Claude summarized the incident, Slack card posted, EC2 rebooted via SigV4, alarm re-checked to resolution" },
        { k: "IAM", v: "Remediation scoped to RebootInstances on a single instance ARN" },
        { k: "Destroy", v: "Torn down clean" },
      ],
      total: { k: "Run cost", v: "About a dollar a day" },
    },
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
    receipt: {
      rows: [
        { k: "Provision", v: "34 resources in Terraform with S3 remote backend and native state locking" },
        { k: "Demo", v: "Z-score anomaly detection and a 14-day forecast over 90 days of live Cost Explorer data" },
        { k: "IAM", v: "Three execution roles, least privilege at each layer" },
        { k: "Deploy", v: "GitHub Actions OIDC, no static keys" },
      ],
      total: { k: "Stack", v: "Serverless end to end" },
    },
  },
  {
    slug: "cloud-security-lab",
    num: "07",
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
          "The full MITRE ATT&CK kill chain is scripted under attack/ so it runs identically every time and always under the leaked credential rather than an admin identity: initial access, permission enumeration, then privilege escalation from 1,039 to 15,319 permissions via policy attachment.",
          "Then S3 exfiltration of staged PII and lateral movement via STS role assumption, with Pacu and ScoutSuite available for deeper manual exploration.",
        ],
      },
      {
        num: "/03",
        heading: "Detect & Respond",
        bullets: [
          "CloudTrail and VPC Flow Logs feed an OpenSearch SIEM with a kill-chain correlation dashboard.",
          "GuardDuty findings on IAM threats trigger an EventBridge rule that fires a Lambda to automatically disable compromised access keys.",
          "On Kubernetes, Falco runs as a DaemonSet catching runtime attacks: shell spawning, sensitive file reads, unauthorized binary execution, and container escape via host mount.",
          "OPA Gatekeeper blocks privileged containers, host namespace access, and root execution across all non-system namespaces.",
        ],
      },
      {
        num: "/04",
        heading: "Detection as Code",
        bullets: [
          "The Gatekeeper admission policies are unit-tested with gator against known-good and known-bad pods, so a broken policy fails CI before it ever reaches a cluster.",
          "CI gates selectively against a codebase that is vulnerable on purpose: the defensive modules are held to a Checkov baseline that blocks new misconfigurations, the intentionally-vulnerable surface is scanned informationally, and secret scanning blocks everywhere.",
          "The exercised techniques are captured as an importable MITRE ATT&CK Navigator layer.",
        ],
      },
      {
        num: "/05",
        heading: "Outcome",
        paragraphs: [
          "A closed loop from exploitation to automated containment, with every control demonstrated against a live, reproducible attack rather than described in the abstract.",
          "62 Terraform resources across 7 modules, deployable and destroyable on demand.",
        ],
      },
    ],
    stack: ["GuardDuty", "OpenSearch", "Falco", "OPA Gatekeeper", "gator", "EventBridge", "Lambda", "Pacu", "Checkov", "Terraform"],
    repo: "https://github.com/jordann6/cloud-security-lab",
    receipt: {
      rows: [
        { k: "Provision", v: "62 Terraform resources across 7 modules, AWS plus Kubernetes" },
        { k: "Attack", v: "Pacu kill chain escalated 1,039 to 15,319 permissions and exfiltrated staged PII" },
        { k: "Detect", v: "Falco caught 100% of simulated runtime attacks, OpenSearch correlated the kill chain" },
        { k: "Respond", v: "GuardDuty finding fired EventBridge, Lambda disabled the compromised key" },
      ],
      total: { k: "Coverage", v: "Attack · Detect · Respond" },
    },
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
    receipt: {
      rows: [
        { k: "Submit", v: "202 and a job ID returned in under two seconds" },
        { k: "Run", v: "Coder Lambda executes the agentic tool-use loop asynchronously" },
        { k: "Store", v: "Results land in DynamoDB with a 24-hour TTL" },
        { k: "IAM", v: "Orchestrator can invoke only the coder, the coder can invoke nothing" },
      ],
      total: { k: "Pattern", v: "Async agentic pipeline" },
    },
  },
  {
    slug: "azure-aks-runtime-security",
    num: "33",
    title: "Azure AKS",
    titleOut: "Runtime Security",
    category: "Azure · Platform · Security",
    lede: "Defense in depth for a running AKS cluster: admission control, runtime detection, and cloud-native container security layered so an attack that evades one is caught by the next, proven end to end against real Azure and torn down the same session.",
    meta: [
      { k: "Role", v: "Cloud Security" },
      { k: "Cloud", v: "Azure + AKS" },
      { k: "Layers", v: "Admission · Runtime · Cloud" },
      { k: "Framework", v: "MITRE ATT&CK" },
    ],
    blocks: [
      {
        num: "/01",
        heading: "Problem",
        paragraphs: [
          "Kubernetes security is usually pitched as a single control: an admission policy, or a runtime agent, or a cloud scanner. Each one has a gap. Admission control stops a bad pod from being created but sees nothing once a workload is running. A runtime agent watches behavior but cannot prevent the deploy. A cloud scanner knows the control plane and the image supply chain but not the syscalls on the node.",
          "The goal was to run all three on one cluster and show, against live attacks, that the layers overlap: what one misses, the next catches.",
        ],
      },
      {
        num: "/02",
        heading: "Approach",
        bullets: [
          "Admission (Kyverno): four Enforce-mode ClusterPolicies reject unsafe pods before they run, blocking privileged containers, host namespaces, hostPath volumes, and containers that do not set runAsNonRoot.",
          "Runtime (Falco): a modern-eBPF DaemonSet with five custom rules, each tagged with a MITRE ATT&CK technique, covering shell spawning, sensitive file reads, container escape via mount, dropped-binary execution, and Azure IMDS credential theft.",
          "Cloud (Defender for Containers): a subscription-level plan wired to the same Log Analytics workspace as AKS diagnostics, adding agentless image CVE scanning and control-plane threat alerts.",
          "Kyverno was chosen over OPA Gatekeeper, used in the AWS cloud-security-lab, specifically to demonstrate range across both dominant Kubernetes policy engines.",
        ],
      },
      {
        num: "/03",
        heading: "Architecture",
        paragraphs: [
          "One Terraform stack provisions the resource group, a Log Analytics workspace, and an AKS cluster with the OIDC issuer and workload identity enabled, the Azure Monitor and Defender add-ons attached, and a system-assigned managed identity so no credentials are stored anywhere.",
          "Every Kyverno policy is unit-tested offline with the Kyverno CLI against known-good and known-bad pods, and that test gates CI before any policy is enforced on a cluster. The exercised techniques are also captured as an importable MITRE ATT&CK Navigator layer.",
        ],
      },
      {
        num: "/04",
        heading: "Proving It Live",
        bullets: [
          "A scripted attack driver first applies the vulnerable pod to a policed namespace, where Kyverno denies it with all four policies firing. That is the admission proof.",
          "The same pod then runs in a deliberately exempt break-glass namespace, and the driver executes each attack technique in turn while Falco is tailed.",
          "Against the live cluster Falco caught all five techniques, including the CRITICAL container escape via host mount and the Azure IMDS credential-access rule, confirming the runtime layer catches what the exemption let through.",
          "The deploy surfaced and fixed four real defects (Kubernetes versions aged into LTS-only, a missing namespace exemption, an admission check defeated by shell pipefail, and attack commands that did not match their detection rules), so the repository is reproducible rather than merely plausible.",
        ],
      },
      {
        num: "/05",
        heading: "Outcome",
        paragraphs: [
          "A working defense-in-depth model where prevention and detection are demonstrated against the same attack rather than described in the abstract, on a cluster that was stood up, proven, and destroyed clean with zero residual billing.",
          "The Azure counterpart to the AWS cloud-security-lab, built on a different policy engine and detection stack to show the pattern is not tool specific.",
        ],
      },
    ],
    stack: ["AKS", "Kyverno", "Falco", "Defender for Containers", "Log Analytics", "Workload Identity", "Terraform", "MITRE ATT&CK"],
    repo: "https://github.com/jordann6/azure-aks-runtime-security",
    receipt: {
      rows: [
        { k: "Provision", v: "AKS cluster, Log Analytics, and Defender for Containers via 5 Terraform resources" },
        { k: "Prevent", v: "Kyverno blocked the privileged/hostPath/hostPID pod with all 4 policies firing" },
        { k: "Detect", v: "Falco caught all 5 runtime techniques, including CRITICAL container escape" },
        { k: "Destroy", v: "Torn down clean, Defender plan reverted to Free, zero residual billing" },
      ],
      total: { k: "Model", v: "Prevent · Detect · Verify" },
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
