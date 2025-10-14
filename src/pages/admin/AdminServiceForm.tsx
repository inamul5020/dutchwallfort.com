import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { servicesAPI } from '../../lib/api';
import { ArrowLeft, Save } from 'lucide-react';

interface ServiceFormData {
  slug: string;
  name: string;
  description: string;
  category: string;
  duration: string;
  price_from: number;
  price_currency: string;
  features: string[];
  is_active: boolean;
}

const AdminServiceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState<ServiceFormData>({
    slug: '',
    name: '',
    description: '',
    category: 'tours',
    duration: '',
    price_from: 0,
    price_currency: 'LKR',
    features: [],
    is_active: true,
  });

  const [featureInput, setFeatureInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    { value: 'tours', label: 'Tours & Excursions' },
    { value: 'transport', label: 'Transportation' },
    { value: 'exchange', label: 'Currency Exchange' },
    { value: 'other', label: 'Other Services' },
  ];

  useEffect(() => {
    if (isEditing) {
      fetchService();
    }
  }, [id]);

  const fetchService = async () => {
    try {
      const response = await servicesAPI.getById(parseInt(id!));
      if (response.data?.data) {
        const serviceData = response.data.data;
        setFormData({
          name: serviceData.name || '',
          description: serviceData.description || '',
          price: serviceData.price || '',
          price_currency: serviceData.price_currency || 'LKR',
          category: serviceData.category || '',
          is_active: serviceData.is_active || false,
        });
      }
    } catch (error) {
      console.error('Error fetching service:', error);
      setError('Failed to load service data');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const dataToSave = {
        ...formData,
        updated_at: new Date().toISOString(),
      };

      if (isEditing) {
        await servicesAPI.update(parseInt(id!), dataToSave);
      } else {
        await servicesAPI.create(dataToSave);
      }

      navigate('/admin/services');
    } catch (error: any) {
      console.error('Error saving service:', error);
      setError(error.message || 'Failed to save service');
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

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }));
      setFeatureInput('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/services')}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Edit Service' : 'Add New Service'}
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
              Service Name
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
              placeholder="galle-day-tour"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              placeholder="1 day, 3 hours, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price From
            </label>
            <input
              type="number"
              name="price_from"
              min="0"
              step="0.01"
              value={formData.price_from}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              placeholder="0 for contact pricing"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency
            </label>
            <select
              name="price_currency"
              value={formData.price_currency}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="LKR">LKR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>

        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleCheckbox}
              className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
            />
            <span>Service is Active</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            required
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Features
          </label>
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              placeholder="Add feature and press Enter"
            />
            <button
              type="button"
              onClick={addFeature}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.features.map((feature, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800"
              >
                {feature}
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="ml-2 text-amber-600 hover:text-amber-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/services')}
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
            {isLoading ? 'Saving...' : 'Save Service'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminServiceForm;
