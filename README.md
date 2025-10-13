# Dutch Wall Fort - Hotel Booking Application

A modern hotel booking website with React frontend and Next.js Enterprise API backend, featuring luxury accommodation in Galle Fort, Sri Lanka.

## 🏗️ Project Architecture

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
│   └── package.json       # Backend dependencies
├── database/              # Database initialization scripts
│   ├── init/01-schema.sql # Database schema
│   └── init/02-seed.sql   # Seed data
├── docker-compose.yml     # Docker orchestration
├── Dockerfile.frontend    # Frontend container
└── README.md             # This documentation
```

## 🚀 Quick Start with Docker

### Prerequisites
- Docker & Docker Compose
- Git

### 1. Clone and Start All Services
```bash
git clone https://github.com/inamul5020/dutchwallfort.com.git
cd dutchwallfort.com
docker-compose up -d
```

### 1.1. Database Setup (Important!)
If the database appears empty, run the setup script:
```bash
./setup-database.sh
```

Or manually reset the database:
```bash
# Stop services and remove database volume
docker-compose down
docker volume rm dutchwallfortcom_postgres_data

# Start services (will recreate database with seed data)
docker-compose up -d
```

### 2. Access Applications
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Admin Dashboard**: http://localhost:5173/admin/login
- **Database**: localhost:5432

### 3. Admin Access
- **Email**: admin@dutchwallfort.com
- **Password**: admin123

## ✨ Features

### Frontend Features
- 🏠 **Room Showcase** - Beautiful room gallery with detailed descriptions
- 📅 **Booking System** - Online booking form with date selection
- 📝 **Blog System** - Content management for travel guides and updates
- ⭐ **Reviews System** - Guest reviews and ratings
- 📧 **Contact Forms** - Multiple contact options for inquiries
- 🎨 **Responsive Design** - Mobile-first design with Tailwind CSS
- 🔍 **SEO Optimized** - Meta tags and structured data

### Admin Dashboard
- 🔐 **Secure Authentication** - JWT-based login system ✅
- 🏠 **Room Management** - Add, edit, delete rooms with images ✅
- 📅 **Booking Management** - View and manage guest bookings ✅
- 📝 **Blog Management** - Create and publish blog posts ✅
- 🎯 **Services Management** - Manage tours and services ✅
- 📧 **Message Management** - Handle contact form submissions ✅
- 📊 **Dashboard Overview** - Statistics and quick actions ✅
- 🔄 **Real-time Sync** - Live data synchronization with frontend

### Backend Features
- 🚀 **Next.js Enterprise** - Production-ready API framework
- 🗄️ **PostgreSQL Database** - Robust data storage with Prisma ORM
- 🔒 **Authentication** - Secure JWT token-based auth
- 🐳 **Docker Support** - Containerized development and deployment
- 📡 **RESTful APIs** - Complete CRUD operations for all entities
- 🔄 **CORS Support** - Cross-origin resource sharing configured
- 📝 **Type Safety** - Full TypeScript implementation

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login with JWT token

### Rooms Management
- `GET /api/rooms` - List all active rooms
- `GET /api/rooms/[slug]` - Get specific room by slug
- `GET /api/rooms/by-id/[id]` - Get specific room by ID (Admin)
- `POST /api/rooms` - Create new room (Admin)
- `PUT /api/rooms/by-id/[id]` - Update room by ID (Admin)
- `DELETE /api/rooms/by-id/[id]` - Delete room by ID (Admin)

### Services Management
- `GET /api/services` - List all active services
- `POST /api/services` - Create new service (Admin)

### Bookings Management
- `GET /api/bookings` - List all bookings (Admin)
- `POST /api/bookings` - Create new booking

### Blog Management
- `GET /api/blog` - List all blog posts
- `POST /api/blog` - Create new blog post (Admin)

### Reviews Management
- `GET /api/reviews` - List approved reviews
- `POST /api/reviews` - Create new review

### Testimonials Management
- `GET /api/testimonials` - List all testimonials
- `GET /api/testimonials?featured=true` - List featured testimonials
- `GET /api/testimonials?approved=true` - List approved testimonials
- `POST /api/testimonials` - Create new testimonial

### File Upload
- `POST /api/upload` - Upload images (supports JPEG, PNG, WebP up to 5MB)

### Contact Management
- `GET /api/contact` - List all messages (Admin)
- `POST /api/contact` - Create new message

### Health Check
- `GET /api/health` - API health status

## 📊 Database Schema

### Rooms Table
```sql
CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    short_description TEXT NOT NULL,
    long_description TEXT NOT NULL,
    capacity INTEGER NOT NULL,
    beds VARCHAR(255) NOT NULL,
    amenities JSONB DEFAULT '[]',
    price DECIMAL(10,2) NOT NULL,
    images JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Sample Data
The database is populated with 4 rooms:

1. **Deluxe Family Room** - 4 guests, LKR 15,000
   - Images: bedroom1_1.jpg, bedroom1_2.jpg, bedroom1_3.jpg

2. **Superior Room** - 3 guests, LKR 12,000
   - Images: bedroom2_1.jpg, bedroom2_2.jpg, bedroom2_3.jpg

3. **Standard Room** - 2 guests, LKR 9,000
   - Images: bedroom3_1.jpg, bedroom3_2.jpg

4. **Heritage Suite** - 2 guests, LKR 18,000
   - Images: bedroom4_1.jpg, bedroom4_2.jpg

## 🔧 API Endpoints

### Rooms
- `GET /api/rooms` - Get all active rooms
- `GET /api/rooms/{slug}` - Get specific room by slug

### Bookings
- `POST /api/bookings` - Create new booking

### Contact
- `POST /api/contact` - Send contact message

### Health Check
- `GET /api/health` - API health status

## 🎨 Frontend Structure

### Key Components
- **Rooms.tsx** - Room listing page with API integration
- **RoomDetail.tsx** - Individual room details with image lightbox
- **BookingForm.tsx** - Contact/booking form component
- **Header.tsx** - Navigation header with mobile menu
- **Footer.tsx** - Site footer

### Frontend Features
- **Image Lightbox**: Full-screen image viewing with navigation controls
- **Keyboard Support**: Arrow key navigation and ESC to close
- **Click Outside to Close**: Intuitive lightbox closing
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dynamic Image Paths**: Handles different API image formats
- **Error Handling**: Loading states and error messages
- **Booking Integration**: Contact form with API submission

### Data Flow
1. Frontend fetches room data from Next.js Enterprise API
2. Data is served from PostgreSQL database via Prisma
3. Components render with real-time data
4. Room details use slug-based routing

### Routing
- `/` - Homepage
- `/rooms` - Room listing
- `/rooms/{slug}` - Room details (e.g., `/rooms/deluxe-family-room`)
- `/about` - About page
- `/contact` - Contact page

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Yup validation
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Backend
- **Framework**: Next.js 15 with App Router
- **Database**: PostgreSQL 16 with Prisma ORM
- **Validation**: Zod schemas
- **Type Safety**: TypeScript with strict configuration

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint 9
- **Type Checking**: TypeScript
- **Containerization**: Docker & Docker Compose

## 🆕 Recent Updates & Fixes

### v3.3.0 - Advanced Features & Enhanced User Experience
- ✅ **Enhanced Booking Form**: Added date validation, room capacity checking, and price estimation
- ✅ **Image Upload System**: Implemented drag-and-drop image upload with file validation
- ✅ **Testimonials System**: Added customer testimonials with rating system and featured display
- ✅ **Dynamic Room Loading**: Booking form now loads rooms from database with real-time pricing
- ✅ **Form Validation**: Added comprehensive validation with user-friendly error messages
- ✅ **Price Calculator**: Real-time price estimation based on selected room and dates

### v3.2.0 - Room Details Page & Complete Data Integration
- ✅ **Fixed Room Details Page**: Resolved "Room Not Found" issue on room detail pages
- ✅ **Complete Data Integration**: All room data (descriptions, amenities, gallery) now loads from database
- ✅ **API Response Handling**: Fixed frontend to correctly parse API response structure
- ✅ **CORS for Room Details**: Added CORS headers to room by slug API endpoint
- ✅ **Data Verification**: Confirmed all hardcoded room data is properly saved to database

### v3.1.0 - Admin Dashboard & API Improvements
- ✅ **Fixed Room Editing**: Resolved "Failed to load room data" issue
- ✅ **Admin Data Sync**: All admin pages now display data correctly
- ✅ **API Field Mapping**: Automatic mapping between database and frontend field formats
- ✅ **CORS Headers**: Added proper CORS support to all API endpoints
- ✅ **Sample Data**: Added sample booking data for testing
- ✅ **New API Endpoints**: Added `/api/rooms/by-id/[id]` for room operations by ID
- ✅ **Frontend Integration**: Updated frontend to use API data instead of hardcoded data

### Key Technical Improvements
- **Field Mapping**: Database `camelCase` fields automatically mapped to frontend `snake_case` expectations
- **Error Handling**: Comprehensive error handling and user feedback
- **Data Consistency**: Unified data source between frontend and admin dashboard
- **API Architecture**: RESTful APIs with proper HTTP methods and status codes

## 🛠️ Development

### Docker Development (Recommended)
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Manual Development Setup

#### Frontend Development
```bash
cd dutchwallfort.com
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

#### Backend Development
```bash
cd dutchwallfort.com/backend
npm install
npx prisma generate
npm run dev
# Backend runs on http://localhost:3000
```

#### Database Setup
```bash
# Start PostgreSQL
docker run --name postgres-dwf -e POSTGRES_DB=dutchwallfort -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:16

# Run migrations (if needed)
cd backend
npx prisma migrate dev
npx prisma db seed
```

### Environment Variables
Create `.env` file in the root directory:
```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/dutchwallfort

# JWT Secret (for production)
JWT_SECRET=your-secret-key-change-in-production

# Frontend API URL
VITE_API_URL=http://localhost:3000
```

## 🔧 Technical Specifications

### Current Versions
- **React**: 18.3.1
- **Next.js**: 15.3.3
- **TypeScript**: 5.5.3
- **Tailwind CSS**: 3.4.1
- **Prisma**: 6.17.1
- **PostgreSQL**: 16
- **Node.js**: 20+

### Next.js Enterprise Features
- **Performance**: Optimized bundle size and runtime performance
- **Type Safety**: Full TypeScript support with excellent IntelliSense
- **Scalability**: Enterprise-grade architecture and patterns
- **Developer Experience**: Excellent tooling and development workflow

## 🐳 Docker Services

### Services Overview
- **postgres**: PostgreSQL 16 database
- **backend**: Next.js Enterprise API server
- **frontend**: React development server

### Environment Variables
```yaml
# Database
POSTGRES_DB=dutchwallfort
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

# Backend
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/dutchwallfort
NODE_ENV=development

# Frontend
VITE_API_URL=http://localhost:3000
```

## 🚀 Development

### Local Development
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install

# Start database
docker-compose up postgres -d

# Start backend (in backend directory)
npm run dev

# Start frontend (in main directory)
npm run dev
```

### Database Commands (Backend)
```bash
cd backend

# Generate Prisma client
npm run db:generate

# Push schema changes
npm run db:push

# Create migration
npm run db:migrate

# Open Prisma Studio
npm run db:studio
```

## 🎯 Features

### Frontend Features
- ✅ Room listing with API data
- ✅ Room detail pages with slug routing
- ✅ Image lightbox with navigation
- ✅ Booking form integration
- ✅ Responsive design
- ✅ Dynamic image handling
- ✅ Amenity icons
- ✅ Price formatting
- ✅ Loading states and error handling
- ✅ Click outside to close functionality

### Backend Features
- ✅ Next.js Enterprise API routes
- ✅ PostgreSQL database with Prisma
- ✅ Room data management
- ✅ Booking system
- ✅ Contact form handling
- ✅ Data validation with Zod
- ✅ Type-safe database operations
- ✅ Health check endpoint

### Enterprise Features
- ✅ Next.js Enterprise boilerplate backend
- ✅ Prisma ORM for database management
- ✅ Comprehensive API structure
- ✅ Type-safe operations
- ✅ Scalable architecture
- ✅ Docker containerization

## 🐛 Troubleshooting

### Recent Fixes Applied

#### Room Editing Issues ✅ FIXED
- **Issue**: "Failed to load room data" when editing rooms
- **Solution**: Updated AdminRoomForm to use correct field mapping and API endpoints
- **Status**: ✅ Resolved in v3.1.0

#### Admin Dashboard Data Issues ✅ FIXED
- **Issue**: Blogs, services, and bookings not showing data
- **Solution**: Added proper field mapping in API responses
- **Status**: ✅ Resolved in v3.1.0

#### CORS Issues ✅ FIXED
- **Issue**: Cross-origin requests blocked by browser
- **Solution**: Added CORS headers to all API endpoints
- **Status**: ✅ Resolved in v3.1.0

### Database Issues

#### Empty Database (No Rooms/Data)
If you see no rooms or data in the admin dashboard:

1. **Quick Fix**: Run the setup script
   ```bash
   ./setup-database.sh
   ```

2. **Manual Fix**: Reset database volume
   ```bash
   docker-compose down
   docker volume rm dutchwallfortcom_postgres_data
   docker-compose up -d
   ```

3. **Verify Data**: Check if data exists
   ```bash
   docker-compose exec postgres psql -U postgres -d dutchwallfort -c "SELECT COUNT(*) FROM rooms;"
   ```

#### API Connection Issues
- Check if backend is running: `docker-compose ps`
- Test API health: `curl http://localhost:3000/api/health`
- Check logs: `docker-compose logs backend`

#### Frontend Issues
- Verify frontend is running: `docker-compose ps`
- Check API URL: `VITE_API_URL=http://localhost:3000`
- Check browser console for errors

#### Admin Dashboard Issues

##### Rooms Not Loading
If admin dashboard shows "Rooms count: 0" or empty table:

1. **Check CORS Headers**:
   ```bash
   curl -v -H "Origin: http://localhost:5173" http://localhost:3000/api/rooms
   ```
   Should show `Access-Control-Allow-Origin: *` in headers.

2. **Check API Response**:
   ```bash
   curl -s http://localhost:3000/api/rooms | head -c 200
   ```
   Should return JSON with room data.

3. **Check Browser Console**:
   - Open DevTools (F12) → Console tab
   - Look for CORS errors or network errors
   - Should see "API Response received" logs

4. **Verify Environment Variables**:
   ```bash
   docker-compose exec frontend env | grep VITE_API_URL
   ```
   Should show `VITE_API_URL=http://localhost:3000`

##### CORS Errors
If you see "Access to XMLHttpRequest blocked by CORS policy":

1. **Check Backend CORS Headers**:
   - Backend should include CORS headers in all API responses
   - OPTIONS requests should be handled for preflight

2. **Verify API Routes**:
   - All API routes should have CORS headers
   - Check `/backend/app/api/rooms/route.ts` for proper CORS setup

##### Network Errors
If you see "ERR_NAME_NOT_RESOLVED" or "ERR_FAILED":

1. **Check Port Conflicts**:
   ```bash
   ss -tlnp | grep :3000
   ```
   Should show only the backend container.

2. **Restart Services**:
   ```bash
   docker-compose down && docker-compose up -d
   ```

3. **Check Docker Network**:
   ```bash
   docker-compose exec frontend wget -qO- http://backend:3000/api/rooms
   ```
   Should work from within containers.

## 🔮 Future Enhancements

### Planned Features
- [ ] User authentication system
- [ ] Online booking system with payment integration
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Advanced search and filtering
- [ ] Calendar integration
- [ ] Review system
- [x] Admin dashboard

### Technical Improvements
- [ ] Database indexing optimization
- [ ] Caching layer implementation
- [ ] Image CDN integration
- [ ] Analytics integration
- [ ] Performance monitoring
- [ ] Error tracking

## 📞 Support

### Contact Information
- **Phone**: +94 76 572 1495
- **WhatsApp**: +94 76 572 1495
- **Email**: admin@dutchwallfort.com

### Technical Support
- Check Docker logs: `docker-compose logs`
- Verify all services are running: `docker-compose ps`
- Test API endpoints independently
- Check browser console for frontend errors

---

## 📝 Changelog

### Version 3.0.0 (Current - Next.js Enterprise Backend)
- ✅ Complete migration to Next.js Enterprise backend
- ✅ Preserved original React frontend
- ✅ PostgreSQL database with Prisma ORM
- ✅ Next.js App Router with API routes
- ✅ TypeScript with strict configuration
- ✅ Docker containerization for both services
- ✅ Maintained all original frontend functionality
- ✅ Enhanced with modern backend architecture

### Migration from Previous Versions
- ✅ Removed old Express.js API backend
- ✅ Removed Refine admin dashboard
- ✅ Integrated Next.js Enterprise boilerplate as backend-only
- ✅ Preserved database schema and data
- ✅ Maintained all original frontend functionality
- ✅ Enhanced with modern development practices

---

**Built with ❤️ for Dutch Wall Fort**

**Current Version**: 3.0.0 (Next.js Enterprise Backend)  
**Last Updated**: December 2024