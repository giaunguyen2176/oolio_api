is_production         = false
cluster               = "oolio-dev"
service               = "oolio-api"
r53_zone              = "oolio.escape30.com"
r53_endpoint          = "api.oolio.escape30.com"
task_definition = {
  memory              = 1024
  cpu                 = 256
}
containers = {
  app = {
    name                = "oolio_api"
    container_port      = 3000
    host_port           = 3000
    image               = "ghcr.io/giaunguyen2176/oolio_api:latest"
    memory              = 256
    cpu                 = 10
  }
}
rds = {
  engine               = "postgres"
  engine_version       = "12.10"
  instance_class       = "db.t3.micro"
  username             = "oolio"
  password             = "ooliotest2022"
  parameter_group_name = "default.postgres12"
  db_name              = "oolio_dev_oolio_api"
}
environment_variables = {
  node_env = "development"
  debug = "oolio-api:*"
}
