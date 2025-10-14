import React from 'react';
import Gallery from '../components/Gallery';

const GalleryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Property Gallery
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto leading-relaxed">
              Discover the beauty and elegance of Dutch Wall Fort through our stunning collection of photographs
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Our Spaces
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From elegant interiors to charming exteriors, discover every corner of our historic property
          </p>
        </div>
        
        <Gallery 
          showCategories={true}
          className="mb-16"
        />

        {/* Featured Images Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Featured Highlights
            </h3>
            <p className="text-gray-600">
              Our most stunning spaces and memorable moments
            </p>
          </div>
          <Gallery 
            featured={true}
            limit={8}
            showCategories={false}
          />
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Dutch Wall Fort?
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-3xl mx-auto">
            Book your stay and create unforgettable memories in this historic gem of Galle Fort
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

export default GalleryPage;