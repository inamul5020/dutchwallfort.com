import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { roomsAPI } from '../../lib/api';
import { ArrowLeft, Save } from 'lucide-react';

interface RoomFormData {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  capacity: number;
  beds: string;
  amenities: string[];
  price: string;
  images: string[];
  isActive: boolean;
}

const AdminRoomForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState<RoomFormData>({
    slug: '',
    name: '',
    shortDescription: '',
    longDescription: '',
    capacity: 2,
    beds: '',
    amenities: [],
    price: '0',
    images: [],
    isActive: true,
  });

  const [amenityInput, setAmenityInput] = useState('');
  const [galleryInput, setGalleryInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      fetchRoom();
    }
  }, [id]);

  const fetchRoom = async () => {
    try {
      const response = await roomsAPI.getById(parseInt(id!));
      if (response.data) {
        setFormData({
          slug: response.data.slug || '',
          name: response.data.name || '',
          shortDescription: response.data.shortDescription || '',
          longDescription: response.data.longDescription || '',
          capacity: response.data.capacity || 2,
          beds: response.data.beds || '',
          amenities: response.data.amenities || [],
          price: response.data.price || '0',
          images: response.data.images || [],
          isActive: response.data.isActive !== undefined ? response.data.isActive : true,
        });
      }
    } catch (error) {
      console.error('Error fetching room:', error);
      setError('Failed to load room data');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const dataToSave = {
        slug: formData.slug,
        name: formData.name,
        shortDescription: formData.shortDescription,
        longDescription: formData.longDescription,
        capacity: formData.capacity,
        beds: formData.beds,
        amenities: formData.amenities,
        price: parseFloat(formData.price),
        images: formData.images,
        isActive: formData.isActive,
      };

      if (isEditing) {
        await roomsAPI.update(parseInt(id!), dataToSave);
      } else {
        await roomsAPI.create(dataToSave);
      }

      navigate('/admin/rooms');
    } catch (error: any) {
      console.error('Error saving room:', error);
      setError(error.message || 'Failed to save room');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  const addAmenity = () => {
    if (amenityInput.trim()) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, amenityInput.trim()],
      }));
      setAmenityInput('');
    }
  };

  const removeAmenity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }));
  };

  const addGalleryImage = () => {
    if (galleryInput.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, galleryInput.trim()],
      }));
      setGalleryInput('');
    }
  };

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/rooms')}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Edit Room' : 'Add New Room'}
          </h1>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              required
              value={formData.slug}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              placeholder="deluxe-family-room"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Capacity
            </label>
            <input
              type="number"
              name="capacity"
              required
              min="1"
              value={formData.capacity}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Beds
            </label>
            <input
              type="text"
              name="beds"
              required
              value={formData.beds}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              placeholder="1 double bed + 2 single beds"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price From (LKR)
            </label>
            <input
              type="number"
              name="price"
              required
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleCheckbox}
                className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <span>Room is Active</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Short Description
          </label>
          <input
            type="text"
            name="shortDescription"
            required
            value={formData.shortDescription}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Long Description
          </label>
          <textarea
            name="longDescription"
            required
            rows={4}
            value={formData.longDescription}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amenities
          </label>
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              value={amenityInput}
              onChange={(e) => setAmenityInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              placeholder="Add amenity and press Enter"
            />
            <button
              type="button"
              onClick={addAmenity}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.amenities.map((amenity, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800"
              >
                {amenity}
                <button
                  type="button"
                  onClick={() => removeAmenity(index)}
                  className="ml-2 text-amber-600 hover:text-amber-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gallery Images
          </label>
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              value={galleryInput}
              onChange={(e) => setGalleryInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGalleryImage())}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              placeholder="Image path (e.g., /images/room1.jpg)"
            />
            <button
              type="button"
              onClick={addGalleryImage}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Add
            </button>
          </div>
          <div className="space-y-2">
            {formData.images.map((image, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
              >
                <span className="text-sm text-gray-700">{image}</span>
                <button
                  type="button"
                  onClick={() => removeGalleryImage(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/rooms')}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 inline-flex items-center disabled:opacity-50"
          >
            <Save size={20} className="mr-2" />
            {isLoading ? 'Saving...' : 'Save Room'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminRoomForm;
