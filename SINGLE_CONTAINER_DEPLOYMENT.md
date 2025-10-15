# Dutch Wall Fort - Single Container Deployment

This guide shows how to deploy the Dutch Wall Fort application using a single Docker container that runs both frontend and backend.

## 🚀 Quick Deployment Options

### Option 1: Docker Compose (Recommended)
Use `docker-compose.single.yml` for easy deployment with database.

### Option 2: Single Dockerfile
Use `Dockerfile` for direct container deployment (requires external database).

## 📦 Single Container Architecture

### What's Included:
- **Frontend**: React + Vite (served by Next.js)
- **Backend**: Next.js + Prisma + PostgreSQL client
- **Routing**: Next.js handles both API and frontend routes
- **Port**: Single port 3000 for everything

### How It Works:
1. **Frontend** is built and placed in `/public/frontend/`
2. **Next.js** serves the frontend for all non-API routes
3. **API routes** are handled by Next.js backend
4. **Database** runs in separate container (PostgreSQL)

## 🔧 Deployment Methods

### Method 1: Docker Compose (Easiest)

#### Files Needed:
- `docker-compose.single.yml`
- `Dockerfile.single`
- Environment variables

#### Deploy:
```bash
# Set environment variables
export POSTGRES_PASSWORD=your_secure_password
export JWT_SECRET=your_jwt_secret
export MAILJET_API_KEY=your_mailjet_key
export MAILJET_SECRET_KEY=your_mailjet_secret
export ADMIN_EMAIL=inamul5020@gmail.com

# Deploy with compose
docker-compose -f docker-compose.single.yml up -d
```

#### Access:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3000/api
- **Health**: http://localhost:3000/api/health

### Method 2: Direct Docker (Requires External Database)

#### Build and Run:
```bash
# Build the image
docker build -t dutchwallfort-app .

# Run with external database
docker run -d \
  --name dutchwallfort-app \
  -p 3000:3000 \
  -e DATABASE_URL=postgresql://user:pass@host:5432/db \
  -e JWT_SECRET=your_jwt_secret \
  -e MAILJET_API_KEY=your_mailjet_key \
  -e MAILJET_SECRET_KEY=your_mailjet_secret \
  -e ADMIN_EMAIL=inamul5020@gmail.com \
  dutchwallfort-app
```

### Method 3: Coolify Deployment

#### In Coolify:
1. **Project Type**: Docker Compose
2. **Compose File**: `docker-compose.single.yml`
3. **Environment Variables**: Set all required variables
4. **Port**: 3000

## 🌐 URL Structure

### Single Container Routes:
- **Frontend**: `http://yourdomain.com/` → Serves React app
- **API**: `http://yourdomain.com/api/*` → Backend API
- **Health**: `http://yourdomain.com/api/health` → Health check
- **Admin**: `http://yourdomain.com/admin` → Admin dashboard

### How Routing Works:
```javascript
// Next.js rewrites configuration
{
  source: "/api/:path*",           // API routes go to backend
  destination: "/api/:path*",
},
{
  source: "/((?!api|_next|frontend).*)",  // Everything else goes to frontend
  destination: "/frontend/index.html",
}
```

## 🔧 Environment Variables

### Required Variables:
```bash
# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# Security
JWT_SECRET=your_super_secure_jwt_secret_here

# Email (Mailjet)
MAILJET_API_KEY=your_mailjet_api_key
MAILJET_SECRET_KEY=your_mailjet_secret_key
MAILJET_FROM_EMAIL=support@dutchwallfort.com
ADMIN_EMAIL=inamul5020@gmail.com

# URLs
FRONTEND_URL=http://localhost:3000
```

## 📊 Advantages of Single Container

### ✅ Benefits:
- **Simpler Deployment**: One container to manage
- **Resource Efficient**: Lower memory usage
- **Easier Scaling**: Single container to scale
- **Simplified Networking**: No internal service communication
- **Cost Effective**: Fewer resources needed

### ⚠️ Considerations:
- **Database Dependency**: Still needs external PostgreSQL
- **Single Point of Failure**: If container fails, both services down
- **Scaling**: Can't scale frontend and backend independently

## 🛠️ Development vs Production

### Development (Current):
- **Frontend**: Vite dev server on port 5173
- **Backend**: Next.js dev server on port 3000
- **Database**: PostgreSQL on port 5432

### Production (Single Container):
- **Frontend**: Served by Next.js on port 3000
- **Backend**: Next.js API routes on port 3000
- **Database**: External PostgreSQL

## 🚀 Quick Start Commands

### Local Development:
```bash
# Start development environment
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Deployment:
```bash
# Deploy with compose
docker-compose -f docker-compose.single.yml up -d

# View logs
docker-compose -f docker-compose.single.yml logs -f

# Stop services
docker-compose -f docker-compose.single.yml down
```

### Direct Docker:
```bash
# Build image
docker build -t dutchwallfort-app .

# Run container
docker run -d --name dutchwallfort-app -p 3000:3000 dutchwallfort-app

# View logs
docker logs -f dutchwallfort-app

# Stop container
docker stop dutchwallfort-app
```

## 🔍 Troubleshooting

### Common Issues:

1. **Frontend Not Loading**:
   - Check if frontend build was successful
   - Verify Next.js rewrites configuration
   - Check browser console for errors

2. **API Not Working**:
   - Verify DATABASE_URL is correct
   - Check if database is accessible
   - Review backend logs

3. **Build Failures**:
   - Check Docker build logs
   - Verify all dependencies are installed
   - Check for TypeScript errors

### Debug Commands:
```bash
# Check container status
docker ps

# View container logs
docker logs dutchwallfort-app

# Execute shell in container
docker exec -it dutchwallfort-app sh

# Check health endpoint
curl http://localhost:3000/api/health
```

## 📈 Performance

### Optimizations:
- **Frontend**: Static files served with caching headers
- **Backend**: Prisma connection pooling
- **Build**: Multi-stage Docker build for smaller image
- **Caching**: Static assets cached for 1 year

### Resource Usage:
- **Memory**: ~200-300MB for application
- **CPU**: Low usage for typical traffic
- **Disk**: ~500MB for container image

## 🔒 Security

### Security Features:
- **CORS**: Configured for API endpoints
- **Headers**: Security headers for frontend
- **JWT**: Secure authentication tokens
- **Database**: Connection string with credentials

---

**Single Container Deployment**: ✅ Ready
**Last Updated**: 2024
**Version**: 3.0.0
