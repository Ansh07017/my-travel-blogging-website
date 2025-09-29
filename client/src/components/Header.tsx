import { useState } from 'react';
import { Menu, X, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/auth';
  };

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

        <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>Welcome, {user?.name}</span>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="text-foreground hover:text-primary"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="text-foreground hover:text-primary"
                  onClick={() => window.location.href = '/auth'}
                >
                  Login
                </Button>
                <Button onClick={() => window.location.href = '/auth'}>
                  Sign Up
                </Button>
              </>
            )}
          </div>

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
            <div className="flex flex-col space-y-3 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground p-2">
                    <User className="h-4 w-4" />
                    <span>Welcome, {user?.name}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="justify-start"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    className="justify-start"
                    onClick={() => window.location.href = '/auth'}
                  >
                    Login
                  </Button>
                  <Button 
                    className="justify-start"
                    onClick={() => window.location.href = '/auth'}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}