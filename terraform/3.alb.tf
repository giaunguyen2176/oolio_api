resource "aws_lb" "alb" {
  name               = "${var.cluster}-${var.service}"
  internal           = false
  load_balancer_type = "application"
  subnets            = data.aws_subnets.public.ids
  enable_deletion_protection = false
  security_groups = [data.aws_security_group.allow_http_https.id, data.aws_security_group.default.id]
}

resource "aws_lb_target_group" "target_group" {
  name        = "${var.cluster}-${var.service}"
  target_type = "ip"
  port        = var.containers["app"].host_port
  protocol    = "HTTP"
  vpc_id      = data.aws_vpc.default.id
  health_check {
    path = "/"
  }
}

resource "aws_alb_listener" "http" {
  load_balancer_arn = aws_lb.alb.id
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = 443
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_alb_listener" "https" {
  load_balancer_arn = aws_lb.alb.id
  port              = 443
  protocol          = "HTTPS"

  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = aws_acm_certificate.cert.arn

  default_action {
    target_group_arn = aws_lb_target_group.target_group.id
    type             = "forward"
  }
}

resource "aws_acm_certificate" "cert" {
  domain_name       = var.r53_endpoint
  validation_method = "DNS"
}

resource "aws_route53_record" "cert_record" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.default.zone_id
}

resource "aws_acm_certificate_validation" "certificate_validation" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_record : record.fqdn]
}

resource "aws_route53_record" "endpoint" {
  name            = var.r53_endpoint
  zone_id         = data.aws_route53_zone.default.zone_id
  type            = "A"

  alias {
    name                   = aws_lb.alb.dns_name
    zone_id                = aws_lb.alb.zone_id
    evaluate_target_health = true
  }
}
