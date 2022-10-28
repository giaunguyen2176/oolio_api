data "aws_route53_zone" "default" {
  name         = var.r53_zone
  private_zone = false
}

data "aws_ecs_cluster" default {
  cluster_name = var.cluster
}

data "aws_vpc" "default" {
  tags = {
    Group = var.cluster
  }
}

data "aws_security_group" "allow_http_https" {
  name = "allow_http_https"
}

data "aws_security_group" "default" {
  vpc_id = data.aws_vpc.default.id
  name = "default"
}

data "aws_db_subnet_group" "default" {
  name = var.cluster
}

data "aws_subnets" "public" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }

  tags = {
    Tier = "Public"
  }
}

data "aws_subnets" "private" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }

  tags = {
    Tier = "Private"
  }
}

data "aws_iam_role" "ecs_task_execution_role" {
  name = "${var.cluster}-ecs-task-execution-role"
}
