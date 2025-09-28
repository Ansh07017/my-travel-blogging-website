import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export default function PricingSection() {
  // TODO: Replace with dynamic pricing data from API
  const pricingPlans = [
    {
      title: 'India (Any One)',
      price: '$450.99',
      destinations: [
        'Goa',
        'New Delhi',
        'Mumbai',
        'Varanasi, Prayag, Ayodhya',
        'Uttarakhand',
      ],
    },
    {
      title: 'Europe (Any One)',
      price: '$1,050.99',
      destinations: [
        'Amsterdam',
        'Paris',
        'Madrid',
        'Berlin',
        'Munich',
      ],
      featured: true,
    },
    {
      title: 'USA (Any One)',
      price: '$2,650.99',
      destinations: [
        'Los Angeles',
        'Las Vegas',
        'New York',
        'California',
        'Hawaii',
      ],
    },
    {
      title: 'For Others',
      price: '$1,850.99',
      destinations: [
        'Sydney',
        'Maldives',
        'Moscow',
        'Brazil',
        'South Africa',
      ],
    },
  ];

  const handleCheckout = (plan: any) => {
    console.log(`Checkout clicked for plan: ${plan.title}`);
    // TODO: Implement actual checkout functionality
  };

  return (
    <section id="plans" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 data-testid="heading-pricing" className="text-4xl md:text-5xl font-bold text-center mb-4">
          Our <span className="text-primary">Travel Plans</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          5 Days Package
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index}
              data-testid={`pricing-card-${index}`}
              className={`
                text-center hover-elevate transition-all duration-300 relative
                ${plan.featured ? 'ring-2 ring-primary scale-105' : ''}
              `}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <CardTitle className="bg-primary text-primary-foreground py-3 mx-[-1.5rem] mt-[-1.5rem] mb-4 text-xl">
                  {plan.title}
                </CardTitle>
                <div className="text-4xl font-bold text-foreground">
                  {plan.price}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.destinations.map((destination, destIndex) => (
                    <li key={destIndex} className="flex items-center text-left">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="capitalize">{destination}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  data-testid={`button-checkout-${index}`}
                  onClick={() => handleCheckout(plan)}
                  className="w-full mt-6"
                  variant={plan.featured ? 'default' : 'outline'}
                >
                  Check Out
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}