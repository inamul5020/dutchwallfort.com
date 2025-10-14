import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { servicesAPI } from '../../lib/api';
import { MapPin, Plus, Edit, Trash2, Eye, EyeOff, Car, DollarSign, Camera } from 'lucide-react';

interface Service {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  duration?: string;
  price_from?: number;
  price_currency: string;
  is_active: boolean;
  created_at: string;
}

const AdminServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Services', icon: MapPin },
    { value: 'tours', label: 'Tours & Excursions', icon: Camera },
    { value: 'transport', label: 'Transportation', icon: Car },
    { value: 'exchange', label: 'Currency Exchange', icon: DollarSign },
    { value: 'other', label: 'Other Services', icon: MapPin }
  ];

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await servicesAPI.getAll();
      setServices(response.data?.data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleServiceStatus = async (id: string, currentStatus: boolean) => {
    try {
      await servicesAPI.update(parseInt(id), { is_active: !currentStatus });
      fetchServices();
    } catch (error) {
      console.error('Error updating service status:', error);
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      await servicesAPI.delete(parseInt(id));
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(cat => cat.value === category);
    const IconComponent = categoryData?.icon || MapPin;
    return <IconComponent size={20} className="text-amber-600" />;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Services Management</h1>
        <Link
          to="/admin/services/new"
          className="bg-amber-600 text-white px-4 py-2 rounded-md font-medium hover:bg-amber-700 transition-colors duration-200 inline-flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add New Service
        </Link>
      </div>

      {/* Category Filter */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category.value
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <category.icon size={16} className="mr-2" />
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price From
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredServices.map((service) => (
              <tr key={service.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getCategoryIcon(service.category)}
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{service.name}</div>
                      <div className="text-sm text-gray-500 max-w-xs truncate">{service.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                    {service.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{service.duration || 'Flexible'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {service.price_from ? `${service.price_currency} ${service.price_from.toLocaleString()}` : 'Contact for pricing'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleServiceStatus(service.id, service.is_active)}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      service.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {service.is_active ? (
                      <>
                        <Eye size={12} className="mr-1" />
                        Active
                      </>
                    ) : (
                      <>
                        <EyeOff size={12} className="mr-1" />
                        Inactive
                      </>
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <Link
                    to={`/admin/services/edit/${service.id}`}
                    className="text-amber-600 hover:text-amber-900 inline-flex items-center"
                  >
                    <Edit size={16} className="mr-1" />
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteService(service.id)}
                    className="text-red-600 hover:text-red-900 inline-flex items-center"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No services</h3>
            <p className="mt-1 text-sm text-gray-500">
              {selectedCategory === 'all' 
                ? 'Get started by creating a new service.' 
                : `No services found in the ${categories.find(c => c.value === selectedCategory)?.label.toLowerCase()} category.`
              }
            </p>
            <div className="mt-6">
              <Link
                to="/admin/services/new"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700"
              >
                <Plus size={16} className="mr-2" />
                Add Service
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminServices;