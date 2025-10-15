# Dutch Wall Fort - Coolify Deployment Guide

This guide will help you deploy the Dutch Wall Fort application on Coolify using Docker Compose.

## 🚀 Quick Deployment

### 1. Repository Setup
- Fork or clone this repository
- Ensure all files are committed and pushed to your Git repository

### 2. Coolify Configuration

#### Create New Project in Coolify:
1. **Project Type**: Docker Compose
2. **Repository**: Your Git repository URL
3. **Docker Compose File**: `docker-compose.prod.yml`
4. **Environment**: Production

#### Environment Variables:
Set these environment variables in Coolify:

```bash
# Database
POSTGRES_PASSWORD=your_secure_database_password_here

# JWT Security
JWT_SECRET=your_super_secure_jwt_secret_here

# Email Configuration
MAILJET_API_KEY=your_mailjet_api_key
MAILJET_SECRET_KEY=your_mailjet_secret_key
MAILJET_FROM_EMAIL=support@dutchwallfort.com
ADMIN_EMAIL=inamul5020@gmail.com

# URLs (update with your domain)
VITE_API_URL=https://api.yourdomain.com
FRONTEND_URL=https://yourdomain.com
```

### 3. Domain Configuration

#### Frontend Domain:
- **Domain**: `yourdomain.com` or `www.yourdomain.com`
- **Port**: 3001
- **Service**: frontend

#### Backend API Domain:
- **Domain**: `api.yourdomain.com`
- **Port**: 3000
- **Service**: backend

### 4. SSL Certificates
- Enable SSL in Coolify for both domains
- Coolify will automatically generate Let's Encrypt certificates

## 📋 Services Overview

### Frontend Service
- **Port**: 3001 (internal), 80 (nginx)
- **Technology**: React + Vite + Nginx
- **Features**: 
  - Client-side routing
  - Static asset caching
  - Gzip compression
  - Security headers

### Backend Service
- **Port**: 3000
- **Technology**: Next.js + Prisma + PostgreSQL
- **Features**:
  - REST API endpoints
  - Database management
  - Email notifications
  - Authentication

### Database Service
- **Port**: 5432 (internal)
- **Technology**: PostgreSQL 16
- **Features**:
  - Persistent data storage
  - Health checks
  - Automatic backups (via Coolify)

## 🔧 Configuration Details

### Docker Compose Structure:
```yaml
services:
  postgres:     # Database
  backend:      # API Server
  frontend:     # Web Application
```

### Health Checks:
- **Backend**: `http://backend:3000/api/health`
- **Frontend**: `http://frontend/health`
- **Database**: PostgreSQL connection check

### Networking:
- All services communicate via internal Docker network
- External access only through configured domains

## 🛠️ Maintenance

### Database Migrations:
The application automatically runs database migrations on startup.

### Logs:
- View logs in Coolify dashboard
- Backend logs: API requests, database operations
- Frontend logs: Nginx access logs

### Updates:
1. Push changes to your Git repository
2. Coolify will automatically rebuild and redeploy
3. Zero-downtime deployment with health checks

## 🔒 Security Features

### Backend Security:
- JWT authentication
- CORS configuration
- Input validation
- Rate limiting
- SQL injection protection (Prisma)

### Frontend Security:
- Content Security Policy headers
- XSS protection
- Clickjacking protection
- Secure headers

### Database Security:
- Password-protected PostgreSQL
- Internal network only
- Regular backups

## 📊 Monitoring

### Health Endpoints:
- **Backend**: `https://api.yourdomain.com/api/health`
- **Frontend**: `https://yourdomain.com/health`

### Coolify Monitoring:
- Resource usage
- Container health
- Log aggregation
- Performance metrics

## 🚨 Troubleshooting

### Common Issues:

1. **Database Connection Failed**:
   - Check `DATABASE_URL` environment variable
   - Verify PostgreSQL service is running
   - Check database password

2. **Frontend Not Loading**:
   - Check `VITE_API_URL` environment variable
   - Verify backend service is accessible
   - Check domain configuration

3. **Email Not Working**:
   - Verify Mailjet API keys
   - Check `ADMIN_EMAIL` configuration
   - Review backend logs for email errors

4. **Build Failures**:
   - Check Docker build logs
   - Verify all dependencies are installed
   - Check for TypeScript errors

### Debug Commands:
```bash
# Check service status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs [service_name]

# Restart service
docker-compose -f docker-compose.prod.yml restart [service_name]
```

## 📈 Performance Optimization

### Frontend:
- Static asset caching (1 year)
- Gzip compression
- Optimized bundle size
- CDN-ready static files

### Backend:
- Prisma connection pooling
- Optimized database queries
- Caching headers
- Production Next.js build

### Database:
- PostgreSQL 16 with performance optimizations
- Automatic connection pooling
- Query optimization

## 🔄 Backup & Recovery

### Database Backups:
- Coolify handles automatic PostgreSQL backups
- Manual backup: `pg_dump` command
- Restore: `psql` command

### Application Backups:
- Git repository serves as code backup
- Environment variables stored in Coolify
- Docker images cached for quick recovery

## 📞 Support

For deployment issues:
1. Check Coolify logs
2. Review this documentation
3. Check GitHub issues
4. Contact support team

---

**Deployment Status**: ✅ Ready for Production
**Last Updated**: 2024
**Version**: 3.0.0
