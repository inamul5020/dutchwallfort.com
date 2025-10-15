# Multi-stage Dockerfile for Dutch Wall Fort - Production Deployment
# This Dockerfile builds both frontend and backend for Coolify deployment

# Stage 1: Build Frontend
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy frontend package files
COPY package.json package-lock.json* ./

# Install frontend dependencies
RUN npm ci --only=production

# Copy frontend source code
COPY src/ ./src/
COPY public/ ./public/
COPY index.html ./
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./

# Build frontend for production
RUN npm run build

# Stage 2: Build Backend
FROM node:20-alpine AS backend-builder

WORKDIR /app/backend

# Copy backend package files
COPY backend/package.json backend/package-lock.json* ./

# Install backend dependencies
RUN npm ci --only=production

# Copy backend source code
COPY backend/ ./

# Generate Prisma client
RUN npx prisma generate

# Build backend for production
RUN npm run build

# Stage 3: Production Runtime
FROM node:20-alpine AS production

# Install necessary packages
RUN apk add --no-cache \
    openssl \
    ca-certificates

WORKDIR /app

# Copy built backend
COPY --from=backend-builder /app/backend/.next ./.next
COPY --from=backend-builder /app/backend/public ./public
COPY --from=backend-builder /app/backend/package.json ./package.json
COPY --from=backend-builder /app/backend/node_modules ./node_modules
COPY --from=backend-builder /app/backend/prisma ./prisma
COPY --from=backend-builder /app/backend/lib ./lib
COPY --from=backend-builder /app/backend/config ./config
COPY --from=backend-builder /app/backend/templates ./templates
COPY --from=backend-builder /app/backend/next.config.ts ./
COPY --from=backend-builder /app/backend/next-env.d.ts ./
COPY --from=backend-builder /app/backend/tsconfig.json ./
COPY --from=backend-builder /app/backend/env.mjs ./

# Copy built frontend to backend public directory
COPY --from=frontend-builder /app/frontend/dist ./public/frontend

# Create a custom Next.js configuration for serving frontend
RUN echo 'const nextConfig = {
  output: "standalone",
  experimental: {
    outputFileTracingRoot: undefined,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/api/:path*",
      },
      {
        source: "/((?!api|_next/static|_next/image|favicon.ico|frontend).*)",
        destination: "/frontend/index.html",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ],
      },
    ];
  },
};

export default nextConfig;' > next.config.js

# Create a startup script
RUN echo '#!/bin/sh
echo "Starting Dutch Wall Fort Application..."

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Run database migrations (if needed)
echo "Running database migrations..."
npx prisma db push --accept-data-loss || echo "Database push failed, continuing..."

# Start the application
echo "Starting Next.js server..."
exec npm start' > start.sh

RUN chmod +x start.sh

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start the application
CMD ["./start.sh"]