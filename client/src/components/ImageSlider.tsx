import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import mountainImg from '@assets/generated_images/Mountain_sunset_landscape_9b522b12.png';
import beachImg from '@assets/generated_images/Tropical_beach_paradise_840cbf69.png';
import cityImg from '@assets/generated_images/European_historic_city_c06760bb.png';
import lakeImg from '@assets/generated_images/Misty_lake_reflection_93b8cdd3.png';
import desertImg from '@assets/generated_images/Desert_sunrise_dunes_d5e9b470.png';

interface ImageSliderProps {
  autoplay?: boolean;
  autoplayDelay?: number;
}

export default function ImageSlider({ autoplay = true, autoplayDelay = 4000 }: ImageSliderProps) {
  // TODO: Replace with dynamic images from API
  const images = [
    { src: mountainImg, alt: 'Mountain landscape at sunset', title: 'Majestic Mountains' },
    { src: beachImg, alt: 'Tropical beach paradise', title: 'Tropical Paradise' },
    { src: cityImg, alt: 'Historic European city', title: 'Historic Cities' },
    { src: lakeImg, alt: 'Misty lake reflection', title: 'Serene Lakes' },
    { src: desertImg, alt: 'Desert dunes at sunrise', title: 'Desert Adventures' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => {
      const newSet = new Set(prev);
      newSet.add(index);
      if (newSet.size === 1 && !isLoaded) {
        setIsLoaded(true);
      }
      return newSet;
    });
  };

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    goToSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    goToSlide(prevIndex);
  };

  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(nextSlide, autoplayDelay);
    return () => clearInterval(interval);
  }, [currentIndex, autoplay, autoplayDelay]);

  return (
    <div 
      data-testid="image-slider"
      className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg shadow-2xl"
    >
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse z-30">
          <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
            <div className="absolute bottom-6 left-6 space-y-3">
              <div className="h-8 bg-gray-400 rounded w-48"></div>
              <div className="h-1 bg-gray-400 rounded w-12"></div>
            </div>
          </div>
        </div>
      )}
      {/* Image Container - Enhanced wrapper with better positioning */}
      <div className="relative w-full h-full">
        {images.map((image, index) => {
          const isActive = index === currentIndex;
          const isPrev = index === (currentIndex - 1 + images.length) % images.length;
          const isNext = index === (currentIndex + 1) % images.length;
          
          return (
            <div
              key={`slide-${index}`}
              data-testid={`slide-${index}`}
              className={`
                absolute top-0 left-0 w-full h-full 
                transition-all duration-700 ease-in-out
                ${isActive ? 'opacity-100 z-20 scale-100' : 'opacity-0 z-10 scale-95'}
                ${isTransitioning && isActive ? 'scale-105' : ''}
              `}
              style={{
                transform: `translateX(${
                  isActive ? '0%' : 
                  isPrev ? '-100%' : 
                  isNext ? '100%' : 
                  index < currentIndex ? '-100%' : '100%'
                }%) scale(${isActive ? 1 : 0.95})`,
                transformOrigin: 'center center'
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700"
                draggable={false}
                loading={index <= 2 ? "eager" : "lazy"}
                onLoad={() => handleImageLoad(index)}
              />
              {/* Enhanced image overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 z-1" />
              
              {/* Image title overlay with better positioning */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-bold drop-shadow-2xl">
                  {image.title}
                </h3>
                <div className="w-12 h-1 bg-white/80 mt-2 rounded-full"></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <Button
        data-testid="button-prev-slide"
        variant="secondary"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/90 hover:bg-white"
        onClick={prevSlide}
        disabled={isTransitioning}
      >
        <ChevronLeft size={20} />
      </Button>
      
      <Button
        data-testid="button-next-slide"
        variant="secondary"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/90 hover:bg-white"
        onClick={nextSlide}
        disabled={isTransitioning}
      >
        <ChevronRight size={20} />
      </Button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            data-testid={`dot-indicator-${index}`}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`
              w-3 h-3 rounded-full transition-all duration-200 
              ${index === currentIndex 
                ? 'bg-white scale-110' 
                : 'bg-white/60 hover:bg-white/80'
              }
              ${isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'}
            `}
          />
        ))}
      </div>
    </div>
  );
}