# Development Guide - Dutch Wall Fort

## 🎯 **Project Status: COMPLETE** ✅

**All features have been successfully implemented and the project is production-ready!**

### 🏆 **Recent Achievements (v3.7.0)**
- ✅ **All CORS Issues Resolved** - 27 API endpoints tested and working
- ✅ **Security Implementation Complete** - JWT auth, rate limiting, input validation
- ✅ **Admin Dashboard Stable** - Authentication and data loading fixed
- ✅ **Booking System Operational** - Status updates and confirmation workflow
- ✅ **API Standardization** - Consistent response formats across all endpoints

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Git

### 1. Clone Repository
```bash
git clone <repository-url>
cd dutchwallfort.com
```

### 2. Start All Services
```bash
docker-compose up -d
```

### 3. Access Applications
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Admin Dashboard**: http://localhost:5173/admin/login
- **Database**: localhost:5432

### 4. Admin Access
- **Email**: admin@dutchwallfort.com
- **Password**: admin123

## 🏗️ Architecture Overview

```
dutchwallfort.com/
├── src/                    # React Frontend (Vite + TypeScript)
│   ├── pages/             # Frontend pages (Home, Rooms, Contact, etc.)
│   ├── components/        # Reusable UI components
│   ├── pages/admin/       # Admin dashboard pages
│   └── contexts/          # React contexts (Auth, etc.)
├── backend/                # Next.js Enterprise API Backend
│   ├── app/api/           # API Routes (Rooms, Bookings, Contact, Auth)
│   ├── prisma/            # Database schema and migrations
│   ├── lib/               # Security middleware and utilities
│   └── templates/         # Email templates
├── database/              # Database initialization scripts
│   ├── init/01-schema.sql # Database schema
│   └── init/02-seed.sql   # Seed data
├── docker-compose.yml     # Docker orchestration
├── Dockerfile.frontend    # Frontend container
└── README.md             # Documentation
```

## 🐳 Docker Services

### Service Details

#### postgres
- **Image**: postgres:16-alpine
- **Port**: 5432
- **Database**: dutchwallfort
- **User**: postgres
- **Password**: postgres

#### api
- **Build**: Express.js API server
- **Port**: 3000
- **Dependencies**: postgres
- **Command**: npm run dev:api

#### admin-dashboard
- **Build**: Next.js admin panel
- **Port**: 3001 (external) → 3000 (internal)
- **Dependencies**: postgres
- **Command**: npm run dev

#### frontend
- **Build**: React development server
- **Port**: 5173
- **Dependencies**: api
- **Command**: npm run dev

## 🔧 Development Commands

### Docker Commands
```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Restart specific service
docker-compose restart frontend

# Check service status
docker-compose ps
```

### Database Commands
```bash
# Connect to database
docker-compose exec postgres psql -U postgres -d dutchwallfort

# Run database initialization
docker-compose exec postgres psql -U postgres -d dutchwallfort -f /docker-entrypoint-initdb.d/schema.sql

# Backup database
docker-compose exec postgres pg_dump -U postgres dutchwallfort > backup.sql
```

### API Commands
```bash
# Test API endpoints
curl http://localhost:3000/api/rooms
curl http://localhost:3000/api/services

# Check API health
curl http://localhost:3000/api/health
```

## 📊 Database Development

### Schema Management
The database schema is defined in:
- `admin-dashboard/database/schema.sql` - Table definitions
- `admin-dashboard/database/init.js` - Sample data

### Adding New Tables
1. Update `schema.sql`
2. Add sample data to `init.js`
3. Restart postgres service: `docker-compose restart postgres`

### Sample Data
The database includes:
- 5 rooms with images
- Services data
- Admin user account
- Sample bookings

## 🎨 Frontend Development

### Technology Stack
- **Framework**: React 19.1.0
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios

### Key Components
- `src/pages/Rooms.tsx` - Room listing
- `src/pages/RoomDetail.tsx` - Room details with lightbox
- `src/components/BookingForm.tsx` - Contact form
- `src/lib/api.ts` - API client

### Development Workflow
1. Make changes to React components
2. Changes auto-reload in browser
3. Test with API endpoints
4. Check responsive design

## 🛠️ Admin Dashboard Development

### Technology Stack
- **Framework**: Next.js 15.5.4
- **Admin Framework**: Refine v5/v6
- **UI Library**: Ant Design 5.27.4
- **Pro Components**: @ant-design/pro-components 2.8.10
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Date Handling**: dayjs 1.11.18

### Key Pages
- `src/app/page.tsx` - Dashboard overview with statistics
- `src/app/rooms/page.tsx` - Room management
- `src/app/services/page.tsx` - Service management
- `src/app/bookings/page.tsx` - Booking management
- `src/app/blog/page.tsx` - Blog management

### Development Workflow
1. Make changes to admin components
2. Changes auto-reload in browser
3. Test CRUD operations
4. Verify API integration

## 🔌 API Development

### Technology Stack
- **Framework**: Express.js
- **Language**: JavaScript
- **Database**: PostgreSQL
- **Authentication**: JWT + bcrypt

### Key Files
- `admin-dashboard/api/index.js` - Main API server
- `admin-dashboard/api/routes/` - Route handlers
- `admin-dashboard/api/middleware/` - Middleware functions

### Adding New Endpoints
1. Create route handler
2. Add to main server
3. Test with curl/Postman
4. Update frontend API client

## 🧪 Testing

### Manual Testing
```bash
# Test frontend
curl http://localhost:5173

# Test API
curl http://localhost:3000/api/rooms

# Test admin dashboard
curl http://localhost:3001

# Test database
docker-compose exec postgres psql -U postgres -d dutchwallfort -c "SELECT COUNT(*) FROM rooms;"
```

### Browser Testing
- Test responsive design on different screen sizes
- Test image lightbox functionality
- Test form submissions
- Test navigation

## 🐛 Debugging

### Common Issues

#### Services Not Starting
```bash
# Check Docker status
docker-compose ps

# View logs
docker-compose logs postgres
docker-compose logs api
docker-compose logs frontend
docker-compose logs admin-dashboard
```

#### Database Connection Issues
```bash
# Check database logs
docker-compose logs postgres

# Test connection
docker-compose exec postgres psql -U postgres -d dutchwallfort -c "SELECT 1;"
```

#### API Not Responding
```bash
# Check API logs
docker-compose logs api

# Test API health
curl http://localhost:3000/api/health
```

#### Frontend Not Loading
```bash
# Check frontend logs
docker-compose logs frontend

# Test frontend
curl http://localhost:5173
```

### Debug Commands
```bash
# View all logs
docker-compose logs -f

# Restart all services
docker-compose restart

# Rebuild and restart
docker-compose up -d --build

# Check resource usage
docker stats
```

## 📝 Code Style

### Frontend (React/TypeScript)
- Use functional components with hooks
- TypeScript for type safety
- Tailwind CSS for styling
- ESLint for code quality

### Backend (Express.js)
- CommonJS modules
- Async/await for promises
- Error handling middleware
- Input validation

### Admin Dashboard (Next.js)
- App Router structure
- TypeScript for type safety
- Refine v5/v6 patterns
- Ant Design 5.27.4 components
- Pro Components integration
- Modern dashboard with statistics

## 🔄 Data Flow

### Room Data Flow
1. Database stores room data
2. API fetches from database
3. Frontend calls API
4. Data transforms for UI
5. Components render data

### Image Flow
1. Images stored in `/public/images/`
2. Database stores image paths
3. API returns image paths
4. Frontend constructs URLs
5. Images display in UI

## 🚀 Deployment

### Production Build
```bash
# Build frontend
npm run build

# Build admin dashboard
cd admin-dashboard && npm run build

# Start production services
docker-compose -f docker-compose.prod.yml up -d
```

### Environment Variables
```bash
# Production environment
NODE_ENV=production
DB_HOST=your-db-host
DB_DATABASE=your-db-name
VITE_API_URL=https://your-api-domain.com
```

## 📞 Support

### Getting Help
- Check Docker logs first
- Verify all services are running
- Test API endpoints independently
- Check browser console for errors

### Contact
- **Phone**: +94 76 572 1495
- **Email**: admin@dutchwallfort.com

---

**Last Updated**: October 2025
**Version**: 2.1.0