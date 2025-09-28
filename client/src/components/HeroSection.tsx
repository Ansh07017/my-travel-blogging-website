import { Button } from '@/components/ui/button';
import ImageSlider from './ImageSlider';
import { useLocation } from 'wouter';

export default function HeroSection() {
  const [, setLocation] = useLocation();

  const handleCreateBlogs = () => {
    console.log('Create your blogs clicked');
    setLocation('/create-blog');
  };

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center pt-20 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div data-testid="hero-content" className="text-center lg:text-left space-y-6 order-2 lg:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              A journey of thousand miles, begins with a step{' '}
              <span className="text-primary block mt-2">travel enthusiasts</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Share your travel memories and discover amazing destinations with fellow wanderers. 
              Create your blogs and explore the world together.
            </p>
            <Button 
              data-testid="button-create-blogs"
              onClick={handleCreateBlogs}
              size="lg"
              className="text-lg px-8 py-4 h-auto"
            >
              Create Your Blogs
            </Button>
          </div>

          {/* Image Slider */}
          <div data-testid="hero-slider" className="order-1 lg:order-2">
            <ImageSlider autoplay={true} autoplayDelay={4000} />
          </div>
        </div>
      </div>
    </section>
  );
}