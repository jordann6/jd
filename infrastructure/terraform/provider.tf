terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  backend "s3" {
    bucket = "tf-backend-jord-projs"
    key    = "cloud-resume-challenge/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}