import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  guestName: string;
  guestLocation?: string;
  rating: number;
  title?: string;
  content: string;
  avatar?: string;
  isFeatured: boolean;
  createdAt: string;
}

interface TestimonialsProps {
  featuredOnly?: boolean;
  maxItems?: number;
  showNavigation?: boolean;
  className?: string;
}

const Testimonials: React.FC<TestimonialsProps> = ({
  featuredOnly = false,
  maxItems = 6,
  showNavigation = true,
  className = ""
}) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const params = new URLSearchParams();
        if (featuredOnly) params.append('featured', 'true');
        params.append('approved', 'true');
        
        const response = await fetch(`/api/testimonials?${params}`);
        const result = await response.json();
        
        if (result.success) {
          setTestimonials(result.data.slice(0, maxItems));
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, [featuredOnly, maxItems]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={`${
          index < rating ? 'text-amber-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (isLoading) {
    return (
      <div className={`${className}`}>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className={`${className}`}>
        <div className="text-center py-12">
          <p className="text-gray-600">No testimonials available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          What Our Guests Say
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover why guests choose Dutch Wall Fort for their Galle Fort experience
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="relative">
        {/* Navigation Buttons */}
        {showNavigation && testimonials.length > 1 && (
          <>
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronLeft size={24} className="text-amber-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronRight size={24} className="text-amber-600" />
            </button>
          </>
        )}

        {/* Testimonials Container */}
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
                  {/* Quote Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="bg-amber-100 rounded-full p-3">
                      <Quote size={24} className="text-amber-600" />
                    </div>
                  </div>

                  {/* Content */}
                  <blockquote className="text-center mb-6">
                    <p className="text-lg text-gray-700 italic leading-relaxed">
                      "{testimonial.content}"
                    </p>
                  </blockquote>

                  {/* Rating */}
                  <div className="flex justify-center mb-4">
                    <div className="flex space-x-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>

                  {/* Guest Info */}
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      {testimonial.avatar ? (
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.guestName}
                          className="w-12 h-12 rounded-full object-cover mr-3"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-amber-600 font-semibold text-lg">
                            {testimonial.guestName.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {testimonial.guestName}
                        </h4>
                        {testimonial.guestLocation && (
                          <p className="text-sm text-gray-600">
                            {testimonial.guestLocation}
                          </p>
                        )}
                      </div>
                    </div>
                    {testimonial.title && (
                      <p className="text-sm text-amber-600 font-medium">
                        {testimonial.title}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        {showNavigation && testimonials.length > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-amber-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Grid View for Multiple Testimonials */}
      {!showNavigation && testimonials.length > 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {testimonials.slice(1).map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
              {/* Rating */}
              <div className="flex space-x-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Content */}
              <blockquote className="mb-4">
                <p className="text-gray-700 italic">
                  "{testimonial.content}"
                </p>
              </blockquote>

              {/* Guest Info */}
              <div className="flex items-center">
                {testimonial.avatar ? (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.guestName}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                ) : (
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-amber-600 font-semibold">
                      {testimonial.guestName.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {testimonial.guestName}
                  </h4>
                  {testimonial.guestLocation && (
                    <p className="text-xs text-gray-600">
                      {testimonial.guestLocation}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Testimonials;
