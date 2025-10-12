import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Wifi, Wind, Bath, Coffee, MapPin, ArrowRight } from 'lucide-react';

const Rooms = () => {
  const rooms = [
    {
      id: "deluxe-family-room",
      name: "Deluxe Family Room",
      shortDescription: "Family Room — 4 guests, 1 double + 2 singles",
      description: "Our most spacious accommodation, perfect for families. Features a comfortable double bed and two single beds, with a private balcony overlooking the garden. The room includes modern amenities while maintaining the villa's Dutch colonial charm.",
      capacity: 4,
      beds: "1 double bed + 2 single beds",
      amenities: ["AC", "Private bathroom", "Balcony", "Garden view", "Free Wi-Fi", "Work desk"],
      priceFrom: "15,000",
      image: "/images/bedroom1_1.jpg",
      gallery: [
        "/images/bedroom1_1.jpg",
        "/images/bedroom1_2.jpg",
        "/images/bedroom1_3.jpg",
        "/images/bedroom1_4.jpg",
        "/images/bedroom1_5.jpg",
        "/images/bedroom1_6.jpg",
        "/images/bedroom1_7.jpg"
      ]
    },
    {
      id: "superior-room",
      name: "Superior Room",
      shortDescription: "Superior Room — 3 guests, 1 double + 1 single",
      description: "Comfortable and stylish room with a double bed and single bed. Features a work desk area and private entrance, making it ideal for couples or small families. The room combines modern comfort with traditional architectural details.",
      capacity: 3,
      beds: "1 double bed + 1 single bed",
      amenities: ["AC", "Private bathroom", "Private entrance", "Work desk", "Free Wi-Fi", "Mini fridge"],
      priceFrom: "12,000",
      image: "/images/bedroom2_1.jpg",
      gallery: [
        "/images/bedroom2_1.jpg",
        "/images/bedroom2_2.jpg",
        "/images/bedroom2_3.jpg",
        "/images/bedroom2_4.jpg",
        "/images/bedroom2_5.jpg"
      ]
    },
    {
      id: "standard-room",
      name: "Standard Room",
      shortDescription: "Standard Room — 2 guests, 1 double bed",
      description: "Cozy and comfortable room with a double bed, perfect for couples. Despite being our standard room, it includes all essential amenities and maintains the high standards of comfort and cleanliness that Dutch Wall Fort is known for.",
      capacity: 2,
      beds: "1 double bed",
      amenities: ["AC", "Private bathroom", "Free Wi-Fi", "Breakfast included", "Daily housekeeping", "Safe"],
      priceFrom: "9,000",
      image: "/images/bedroom3_1.jpg",
      gallery: [
        "/images/bedroom3_1.jpg",
        "/images/bedroom3_2.jpg",
        "/images/bedroom3_3.jpg",
        "/images/bedroom3_4.jpg",
        "/images/bedroom3_5.jpg",
        "/images/bedroom3_6.jpg",
        "/images/bedroom3_7.jpg",
        "/images/bedroom3_8.jpg"
      ]
    },
    {
      id: "premium-room",
      name: "Premium Room",
      shortDescription: "Premium Room — 2-3 guests, spacious with modern amenities",
      description: "Our premium accommodation offers extra space and luxury amenities. Perfect for guests seeking additional comfort and style during their stay in Galle Fort.",
      capacity: 3,
      beds: "1 double bed + 1 single bed",
      amenities: ["AC", "Private bathroom", "Balcony", "Premium furnishing", "Free Wi-Fi", "Mini bar"],
      priceFrom: "18,000",
      image: "/images/bedroom4_1.jpg",
      gallery: [
        "/images/bedroom4_1.jpg",
        "/images/bedroom4_2.jpg",
        "/images/bedroom4_3.jpg",
        "/images/bedroom4_4.jpg",
        "/images/bedroom4_5.jpg"
      ]
    },
    {
      id: "whole-villa",
      name: "Whole Villa Rental",
      shortDescription: "Entire Villa — Up to 12 guests, all rooms included",
      description: "Book the entire Dutch Wall Fort villa for your group, family reunion, or special celebration. Includes all four rooms, common areas, terrace, kitchen access, and exclusive use of the property. Perfect for larger groups seeking privacy and authentic Galle Fort experience.",
      capacity: 12,
      beds: "4 rooms: 3 double beds + 4 single beds",
      amenities: ["All rooms included", "Exclusive villa access", "Kitchen access", "Terrace & garden", "Group breakfast", "Concierge service"],
      priceFrom: "45,000",
      image: "/images/Exterior_1.jpg",
      gallery: [
        "/images/Exterior_1.jpg",
        "/images/livingroom.jpg",
        "/images/dining area_1.jpg",
        "/images/balcony_1.jpg",
        "/images/kitchen_1.jpg"
      ]
    }
  ];

  const getAmenityIcon = (amenity: string) => {
    const iconMap: { [key: string]: React.ComponentType<{ size?: number; className?: string }> } = {
      'AC': Wind,
      'Private bathroom': Bath,
      'Free Wi-Fi': Wifi,
      'Breakfast included': Coffee,
      'Work desk': MapPin,
      'Balcony': MapPin,
      'Garden view': MapPin,
      'Private entrance': MapPin,
      'Mini fridge': MapPin,
      'Daily housekeeping': MapPin,
      'Safe': MapPin,
    };
    
    const IconComponent = iconMap[amenity] || MapPin;
    return <IconComponent size={16} className="text-amber-600" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Mobile First */}
      <section className="bg-gradient-to-r from-amber-800 to-amber-600 text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Our Rooms
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed px-2">
            <span className="block sm:hidden">Comfortable rooms with modern amenities • Free breakfast • Prime location</span>
            <span className="hidden sm:block">Our rooms combine the calm of Galle Fort with modern comforts — air conditioning, private bathrooms and free Wi‑Fi. Breakfast is included with every stay.</span>
          </p>
        </div>
      </section>

      {/* Rooms Grid - Mobile First */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {rooms.map((room) => (
              <div key={room.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                <div className="relative h-48 sm:h-56 md:h-64">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-amber-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium shadow-lg">
                    From LKR {room.priceFrom}
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{room.name}</h3>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">{room.shortDescription}</p>

                  <div className="flex items-center text-gray-600 mb-4 text-xs sm:text-sm">
                    <Users size={14} className="mr-2 text-amber-600 flex-shrink-0" />
                    <span className="leading-tight">
                      <span className="block sm:inline">Up to {room.capacity} guests</span>
                      <span className="hidden sm:inline"> • </span>
                      <span className="block sm:inline">{room.beds}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 sm:mb-6">
                    {room.amenities.slice(0, 4).map((amenity, index) => (
                      <div key={index} className="flex items-center text-xs sm:text-sm text-gray-600">
                        {getAmenityIcon(amenity)}
                        <span className="ml-2 truncate">{amenity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Link
                      to={`/rooms/${room.id}`}
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white text-center py-2.5 px-4 rounded-md font-medium transition-all duration-200 inline-flex items-center justify-center text-sm sm:text-base hover:shadow-md"
                    >
                      View Details
                      <ArrowRight size={14} className="ml-2" />
                    </Link>
                    <Link
                      to="/contact"
                      className="flex-1 border border-amber-600 text-amber-600 hover:bg-amber-50 text-center py-2.5 px-4 rounded-md font-medium transition-all duration-200 text-sm sm:text-base hover:shadow-md"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info - Mobile First */}
          <div className="mt-12 sm:mt-16 bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-8 sm:mb-12">
              Why Stay With Us
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center group">
                <div className="bg-amber-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-amber-200 transition-colors duration-200">
                  <Coffee className="text-amber-600 w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Complimentary Breakfast</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Start your day with our delicious Sri Lankan breakfast, included with every room.</p>
              </div>

              <div className="text-center group">
                <div className="bg-amber-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-amber-200 transition-colors duration-200">
                  <Wifi className="text-amber-600 w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Free Wi-Fi</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Stay connected with complimentary high-speed internet throughout the property.</p>
              </div>

              <div className="text-center group sm:col-span-2 lg:col-span-1">
                <div className="bg-amber-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-amber-200 transition-colors duration-200">
                  <MapPin className="text-amber-600 w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Prime Location</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Located in the heart of Galle Fort, walking distance to all major attractions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA - Mobile First */}
      <section className="py-12 sm:py-16 md:py-20 bg-amber-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            Ready to Book Your Stay?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-amber-100 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Contact us for availability and special rates for longer stays
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Link
              to="/contact"
              className="bg-white text-amber-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-gray-100 transition-all duration-200 inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              Send Booking Inquiry
            </Link>
            <a
              href="tel:+94765721495"
              className="border-2 border-white text-white hover:bg-white hover:text-amber-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-200 inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              <span className="hidden sm:inline">Call Now: </span>
              <span className="sm:hidden">📞 </span>
              +94 76 572 1495
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rooms;