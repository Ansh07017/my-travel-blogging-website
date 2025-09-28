import { MapPin, ArrowRight, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // TODO: Replace with dynamic footer data from API
  const branches = [
    { name: 'Mumbai', onClick: () => console.log('Mumbai branch clicked') },
    { name: 'Chennai', onClick: () => console.log('Chennai branch clicked') },
    { name: 'Kolkata', onClick: () => console.log('Kolkata branch clicked') },
    { name: 'Prayagraj', onClick: () => console.log('Prayagraj branch clicked') },
    { name: 'New Delhi', onClick: () => console.log('New Delhi branch clicked') },
  ];

  const quickLinks = [
    { name: 'Home', action: () => scrollToSection('home') },
    { name: 'Our Blogs', action: () => scrollToSection('services') },
    { name: 'About', action: () => scrollToSection('about') },
    { name: 'Gallery', action: () => scrollToSection('gallery') },
    { name: 'Travel Plans', action: () => scrollToSection('plans') },
    { name: 'Recent Blogs', action: () => scrollToSection('blogs') },
    { name: 'Contact', action: () => scrollToSection('contact') },
  ];

  const contactInfo = [
    { 
      icon: Phone, 
      text: '+1 (555) 123-4567', 
      href: 'tel:+15551234567',
      onClick: () => console.log('Phone clicked') 
    },
    { 
      icon: Mail, 
      text: 'info@wandernestle.com', 
      href: 'mailto:info@wandernestle.com',
      onClick: () => console.log('Email clicked') 
    },
    { 
      icon: Clock, 
      text: 'Mon - Fri: 9:00 AM - 6:00 PM', 
      onClick: () => console.log('Hours clicked') 
    },
  ];

  return (
    <footer className="bg-card/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Branches */}
          <div data-testid="footer-branches">
            <h3 className="text-2xl font-bold mb-6 text-foreground">Branches</h3>
            <div className="space-y-3">
              {branches.map((branch, index) => (
                <button
                  key={index}
                  data-testid={`branch-${branch.name.toLowerCase()}`}
                  onClick={branch.onClick}
                  className="flex items-center text-muted-foreground hover:text-primary transition-colors text-left w-full group"
                >
                  <MapPin size={16} className="mr-2 group-hover:mr-4 transition-all duration-200" />
                  {branch.name}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div data-testid="footer-quick-links">
            <h3 className="text-2xl font-bold mb-6 text-foreground">Quick Links</h3>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <button
                  key={index}
                  data-testid={`quick-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={link.action}
                  className="flex items-center text-muted-foreground hover:text-primary transition-colors text-left w-full group"
                >
                  <ArrowRight size={16} className="mr-2 group-hover:mr-4 transition-all duration-200" />
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div data-testid="footer-contact-info">
            <h3 className="text-2xl font-bold mb-6 text-foreground">Contact Info</h3>
            <div className="space-y-3">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                const content = (
                  <div className="flex items-center text-muted-foreground hover:text-primary transition-colors group">
                    <IconComponent size={16} className="mr-2 group-hover:mr-4 transition-all duration-200" />
                    {info.text}
                  </div>
                );

                return (
                  <div key={index}>
                    {info.href ? (
                      <a
                        data-testid={`contact-${info.text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`}
                        href={info.href}
                        onClick={info.onClick}
                        className="block"
                      >
                        {content}
                      </a>
                    ) : (
                      <button
                        data-testid={`contact-${info.text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`}
                        onClick={info.onClick}
                        className="text-left w-full"
                      >
                        {content}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* About Company */}
          <div data-testid="footer-about">
            <h3 className="text-2xl font-bold mb-6 text-foreground">About WanderNestle</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We are a family of travel enthusiasts helping you share your dreams, 
              memories, and experiences with the world. Join our community of wanderers!
            </p>
            <div className="flex space-x-2">
              <div 
                data-testid="logo-footer"
                className="text-xl font-bold text-foreground cursor-pointer"
                onClick={() => scrollToSection('home')}
              >
                <span className="text-primary">Wander</span>Nestle
              </div>
            </div>
          </div>
        </div>

        {/* Credit/Copyright */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p data-testid="footer-credit" className="text-muted-foreground">
            © 2024 WanderNestle. All rights reserved. Built with ❤️ for travel enthusiasts.
          </p>
        </div>
      </div>
    </footer>
  );
}