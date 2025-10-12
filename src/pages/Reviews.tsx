import React from 'react';
import { Star, ExternalLink, Quote } from 'lucide-react';

const Reviews = () => {
  const reviewStats = {
    overall: 4.8,
    totalReviews: 127,
    breakdown: {
      5: 85,
      4: 25,
      3: 12,
      2: 3,
      1: 2
    }
  };

  const featuredReviews = [
    {
      id: 1,
      author: "Sarah M.",
      location: "United Kingdom",
      date: "November 2024",
      rating: 5,
      title: "Perfect location and lovely hosts",
      content: "Amazing location inside the Fort, breakfast was delightful. The host was incredibly helpful with recommendations for local restaurants and attractions. Our room was spacious and clean with a lovely balcony view. Walking distance to everything!",
      source: "TripAdvisor",
      verified: true
    },
    {
      id: 2,
      author: "Raj P.",
      location: "India",
      date: "October 2024",
      rating: 5,
      title: "Excellent stay in Galle Fort",
      content: "Friendly staff and clean rooms. The Dutch colonial architecture is beautiful and well-maintained. Breakfast included traditional Sri Lankan dishes which were delicious. Highly recommended for families.",
      source: "Agoda",
      verified: true
    },
    {
      id: 3,
      author: "Michael T.",
      location: "Australia",
      date: "October 2024",
      rating: 5,
      title: "Great base for exploring Galle",
      content: "Perfect base for exploring Galle Fort. Walking distance to everything including the lighthouse and ramparts. The breakfast spread was fantastic with fresh tropical fruits. The room had everything we needed including AC and hot water.",
      source: "Airbnb",
      verified: true
    },
    {
      id: 4,
      author: "Emma L.",
      location: "Canada",
      date: "September 2024",
      rating: 4,
      title: "Charming villa with character",
      content: "Beautiful colonial architecture and great location within the fort walls. Our family room was comfortable for 4 people. The terrace is a lovely spot for morning coffee. Minor issue with WiFi but otherwise excellent stay.",
      source: "Booking.com",
      verified: true
    },
    {
      id: 5,
      author: "David K.",
      location: "Netherlands",
      date: "September 2024",
      rating: 5,
      title: "Authentic Dutch colonial experience",
      content: "As someone from the Netherlands, I appreciated the authentic Dutch colonial architecture. The villa is beautifully preserved. Breakfast was excellent with both local and international options. Staff went above and beyond to help us.",
      source: "TripAdvisor",
      verified: true
    },
    {
      id: 6,
      author: "Lisa W.",
      location: "Germany",
      date: "August 2024",
      rating: 5,
      title: "Wonderful hospitality",
      content: "The hospitality here is outstanding. Our hosts made us feel like family and gave us so many helpful tips for exploring the area. The room was spotless and the location couldn't be better. We'll definitely be back!",
      source: "Airbnb",
      verified: true
    }
  ];

  const reviewPlatforms = [
    {
      name: "TripAdvisor",
      rating: 4.8,
      reviews: 45,
      url: "https://www.tripadvisor.com/Hotel_Review-g297896-d20861642-Reviews-Dutch_Wall_Fort-Galle_Galle_District_Southern_Province.html",
      initial: "T",
      color: "#00AF87"
    },
    {
      name: "Google",
      rating: 4.9,
      reviews: 28,
      url: "https://www.google.com/maps/place/Dutch+Wall+Fort/@6.0254,-80.2162,17z/data=!4m8!3m7!1s0x3ae173bb6932fce3:0x4a35b903f9b8c23a!8m2!3d6.0254!4d-80.2162!9m1!1b1!16s%2Fg%2F11j0k8qr8s",
      initial: "G",
      color: "#4285F4"
    },
    {
      name: "Airbnb",
      rating: 4.9,
      reviews: 38,
      url: "https://www.airbnb.com/rooms/34005692",
      initial: "A",
      color: "#FF5A5F"
    },
    {
      name: "Agoda",
      rating: 4.7,
      reviews: 32,
      url: "https://www.agoda.com/dutch-wall-fort/hotel/galle-lk.html",
      initial: "A",
      color: "#3B82F6"
    },
    {
      name: "Booking.com",
      rating: 4.8,
      reviews: 12,
      url: "#",
      initial: "B",
      color: "#003580"
    }
  ];

  const getPercentage = (count: number) => {
    return Math.round((count / reviewStats.totalReviews) * 100);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-800 to-amber-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Guest Reviews</h1>
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className="text-yellow-400 fill-current" 
                  size={32} 
                />
              ))}
            </div>
            <span className="ml-4 text-2xl font-bold">{reviewStats.overall}/5</span>
          </div>
          <p className="text-xl">
            Based on {reviewStats.totalReviews} verified guest reviews across multiple platforms
          </p>
        </div>
      </section>

      {/* Review Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Review Breakdown</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Rating Distribution */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <div className="flex items-center w-16">
                        <span className="mr-2">{rating}</span>
                        <Star className="text-yellow-400 fill-current" size={16} />
                      </div>
                      <div className="flex-1 mx-4 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-amber-500 h-3 rounded-full"
                          style={{ 
                            width: `${getPercentage(reviewStats.breakdown[rating as keyof typeof reviewStats.breakdown])}%` 
                          }}
                        ></div>
                      </div>
                      <span className="w-12 text-sm text-gray-600">
                        {getPercentage(reviewStats.breakdown[rating as keyof typeof reviewStats.breakdown])}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Platform Ratings */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Ratings</h3>
                <div className="space-y-4">
                  {reviewPlatforms.map((platform, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-8 h-8 mr-3 flex items-center justify-center rounded-full text-white font-bold text-sm" style={{backgroundColor: platform.color}}>
                          {platform.initial}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{platform.name}</div>
                          <div className="text-sm text-gray-600">{platform.reviews} reviews</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center">
                          <Star className="text-yellow-400 fill-current mr-1" size={16} />
                          <span className="font-semibold text-gray-900">{platform.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Reviews */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Guests Are Saying</h2>
            <p className="text-lg text-gray-600">Recent verified reviews from our valued guests</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredReviews.map((review) => (
              <div key={review.id} className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            size={16} 
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-600">{review.date}</div>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      {review.verified && <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">Verified</span>}
                    </div>
                  </div>

                  {/* Quote Icon */}
                  <Quote className="text-amber-200 mb-3" size={24} />

                  {/* Title */}
                  <h3 className="font-semibold text-gray-900 mb-2">{review.title}</h3>

                  {/* Content */}
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">{review.content}</p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <div className="font-medium text-gray-900">{review.author}</div>
                      <div className="text-xs text-gray-600">{review.location}</div>
                    </div>
                    <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                      {review.source}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Platforms */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Read More Reviews</h2>
          <p className="text-gray-600 mb-12">
            See what guests are saying about Dutch Wall Fort on these trusted platforms
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {reviewPlatforms.map((platform, index) => (
              <a
                key={index}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1 block"
              >
                <div className="h-12 mb-3 flex items-center justify-center">
                  {platform.name === 'TripAdvisor' && (
                    <img 
                      src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg" 
                      alt="TripAdvisor" 
                      className="h-8 w-auto max-w-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling!.classList.remove('hidden');
                      }}
                    />
                  )}
                  {platform.name === 'Google' && (
                    <img 
                      src="https://developers.google.com/identity/images/g-logo.png" 
                      alt="Google" 
                      className="h-8 w-auto"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling!.classList.remove('hidden');
                      }}
                    />
                  )}
                  {platform.name === 'Airbnb' && (
                    <img 
                      src="https://a0.muscache.com/airbnb/static/logos/belo-200x200-4d851c5b28f61931bf1df28dd15e60ef.png" 
                      alt="Airbnb" 
                      className="h-8 w-auto"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling!.classList.remove('hidden');
                      }}
                    />
                  )}
                  {platform.name === 'Agoda' && (
                    <img 
                      src="https://cdn6.agoda.net/images/kite-js/logo/agoda/color-default.svg" 
                      alt="Agoda" 
                      className="h-8 w-auto"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling!.classList.remove('hidden');
                      }}
                    />
                  )}
                  {platform.name === 'Booking.com' && (
                    <img 
                      src="https://cf.bstatic.com/static/img/booking_logo_knowledge_graph/247454a990efac1952e44dddbf30c58677aa0fd8.png" 
                      alt="Booking.com" 
                      className="h-8 w-auto max-w-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling!.classList.remove('hidden');
                      }}
                    />
                  )}
                  {/* Fallback */}
                  <div className="hidden w-10 h-10 flex items-center justify-center rounded-full text-white font-bold text-lg" style={{backgroundColor: platform.color}}>
                    {platform.initial}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{platform.name}</h3>
                <div className="flex items-center justify-center mb-2">
                  <Star className="text-yellow-400 fill-current mr-1" size={16} />
                  <span className="font-medium text-gray-900">{platform.rating}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{platform.reviews} reviews</p>
                <div className="inline-flex items-center text-amber-600 hover:text-amber-800 font-medium text-sm">
                  Read Reviews
                  <ExternalLink size={14} className="ml-1" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Leave a Review CTA */}
      <section className="py-16 bg-amber-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Stayed With Us Recently?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            We'd love to hear about your experience. Your feedback helps us improve and helps other travelers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.tripadvisor.com/Hotel_Review-g297896-d20861642-Reviews-Dutch_Wall_Fort-Galle_Galle_District_Southern_Province.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-amber-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 inline-flex items-center justify-center"
            >
              Leave a TripAdvisor Review
              <ExternalLink size={18} className="ml-2" />
            </a>
            <a
              href="mailto:reservations@dutchwallfort.com?subject=Feedback&body=Hello, I recently stayed at Dutch Wall Fort and wanted to share my experience..."
              className="border-2 border-white text-white hover:bg-white hover:text-amber-600 px-8 py-3 rounded-full font-semibold text-lg transition-colors duration-200"
            >
              Send Direct Feedback
            </a>
          </div>
        </div>
      </section>

      {/* Book Again CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Experience Dutch Wall Fort?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join our satisfied guests and book your stay in historic Galle Fort
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-amber-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-amber-700 transition-colors duration-200"
            >
              Book Your Stay
            </a>
            <a
              href="tel:+94765721495"
              className="border-2 border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-3 rounded-full font-semibold text-lg transition-colors duration-200"
            >
              Call: +94 76 572 1495
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;