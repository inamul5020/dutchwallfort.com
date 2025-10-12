#!/bin/bash

# Dutch Wall Fort - Database Setup Script
# This script ensures the database is properly initialized with seed data

echo "🏗️  Setting up Dutch Wall Fort Database..."

# Stop any existing containers
echo "📦 Stopping existing containers..."
docker-compose down

# Remove the database volume to ensure fresh data
echo "🗑️  Removing old database volume..."
docker volume rm dutchwallfortcom_postgres_data 2>/dev/null || true

# Start the services
echo "🚀 Starting services..."
docker-compose up -d

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Check if database has data
echo "🔍 Checking database data..."
ROOM_COUNT=$(docker-compose exec -T postgres psql -U postgres -d dutchwallfort -t -c "SELECT COUNT(*) FROM rooms;" 2>/dev/null | tr -d ' ')

if [ "$ROOM_COUNT" -gt 0 ]; then
    echo "✅ Database setup complete! Found $ROOM_COUNT rooms."
    echo ""
    echo "🌐 Access your application:"
    echo "   Frontend: http://localhost:5173"
    echo "   Admin Dashboard: http://localhost:5173/admin/login"
    echo "   Backend API: http://localhost:3000"
    echo ""
    echo "🔐 Admin credentials:"
    echo "   Email: admin@dutchwallfort.com"
    echo "   Password: admin123"
else
    echo "❌ Database setup failed. Please check the logs:"
    echo "   docker-compose logs postgres"
    exit 1
fi
