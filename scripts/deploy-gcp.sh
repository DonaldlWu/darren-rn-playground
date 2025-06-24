#!/bin/bash

# GCP Monorepo Deployment Script
set -e

# Configuration
PROJECT_ID="united-park-179106"  # Replace with your actual project ID
REGION="asia-east1"
BACKEND_SERVICE="darren-portfolio-backend"

echo "🚀 Starting GCP deployment for monorepo..."

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI is not installed. Please install it first."
    echo "Visit: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Set the project
echo "📋 Setting project to: $PROJECT_ID"
gcloud config set project $PROJECT_ID

# Enable required APIs
echo "🔧 Enabling required APIs..."
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable sqladmin.googleapis.com

# Deploy backend
echo "🏗️ Deploying backend to Cloud Run..."
cd backend
gcloud run deploy $BACKEND_SERVICE \
    --source . \
    --region $REGION \
    --platform managed \
    --allow-unauthenticated \
    --port 3001 \
    --memory 512Mi \
    --cpu 1 \
    --max-instances 10 \
    --set-env-vars NODE_ENV=production \
    --set-env-vars DATABASE_URL=$DATABASE_URL \
    --set-env-vars BLOG_API_KEY=$BLOG_API_KEY

# Get backend URL
BACKEND_URL=$(gcloud run services describe $BACKEND_SERVICE --region=$REGION --format='value(status.url)')
echo "✅ Backend deployed at: $BACKEND_URL"

cd ..

# Deploy frontend to Firebase Hosting
echo "🏗️ Deploying frontend to Firebase Hosting..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI is not installed. Installing..."
    npm install -g firebase-tools
fi

# Login to Firebase
echo "🔐 Logging into Firebase..."
firebase login --no-localhost

# Build frontend with correct API URL
echo "🔧 Building frontend with backend URL: $BACKEND_URL"
cd frontend

# Create production environment file
cat > .env.production << EOF
VITE_API_BASE_URL=$BACKEND_URL/api/v1
EOF

npm run build
cd ..

# Deploy to Firebase
echo "🚀 Deploying to Firebase Hosting..."
firebase deploy --only hosting

echo "✅ Deployment completed!"
echo ""
echo "🌐 Your services are now available at:"
echo "Backend: $BACKEND_URL"
echo "Frontend: $(firebase hosting:channel:list | grep 'live' | awk '{print $2}')"