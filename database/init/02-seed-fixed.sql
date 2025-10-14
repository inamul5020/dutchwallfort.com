-- Seed data for Dutch Wall Fort

-- Insert admin user (password: admin123)
INSERT INTO users (email, password, name, role, created_at, updated_at) VALUES
('admin@dutchwallfort.com', '$2b$10$vZaPiDrNS0kGdODFMnQU6OOPDYLlqbaRBugYjwUoM0fLchF7BYMLW', 'Admin User', 'admin', NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- Insert room data
INSERT INTO rooms (slug, name, short_description, long_description, capacity, beds, amenities, price, images, is_active, created_at, updated_at) VALUES
('deluxe-family-room', 'Deluxe Family Room', 'Spacious family room with balcony and garden view', 'Our most spacious accommodation offers the perfect blend of comfort and charm for families visiting Galle Fort.', 4, '1 double bed + 2 single beds', '["Air conditioning", "Private bathroom", "Complimentary breakfast", "Free Wi-Fi"]', 15000.00, '["/images/bedroom1_1.jpg", "/images/bedroom1_2.jpg"]', true, NOW(), NOW()),
('superior-room', 'Superior Room', 'Comfortable room with private entrance and work area', 'The Superior Room offers an ideal balance of space, comfort, and privacy for couples or small families.', 3, '1 double bed + 1 single bed', '["Air conditioning", "Private bathroom", "Complimentary breakfast", "Free Wi-Fi"]', 12000.00, '["/images/bedroom2_1.jpg", "/images/bedroom2_2.jpg"]', true, NOW(), NOW()),
('standard-room', 'Standard Room', 'Cozy room with all essential amenities', 'Our Standard Room may be cozy in size, but it''s generous in comfort and style.', 2, '1 double bed', '["Air conditioning", "Private bathroom", "Complimentary breakfast", "Free Wi-Fi"]', 9000.00, '["/images/bedroom3_1.jpg", "/images/bedroom3_2.jpg"]', true, NOW(), NOW()),
('premium-room', 'Premium Room', 'Premium Room with modern amenities', 'Our premium accommodation offers extra space and luxury amenities.', 3, '1 double bed + 1 single bed', '["Air conditioning", "Private bathroom", "Private balcony", "Premium furnishings"]', 18000.00, '["/images/bedroom4_1.jpg", "/images/bedroom4_2.jpg"]', true, NOW(), NOW()),
('whole-villa', 'Whole Villa Rental', 'Entire Villa for up to 12 guests', 'Book the entire Dutch Wall Fort villa for your group, family reunion, or special celebration.', 12, '4 rooms: 3 double beds + 4 single beds', '["All 4 rooms included", "Exclusive villa access", "Full kitchen access", "Terrace & garden"]', 45000.00, '["/images/Exterior_1.jpg", "/images/livingroom.jpg"]', true, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- Insert services data
INSERT INTO services (slug, name, description, type, duration, price, features, is_active, created_at, updated_at) VALUES
('galle-fort-walking-tour', 'Galle Fort Walking Tour', 'Comprehensive guided walking tour of historic Galle Fort', 'tours', '2-3 hours', 3000.00, '["Professional guide", "Historical insights"]', true, NOW(), NOW()),
('airport-transfer', 'Airport Transfer Service', 'Comfortable transfer service between airports and Dutch Wall Fort', 'transport', 'One way', 8000.00, '["Air-conditioned vehicle", "Professional driver"]', true, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- Insert blog categories
INSERT INTO blog_categories (slug, name, description, color, is_active, created_at, updated_at) VALUES
('travel-guides', 'Travel Guides', 'Comprehensive guides for exploring Galle and Sri Lanka', '#3B82F6', true, NOW(), NOW()),
('local-culture', 'Local Culture', 'Insights into Sri Lankan culture and traditions', '#10B981', true, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- Insert sample blog posts
INSERT INTO blog_posts (slug, title, excerpt, content, category_id, author, is_published, published_at, created_at, updated_at) VALUES
('discover-galle-fort-guide', 'Discover Galle Fort: A Complete Guide', 'Everything you need to know about exploring this UNESCO World Heritage Site', '<h2>A Walk Through History</h2><p>Galle Fort is a living monument to Sri Lanka''s colonial past.</p>', 1, 'Dutch Wall Fort Team', true, NOW() - INTERVAL '1 day', NOW(), NOW()),
('best-local-restaurants', 'Best Local Restaurants in Galle Fort', 'Discover the culinary delights of Galle Fort', '<h2>Culinary Adventures</h2><p>Galle Fort offers excellent dining options.</p>', 1, 'Dutch Wall Fort Team', true, NOW() - INTERVAL '2 days', NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- Insert sample reviews
INSERT INTO reviews (guest_name, rating, comment, is_approved, created_at, updated_at) VALUES
('Sarah Johnson', 5, 'Absolutely wonderful stay at Dutch Wall Fort!', true, NOW(), NOW()),
('Michael Chen', 5, 'Perfect location and excellent service!', true, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Insert sample bookings
INSERT INTO bookings (guest_name, guest_email, guest_phone, check_in, check_out, room_id, guests, message, status, created_at, updated_at) VALUES
('John Smith', 'john.smith@email.com', '+1-555-0123', '2024-12-15', '2024-12-18', 1, 2, 'Looking forward to our stay!', 'confirmed', NOW(), NOW()),
('Emma Wilson', 'emma.wilson@email.com', '+1-555-0456', '2024-12-20', '2024-12-22', 2, 2, 'Can''t wait to explore Galle Fort!', 'pending', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Insert sample testimonials
INSERT INTO testimonials (guest_name, guest_location, rating, title, content, is_featured, is_approved, created_at, updated_at) VALUES
('Sarah & Michael Johnson', 'New York, USA', 5, 'Perfect Galle Fort Experience', 'Our stay at Dutch Wall Fort was absolutely magical!', true, true, NOW(), NOW()),
('David & Lisa Brown', 'London, UK', 5, 'Historic Charm Meets Modern Comfort', 'The perfect blend of history and luxury.', true, true, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Insert sample gallery images using actual image files
INSERT INTO gallery_images (title, description, image_url, thumbnail_url, category, alt_text, sort_order, is_active, is_featured, created_at, updated_at) VALUES
('Dutch Wall Fort Exterior', 'The beautiful colonial facade of Dutch Wall Fort', '/images/Exterior_1.jpg', '/images/Exterior_1.jpg', 'exterior', 'Dutch Wall Fort colonial building exterior', 1, true, true, NOW(), NOW()),
('Historic Entrance', 'The grand entrance to Dutch Wall Fort', '/images/Exterior_2.jpg', '/images/Exterior_2.jpg', 'exterior', 'Historic entrance gate of Dutch Wall Fort', 2, true, true, NOW(), NOW()),
('Luxury Suite Living Room', 'Elegant living space in our luxury suite', '/images/livingroom.jpg', '/images/livingroom.jpg', 'rooms', 'Luxury suite living room with colonial furniture', 3, true, true, NOW(), NOW()),
('Master Bedroom', 'Spacious master bedroom with period furniture', '/images/bedroom1_1.jpg', '/images/bedroom1_1.jpg', 'rooms', 'Master bedroom with four-poster bed', 4, true, true, NOW(), NOW()),
('Dining Room', 'Elegant dining space for guests', '/images/dining area_1.jpg', '/images/dining area_1.jpg', 'dining', 'Colonial dining room with period furniture', 5, true, true, NOW(), NOW()),
('Garden Courtyard', 'Beautiful courtyard garden', '/images/balcony_1.jpg', '/images/balcony_1.jpg', 'garden', 'Courtyard garden with tropical plants', 6, true, true, NOW(), NOW()),
('Kitchen Area', 'Fully equipped kitchen for guests', '/images/kitchen_1.jpg', '/images/kitchen_1.jpg', 'amenities', 'Modern kitchen with colonial charm', 7, true, false, NOW(), NOW()),
('Additional Living Space', 'Comfortable living area for relaxation', '/images/livingroom_1.jpg', '/images/livingroom_1.jpg', 'amenities', 'Additional living space with period furniture', 8, true, false, NOW(), NOW()),
('Sunset from Ramparts', 'Breathtaking sunset view from fort walls', '/images/Exterior_4.jpg', '/images/Exterior_4.jpg', 'general', 'Sunset view from Galle Fort ramparts', 9, true, true, NOW(), NOW()),
('Local Market', 'Vibrant local market near the fort', '/images/Exterior_5.jpg', '/images/Exterior_5.jpg', 'general', 'Local market with fresh produce', 10, true, false, NOW(), NOW())
ON CONFLICT DO NOTHING;
