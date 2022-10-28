variable "is_production" {
  description = "Determine whether this is a production env to protect stateful resources such as: eleasticsearch, rds,... from being deleted on terraform destroy operation"
}

variable "cluster" {
  description = "The name of the cluster to deploy this service into, e.g. \"cluster1\""
}

variable "service" {
  description = "The name of the service to deploy cluster, e.g. \"api\""
}

variable "r53_zone" {
  description = "The name of the route53 zone to host this service, e.g. \"example.com\""
}

variable "r53_endpoint" {
  description = "The name of the endpoint to host this service, e.g. \"api.example.com\""
}

variable "task_definition" {
  type = object({
    memory = number
    cpu = number
  })
}

variable "containers" {
  description = "The object describe all containers"
  type = map(object({
    name = string
    container_port = string
    host_port = string
    image = string
    memory = number
    cpu = number
  }))
}

variable "environment_variables" {
  description = "The object describe all containers"
  type = object({
    node_env = string
    debug = string
  })
}

variable "rds" {
  description = "The object describe all rds properties"
  type = object({
    engine = string
    engine_version = string
    instance_class = string
    username = string
    password = string
    parameter_group_name = string
    db_name = string
  })
}
