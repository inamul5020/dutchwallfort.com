# 🚀 Deployment Documentation

This directory contains deployment guides and configuration files for the Dutch Wall Fort project.

## Contents

- **README.md** - This file (deployment overview)
- **production-deployment.md** - Complete Laravel production deployment guide

## Deployment Status

- **Development**: ✅ **Active** (localhost:8000 + localhost:5175)
- **Staging**: ⏳ **Pending** (not yet configured)
- **Production**: ✅ **Ready** (dutchwallfort.com configuration complete)

## Quick Start

### Development Environment
```bash
# Backend (Laravel)
cd admin-panel
php artisan serve --host=0.0.0.0 --port=8000

# Frontend (React)
cd ../
VITE_API_URL=http://localhost:8000 npm run dev
```

### Production Deployment
See **production-deployment.md** for complete guide including:
- Domain configuration (dutchwallfort.com)
- **Separate Image Management**: Header and gallery image fields
- **Organized Image Structure**: bedroom1, bedroom2, bedroom3, bedroom4 image sets
- Environment variables
- Web server configuration
- Security optimizations

---

**Last Updated**: October 9, 2025

---

## 🐳 Docker Compose Deployment

### **Prerequisites**
```bash
# Server requirements
- Ubuntu 20.04+ or CentOS 7+
- 2GB RAM minimum, 4GB recommended
- 20GB storage minimum
- Domain name with DNS configured
- SSL certificate (Let's Encrypt recommended)
```

### **Server Setup**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Nginx (reverse proxy)
sudo apt install nginx -y

# Install Certbot (SSL)
sudo apt install certbot python3-certbot-nginx -y
```

### **Environment Configuration**

Before deployment, configure your environment variables:

```bash
# Clone repository
git clone https://github.com/inamul5020/dutchwallfort.com.git
cd dutchwallfort.com

# Create and configure environment file
cp .env.example .env
nano .env  # Configure production settings

# Required production environment variables:
# POSTGRES_USER=your_db_user
# POSTGRES_PASSWORD=your_secure_db_password
# POSTGRES_DB=dutchwallfort
# NODE_ENV=production
# PORT=3000
# DATABASE_URL=postgresql://user:password@host:port/database
# JWT_SECRET=your_production_jwt_secret
# SESSION_SECRET=your_production_session_secret
# VITE_API_URL=https://your-api-domain.com
```

### **Application Deployment**

```bash
# For development (uses docker-compose.yml)
docker-compose up -d

# For production (uses docker-compose.prod.yml)
docker-compose -f docker-compose.prod.yml up -d

# Check deployment status
docker-compose ps

# Check API health
curl http://localhost:3000/api/health

# Check frontend
curl http://localhost
```

### **Coolify Deployment**

For Coolify self-hosting platform:

1. **Connect Repository**: Add `https://github.com/inamul5020/dutchwallfort.com.git`
2. **Environment Variables**: Set production secrets in Coolify dashboard
3. **Docker Compose File**: Use `coolify-compose.yml` (simplified for Coolify)
4. **Alternative**: Use `docker-compose.prod.yml` if Coolify supports custom dockerfiles
5. **Domain Configuration**: Configure your domain in Coolify
6. **SSL**: Enable automatic SSL certificate generation

#### **Environment Variables for Coolify:**
```bash
# Database
POSTGRES_USER=dutchwallfort_user
POSTGRES_PASSWORD=your_secure_password_here
POSTGRES_DB=dutchwallfort

# API
NODE_ENV=production
DATABASE_URL=postgresql://dutchwallfort_user:your_secure_password_here@postgres:5432/dutchwallfort
JWT_SECRET=your_production_jwt_secret_min_32_chars_please
SESSION_SECRET=your_production_session_secret_min_32_chars_please

# Frontend (automatically set to http://api:3000 for internal communication)
# VITE_API_URL is handled internally in coolify-compose.yml
```

#### **Troubleshooting Coolify Issues:**
- If getting `vite: not found` errors, ensure Coolify is using production Dockerfiles
- If `package.json` not found, check build context is set to repository root
- If getting `port is already allocated` errors, the `coolify-compose.yml` uses `expose` instead of `ports` for Coolify's reverse proxy
- Use `coolify-compose.yml` for simplest deployment - it doesn't bind external ports
- Ensure environment variables are set in Coolify dashboard, not in the compose file

### **SSL Configuration**
```bash
# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Configure Nginx for SSL
sudo nano /etc/nginx/sites-available/dutchwallfort

# Nginx configuration
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}

# Enable site
sudo ln -s /etc/nginx/sites-available/dutchwallfort /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 📊 Monitoring & Maintenance

### **Application Monitoring**
```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs -f web
docker-compose logs -f api
docker-compose logs -f db

# Monitor resource usage
docker stats

# Health check
curl https://yourdomain.com/api/health
```

### **Database Maintenance**
```bash
# Backup database
docker-compose exec db pg_dump -U admin dutchwallfort > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore database
docker-compose exec -T db psql -U admin dutchwallfort < backup.sql

# Database maintenance
docker-compose exec db psql -U admin dutchwallfort -c "VACUUM ANALYZE;"

# Monitor database performance
docker-compose exec db psql -U admin dutchwallfort -c "SELECT * FROM pg_stat_activity;"
```

### **SSL Certificate Renewal**
```bash
# Check certificate expiry
sudo certbot certificates

# Renew certificates
sudo certbot renew

# Test renewal
sudo certbot renew --dry-run
```

## 🔄 Update Procedures

### **Application Updates**
```bash
# Pull latest changes
git pull origin main

# Build new images
docker-compose build --no-cache

# Deploy updates (zero-downtime)
docker-compose up -d

# Verify deployment
curl https://yourdomain.com/api/health

# Clean up old images
docker image prune -f
```

### **Database Migrations**
```bash
# Create migration file
# database/migrations/001_add_new_table.sql

# Apply migration
docker-compose exec db psql -U admin dutchwallfort -f database/migrations/001_add_new_table.sql

# Verify migration
docker-compose exec db psql -U admin dutchwallfort -c "SELECT * FROM new_table LIMIT 1;"
```

## 🚨 Backup Strategy

### **Automated Backups**
```bash
# Create backup script
cat > /opt/dutchwallfort/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/opt/dutchwallfort/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Database backup
docker-compose exec db pg_dump -U admin dutchwallfort > $BACKUP_DIR/db_$DATE.sql

# Application data backup
tar -czf $BACKUP_DIR/app_$DATE.tar.gz -C /opt/dutchwallfort dutchwallfort.com

# Keep only last 7 days
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

chmod +x /opt/dutchwallfort/backup.sh
```

### **Backup Scheduling**
```bash
# Add to crontab for daily backups
crontab -e

# Add this line for daily 2 AM backup
0 2 * * * /opt/dutchwallfort/backup.sh
```

### **Backup Verification**
```bash
# List backups
ls -la /opt/dutchwallfort/backups/

# Verify database backup
head -20 /opt/dutchwallfort/backups/db_latest.sql

# Test restore (on staging)
docker-compose exec db psql -U admin dutchwallfort_test < backup.sql
```

## 📈 Scaling Strategies

### **Vertical Scaling**
```bash
# Increase container resources
# docker-compose.yml
services:
  api:
    deploy:
      resources:
        limits:
          memory: 1G
          cpus: '1.0'
        reservations:
          memory: 512M
          cpus: '0.5'
```

### **Horizontal Scaling with Docker Compose**
```yaml
# docker-compose.scale.yml
services:
  api:
    scale: 3
  web:
    scale: 2

# Load balancer configuration
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - api
```

### **Database Scaling**
```yaml
# Read replica configuration
services:
  db:
    # Primary database
  db-replica:
    image: postgres:16
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password
      POSTGRES_DB: dutchwallfort
    command: ["postgres", "-c", "hot_standby=on"]
    volumes:
      - ./database/replica-init.sql:/docker-entrypoint-initdb.d/replica-init.sql
```

## 🔒 Security Hardening

### **Server Security**
```bash
# Disable root login
sudo sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config

# Install fail2ban
sudo apt install fail2ban -y

# Configure firewall
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'

# Security updates
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

### **Application Security**
```javascript
// Security headers middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);
```

### **Database Security**
```sql
-- Create limited user for application
CREATE USER app_user WITH PASSWORD 'secure_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO app_user;

-- Revoke public access
REVOKE ALL ON DATABASE dutchwallfort FROM PUBLIC;
GRANT CONNECT ON DATABASE dutchwallfort TO app_user;
```

## 🚨 Disaster Recovery

### **Emergency Procedures**
```bash
# Quick restart
docker-compose restart

# Full system restart
docker-compose down
docker-compose up -d

# Emergency backup
docker-compose exec db pg_dump -U admin dutchwallfort > emergency_backup_$(date +%Y%m%d_%H%M%S).sql
```

### **Recovery Scenarios**

#### **Application Failure**
1. Check container status: `docker-compose ps`
2. View logs: `docker-compose logs api`
3. Restart service: `docker-compose restart api`
4. If restart fails, rebuild: `docker-compose up -d --build api`

#### **Database Failure**
1. Check database status: `docker-compose exec db pg_isready`
2. Restart database: `docker-compose restart db`
3. If corruption suspected, restore from backup
4. Verify data integrity after restore

#### **Server Failure**
1. Access backup server (if available)
2. Restore from latest backup
3. Update DNS to point to backup server
4. Notify stakeholders of downtime

## 📊 Performance Optimization

### **Application Performance**
```bash
# Enable gzip compression
# nginx.conf
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss;

# Cache static assets
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### **Database Performance**
```sql
-- Create indexes for better performance
CREATE INDEX idx_bookings_check_in ON bookings(check_in_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_email ON bookings(email);

-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM bookings WHERE status = 'pending';

-- Optimize autovacuum settings
ALTER SYSTEM SET autovacuum_vacuum_scale_factor = 0.02;
ALTER SYSTEM SET autovacuum_analyze_scale_factor = 0.01;
```

### **Monitoring Performance**
```bash
# Monitor application performance
npm install -g clinic
clinic doctor -- node server/src/index.js

# Database performance monitoring
docker-compose exec db psql -U admin dutchwallfort -c "SELECT * FROM pg_stat_user_tables;"

# System resource monitoring
htop
iotop
nload
```

## 🌐 Multi-Environment Setup

### **Development Environment**
```yaml
# docker-compose.dev.yml
version: '3.8'
services:
  db:
    environment:
      POSTGRES_DB: dutchwallfort_dev
  api:
    environment:
      NODE_ENV: development
      DATABASE_URL: postgresql://admin:password@db:5432/dutchwallfort_dev
    volumes:
      - .:/app
      - /app/node_modules
```

### **Staging Environment**
```yaml
# docker-compose.staging.yml
version: '3.8'
services:
  db:
    environment:
      POSTGRES_DB: dutchwallfort_staging
  api:
    environment:
      NODE_ENV: staging
      DATABASE_URL: postgresql://admin:password@db:5432/dutchwallfort_staging
```

### **Production Environment**
```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  db:
    environment:
      POSTGRES_DB: dutchwallfort
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - db_data:/var/lib/postgresql/data
      - ./database/init:/docker-entrypoint-initdb.d
  api:
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://admin:${DB_PASSWORD}@db:5432/dutchwallfort
    restart: unless-stopped
```

## 📞 Support & Troubleshooting

### **Common Issues & Solutions**

#### **Application Won't Start**
```bash
# Check logs
docker-compose logs api

# Check environment variables
docker-compose exec api env

# Check database connection
docker-compose exec api nc -z db 5432
```

#### **Slow Performance**
```bash
# Check resource usage
docker stats

# Check database connections
docker-compose exec db psql -U admin dutchwallfort -c "SELECT count(*) FROM pg_stat_activity;"

# Optimize database
docker-compose exec db psql -U admin dutchwallfort -c "VACUUM ANALYZE;"
```

#### **SSL Certificate Issues**
```bash
# Check certificate status
sudo certbot certificates

# Renew certificate
sudo certbot renew --cert-name yourdomain.com

# Test SSL configuration
openssl s_client -connect yourdomain.com:443
```

### **Getting Help**
1. **Documentation**: Check this deployment guide first
2. **Logs**: Review application and system logs
3. **Community**: Search GitHub issues for similar problems
4. **Support**: Contact admin@dutchwallfort.com for assistance

---

**Deployment Guide Version**: 1.0.0
**Last Updated**: October 2, 2025
**Supported Platforms**: Linux (Ubuntu/CentOS), Docker, Cloud Hosting
**Production Ready**: ✅ **Fully Deployed and Tested**
