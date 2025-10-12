# Image Upload Configuration & Troubleshooting

## Current Configuration

### PHP Limits (Development Server)
- **upload_max_filesize**: 2M (2MB per file)
- **post_max_size**: 8M (8MB total)
- **max_execution_time**: 0 (unlimited)
- **memory_limit**: -1 (unlimited)

### Filament Configuration
- **maxSize**: 1024KB (1MB per file)
- **acceptedFileTypes**: JPEG, PNG, WebP
- **directory**: rooms/
- **visibility**: public

## Common Issues & Solutions

### 1. Upload Hanging/Timeout
**Problem**: Image upload gets stuck during upload process.

**Causes**:
- File size exceeds PHP limits
- Network timeout
- Server resource constraints

**Solutions**:
1. **Compress images before upload** (recommended)
2. **Use smaller file sizes** (< 1MB)
3. **Check network connection**
4. **Use image editor** in Filament to resize

### 2. File Size Too Large
**Problem**: "File too large" error.

**Solutions**:
1. **Resize image** using Filament's built-in editor
2. **Compress image** using online tools
3. **Convert to JPEG** for better compression
4. **Use WebP format** for smaller file sizes

### 3. Upload Progress Stuck
**Problem**: Upload progress bar doesn't move.

**Solutions**:
1. **Refresh the page** and try again
2. **Check browser console** for errors
3. **Try uploading one image at a time**
4. **Clear browser cache**

## Best Practices

### Image Optimization
1. **Resize images** to maximum 1920x1080 pixels
2. **Compress images** to 85% quality
3. **Use JPEG format** for photos
4. **Use PNG format** for graphics with transparency
5. **Use WebP format** for modern browsers

### Upload Process
1. **Upload one image at a time** for large files
2. **Use Filament's image editor** to resize
3. **Check file size** before uploading
4. **Wait for upload to complete** before saving

## Technical Details

### File Storage
- **Location**: `storage/app/public/rooms/`
- **Web Access**: `http://localhost:8000/storage/rooms/`
- **Symlink**: `public/storage` → `storage/app/public`

### Supported Formats
- **JPEG**: Best for photos, smaller file sizes
- **PNG**: Best for graphics, supports transparency
- **WebP**: Modern format, excellent compression

### File Naming
- **Format**: `[random_string].[extension]`
- **Example**: `01K748D9A5VQ0Q0AJHDVJTV5QY.png`
- **Uniqueness**: Automatically generated unique names

## Troubleshooting Steps

### If Upload Still Hangs:
1. **Check file size** - should be < 1MB
2. **Try different image** - test with smaller file
3. **Clear browser cache** - refresh page
4. **Check network** - ensure stable connection
5. **Restart server** - if issues persist

### If Images Don't Display:
1. **Check storage link** - `php artisan storage:link`
2. **Verify file permissions** - ensure write access
3. **Check file path** - should be `/storage/rooms/filename`
4. **Clear cache** - `php artisan cache:clear`

## Production Recommendations

### For Production Deployment:
1. **Increase PHP limits** in server configuration
2. **Use CDN** for image delivery
3. **Implement image optimization** service
4. **Add upload progress** indicators
5. **Set up monitoring** for upload failures

### Server Configuration:
```ini
upload_max_filesize = 10M
post_max_size = 20M
max_execution_time = 300
memory_limit = 256M
```

---

**Last Updated**: October 9, 2025  
**Status**: ✅ **Configuration Complete**
