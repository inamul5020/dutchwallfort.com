# 🏗️ Architecture Overview

Complete system architecture and design documentation for the Dutch Wall Fort Boutique Villa Management System.

## 📋 System Overview

The Dutch Wall Fort system is a full-stack web application designed for managing a boutique villa accommodation business. It provides both public booking capabilities and comprehensive administrative tools.

### **Core Components**
- **Frontend**: React SPA with TypeScript
- **Backend**: Express.js REST API
- **Database**: PostgreSQL with connection pooling
- **Deployment**: Docker containerization
- **Authentication**: JWT-based admin system

---

## 🏛️ Architecture Diagram

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React SPA     │    │   Express API   │    │   PostgreSQL    │
│   (Port 5173)   │◄──►│   (Port 3000)   │◄──►│   (Port 5432)   │
│                 │    │                 │    │                 │
│ • Booking Form  │    │ • REST Endpoints│    │ • Rooms Table   │
│ • Room Gallery  │    │ • JWT Auth      │    │ • Bookings Table│
│ • Admin Dashboard│    │ • Email Service│    │ • Services Table│
│ • Mobile-First  │    │ • Validation    │    │ • Blog Table    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────────┐
                    │   Docker Compose    │
                    │   (Port 80/443)    │
                    │                     │
                    │ • Nginx Proxy      │
                    │ • SSL Termination  │
                    │ • Load Balancing   │
                    │ • Static Files     │
                    └─────────────────────┘
```

## 🔧 Technology Stack

### **Frontend Layer**
```
React 18 + TypeScript + Vite
├── UI Framework: Tailwind CSS
├── State Management: React Hooks
├── Routing: React Router DOM
├── HTTP Client: Axios
├── Icons: Lucide React
├── Forms: React Hook Form + Yup
└── Build Tool: Vite
```

### **Backend Layer**
```
Node.js + Express.js
├── Authentication: JWT + bcrypt
├── Validation: Joi/Yup
├── Email: Nodemailer
├── Database: pg (PostgreSQL driver)
├── CORS: cors middleware
├── Logging: Morgan
└── Security: Helmet, Rate Limiting
```

### **Database Layer**
```
PostgreSQL 16
├── Connection Pooling: pg.Pool
├── Migrations: SQL scripts
├── Indexing: Performance optimized
├── Backup: Automated scripts
└── Monitoring: Health checks
```

### **Infrastructure Layer**
```
Docker + Docker Compose
├── Web Service: Nginx (static files)
├── API Service: Node.js application
├── Database: PostgreSQL with volumes
├── Networks: Isolated service communication
└── Volumes: Persistent data storage
```

## 📁 Project Structure

```
dutchwallfort.com/
├── 📁 docs/                    # Documentation
├── 📁 src/                     # Frontend React App
│   ├── components/            # Reusable UI components
│   ├── pages/                 # Page components
│   ├── lib/                   # Utilities and API client
│   ├── contexts/              # React contexts
│   └── content/               # Static content
├── 📁 server/                 # Backend Express API
│   ├── src/
│   │   ├── controllers/       # Business logic
│   │   ├── routes/           # API route handlers
│   │   ├── middleware/       # Custom middleware
│   │   └── config/           # Configuration files
│   └── package.json
├── 📁 database/               # Database files
│   ├── init/
│   │   ├── 01-schema.sql     # Database schema
│   │   └── 02-seed.sql       # Sample data
│   └── migrations/           # Future migrations
├── 📁 public/                 # Static assets
│   └── images/               # Villa images
├── 🐳 docker-compose.yml      # Container orchestration
├── 🐳 Dockerfile             # Frontend build
├── 🐳 server/Dockerfile      # Backend container
└── 📋 package.json           # Frontend dependencies
```

## 🔄 Data Flow Architecture

### **Public User Journey**

1. **Homepage Visit**
   ```
   User → React SPA → Static content → Browser render
   ```

2. **Room Browsing**
   ```
   User → Rooms page → API call (/api/rooms) → Database query → JSON response → UI render
   ```

3. **Booking Submission**
   ```
   User → Booking form → Validation → API call (/api/bookings) → Database insert → Email notification → Success response
   ```

### **Admin User Journey**

1. **Authentication**
   ```
   Admin → Login form → API call (/api/auth/login) → JWT generation → Token storage → Dashboard access
   ```

2. **Data Management**
   ```
   Admin → CRUD actions → API calls → Database operations → Real-time UI updates
   ```

## 🗄️ Database Schema

### **Core Tables**

#### **rooms**
```sql
CREATE TABLE rooms (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  short_description TEXT,
  long_description TEXT,
  capacity INTEGER NOT NULL,
  beds VARCHAR(200),
  amenities TEXT[],
  price_from VARCHAR(50),
  gallery TEXT[],
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **bookings**
```sql
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  guest_name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  phone VARCHAR(50),
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  adults INTEGER NOT NULL,
  children INTEGER DEFAULT 0,
  room VARCHAR(200) NOT NULL,
  special_requests TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **services**
```sql
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price VARCHAR(50),
  category VARCHAR(100),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **blog_posts**
```sql
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  slug VARCHAR(300) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image VARCHAR(500),
  published BOOLEAN DEFAULT false,
  tags TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **admin_users**
```sql
CREATE TABLE admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(200) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  active BOOLEAN DEFAULT true,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔐 Security Architecture

### **Authentication & Authorization**
- **JWT Tokens**: Stateless authentication with expiration
- **Password Hashing**: bcrypt with configurable rounds
- **Role-Based Access**: Admin-only protected routes
- **Rate Limiting**: API request throttling

### **Data Protection**
- **Input Validation**: Server-side validation with Joi/Yup
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Input sanitization and CSP headers
- **CSRF Protection**: CORS configuration and token validation

### **Infrastructure Security**
- **Container Isolation**: Docker network segmentation
- **Environment Variables**: Sensitive data not in code
- **HTTPS Enforcement**: SSL/TLS in production
- **Regular Updates**: Dependency security patches

## 📊 Performance Considerations

### **Frontend Optimization**
- **Code Splitting**: Vite automatic chunking
- **Image Optimization**: Lazy loading and WebP format
- **Bundle Analysis**: Minimal bundle size monitoring
- **Caching**: Browser caching strategies

### **Backend Optimization**
- **Connection Pooling**: PostgreSQL connection reuse
- **Query Optimization**: Indexed database queries
- **Caching**: Response caching for static data
- **Compression**: Gzip response compression

### **Database Optimization**
- **Indexing**: Strategic indexes on frequently queried columns
- **Query Planning**: Efficient SQL query design
- **Connection Limits**: Controlled connection pool size
- **Backup Strategy**: Automated backup procedures

## 🔄 API Design Patterns

### **RESTful Endpoints**
```
/api/rooms           # GET (public), POST (admin)
/api/rooms/:id        # GET (public), PUT/DELETE (admin)
/api/bookings         # GET (admin), POST (public)
/api/bookings/:id      # PUT (admin - status updates)
/api/services         # CRUD operations (admin)
/api/blog             # CRUD operations (admin)
/api/auth/login       # POST (authentication)
/api/auth/verify      # POST (token verification)
/api/health           # GET (health check)
```

### **Response Format**
```json
{
  "success": true,
  "data": { /* payload */ },
  "message": "Optional message",
  "pagination": { /* pagination info */ }
}
```

### **Error Handling**
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": "Additional context"
}
```

## 🚀 Deployment Architecture

### **Development Environment**
```
Local Machine
├── Frontend: http://localhost:5173 (Vite dev server)
├── Backend: http://localhost:3000 (Express server)
├── Database: localhost:5432 (Docker container)
└── Email: SMTP server or service
```

### **Production Environment**
```
Docker Compose Stack
├── Nginx: Port 80/443 (reverse proxy, SSL termination)
├── Frontend: Static files served by Nginx
├── Backend: Container on internal network
├── Database: Persistent volume storage
└── Monitoring: Health checks and logging
```

### **Scalability Considerations**
- **Horizontal Scaling**: Multiple API containers behind load balancer
- **Database Scaling**: Read replicas for high-traffic scenarios
- **CDN Integration**: Static asset delivery optimization
- **Caching Layer**: Redis for session and data caching

## 📈 Monitoring & Logging

### **Application Monitoring**
- **Health Checks**: `/api/health` endpoint
- **Error Tracking**: Comprehensive error logging
- **Performance Metrics**: Response time monitoring
- **User Analytics**: Basic usage statistics

### **Infrastructure Monitoring**
- **Container Health**: Docker health checks
- **Resource Usage**: CPU, memory, disk monitoring
- **Network Traffic**: Request/response logging
- **Database Performance**: Query performance monitoring

## 🔄 Backup & Recovery

### **Database Backups**
- **Automated Backups**: Daily database dumps
- **Volume Snapshots**: Docker volume backups
- **Offsite Storage**: Cloud backup storage
- **Recovery Testing**: Regular restore testing

### **Application Backups**
- **Code Repository**: Git version control
- **Configuration Backup**: Environment files backup
- **Asset Backup**: Image and document backups
- **Documentation**: Comprehensive system documentation

## 🚀 Future Architecture Considerations

### **Phase 2 Enhancements**
- **Microservices**: Split monolithic API into services
- **Message Queue**: Asynchronous processing with Redis/RabbitMQ
- **CDN Integration**: Global content delivery
- **Advanced Caching**: Multi-layer caching strategy

### **Phase 3 Scaling**
- **Kubernetes**: Container orchestration
- **Load Balancing**: Advanced traffic distribution
- **Database Sharding**: Horizontal database scaling
- **Global Deployment**: Multi-region deployment

---

## 📊 Architecture Metrics

### **Performance Benchmarks**
- **API Response Time**: < 200ms average
- **Page Load Time**: < 3 seconds
- **Database Query Time**: < 50ms average
- **Bundle Size**: < 500KB gzipped

### **Scalability Limits**
- **Concurrent Users**: 1000+ (current architecture)
- **Database Connections**: 100 max pool size
- **API Rate Limits**: 1000 requests/hour per user
- **Storage Capacity**: 100GB+ available

### **Reliability Metrics**
- **Uptime Target**: 99.9% availability
- **Error Rate**: < 0.1% of requests
- **Data Durability**: 99.999% (PostgreSQL)
- **Backup Frequency**: Daily automated

---

**Architecture Version**: 1.0.0
**Last Updated**: October 2, 2025
**Design Pattern**: Monolithic with microservice-ready structure
**Scalability**: Production-ready for medium traffic loads
