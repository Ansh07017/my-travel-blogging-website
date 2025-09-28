import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Music, UtensilsCrossed, Camera, Cake } from 'lucide-react';

export default function ServicesSection() {
  // TODO: Replace with dynamic services from API
  const services = [
    {
      icon: MapPin,
      title: 'Select Destination',
      description: 'Spot your favourite destinations.',
      action: () => console.log('Select destination clicked'),
    },
    {
      icon: Users,
      title: 'Inviting Friends and Followers',
      description: 'To join you to glance their favourite destinations.',
      action: () => console.log('Invite friends clicked'),
    },
    {
      icon: Music,
      title: 'Fun and Enjoyment',
      description: 'Travelling is all about fun so share some of your travel memories.',
      action: () => console.log('Fun and enjoyment clicked'),
    },
    {
      icon: UtensilsCrossed,
      title: 'Special Dishes at Destinations',
      description: 'Spot on your favourite dishes, enjoyed during your voyage.',
      action: () => console.log('Special dishes clicked'),
    },
    {
      icon: Camera,
      title: 'Photos and Videos of Trip',
      description: 'Wish to share memories, share your pics and videos with world.',
      action: () => console.log('Photos and videos clicked'),
    },
    {
      icon: Cake,
      title: 'Rejoice Special Memories',
      description: 'Enjoy memories of others and imagine your dream destinations.',
      action: () => console.log('Special memories clicked'),
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 data-testid="heading-services" className="text-4xl md:text-5xl font-bold text-center mb-12">
          Our <span className="text-primary">Blogs</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index}
                data-testid={`service-card-${index}`}
                className="text-center hover-elevate transition-all duration-200 group"
              >
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                    <IconComponent className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <Button 
                    data-testid={`button-service-${index}`}
                    onClick={service.action}
                    className="w-full"
                  >
                    Explore
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}