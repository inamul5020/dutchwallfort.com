import React from 'react';
import { Users, Award, MapPin, Coffee } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: Users,
      title: "Family-Run Villa",
      description: "Personal service and warm hospitality from our local family team"
    },
    {
      icon: Award,
      title: "Dutch Colonial Heritage",
      description: "Historic architecture beautifully preserved with modern comforts"
    },
    {
      icon: MapPin,
      title: "Prime Fort Location",
      description: "Walking distance to all major attractions within Galle Fort"
    },
    {
      icon: Coffee,
      title: "Authentic Experience",
      description: "Traditional Sri Lankan breakfast and local insights"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-amber-800 to-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Dutch Wall Fort</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              A luxury boutique villa combining Dutch colonial charm with modern comfort 
              in the heart of historic Galle Fort
            </p>
          </div>
        </div>
      </section>

      {/* Main Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Where History Meets Hospitality
              </h2>
              <div className="prose prose-lg text-gray-700">
                <p className="mb-6">
                  Dutch Wall Fort — Luxury Boutique Villa blends modern comfort with traditional 
                  Dutch-colonial charm in the centre of Galle Fort. Our family-run villa is 
                  arranged over two floors with private entrances, comfortable family rooms 
                  with air-conditioning and private bathrooms, and a peaceful terrace and garden.
                </p>
                <p className="mb-6">
                  We serve a variety of Sri Lankan breakfasts (vegetarian, vegan, halal options 
                  available) complimentary with your stay. Located just steps from Pedlar Street 
                  and a short walk to the lighthouse and beaches, Dutch Wall is the perfect base 
                  to explore Galle.
                </p>
                <p className="mb-6">
                  Our villa showcases the architectural heritage of Galle Fort while providing 
                  all the modern amenities today's travelers expect. Each room tells a story 
                  of the Dutch colonial period while ensuring your comfort with air conditioning, 
                  private bathrooms, and contemporary furnishings.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/Exterior_1.jpg"
                alt="Dutch Wall Fort exterior"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">73</div>
                  <div className="text-sm text-gray-600">Church Street</div>
                  <div className="text-sm text-gray-600">Galle Fort</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Promise</h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            We aim to give each guest a warm, personal experience — from check-in to local tips 
            and breakfast recommendations. Our goal is to make your stay in Galle Fort not just 
            comfortable, but truly memorable.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-md">
                  <highlight.icon className="text-amber-600" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{highlight.title}</h3>
                <p className="text-gray-600 text-sm">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Host Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="/images/livingroom.jpg"
                alt="Our host family"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Meet Your Hosts</h2>
              <div className="prose prose-lg text-gray-700">
                <p className="mb-6">
                  Our local family team brings decades of hospitality experience and genuine 
                  warmth to every guest interaction. Having grown up in Galle, we know every 
                  corner of the fort and are delighted to share our insider knowledge with 
                  our guests.
                </p>
                <p className="mb-6">
                  From recommending the best local restaurants to arranging day trips to nearby 
                  beaches, we're here to ensure your stay exceeds expectations. Our breakfast 
                  chef specializes in traditional Sri Lankan cuisine, offering guests an 
                  authentic taste of local flavors every morning.
                </p>
                <p>
                  We believe that great hospitality comes from the heart, and we treat every 
                  guest like family. This personal touch is what sets Dutch Wall Fort apart 
                  from larger hotels and makes your stay truly special.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Experience */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">The Dutch Wall Experience</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every detail has been carefully considered to create an authentic yet comfortable 
              experience in historic Galle Fort
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Authentic Architecture</h3>
              <p className="text-gray-600">
                Our villa showcases original Dutch colonial features including high ceilings, 
                wooden shutters, and traditional tile work, all carefully preserved and maintained.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Local Flavors</h3>
              <p className="text-gray-600">
                Start each day with our complimentary Sri Lankan breakfast featuring fresh tropical 
                fruits, traditional breads, and aromatic local teas and coffee.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Cultural Immersion</h3>
              <p className="text-gray-600">
                Beyond accommodation, we provide cultural insights, local recommendations, and 
                assistance with tours to help you experience authentic Sri Lankan life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Accessibility */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Perfect Location, Easy Access
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Within Galle Fort</h3>
                    <p className="text-gray-600">Located on historic Church Street, in the heart of the UNESCO World Heritage site</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Walking Distance</h3>
                    <p className="text-gray-600">All major Fort attractions, restaurants, and shops are within a 5-minute walk</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Transportation Hub</h3>
                    <p className="text-gray-600">Easy access to buses, tuk-tuks, and taxis for exploring wider Galle and beyond</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Airport Access</h3>
                    <p className="text-gray-600">Approximately 35-40 minutes drive to Koggala Airport, transfers can be arranged</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-600">
                <MapPin size={48} className="mx-auto mb-4" />
                <p className="text-lg font-medium">Interactive Map</p>
                <p>73 Church St, Galle Fort</p>
                <a
                  href="https://maps.app.goo.gl/zvuY69dauMw9wqXY8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 hover:text-amber-800 font-medium mt-2 inline-block"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-amber-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Experience Dutch Wall Fort
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Join the many guests who have made Dutch Wall Fort their home away from home in Galle
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-amber-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 inline-flex items-center justify-center"
            >
              Send Booking Inquiry
            </a>
            <a
              href="tel:+94765721495"
              className="border-2 border-white text-white hover:bg-white hover:text-amber-600 px-8 py-3 rounded-full font-semibold text-lg transition-colors duration-200 inline-flex items-center justify-center"
            >
              Call: +94 76 572 1495
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;