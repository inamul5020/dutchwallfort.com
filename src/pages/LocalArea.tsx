import React from 'react';
import { MapPin, Clock, Camera, Waves, Mountain, Coffee, ShoppingBag } from 'lucide-react';

const LocalArea = () => {
  const attractions = [
    {
      icon: Camera,
      name: "Galle Lighthouse & Lighthouse Beach",
      description: "A scenic walk and perfect sunset spot with stunning ocean views. The iconic lighthouse is one of Galle's most photographed landmarks.",
      walkTime: "5 minutes",
      category: "Historic Sites",
      tips: "Best visited in late afternoon for sunset photography"
    },
    {
      icon: ShoppingBag,
      name: "Pedlar Street",
      description: "Local shopping, cafes and art shops just steps away. Browse unique handicrafts, jewelry, and local artwork from talented artisans.",
      walkTime: "2 minutes",
      category: "Shopping",
      tips: "Perfect for finding authentic Sri Lankan souvenirs"
    },
    {
      icon: Mountain,
      name: "Galle Fort Ramparts",
      description: "Stroll the historic walls and watch the sunset. The ramparts offer panoramic views of the Indian Ocean and fort interior.",
      walkTime: "3 minutes", 
      category: "Historic Sites",
      tips: "Walk the full circuit for the best experience"
    },
    {
      icon: Waves,
      name: "Unawatuna Beach",
      description: "Popular beach with golden sand and calm waters, perfect for swimming and snorkeling. Great beachside restaurants and bars.",
      walkTime: "15 minutes by tuk-tuk",
      category: "Beaches",
      tips: "Best for families and those learning to surf"
    },
    {
      icon: Waves,
      name: "Hikkaduwa Beach", 
      description: "Famous surfing destination with vibrant coral reefs and excellent diving opportunities. Lively nightlife and beach scene.",
      walkTime: "20 minutes by tuk-tuk",
      category: "Beaches",
      tips: "Perfect for experienced surfers and snorkeling"
    },
    {
      icon: Waves,
      name: "Mirissa Whale Watching",
      description: "Seasonal whale watching tours and beautiful secluded beaches. One of the best spots in the world to see blue whales.",
      walkTime: "45 minutes by car",
      category: "Day Trips",
      tips: "November to April is the best season for whales"
    },
    {
      icon: Coffee,
      name: "Fort Cafés & Restaurants",
      description: "Discover excellent dining options within the fort walls, from local street food to international cuisine in historic settings.",
      walkTime: "1-5 minutes",
      category: "Dining",
      tips: "Try local favorites like hoppers and kottu roti"
    },
    {
      icon: Mountain,
      name: "Jungle Beach",
      description: "Hidden gem accessible through a short jungle walk from Unawatuna. Perfect for those seeking a more secluded beach experience.",
      walkTime: "20 minutes by tuk-tuk + walk",
      category: "Beaches", 
      tips: "Bring water and snorkeling gear"
    }
  ];

  const dayTrips = [
    {
      name: "Sinharaja Forest Reserve",
      description: "UNESCO World Heritage rainforest with diverse wildlife and bird watching opportunities",
      duration: "Full day",
      distance: "2 hours by car"
    },
    {
      name: "Yala National Park",
      description: "Famous for leopard sightings and diverse wildlife including elephants and birds",
      duration: "Full day",
      distance: "3 hours by car"
    },
    {
      name: "Stilt Fishermen of Koggala",
      description: "Traditional fishing method still practiced along the southern coast",
      duration: "Half day",
      distance: "30 minutes by car"
    },
    {
      name: "Moonstone Mines",
      description: "Visit local moonstone mines and see gem cutting demonstrations",
      duration: "Half day", 
      distance: "1 hour by car"
    }
  ];

  const categories = ["All", "Historic Sites", "Beaches", "Shopping", "Dining", "Day Trips"];
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredAttractions = selectedCategory === "All" 
    ? attractions 
    : attractions.filter(attraction => attraction.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-800 to-amber-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Things to Do Near Dutch Wall Fort</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Explore the rich history, stunning beaches, and vibrant culture surrounding 
            our villa in the heart of Galle Fort
          </p>
        </div>
      </section>

      {/* Location Highlight */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Perfect Central Location</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Located on Church Street in the heart of Galle Fort, everything is within walking 
              distance or a short tuk-tuk ride away
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <MapPin className="text-amber-600 mx-auto mb-3" size={32} />
              <h3 className="font-semibold text-gray-900">Galle Lighthouse</h3>
              <p className="text-amber-600 font-medium">5 min walk</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <ShoppingBag className="text-amber-600 mx-auto mb-3" size={32} />
              <h3 className="font-semibold text-gray-900">Pedlar Street</h3>
              <p className="text-amber-600 font-medium">2 min walk</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Mountain className="text-amber-600 mx-auto mb-3" size={32} />
              <h3 className="font-semibold text-gray-900">Fort Ramparts</h3>
              <p className="text-amber-600 font-medium">3 min walk</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Waves className="text-amber-600 mx-auto mb-3" size={32} />
              <h3 className="font-semibold text-gray-900">Lighthouse Beach</h3>
              <p className="text-amber-600 font-medium">10 min walk</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Attractions Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAttractions.map((attraction, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-amber-100 p-3 rounded-full mr-4">
                      <attraction.icon className="text-amber-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{attraction.name}</h3>
                      <div className="flex items-center text-amber-600 text-sm">
                        <Clock size={14} className="mr-1" />
                        {attraction.walkTime}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{attraction.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                      {attraction.category}
                    </span>
                    {attraction.tips && (
                      <div className="text-xs text-gray-500" title={attraction.tips}>
                        💡 Tips available
                      </div>
                    )}
                  </div>
                  
                  {attraction.tips && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-sm text-gray-500">
                        <strong>Tip:</strong> {attraction.tips}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Day Trips */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Day Trip Adventures</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Venture beyond Galle Fort to explore Sri Lanka's incredible natural beauty and cultural heritage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dayTrips.map((trip, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{trip.name}</h3>
                  <div className="text-right text-sm">
                    <div className="text-amber-600 font-medium">{trip.duration}</div>
                    <div className="text-gray-500">{trip.distance}</div>
                  </div>
                </div>
                <p className="text-gray-600">{trip.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-amber-100 p-6 rounded-lg inline-block">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help Planning?</h3>
              <p className="text-gray-600 mb-4">
                We're happy to help arrange transfers, tours, and provide detailed recommendations 
                for all these attractions and more.
              </p>
              <a
                href="tel:+94765721495"
                className="bg-amber-600 text-white px-6 py-2 rounded-full font-medium hover:bg-amber-700 transition-colors duration-200"
              >
                Call for Assistance: +94 76 572 1495
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Transportation */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Getting Around</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚶</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Walking</h3>
              <p className="text-gray-600 text-sm">
                Most Fort attractions are within a comfortable 5-minute walk from our villa
              </p>
            </div>

            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛺</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Tuk-Tuk</h3>
              <p className="text-gray-600 text-sm">
                Quick and affordable transport to nearby beaches and attractions outside the Fort
              </p>
            </div>

            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚗</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Private Car</h3>
              <p className="text-gray-600 text-sm">
                We can arrange private transfers for day trips and airport transportation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-amber-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Explore Galle?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Book your stay at Dutch Wall Fort and discover all these amazing attractions at your doorstep
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-amber-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Book Your Stay
            </a>
            <a
              href="/rooms"
              className="border-2 border-white text-white hover:bg-white hover:text-amber-600 px-8 py-3 rounded-full font-semibold text-lg transition-colors duration-200"
            >
              View Our Rooms
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalArea;