import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, ExternalLink, Star, Clock, DollarSign } from 'lucide-react';

interface Attraction {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  website?: string;
  rating?: number;
  image_url?: string;
  price_range?: string;
  distance?: number;
  is_featured: boolean;
}

interface AttractionsMapProps {
  attractions: Attraction[];
  center?: { lat: number; lng: number };
  zoom?: number;
  className?: string;
}

const AttractionsMap: React.FC<AttractionsMapProps> = ({ 
  attractions, 
  center = { lat: 6.0535, lng: 80.2211 }, // Galle Fort coordinates
  zoom = 15,
  className = '' 
}) => {
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // Filter attractions with coordinates
  const attractionsWithCoords = attractions.filter(attraction => 
    attraction.latitude && attraction.longitude
  );

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      historical: 'bg-red-500',
      cultural: 'bg-blue-500',
      religious: 'bg-purple-500',
      natural: 'bg-green-500',
      shopping: 'bg-yellow-500',
      dining: 'bg-orange-500',
      entertainment: 'bg-pink-500',
    };
    return colors[category] || 'bg-gray-500';
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      historical: '🏛️',
      cultural: '🎭',
      religious: '⛪',
      natural: '🌿',
      shopping: '🛍️',
      dining: '🍽️',
      entertainment: '🎪',
    };
    return icons[category] || '📍';
  };

  const openGoogleMaps = (attraction: Attraction) => {
    if (attraction.latitude && attraction.longitude) {
      const url = `https://www.google.com/maps?q=${attraction.latitude},${attraction.longitude}`;
      window.open(url, '_blank');
    }
  };

  const getDirections = (attraction: Attraction) => {
    if (attraction.latitude && attraction.longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${attraction.latitude},${attraction.longitude}`;
      window.open(url, '_blank');
    }
  };

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!mapLoaded) {
    return (
      <div className={`flex items-center justify-center h-96 bg-gray-100 rounded-lg ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Map Container */}
      <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
        {/* Google Maps Embed */}
        <iframe
          src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dOWWgUjqVUJ0xY&center=${center.lat},${center.lng}&zoom=${zoom}&maptype=roadmap`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Attractions Map"
        ></iframe>
        
        {/* Overlay for attraction markers */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Map Center Marker */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-lg"></div>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-red-600 bg-white px-2 py-1 rounded shadow">
              Dutch Wall Fort
            </div>
          </div>

          {/* Attraction Markers */}
          {attractionsWithCoords.map((attraction, index) => {
            // Simulate positioning around center
            const angle = (index * 45) % 360;
            const distance = 30 + (index % 3) * 15;
            const x = 50 + Math.cos(angle * Math.PI / 180) * distance;
            const y = 50 + Math.sin(angle * Math.PI / 180) * distance;

            return (
              <div
                key={attraction.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                }}
                onClick={() => setSelectedAttraction(attraction)}
              >
                <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-xs ${getCategoryColor(attraction.category)}`}>
                  {getCategoryIcon(attraction.category)}
                </div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="text-xs font-semibold text-gray-800 bg-white px-2 py-1 rounded shadow whitespace-nowrap">
                    {attraction.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Map Legend */}
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 max-w-xs">
          <h4 className="font-semibold text-gray-900 mb-2">Attractions</h4>
          <div className="space-y-1">
            {Array.from(new Set(attractionsWithCoords.map(a => a.category))).map(category => (
              <div key={category} className="flex items-center space-x-2 text-sm">
                <div className={`w-3 h-3 rounded-full ${getCategoryColor(category)}`}></div>
                <span className="text-gray-700 capitalize">{category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attraction Details Modal */}
      {selectedAttraction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedAttraction.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full text-white ${getCategoryColor(selectedAttraction.category)}`}>
                      {selectedAttraction.category}
                    </span>
                    {selectedAttraction.is_featured && (
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-500 text-white">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAttraction(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {selectedAttraction.image_url && (
                <img
                  src={selectedAttraction.image_url}
                  alt={selectedAttraction.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}

              <p className="text-gray-700 mb-4">{selectedAttraction.description}</p>

              <div className="space-y-3">
                {selectedAttraction.address && (
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <span className="text-gray-700">{selectedAttraction.address}</span>
                  </div>
                )}

                {selectedAttraction.phone && (
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-700">{selectedAttraction.phone}</span>
                  </div>
                )}

                {selectedAttraction.rating && (
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="text-gray-700">{selectedAttraction.rating}/5</span>
                  </div>
                )}

                {selectedAttraction.price_range && (
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{selectedAttraction.price_range}</span>
                  </div>
                )}

                {selectedAttraction.distance && (
                  <div className="flex items-center space-x-2">
                    <Navigation className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{selectedAttraction.distance} km from Dutch Wall Fort</span>
                  </div>
                )}
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => getDirections(selectedAttraction)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttractionsMap;
