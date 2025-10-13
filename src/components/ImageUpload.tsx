import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, AlertCircle, CheckCircle } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (url: string) => void;
  onImageRemove?: (url: string) => void;
  existingImages?: string[];
  multiple?: boolean;
  maxImages?: number;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  onImageRemove,
  existingImages = [],
  multiple = false,
  maxImages = 10,
  className = ""
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (files: FileList) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const remainingSlots = maxImages - existingImages.length;
    
    if (fileArray.length > remainingSlots) {
      setUploadError(`You can only upload ${remainingSlots} more image${remainingSlots !== 1 ? 's' : ''}`);
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      for (const file of fileArray) {
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
          throw new Error(`${file.name}: Invalid file type. Only JPEG, PNG, and WebP images are allowed.`);
        }

        // Validate file size (5MB max)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
          throw new Error(`${file.name}: File too large. Maximum size is 5MB.`);
        }

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Upload failed');
        }

        const result = await response.json();
        onImageUpload(result.data.url);
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      setUploadError(error.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files);
    }
  };

  const removeImage = (url: string) => {
    if (onImageRemove) {
      onImageRemove(url);
    }
  };

  const canUploadMore = existingImages.length < maxImages;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      {canUploadMore && (
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive
              ? 'border-amber-400 bg-amber-50'
              : 'border-gray-300 hover:border-amber-400'
          } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple={multiple}
            onChange={handleFileInput}
            className="hidden"
          />
          
          <div className="space-y-2">
            <Upload size={32} className="mx-auto text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {dragActive ? 'Drop images here' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, WebP up to 5MB each
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="mt-4 bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? 'Uploading...' : 'Choose Images'}
          </button>
        </div>
      )}

      {/* Upload Error */}
      {uploadError && (
        <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-md">
          <AlertCircle size={16} className="text-red-500 mr-2" />
          <span className="text-sm text-red-700">{uploadError}</span>
        </div>
      )}

      {/* Upload Progress */}
      {isUploading && (
        <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
          <span className="text-sm text-blue-700">Uploading images...</span>
        </div>
      )}

      {/* Image Grid */}
      {existingImages.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700">
              Uploaded Images ({existingImages.length}/{maxImages})
            </h4>
            {onImageRemove && (
              <span className="text-xs text-gray-500">Click to remove</span>
            )}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {existingImages.map((url, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={url}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                    }}
                  />
                </div>
                
                {onImageRemove && (
                  <button
                    type="button"
                    onClick={() => removeImage(url)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    <X size={12} />
                  </button>
                )}
                
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <CheckCircle size={20} className="text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Max Images Reached */}
      {!canUploadMore && (
        <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <AlertCircle size={16} className="text-yellow-500 mr-2" />
          <span className="text-sm text-yellow-700">
            Maximum number of images reached ({maxImages})
          </span>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
