import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleries = {
    exterior: [
      {
        url: "/images/Exterior_1.jpg",
        caption: "Front façade of Dutch Wall Fort, Church Street entrance"
      },
      {
        url: "/images/Exterior_2.jpg",
        caption: "Colonial architecture details and entrance"
      },
      {
        url: "/images/Exterior_3.jpg",
        caption: "Beautiful exterior architecture"
      },
      {
        url: "/images/Exterior_4.jpg",
        caption: "Villa entrance and facade details"
      },
      {
        url: "/images/Exterior_5.jpg",
        caption: "Street view from Church Street"
      },
      {
        url: "/images/Exterior_6.jpg",
        caption: "Dutch colonial architecture"
      }
    ],
    rooms: [
      {
        url: "/images/bedroom1_1.jpg",
        caption: "Deluxe Family Room with garden view"
      },
      {
        url: "/images/bedroom2_1.jpg",
        caption: "Superior Room with private entrance"
      },
      {
        url: "/images/bedroom3_1.jpg",
        caption: "Standard Room with comfortable double bed"
      },
      {
        url: "/images/bedroom4_1.jpg",
        caption: "Premium Room with luxury amenities"
      },
      {
        url: "/images/bathroom1.jpg",
        caption: "Private bathroom with modern amenities"
      },
      {
        url: "/images/bathroom2.jpg",
        caption: "Clean and modern bathroom facilities"
      },
      {
        url: "/images/bathroom3.jpg",
        caption: "Well-appointed private bathrooms"
      }
    ],
    terrace: [
      {
        url: "/images/balcony_1.jpg",
        caption: "Private balcony with garden view"
      },
      {
        url: "/images/balcony_2.jpg",
        caption: "Peaceful balcony seating area"
      },
      {
        url: "/images/balcony_3.jpg",
        caption: "Balcony with morning light"
      }
    ],
    dining: [
      {
        url: "/images/dining area_1.jpg",
        caption: "Comfortable dining area"
      },
      {
        url: "/images/dining area_2.jpg",
        caption: "Breakfast dining space"
      },
      {
        url: "/images/dining area_3.jpg",
        caption: "Elegant dining area setup"
      },
      {
        url: "/images/dining area_4.jpg",
        caption: "Dining area with natural light"
      }
    ],
    common: [
      {
        url: "/images/livingroom.jpg",
        caption: "Comfortable living room area"
      },
      {
        url: "/images/livingroom_1.jpg",
        caption: "Cozy common living space"
      },
      {
        url: "/images/kitchen_1.jpg",
        caption: "Well-equipped kitchen facilities"
      },
      {
        url: "/images/kitchen_2.jpg",
        caption: "Modern kitchen amenities"
      }
    ],
    extras: [
      {
        url: "/images/extra photo_1.jpg",
        caption: "Additional villa features"
      },
      {
        url: "/images/extra photo_2.jpg",
        caption: "Beautiful interior details"
      },
      {
        url: "/images/extra photo_3.jpg",
        caption: "Charming villa atmosphere"
      },
      {
        url: "/images/extra photo_4.jpg",
        caption: "Comfortable accommodations"
      },
      {
        url: "/images/extra photo_5.jpg",
        caption: "Dutch Wall Fort amenities"
      },
      {
        url: "/images/extra photo_6.jpg",
        caption: "Quality furnishings and decor"
      }
    ]
  };

  const allImages = Object.values(galleries).flat();

  const openLightbox = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setCurrentImageIndex(allImages.findIndex(img => img.url === imageUrl));
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    const prevIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(allImages[prevIndex].url);
  };

  const goToNext = () => {
    const nextIndex = (currentImageIndex + 1) % allImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(allImages[nextIndex].url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      goToPrevious();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-800 to-amber-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Gallery</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Explore Dutch Wall Fort through our photo gallery - from comfortable rooms 
            to the historic charm of Galle Fort surroundings
          </p>
        </div>
      </section>

      {/* Gallery Sections */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Exterior */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Exterior & Entrance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleries.exterior.map((image, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                  onClick={() => openLightbox(image.url)}
                >
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                      {image.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rooms */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Rooms & Accommodations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {galleries.rooms.map((image, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                  onClick={() => openLightbox(image.url)}
                >
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                      {image.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Terrace & Garden */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Terrace & Garden</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleries.terrace.map((image, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                  onClick={() => openLightbox(image.url)}
                >
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                      {image.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Breakfast */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Dining Areas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleries.dining.map((image, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                  onClick={() => openLightbox(image.url)}
                >
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                      {image.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Surroundings */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Areas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleries.common.map((image, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                  onClick={() => openLightbox(image.url)}
                >
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                      {image.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fort Street Views */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Photos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleries.extras.map((image, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                  onClick={() => openLightbox(image.url)}
                >
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                      {image.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Image Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200 z-10"
          >
            <X size={32} />
          </button>

          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200 z-10"
          >
            <ChevronLeft size={48} />
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200 z-10"
          >
            <ChevronRight size={48} />
          </button>

          {/* Image */}
          <div className="relative max-w-4xl max-h-full flex flex-col items-center">
            <img
              src={selectedImage}
              alt="Gallery image"
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            
            {/* Caption */}
            <div className="bg-black bg-opacity-50 text-white p-4 rounded-b-lg max-w-full">
              <p className="text-center">{allImages[currentImageIndex]?.caption}</p>
              <p className="text-center text-sm text-gray-300 mt-2">
                {currentImageIndex + 1} of {allImages.length}
              </p>
            </div>
          </div>

          {/* Instructions */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm text-center">
            <p>Use arrow keys or click arrows to navigate • ESC to close</p>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-amber-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Experience Dutch Wall Fort
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            See these beautiful spaces in person during your stay with us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-amber-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Book Your Stay
            </a>
            <a
              href="/rooms"
              className="border-2 border-white text-white hover:bg-white hover:text-amber-600 px-8 py-3 rounded-full font-semibold text-lg transition-colors duration-200"
            >
              View Our Rooms
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;