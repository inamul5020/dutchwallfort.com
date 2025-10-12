# 🖼️ Image Management System

This document describes the image management system implemented for the Dutch Wall Fort project, including the separate header and gallery image fields.

## 📋 Overview

The image management system uses two distinct fields to separate concerns:
- **Header Image**: Single main image displayed on room cards and as the primary room image
- **Gallery Images**: Up to 10 additional images displayed in the room details gallery

## 🗄️ Database Schema

### Rooms Table Structure
```sql
CREATE TABLE rooms (
    id INTEGER PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    short_description TEXT NOT NULL,
    long_description TEXT NOT NULL,
    capacity INTEGER NOT NULL,
    beds VARCHAR(255) NOT NULL,
    amenities JSON DEFAULT '[]',
    price DECIMAL(10,2) NOT NULL,
    images JSON DEFAULT '[]',           -- Legacy field (deprecated)
    header_image VARCHAR(255),          -- Main room image for cards
    gallery_images JSON DEFAULT '[]',   -- Additional images for gallery
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Migration
The separate image fields were added via migration:
- **File**: `2025_10_09_114030_add_separate_image_fields_to_rooms_table.php`
- **Added Fields**: `header_image` (string), `gallery_images` (JSON array)

## 🎨 Image Organization

### Current Image Structure
```
storage/app/public/rooms/
├── bedroom1_1.jpg → Room 1 Header (Deluxe Family Room)
├── bedroom1_2.jpg → Room 1 Gallery
├── bedroom1_3.jpg → Room 1 Gallery
├── bedroom1_4.jpg → Room 1 Gallery
├── bedroom1_5.jpg → Room 1 Gallery
├── bedroom1_6.jpg → Room 5 Header (Whole Villa)
├── bedroom1_7.jpg → Room 5 Gallery (Whole Villa)
├── bedroom2_1.jpg → Room 2 Header (Superior Room)
├── bedroom2_2.jpg → Room 2 Gallery
├── bedroom2_3.jpg → Room 2 Gallery + Room 5 Gallery
├── bedroom2_4.jpg → Room 2 Gallery
├── bedroom2_5.jpg → Room 2 Gallery
├── bedroom3_1.jpg → Room 3 Header (Standard Room)
├── bedroom3_2.jpg → Room 3 Gallery
├── bedroom3_3.jpg → Room 3 Gallery
├── bedroom3_4.jpg → Room 3 Gallery + Room 5 Gallery
├── bedroom3_5.jpg → Room 3 Gallery
├── bedroom4_1.jpg → Room 4 Header (Premium Room)
├── bedroom4_2.jpg → Room 4 Gallery + Room 5 Gallery
├── bedroom4_3.jpg → Room 4 Gallery
├── bedroom4_4.jpg → Room 4 Gallery
└── bedroom4_5.jpg → Room 4 Gallery
```

### Room Assignments
1. **Deluxe Family Room**: Uses bedroom1 images (1 header + 4 gallery)
2. **Superior Room**: Uses bedroom2 images (1 header + 4 gallery)
3. **Standard Room**: Uses bedroom3 images (1 header + 4 gallery)
4. **Premium Room**: Uses bedroom4 images (1 header + 4 gallery)
5. **Whole Villa Rental**: Mixed images from different bedrooms (1 header + 4 gallery)

## 🔧 Backend Implementation

### Model (Room.php)
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $fillable = [
        'slug',
        'name',
        'short_description',
        'long_description',
        'capacity',
        'beds',
        'amenities',
        'price',
        'images',           // Legacy field
        'header_image',     // New field
        'gallery_images',   // New field
        'is_active',
    ];

    protected $casts = [
        'amenities' => 'array',
        'images' => 'array',           // Legacy field
        'gallery_images' => 'array',   // New field
        'is_active' => 'boolean',
        'price' => 'decimal:2',
    ];

    /**
     * Get the header image with proper URL for Filament
     */
    public function getHeaderImageForFilamentAttribute()
    {
        if (!$this->header_image) {
            return null;
        }

        if (str_starts_with($this->header_image, 'http')) {
            return $this->header_image;
        }
        return url('storage/' . $this->header_image);
    }

    /**
     * Get the gallery images with proper URLs for Filament
     */
    public function getGalleryImagesForFilamentAttribute()
    {
        if (!$this->gallery_images || !is_array($this->gallery_images)) {
            return [];
        }

        return array_map(function ($image) {
            if (str_starts_with($image, 'http')) {
                return $image;
            }
            return url('storage/' . $image);
        }, $this->gallery_images);
    }
}
```

### Filament Resource (RoomResource.php)
```php
// Header Image Section
Forms\Components\Section::make('Header Image')
    ->description('Main image displayed on room cards and as the primary room image')
    ->schema([
        Forms\Components\FileUpload::make('header_image')
            ->image()
            ->directory('rooms')
            ->visibility('public')
            ->maxSize(1024) // 1MB per file
            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
            ->imageEditor()
            ->imageEditorAspectRatios([
                '16:9',
                '4:3',
                '1:1',
            ])
            ->helperText('Main room image - displayed on room cards and as header image')
            ->loadingIndicatorPosition('left')
            ->panelAspectRatio('2:1')
            ->deletable()
            ->downloadable()
            ->openable()
            ->previewable(true),
    ])
    ->collapsible(),

// Gallery Images Section
Forms\Components\Section::make('Gallery Images')
    ->description('Additional images shown in room details gallery (up to 10 images)')
    ->schema([
        Forms\Components\FileUpload::make('gallery_images')
            ->multiple()
            ->image()
            ->directory('rooms')
            ->visibility('public')
            ->maxSize(1024) // 1MB per file
            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
            ->imageEditor()
            ->imageEditorAspectRatios([
                '16:9',
                '4:3',
                '1:1',
            ])
            ->reorderable()
            ->appendFiles()
            ->maxFiles(10)
            ->helperText('Gallery images - displayed in room details page (max 10 images)')
            ->loadingIndicatorPosition('left')
            ->panelAspectRatio('2:1')
            ->deletable()
            ->downloadable()
            ->openable()
            ->previewable(true),
    ])
    ->collapsible(),
```

### Edit Page (EditRoom.php)
```php
protected function mutateFormDataBeforeFill(array $data): array
{
    $record = $this->getRecord();

    // Handle header image
    if ($record->header_image) {
        $data['header_image'] = $record->header_image_for_filament;
    }

    // Handle gallery images
    if ($record->gallery_images && is_array($record->gallery_images)) {
        $data['gallery_images'] = $record->gallery_images_for_filament;
    }

    return $data;
}
```

## 🎨 Frontend Implementation

### Rooms Page (Rooms.tsx)
```typescript
// Transform API data to match frontend format
const roomsData = rooms.map(room => ({
  id: room.slug,
  name: room.name,
  shortDescription: room.short_description,
  description: room.long_description,
  capacity: room.capacity,
  beds: room.beds,
  amenities: room.amenities || [],
  priceFrom: room.price >= 1000 ? Math.round(room.price / 1000) + ',' + (room.price % 1000).toString().padStart(3, '0') : room.price.toString(),
  image: room.header_image ? 
    `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/storage/${room.header_image}` : 
    `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/storage/rooms/placeholder.jpg`,
  gallery: room.gallery_images ? room.gallery_images.map(img => 
    `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/storage/${img}`
  ) : []
}));
```

### Room Details Page (RoomDetail.tsx)
```typescript
// Transform API data for room details
const transformedRoom = {
  id: foundRoom.slug,
  name: foundRoom.name,
  shortDescription: foundRoom.short_description,
  longDescription: foundRoom.long_description,
  capacity: foundRoom.capacity,
  beds: foundRoom.beds,
  amenities: foundRoom.amenities || [],
  priceFrom: foundRoom.price >= 1000 ? Math.round(foundRoom.price / 1000) + ',' + (foundRoom.price % 1000).toString().padStart(3, '0') : foundRoom.price.toString(),
  gallery: foundRoom.gallery_images && foundRoom.gallery_images.length > 0 ? 
    foundRoom.gallery_images.map((img: string) => 
      `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/storage/${img}`
    ) : 
    [`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/storage/rooms/placeholder.jpg`]
};
```

## 🔌 API Response Format

### Rooms Endpoint (`GET /api/rooms`)
```json
[
  {
    "id": 1,
    "slug": "deluxe-family-room",
    "name": "Deluxe Family Room",
    "short_description": "Family Room — 4 guests, 1 double + 2 singles",
    "long_description": "Our most spacious accommodation...",
    "capacity": 4,
    "beds": "1 double bed + 2 single beds",
    "amenities": ["AC", "Private bathroom", "Balcony", "Garden view", "Free Wi-Fi", "Work desk"],
    "price": "15000.00",
    "images": [],  // Legacy field (empty)
    "header_image": "rooms/bedroom1_1.jpg",
    "gallery_images": [
      "rooms/bedroom1_2.jpg",
      "rooms/bedroom1_3.jpg",
      "rooms/bedroom1_4.jpg",
      "rooms/bedroom1_5.jpg"
    ],
    "is_active": true,
    "created_at": "2025-10-09T11:53:20.000000Z",
    "updated_at": "2025-10-09T11:53:20.000000Z"
  }
]
```

## 🚀 Usage Guidelines

### For Developers

#### Adding New Images
1. Upload images to `storage/app/public/rooms/`
2. Use descriptive filenames (e.g., `bedroom1_1.jpg`)
3. Set appropriate header image for each room
4. Add gallery images (up to 10 per room)

#### Frontend Integration
1. Use `room.header_image` for room cards
2. Use `room.gallery_images` for room details gallery
3. Always provide fallback placeholder images
4. Generate full URLs with API base URL

#### Admin Panel Management
1. Use Header Image section for main room image
2. Use Gallery Images section for additional images
3. Leverage image editor for cropping/resizing
4. Use reorderable feature for gallery images

### For Content Managers

#### Room Image Management
1. **Header Image**: Choose the best single image that represents the room
2. **Gallery Images**: Add up to 10 additional images showing different angles/features
3. **Image Quality**: Use high-quality images (max 1MB per image)
4. **Image Formats**: Supported formats: JPEG, PNG, WebP

#### Best Practices
1. **Consistent Naming**: Use descriptive filenames
2. **Image Organization**: Keep related images together
3. **File Sizes**: Optimize images for web (max 1MB)
4. **Aspect Ratios**: Use 16:9, 4:3, or 1:1 for consistency

## 🔧 Troubleshooting

### Common Issues

#### Images Not Displaying
1. **Check Storage Link**: Ensure `php artisan storage:link` is run
2. **Verify File Paths**: Check that images exist in `storage/app/public/rooms/`
3. **Check Permissions**: Ensure web server can read storage files
4. **Verify URLs**: Check that image URLs are correctly generated

#### Admin Panel Issues
1. **Existing Images Not Showing**: Check `mutateFormDataBeforeFill` method
2. **Upload Failures**: Check PHP upload limits (`upload_max_filesize`, `post_max_size`)
3. **Image Editor Issues**: Ensure proper image formats are used

#### Frontend Issues
1. **Broken Image Links**: Check API response format
2. **Missing Fallbacks**: Ensure placeholder images exist
3. **CORS Issues**: Verify API CORS configuration

### Debug Commands
```bash
# Check storage link
ls -la public/storage

# Verify image files
ls -la storage/app/public/rooms/

# Test image accessibility
curl -I http://localhost:8000/storage/rooms/bedroom1_1.jpg

# Check database data
php artisan tinker --execute="App\Models\Room::all()->pluck('header_image', 'name')"
```

## 🖼️ Gallery Navigation System

### Overview
The room details page features an Airbnb-style gallery navigation system that provides a professional image viewing experience with smooth navigation controls.

### Features

#### **Navigation Controls**
- **Next/Previous Buttons**: Semi-transparent circular buttons with ChevronLeft/ChevronRight icons
- **Keyboard Navigation**: Arrow keys (← →) for image navigation
- **Circular Navigation**: Seamless looping from last image back to first
- **Image Counter**: "1 of 5" style counter showing current position
- **User Instructions**: Keyboard navigation hints displayed in lightbox

#### **Visual Design**
- **Airbnb-Style**: Semi-transparent white buttons with backdrop blur
- **Hover Effects**: Smooth opacity transitions on button hover
- **Responsive**: Works on all screen sizes
- **Modern UI**: Glass-morphism effect with backdrop blur

### Implementation

#### **State Management**
```typescript
const [selectedImage, setSelectedImage] = useState<string | null>(null);
const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
```

#### **Navigation Functions**
```typescript
// Open image with index tracking
const openImage = (image: string, index: number) => {
  setSelectedImage(image);
  setCurrentImageIndex(index);
};

// Navigate to next image (circular)
const nextImage = () => {
  if (room && room.gallery) {
    const nextIndex = (currentImageIndex + 1) % room.gallery.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(room.gallery[nextIndex]);
  }
};

// Navigate to previous image (circular)
const prevImage = () => {
  if (room && room.gallery) {
    const prevIndex = currentImageIndex === 0 ? room.gallery.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(room.gallery[prevIndex]);
  }
};
```

#### **Keyboard Navigation**
```typescript
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedImage) {
      if (e.key === 'ArrowRight') nextImage();
      else if (e.key === 'ArrowLeft') prevImage();
      else if (e.key === 'Escape') closeLightbox();
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [selectedImage, currentImageIndex, room]);
```

#### **Navigation Buttons**
```typescript
{/* Previous Button */}
<button
  onClick={prevImage}
  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-3 transition-all duration-200 backdrop-blur-sm"
  aria-label="Previous image"
>
  <ChevronLeft size={24} />
</button>

{/* Next Button */}
<button
  onClick={nextImage}
  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-3 transition-all duration-200 backdrop-blur-sm"
  aria-label="Next image"
>
  <ChevronRight size={24} />
</button>
```

#### **Image Counter**
```typescript
{/* Image Counter */}
{room && room.gallery && room.gallery.length > 1 && (
  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
    {currentImageIndex + 1} of {room.gallery.length}
  </div>
)}
```

### User Experience

#### **Opening Images**
1. **Hero Image**: Click main room image → opens lightbox at index 0
2. **Gallery Images**: Click any gallery image → opens lightbox at correct index
3. **Index Tracking**: Maintains position for proper navigation

#### **Navigation Methods**
1. **Mouse**: Click next/previous buttons
2. **Keyboard**: Use arrow keys (← →)
3. **Circular**: Seamless looping through all images
4. **Close**: Press Escape or click X button

#### **Visual Feedback**
- **Hover States**: Button opacity changes on hover
- **Smooth Transitions**: 200ms CSS transitions
- **Loading States**: Proper loading indicators
- **Accessibility**: ARIA labels and keyboard support

### Technical Details

#### **Dependencies**
- **Lucide React**: ChevronLeft, ChevronRight icons
- **React Hooks**: useState, useEffect for state management
- **TypeScript**: Proper type definitions for all functions

#### **Performance**
- **Event Cleanup**: Proper removal of keyboard event listeners
- **State Optimization**: Minimal re-renders with proper dependencies
- **Memory Management**: Cleanup on component unmount

#### **Accessibility**
- **ARIA Labels**: Proper accessibility labels for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Proper focus handling in lightbox

## 📈 Future Enhancements

### Planned Features
1. **Image Optimization**: Automatic image compression and resizing
2. **CDN Integration**: Cloud storage for better performance
3. **Image Analytics**: Track image usage and performance
4. **Bulk Upload**: Upload multiple images at once
5. **Image Categories**: Organize images by type (interior, exterior, amenities)
6. **Touch Gestures**: Swipe navigation for mobile devices
7. **Image Zoom**: Pinch-to-zoom functionality for detailed viewing

### Technical Improvements
1. **Lazy Loading**: Implement lazy loading for gallery images
2. **Image Caching**: Add proper caching headers
3. **Progressive Loading**: Load images progressively
4. **Responsive Images**: Generate multiple sizes for different devices
5. **Touch Support**: Add touch gesture support for mobile navigation
6. **Image Preloading**: Preload next/previous images for smoother navigation

---

**Last Updated**: October 9, 2025
