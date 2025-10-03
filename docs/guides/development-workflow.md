# 🚀 Development Workflow

Complete development processes, best practices, and workflow guidelines for the Dutch Wall Fort project.

## 📋 Development Overview

This guide outlines the development workflow for maintaining and extending the Dutch Wall Fort Boutique Villa Management System.

### **Development Principles**
- **Mobile-First**: Design for mobile devices first
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Optimized loading and interactions
- **Security**: Secure coding practices
- **Maintainability**: Clean, documented code

---

## 🛠️ Development Environment Setup

### **Prerequisites**
```bash
# Required software
Node.js 18+          # JavaScript runtime
npm 9+              # Package manager
Docker 20.10+       # Containerization
Docker Compose 2+   # Container orchestration
Git 2.30+           # Version control
```

### **Initial Setup**
```bash
# 1. Clone repository
git clone https://github.com/inamul5020/dutchwallfort.com.git
cd dutchwallfort.com

# 2. Install dependencies
npm install
cd server && npm install && cd ..

# 3. Environment setup
cp .env.example .env
# Edit .env with your configuration

# 4. Start development environment
docker-compose up -d

# 5. Verify setup
npm run dev        # Frontend (http://localhost:5173)
cd server && npm run dev  # Backend (http://localhost:3000)
```

## 🔄 Development Workflow

### **1. Task Planning**
```bash
# Create feature branch
git checkout -b feature/new-booking-feature

# Or bug fix branch
git checkout -b fix/booking-form-validation
```

### **2. Development Process**
```bash
# Start development servers
npm run dev                    # Frontend development
cd server && npm run dev      # Backend development

# Run tests (when implemented)
npm run test

# Code quality checks
npm run lint
npm run build                  # Verify production build
```

### **3. Code Quality**
```bash
# Lint code
npm run lint

# Fix linting issues automatically
npm run lint -- --fix

# Type checking
npx tsc --noEmit

# Build verification
npm run build
```

### **4. Testing**
```bash
# API testing
curl http://localhost:3000/api/health
curl http://localhost:3000/api/rooms

# Manual testing checklist
- [ ] Booking form submission
- [ ] Admin login
- [ ] Room management
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility
```

### **5. Commit & Push**
```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: add booking confirmation email

- Add email notification on booking submission
- Include booking details in email template
- Add SMTP configuration validation"

# Push to branch
git push origin feature/new-booking-feature
```

### **6. Code Review**
```bash
# Create pull request
# GitHub: Compare & pull request

# Review checklist:
- [ ] Code follows project conventions
- [ ] Tests pass (when applicable)
- [ ] Documentation updated
- [ ] No linting errors
- [ ] Mobile responsiveness verified
- [ ] Security considerations addressed
```

## 📝 Coding Standards

### **TypeScript/JavaScript**
```typescript
// ✅ Good: Explicit types
interface BookingData {
  guestName: string;
  email: string;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  room: string;
}

// ❌ Bad: Any types (except API responses)
const data: any = apiResponse; // Avoid

// ✅ Good: Proper error handling
try {
  const result = await apiCall();
  return result;
} catch (error) {
  console.error('API call failed:', error);
  throw new Error('Failed to fetch data');
}
```

### **React Components**
```tsx
// ✅ Good: Functional component with hooks
const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<BookingData>({
    guestName: '',
    email: '',
    // ... other fields
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await bookingsAPI.create(formData);
      // Success handling
    } catch (error) {
      // Error handling
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form JSX */}
    </form>
  );
};

// ✅ Good: Custom hooks for reusable logic
const useBookingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitBooking = async (data: BookingData) => {
    setIsSubmitting(true);
    try {
      const result = await bookingsAPI.create(data);
      return result;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitBooking, isSubmitting };
};
```

### **API Development**
```javascript
// ✅ Good: Proper error handling and validation
const createBooking = async (req, res) => {
  try {
    // Validate input
    const { error, value } = bookingSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.details
      });
    }

    // Create booking
    const booking = await Booking.create(value);

    // Send notification
    await sendBookingNotification(booking);

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Booking creation failed:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};
```

## 🏗️ Project Structure Guidelines

### **Adding New Features**

#### **Frontend Features**
```
src/
├── components/feature/     # Feature-specific components
│   ├── FeatureComponent.tsx
│   ├── FeatureForm.tsx
│   └── index.ts
├── pages/FeaturePage.tsx   # Page component
└── lib/api.ts             # Update API client if needed
```

#### **Backend Features**
```
server/src/
├── controllers/           # Business logic
│   └── featureController.js
├── routes/               # API routes
│   └── feature.js
└── models/               # Database models (if needed)
    └── Feature.js
```

#### **Database Changes**
```sql
-- migrations/timestamp_feature_update.sql
-- Include schema changes with proper constraints
ALTER TABLE table_name ADD COLUMN new_column TYPE;
CREATE INDEX idx_table_column ON table_name(column);
```

### **File Naming Conventions**
```
# Components: PascalCase (BookingForm.tsx)
# Files: camelCase (bookingForm.tsx)
# Directories: kebab-case (booking-form)
# API routes: kebab-case (/api/bookings)
# Database: snake_case (booking_table)
```

## 🧪 Testing Strategy

### **Manual Testing Checklist**
- [ ] **Functionality**: Feature works as expected
- [ ] **Validation**: Proper error handling and user feedback
- [ ] **Mobile**: Responsive design on all screen sizes
- [ ] **Browser**: Compatible with Chrome, Firefox, Safari, Edge
- [ ] **Performance**: No noticeable delays or issues
- [ ] **Security**: No sensitive data exposure

### **API Testing**
```bash
# Health check
curl http://localhost:3000/api/health

# Authentication
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}'

# Data operations
curl http://localhost:3000/api/rooms
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"guestName":"Test","email":"test@example.com"}'
```

## 🚀 Deployment Process

### **Development Deployment**
```bash
# 1. Test build
npm run build
npm run lint

# 2. Update version
npm version patch  # or minor/major

# 3. Push changes
git push origin main

# 4. Deploy (if using CI/CD)
# Automatic deployment triggered
```

### **Production Deployment**
```bash
# 1. Pull latest changes
git pull origin main

# 2. Build production images
docker-compose -f docker-compose.yml -f docker-compose.prod.yml build

# 3. Deploy
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# 4. Verify deployment
curl https://yourdomain.com/api/health
```

## 🔒 Security Guidelines

### **Frontend Security**
```typescript
// ✅ Sanitize user input
const sanitizedInput = DOMPurify.sanitize(userInput);

// ✅ Use HTTPS only in production
const apiUrl = process.env.NODE_ENV === 'production'
  ? 'https://api.dutchwallfort.com'
  : 'http://localhost:3000';

// ✅ Secure localStorage usage
const setSecureItem = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error('Storage error:', error);
  }
};
```

### **Backend Security**
```javascript
// ✅ Input validation
const Joi = require('joi');
const bookingSchema = Joi.object({
  guestName: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  // ... other validations
});

// ✅ Rate limiting
const rateLimit = require('express-rate-limit');
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));

// ✅ SQL injection prevention (using parameterized queries)
const booking = await pool.query(
  'SELECT * FROM bookings WHERE id = $1',
  [bookingId]
);
```

## 📊 Performance Optimization

### **Frontend Performance**
```typescript
// ✅ Lazy loading
const BookingForm = lazy(() => import('./components/BookingForm'));

// ✅ Image optimization
import villaImage from '../assets/villa.jpg?webp&w=800';

// ✅ Memoization
const RoomCard = memo(({ room }) => {
  return <div>{room.name}</div>;
});
```

### **Backend Performance**
```javascript
// ✅ Connection pooling
const pool = new Pool({
  max: 20,        // Maximum connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// ✅ Query optimization
const rooms = await pool.query(`
  SELECT * FROM rooms
  WHERE active = $1
  ORDER BY created_at DESC
  LIMIT $2
`, [true, 10]);
```

## 📝 Documentation Requirements

### **Code Documentation**
```typescript
/**
 * Creates a new booking inquiry
 * @param {BookingData} bookingData - The booking information
 * @returns {Promise<Booking>} The created booking
 * @throws {ValidationError} When booking data is invalid
 * @throws {DatabaseError} When database operation fails
 */
async function createBooking(bookingData: BookingData): Promise<Booking> {
  // Implementation
}
```

### **API Documentation**
```javascript
/**
 * GET /api/rooms
 * Get all active rooms
 *
 * Query Parameters:
 * - page (number): Page number (default: 1)
 * - limit (number): Items per page (default: 10)
 *
 * Response:
 * {
 *   "success": true,
 *   "data": [...],
 *   "pagination": {...}
 * }
 */
router.get('/rooms', getRooms);
```

## 🔄 Git Workflow

### **Branch Naming**
```
feature/add-payment-integration
fix/booking-form-validation
docs/update-api-documentation
refactor/optimize-database-queries
```

### **Commit Messages**
```
feat: add booking confirmation email
fix: resolve mobile layout issue on booking form
docs: update API documentation for bookings endpoint
refactor: optimize room query performance
chore: update dependencies to latest versions
```

### **Pull Request Template**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Manual testing completed
- [ ] API endpoints tested
- [ ] Mobile responsiveness verified
- [ ] Cross-browser compatibility checked

## Checklist
- [ ] Code follows project conventions
- [ ] Documentation updated
- [ ] No linting errors
- [ ] Tests pass
```

## 🚨 Troubleshooting

### **Common Development Issues**

#### **Build Failures**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npx tsc --noEmit
```

#### **Database Issues**
```bash
# Restart database
docker-compose restart db

# Check database logs
docker-compose logs db

# Reset database
docker-compose down --volumes
docker-compose up -d db
```

#### **Port Conflicts**
```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>
```

## 📈 Code Quality Metrics

### **Frontend Metrics**
- **Bundle Size**: < 500KB gzipped
- **Lighthouse Score**: > 90
- **TypeScript Coverage**: 100%
- **ESLint**: 0 errors

### **Backend Metrics**
- **Response Time**: < 200ms average
- **Error Rate**: < 0.1%
- **Test Coverage**: > 80%
- **Security Score**: A+

---

**Development Workflow Version**: 1.0.0
**Last Updated**: October 2, 2025
**Code Quality**: Production Ready
**Testing Coverage**: Manual Testing Implemented
