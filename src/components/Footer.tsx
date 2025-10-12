import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand & Description - Mobile First */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link to="/" className="inline-block">
              <img
                src="/logo_.png"
                alt="Dutch Wall Fort"
                className="h-6 w-auto sm:h-8 md:h-10 mb-3 sm:mb-4 hover:opacity-80 transition-opacity duration-200"
                loading="lazy"
              />
            </Link>
            <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed max-w-md">
              Luxury boutique villa in the heart of Galle Fort. Family rooms with private bathrooms,
              AC and complimentary Sri Lankan breakfast. Steps from Pedlar Street & the Lighthouse.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a
                href="https://www.facebook.com/dutchwallfort/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-amber-400 transition-all duration-200 p-2 rounded-full hover:bg-gray-800"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={20} className="sm:w-6 sm:h-6" />
              </a>
              <a
                href="https://www.instagram.com/dutch__wall/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-amber-400 transition-all duration-200 p-2 rounded-full hover:bg-gray-800"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={20} className="sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>

          {/* Contact Info - Mobile Optimized */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-amber-400 mb-3 sm:mb-4">Contact Us</h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-amber-400 mt-1 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                <div className="text-xs sm:text-sm">
                  <p className="text-gray-300 leading-tight">73 Church St</p>
                  <p className="text-gray-300 leading-tight">Galle, Sri Lanka</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-amber-400 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                <a
                  href="tel:+94765721495"
                  className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-xs sm:text-sm font-medium"
                >
                  +94 76 572 1495
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-amber-400 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                <a
                  href="mailto:reservations@dutchwallfort.com"
                  className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-xs sm:text-sm break-all"
                >
                  reservations@dutchwallfort.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links - Mobile First */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-amber-400 mb-3 sm:mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <Link
                to="/rooms"
                className="block text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm sm:text-base py-1"
              >
                Our Rooms
              </Link>
              <Link
                to="/gallery"
                className="block text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm sm:text-base py-1"
              >
                Gallery
              </Link>
              <Link
                to="/local-area"
                className="block text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm sm:text-base py-1"
              >
                Local Area
              </Link>
              <Link
                to="/policies"
                className="block text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm sm:text-base py-1"
              >
                Policies & FAQ
              </Link>
              <a
                href="https://www.tripadvisor.com/Hotel_Review-g297896-d20861642-Reviews-Dutch_Wall_Fort-Galle_Galle_District_Southern_Province.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm sm:text-base py-1"
              >
                TripAdvisor Reviews
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Section - Mobile First */}
        <div className="border-t border-gray-700 mt-6 sm:mt-8 md:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              © {currentYear} Dutch Wall Fort. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-xs sm:text-sm">
              <Link to="/contact" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">
                Contact
              </Link>
              <span className="text-gray-600">•</span>
              <Link to="/policies" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;