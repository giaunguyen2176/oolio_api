resource "aws_ecs_task_definition" task_definition {
  family = "${var.cluster}-${var.service}"
  requires_compatibilities  = ["FARGATE"]
  cpu                       = tonumber(var.task_definition.cpu)
  memory                    = tonumber(var.task_definition.memory)
  execution_role_arn        = data.aws_iam_role.ecs_task_execution_role.arn
  network_mode              = "awsvpc"

  container_definitions = jsonencode([
    {
      name      = var.containers["app"].name
      image     = var.containers["app"].image
      cpu       = tonumber(var.containers["app"].cpu)
      memory    = tonumber(var.containers["app"].memory)
      essential = true
      portMappings = [
        {
          containerPort = tonumber(var.containers["app"].container_port)
          hostPort      = tonumber(var.containers["app"].host_port)
        }
      ]
      logConfiguration = {
        logDriver = "awslogs",
        options = {
          awslogs-group = "backend",
          awslogs-region = "ap-southeast-1",
          awslogs-create-group = "true",
          awslogs-stream-prefix = var.service
        }
      },
      command = [
        "./entrypoint.sh"
      ],
      environment = [
        {
          name = "DEBUG",
          value = var.environment_variables.debug
        },
        {
          name = "NODE_ENV",
          value = var.environment_variables.node_env
        },
        {
          name = "DB_HOST",
          value = aws_db_instance.default.address
        },
        {
          name = "DB_PORT",
          value = tostring(aws_db_instance.default.port)
        },
        {
          name = "DB_PASS",
          value = aws_db_instance.default.password
        },
        {
          name = "DB_USER",
          value = aws_db_instance.default.username
        },
        {
          name = "DB_NAME",
          value = aws_db_instance.default.db_name
        }
      ]
    }
  ])
}
