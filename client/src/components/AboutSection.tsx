import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 data-testid="heading-about" className="text-4xl md:text-5xl font-bold text-center mb-12">
          <span className="text-primary">About</span> Us
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          <div data-testid="about-image" className="relative">
            <Card className="overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <h3 className="text-2xl font-bold mb-4">WanderNestle Family</h3>
                  <p className="text-muted-foreground">
                    A community of passionate travelers sharing memories and experiences
                  </p>
                </div>
              </div>
            </Card>
          </div>
          
          <div data-testid="about-content" className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold mb-4">Know Us</h3>
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  We are not a company, we are family who help to share your dreams, 
                  memories and experience with the world.
                </p>
                <p>
                  Your Blogs, Pictures and Videos are your memories, the thrill you felt, 
                  calmness you got. We share these memories of yours to the world.
                </p>
              </div>
            </div>
            
            <Button 
              data-testid="button-contact-us"
              onClick={scrollToContact}
              size="lg"
              className="text-lg px-8 py-3"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}