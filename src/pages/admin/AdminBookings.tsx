import React, { useState, useEffect } from 'react';
import { bookingsAPI } from '../../lib/api';
import { Calendar, Users, Phone, Mail, MessageCircle, Filter } from 'lucide-react';

interface Booking {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  check_in: string;
  check_out: string;
  adults: number;
  children: number;
  room_preference?: string;
  message?: string;
  contact_method: string;
  status: string;
  created_at: string;
}

const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingsAPI.getAll();
      setBookings(response.data?.data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateBookingStatus = async (id: string, newStatus: string) => {
    try {
      await bookingsAPI.updateStatus(parseInt(id), newStatus);
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const confirmBooking = async (id: string) => {
    try {
      await bookingsAPI.confirm(parseInt(id));
      fetchBookings();
      alert('Booking confirmed! Confirmation email sent to guest.');
    } catch (error) {
      console.error('Error confirming booking:', error);
      alert('Error confirming booking. Please try again.');
    }
  };

  const filteredBookings = statusFilter === 'all' 
    ? (bookings || []) 
    : (bookings || []).filter(booking => booking.status === statusFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
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
        <h1 className="text-3xl font-bold text-gray-900">Booking Management</h1>
        <div className="text-sm text-gray-600">
          Total Inquiries: {bookings.length}
        </div>
      </div>

      {/* Status Filter */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <Filter size={20} className="text-gray-400" />
          <div className="flex space-x-2">
            {[
              { key: 'all', label: 'All Bookings' },
              { key: 'pending', label: 'Pending' },
              { key: 'confirmed', label: 'Confirmed' },
              { key: 'cancelled', label: 'Cancelled' }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setStatusFilter(filter.key)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  statusFilter === filter.key
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredBookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-amber-100 p-2 rounded-full">
                  <Calendar className="text-amber-600" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{booking.full_name}</h3>
                  <p className="text-sm text-gray-600">
                    Inquiry received: {new Date(booking.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {booking.status === 'pending' && (
                  <button
                    onClick={() => confirmBooking(booking.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    Confirm Booking
                  </button>
                )}
                <select
                  value={booking.status}
                  onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(booking.status)}`}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Check-in</p>
                  <p className="text-sm font-medium">{new Date(booking.check_in).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Check-out</p>
                  <p className="text-sm font-medium">{new Date(booking.check_out).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Users size={16} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Guests</p>
                  <p className="text-sm font-medium">
                    {booking.adults} adults{booking.children > 0 && `, ${booking.children} children`}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <MessageCircle size={16} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="text-sm font-medium">
                    {calculateNights(booking.check_in, booking.check_out)} nights
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Contact Information</p>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Mail size={14} className="text-gray-400" />
                    <a href={`mailto:${booking.email}`} className="text-sm text-amber-600 hover:text-amber-800">
                      {booking.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone size={14} className="text-gray-400" />
                    <a href={`tel:${booking.phone}`} className="text-sm text-amber-600 hover:text-amber-800">
                      {booking.phone}
                    </a>
                  </div>
                  <p className="text-xs text-gray-500">Prefers: {booking.contact_method}</p>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-gray-500 mb-1">Room Preference</p>
                <p className="text-sm font-medium">{booking.room_preference || 'Any available room'}</p>
              </div>
            </div>

            {booking.message && (
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-xs text-gray-500 mb-1">Special Requests / Message</p>
                <p className="text-sm text-gray-700">{booking.message}</p>
              </div>
            )}

            <div className="mt-4 flex space-x-3">
              <a
                href={`mailto:${booking.email}?subject=Re: Your booking inquiry for Dutch Wall Fort&body=Dear ${booking.full_name},%0D%0A%0D%0AThank you for your interest in Dutch Wall Fort.%0D%0A%0D%0A`}
                className="bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-700 transition-colors duration-200 inline-flex items-center"
              >
                <Mail size={16} className="mr-2" />
                Reply via Email
              </a>
              
              <a
                href={`https://wa.me/${booking.phone.replace(/[^0-9]/g, '')}?text=Hello ${booking.full_name}, thank you for your booking inquiry for Dutch Wall Fort.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors duration-200 inline-flex items-center"
              >
                <MessageCircle size={16} className="mr-2" />
                WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {statusFilter === 'all' 
              ? 'No booking inquiries have been received yet.' 
              : `No ${statusFilter} bookings found.`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;