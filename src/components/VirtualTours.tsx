import React, { useState, useEffect } from 'react';
import { Play, Eye, Maximize2 } from 'lucide-react';
import { virtualToursAPI } from '../lib/api';
import VirtualTourViewer from './VirtualTourViewer';

interface VirtualTour {
  id: number;
  title: string;
  description?: string;
  tour_type: string;
  thumbnail_url?: string;
  tour_data?: any;
  room?: {
    id: number;
    name: string;
    slug: string;
  };
  is_featured: boolean;
}

interface VirtualToursProps {
  roomId?: number;
  tourType?: string;
  featured?: boolean;
  limit?: number;
  showRoomInfo?: boolean;
  className?: string;
}

const VirtualTours: React.FC<VirtualToursProps> = ({ 
  roomId, 
  tourType, 
  featured, 
  limit, 
  showRoomInfo = true,
  className = '' 
}) => {
  const [tours, setTours] = useState<VirtualTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTour, setSelectedTour] = useState<VirtualTour | null>(null);

  useEffect(() => {
    fetchTours();
  }, [roomId, tourType, featured, limit]);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const response = await virtualToursAPI.getAll(
        roomId,
        tourType,
        featured,
        true, // active only
        limit
      );

      if (response.data.success) {
        setTours(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching virtual tours:', err);
      setError('Failed to load virtual tours');
    } finally {
      setLoading(false);
    }
  };

  const openTour = (tour: VirtualTour) => {
    setSelectedTour(tour);
  };

  const closeTour = () => {
    setSelectedTour(null);
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (tours.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className="text-gray-500">No virtual tours available.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <div
            key={tour.id}
            className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => openTour(tour)}
          >
            <div className="aspect-video relative">
              <img
                src={tour.thumbnail_url || '/images/virtual-tours/placeholder.jpg'}
                alt={tour.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center space-x-2">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                      <Maximize2 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tour Type Badge */}
              <div className="absolute top-2 left-2">
                <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                  {tour.tour_type === '360' ? '360°' : tour.tour_type}
                </span>
              </div>

              {/* Featured Badge */}
              {tour.is_featured && (
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 bg-yellow-500 text-white text-xs rounded-full">
                    Featured
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 text-lg mb-2">{tour.title}</h3>
              {tour.description && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{tour.description}</p>
              )}
              
              {showRoomInfo && tour.room && (
                <div className="flex items-center text-sm text-gray-500">
                  <Eye className="w-4 h-4 mr-1" />
                  <span>{tour.room.name}</span>
                </div>
              )}
              
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Click to view tour
                </span>
                <div className="flex items-center space-x-1 text-blue-600">
                  <Play className="w-4 h-4" />
                  <span className="text-sm font-medium">Start Tour</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Virtual Tour Modal */}
      {selectedTour && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <VirtualTourViewer
            tour={selectedTour}
            onClose={closeTour}
            className="w-full h-full max-w-6xl max-h-[90vh]"
          />
        </div>
      )}
    </div>
  );
};

export default VirtualTours;
