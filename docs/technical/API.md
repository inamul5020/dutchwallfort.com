# 🔧 API Documentation

Complete REST API documentation for the Dutch Wall Fort Boutique Villa Management System.

## 📋 Overview

The Dutch Wall Fort API is a RESTful service built with Express.js and Node.js, providing comprehensive villa management capabilities.

### **Base URL**
```
Production: https://api.dutchwallfort.com
Development: http://localhost:3000/api
```

### **Authentication**
- **Type**: JWT Bearer Token
- **Header**: `Authorization: Bearer <token>`
- **Admin Only**: Most endpoints require admin authentication

## 🔐 Authentication Endpoints

### **POST /api/auth/login**
Admin login endpoint.

**Request:**
```json
{
  "email": "admin@dutchwallfort.com",
  "password": "your_password"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@dutchwallfort.com",
    "role": "admin"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

### **POST /api/auth/verify**
Verify JWT token validity.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "admin@dutchwallfort.com",
    "role": "admin"
  }
}
```

## 🏨 Rooms API

### **GET /api/rooms**
Get all rooms (public endpoint).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "deluxe-family-room",
      "name": "Deluxe Family Room",
      "shortDescription": "Spacious room for families up to 4 guests",
      "capacity": 4,
      "beds": "1 king bed + 1 sofa bed",
      "priceFrom": "15,000",
      "gallery": ["/images/deluxe1.jpg", "/images/deluxe2.jpg"],
      "amenities": ["Air conditioning", "Private bathroom", "Balcony"]
    }
  ]
}
```

### **GET /api/rooms/:id**
Get specific room details (public endpoint).

**Parameters:**
- `id`: Room identifier (deluxe-family-room, superior-room, etc.)

**Response:** Same as above but single room object.

### **POST /api/rooms**
Create new room (admin only).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "slug": "premium-suite",
  "name": "Premium Suite",
  "shortDescription": "Luxury suite with ocean view",
  "longDescription": "Detailed description...",
  "capacity": 3,
  "beds": "1 king bed + 1 single bed",
  "amenities": ["Air conditioning", "Private bathroom", "Ocean view"],
  "priceFrom": "20,000",
  "gallery": ["/images/premium1.jpg", "/images/premium2.jpg"],
  "active": true
}
```

### **PUT /api/rooms/:id**
Update room (admin only).

**Parameters:**
- `id`: Room ID

**Request:** Same as create, partial updates allowed.

### **DELETE /api/rooms/:id**
Delete room (admin only).

**Parameters:**
- `id`: Room ID

## 📝 Bookings API

### **GET /api/bookings**
Get all bookings (admin only).

**Query Parameters:**
- `status`: Filter by status (pending, confirmed, cancelled)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "guestName": "John Doe",
      "email": "john@example.com",
      "phone": "+94 77 123 4567",
      "checkInDate": "2025-01-15",
      "checkOutDate": "2025-01-20",
      "adults": 2,
      "children": 1,
      "room": "Deluxe Family Room",
      "specialRequests": "Late check-in requested",
      "status": "pending",
      "createdAt": "2025-01-01T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

### **POST /api/bookings**
Create new booking inquiry (public endpoint).

**Request:**
```json
{
  "guestName": "John Doe",
  "email": "john@example.com",
  "phone": "+94 77 123 4567",
  "checkInDate": "2025-01-15",
  "checkOutDate": "2025-01-20",
  "adults": 2,
  "children": 1,
  "room": "Deluxe Family Room",
  "specialRequests": "Late check-in requested"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking inquiry submitted successfully",
  "data": {
    "id": 1,
    "status": "pending"
  }
}
```

### **PUT /api/bookings/:id/status**
Update booking status (admin only).

**Parameters:**
- `id`: Booking ID

**Request:**
```json
{
  "status": "confirmed"
}
```

**Valid Statuses:**
- `pending` - Initial status
- `confirmed` - Booking confirmed
- `cancelled` - Booking cancelled

## 🛎️ Services API

### **GET /api/services**
Get all services (public endpoint).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "airport-transfer",
      "name": "Airport Transfer",
      "description": "Private airport transfer service",
      "price": "5,000",
      "category": "transport",
      "active": true
    }
  ]
}
```

### **POST /api/services**
Create new service (admin only).

**Request:**
```json
{
  "slug": "spa-treatment",
  "name": "Spa Treatment",
  "description": "Relaxing spa treatment in villa",
  "price": "8,000",
  "category": "wellness",
  "active": true
}
```

### **PUT /api/services/:id**
Update service (admin only).

### **DELETE /api/services/:id**
Delete service (admin only).

## 📝 Blog API

### **GET /api/blog**
Get all blog posts (public endpoint).

**Query Parameters:**
- `page`: Page number
- `limit`: Items per page
- `published`: Filter by published status

### **POST /api/blog**
Create new blog post (admin only).

**Request:**
```json
{
  "title": "Welcome to Dutch Wall Fort",
  "slug": "welcome-dutch-wall-fort",
  "content": "Full blog post content...",
  "excerpt": "Short excerpt for preview",
  "featuredImage": "/images/blog/welcome.jpg",
  "published": true,
  "tags": ["welcome", "villa", "galle"]
}
```

### **PUT /api/blog/:id**
Update blog post (admin only).

### **DELETE /api/blog/:id**
Delete blog post (admin only).

## 🏥 Health Check

### **GET /api/health**
System health check (public endpoint).

**Response:**
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2025-01-01T10:00:00Z",
  "services": {
    "database": "connected",
    "email": "configured"
  }
}
```

## 📊 Error Responses

All API endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": "Additional error details"
}
```

### **Common Error Codes**
- `VALIDATION_ERROR` - Invalid request data
- `UNAUTHORIZED` - Missing or invalid authentication
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `CONFLICT` - Resource conflict
- `INTERNAL_ERROR` - Server error

## 🔒 Rate Limiting

- **Public endpoints**: 100 requests per hour per IP
- **Authenticated endpoints**: 1000 requests per hour per user
- **Admin endpoints**: 5000 requests per hour per admin

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1638360000
```

## 📝 Data Validation

### **Booking Validation Rules**
- `guestName`: Required, 2-100 characters
- `email`: Required, valid email format
- `phone`: Required, valid phone number
- `checkInDate`: Required, future date
- `checkOutDate`: Required, after check-in date
- `adults`: Required, 1-20
- `children`: Optional, 0-10
- `room`: Required, valid room type

### **Room Validation Rules**
- `slug`: Required, unique, URL-friendly
- `name`: Required, 2-100 characters
- `capacity`: Required, 1-20
- `priceFrom`: Required, valid currency format

## 🧪 Testing API Endpoints

### **Using cURL**
```bash
# Get rooms
curl http://localhost:3000/api/rooms

# Create booking
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"guestName":"Test User","email":"test@example.com","checkInDate":"2025-01-15","checkOutDate":"2025-01-20","adults":2,"room":"Deluxe Family Room"}'

# Admin login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@dutchwallfort.com","password":"your_password"}'
```

### **Using JavaScript/fetch**
```javascript
// Get rooms
const response = await fetch('/api/rooms');
const data = await response.json();

// Create booking
const bookingData = {
  guestName: "John Doe",
  email: "john@example.com",
  checkInDate: "2025-01-15",
  checkOutDate: "2025-01-20",
  adults: 2,
  room: "Deluxe Family Room"
};

const response = await fetch('/api/bookings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(bookingData)
});
```

## 🔄 Webhook Support

The API supports webhooks for real-time notifications (future feature):
- Booking status changes
- New inquiries
- System alerts

---

**API Version**: 1.0.0
**Last Updated**: October 2, 2025
**Base URL**: `https://api.dutchwallfort.com`
**Authentication**: JWT Bearer Token
**Rate Limit**: 100 requests/hour (public), 1000/hour (authenticated)
