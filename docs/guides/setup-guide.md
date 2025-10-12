# 🚀 Setup Guide

Complete installation and configuration guide for the Dutch Wall Fort Boutique Villa Management System.

## 📋 Prerequisites

### **System Requirements**
- **Operating System**: Linux, macOS, or Windows (with WSL2)
- **Node.js**: Version 18.0 or higher
- **Docker**: Version 20.10 or higher
- **Docker Compose**: Version 2.0 or higher
- **Git**: Version 2.30 or higher
- **RAM**: Minimum 4GB (8GB recommended)
- **Storage**: 2GB free space

### **Required Software**
```bash
# Check versions
node --version      # Should be 18.0+
npm --version       # Should be 9.0+
docker --version    # Should be 20.10+
docker-compose --version  # Should be 2.0+
git --version       # Should be 2.30+
```

## 🛠️ Installation Methods

### **Method 1: Docker (Recommended)**

#### **1. Clone the Repository**
```bash
git clone https://github.com/inamul5020/dutchwallfort.com.git
cd dutchwallfort.com
```

#### **2. Environment Configuration**
```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env
```

**Required Environment Variables:**
```env
# Database Configuration
POSTGRES_DB=dutchwallfort
POSTGRES_USER=admin
POSTGRES_PASSWORD=your_secure_password

# JWT Secret (generate a random string)
JWT_SECRET=your_jwt_secret_key_here

# Email Configuration (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Admin Credentials
ADMIN_EMAIL=admin@dutchwallfort.com
ADMIN_PASSWORD=your_admin_password
```

#### **3. Start the Application**
```bash
# Build and start all services
docker-compose up -d

# Check if services are running
docker-compose ps
```

#### **4. Database Setup**
```bash
# Access database container
docker-compose exec db psql -U admin -d dutchwallfort

# Run seed data (inside container)
\i /docker-entrypoint-initdb.d/02-seed.sql
```

#### **5. Verify Installation**
```bash
# Check application health
curl http://localhost:3000/api/health

# Check frontend
curl http://localhost:5173
```

### **Method 2: Local Development**

#### **1. Backend Setup**
```bash
# Install backend dependencies
cd server
npm install

# Copy environment file
cp .env.example .env
# Edit .env with your configuration

# Start PostgreSQL (using Docker)
docker run --name postgres-dwf -e POSTGRES_DB=dutchwallfort -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:16

# Run database migrations
npm run db:init

# Start backend server
npm run dev
```

#### **2. Frontend Setup**
```bash
# Install frontend dependencies
npm install

# Start development server
npm run dev
```

## ⚙️ Configuration

### **Environment Variables**

#### **Database Configuration**
```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=dutchwallfort
POSTGRES_USER=admin
POSTGRES_PASSWORD=your_secure_password
DATABASE_URL=postgresql://admin:password@localhost:5432/dutchwallfort
```

#### **Authentication**
```env
JWT_SECRET=your_256_bit_secret_key_here
JWT_EXPIRES_IN=24h
BCRYPT_ROUNDS=12
```

#### **Email Configuration**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FROM_EMAIL=noreply@dutchwallfort.com
FROM_NAME=Dutch Wall Fort
```

#### **Admin Configuration**
```env
ADMIN_EMAIL=admin@dutchwallfort.com
ADMIN_PASSWORD=your_secure_admin_password
```

### **Database Schema**

The application includes two main SQL files:
- `database/init/01-schema.sql` - Database schema and tables
- `database/init/02-seed.sql` - Sample data for testing

## 🚀 Running the Application

### **Development Mode**
```bash
# Start all services
docker-compose up

# Or run individually
npm run dev        # Frontend
cd server && npm run dev  # Backend
```

### **Production Mode**
```bash
# Build and start production
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Check logs
docker-compose logs -f
```

## 🔍 Verification Steps

### **1. Database Connection**
```bash
# Test database connection
docker-compose exec db psql -U admin -d dutchwallfort -c "SELECT COUNT(*) FROM rooms;"

# Expected output: count > 0
```

### **2. API Endpoints**
```bash
# Test API health
curl http://localhost:3000/api/health

# Test rooms endpoint
curl http://localhost:3000/api/rooms

# Test bookings endpoint (requires auth)
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:3000/api/bookings
```

### **3. Frontend Access**
```bash
# Open browser to
http://localhost:5173

# Test admin login
# Email: admin@dutchwallfort.com
# Password: (as configured in .env)
```

## 🐛 Troubleshooting

### **Common Issues**

#### **Port Already in Use**
```bash
# Find process using port
lsof -i :3000
lsof -i :5173
lsof -i :5432

# Kill process
kill -9 <PID>

# Or change ports in docker-compose.yml
```

#### **Database Connection Failed**
```bash
# Check if PostgreSQL is running
docker-compose ps

# Restart database
docker-compose restart db

# Check logs
docker-compose logs db
```

#### **Build Failures**
```bash
# Clear Docker cache
docker system prune -f

# Rebuild without cache
docker-compose build --no-cache

# Check build logs
docker-compose build --progress=plain
```

#### **Permission Issues**
```bash
# Fix file permissions
sudo chown -R $USER:$USER .

# Fix Docker permissions
sudo chmod 666 /var/run/docker.sock
```

### **Error Logs**
```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs web
docker-compose logs api
docker-compose logs db

# Follow logs in real-time
docker-compose logs -f
```

## 📊 Performance Tuning

### **Database Optimization**
```sql
-- Create indexes for better performance
CREATE INDEX idx_bookings_check_in ON bookings(check_in_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_rooms_type ON rooms(type);
```

### **Docker Resource Limits**
```yaml
# In docker-compose.yml
services:
  api:
    deploy:
      resources:
        limits:
          memory: 512M
        reservations:
          memory: 256M
```

## 🔒 Security Checklist

- [ ] Change default admin password
- [ ] Use strong JWT secret key
- [ ] Configure HTTPS in production
- [ ] Set up firewall rules
- [ ] Regular security updates
- [ ] Database backups configured
- [ ] Environment variables secured

## 📞 Support

### **Getting Help**
1. Check this documentation first
2. Review error logs: `docker-compose logs`
3. Check GitHub issues
4. Contact: admin@dutchwallfort.com

### **Debug Mode**
```bash
# Enable debug logging
export DEBUG=*
npm run dev

# Or in Docker
docker-compose up --scale api=1 --scale web=1
```

---

**Last Updated**: October 2, 2025
**Version**: 1.0.0
**Status**: ✅ **Complete Setup Guide**
