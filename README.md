# Dutch Wall Fort - Admin Dashboard

A comprehensive property management system for Dutch Wall Fort boutique villa in Galle Fort, Sri Lanka. Built with React, TypeScript, Tailwind CSS, and PostgreSQL.

## Features

- **Room Management**: Full CRUD operations for rooms with pricing, amenities, and image galleries
- **Service Management**: Manage tours, transportation, and other services
- **Booking System**: Handle guest inquiries with email/WhatsApp integration
- **Blog Platform**: Create and publish blog posts with draft/published status
- **Review System**: Manage customer reviews with approval workflow
- **Admin Dashboard**: Real-time statistics and quick actions
- **Secure Authentication**: JWT-based authentication with bcrypt
- **RESTful API**: Express.js backend with PostgreSQL

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Express.js REST API
- **Database**: PostgreSQL 16
- **Authentication**: JWT with bcrypt
- **Icons**: Lucide React
- **Routing**: React Router v7
- **Forms**: React Hook Form + Yup validation
- **HTTP Client**: Axios
- **Deployment**: Docker + Docker Compose

## Quick Start

### With Docker (Recommended)

```bash
# Start all services (PostgreSQL + API + Frontend)
docker-compose up -d

# View logs
docker-compose logs -f

# Access the application
open http://localhost:5173
```

### Without Docker

```bash
# Install frontend dependencies
npm install

# Install API dependencies
cd server && npm install && cd ..

# Start API (in one terminal)
cd server && npm run dev

# Start frontend (in another terminal)
npm run dev
```

## Getting Started

1. **Start the application** using Docker (recommended)
2. **Login** at `/admin/login` with default credentials:
   - Email: admin@dutchwallfort.com
   - Password: admin123
3. **Start managing** your property!

## Environment Variables

The project requires these environment variables in `.env`:

```env
VITE_API_URL=http://localhost:3000
```

## Project Structure

```
project/
├── src/
│   ├── components/         # Reusable React components
│   ├── pages/             # Page components
│   │   ├── admin/         # Admin panel pages
│   │   └── ...            # Public pages
│   ├── contexts/          # React contexts (Auth with JWT)
│   ├── lib/              # Utilities (Axios API client)
│   └── App.tsx
├── server/
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── controllers/   # API controllers
│   │   ├── middleware/    # Authentication middleware
│   │   ├── routes/        # API routes
│   │   └── index.js       # Express app
│   └── Dockerfile
├── database/
│   └── init/             # Database initialization scripts
├── public/               # Static assets
├── docker-compose.yml    # Docker services
├── Dockerfile           # Frontend container
└── DEVELOPMENT.md       # Detailed development guide
```

## Development

For detailed development instructions, database management, and troubleshooting, see [DEVELOPMENT.md](./DEVELOPMENT.md).

### Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Run ESLint

# Docker
docker-compose up -d    # Start containers
docker-compose down     # Stop containers
docker-compose logs -f  # View logs
docker-compose restart  # Restart services
```

## Database

PostgreSQL database with the following tables:

- **users**: User authentication with bcrypt passwords
- **rooms**: Room details, pricing, and availability
- **services**: Tours and services offered
- **blog_posts**: Blog content management
- **bookings**: Guest booking inquiries
- **reviews**: Customer reviews

All data access is secured through JWT authentication and role-based authorization.

## Admin Panel

Access the admin panel at `/admin/login` with your credentials.

**Default Admin Account:**
- Email: admin@dutchwallfort.com
- Password: admin123

### Admin Features:

- **Dashboard**: Overview of rooms, services, bookings, and blog posts
- **Rooms**: Add, edit, and manage room listings
- **Services**: Manage tours and services
- **Bookings**: View and respond to guest inquiries
- **Blog**: Create and publish blog posts
- **Statistics**: Real-time metrics and insights

## Deployment

### Docker Production Build

```bash
# Build production image
docker build --target production -t dutchwallfort:latest .

# Run production container
docker run -p 80:80 dutchwallfort:latest
```

### Manual Deployment

```bash
# Build the application
npm run build

# Deploy the dist/ folder to your hosting provider
```

## Security

- JWT-based authentication with secure token storage
- Passwords hashed with bcrypt (10 rounds)
- Role-based authorization (admin/user)
- Protected API routes with middleware
- Environment variables for sensitive configuration
- Input validation on both frontend and backend
- CORS enabled for API security

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

Private project for Dutch Wall Fort.

## Support

For development questions and troubleshooting, refer to [DEVELOPMENT.md](./DEVELOPMENT.md).

## Links

- [Live Site](https://dutchwallfort.com)
- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
