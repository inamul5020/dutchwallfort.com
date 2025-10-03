# Dutch Wall Fort — Website Content (Markdown)

> Complete site content and templates to develop the Dutch Wall Fort Villa website in Bolt CMS.
> Use this file as the single source of truth for pages, meta, booking form fields, image placeholders, and admin/email templates.

---

## Site overview
**Site name:** Dutch Wall Fort
**Short description:** Luxury boutique villa inside Galle Fort — comfortable family rooms with AC, private bathrooms and complimentary Sri Lankan breakfast.
**Address:** 73 Church St, Galle, Sri Lanka
**Phone:** +94 76 572 1495
**Primary CTA:** Book / Send Booking Inquiry

**Primary pages:** Home, Rooms, Room (template), About, Gallery, Local Area, Reviews, Contact, Policies & FAQs, Blog (optional)

---

# Front-matter / Global variables (example for Bolt)
Use these variables in your Twig templates / front-matter:

```
site_title: Dutch Wall Fort
site_description: Luxury boutique villa in the heart of Galle Fort — family rooms, free breakfast, AC, private bathrooms.
site_phone: "+94 76 572 1495"
site_address: "73 Church St, Galle, Sri Lanka"
site_email: reservations@dutchwallfort.com  # replace with actual
social:
  facebook: https://www.facebook.com/dutchwallfort/
  instagram: https://www.instagram.com/dutch__wall/
  tripadvisor: https://www.tripadvisor.com/Hotel_Review-g297896-d20861642-Reviews-Dutch_Wall_Fort-Galle_Galle_District_Southern_Province.html
timezone: Asia/Colombo
```

---

# Sitemap (pages and slugs)
```
/                         -> Home
/rooms                    -> Rooms list
/rooms/{room-slug}        -> Room detail (template)
/about                    -> About Us
/gallery                  -> Gallery
/local-area               -> Local Area / Things To Do
/reviews                  -> Reviews / Testimonials
/contact                  -> Contact & Booking Inquiry (or a modal/form on every page)
/policies                 -> Policies & FAQ
/blog                     -> Optional blog/news (for SEO)
```

---

# HTML Meta & SEO snippets (per page)

**Home page**
```
Title: Dutch Wall Fort — Boutique Villa in Galle Fort | Book Direct
Meta description: Stay inside Galle Fort at Dutch Wall — family rooms with AC, private bathrooms and complimentary Sri Lankan breakfast. Steps from Pedlar Street & Lighthouse Beach.
Open Graph: og:image -> /assets/images/hero.jpg
```

**Room pages** (example)
```
Title: {Room Name} — Dutch Wall Fort, Galle
Meta description: {Short 150 char summary of room features: occupancy, AC, private bathroom, balcony, breakfast included.}
```

**Canonical, hreflang, structured data:** implement as needed. See JSON-LD snippet below.

---

# Common UI elements & copy

**Primary header**
- Logo (left) — links to home
- Nav: Home | Rooms | About | Gallery | Local Area | Reviews | Contact
- Phone button (right) — click to call: +94 76 572 1495

**Footer**
- Address & map link
- Phone & email
- Social icons
- Small nav
- Copyright notice

**Primary CTA copy**
- "Check Availability" / "Send Booking Inquiry" / "Book Direct"

---

# Home (Content)

**Hero**
- Headline: "Dutch Wall Fort — Luxury Boutique Villa in the Heart of Galle Fort"
- Subline: "Comfortable family rooms • Complimentary Sri Lankan breakfast • Steps from Pedlar Street"
- Buttons: [Check Availability] [View Rooms]
- Background: hero.jpg (façade, terrace, or bedroom wide shot)

**Quick facts strip** (icons)
- Location: 73 Church St (in Fort)
- Free breakfast
- Free Wi-Fi
- Air conditioning
- Private bathrooms
- Family rooms

**Why choose us** (3 small columns)
- Family hospitality
- Dutch-colonial charm with modern comforts
- Prime location (walkable to Lighthouse & Pedlar Street)

**Featured rooms**
- 3 cards (image, short blurb, starting rate, CTA)

**Guest praise**
- Short rotating review snippets (pull from TripAdvisor / Airbnb)

**Map & location**
- Small map embed with CTA "Get directions"

**Footer CTA**
- "Have questions? Send an inquiry" with small inline contact form or link to Contact page

---

# Rooms (Listing)

**Intro paragraph**
> Our rooms combine the calm of Galle Fort with modern comforts — air conditioning, private bathrooms and free Wi‑Fi. Breakfast is included.

**Room card fields**
- Image (thumbnail)
- Room name
- Short descriptor (e.g., "Family Room — 3 guests, 1 double + 1 single")
- Amenities icons (AC, Wi-Fi, private bath, balcony)
- Price from: LKR {price} (optional)
- CTA: [View room] or [Inquire]

**Filters** (optional)
- Guests, price, amenities

---

# Room Template (single page to reuse)

Use a content type `room` with these fields:
- title
- slug
- short_description
- long_description (rich text)
- capacity (max guests)
- beds (e.g., 1 double, 1 single)
- amenities (array): AC, private bathroom, balcony, terrace, work desk, free Wi-Fi
- price_from (optional)
- gallery (images)
- policies (link or text)
- seo_title
- seo_description


**Room page layout & content (markdown-ready)**

```
# {Room Name}

![Main image](/assets/images/rooms/{room-slug}/hero.jpg)

**Quick facts**
- Capacity: {capacity} guests
- Beds: {beds}
- Amenities: AC, private bathroom, free Wi-Fi, private entrance

## About this room
{long_description}

## Amenities
- Air conditioning
- Private bathroom (shower)
- Complimentary breakfast
- Free Wi-Fi
- Work desk
- Private entrance

## Rates & Policies
- Price from: LKR {price_from}
- Taxes & fees: included/excluded (site policy)
- Cancellation: (short note) — link to /policies

---

**Availability & booking**
[Inline booking/inquiry form — see Booking form section]

**Gallery**
- Show slider of images from /assets/images/rooms/{room-slug}/

**Nearby**
- Lighthouse — x min walk
- Pedlar Street — x min walk

**Guest reviews for this room**
- "Short quote" — Guest name, Year
```

---

# Booking / Inquiry Form (site-wide)

**Store booking enquiries to database + send auto-reply + admin email.**

**Form fields (required marked)**
1. Full name *
2. Email *
3. Phone * (international format)
4. Check-in date *
5. Check-out date *
6. Number of adults *
7. Number of children
8. Room selection (dropdown or "Any room") *
9. Message / special requests
10. Preferred contact method (Email / Phone / WhatsApp)
11. Promo code (optional)
12. GDPR consent checkbox *

**UX**
- Minimum required fields: name, email, phone, check-in, check-out, guests.
- Show a summary confirmation page after submit and send an autoresponder email.
- Show admin dashboard notification and send SMS/WhatsApp to +94 76 572 1495 (optional).

**Autoresponder email (user-facing)**
```
Subject: Dutch Wall Fort — Booking Inquiry Received

Hi {FirstName},

Thanks for contacting Dutch Wall Fort. We've received your booking inquiry:
- Dates: {checkin} to {checkout}
- Guests: {adults} adults, {children} children
- Room requested: {room}

We will confirm availability and rates within 24 hours. For urgent assistance call or WhatsApp +94 76 572 1495.

Warm regards,
Dutch Wall Fort Team
```

**Admin email (to reservations inbox)**
```
Subject: New Booking Inquiry — {GuestName} — {checkin} to {checkout}

All details:
- Name: {GuestName}
- Phone: {Phone}
- Email: {Email}
- Guests: {adults}/{children}
- Room: {room}
- Message: {message}
- Source: website

[Link to admin panel to confirm / add reservation]
```

---

# About Us (page content)

```
# About Dutch Wall Fort

Dutch Wall — Luxury Boutique Villa blends modern comfort with traditional Dutch-colonial charm in the centre of Galle Fort. Our family-run villa is arranged over two floors with private entrances, comfortable family rooms with air-conditioning and private bathrooms, and a peaceful terrace and garden.

We serve a variety of Sri Lankan breakfasts (vegetarian, vegan, halal options available) complimentary with your stay. Located just steps from Pedlar Street and a short walk to the lighthouse and beaches, Dutch Wall is the perfect base to explore Galle.

## Our promise
We aim to give each guest a warm, personal experience — from check-in to local tips and breakfast recommendations.

## Host
(Owner/Host name) — short 1–2 line bio and friendly photo
```

---

# Gallery (page)

**Organize images into albums:** Exterior, Rooms, Terrace & Garden, Breakfast, Surroundings, Street & Fort.

Use filenames & paths consistently, e.g. `/assets/images/gallery/exterior-1.jpg`, `/assets/images/rooms/family-room/01.jpg`.

**Caption examples**
- "Front façade of Dutch Wall Fort, Church Street entrance"
- "Terrace with morning light and sea view"
- "Complimentary Sri Lankan breakfast spread"

---

# Local Area / Things to Do (page)

```
# Things to do near Dutch Wall Fort

- **Galle Lighthouse & Lighthouse Beach** — A scenic walk and sunset spot.
- **Pedlar Street** — Local shopping, cafes and art shops just steps away.
- **Galle Fort ramparts** — Stroll the historic walls and watch the sunset.
- **Unawatuna & Hikkaduwa** — Popular beaches; accessible by short tuk-tuk or car ride.
- **Boat trips & whale watching** — Bookable tours from nearby harbors.

Ask us for local recommendations — we're happy to help plan day trips or transfers.
```

Include approximate travel times if desired (e.g., Koggala Airport ~ 35–40 minutes by car; confirm before publishing).

---

# Reviews / Testimonials (page)

**Layout**
- Featured 4–6 review cards (quote, name, source e.g., "TripAdvisor, 2024")
- Link buttons to external review platforms: TripAdvisor, Airbnb, Agoda
- CTA: "Leave a review" — links to TripAdvisor / Airbnb / Google Forms

**Example snippets (editable)**
- "Amazing location inside the Fort, breakfast was delightful. — Sara, UK"
- "Friendly staff and clean rooms. Highly recommended. — Priya, India"

---

# Contact (page)

```
# Contact & Location

Dutch Wall Fort
73 Church St, Galle, Sri Lanka
Phone: +94 76 572 1495
Email: reservations@dutchwallfort.com

[Google map embed here]

**Contact form** (name, email, phone, message)

**Check-in/Check-out**
- Check-in: 14:00
- Check-out: 11:00

For urgent bookings call or WhatsApp: +94 76 572 1495
```

---

# Policies & FAQ

**Policies (short summaries; link to full legal text where necessary)**

- **Cancellation policy:** Standard flexible / non-refundable policy — editable per owner.
- **Payment:** Payment methods accepted — cash on arrival, bank transfer, card (if supported).
- **Children & extra beds:** Children welcome; specify extra bed charge if any.
- **Pets:** (Yes / No) — state clearly.
- **Smoking:** No smoking inside rooms; designated area on terrace.

**FAQ (examples)**
- Q: Is breakfast included? A: Yes, complimentary Sri Lankan breakfast options are included.
- Q: Do you offer airport transfers? A: Transfers can be arranged on request (additional cost).
- Q: Is there Wi-Fi? A: Yes, free Wi‑Fi throughout the property.
- Q: Can I check in early or check out late? A: Subject to availability; contact us to request.

---

# Blog (optional)

**Ideas for blog posts**
- "Top 10 things to do in Galle Fort"
- "A local's guide to Pedlar Street"
- "A morning at Dutch Wall — breakfast & rituals"

Use blog for local SEO and to capture long-tail search queries.

---

# Image & Content checklist to request from owner
1. Façade / entrance shot (day & dusk)
2. Terrace / balcony sea view
3. Each room: wide shot, bed close-up, bathroom
4. Breakfast plating / breakfast setup
5. Street/fort context (Pedlar St, Lighthouse nearby)
6. Host/staff portrait
7. Short video or 360 images (optional)

Use web-optimized images: responsive sizes (1600px wide for hero; 1200 for galleries) and compressed webp/jpg files.

---

# JSON-LD (schema.org) example for the hotel — place this on the home page <head>

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "Dutch Wall Fort",
  "description": "Luxury boutique villa in the heart of Galle Fort. Family rooms with AC, private bathrooms and complimentary Sri Lankan breakfast.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "73 Church St",
    "addressLocality": "Galle",
    "addressRegion": "Southern Province",
    "addressCountry": "LK"
  },
  "telephone": "+94765721495",
  "url": "https://www.dutchwallfort.com",
  "image": ["https://www.dutchwallfort.com/assets/images/hero.jpg"],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 6.025,   
    "longitude": 80.216
  }
}
</script>
```

*Note:* Confirm and replace latitude/longitude with exact values from Google Maps before publishing.

---

# Admin / CMS notes (for Bolt)

**Content types suggested**
- `page` (standard page)
- `room` (fields: title, slug, description, capacity, beds, amenities[], price_from, gallery)
- `gallery_image` (image, caption, album)
- `blog_post` (standard)
- `booking_inquiry` (name, email, phone, checkin, checkout, guests, room, message, status)

**Workflows**
- Booking inquiry -> status: New -> Confirmed / Rejected / Needs Payment
- Send autoresponder on New

**Email templates**
- Autoresponder (see Booking section)
- Confirmation email (after availability confirmed and payment arranged)

---

# Email templates: Confirmation & Rejection

**Confirmation (after availability & rate confirmed)**
```
Subject: Reservation Confirmed — Dutch Wall Fort ({checkin} — {checkout})

Dear {GuestName},

Thank you — your reservation at Dutch Wall Fort is confirmed.

Details:
- Check-in: {checkin}
- Check-out: {checkout}
- Room: {room}
- Guests: {adults} adults, {children} children
- Total: {amount} (currency)

To secure the booking please pay a {deposit_or_full_payment} via {payment_method}. Reply to this email to arrange payment or ask for assistance.

We look forward to hosting you.

Warm regards,
Dutch Wall Fort
```

**Rejection / Unavailable**
```
Subject: Booking Update — Dutch Wall Fort

Hi {GuestName},

Thank you for your inquiry. Unfortunately the requested room/dates are not available. We can offer alternatives:
- Option 1: {alternative dates / room}
- Option 2: {other recommendations}

If you'd like us to reserve an alternative, reply to this email or call +94 76 572 1495.
```

---

# Analytics, Tracking & Marketing (non-technical summary)
- Install Google Analytics 4 + Google Search Console.
- Add conversion events for booking inquiry submissions.
- Use Facebook Pixel if running ads.
- Claim and verify Google Business Profile for the property address.

---

# Accessibility & UX suggestions
- Use clear, large CTAs and ensure phone is click-to-call on mobile.
- Add alt text for every image.
- Contrast ratio: ensure readable text over hero images (use overlay).

---

# Final notes & quick content snippets for direct paste

**Hero tagline**: _Stay inside historic Galle Fort — boutique comfort, family hospitality._

**Short about blurb**: _Dutch Wall — Luxury Boutique Villa in the centre of Galle Fort. Family rooms with private bathrooms, AC and complimentary Sri Lankan breakfast. Steps from Pedlar Street & the Lighthouse._

**Contact line**: _Call or WhatsApp: +94 76 572 1495 — or send a booking inquiry via the form on this site._

---

_End of document._
