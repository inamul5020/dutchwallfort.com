import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Wifi, Wind, Bath, Coffee, Users, Star, ArrowRight, Calendar, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import Testimonials from '../components/Testimonials';

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const heroImages = [
    {
      url: '/images/Exterior_1.jpg',
      alt: 'Dutch Wall Fort - Beautiful colonial facade on Church Street'
    },
    {
      url: '/images/Exterior_3.jpg',
      alt: 'Dutch Wall Fort - Historic architecture and charm'
    },
    {
      url: '/images/balcony_2.jpg',
      alt: 'Dutch Wall Fort - Serene balcony overlooking the garden'
    },
    {
      url: '/images/livingroom.jpg',
      alt: 'Dutch Wall Fort - Elegant interior with modern comfort'
    },
    {
      url: '/images/dining area_1.jpg',
      alt: 'Dutch Wall Fort - Inviting dining area for memorable meals'
    }
  ];

  // Auto-change images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % heroImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % heroImages.length
    );
  };

  const featuredRooms = [
    {
      id: "deluxe-family-room",
      name: "Deluxe Family Room",
      description: "Spacious family room with balcony and garden view",
      capacity: 4,
      beds: "1 double + 2 singles",
      priceFrom: "15,000",
      image: "/images/bedroom1_1.jpg"
    },
    {
      id: "superior-room", 
      name: "Superior Room",
      description: "Comfortable room with private entrance",
      capacity: 3,
      beds: "1 double + 1 single",
      priceFrom: "12,000",
      image: "/images/bedroom2_1.jpg"
    },
    {
      id: "standard-room",
      name: "Standard Room", 
      description: "Cozy room with all essential amenities",
      capacity: 2,
      beds: "1 double bed",
      priceFrom: "9,000",
      image: "/images/bedroom3_1.jpg"
    }
  ];

  const quickFacts = [
    { icon: MapPin, text: "73 Church St (in Fort)" },
    { icon: Coffee, text: "Free breakfast" },
    { icon: Wifi, text: "Free Wi-Fi" },
    { icon: Wind, text: "Air conditioning" },
    { icon: Bath, text: "Private bathrooms" },
    { icon: Users, text: "Family rooms" }
  ];

  const whyChooseUs = [
    {
      title: "Family Hospitality",
      description: "Personal service and warm welcome from our local family team"
    },
    {
      title: "Dutch Colonial Charm",
      description: "Historic architecture beautifully preserved with modern comforts"
    },
    {
      title: "Prime Location",
      description: "Walking distance to Lighthouse, Pedlar Street & Fort attractions"
    }
  ];

  const guestPraise = [
    {
      quote: "Amazing location inside the Fort, breakfast was delightful.",
      author: "Sara, UK",
      source: "TripAdvisor"
    },
    {
      quote: "Friendly staff and clean rooms. Highly recommended.",
      author: "Priya, India", 
      source: "Agoda"
    },
    {
      quote: "Perfect base for exploring Galle. Great hospitality!",
      author: "Michael, Australia",
      source: "Airbnb"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Mobile First */}
      <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Image Carousel Background */}
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('${image.url}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ))}

        {/* Navigation Arrows - Hidden on mobile, visible on larger screens */}
        <button
          onClick={goToPrevious}
          className="hidden sm:flex absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-3 rounded-full transition-all duration-200 z-10 group"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} className="group-hover:scale-110 transition-transform duration-200" />
        </button>

        <button
          onClick={goToNext}
          className="hidden sm:flex absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-3 rounded-full transition-all duration-200 z-10 group"
          aria-label="Next image"
        >
          <ChevronRight size={24} className="group-hover:scale-110 transition-transform duration-200" />
        </button>

        {/* Hero Content - Mobile First */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="block sm:hidden">Dutch Wall Fort</span>
            <span className="hidden sm:block">Dutch Wall Fort — Luxury Boutique Villa</span>
            <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal text-amber-200 mt-2">
              in the Heart of Galle Fort
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
            <span className="block sm:hidden">Comfortable family rooms • Free breakfast • Near attractions</span>
            <span className="hidden sm:block">Comfortable family rooms • Complimentary Sri Lankan breakfast • Steps from Pedlar Street</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Link
              to="/contact"
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-200 inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              <Calendar className="mr-2" size={18} />
              Check Availability
            </Link>
            <Link
              to="/rooms"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-200 inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              View Rooms
            </Link>
          </div>
        </div>

        {/* Carousel Indicators - Mobile first design */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? 'bg-white scale-125 shadow-lg'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75 hover:scale-110'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile swipe hint */}
        <div className="absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 z-10">
          <p className="text-white text-xs sm:text-sm bg-black bg-opacity-30 px-3 py-1 rounded-full opacity-75">
            <span className="sm:hidden">Swipe to explore</span>
            <span className="hidden sm:inline">Use arrows to navigate</span>
          </p>
        </div>
      </section>

      {/* Quick Facts Strip - Mobile First */}
      <section className="py-8 sm:py-12 md:py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 md:mb-12">
            Why Stay With Us
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
            {quickFacts.map((fact, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md group-hover:shadow-lg transition-shadow duration-200">
                  <fact.icon className="text-amber-600 w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <p className="text-gray-700 font-medium text-xs sm:text-sm leading-tight">{fact.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Mobile First */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why Choose Dutch Wall Fort
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Experience the perfect blend of historic charm and modern comfort in the heart of Galle Fort
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {whyChooseUs.map((reason, index) => (
              <div key={index} className="text-center p-4 sm:p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">{reason.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rooms - Mobile First */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Our Featured Rooms
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Comfortable accommodations combining Dutch colonial charm with modern amenities
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredRooms.map((room) => (
              <div key={room.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                <div className="relative h-48 sm:h-56 md:h-64">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-amber-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium shadow-lg">
                    From LKR {room.priceFrom}
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{room.name}</h3>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed h-10 sm:h-12 overflow-hidden">
                    {room.description}
                  </p>

                  <div className="flex items-center text-gray-600 mb-4 text-xs sm:text-sm">
                    <Users size={14} className="mr-2 text-amber-600 flex-shrink-0" />
                    <span className="leading-tight">
                      <span className="block sm:inline">Up to {room.capacity} guests</span>
                      <span className="hidden sm:inline"> • </span>
                      <span className="block sm:inline">{room.beds}</span>
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Link
                      to={`/rooms/${room.id}`}
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white text-center py-2.5 px-4 rounded-md font-medium transition-all duration-200 inline-flex items-center justify-center text-sm sm:text-base hover:shadow-md"
                    >
                      View Details
                      <ArrowRight size={14} className="ml-2" />
                    </Link>
                    <Link
                      to="/contact"
                      className="flex-1 border border-amber-600 text-amber-600 hover:bg-amber-50 text-center py-2.5 px-4 rounded-md font-medium transition-all duration-200 text-sm sm:text-base hover:shadow-md"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guest Praise - Mobile First */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              What Our Guests Say
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Real reviews from verified guests
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {guestPraise.map((review, index) => (
              <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-md border-l-4 border-amber-600 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center mb-3 sm:mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="text-yellow-400 fill-current w-3 h-3 sm:w-4 sm:h-4" />
                  ))}
                </div>
                <p className="text-gray-700 mb-3 sm:mb-4 italic text-sm sm:text-base leading-relaxed">
                  "{review.quote}"
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <span className="font-medium text-gray-900 text-sm sm:text-base">— {review.author}</span>
                  <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {review.source}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Link
              to="/reviews"
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-200 inline-flex items-center hover:shadow-lg transform hover:scale-105 active:scale-95"
            >
              Read More Reviews
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Map & Location - Mobile First */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Perfect Location
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Located on historic Church Street in the heart of Galle Fort, a UNESCO World Heritage site.
                Everything you need is within walking distance.
              </p>

              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex items-start">
                  <MapPin className="text-amber-600 mr-3 mt-0.5 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-gray-700 text-sm sm:text-base">Galle Lighthouse - 5 min walk</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="text-amber-600 mr-3 mt-0.5 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-gray-700 text-sm sm:text-base">Pedlar Street - 2 min walk</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="text-amber-600 mr-3 mt-0.5 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-gray-700 text-sm sm:text-base">Fort Ramparts - 3 min walk</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="text-amber-600 mr-3 mt-0.5 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-gray-700 text-sm sm:text-base">Koggala Airport - 35-40 min drive</span>
                </div>
              </div>

              <a
                href="https://maps.app.goo.gl/zvuY69dauMw9wqXY8"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-200 inline-flex items-center hover:shadow-lg transform hover:scale-105 active:scale-95 text-sm sm:text-base"
              >
                <MapPin size={16} className="mr-2" />
                Get Directions
              </a>
            </div>

            <div className="order-1 lg:order-2 bg-gray-100 h-64 sm:h-80 md:h-96 rounded-lg flex items-center justify-center shadow-inner">
              <div className="text-center text-gray-600 p-4">
                <MapPin size={32} className="sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-amber-600" />
                <p className="text-base sm:text-lg font-semibold mb-2">Interactive Map</p>
                <p className="mb-4">73 Church Street, Galle Fort, Sri Lanka</p>
                <a
                  href="https://maps.app.goo.gl/zvuY69dauMw9wqXY8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 hover:text-amber-800 font-medium"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Testimonials 
            featuredOnly={true} 
            maxItems={3} 
            showNavigation={true}
          />
        </div>
      </section>

      {/* Booking CTA - Mobile First */}
      <section className="py-12 sm:py-16 md:py-20 bg-amber-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Ready to Experience Dutch Wall Fort?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-amber-100 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Have questions? Send an inquiry and we'll get back to you within 24 hours
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Link
              to="/contact"
              className="bg-white text-amber-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-gray-100 transition-all duration-200 inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              <Calendar size={18} className="mr-2" />
              Send Booking Inquiry
            </Link>
            <a
              href="tel:+94765721495"
              className="border-2 border-white text-white hover:bg-white hover:text-amber-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-200 inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              <Phone size={18} className="mr-2" />
              <span className="hidden sm:inline">Call: </span>+94 76 572 1495
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;