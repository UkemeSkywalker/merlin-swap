# GitHub Actions Setup Guide

## Required GitHub Secrets

To use this CI/CD pipeline, you need to configure the following secrets in your GitHub repository:

### Setting up GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

### Required Secrets

| Secret Name | Description | How to Get |
|------------|-------------|------------|
| `AWS_ACCESS_KEY_ID` | AWS IAM access key ID | Create an IAM user with ECR permissions |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM secret access key | Generated when creating the IAM user |

## AWS Setup

### 1. Create ECR Repository

```bash
aws ecr create-repository \
  --repository-name merlin-swap \
  --region us-east-1
```

### 2. Create IAM User for GitHub Actions

Create an IAM user with the following policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ecr:GetAuthorizationToken",
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer",
        "ecr:BatchGetImage",
        "ecr:PutImage",
        "ecr:InitiateLayerUpload",
        "ecr:UploadLayerPart",
        "ecr:CompleteLayerUpload"
      ],
      "Resource": "*"
    }
  ]
}
```

### 3. Generate Access Keys

1. Go to IAM → Users → Select your user
2. Go to **Security credentials** tab
3. Click **Create access key**
4. Choose **Application running outside AWS**
5. Copy the Access Key ID and Secret Access Key

## Pipeline Configuration

### Environment Variables

You can customize these in `.github/workflows/deploy.yml`:

- `AWS_REGION`: AWS region for ECR (default: `us-east-1`)
- `ECR_REPOSITORY`: ECR repository name (default: `merlin-swap`)

### Triggers

The pipeline runs on:
- Push to `main` or `develop` branches
- Pull requests to `main` branch

### Image Tags

Each build creates three tags:
- `<git-sha>`: Specific commit SHA (short)
- `latest`: Always points to the most recent build
- `<branch-name>`: Branch-specific tag (e.g., `main`, `develop`)

## Verifying the Setup

After pushing code, check:

1. **GitHub Actions tab** in your repository for workflow runs
2. **AWS ECR console** to verify images are pushed
3. Workflow logs for any errors

## Troubleshooting

### Authentication Errors
- Verify AWS credentials are correct in GitHub Secrets
- Check IAM user has necessary ECR permissions

### ECR Repository Not Found
- Ensure the ECR repository exists in the specified region
- Verify `ECR_REPOSITORY` name matches your AWS ECR repository

### Build Failures
- Check Dockerfile syntax
- Verify all dependencies are available
- Review build logs in GitHub Actions
