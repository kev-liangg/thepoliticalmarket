echo "Deploying Backend..."
cd backend
aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 591885401064.dkr.ecr.us-east-2.amazonaws.com
docker build -t tpm-backend .
docker tag tpm-backend:latest 591885401064.dkr.ecr.us-east-2.amazonaws.com/tpm-backend:latest
docker push 591885401064.dkr.ecr.us-east-2.amazonaws.com/tpm-backend:latest
cd aws_deploy
eb deploy