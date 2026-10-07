from diagrams import Diagram, Cluster, Edge
from diagrams.aws.network import Route53, CloudFront
from diagrams.aws.storage import S3
from diagrams.aws.security import ACM, IAMRole
from diagrams.onprem.vcs import Github
from diagrams.onprem.client import Users

graph_attr = {
    "fontsize": "13",
    "bgcolor": "white",
    "pad": "0.75",
    "splines": "ortho",
    "nodesep": "0.6",
    "ranksep": "0.9",
}

with Diagram(
    "jordandesigns.io: static site on AWS",
    filename="architecture",
    outformat="png",
    graph_attr=graph_attr,
    direction="LR",
    show=False,
):
    user = Users("Visitor")

    dns = Route53("Route 53\njordandesigns.io")
    acm = ACM("ACM\nTLS Cert\nTLSv1.2+")
    cdn = CloudFront("CloudFront\nHTTPS-only · OAC\ncompress · IPv6")
    bucket = S3("S3\nPrivate Bucket\nAES-256 SSE")

    with Cluster("CI/CD"):
        github = Github("GitHub Actions")
        oidc = IAMRole("OIDC\nDeploy Role")

    user >> Edge(label="HTTPS") >> dns >> cdn
    acm >> Edge(style="dashed", color="grey") >> cdn
    cdn >> bucket
    github >> oidc >> Edge(label="s3 sync\nCF invalidate") >> bucket
