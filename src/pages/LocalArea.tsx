import React from 'react';
import { MapPin, Clock, Star, Navigation, ExternalLink } from 'lucide-react';
import AttractionsList from '../components/AttractionsList';

const LocalArea: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Explore Galle Fort & Surroundings
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto leading-relaxed">
              Discover the rich history, culture, and attractions that make Galle Fort a UNESCO World Heritage Site
            </p>
          </div>
        </div>
      </div>

      {/* Quick Info Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Galle Fort is Special
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A unique blend of history, culture, and natural beauty that captivates every visitor
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">UNESCO Heritage Site</h3>
              <p className="text-gray-600 leading-relaxed">
                Galle Fort is a living museum of colonial architecture and culture, recognized by UNESCO since 1988.
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">400+ Years of History</h3>
              <p className="text-gray-600 leading-relaxed">
                From Portuguese fortifications to Dutch colonial buildings, experience centuries of history.
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Rich Culture</h3>
              <p className="text-gray-600 leading-relaxed">
                Art galleries, boutique shops, cafes, and restaurants create a vibrant cultural hub.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Attractions */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Attractions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the must-visit places around Galle Fort, from historic landmarks to cultural experiences
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <AttractionsList 
              featured={true}
              limit={6}
              showMap={true}
              showSearch={true}
            />
          </div>
        </div>
      </div>

      {/* All Attractions */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All Attractions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our complete guide to Galle Fort and surrounding areas
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-2xl shadow-lg p-8">
            <AttractionsList 
              showMap={true}
              showSearch={true}
            />
          </div>
        </div>
      </div>

      {/* Getting Around Section */}
      <div className="py-16 bg-gradient-to-br from-amber-50 to-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Getting Around Galle Fort
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about exploring the area
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Navigation className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Walking Tours</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                The best way to explore Galle Fort is on foot. Most attractions are within walking distance.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🚗</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Tuk-tuks</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Traditional three-wheelers are perfect for short trips around the fort and nearby areas.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🚌</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Buses</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Public buses connect Galle Fort to other parts of Galle and nearby towns.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🚕</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Taxis</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Private taxis are available for comfortable travel to attractions further away.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Explore Galle Fort?
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-3xl mx-auto">
            Book your stay at Dutch Wall Fort and immerse yourself in this historic UNESCO World Heritage Site
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/rooms"
              className="bg-white text-amber-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View Rooms
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-amber-600 transition-all duration-300 transform hover:scale-105"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalArea;