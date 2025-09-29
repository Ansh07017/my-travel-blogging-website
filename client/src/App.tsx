import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import GallerySection from "@/components/GallerySection";
import BlogsSection from '@/components/BlogsSection';
import InteractiveMap from '@/components/InteractiveMap';
import PricingSection from "@/components/PricingSection";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CreateBlog from "@/pages/CreateBlog";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/not-found";

function Home() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <HeroSection />
          <ServicesSection />
          <AboutSection />
          <GallerySection />
          <BlogsSection />
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Explore Travel <span className="text-primary">Destinations</span></h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Discover amazing travel stories from around the world. Click on any destination marker to read travel blogs from that location.
                </p>
              </div>
              <InteractiveMap />
            </div>
          </section>
          <ReviewsSection />
          <PricingSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/create-blog" component={CreateBlog} />
      <Route path="/auth" component={Auth} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;