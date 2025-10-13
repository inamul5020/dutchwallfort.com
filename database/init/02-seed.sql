-- Seed data for Dutch Wall Fort

-- Insert admin user (password: admin123)
-- Note: This is a bcrypt hash for 'admin123' - you should change this in production
INSERT INTO users (email, password, name, role) VALUES
('admin@dutchwallfort.com', '$2b$10$vZaPiDrNS0kGdODFMnQU6OOPDYLlqbaRBugYjwUoM0fLchF7BYMLW', 'Admin User', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert room data
INSERT INTO rooms (slug, name, short_description, long_description, capacity, beds, amenities, price, images, is_active) VALUES
('deluxe-family-room', 'Deluxe Family Room', 'Spacious family room with balcony and garden view', 'Our most spacious accommodation offers the perfect blend of comfort and charm for families visiting Galle Fort. The room features a comfortable double bed and two single beds, ensuring everyone has a restful night''s sleep. Step out onto your private balcony to enjoy garden views and the peaceful atmosphere of historic Church Street. The room maintains the villa''s Dutch colonial character while providing all modern amenities including air conditioning, private bathroom with shower, and complimentary Wi-Fi. The space includes a convenient work desk for those who need to stay connected, and the private entrance ensures your privacy and comfort throughout your stay.', 4, '1 double bed + 2 single beds', '["Air conditioning", "Private bathroom (shower)", "Complimentary breakfast", "Free Wi-Fi", "Private balcony", "Garden view", "Work desk", "Private entrance", "Daily housekeeping", "Safe"]', 15000.00, '["/images/bedroom1_1.jpg", "/images/bedroom1_2.jpg", "/images/bedroom1_3.jpg", "/images/bedroom1_4.jpg", "/images/bedroom1_5.jpg", "/images/bedroom1_6.jpg"]', true),
('superior-room', 'Superior Room', 'Comfortable room with private entrance and work area', 'The Superior Room offers an ideal balance of space, comfort, and privacy for couples or small families. Featuring a double bed and single bed, this room is perfect for those seeking a bit more space during their stay in Galle Fort. The room includes a dedicated work desk area, making it suitable for business travelers or digital nomads. Your private entrance ensures complete independence, while the modern amenities including air conditioning, private bathroom, and mini fridge add to your comfort. The room showcases beautiful Dutch colonial architectural details while providing contemporary conveniences for a memorable stay.', 3, '1 double bed + 1 single bed', '["Air conditioning", "Private bathroom (shower)", "Complimentary breakfast", "Free Wi-Fi", "Private entrance", "Work desk", "Mini fridge", "Daily housekeeping", "Safe", "Reading lights"]', 12000.00, '["/images/bedroom2_1.jpg", "/images/bedroom2_2.jpg", "/images/bedroom2_3.jpg", "/images/bedroom2_4.jpg", "/images/bedroom2_5.jpg"]', true),
('standard-room', 'Standard Room', 'Cozy room with all essential amenities', 'Our Standard Room may be cozy in size, but it''s generous in comfort and style. Perfect for couples seeking an intimate and comfortable base for exploring Galle Fort. The room features a comfortable double bed with quality linens, ensuring a good night''s rest after your adventures. Despite being our most compact option, the room includes all essential amenities including air conditioning, private bathroom, and complimentary breakfast. The space is thoughtfully designed to maximize comfort while maintaining the charm and character of our Dutch colonial villa. Daily housekeeping and a personal safe add to your peace of mind during your stay.', 2, '1 double bed', '["Air conditioning", "Private bathroom (shower)", "Complimentary breakfast", "Free Wi-Fi", "Daily housekeeping", "Safe", "Reading lights", "Wardrobe", "Mirror", "Electrical outlets"]', 9000.00, '["/images/bedroom3_1.jpg", "/images/bedroom3_2.jpg", "/images/bedroom3_3.jpg", "/images/bedroom3_4.jpg"]', true),
('premium-room', 'Premium Room', 'Premium Room — 2-3 guests, spacious with modern amenities', 'Our premium accommodation offers extra space and luxury amenities. Perfect for guests seeking additional comfort and style during their stay in Galle Fort. This spacious room features premium furnishings, a private balcony, and modern amenities that elevate your experience to the next level. Whether you''re celebrating a special occasion or simply want to indulge in the best our villa has to offer, the Premium Room provides an exceptional blend of comfort, style, and convenience. Enjoy the enhanced amenities including a mini bar, premium bedding, and additional space for relaxation or work.', 3, '1 double bed + 1 single bed', '["Air conditioning", "Private bathroom (shower)", "Private balcony", "Premium furnishings", "Mini bar", "Complimentary breakfast", "Free Wi-Fi", "Work desk", "Daily housekeeping", "Safe", "Room service"]', 18000.00, '["/images/bedroom4_1.jpg", "/images/bedroom4_2.jpg", "/images/bedroom4_3.jpg", "/images/bedroom4_4.jpg", "/images/bedroom4_5.jpg"]', true),
('whole-villa', 'Whole Villa Rental', 'Entire Villa — Up to 12 guests, all rooms included', 'Book the entire Dutch Wall Fort villa for your group, family reunion, or special celebration. This exclusive rental includes all four beautifully appointed rooms, common living areas, terrace, full kitchen access, and complete privacy for your group. Perfect for larger gatherings, corporate retreats, or anyone seeking an authentic Galle Fort experience with the luxury of an entire historic villa. Your group will enjoy private dining areas, multiple balconies, garden access, and personalized concierge service. The whole villa rental provides the ultimate in comfort and exclusivity, with dedicated staff ensuring your every need is met throughout your stay.', 12, '4 rooms: 3 double beds + 4 single beds', '["All 4 rooms included", "Exclusive villa access", "Full kitchen access", "Terrace & garden", "Multiple balconies", "Group breakfast service", "Concierge service", "Event planning assistance", "Private chef available", "Daily housekeeping", "Welcome amenities", "Airport transfers"]', 45000.00, '["/images/Exterior_1.jpg", "/images/livingroom.jpg", "/images/dining area_1.jpg", "/images/balcony_1.jpg", "/images/kitchen_1.jpg", "/images/Exterior_3.jpg", "/images/balcony_2.jpg"]', true)
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

-- Insert sample bookings
INSERT INTO bookings (guest_name, guest_email, guest_phone, check_in, check_out, room_id, guests, message, status) VALUES
('John Smith', 'john.smith@email.com', '+1-555-0123', '2024-12-15', '2024-12-18', 1, 2, 'Looking forward to our stay in Galle Fort!', 'confirmed'),
('Maria Garcia', 'maria.garcia@email.com', '+44-20-7946-0958', '2024-12-20', '2024-12-23', 2, 3, 'Family vacation with our daughter. Please arrange airport pickup.', 'pending'),
('David Lee', 'david.lee@email.com', '+61-2-9374-4000', '2024-12-25', '2024-12-28', 3, 2, 'Anniversary trip. Would love a room with a view.', 'confirmed'),
('Anna Kowalski', 'anna.kowalski@email.com', '+48-22-123-4567', '2024-12-30', '2025-01-02', 4, 2, 'New Year celebration in Galle Fort!', 'pending'),
('Robert Brown', 'robert.brown@email.com', '+1-555-0456', '2025-01-05', '2025-01-10', 5, 12, 'Corporate retreat. Need the whole villa for our team.', 'confirmed')
ON CONFLICT DO NOTHING;

-- Insert sample testimonials
INSERT INTO testimonials (guest_name, guest_location, rating, title, content, is_featured, is_approved) VALUES
('Sarah & Michael Johnson', 'New York, USA', 5, 'Perfect Galle Fort Experience', 'Our stay at Dutch Wall Fort was absolutely magical! The historic charm combined with modern amenities made it the perfect base for exploring Galle Fort. The staff was incredibly welcoming and the breakfast was delicious. We can''t wait to return!', true, true),
('Emma Thompson', 'London, UK', 5, 'A Hidden Gem', 'What a beautiful property! The attention to detail in preserving the colonial architecture while providing modern comfort is remarkable. The balcony views are stunning, and the location right in the heart of Galle Fort is unbeatable. Highly recommended!', true, true),
('James & Lisa Chen', 'Melbourne, Australia', 5, 'Exceeded All Expectations', 'We booked the whole villa for our family reunion and it was perfect! Each room has its own character, the common areas are spacious, and the garden is lovely. The staff went above and beyond to make our stay special. Thank you for the memories!', true, true),
('Maria Rodriguez', 'Barcelona, Spain', 4, 'Charming and Authentic', 'Dutch Wall Fort offers an authentic Galle Fort experience. The rooms are beautifully decorated, the location is perfect for exploring, and the staff is very helpful. The only minor issue was the WiFi speed, but everything else was wonderful.', false, true),
('Ahmed Hassan', 'Dubai, UAE', 5, 'Outstanding Hospitality', 'From the moment we arrived, we felt welcomed and cared for. The property is stunning, the rooms are comfortable, and the breakfast is excellent. The staff helped us plan our Galle Fort itinerary and even arranged a tuk-tuk tour. Highly recommended!', false, true),
('Sophie & Pierre Dubois', 'Paris, France', 5, 'Magnifique!', 'Une expérience inoubliable dans le fort de Galle! L''architecture coloniale hollandaise est préservée avec goût, les chambres sont confortables et l''accueil est chaleureux. Nous recommandons vivement cette adresse.', false, true)
ON CONFLICT DO NOTHING;
