import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Maximize2, Minimize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface VirtualTour {
  id: number;
  title: string;
  description?: string;
  tour_type: string;
  thumbnail_url?: string;
  tour_data?: any;
}

interface VirtualTourViewerProps {
  tour: VirtualTour;
  onClose?: () => void;
  className?: string;
}

const VirtualTourViewer: React.FC<VirtualTourViewerProps> = ({ 
  tour, 
  onClose,
  className = '' 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const viewerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // For 360° images, we'll simulate with multiple angles
  const tourImages = tour.tour_data?.images || [
    '/images/virtual-tours/360-1.jpg',
    '/images/virtual-tours/360-2.jpg',
    '/images/virtual-tours/360-3.jpg',
    '/images/virtual-tours/360-4.jpg',
    '/images/virtual-tours/360-5.jpg',
    '/images/virtual-tours/360-6.jpg',
    '/images/virtual-tours/360-7.jpg',
    '/images/virtual-tours/360-8.jpg',
  ];

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [tour]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentImageIndex(0);
    setIsPlaying(false);
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? tourImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => 
      prev === tourImages.length - 1 ? 0 : prev + 1
    );
  };

  // Auto-rotate when playing
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => 
          prev === tourImages.length - 1 ? 0 : prev + 1
        );
      }, 2000); // Change image every 2 seconds

      return () => clearInterval(interval);
    }
  }, [isPlaying, tourImages.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === ' ') {
        e.preventDefault();
        handlePlayPause();
      }
      if (e.key === 'Escape' && onClose) onClose();
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [onClose]);

  if (error) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load virtual tour</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`relative bg-black ${isFullscreen ? 'fixed inset-0 z-50' : className}`}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white text-lg font-semibold">{tour.title}</h3>
            {tour.description && (
              <p className="text-white/80 text-sm">{tour.description}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleFullscreen}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white">Loading virtual tour...</p>
          </div>
        </div>
      )}

      {/* 360° Viewer */}
      <div 
        ref={viewerRef}
        className="relative w-full h-full overflow-hidden"
        style={{ aspectRatio: '16/9' }}
      >
        {!isLoading && (
          <div className="relative w-full h-full">
            <img
              src={tourImages[currentImageIndex]}
              alt={`${tour.title} - View ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              onError={() => setError('Failed to load tour image')}
            />
            
            {/* Navigation Arrows */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white hover:bg-black/70 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white hover:bg-black/70 rounded-full transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Progress Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {tourImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/70 to-transparent p-4">
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={handlePrevious}
            className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={handlePlayPause}
            className="p-3 bg-white/20 text-white hover:bg-white/30 rounded-full transition-colors"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          
          <button
            onClick={handleReset}
            className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleNext}
            className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="text-center mt-2">
          <p className="text-white/80 text-sm">
            View {currentImageIndex + 1} of {tourImages.length}
          </p>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <div className="text-center text-white/80 text-sm">
          <p>Use arrow keys or buttons to navigate</p>
          <p>Press spacebar to play/pause</p>
        </div>
      </div>
    </div>
  );
};

export default VirtualTourViewer;
