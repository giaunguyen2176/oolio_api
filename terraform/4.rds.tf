resource "aws_db_instance" "default" {
  allocated_storage    = 10
  engine               = var.rds.engine
  engine_version       = var.rds.engine_version
  instance_class       = var.rds.instance_class
  db_name              = var.rds.db_name
  username             = var.rds.username
  password             = var.rds.password
  parameter_group_name = var.rds.parameter_group_name
  deletion_protection  = var.is_production ? true : false
  db_subnet_group_name = data.aws_db_subnet_group.default.name
  identifier           = "${var.cluster}-${var.service}"
  skip_final_snapshot  = var.is_production ? false : true
  final_snapshot_identifier = "${var.cluster}-${var.service}"
}
