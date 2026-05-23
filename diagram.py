from diagrams import Diagram, Cluster, Edge
from diagrams.aws.network import Route53, CloudFront, APIGateway
from diagrams.aws.storage import S3
from diagrams.aws.compute import Lambda
from diagrams.aws.database import Dynamodb
from diagrams.aws.security import ACM, IAMRole
from diagrams.aws.management import CloudwatchLogs
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
    "jordandesigns.io — Cloud Resume Challenge",
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

    with Cluster("Visitor Counter"):
        apigw = APIGateway("API Gateway\nGET /count")
        fn = Lambda("VisitorCounter\nPython 3.13")
        db = Dynamodb("DynamoDB\nvisitor_count")
        logs = CloudwatchLogs("CloudWatch\nLogs")

    with Cluster("CI/CD"):
        github = Github("GitHub Actions")
        oidc = IAMRole("OIDC\nDeploy Role")

    user >> Edge(label="HTTPS") >> dns >> cdn
    acm >> Edge(style="dashed", color="grey") >> cdn
    cdn >> bucket
    cdn >> apigw >> fn >> db
    fn >> Edge(style="dashed") >> logs
    github >> oidc >> Edge(label="s3 sync\nCF invalidate") >> bucket
