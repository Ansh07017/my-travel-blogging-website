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

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
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
      className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg"
    >
      {/* Image Container - Fixed positioning to prevent overlap */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            data-testid={`slide-${index}`}
            className={`
              absolute top-0 left-0 w-full h-full 
              transition-all duration-500 ease-in-out
              ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}
              ${isTransitioning && index === currentIndex ? 'scale-105' : 'scale-100'}
            `}
            style={{
              transform: `translateX(${(index - currentIndex) * 100}%)`,
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              draggable={false}
            />
            {/* Image overlay for better text readability */}
            <div className="absolute inset-0 bg-black/20 z-1" />
            
            {/* Image title overlay */}
            <div className="absolute bottom-4 left-4 z-20">
              <h3 className="text-white text-xl md:text-2xl font-bold drop-shadow-lg">
                {image.title}
              </h3>
            </div>
          </div>
        ))}
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