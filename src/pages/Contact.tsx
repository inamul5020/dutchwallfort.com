import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import BookingForm from '../components/BookingForm';

const Contact = () => {
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setContactFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      console.log('Contact form submitted:', contactFormData);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-800 to-amber-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact & Location</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Get in touch with us for booking inquiries, local recommendations, 
            or any questions about your stay
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Details */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <MapPin className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Address</h3>
                    <p className="text-gray-600">Dutch Wall Fort</p>
                    <p className="text-gray-600">73 Church Street</p>
                    <p className="text-gray-600">Galle, Sri Lanka</p>
                    <a
                      href="https://maps.app.goo.gl/zvuY69dauMw9wqXY8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 hover:text-amber-800 font-medium text-sm mt-1 inline-block"
                    >
                      View on Google Maps
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Phone className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <a
                      href="tel:+94765721495"
                      className="text-gray-600 hover:text-amber-600 transition-colors duration-200"
                    >
                      +94 76 572 1495
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Available 24/7 for urgent inquiries</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <MessageCircle className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                    <a
                      href="https://wa.me/94765721495"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-amber-600 transition-colors duration-200"
                    >
                      +94 76 572 1495
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Quick responses for booking inquiries</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Mail className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <a
                      href="mailto:reservations@dutchwallfort.com"
                      className="text-gray-600 hover:text-amber-600 transition-colors duration-200"
                    >
                      reservations@dutchwallfort.com
                    </a>
                    <p className="text-sm text-gray-500 mt-1">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Clock className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Check-in/Check-out</h3>
                    <p className="text-gray-600">Check-in: 2:00 PM (14:00)</p>
                    <p className="text-gray-600">Check-out: 11:00 AM</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Early check-in/late check-out subject to availability
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                
                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                    <div className="text-green-600 text-5xl mb-4">✓</div>
                    <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent!</h3>
                    <p className="text-green-700 mb-4">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                    <p className="text-sm text-green-600">
                      For urgent matters, call or WhatsApp: +94 76 572 1495
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setContactFormData({
                          name: '',
                          email: '',
                          phone: '',
                          subject: 'General Inquiry',
                          message: ''
                        });
                      }}
                      className="mt-4 text-green-600 hover:text-green-800 font-medium"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={contactFormData.name}
                          onChange={handleContactChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={contactFormData.email}
                          onChange={handleContactChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={contactFormData.phone}
                          onChange={handleContactChange}
                          placeholder="+94 76 572 1495"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                          Subject *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          required
                          value={contactFormData.subject}
                          onChange={handleContactChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                        >
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Booking Question">Booking Question</option>
                          <option value="Local Recommendations">Local Recommendations</option>
                          <option value="Special Requests">Special Requests</option>
                          <option value="Feedback">Feedback</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={contactFormData.message}
                        onChange={handleContactChange}
                        placeholder="Tell us how we can help you..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-amber-600 text-white py-3 px-6 rounded-md font-medium hover:bg-amber-700 focus:ring-4 focus:ring-amber-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending Message...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Location</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dutch Wall Fort is located on Church Street in the heart of historic Galle Fort, 
              a UNESCO World Heritage site
            </p>
          </div>

          <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-600">
              <MapPin size={48} className="mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">Interactive Map</p>
              <p className="mb-4">73 Church Street, Galle Fort, Sri Lanka</p>
              <a
                href="https://maps.app.goo.gl/zvuY69dauMw9wqXY8"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-600 text-white px-6 py-2 rounded-full font-medium hover:bg-amber-700 transition-colors duration-200 inline-flex items-center"
              >
                <MapPin size={18} className="mr-2" />
                Open in Google Maps
              </a>
            </div>
          </div>

          {/* Location Highlights */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Galle Lighthouse</h3>
              <p className="text-amber-600 text-sm">5 min walk</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Pedlar Street</h3>
              <p className="text-amber-600 text-sm">2 min walk</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Fort Ramparts</h3>
              <p className="text-amber-600 text-sm">3 min walk</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Koggala Airport</h3>
              <p className="text-amber-600 text-sm">35-40 min drive</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Book?</h2>
            <p className="text-lg text-gray-600">
              Send us your booking inquiry and we'll confirm availability and rates within 24 hours
            </p>
          </div>
          <BookingForm title="Book Your Stay at Dutch Wall Fort" />
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-12 bg-amber-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Need Urgent Assistance?</h2>
          <p className="text-amber-100 mb-6">
            For urgent bookings, changes, or assistance during your stay
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+94765721495"
              className="bg-white text-amber-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 inline-flex items-center justify-center"
            >
              <Phone size={20} className="mr-2" />
              Call: +94 76 572 1495
            </a>
            <a
              href="https://wa.me/94765721495"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white hover:bg-white hover:text-amber-600 px-8 py-3 rounded-full font-semibold text-lg transition-colors duration-200 inline-flex items-center justify-center"
            >
              <MessageCircle size={20} className="mr-2" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;