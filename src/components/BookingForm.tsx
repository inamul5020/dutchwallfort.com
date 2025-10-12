import React, { useState } from 'react';
import { Calendar, Users, Phone, Mail } from 'lucide-react';
import { bookingsAPI } from '../lib/api';

interface BookingFormProps {
  className?: string;
  title?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ 
  className = "", 
  title = "Send Booking Inquiry" 
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    adults: '2',
    children: '0',
    room: 'Any Room',
    message: '',
    contactMethod: 'Email',
    consent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Save booking to database via API
      await bookingsAPI.create({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        check_in: formData.checkIn,
        check_out: formData.checkOut,
        adults: parseInt(formData.adults),
        children: parseInt(formData.children),
        room_preference: formData.room,
        message: formData.message,
        contact_method: formData.contactMethod,
        status: 'new'
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting booking:', error);
      setIsSubmitting(false);
      // You could add error handling here
    }
  };

  if (isSubmitted) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-8 md:p-12 text-center ${className}`}>
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-green-800 mb-2">Inquiry Received!</h3>
          <p className="text-green-700 text-lg mb-6 max-w-md mx-auto">
            Thank you for your booking inquiry. We'll confirm availability and rates within 24 hours.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <p className="text-sm font-medium text-green-800 mb-2">Need immediate assistance?</p>
            <a
              href="tel:+94765721495"
              className="inline-flex items-center text-green-700 hover:text-green-900 font-semibold text-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              +94 76 572 1495
            </a>
          </div>

          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                fullName: '',
                email: '',
                phone: '',
                checkIn: '',
                checkOut: '',
                adults: '2',
                children: '0',
                room: 'Any Room',
                message: '',
                contactMethod: 'Email',
                consent: false
              });
            }}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Send Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 md:p-8 ${className}`}>
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information Section */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Personal Information</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address *
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number *
            </label>
            <div className="relative">
              <Phone size={20} className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+94 76 572 1495"
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Booking Details Section */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Booking Details</h4>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">
                Check-in Date *
              </label>
              <div className="relative">
                <Calendar size={20} className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="date"
                  id="checkIn"
                  name="checkIn"
                  required
                  value={formData.checkIn}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">
                Check-out Date *
              </label>
              <div className="relative">
                <Calendar size={20} className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="date"
                  id="checkOut"
                  name="checkOut"
                  required
                  value={formData.checkOut}
                  onChange={handleChange}
                  min={formData.checkIn || new Date().toISOString().split('T')[0]}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Guests and Room */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {/* Adults */}
            <div className="space-y-1">
              <label htmlFor="adults" className="block text-sm font-medium text-gray-700">
                Adults *
              </label>
              <div className="relative">
                <Users size={20} className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="number"
                  id="adults"
                  name="adults"
                  required
                  min="1"
                  max="20"
                  value={formData.adults}
                  onChange={handleChange}
                  placeholder="2"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            {/* Children */}
            <div className="space-y-1">
              <label htmlFor="children" className="block text-sm font-medium text-gray-700">
                Children
              </label>
              <input
                type="number"
                id="children"
                name="children"
                min="0"
                max="10"
                value={formData.children}
                onChange={handleChange}
                placeholder="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
              />
            </div>

            {/* Room Preference - Full width on mobile/tablet, 1 column on desktop */}
            <div className="space-y-1 sm:col-span-2 lg:col-span-1">
              <label htmlFor="room" className="block text-sm font-medium text-gray-700">
                <span className="lg:hidden">Room Preference *</span>
                <span className="hidden lg:inline">Room *</span>
              </label>
              <select
                id="room"
                name="room"
                required
                value={formData.room}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors appearance-none bg-white"
              >
                <option value="Any Room">Any Available Room</option>
                <option value="Deluxe Family Room">Deluxe Family Room</option>
                <option value="Superior Room">Superior Room</option>
                <option value="Standard Room">Standard Room</option>
                <option value="Full Villa">Full Villa</option>
              </select>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Additional Information</h4>

          <div className="space-y-1">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message / Special Requests
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Any special requests or questions..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors resize-vertical"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="contactMethod" className="block text-sm font-medium text-gray-700">
              Preferred Contact Method
            </label>
            <select
              id="contactMethod"
              name="contactMethod"
              value={formData.contactMethod}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors appearance-none bg-white"
            >
              <option value="Email">Email</option>
              <option value="Phone">Phone</option>
              <option value="WhatsApp">WhatsApp</option>
            </select>
          </div>
        </div>

        {/* Consent and Submit */}
        <div className="space-y-6">
          <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              required
              checked={formData.consent}
              onChange={handleChange}
              className="mt-1 h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
            />
            <label htmlFor="consent" className="text-sm text-gray-600 leading-relaxed">
              I agree to the processing of my personal data for the purpose of handling this booking inquiry.
              View our <a href="/policies" className="text-amber-600 hover:text-amber-800 font-medium underline">Privacy Policy</a>.
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-amber-700 focus:ring-4 focus:ring-amber-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending Inquiry...
              </span>
            ) : (
              'Send Booking Inquiry'
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <div className="inline-flex items-center justify-center w-full max-w-md mx-auto p-4 bg-amber-50 rounded-lg border border-amber-200">
          <div className="text-center">
            <p className="text-sm font-medium text-amber-800 mb-1">For urgent bookings, call or WhatsApp:</p>
            <a
              href="tel:+94765721495"
              className="text-lg font-bold text-amber-700 hover:text-amber-900 transition-colors"
            >
              +94 76 572 1495
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;