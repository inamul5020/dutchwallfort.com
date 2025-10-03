# 📚 **Dutch Wall Fort Boutique Villa** Documentation

**Premium accommodation management system for the historic Dutch Wall Fort villa in Galle Fort, Sri Lanka**

[![Version](https://img.shields.io/badge/Version-1.0.1-blue.svg)]()
[![Status](https://img.shields.io/badge/Status-Production-green.svg)]()
[![Last Updated](https://img.shields.io/badge/Updated-October_3,_2025-orange.svg)]()

---

## 📋 **Documentation Index**

### **🚀 Getting Started**
- **[Quick Start Guide](./guides/quick-start.md)** - Get running in 5 minutes
- **[Main README](../README.md)** - Project overview and architecture
- **[Setup Guide](./guides/setup-guide.md)** - Complete installation instructions
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history and recent updates

### **🔧 Technical Documentation**
- **[API Documentation](./technical/API.md)** - REST API endpoints and usage
- **[Technical Error Log](./technical/error-log.md)** - Setup issues and resolutions
- **[Architecture Overview](./technical/architecture.md)** - System architecture and design

### **📊 Features & Guides**
- **[Product Requirements](./references/prd.md)** - Complete feature specifications
- **[Development Workflow](./guides/development-workflow.md)** - Development processes and best practices
- **[Contributing Guide](./guides/contributing.md)** - How to contribute to the project

### **🛠️ Development Resources**

#### **Development Tools**
- **[ESLint Configuration](../eslint.config.js)** - Code quality and linting rules
- **[Tailwind Configuration](../tailwind.config.js)** - CSS framework configuration
- **[Vite Configuration](../vite.config.ts)** - Build tool configuration
- **[TypeScript Configuration](../tsconfig.json)** - TypeScript compiler options

### **📁 Documentation Organization**
- **[guides/](./guides/)** - User guides and tutorials
  - **[Quick Start Guide](./guides/quick-start.md)** - Get running in 5 minutes
  - **[Setup Guide](./guides/setup-guide.md)** - Complete installation instructions
  - **[Development Workflow](./guides/development-workflow.md)** - Development processes and best practices
  - **[Contributing Guide](./guides/contributing.md)** - How to contribute to the project
- **[technical/](./technical/)** - Technical documentation and troubleshooting
  - **[API Documentation](./technical/API.md)** - REST API endpoints and usage
  - **[Architecture Overview](./technical/architecture.md)** - System architecture and design
  - **[Technical Error Log](./technical/error-log.md)** - Setup issues and resolutions
- **[deployment/](./deployment/)** - Production deployment guides
  - **[Deployment Guide](./deployment/README.md)** - Complete production deployment
- **[references/](./references/)** - External resources and documentation
  - **[Product Requirements](./references/prd.md)** - Complete feature specifications

---

## 🎯 **Project Overview**

### **Core Features**
- ✅ **Villa Management** - Complete room and service management system
- ✅ **Booking System** - Professional booking inquiry and management
- ✅ **Admin Dashboard** - Comprehensive administrative interface
- ✅ **Mobile-First Design** - Responsive design optimized for all devices
- ✅ **Multi-Room Support** - Deluxe Family Room, Superior Room, Standard Room, Full Villa
- ✅ **Service Management** - Additional services and amenities management
- ✅ **Blog System** - Content management for villa information
- ✅ **Contact Integration** - Email notifications and contact management

### **Technology Stack**
- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS
- **Backend:** Express.js REST API with Node.js
- **Database:** PostgreSQL 16
- **Deployment:** Docker + Docker Compose + Nginx
- **Authentication:** JWT-based admin authentication
- **Email:** SMTP integration for booking notifications

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

### **🚀 Deployment Status**
- ✅ **Production Live** - Successfully deployed at [dutchwallfort.com](https://dutchwallfort.com)
- ✅ **Coolify Hosting** - Self-hosted on Coolify platform
- ✅ **SSL Certificate** - Automatic HTTPS with Let's Encrypt
- ✅ **Domain Connected** - Custom domain configuration
- ✅ **Preview Deployments** - Automatic PR deployment for testing

### **🔧 Development Status**
- ✅ **Core Features** - Complete villa management system
- ✅ **API Development** - Full REST API with all endpoints
- ✅ **Frontend Interface** - Professional, mobile-first design
- ✅ **Database Schema** - Complete PostgreSQL schema with seed data
- ✅ **Documentation** - Comprehensive documentation system
- ✅ **Docker Deployment** - Production-ready containerization

### **🚀 Recent Achievements**
- ✅ **Production Deployment** - Successfully deployed on Coolify (dutchwallfort.com)
- ✅ **Environment Security** - Separated sensitive variables from codebase
- ✅ **Docker Optimization** - Production-ready containerization with multi-stage builds
- ✅ **Mobile-First Design** - Complete responsive redesign for all devices
- ✅ **Logo Integration** - Professional branding across Header, Footer, and Admin
- ✅ **Booking Form Enhancement** - Improved UX with number inputs and validation
- ✅ **Room Detail Pages** - Dynamic routing for all room types (Premium, Deluxe, etc.)
- ✅ **Admin Dashboard** - Complete administrative interface with full CRUD
- ✅ **API Integration** - Fixed all Supabase import issues with proper REST API
- ✅ **Error Resolution** - Comprehensive error logging and troubleshooting guides

### **🚧 Future Enhancements**
- 🔄 **Payment Integration** - Stripe/PayPal payment gateway
- 🔄 **Email Automation** - Automated booking confirmations and notifications
- 🔄 **Analytics Dashboard** - Advanced booking analytics and reporting
- 🔄 **Multi-language Support** - Sinhala and Tamil translations
- 🔄 **Advanced Search** - Filtering by dates, amenities, and price ranges

---

## 📈 **Roadmap**

### **Phase 1: Core Features** ✅
- Villa room management system
- Professional booking inquiry system
- Admin dashboard with full CRUD operations
- Mobile-first responsive design
- Complete Docker deployment setup

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
- **Dependencies**: Run `npm install` in both root and `server/` directories
- **Database**: Use `docker-compose up postgres -d` for local development
- **Ports**: Ensure ports 3000, 5173, 5432 are available
- **CORS**: API runs on port 3000, frontend on 5173

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
- Test all instructions before publishing

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

**Last Updated**: October 3, 2025
**Version**: 1.0.1
**Status**: ✅ **Production Live**
