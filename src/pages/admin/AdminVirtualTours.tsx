import React, { useState, useEffect } from 'react';
import { virtualToursAPI, roomsAPI } from '../../lib/api';
import ImageUpload from '../../components/ImageUpload';

interface VirtualTour {
  id: number;
  title: string;
  description?: string;
  room_id?: number;
  room?: {
    id: number;
    name: string;
    slug: string;
  };
  tour_type: string;
  thumbnail_url?: string;
  tour_data?: any;
  is_active: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

interface Room {
  id: number;
  name: string;
  slug: string;
}

const AdminVirtualTours: React.FC = () => {
  const [tours, setTours] = useState<VirtualTour[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTour, setEditingTour] = useState<VirtualTour | null>(null);
  const [selectedTourType, setSelectedTourType] = useState<string>('all');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    room_id: '',
    tour_type: '360',
    thumbnail_url: '',
    tour_data: {
      images: [],
      hotspots: []
    },
    is_active: true,
    is_featured: false,
    sort_order: 0,
  });

  const tourTypes = [
    { value: '360', label: '360° Tour' },
    { value: 'video', label: 'Video Tour' },
    { value: 'interactive', label: 'Interactive Tour' }
  ];

  useEffect(() => {
    fetchTours();
    fetchRooms();
  }, [selectedTourType]);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const response = await virtualToursAPI.getAll(
        undefined,
        selectedTourType === 'all' ? undefined : selectedTourType,
        undefined,
        undefined
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

  const fetchRooms = async () => {
    try {
      const response = await roomsAPI.getAll();
      if (response.data.success) {
        setRooms(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching rooms:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        room_id: formData.room_id ? parseInt(formData.room_id) : null,
        tour_data: formData.tour_data
      };

      if (editingTour) {
        await virtualToursAPI.update(editingTour.id, submitData);
      } else {
        await virtualToursAPI.create(submitData);
      }
      
      setShowForm(false);
      setEditingTour(null);
      resetForm();
      fetchTours();
    } catch (err) {
      console.error('Error saving tour:', err);
      setError('Failed to save virtual tour');
    }
  };

  const handleEdit = (tour: VirtualTour) => {
    setEditingTour(tour);
    setFormData({
      title: tour.title,
      description: tour.description || '',
      room_id: tour.room_id?.toString() || '',
      tour_type: tour.tour_type,
      thumbnail_url: tour.thumbnail_url || '',
      tour_data: tour.tour_data || { images: [], hotspots: [] },
      is_active: tour.is_active,
      is_featured: tour.is_featured,
      sort_order: tour.sort_order,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this virtual tour?')) {
      try {
        await virtualToursAPI.delete(id);
        fetchTours();
      } catch (err) {
        console.error('Error deleting tour:', err);
        setError('Failed to delete virtual tour');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      room_id: '',
      tour_type: '360',
      thumbnail_url: '',
      tour_data: {
        images: [],
        hotspots: []
      },
      is_active: true,
      is_featured: false,
      sort_order: 0,
    });
  };

  const handleImageUpload = (url: string) => {
    setFormData(prev => ({ ...prev, thumbnail_url: url }));
  };

  const addTourImage = () => {
    const imageUrl = prompt('Enter image URL:');
    if (imageUrl) {
      setFormData(prev => ({
        ...prev,
        tour_data: {
          ...prev.tour_data,
          images: [...prev.tour_data.images, imageUrl]
        }
      }));
    }
  };

  const removeTourImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tour_data: {
        ...prev.tour_data,
        images: prev.tour_data.images.filter((_, i) => i !== index)
      }
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Virtual Tours Management</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingTour(null);
            resetForm();
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New Tour
        </button>
      </div>

      {/* Tour Type Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedTourType('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedTourType === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Types
        </button>
        {tourTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => setSelectedTourType(type.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedTourType === type.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <div key={tour.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={tour.thumbnail_url || '/images/virtual-tours/placeholder.jpg'}
                alt={tour.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 flex gap-1">
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  {tour.tour_type === '360' ? '360°' : tour.tour_type}
                </span>
                {tour.is_featured && (
                  <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                    Featured
                  </span>
                )}
                {!tour.is_active && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Inactive
                  </span>
                )}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 truncate">{tour.title}</h3>
              {tour.room && (
                <p className="text-sm text-gray-600 mt-1">{tour.room.name}</p>
              )}
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500">
                  Order: {tour.sort_order}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(tour)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(tour.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {tours.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No virtual tours found.</p>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {editingTour ? 'Edit Virtual Tour' : 'Add New Virtual Tour'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tour Type *
                    </label>
                    <select
                      value={formData.tour_type}
                      onChange={(e) => setFormData(prev => ({ ...prev, tour_type: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      {tourTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Room
                  </label>
                  <select
                    value={formData.room_id}
                    onChange={(e) => setFormData(prev => ({ ...prev, room_id: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a room (optional)</option>
                    {rooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Thumbnail URL
                  </label>
                  <ImageUpload
                    onUpload={handleImageUpload}
                    currentImage={formData.thumbnail_url}
                    className="mb-2"
                  />
                  <input
                    type="url"
                    value={formData.thumbnail_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, thumbnail_url: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Or enter thumbnail URL directly"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tour Images
                  </label>
                  <div className="space-y-2">
                    {formData.tour_data.images.map((image, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="url"
                          value={image}
                          onChange={(e) => {
                            const newImages = [...formData.tour_data.images];
                            newImages[index] = e.target.value;
                            setFormData(prev => ({
                              ...prev,
                              tour_data: { ...prev.tour_data, images: newImages }
                            }));
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Image URL"
                        />
                        <button
                          type="button"
                          onClick={() => removeTourImage(index)}
                          className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addTourImage}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Add Image
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sort Order
                    </label>
                    <input
                      type="number"
                      value={formData.sort_order}
                      onChange={(e) => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Active</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Featured</span>
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingTour(null);
                      resetForm();
                    }}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingTour ? 'Update Tour' : 'Add Tour'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVirtualTours;
