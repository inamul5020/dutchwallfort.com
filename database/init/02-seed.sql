-- Seed data for Dutch Wall Fort

-- Insert admin user (password: admin123)
-- Note: This is a bcrypt hash for 'admin123' - you should change this in production
INSERT INTO users (email, password, name, role) VALUES
('admin@dutchwallfort.com', '$2b$10$vZaPiDrNS0kGdODFMnQU6OOPDYLlqbaRBugYjwUoM0fLchF7BYMLW', 'Admin User', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert room data
INSERT INTO rooms (slug, name, short_description, long_description, capacity, beds, amenities, price, images, is_active) VALUES
('deluxe-family-room', 'Deluxe Family Room', 'Spacious family room with balcony and garden view', 'Our most spacious accommodation offers the perfect blend of comfort and charm for families visiting Galle Fort. This room features a private balcony overlooking our lush garden, comfortable sleeping arrangements, and all modern amenities.', 4, '1 double bed + 2 single beds', '["Air conditioning", "Private bathroom", "Balcony", "Garden view", "Free Wi-Fi", "Work desk", "Daily housekeeping", "Mini fridge"]', 15000.00, '["/images/bedroom1_1.jpg", "/images/bedroom1_2.jpg", "/images/bedroom1_3.jpg"]', true),
('superior-room', 'Superior Room', 'Comfortable room with private entrance and work area', 'The Superior Room offers an ideal balance of space, comfort, and privacy for couples or small families. With its own private entrance and dedicated work area, this room is perfect for both leisure and business travelers.', 3, '1 double bed + 1 single bed', '["Air conditioning", "Private bathroom", "Private entrance", "Work desk", "Free Wi-Fi", "Daily housekeeping", "Tea & coffee maker"]', 12000.00, '["/images/bedroom2_1.jpg", "/images/bedroom2_2.jpg", "/images/bedroom2_3.jpg"]', true),
('standard-room', 'Standard Room', 'Cozy room with all essential amenities', 'Our Standard Room may be cozy in size, but it is generous in comfort and style. Perfect for couples seeking an authentic Galle Fort experience, this room provides everything you need for a comfortable stay.', 2, '1 double bed', '["Air conditioning", "Private bathroom", "Free Wi-Fi", "Daily housekeeping", "Tea & coffee maker"]', 9000.00, '["/images/bedroom3_1.jpg", "/images/bedroom3_2.jpg"]', true),
('heritage-suite', 'Heritage Suite', 'Luxurious suite with colonial architecture', 'Experience the grandeur of Dutch colonial architecture in our Heritage Suite. This spacious room features high ceilings, antique furniture, and a separate living area.', 2, '1 king bed', '["Air conditioning", "Private bathroom", "Separate living area", "Bathtub", "Garden view", "Free Wi-Fi", "Work desk", "Mini bar"]', 18000.00, '["/images/bedroom4_1.jpg", "/images/bedroom4_2.jpg"]', true)
ON CONFLICT (slug) DO NOTHING;

-- Insert services data
INSERT INTO services (slug, name, description, type, duration, price, features, is_active) VALUES
('galle-fort-walking-tour', 'Galle Fort Walking Tour', 'Comprehensive guided walking tour of historic Galle Fort, exploring Dutch colonial architecture, ancient ramparts, and hidden gems of this UNESCO World Heritage Site.', 'tours', '2-3 hours', 3000.00, '["Professional guide", "Historical insights", "Photo opportunities", "Local recommendations"]', true),
('southern-coast-day-tour', 'Southern Coast Day Tour', 'Explore the stunning southern coast including Unawatuna Beach, Jungle Beach, turtle hatchery, and local attractions.', 'tours', 'Full day', 8000.00, '["Transportation included", "Professional driver", "Multiple stops", "Flexible itinerary"]', true),
('yala-safari-tour', 'Yala National Park Safari', 'Experience Sri Lankas wildlife with a full-day safari tour to Yala National Park, home to leopards, elephants, and diverse bird species.', 'tours', 'Full day', 15000.00, '["4x4 safari vehicle", "Park entrance fees", "Breakfast", "Professional tracker", "Binoculars provided"]', true),
('airport-transfer', 'Airport Transfer Service', 'Comfortable and reliable transfer service between Colombo/Koggala airports and Dutch Wall Fort.', 'transport', 'One way', 8000.00, '["Air-conditioned vehicle", "Professional driver", "Door-to-door service", "Luggage assistance", "Flight tracking"]', true),
('vehicle-rental-with-driver', 'Vehicle Rental with Driver', 'Rent a comfortable vehicle with experienced local driver for your custom explorations around Galle and beyond.', 'transport', 'Per day (8 hours)', 12000.00, '["Experienced driver", "Fuel included", "Insurance covered", "Flexible itinerary", "English speaking driver"]', true),
('tuk-tuk-rental', 'Tuk-Tuk City Tours', 'Experience authentic Sri Lankan travel with a tuk-tuk and driver for exploring Galle Fort and nearby areas.', 'transport', 'Per day', 6000.00, '["Experienced driver", "Fuel included", "City tour route", "Fun experience"]', true),
('currency-exchange', 'Currency Exchange Service', 'Convenient money exchange service at competitive rates for major currencies.', 'services', 'Instant', 0.00, '["Competitive rates", "Major currencies accepted", "Secure transactions", "No hidden fees"]', true),
('laundry-service', 'Laundry Service', 'Professional laundry and dry cleaning service with same-day or next-day delivery.', 'services', '24-48 hours', 500.00, '["Same/next day service", "Professional cleaning", "Folded and pressed", "Per kg pricing"]', true)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample blog post
INSERT INTO blog_posts (slug, title, excerpt, content, author_id, status, published_at) VALUES
('discover-galle-fort-guide', 'Discover Galle Fort: A Complete Guide', 'Everything you need to know about exploring this UNESCO World Heritage Site and its rich Dutch colonial history.',
'Galle Fort, located on the southwestern tip of Sri Lanka, is a living monument to the islands colonial past. Built first by the Portuguese in 1588, then extensively fortified by the Dutch during the 17th century, the fort stands as one of the best-preserved colonial fortresses in Asia.

## A Walk Through History

Walking through the cobblestone streets of Galle Fort is like stepping back in time. The massive ramparts, originally built to defend against invaders, now provide stunning views of the Indian Ocean and serve as a popular promenade for locals and tourists alike.

## Must-Visit Attractions

### The Ramparts
The fortifications stretch for 3km around the peninsula, offering breathtaking ocean views and the perfect spot for sunset watching.

### Dutch Reformed Church
Built in 1755, this historic church features beautiful old tombstones and a unique floor made of gravestones.

### Lighthouse
The iconic white lighthouse, built in 1938, has become a symbol of Galle Fort and offers spectacular photo opportunities.

### Museums
Visit the National Maritime Museum and the Historical Mansion Museum to learn about the forts rich history.

## Where to Stay

Dutch Wall Fort offers comfortable accommodation in the heart of the fort, providing easy access to all major attractions while maintaining the authentic character of this historic area.

## Best Time to Visit

Galle Fort can be visited year-round, but the best weather is typically from December to March. The fort is particularly magical during sunset when the golden light illuminates the ancient walls.',
(SELECT id FROM users WHERE email = 'admin@dutchwallfort.com' LIMIT 1),
'published',
CURRENT_TIMESTAMP)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample reviews
INSERT INTO reviews (guest_name, rating, comment, is_approved) VALUES
('Sarah Johnson', 5, 'Absolutely wonderful stay at Dutch Wall Fort! The rooms are spacious and clean, and the location right in the heart of Galle Fort is perfect. The hosts were incredibly helpful with tour arrangements.', true),
('Michael Chen', 5, 'Best accommodation in Galle Fort! Beautiful colonial architecture, modern amenities, and exceptional service. The family room was perfect for our group of four.', true),
('Emma Williams', 4, 'Great location and comfortable rooms. The staff helped us arrange a fantastic day tour of the southern coast. Would definitely recommend to friends visiting Sri Lanka.', true)
ON CONFLICT DO NOTHING;
