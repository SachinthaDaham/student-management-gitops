# Create AWS Secrets Manager Secret for database credentials
resource "aws_secretsmanager_secret" "db_secrets" {
  name = "${local.name}-db-secrets"
}

# The user can manually populate this secret in the AWS Console, 
# or we can push initial dummy values here. We'll leave it empty to avoid putting real passwords in code.
resource "aws_secretsmanager_secret_version" "db_secrets_initial" {
  secret_id     = aws_secretsmanager_secret.db_secrets.id
  secret_string = jsonencode({
    DB_HOST     = module.db.db_instance_address
    DB_USER     = "student_admin"
    DB_PASSWORD = "your-secure-password" # User should rotate this in AWS Console
    DB_NAME     = "student_db"
  })
}

# IRSA (IAM Role for Service Accounts) for External Secrets Operator
module "external_secrets_irsa_role" {
  source  = "terraform-aws-modules/iam/aws//modules/iam-role-for-service-accounts-eks"
  version = "~> 5.0"

  role_name                      = "external-secrets-${local.name}"
  attach_external_secrets_policy = true

  external_secrets_secrets_manager_arns   = [aws_secretsmanager_secret.db_secrets.arn]

  oidc_providers = {
    ex = {
      provider_arn               = module.eks.oidc_provider_arn
      namespace_service_accounts = ["external-secrets:external-secrets"]
    }
  }
}

output "external_secrets_iam_role_arn" {
  value = module.external_secrets_irsa_role.iam_role_arn
}
