import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Heart, Share2, Eye } from 'lucide-react';
import mountainImg from '@assets/generated_images/Mountain_sunset_landscape_9b522b12.png';
import beachImg from '@assets/generated_images/Tropical_beach_paradise_840cbf69.png';
import cityImg from '@assets/generated_images/European_historic_city_c06760bb.png';
import lakeImg from '@assets/generated_images/Misty_lake_reflection_93b8cdd3.png';
import desertImg from '@assets/generated_images/Desert_sunrise_dunes_d5e9b470.png';

export default function GallerySection() {
  // TODO: Replace with dynamic gallery data from API
  const [likedItems, setLikedItems] = useState(new Set());

  const galleryItems = [
    { 
      id: 1, 
      image: cityImg, 
      title: 'EDM Night in Amsterdam', 
      likes: 124, 
      views: 1250 
    },
    { 
      id: 2, 
      image: beachImg, 
      title: 'Beaches', 
      likes: 89, 
      views: 892 
    },
    { 
      id: 3, 
      image: mountainImg, 
      title: 'Holi Party in Mirzapur', 
      likes: 156, 
      views: 1840 
    },
    { 
      id: 4, 
      image: desertImg, 
      title: 'Food Party in Spain', 
      likes: 203, 
      views: 2100 
    },
    { 
      id: 5, 
      image: mountainImg, 
      title: 'Trip to Mountains', 
      likes: 178, 
      views: 1650 
    },
    { 
      id: 6, 
      image: lakeImg, 
      title: 'Trekking', 
      likes: 145, 
      views: 1320 
    },
    { 
      id: 7, 
      image: cityImg, 
      title: 'Journey by Train in Terrains', 
      likes: 167, 
      views: 1580 
    },
    { 
      id: 8, 
      image: mountainImg, 
      title: 'Bike Riding to My Dream', 
      likes: 134, 
      views: 1290 
    },
    { 
      id: 9, 
      image: beachImg, 
      title: 'Quality Time in Maldives', 
      likes: 245, 
      views: 2890 
    },
  ];

  const toggleLike = (id: number) => {
    const newLikedItems = new Set(likedItems);
    if (newLikedItems.has(id)) {
      newLikedItems.delete(id);
    } else {
      newLikedItems.add(id);
    }
    setLikedItems(newLikedItems);
    console.log(`Toggled like for item ${id}`);
  };

  const handleShare = (item: any) => {
    console.log(`Sharing item: ${item.title}`);
    // TODO: Implement actual sharing functionality
  };

  const handleView = (item: any) => {
    console.log(`Viewing item: ${item.title}`);
    // TODO: Implement view functionality (modal, full screen, etc.)
  };

  return (
    <section id="gallery" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 data-testid="heading-gallery" className="text-4xl md:text-5xl font-bold text-center mb-12">
          Destination <span className="text-primary">Memories</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <Card 
              key={item.id}
              data-testid={`gallery-item-${item.id}`}
              className="group relative overflow-hidden hover-elevate transition-all duration-300 cursor-pointer"
              onClick={() => handleView(item)}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Overlay that appears on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                  {/* Title at top */}
                  <h3 className="text-white text-xl font-bold transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {item.title}
                  </h3>
                  
                  {/* Action buttons at bottom */}
                  <div className="flex justify-center space-x-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <button
                      data-testid={`button-like-${item.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(item.id);
                      }}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-full transition-colors ${
                        likedItems.has(item.id)
                          ? 'bg-red-500 text-white' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <Heart size={16} fill={likedItems.has(item.id) ? 'currentColor' : 'none'} />
                      <span className="text-sm">{item.likes + (likedItems.has(item.id) ? 1 : 0)}</span>
                    </button>
                    
                    <button
                      data-testid={`button-share-${item.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(item);
                      }}
                      className="flex items-center space-x-1 px-3 py-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                    >
                      <Share2 size={16} />
                    </button>
                    
                    <button
                      data-testid={`button-view-${item.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleView(item);
                      }}
                      className="flex items-center space-x-1 px-3 py-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                    >
                      <Eye size={16} />
                      <span className="text-sm">{item.views}</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}