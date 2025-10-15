#!/bin/bash

# Dutch Wall Fort - Coolify Deployment Script
# This script helps prepare the application for Coolify deployment

echo "🚀 Dutch Wall Fort - Coolify Deployment Preparation"
echo "=================================================="

# Check if required files exist
echo "📋 Checking required files..."

required_files=(
    "docker-compose.prod.yml"
    "backend/Dockerfile.prod"
    "Dockerfile.frontend.prod"
    "env.production.example"
    "COOLIFY_DEPLOYMENT.md"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
        exit 1
    fi
done

echo ""
echo "🔧 Environment Configuration:"
echo "============================="
echo "1. Copy env.production.example to .env.production"
echo "2. Update the following variables in Coolify:"
echo "   - POSTGRES_PASSWORD (set a secure password)"
echo "   - JWT_SECRET (set a secure secret)"
echo "   - MAILJET_API_KEY (your Mailjet API key)"
echo "   - MAILJET_SECRET_KEY (your Mailjet secret key)"
echo "   - ADMIN_EMAIL (inamul5020@gmail.com)"
echo "   - VITE_API_URL (your API domain)"
echo "   - FRONTEND_URL (your frontend domain)"

echo ""
echo "🌐 Domain Configuration:"
echo "========================"
echo "Frontend: yourdomain.com -> frontend:80"
echo "Backend API: api.yourdomain.com -> backend:3000"

echo ""
echo "📦 Services:"
echo "==========="
echo "✅ Frontend (React + Vite + Nginx)"
echo "✅ Backend (Next.js + Prisma + PostgreSQL)"
echo "✅ Database (PostgreSQL 16)"
echo "✅ Health Checks"
echo "✅ SSL Ready"

echo ""
echo "🚀 Ready for Coolify Deployment!"
echo "================================"
echo "1. Push this repository to Git"
echo "2. Create new project in Coolify"
echo "3. Select 'Docker Compose' as project type"
echo "4. Use 'docker-compose.prod.yml' as compose file"
echo "5. Set environment variables"
echo "6. Configure domains"
echo "7. Deploy!"

echo ""
echo "📚 For detailed instructions, see COOLIFY_DEPLOYMENT.md"
