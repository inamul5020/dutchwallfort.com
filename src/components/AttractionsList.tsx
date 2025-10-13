import React, { useState, useEffect } from 'react';
import { MapPin, Star, Clock, DollarSign, ExternalLink, Search, Filter } from 'lucide-react';
import { attractionsAPI } from '../lib/api';
import AttractionsMap from './AttractionsMap';

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
  gallery?: string[];
}

interface AttractionsListProps {
  category?: string;
  featured?: boolean;
  limit?: number;
  showMap?: boolean;
  showSearch?: boolean;
  className?: string;
}

const AttractionsList: React.FC<AttractionsListProps> = ({ 
  category, 
  featured, 
  limit, 
  showMap = true,
  showSearch = true,
  className = '' 
}) => {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(category || 'all');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const categories = [
    { value: 'all', label: 'All Attractions' },
    { value: 'historical', label: 'Historical' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'religious', label: 'Religious' },
    { value: 'natural', label: 'Natural' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'dining', label: 'Dining' },
    { value: 'entertainment', label: 'Entertainment' }
  ];

  useEffect(() => {
    fetchAttractions();
  }, [selectedCategory, searchTerm]);

  const fetchAttractions = async () => {
    try {
      setLoading(true);
      const response = await attractionsAPI.getAll(
        selectedCategory === 'all' ? undefined : selectedCategory,
        featured,
        true, // active only
        limit,
        searchTerm || undefined
      );

      if (response.data.success) {
        setAttractions(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching attractions:', err);
      setError('Failed to load attractions');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      historical: 'bg-red-100 text-red-800',
      cultural: 'bg-blue-100 text-blue-800',
      religious: 'bg-purple-100 text-purple-800',
      natural: 'bg-green-100 text-green-800',
      shopping: 'bg-yellow-100 text-yellow-800',
      dining: 'bg-orange-100 text-orange-800',
      entertainment: 'bg-pink-100 text-pink-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
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

  return (
    <div className={className}>
      {/* Search and Filters */}
      {showSearch && (
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search attractions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-600">
                {attractions.length} attraction{attractions.length !== 1 ? 's' : ''} found
              </span>
            </div>
            
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'map'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Map View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {viewMode === 'map' && showMap ? (
        <AttractionsMap 
          attractions={attractions}
          className="mb-8"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.map((attraction) => (
            <div
              key={attraction.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              <div className="aspect-video relative">
                <img
                  src={attraction.image_url || '/images/attractions/placeholder.jpg'}
                  alt={attraction.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(attraction.category)}`}>
                    {getCategoryIcon(attraction.category)} {attraction.category}
                  </span>
                  {attraction.is_featured && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-500 text-white">
                      Featured
                    </span>
                  )}
                </div>
                {attraction.rating && (
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs font-medium">{attraction.rating}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{attraction.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{attraction.description}</p>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  {attraction.address && (
                    <div className="flex items-start space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-1">{attraction.address}</span>
                    </div>
                  )}
                  
                  {attraction.distance && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="w-4 h-4 flex-shrink-0">📍</span>
                      <span>{attraction.distance} km from Dutch Wall Fort</span>
                    </div>
                  )}

                  {attraction.price_range && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <DollarSign className="w-4 h-4 flex-shrink-0" />
                      <span>{attraction.price_range}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  {attraction.website && (
                    <a
                      href={attraction.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center space-x-1"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Visit</span>
                    </a>
                  )}
                  {attraction.latitude && attraction.longitude && (
                    <a
                      href={`https://www.google.com/maps?q=${attraction.latitude},${attraction.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium flex items-center justify-center space-x-1"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>Map</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {attractions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No attractions found.</p>
        </div>
      )}
    </div>
  );
};

export default AttractionsList;
