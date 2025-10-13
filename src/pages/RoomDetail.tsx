import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, Bed, Wind, Bath, Calendar, ArrowRight, X } from 'lucide-react';
import BookingForm from '../components/BookingForm';
import VirtualTours from '../components/VirtualTours';
import { roomsAPI } from '../lib/api';

interface Room {
  id: number;
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

const RoomDetail = () => {
  const { slug } = useParams();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await roomsAPI.getBySlug(slug!);
        setRoom(response.data.data);
      } catch (error) {
        console.error('Error fetching room:', error);
        setError('Room not found');
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchRoom();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Room Not Found</h1>
          <p className="text-gray-600 mb-6">The room you're looking for doesn't exist.</p>
          <Link
            to="/rooms"
            className="bg-amber-600 text-white px-6 py-3 rounded-md font-medium hover:bg-amber-700 transition-colors duration-200 inline-flex items-center"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Rooms
          </Link>
        </div>
      </div>
    );
  }



  const nearbyAttractions = [
    { name: "Galle Lighthouse", time: "5 min walk" },
    { name: "Pedlar Street", time: "2 min walk" },
    { name: "Fort Ramparts", time: "3 min walk" },
    { name: "Lighthouse Beach", time: "10 min walk" }
  ];

  const guestReviews = [
    {
      quote: "Perfect room for our family stay. The balcony was lovely for morning coffee.",
      author: "Emily, Canada",
      year: "2024"
    },
    {
      quote: "Clean, comfortable and great location. Breakfast was delicious!",
      author: "David, UK", 
      year: "2024"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-amber-600">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/rooms" className="text-gray-500 hover:text-amber-600">Rooms</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{room.name}</span>
          </nav>
        </div>
      </div>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link
          to="/rooms"
          className="inline-flex items-center text-amber-600 hover:text-amber-800 font-medium"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Rooms
        </Link>
      </div>

      {/* Hero Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden mb-8">
          <img
            src={room.images?.[0] || '/images/placeholder.jpg'}
            alt={room.name}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setSelectedImage(room.images?.[0] || null)}
          />
          <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 text-gray-800 px-4 py-2 rounded-full text-sm font-medium">
            Click to enlarge • {room.images?.length || 0} photos
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Room Details */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{room.name}</h1>
              <p className="text-xl text-gray-600 mb-6">{room.shortDescription}</p>
              
              {/* Quick Facts */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 bg-gray-50 p-6 rounded-lg">
                <div className="text-center">
                  <Users className="mx-auto mb-2 text-amber-600" size={24} />
                  <div className="font-medium text-gray-900">{room.capacity} Guests</div>
                </div>
                <div className="text-center">
                  <Bed className="mx-auto mb-2 text-amber-600" size={24} />
                  <div className="font-medium text-gray-900">{room.beds}</div>
                </div>
                <div className="text-center">
                  <Wind className="mx-auto mb-2 text-amber-600" size={24} />
                  <div className="font-medium text-gray-900">AC</div>
                </div>
                <div className="text-center">
                  <Bath className="mx-auto mb-2 text-amber-600" size={24} />
                  <div className="font-medium text-gray-900">Private Bath</div>
                </div>
              </div>
            </div>

            {/* About This Room */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">About This Room</h2>
              <p className="text-gray-700 leading-relaxed">{room.longDescription}</p>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {room.amenities?.map((amenity: string, index: number) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {room.images?.slice(1).map((image: string, index: number) => (
                  <div
                    key={index}
                    className="relative h-32 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity duration-200"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image}
                      alt={`${room.name} - Image ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Virtual Tours */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Virtual Tour</h2>
              <VirtualTours 
                roomId={room.id}
                tourType="360"
                limit={1}
                showRoomInfo={false}
                className="mb-4"
              />
            </div>

            {/* Nearby Attractions */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Nearby Attractions</h2>
              <div className="grid grid-cols-2 gap-4">
                {nearbyAttractions.map((attraction, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <span className="text-gray-700">{attraction.name}</span>
                    <span className="text-amber-600 font-medium">{attraction.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guest Reviews */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Guest Reviews for This Room</h2>
              <div className="space-y-4">
                {guestReviews.map((review, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-700 mb-3 italic">"{review.quote}"</p>
                    <p className="text-amber-600 font-medium">— {review.author}, {review.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Pricing */}
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-gray-900">LKR {parseInt(room.price).toLocaleString()}</div>
                  <div className="text-gray-600">per night</div>
                  <div className="text-sm text-gray-500 mt-1">Taxes & fees included</div>
                </div>
                <div className="text-sm text-gray-600 text-center">
                  <p>✓ Complimentary breakfast</p>
                  <p>✓ Free Wi-Fi</p>
                  <p>✓ Daily housekeeping</p>
                </div>
              </div>

              {/* Booking Form */}
              <BookingForm 
                title="Book This Room"
                className="shadow-lg"
              />

              {/* Policies */}
              <div className="mt-6 text-sm text-gray-600 text-center">
                <p className="mb-2">
                  <Calendar size={16} className="inline mr-1" />
                  Check-in: 14:00 • Check-out: 11:00
                </p>
                <Link to="/policies" className="text-amber-600 hover:text-amber-800 inline-flex items-center">
                  View Policies & FAQ
                  <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <X size={32} />
            </button>
            <img
              src={selectedImage}
              alt="Room gallery"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="bg-amber-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Book Your Stay?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Contact us directly for the best rates and immediate confirmation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+94765721495"
              className="bg-white text-amber-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Call: +94 76 572 1495
            </a>
            <a
              href="https://wa.me/94765721495"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white hover:bg-white hover:text-amber-600 px-8 py-3 rounded-full font-semibold text-lg transition-colors duration-200"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoomDetail;