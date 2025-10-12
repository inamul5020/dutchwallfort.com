# Dutch Wall Fort - Hotel Booking Application

A modern hotel booking website with React frontend and Next.js Enterprise API backend, featuring luxury accommodation in Galle Fort, Sri Lanka.

## 🏗️ Project Architecture

```
dutchwallfort.com/
├── src/                    # React Frontend (Vite + TypeScript)
├── backend/                # Next.js Enterprise API Backend
│   ├── app/api/           # API Routes (Rooms, Bookings, Contact)
│   └── prisma/            # Database schema and migrations
├── database/              # Database initialization scripts
├── docker-compose.yml     # Docker orchestration
└── README.md             # This documentation
```

## 🚀 Quick Start with Docker

### Prerequisites
- Docker & Docker Compose
- Git

### 1. Clone and Start All Services
```bash
git clone <repository-url>
cd dutchwallfort.com
docker-compose up -d
```

### 2. Access Applications
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Database**: localhost:5432

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

## 🔮 Future Enhancements

### Planned Features
- [ ] User authentication system
- [ ] Online booking system with payment integration
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Advanced search and filtering
- [ ] Calendar integration
- [ ] Review system
- [ ] Admin dashboard

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