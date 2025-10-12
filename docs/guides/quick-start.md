# 🚀 Quick Start Guide

**Get the Dutch Wall Fort villa management system running in 5 minutes**

---

## ⚡ Prerequisites

- **Docker & Docker Compose** installed
- **Git** for cloning the repository
- **Node.js 18+** (for local development)
- **4GB RAM** minimum, 8GB recommended

---

## 🏃‍♂️ Quick Setup (Production)

### 1. Clone & Navigate
```bash
git clone https://github.com/inamul5020/dutchwallfort.com.git
cd dutchwallfort.com
```

### 2. Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Edit with your production values
nano .env
```

### 3. Launch Application
```bash
# Start all services (database, API, frontend)
docker-compose up -d

# Check status
docker-compose ps
```

### 4. Access Application
- **Frontend**: http://localhost
- **API**: http://localhost:3000
- **Admin Panel**: http://localhost/admin

---

## 💻 Development Setup

### 1. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server && npm install && cd ..
```

### 2. Start Development Environment
```bash
# Terminal 1: Start database
docker-compose up postgres -d

# Terminal 2: Start API server
cd server && npm run dev

# Terminal 3: Start frontend
npm run dev
```

### 3. Access Development
- **Frontend**: http://localhost:5173
- **API**: http://localhost:3000
- **Database**: localhost:5432

---

## 🔐 Default Credentials

### Admin Access
- **URL**: `/admin`
- **Username**: `admin@dutchwallfort.com`
- **Password**: `admin123`

### Database
- **Host**: `localhost`
- **Port**: `5432`
- **Database**: `dutchwallfort`
- **Username**: `postgres`
- **Password**: `postgres`

---

## 🏗️ Project Structure

```
dutchwallfort.com/
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── lib/               # Utilities and API clients
│   └── assets/            # Images and static files
├── server/                # Backend Express API
│   ├── src/
│   │   ├── controllers/   # API route handlers
│   │   ├── routes/        # API endpoints
│   │   └── middleware/    # Express middleware
│   └── package.json
├── database/              # PostgreSQL schema and seeds
├── docs/                  # Documentation
└── docker-compose.yml     # Container orchestration
```

---

## 🎯 Key Features

### ✅ **Villa Management**
- Room types: Deluxe Family, Superior, Standard, Full Villa
- Dynamic pricing and availability
- Image galleries and descriptions

### ✅ **Booking System**
- Professional booking inquiry form
- Email notifications (SMTP ready)
- Mobile-responsive design

### ✅ **Admin Dashboard**
- Complete CRUD operations
- User authentication (JWT)
- Real-time data management

---

## 🔧 Common Commands

```bash
# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Rebuild containers
docker-compose up --build

# Stop everything
docker-compose down

# Reset database
docker-compose down -v && docker-compose up -d
```

---

## 🐛 Troubleshooting

### Port Conflicts
```bash
# Check what's using ports
lsof -i :3000
lsof -i :5432

# Stop conflicting services or change ports in docker-compose.yml
```

### Database Issues
```bash
# Reset database completely
docker-compose down -v
docker-compose up postgres -d

# Wait for database to be ready, then start API
docker-compose up api
```

### Build Issues
```bash
# Clear Docker cache
docker system prune -f

# Rebuild without cache
docker-compose build --no-cache
```

---

## 📚 Next Steps

1. **[Complete Setup Guide](../setup-guide.md)** - Detailed configuration
2. **[API Documentation](../../technical/API.md)** - Backend integration
3. **[Deployment Guide](../../deployment/)** - Production deployment
4. **[Contributing Guide](../contributing.md)** - Development workflow

---

## 📞 Support

- **📧 Email:** admin@dutchwallfort.com
- **🐛 Issues:** https://github.com/inamul5020/dutchwallfort.com/issues
- **📖 Documentation:** [Full Documentation](../../README.md)

---

**🚀 Happy coding!** Built with ❤️ for Dutch Wall Fort villa.
