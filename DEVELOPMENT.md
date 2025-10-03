# Dutch Wall Fort - Development Guide

This guide will help you set up and develop the Dutch Wall Fort admin dashboard in Cursor with Docker containers, PostgreSQL, and Express API.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- [Cursor](https://cursor.sh/) or any code editor
- [Node.js 20+](https://nodejs.org/) (for local development without Docker)
- Git

## Project Architecture

```
├── Frontend: React + TypeScript + Vite + Tailwind CSS
├── Backend: Express.js REST API
├── Database: PostgreSQL 16
└── Containerization: Docker + Docker Compose
```

## Quick Start with Docker

### 1. Clone and Setup

```bash
git clone <repository-url>
cd project
```

### 2. Environment Variables

The `.env` file should contain:

```env
VITE_API_URL=http://localhost:3000
```

### 3. Start Docker Containers

```bash
# Start all services (PostgreSQL + API + Frontend)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes (clean slate)
docker-compose down -v
```

### 4. Access the Application

- **Frontend**: http://localhost:5173
- **API**: http://localhost:3000
- **API Health Check**: http://localhost:3000/api/health
- **Admin Login**: http://localhost:5173/admin/login
- **Database**: localhost:5432 (postgres/postgres)

## Development Workflows

### Working with Docker (Recommended)

```bash
# Start development environment
docker-compose up -d

# Watch logs in real-time
docker-compose logs -f

# Watch specific service
docker-compose logs -f api
docker-compose logs -f frontend

# Restart a service
docker-compose restart api

# Rebuild after dependency changes
docker-compose up -d --build

# Execute commands inside API container
docker-compose exec api npm install <package-name>

# Execute commands inside frontend container
docker-compose exec frontend npm install <package-name>

# Access PostgreSQL
docker-compose exec postgres psql -U postgres -d dutchwallfort
```

### Working Locally (Without Docker)

```bash
# Install frontend dependencies
npm install

# Install API dependencies
cd server && npm install && cd ..

# Start API (in one terminal)
cd server && npm run dev

# Start frontend (in another terminal)
npm run dev

# Build for production
npm run build
```

## Database Management

### Database Schema

The database includes these tables:

- **users**: User authentication with bcrypt passwords
- **rooms**: Room management with pricing, amenities, galleries
- **services**: Tours, transportation, and other services
- **blog_posts**: Blog content with draft/published status
- **bookings**: Guest booking inquiries and reservations
- **reviews**: Customer reviews with approval system

### Accessing the Database

Using `psql`:
```bash
docker-compose exec postgres psql -U postgres -d dutchwallfort

# Common commands
\dt              # List tables
\d+ rooms        # Describe rooms table
\q               # Quit
```

Using a GUI tool (TablePlus, DBeaver, pgAdmin):
- Host: localhost
- Port: 5432
- Database: dutchwallfort
- User: postgres
- Password: postgres

### Running Migrations

Database initialization happens automatically when PostgreSQL starts for the first time using scripts in `database/init/`.

To manually apply migrations:

```bash
# Connect and run SQL
docker-compose exec postgres psql -U postgres -d dutchwallfort < database/init/01-schema.sql
```

## API Structure

### Express API (Port 3000)

The API is organized as follows:

```
server/
├── src/
│   ├── config/
│   │   └── database.js       # PostgreSQL connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── roomsController.js
│   │   ├── servicesController.js
│   │   ├── bookingsController.js
│   │   └── blogController.js
│   ├── middleware/
│   │   └── auth.js           # JWT authentication
│   ├── routes/
│   │   ├── auth.js
│   │   ├── rooms.js
│   │   ├── services.js
│   │   ├── bookings.js
│   │   └── blog.js
│   └── index.js              # Express app entry
├── Dockerfile
└── package.json
```

### API Endpoints

**Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires auth)

**Rooms**
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/:id` - Get room by ID
- `POST /api/rooms` - Create room (admin only)
- `PUT /api/rooms/:id` - Update room (admin only)
- `DELETE /api/rooms/:id` - Delete room (admin only)

**Services**
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create service (admin only)
- `PUT /api/services/:id` - Update service (admin only)
- `DELETE /api/services/:id` - Delete service (admin only)

**Bookings**
- `GET /api/bookings` - Get all bookings (admin only)
- `GET /api/bookings/:id` - Get booking by ID (admin only)
- `POST /api/bookings` - Create booking (public)
- `PATCH /api/bookings/:id/status` - Update booking status (admin only)
- `DELETE /api/bookings/:id` - Delete booking (admin only)

**Blog**
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/:id` - Get post by ID
- `POST /api/blog` - Create post (admin only)
- `PUT /api/blog/:id` - Update post (admin only)
- `DELETE /api/blog/:id` - Delete post (admin only)

## Admin Authentication

### Creating an Admin Account

The database is seeded with a default admin account:

**Email**: admin@dutchwallfort.com
**Password**: admin123

You can create additional admin accounts using the API:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password","name":"Admin Name"}'
```

Then manually update the role in the database:

```bash
docker-compose exec postgres psql -U postgres -d dutchwallfort -c \
  "UPDATE users SET role='admin' WHERE email='admin@example.com';"
```

## Frontend Structure

```
src/
├── components/          # React components
│   ├── admin/          # Admin-specific components
│   ├── BookingForm.tsx
│   ├── Header.tsx
│   └── Footer.tsx
├── pages/              # Page components
│   ├── admin/          # Admin pages
│   └── ...             # Public pages
├── contexts/           # React contexts
│   └── AuthContext.tsx # JWT authentication context
├── lib/               # Utilities
│   └── api.ts         # Axios API client
└── App.tsx
```

## Common Tasks

### Adding a New Database Table

1. Create a migration in `database/init/`:

```sql
CREATE TABLE IF NOT EXISTS new_table (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_new_table_updated_at BEFORE UPDATE ON new_table
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

2. Restart PostgreSQL to apply (if not using migrations):

```bash
docker-compose down -v
docker-compose up -d
```

### Adding a New API Endpoint

1. Create controller in `server/src/controllers/`
2. Create route in `server/src/routes/`
3. Import and use route in `server/src/index.js`
4. Update frontend API client in `src/lib/api.ts`

### Adding a New Admin Page

1. Create page component in `src/pages/admin/`
2. Add route in `src/App.tsx`
3. Update navigation in `src/components/admin/AdminLayout.tsx`

### Installing New Dependencies

```bash
# Frontend dependencies
docker-compose exec frontend npm install <package-name>
docker-compose restart frontend

# API dependencies
docker-compose exec api npm install <package-name>
docker-compose restart api

# Without Docker
npm install <package-name>  # Frontend
cd server && npm install <package-name>  # API
```

## Troubleshooting

### Container Issues

```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs api
docker-compose logs postgres
docker-compose logs frontend

# Restart services
docker-compose restart

# Clean restart (removes volumes)
docker-compose down -v
docker-compose up -d
```

### Database Connection Issues

1. Ensure PostgreSQL container is running:
   ```bash
   docker-compose ps postgres
   ```

2. Check logs:
   ```bash
   docker-compose logs postgres
   ```

3. Test connection:
   ```bash
   docker-compose exec postgres pg_isready -U postgres
   ```

### API Connection Issues

1. Check API is running:
   ```bash
   docker-compose logs api
   ```

2. Test health endpoint:
   ```bash
   curl http://localhost:3000/api/health
   ```

3. Check CORS settings if frontend cannot connect

### Port Conflicts

If ports 5173, 3000, or 5432 are already in use:

1. Stop conflicting services
2. Or modify ports in `docker-compose.yml`:
   ```yaml
   ports:
     - "3001:3000"  # Use port 3001 instead
   ```

## Production Deployment

### Build Production Images

```bash
# Build API image
cd server
docker build -t dutchwallfort-api:latest .

# Build Frontend image
docker build --target production -t dutchwallfort-frontend:latest .
```

### Environment Variables for Production

Create `.env.production`:

```env
VITE_API_URL=https://api.dutchwallfort.com
DATABASE_URL=postgresql://user:password@host:5432/dutchwallfort
JWT_SECRET=your-secure-jwt-secret
SESSION_SECRET=your-secure-session-secret
```

## Security Best Practices

1. **Change default passwords** for admin user and database
2. **Use strong JWT secrets** in production
3. **Enable HTTPS** for API and frontend
4. **Validate all user input** on both client and server
5. **Use environment variables** for sensitive configuration
6. **Keep dependencies updated**: `npm audit fix`
7. **Implement rate limiting** on API endpoints
8. **Use prepared statements** for database queries (already implemented)

## Testing

```bash
# Run linter
npm run lint

# Build to check for errors
npm run build

# Type checking
npx tsc --noEmit

# Test API endpoints
curl http://localhost:3000/api/health
```

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [React Documentation](https://react.dev)
- [Docker Documentation](https://docs.docker.com)
- [Axios Documentation](https://axios-http.com/)

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Docker and PostgreSQL logs
3. Verify all services are running
4. Check API endpoint responses
5. Consult the official documentation for each technology
