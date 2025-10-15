#!/bin/sh

echo "🚀 Starting Dutch Wall Fort Application..."

# Generate Prisma client
echo "📦 Generating Prisma client..."
npx prisma generate

# Run database migrations (if needed)
echo "🗄️ Running database migrations..."
npx prisma db push --accept-data-loss || echo "Database push failed, continuing..."

# Start the application
echo "🌐 Starting Next.js server on port 3000..."
echo "Frontend available at: http://localhost:3000"
echo "Backend API available at: http://localhost:3000/api"
echo "Health check available at: http://localhost:3000/api/health"

exec npm start
