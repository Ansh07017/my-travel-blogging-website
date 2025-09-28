import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div 
          data-testid="logo-wandernestle"
          className="text-2xl font-bold text-foreground cursor-pointer"
          onClick={() => scrollToSection('home')}
        >
          <span className="text-primary">Wander</span>Nestle
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <button 
            data-testid="nav-home"
            onClick={() => scrollToSection('home')} 
            className="text-foreground hover:text-primary transition-colors"
          >
            Home
          </button>
          <button 
            data-testid="nav-services"
            onClick={() => scrollToSection('services')} 
            className="text-foreground hover:text-primary transition-colors"
          >
            Services
          </button>
          <button 
            data-testid="nav-about"
            onClick={() => scrollToSection('about')} 
            className="text-foreground hover:text-primary transition-colors"
          >
            About
          </button>
          <button 
            data-testid="nav-gallery"
            onClick={() => scrollToSection('gallery')} 
            className="text-foreground hover:text-primary transition-colors"
          >
            Gallery
          </button>
          <button 
            data-testid="nav-plans"
            onClick={() => scrollToSection('plans')} 
            className="text-foreground hover:text-primary transition-colors"
          >
            Plans
          </button>
          <button 
            data-testid="nav-blogs"
            onClick={() => scrollToSection('blogs')} 
            className="text-foreground hover:text-primary transition-colors"
          >
            Blogs
          </button>
          <button 
            data-testid="nav-contact"
            onClick={() => scrollToSection('contact')} 
            className="text-foreground hover:text-primary transition-colors"
          >
            Contact
          </button>
        </nav>

        <Button
          data-testid="button-menu-toggle"
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <nav className="flex flex-col p-4 space-y-4">
            <button 
              data-testid="mobile-nav-home"
              onClick={() => scrollToSection('home')} 
              className="text-left text-foreground hover:text-primary transition-colors p-2 rounded hover-elevate"
            >
              Home
            </button>
            <button 
              data-testid="mobile-nav-services"
              onClick={() => scrollToSection('services')} 
              className="text-left text-foreground hover:text-primary transition-colors p-2 rounded hover-elevate"
            >
              Services
            </button>
            <button 
              data-testid="mobile-nav-about"
              onClick={() => scrollToSection('about')} 
              className="text-left text-foreground hover:text-primary transition-colors p-2 rounded hover-elevate"
            >
              About
            </button>
            <button 
              data-testid="mobile-nav-gallery"
              onClick={() => scrollToSection('gallery')} 
              className="text-left text-foreground hover:text-primary transition-colors p-2 rounded hover-elevate"
            >
              Gallery
            </button>
            <button 
              data-testid="mobile-nav-plans"
              onClick={() => scrollToSection('plans')} 
              className="text-left text-foreground hover:text-primary transition-colors p-2 rounded hover-elevate"
            >
              Plans
            </button>
            <button 
              data-testid="mobile-nav-blogs"
              onClick={() => scrollToSection('blogs')} 
              className="text-left text-foreground hover:text-primary transition-colors p-2 rounded hover-elevate"
            >
              Blogs
            </button>
            <button 
              data-testid="mobile-nav-contact"
              onClick={() => scrollToSection('contact')} 
              className="text-left text-foreground hover:text-primary transition-colors p-2 rounded hover-elevate"
            >
              Contact
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}