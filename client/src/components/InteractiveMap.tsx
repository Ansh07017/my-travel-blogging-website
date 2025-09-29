
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, User, X, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { BlogPost } from '@shared/schema';

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  destination: string;
  blogCount: number;
  blogs: BlogPost[];
}

// Sample coordinates for destinations (in a real app, you'd geocode the destinations)
const DESTINATION_COORDS: Record<string, { lat: number; lng: number }> = {
  'Paris, France': { lat: 48.8566, lng: 2.3522 },
  'Tokyo, Japan': { lat: 35.6762, lng: 139.6503 },
  'New York, USA': { lat: 40.7128, lng: -74.0060 },
  'London, UK': { lat: 51.5074, lng: -0.1278 },
  'Rome, Italy': { lat: 41.9028, lng: 12.4964 },
  'Sydney, Australia': { lat: -33.8688, lng: 151.2093 },
  'Dubai, UAE': { lat: 25.2048, lng: 55.2708 },
  'Bali, Indonesia': { lat: -8.3405, lng: 115.0920 },
  'Barcelona, Spain': { lat: 41.3851, lng: 2.1734 },
  'Bangkok, Thailand': { lat: 13.7563, lng: 100.5018 },
  'Mumbai, India': { lat: 19.0760, lng: 72.8777 },
  'San Francisco, USA': { lat: 37.7749, lng: -122.4194 },
  'Berlin, Germany': { lat: 52.5200, lng: 13.4050 },
  'Rio de Janeiro, Brazil': { lat: -22.9068, lng: -43.1729 },
  'Cairo, Egypt': { lat: 30.0444, lng: 31.2357 },
};

export default function InteractiveMap() {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null);

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['/api/blogs'],
    queryFn: async (): Promise<BlogPost[]> => {
      const response = await apiRequest('GET', '/api/blogs');
      return await response.json();
    },
  });

  // Group blogs by destination and create markers
  const markers: MapMarker[] = blogs.reduce((acc, blog) => {
    const coords = DESTINATION_COORDS[blog.destination];
    if (!coords) return acc;

    const existingMarker = acc.find(m => m.destination === blog.destination);
    if (existingMarker) {
      existingMarker.blogs.push(blog);
      existingMarker.blogCount++;
    } else {
      acc.push({
        id: blog.destination.replace(/[^a-zA-Z0-9]/g, '-'),
        lat: coords.lat,
        lng: coords.lng,
        destination: blog.destination,
        blogCount: 1,
        blogs: [blog],
      });
    }
    return acc;
  }, [] as MapMarker[]);

  const handleMarkerClick = (marker: MapMarker) => {
    setSelectedMarker(marker);
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading travel destinations...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-hidden border">
        {/* World Map Background */}
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 1000 500" className="w-full h-full">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Simplified world map outline */}
            <path d="M 150 150 Q 200 100 300 120 Q 400 110 500 130 Q 600 120 700 140 Q 800 130 850 150 L 850 350 Q 800 370 700 360 Q 600 380 500 370 Q 400 390 300 380 Q 200 400 150 350 Z" 
                  fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>

        {/* Map Markers */}
        <div className="absolute inset-0" ref={setMapContainer}>
          {markers.map((marker) => {
            // Convert lat/lng to percentage position on the map
            const x = ((marker.lng + 180) / 360) * 100;
            const y = ((90 - marker.lat) / 180) * 100;

            return (
              <button
                key={marker.id}
                onClick={() => handleMarkerClick(marker)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <div className="relative">
                  {/* Marker Pin */}
                  <div className="w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  
                  {/* Blog Count Badge */}
                  {marker.blogCount > 1 && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {marker.blogCount}
                    </div>
                  )}

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-black text-white text-sm px-2 py-1 rounded whitespace-nowrap">
                      {marker.destination}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 text-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 bg-primary rounded-full"></div>
            <span>Travel Destinations</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Click markers to view travel blogs
          </div>
        </div>
      </div>

      {/* Blog Modal */}
      <Dialog open={!!selectedMarker} onOpenChange={() => setSelectedMarker(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Travel Stories from {selectedMarker?.destination}
            </DialogTitle>
          </DialogHeader>
          
          {selectedMarker && (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                {selectedMarker.blogCount} {selectedMarker.blogCount === 1 ? 'story' : 'stories'} from this destination
              </div>
              
              <div className="grid gap-4 max-h-[60vh] overflow-y-auto">
                {selectedMarker.blogs.map((blog) => (
                  <Card key={blog.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start gap-4">
                        <CardTitle className="text-lg">{blog.title}</CardTitle>
                        {blog.imageUrl && (
                          <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                            <img
                              src={blog.imageUrl}
                              alt={blog.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{blog.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(blog.createdAt)}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {blog.excerpt}
                      </p>
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {blog.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {blog.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{blog.tags.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}
                      <Button size="sm" className="w-full">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Read Full Story
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
