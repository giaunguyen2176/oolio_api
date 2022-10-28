1. Install terraform: https://www.terraform.io/downloads

2. Init infrastructure

    `terraform init`

3. Create/Update infrastructure

    `terraform apply -var-file=path-to-.tfvars-file`
    
4. Destroy infrastructure

    `terraform destroy -var-file=path-to-.tfvars-file`
