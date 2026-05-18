from diagrams import Diagram, Cluster, Edge
from diagrams.aws.network import Route53, CloudFront, APIGateway
from diagrams.aws.storage import S3
from diagrams.aws.compute import Lambda
from diagrams.aws.database import Dynamodb
from diagrams.aws.integration import SNS, Eventbridge
from diagrams.aws.security import IAM, CertificateManager
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
    "jordandesigns.io — Cloud Resume Architecture",
    filename="architecture",
    outformat="png",
    graph_attr=graph_attr,
    direction="TB",
    show=False,
):
    user = Users("Visitor")

    with Cluster("CI/CD"):
        github = Github("GitHub\nActions")
        iam_role = IAM("OIDC Deploy Role")
        github >> Edge(label="AssumeRole\n(OIDC)") >> iam_role

    with Cluster("AWS — us-east-1"):

        with Cluster("DNS & TLS"):
            acm  = CertificateManager("ACM\nTLS Certificate")
            dns  = Route53("Route 53")

        with Cluster("Edge"):
            cdn = CloudFront("CloudFront\nPriceClass_100")

        with Cluster("Storage (Private)"):
            bucket = S3("S3 Bucket\njordandesigns.io")

        with Cluster("Visitor Counter"):
            apigw      = APIGateway("API Gateway\n/count")
            counter_fn = Lambda("visitor_counter\nPython 3.13")
            visit_db   = Dynamodb("VisitorCount")

        with Cluster("Uptime Monitor"):
            eb        = Eventbridge("EventBridge\nWeekly Cron")
            uptime_fn = Lambda("uptime_checker\nPython 3.13")
            uptime_db = Dynamodb("uptime-monitor-logs\n(TTL enabled)")
            alert     = SNS("SNS\nEmail Alert")

    # ── User → frontend ──────────────────────────────────────────
    user >> Edge(label="HTTPS") >> dns
    dns  >> cdn
    acm  >> Edge(style="dashed", color="grey") >> cdn
    cdn  >> Edge(label="OAC / SigV4") >> bucket

    # ── User → visitor counter API ───────────────────────────────
    user        >> Edge(label="GET /count") >> apigw
    apigw       >> counter_fn
    counter_fn  >> visit_db

    # ── CI/CD → deploy ───────────────────────────────────────────
    iam_role >> Edge(label="s3 sync") >> bucket
    iam_role >> Edge(label="CF invalidate") >> cdn

    # ── Uptime monitor ───────────────────────────────────────────
    eb        >> uptime_fn
    uptime_fn >> uptime_db
    uptime_fn >> Edge(label="on failure") >> alert
