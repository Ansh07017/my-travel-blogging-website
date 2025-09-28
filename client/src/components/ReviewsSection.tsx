import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import bloggerImg from '@assets/generated_images/Travel_blogger_portrait_0438a303.png';

export default function ReviewsSection() {
  // TODO: Replace with dynamic reviews data from API
  const reviews = [
    {
      id: 1,
      name: 'Johnny Bairstow',
      role: 'Traveller',
      image: bloggerImg,
      content: 'I quietly walk up the metal spiral stairs to the top of the lookout tower, trying not to make any loud noises that\'d scare away nearby wildlife. Once I get to the top, I see Tom and Lisa, a father-daughter volunteer duo, scanning the jagged mountains. I ask if they\'ve seen anything interesting...',
    },
    {
      id: 2,
      name: 'Hana Alice',
      role: 'Wanderer',
      image: bloggerImg,
      content: 'We split into two teams. Half of the volunteers go with Dr. Manoel Muanis, the project\'s leading scientist, and the other half go with Julian Willmer, a biologist working with Manoel. Manoel\'s cohort always checks the traps higher up the mountain, and I want to hike as much as possible, so I volunteer to go with him...',
    },
    {
      id: 3,
      name: 'Chris Evans',
      role: 'Voyager',
      image: bloggerImg,
      content: 'Ten years ago, if you told me that I would be a travel blogger at this point in my life, I would have called you crazy!! And here I am. What started out as a little travel blog to keep friends and family up-to-date on our around the world trip has grown into something much bigger. This unexpected journey has been a life changing experience...',
    },
    {
      id: 4,
      name: 'Mark Ruffalo',
      role: 'Survivor',
      image: bloggerImg,
      content: 'With absolutely no experience on website design, blogging, and writing for an audience, we started Earth Trekkers in February 2014. Immediately, I came to the realization of how much work this would be. It took days to come up with a design and a flow for the website...',
    },
  ];

  const [currentReview, setCurrentReview] = useState(0);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToReview = (index: number) => {
    setCurrentReview(index);
  };

  const visibleReviews = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentReview + i) % reviews.length;
      result.push({ ...reviews[index], displayIndex: i });
    }
    return result;
  };

  return (
    <section id="blogs" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 data-testid="heading-reviews" className="text-4xl md:text-5xl font-bold text-center mb-12">
          Traveller's <span className="text-primary">Blog</span>
        </h2>
        
        <div className="max-w-7xl mx-auto">
          {/* Desktop View - Show 3 reviews */}
          <div className="hidden lg:grid grid-cols-3 gap-6">
            {visibleReviews().map((review) => (
              <Card 
                key={review.id}
                data-testid={`review-card-${review.id}`}
                className="hover-elevate transition-all duration-200 relative"
              >
                <Quote className="absolute top-4 right-4 w-12 h-12 text-primary opacity-20" />
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-lg">{review.name}</h4>
                      <p className="text-muted-foreground capitalize">{review.role}</p>
                    </div>
                  </div>
                  
                  <p className="text-foreground leading-relaxed line-clamp-4">
                    {review.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile/Tablet View - Show 1 review with navigation */}
          <div className="lg:hidden">
            <div className="relative">
              <Card 
                data-testid={`mobile-review-${reviews[currentReview].id}`}
                className="hover-elevate transition-all duration-200 relative"
              >
                <Quote className="absolute top-4 right-4 w-12 h-12 text-primary opacity-20" />
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={reviews[currentReview].image}
                      alt={reviews[currentReview].name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-lg">{reviews[currentReview].name}</h4>
                      <p className="text-muted-foreground capitalize">{reviews[currentReview].role}</p>
                    </div>
                  </div>
                  
                  <p className="text-foreground leading-relaxed">
                    {reviews[currentReview].content}
                  </p>
                </CardContent>
              </Card>

              {/* Navigation buttons */}
              <Button
                data-testid="button-prev-review"
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
                onClick={prevReview}
              >
                <ChevronLeft size={20} />
              </Button>
              
              <Button
                data-testid="button-next-review"
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10"
                onClick={nextReview}
              >
                <ChevronRight size={20} />
              </Button>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  data-testid={`review-dot-${index}`}
                  onClick={() => goToReview(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentReview ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Navigation for desktop */}
          <div className="hidden lg:flex justify-center mt-8 space-x-4">
            <Button
              data-testid="button-prev-reviews"
              variant="outline"
              onClick={prevReview}
            >
              <ChevronLeft size={20} className="mr-2" />
              Previous
            </Button>
            
            <Button
              data-testid="button-next-reviews"
              variant="outline"
              onClick={nextReview}
            >
              Next
              <ChevronRight size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}