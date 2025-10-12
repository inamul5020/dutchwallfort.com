# 📚 **Dutch Wall Fort Boutique Villa Documentation**

**Premium accommodation management system for the historic Dutch Wall Fort villa in Galle Fort, Sri Lanka**

[![Version](https://img.shields.io/badge/Version-1.1.0-blue.svg)]()
[![Status](https://img.shields.io/badge/Status-Production-green.svg)]()
[![Last Updated](https://img.shields.io/badge/Updated-October_9,_2025-orange.svg)]()

---

## 📋 **Documentation Index**

### **🚀 Getting Started**
- **[Quick Start Guide (Laravel)](./guides/quick-start-laravel.md)** - Get running with Laravel in 5 minutes
- **[Quick Start Guide](./guides/quick-start.md)** - Original quick start guide
- **[Main README](../README.md)** - Project overview and quick start guide
- **[Setup Guide](./guides/setup-guide.md)** - Complete installation instructions
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history and recent updates

### **🔧 Technical Documentation**
- **[Laravel Migration Guide](./technical/laravel-migration.md)** - Complete migration documentation
- **[API Documentation](./technical/API.md)** - REST API endpoints and usage
- **[Architecture Overview](./technical/architecture.md)** - System architecture and design
- **[Technical Error Log](./technical/error-log.md)** - Setup issues and resolutions

### **📊 Features & Guides**
- **[Product Requirements](./references/prd.md)** - Complete feature specifications
- **[Development Workflow](./guides/development-workflow.md)** - Development processes and best practices
- **[Contributing Guide](./guides/contributing.md)** - How to contribute to the project

### **🚀 Development Templates**

#### **Bolt.new Templates**
- **[Bolt.new Backend Template](./templates/bolt/bolt-new-backend-template.md)** - Complete backend generation template
- **[Bolt.new Quick Reference](./templates/bolt/bolt-new-quick-reference.md)** - Quick copy-paste prompts for bolt.new
- **[Bolt.new Complete Backend](./templates/bolt/bolt-new-complete-backend-template.md)** - Comprehensive backend template for any frontend project
- **[Bolt.new Entity Templates](./templates/bolt/bolt-new-entity-templates.md)** - Ready-to-use templates for common entity types
- **[Example Usage](./templates/bolt/example-usage.md)** - Step-by-step example of using the templates

#### **Project Templates**
- **[Project Template](./templates/git/PROJECT_TEMPLATE.md)** - Master template for new projects with placeholders
- **[Template Usage Guide](./templates/git/TEMPLATE_USAGE_GUIDE.md)** - How to use the project template system
- **[Template Quick Reference](./templates/git/TEMPLATE_QUICK_REFERENCE.md)** - Quick reference for template usage
- **[Customization Script](./templates/git/customize_template.sh)** - Automated template customization script

### **📁 Organization**
- **[guides/](./guides/)** - User guides and tutorials
- **[technical/](./technical/)** - Technical documentation and troubleshooting
- **[deployment/](./deployment/)** - Production deployment guides
- **[testing/](./testing/)** - Testing procedures and QA documentation
- **[features/](./features/)** - Feature-specific documentation
- **[tools/](./tools/)** - Templates and utility files
- **[references/](./references/)** - External resources and documentation
- **[assets/](./assets/)** - Diagrams and visual documentation
- **[archives/](./archives/)** - Historical documentation
- **[scripts/](./scripts/)** - Documentation automation scripts
- **[templates/](./templates/)** - Development templates and guides
  - **[bolt/](./templates/bolt/)** - Bolt.new AI development templates
  - **[git/](./templates/git/)** - Git repository and project templates
- **[chats/](./chats/)** - Development session logs and chat exports

---

## 🎯 **Project Overview**

### **Core Features**
- ✅ **Villa Management** - Complete room and service management system
- ✅ **Booking System** - Professional booking inquiry and management
- ✅ **Admin Dashboard** - Comprehensive administrative interface with Filament
- ✅ **Mobile-First Design** - Responsive design optimized for all devices
- ✅ **Multi-Room Support** - Deluxe Family Room, Superior Room, Standard Room, Full Villa
- ✅ **Service Management** - Additional services and amenities management
- ✅ **Blog System** - Content management for villa information
- ✅ **Contact Integration** - Email notifications and contact management

### **Technology Stack**
- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS
- **Backend:** Laravel 12 + Filament Admin Panel
- **Database:** SQLite (Development) / PostgreSQL (Production)
- **Deployment:** Docker + Docker Compose + Nginx
- **Authentication:** Laravel Sanctum + Filament Auth
- **Email:** SMTP integration for booking notifications
- **API:** RESTful API with CORS support

---

## 🚀 **Quick Start**

### **For New Users**
1. **[Installation Guide](../README.md#installation)** - Get the system running
2. **[Setup Guide](./guides/setup-guide.md)** - Detailed configuration steps
3. **[Demo Credentials](../README.md#demo-credentials)** - Test the system

### **For Developers**
1. **[Development Workflow](./guides/development-workflow.md)** - Development processes
2. **[API Documentation](./technical/API.md)** - Backend API reference
3. **[Technical Error Log](./technical/error-log.md)** - Troubleshooting guide

### **For System Administrators**
1. **[Deployment Guide](./deployment/)** - Production deployment
2. **[Database Management](./technical/)** - Database operations
3. **[Security Configuration](./technical/)** - Security best practices

---

## ✅ **Current Status**

### **🟢 Development Status**
- ✅ **Core Features** - Complete villa management system
- ✅ **API Development** - Full REST API with Laravel backend
- ✅ **Frontend Interface** - Professional, mobile-first design
- ✅ **Database Schema** - Complete SQLite schema with Laravel migrations
- ✅ **Documentation** - Comprehensive documentation system

### **🚀 Deployment Status**
- ✅ **Production Live** - Successfully deployed at [dutchwallfort.com](https://dutchwallfort.com)
- ✅ **Coolify Hosting** - Self-hosted on Coolify platform
- ✅ **SSL Certificate** - Automatic HTTPS with Let's Encrypt
- ✅ **Domain Connected** - Custom domain configuration
- ✅ **Preview Deployments** - Automatic PR deployment for testing

### **🔧 Recent Development**
- ✅ **Laravel Migration** - Successfully migrated from Express.js to Laravel 12
- ✅ **Filament Admin Panel** - Professional admin interface with CRUD operations
- ✅ **API Integration** - Frontend now fetches data from Laravel API
- ✅ **Database Migration** - Converted to SQLite with proper schema
- ✅ **Room Management** - Complete room CRUD with image uploads
- ✅ **Slug-based Routing** - SEO-friendly URLs for room details
- ✅ **Data Synchronization** - Real-time updates between admin and frontend
- ✅ **CORS Configuration** - Proper cross-origin resource sharing

### **🚧 In Progress**
- 🔄 **Payment Integration** - Stripe/PayPal payment gateway
- 🔄 **Email Automation** - Automated booking confirmations and notifications
- 🔄 **Analytics Dashboard** - Advanced booking analytics and reporting

---

## 📈 **Roadmap**

### **Phase 1: Core Features** ✅
- Villa room management system
- Professional booking inquiry system
- Admin dashboard with full CRUD operations
- Mobile-first responsive design
- Complete Laravel backend with Filament admin

### **Phase 2: Advanced Features** 🔄
- Payment gateway integration
- Automated booking confirmation emails
- Advanced analytics and reporting
- Multi-language support
- Advanced search and filtering

### **Phase 3: Production Ready** 📋
- Advanced security features
- Performance optimization
- Automated testing suite
- CI/CD pipeline setup
- Advanced monitoring and logging

---

## 🔧 **Troubleshooting**

### **Common Issues & Solutions**

#### **🚀 Deployment Issues**
- **Port conflicts**: `docker-compose down` then `docker-compose up -d`
- **Build failures**: `docker system prune -f` then rebuild
- **Database connection**: Wait for PostgreSQL to be healthy before starting API
- **Environment variables**: Check `.env` file has correct values

#### **💻 Development Issues**
- **Dependencies**: Run `npm install` in both root and `admin-panel/` directories
- **Database**: Use `php artisan migrate` for Laravel database setup
- **Ports**: Ensure ports 8000 (Laravel), 5173 (Frontend) are available
- **CORS**: API runs on port 8000, frontend on 5173

#### **🐳 Docker Issues**
- **Permission denied**: Add user to docker group: `sudo usermod -aG docker $USER`
- **Container not starting**: Check logs with `docker-compose logs [service]`
- **Volume issues**: Use `docker-compose down -v` to reset volumes
- **Memory issues**: Ensure at least 4GB RAM available

#### **🔗 Quick Fixes**
```bash
# Reset everything
docker-compose down -v
docker system prune -f
docker-compose up --build

# Check service status
docker-compose ps

# View logs
docker-compose logs -f [service]

# Restart specific service
docker-compose restart [service]
```

### **📞 Support Resources**
- **[Technical Error Log](./technical/error-log.md)** - Detailed error solutions
- **[API Documentation](./technical/API.md)** - Backend integration issues
- **[Deployment Guide](./deployment/)** - Production deployment help
- **GitHub Issues**: https://github.com/inamul5020/dutchwallfort.com/issues

---

## 🤝 **Contributing**

We welcome contributions to the Dutch Wall Fort Boutique Villa project! Please see our [Contributing Guide](./guides/contributing.md) for guidelines.

### **Documentation Standards**
- Use clear, concise language
- Include code examples where relevant
- Keep documentation up-to-date with code changes
- Follow the existing documentation structure

---

## 📞 **Support**

- **📧 Email:** admin@dutchwallfort.com
- **🐛 Issues:** https://github.com/inamul5020/dutchwallfort.com/issues
- **📖 Main Documentation:** [../README.md](../README.md)

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---

**Built with ❤️ by Dutch Wall Fort Team**

**Last Updated**: October 9, 2025
**Version**: 1.1.0
**Status**: ✅ **Production Ready**
