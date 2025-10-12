# Production Deployment Guide

## 🌐 **Domain Configuration**

### **Environment Variables for Production**

Set these environment variables in your production environment:

```bash
# Frontend (.env.local or build-time)
VITE_API_URL=https://dutchwallfort.com

# Backend (.env)
APP_URL=https://dutchwallfort.com
APP_ENV=production
APP_DEBUG=false
```

### **Image URL Structure**

All images are now served from the backend with separate header and gallery fields:

- **Development**: `http://localhost:8000/storage/rooms/filename.jpg`
- **Production**: `https://dutchwallfort.com/storage/rooms/filename.jpg`

## 📁 **Image Management**

### **Current Setup**
- ✅ **Separate image fields**: `header_image` and `gallery_images`
- ✅ **Organized bedroom images**: bedroom1, bedroom2, bedroom3, bedroom4
- ✅ **Clean database structure** with proper image separation
- ✅ **Unified image serving** from Laravel backend
- ✅ **Consistent URL structure** across environments

### **Image Storage Structure**
```
admin-panel/storage/app/public/rooms/
├── bedroom1_1.jpg → Room 1 Header (Deluxe Family Room)
├── bedroom1_2.jpg → Room 1 Gallery
├── bedroom1_3.jpg → Room 1 Gallery
├── bedroom1_4.jpg → Room 1 Gallery
├── bedroom1_5.jpg → Room 1 Gallery
├── bedroom1_6.jpg → Room 5 Header (Whole Villa)
├── bedroom1_7.jpg → Room 5 Gallery (Whole Villa)
├── bedroom2_1.jpg → Room 2 Header (Superior Room)
├── bedroom2_2.jpg → Room 2 Gallery
├── bedroom2_3.jpg → Room 2 Gallery + Room 5 Gallery
├── bedroom2_4.jpg → Room 2 Gallery
├── bedroom2_5.jpg → Room 2 Gallery
├── bedroom3_1.jpg → Room 3 Header (Standard Room)
├── bedroom3_2.jpg → Room 3 Gallery
├── bedroom3_3.jpg → Room 3 Gallery
├── bedroom3_4.jpg → Room 3 Gallery + Room 5 Gallery
├── bedroom3_5.jpg → Room 3 Gallery
├── bedroom4_1.jpg → Room 4 Header (Premium Room)
├── bedroom4_2.jpg → Room 4 Gallery + Room 5 Gallery
├── bedroom4_3.jpg → Room 4 Gallery
├── bedroom4_4.jpg → Room 4 Gallery
└── bedroom4_5.jpg → Room 4 Gallery
```

### **Database Image Fields**
- **Header Image**: `rooms/bedroom1_1.jpg` (single image for room cards)
- **Gallery Images**: `["rooms/bedroom1_2.jpg", "rooms/bedroom1_3.jpg", ...]` (up to 10 images)
- **Frontend URLs**: `{API_URL}/storage/{path}`

## 🚀 **Deployment Steps**

### **1. Backend Deployment**
```bash
# Copy all files to production server
# Set up Laravel environment
cp .env.example .env
# Edit .env with production values

# Install dependencies
composer install --optimize-autoloader --no-dev

# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate --force

# Create storage link
php artisan storage:link

# Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### **2. Frontend Deployment**
```bash
# Build with production API URL
VITE_API_URL=https://dutchwallfort.com npm run build

# Copy dist/ contents to web server
# Ensure API_URL points to backend
```

### **3. Image System Setup**

#### **Storage Link Creation**
```bash
cd admin-panel
php artisan storage:link
```

#### **Image Directory Permissions**
```bash
# Ensure proper permissions for image uploads
chmod -R 755 storage/app/public/rooms/
chown -R www-data:www-data storage/app/public/rooms/
```

#### **Database Migration**
```bash
# Run the image system migration
php artisan migrate
```

### **4. Web Server Configuration**

#### **Apache (.htaccess)**
```apache
# PHP Upload Configuration
php_value upload_max_filesize 10M
php_value post_max_size 20M
php_value max_execution_time 300
php_value max_input_time 300
php_value memory_limit 256M

# Laravel routing
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
```

#### **Nginx**
```nginx
server {
    listen 80;
    server_name dutchwallfort.com www.dutchwallfort.com;
    root /path/to/admin-panel/public;
    
    # PHP configuration
    client_max_body_size 20M;
    
    # Laravel routing
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

## 🔧 **Production Optimizations**

### **Laravel Optimizations**
```bash
# Cache everything for production
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# Optimize autoloader
composer install --optimize-autoloader --no-dev
```

### **Image Optimizations**
- ✅ **Automatic compression** via Filament
- ✅ **Multiple format support** (JPEG, PNG, WebP)
- ✅ **Size limits** (1MB per file)
- ✅ **Built-in editor** for resizing

### **Security Considerations**
- ✅ **HTTPS enforcement** in production
- ✅ **File upload validation** (type, size)
- ✅ **Storage link security** (public access only)
- ✅ **Environment-based configuration**

## 📊 **Monitoring & Maintenance**

### **Image Management**
- **Admin Panel**: `https://dutchwallfort.com/admin`
- **File Upload**: Via Filament interface
- **Storage Location**: `storage/app/public/`
- **Web Access**: `https://dutchwallfort.com/storage/`

### **Performance Monitoring**
- Monitor image loading times
- Check storage disk usage
- Verify CDN integration (if used)
- Monitor upload success rates

## 🔄 **Migration Benefits**

### **Before Migration**
- ❌ **Mixed image sources** (frontend + backend)
- ❌ **Complex URL logic** (different paths)
- ❌ **Deployment complexity** (multiple locations)
- ❌ **Inconsistent serving** (different servers)

### **After Migration**
- ✅ **Unified image storage** (backend only)
- ✅ **Simple URL structure** (consistent paths)
- ✅ **Easy deployment** (single source)
- ✅ **Consistent serving** (Laravel handles all)

## 🎯 **Production Checklist**

### **Pre-Deployment**
- [ ] Set `VITE_API_URL=https://dutchwallfort.com`
- [ ] Configure backend `.env` for production
- [ ] Test image uploads in staging
- [ ] Verify storage link creation
- [ ] Check file permissions

### **Post-Deployment**
- [ ] Test frontend image loading
- [ ] Test admin panel image upload
- [ ] Verify HTTPS image serving
- [ ] Check image optimization
- [ ] Monitor performance

---

**Last Updated**: October 9, 2025  
**Status**: ✅ **Production Ready**
