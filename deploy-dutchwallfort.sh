#!/bin/bash

# Dutch Wall Fort - Domain-Specific Deployment Script
# Configured for dutchwallfort.com

echo "🏰 Dutch Wall Fort - Production Deployment"
echo "=========================================="
echo "Domain: dutchwallfort.com"
echo "API: api.dutchwallfort.com"
echo ""

# Check if required files exist
echo "📋 Checking required files..."

required_files=(
    "docker-compose.single.yml"
    "Dockerfile"
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
echo "🌐 Domain Configuration:"
echo "========================"
echo "Frontend: dutchwallfort.com"
echo "API: api.dutchwallfort.com"
echo "Email: inamul5020@gmail.com"

echo ""
echo "🔧 Environment Variables for Coolify:"
echo "====================================="
echo "POSTGRES_PASSWORD=your_secure_database_password"
echo "JWT_SECRET=your_super_secure_jwt_secret"
echo "MAILJET_API_KEY=your_mailjet_api_key"
echo "MAILJET_SECRET_KEY=your_mailjet_secret_key"
echo "MAILJET_FROM_EMAIL=support@dutchwallfort.com"
echo "ADMIN_EMAIL=inamul5020@gmail.com"
echo "VITE_API_URL=https://api.dutchwallfort.com"
echo "FRONTEND_URL=https://dutchwallfort.com"

echo ""
echo "📦 Deployment Options:"
echo "====================="
echo "1. Single Container (Recommended):"
echo "   - Use: docker-compose.single.yml"
echo "   - Port: 3000"
echo "   - Domain: dutchwallfort.com"
echo ""
echo "2. Multi-Container:"
echo "   - Use: docker-compose.prod.yml"
echo "   - Frontend: dutchwallfort.com:3001"
echo "   - Backend: api.dutchwallfort.com:3000"

echo ""
echo "🚀 Coolify Deployment Steps:"
echo "============================"
echo "1. Create new project in Coolify"
echo "2. Select 'Docker Compose' as project type"
echo "3. Repository: Your Git repository URL"
echo "4. Compose file: docker-compose.single.yml (recommended)"
echo "5. Set environment variables (see above)"
echo "6. Configure domains:"
echo "   - dutchwallfort.com → app:3000"
echo "   - api.dutchwallfort.com → app:3000"
echo "7. Enable SSL certificates"
echo "8. Deploy!"

echo ""
echo "✅ Ready for dutchwallfort.com deployment!"
echo "=========================================="
echo "Your Dutch Wall Fort application is configured for:"
echo "- Frontend: https://dutchwallfort.com"
echo "- API: https://api.dutchwallfort.com"
echo "- Admin: https://dutchwallfort.com/admin"
echo "- Email notifications: inamul5020@gmail.com"
echo ""
echo "📚 For detailed instructions, see COOLIFY_DEPLOYMENT.md"
