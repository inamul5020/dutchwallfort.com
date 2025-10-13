import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Rooms', href: '/rooms' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Local Area', href: '/local-area' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/' && location.pathname === '/') return true;
    if (href !== '/' && location.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo - Mobile first */}
          <div className="flex-shrink-0">
            <Link to="/" className="block">
              <img
                src="/logo_.png"
                alt="Dutch Wall Fort"
                className="h-8 w-auto sm:h-10 md:h-12 lg:h-14"
                loading="eager"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
                  isActive(item.href)
                    ? 'text-amber-800 border-b-2 border-amber-800'
                    : 'text-gray-700 hover:text-amber-800 hover:bg-amber-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Phone Button - Desktop */}
          <div className="hidden lg:flex items-center">
            <a
              href="tel:+94765721495"
              className="bg-amber-800 text-white px-4 py-2 rounded-full font-medium hover:bg-amber-900 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg"
            >
              <Phone size={16} />
              <span className="hidden xl:inline">+94 76 572 1495</span>
              <span className="xl:hidden">Call</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-amber-800 hover:bg-gray-100 rounded-md transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-3 text-base font-medium transition-all duration-200 rounded-lg ${
                    isActive(item.href)
                      ? 'text-amber-800 bg-amber-50 border-l-4 border-amber-800'
                      : 'text-gray-700 hover:text-amber-800 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile CTA */}
              <div className="pt-4 border-t border-gray-200">
                <a
                  href="tel:+94765721495"
                  className="w-full bg-amber-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-900 transition-colors duration-200 flex items-center justify-center space-x-2 shadow-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Phone size={18} />
                  <span>📞 +94 76 572 1495</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;