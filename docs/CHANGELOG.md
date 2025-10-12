# 📋 Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.3] - 2025-10-09

### Added
- **Airbnb-Style Gallery Navigation**: Professional image viewer with next/previous buttons
- **Keyboard Navigation**: Arrow key support for image navigation (← →)
- **Image Counter**: "1 of 5" style counter in lightbox
- **Circular Navigation**: Seamless looping through room images
- **Enhanced Lightbox**: Full-screen image viewing with navigation controls
- **User Instructions**: Keyboard navigation hints displayed in lightbox

### Changed
- **RoomDetail.tsx**: Enhanced with professional gallery navigation system
- **Image Lightbox**: Upgraded with Airbnb-style navigation buttons
- **User Experience**: Improved image viewing with smooth transitions
- **Navigation Controls**: Added semi-transparent circular buttons with backdrop blur

### Fixed
- **Image Navigation**: Proper index tracking for gallery images
- **State Management**: Synchronized current image index with lightbox display
- **Event Handling**: Proper keyboard event cleanup on component unmount

### Technical
- **New State**: Added `currentImageIndex` for tracking gallery position
- **Navigation Functions**: `openImage()`, `nextImage()`, `prevImage()`, `closeLightbox()`
- **Keyboard Events**: Arrow key navigation with proper event listeners
- **UI Components**: ChevronLeft/ChevronRight icons for navigation buttons
- **Styling**: Semi-transparent buttons with hover effects and backdrop blur

## [1.0.2] - 2025-10-09

### Added
- **Separate Image Management System**: Implemented distinct header and gallery image fields
- **Header Image Field**: Single main image for room cards and primary display
- **Gallery Images Field**: Up to 10 additional images for room details gallery
- **Clean Database Migration**: Added `header_image` and `gallery_images` columns to rooms table
- **Organized Image Structure**: Each room now uses its own bedroom image set (bedroom1, bedroom2, bedroom3, bedroom4)
- **Mixed Villa Images**: Whole villa rental uses a curated mix of images from different bedrooms

### Changed
- **Admin Panel Interface**: Two separate FileUpload components for header and gallery images
- **Frontend Image Logic**: Updated to use `header_image` and `gallery_images` fields instead of single `images` array
- **Database Schema**: Enhanced rooms table with proper image field separation
- **Image Organization**: Clean bedroom image assignments (bedroom1_1.jpg → Room 1 header, etc.)
- **API Response Structure**: Now returns `header_image` and `gallery_images` fields

### Fixed
- **Image Display Issues**: Resolved hardcoded image confusion in frontend
- **Admin Panel Image Management**: Fixed existing images not showing in FileUpload components
- **Database Cleanup**: Removed all hardcoded/mixed image references
- **Frontend Image Fallbacks**: Proper placeholder handling for missing images
- **Image URL Generation**: Consistent backend storage URL generation

### Technical
- **Migration**: `2025_10_09_114030_add_separate_image_fields_to_rooms_table.php`
- **Model Updates**: Added `header_image` and `gallery_images` to fillable fields and casts
- **Accessors**: New `getHeaderImageForFilamentAttribute()` and `getGalleryImagesForFilamentAttribute()` methods
- **Frontend Updates**: Modified `Rooms.tsx` and `RoomDetail.tsx` to use new image fields
- **Admin Panel**: Enhanced `RoomResource.php` with collapsible image sections

## [1.0.1] - 2025-10-03

### Added
- Production deployment on Coolify platform (dutchwallfort.com)
- Preview deployment support for pull requests
- Comprehensive environment variable management
- Docker Compose optimization for production

### Changed
- Updated Docker configurations for Coolify compatibility
- Improved environment variable handling (NODE_ENV, VITE_API_URL)
- Enhanced deployment documentation with Coolify-specific guides
- Updated main documentation structure and navigation

### Fixed
- Resolved Coolify deployment port allocation conflicts
- Fixed Docker build issues with multi-stage builds
- Corrected environment variable configuration for production
- Fixed internal service communication in Docker containers

### Security
- Separated sensitive environment variables from codebase
- Enhanced .gitignore for better security
- Implemented production-grade JWT and session secrets
- Added secure environment variable templates

## [Unreleased]

### Added
- Advanced booking analytics dashboard
- Payment gateway integration
- Automated email confirmations
- Multi-language support (Sinhala, English)
- Advanced search and filtering

### Changed
- Improved mobile responsiveness
- Enhanced booking form validation
- Updated admin dashboard UI

### Security
- Enhanced security measures
- Improved authentication system

## [1.0.0] - 2025-10-02

### Added
- Initial release of Dutch Wall Fort Boutique Villa Management System
- Complete room management (Deluxe Family Room, Superior Room, Standard Room, Full Villa)
- Professional booking inquiry system with email notifications
- Comprehensive admin dashboard with full CRUD operations
- Mobile-first responsive design optimized for all devices
- Complete Docker containerization for production deployment
- PostgreSQL database with comprehensive schema and seed data
- REST API with JWT authentication
- Professional logo integration across all pages
- Image gallery with villa photography
- Blog system for villa information and updates
- Contact form with location integration
- Service management for additional amenities

### Technical Features
- React 18 + TypeScript frontend with Vite build system
- Express.js REST API backend with Node.js
- PostgreSQL 16 database with connection pooling
- JWT-based authentication system for admin access
- SMTP email integration for booking notifications
- Tailwind CSS for responsive, mobile-first design
- Docker + Docker Compose for complete containerization
- Nginx reverse proxy for production deployment
- Comprehensive error handling and logging
- Development session logs and troubleshooting documentation

### Documentation
- Complete setup and installation guide
- Comprehensive API documentation with examples
- Technical error log with solutions
- Development workflow and best practices
- Deployment guides for production
- Contributing guidelines
- Architecture overview and system design
- Testing procedures and QA documentation

### Fixed
- Resolved all import and dependency issues
- Fixed ESLint configuration and warnings
- Corrected API integration and database connections
- Resolved Docker containerization issues
- Fixed mobile responsiveness problems

---

**Last Updated**: October 9, 2025
**Version**: 1.1.0
**Status**: Production Release with Laravel Migration
