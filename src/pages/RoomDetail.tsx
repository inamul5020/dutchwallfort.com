import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, Bed, Wind, Bath, Calendar, ArrowRight, X } from 'lucide-react';
import BookingForm from '../components/BookingForm';

const RoomDetail = () => {
  const { slug } = useParams();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Room data - in a real app, this would come from an API
  const rooms: { [key: string]: any } = {
    "deluxe-family-room": {
      id: "deluxe-family-room",
      name: "Deluxe Family Room",
      shortDescription: "Spacious family room with balcony and garden view",
      longDescription: "Our most spacious accommodation offers the perfect blend of comfort and charm for families visiting Galle Fort. The room features a comfortable double bed and two single beds, ensuring everyone has a restful night's sleep. Step out onto your private balcony to enjoy garden views and the peaceful atmosphere of historic Church Street. The room maintains the villa's Dutch colonial character while providing all modern amenities including air conditioning, private bathroom with shower, and complimentary Wi-Fi. The space includes a convenient work desk for those who need to stay connected, and the private entrance ensures your privacy and comfort throughout your stay.",
      capacity: 4,
      beds: "1 double bed + 2 single beds",
      amenities: [
        "Air conditioning",
        "Private bathroom (shower)",
        "Complimentary breakfast",
        "Free Wi-Fi",
        "Private balcony",
        "Garden view",
        "Work desk",
        "Private entrance",
        "Daily housekeeping",
        "Safe"
      ],
      priceFrom: "15,000",
      gallery: [
        "/images/bedroom1_1.jpg",
        "/images/bedroom1_2.jpg",
        "/images/bedroom1_3.jpg",
        "/images/bedroom1_4.jpg",
        "/images/bedroom1_5.jpg",
        "/images/bedroom1_6.jpg"
      ]
    },
    "superior-room": {
      id: "superior-room",
      name: "Superior Room",
      shortDescription: "Comfortable room with private entrance and work area",
      longDescription: "The Superior Room offers an ideal balance of space, comfort, and privacy for couples or small families. Featuring a double bed and single bed, this room is perfect for those seeking a bit more space during their stay in Galle Fort. The room includes a dedicated work desk area, making it suitable for business travelers or digital nomads. Your private entrance ensures complete independence, while the modern amenities including air conditioning, private bathroom, and mini fridge add to your comfort. The room showcases beautiful Dutch colonial architectural details while providing contemporary conveniences for a memorable stay.",
      capacity: 3,
      beds: "1 double bed + 1 single bed",
      amenities: [
        "Air conditioning",
        "Private bathroom (shower)",
        "Complimentary breakfast",
        "Free Wi-Fi",
        "Private entrance",
        "Work desk",
        "Mini fridge",
        "Daily housekeeping",
        "Safe",
        "Reading lights"
      ],
      priceFrom: "12,000",
      gallery: [
        "/images/bedroom2_1.jpg",
        "/images/bedroom2_2.jpg",
        "/images/bedroom2_3.jpg",
        "/images/bedroom2_4.jpg",
        "/images/bedroom2_5.jpg"
      ]
    },
    "standard-room": {
      id: "standard-room",
      name: "Standard Room",
      shortDescription: "Cozy room with all essential amenities",
      longDescription: "Our Standard Room may be cozy in size, but it's generous in comfort and style. Perfect for couples seeking an intimate and comfortable base for exploring Galle Fort. The room features a comfortable double bed with quality linens, ensuring a good night's rest after your adventures. Despite being our most compact option, the room includes all essential amenities including air conditioning, private bathroom, and complimentary breakfast. The space is thoughtfully designed to maximize comfort while maintaining the charm and character of our Dutch colonial villa. Daily housekeeping and a personal safe add to your peace of mind during your stay.",
      capacity: 2,
      beds: "1 double bed",
      amenities: [
        "Air conditioning",
        "Private bathroom (shower)",
        "Complimentary breakfast",
        "Free Wi-Fi",
        "Daily housekeeping",
        "Safe",
        "Reading lights",
        "Wardrobe",
        "Mirror",
        "Electrical outlets"
      ],
      priceFrom: "9,000",
      gallery: [
        "/images/bedroom3_1.jpg",
        "/images/bedroom3_2.jpg",
        "/images/bedroom3_3.jpg",
        "/images/bedroom3_4.jpg"
      ]
    },
    "premium-room": {
      id: "premium-room",
      name: "Premium Room",
      shortDescription: "Premium Room — 2-3 guests, spacious with modern amenities",
      longDescription: "Our premium accommodation offers extra space and luxury amenities. Perfect for guests seeking additional comfort and style during their stay in Galle Fort. This spacious room features premium furnishings, a private balcony, and modern amenities that elevate your experience to the next level. Whether you're celebrating a special occasion or simply want to indulge in the best our villa has to offer, the Premium Room provides an exceptional blend of comfort, style, and convenience. Enjoy the enhanced amenities including a mini bar, premium bedding, and additional space for relaxation or work.",
      capacity: 3,
      beds: "1 double bed + 1 single bed",
      amenities: [
        "Air conditioning",
        "Private bathroom (shower)",
        "Private balcony",
        "Premium furnishings",
        "Mini bar",
        "Complimentary breakfast",
        "Free Wi-Fi",
        "Work desk",
        "Daily housekeeping",
        "Safe",
        "Room service"
      ],
      priceFrom: "18,000",
      gallery: [
        "/images/bedroom4_1.jpg",
        "/images/bedroom4_2.jpg",
        "/images/bedroom4_3.jpg",
        "/images/bedroom4_4.jpg",
        "/images/bedroom4_5.jpg"
      ]
    },
    "whole-villa": {
      id: "whole-villa",
      name: "Whole Villa Rental",
      shortDescription: "Entire Villa — Up to 12 guests, all rooms included",
      longDescription: "Book the entire Dutch Wall Fort villa for your group, family reunion, or special celebration. This exclusive rental includes all four beautifully appointed rooms, common living areas, terrace, full kitchen access, and complete privacy for your group. Perfect for larger gatherings, corporate retreats, or anyone seeking an authentic Galle Fort experience with the luxury of an entire historic villa. Your group will enjoy private dining areas, multiple balconies, garden access, and personalized concierge service. The whole villa rental provides the ultimate in comfort and exclusivity, with dedicated staff ensuring your every need is met throughout your stay.",
      capacity: 12,
      beds: "4 rooms: 3 double beds + 4 single beds",
      amenities: [
        "All 4 rooms included",
        "Exclusive villa access",
        "Full kitchen access",
        "Terrace & garden",
        "Multiple balconies",
        "Group breakfast service",
        "Concierge service",
        "Event planning assistance",
        "Private chef available",
        "Daily housekeeping",
        "Welcome amenities",
        "Airport transfers"
      ],
      priceFrom: "45,000",
      gallery: [
        "/images/Exterior_1.jpg",
        "/images/livingroom.jpg",
        "/images/dining area_1.jpg",
        "/images/balcony_1.jpg",
        "/images/kitchen_1.jpg",
        "/images/Exterior_3.jpg",
        "/images/balcony_2.jpg"
      ]
    }
  };

  const room = rooms[slug || ''];

  if (!room) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Room Not Found</h1>
          <Link
            to="/rooms"
            className="bg-amber-600 text-white px-6 py-2 rounded-full font-medium hover:bg-amber-700 transition-colors duration-200"
          >
            View All Rooms
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
            src={room.gallery[0]}
            alt={room.name}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setSelectedImage(room.gallery[0])}
          />
          <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 text-gray-800 px-4 py-2 rounded-full text-sm font-medium">
            Click to enlarge • {room.gallery.length} photos
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
                {room.amenities.map((amenity: string, index: number) => (
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
                {room.gallery.slice(1).map((image: string, index: number) => (
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
                  <div className="text-3xl font-bold text-gray-900">LKR {room.priceFrom}</div>
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