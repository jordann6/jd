// Architecture diagrams copied from each case study's GitHub repo
// (docs/architecture.png, rendered with the official AWS / Azure / GCP icon
// sets) into public/diagrams/. Sizes keep the layout stable while loading.
// To refresh one, re-copy the file from its repo; to add one, add a row.
export interface ArchitectureImage {
  src: string;
  width: number;
  height: number;
}

const sizes: Record<string, [string, number, number]> = {
  "aws-developer-platform": ["png", 1882, 1911],
  "aws-incident-responder": ["png", 1593, 1591],
  "aws-landing-zone": ["png", 1904, 3362],
  "aws-serverless-lakehouse": ["png", 896, 874],
  "azure-aks-runtime-security": ["svg", 1360, 720],
  "azure-developer-platform": ["png", 1479, 1073],
  "azure-finops-dashboard": ["png", 1769, 1650],
  "azure-landing-zone": ["png", 2995, 2771],
  "azure-secrets-lifecycle": ["png", 2166, 1124],
  "cloud-security-lab": ["svg", 1440, 880],
  "cost-intelligence-dashboard": ["png", 1470, 1596],
  "dbt-analytics-athena": ["png", 1714, 417],
  "gcp-gke-config-sync": ["png", 1860, 1329],
  "gcp-landing-zone": ["png", 2168, 6194],
  "gcp-supply-chain-security": ["png", 1342, 1279],
  "gcp-workload-identity-federation": ["png", 1578, 1617],
  "gcp-zero-trust-access": ["png", 1464, 1377],
  "golden-path-finops-copilot": ["png", 2878, 1209],
  "gpu-index-api": ["png", 1412, 1231],
  "gpu-platform": ["png", 1676, 1596],
  "hpc-slurm-cluster": ["png", 1717, 1274],
  "multi-agent-coding-orchestrator": ["png", 1551, 1292],
  "multi-cloud-developer-platform": ["png", 1842, 2371],
  "multi-region-failover": ["png", 1301, 2515],
  "secrets-lifecycle": ["png", 2483, 2082],
};

export function getArchitecture(slug: string): ArchitectureImage | undefined {
  const s = sizes[slug];
  if (!s) return undefined;
  return { src: `/diagrams/${slug}.${s[0]}`, width: s[1], height: s[2] };
}
