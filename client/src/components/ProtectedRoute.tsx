import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Adjusted import path to be relative
import { useLocation } from 'wouter'; // Import useLocation for navigation
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Destructure userId for logging, though not used in UI logic
  const { isAuthenticated, isLoading, user } = useAuth(); 
  // Get the navigate function from wouter's useLocation hook
  const [, navigate] = useLocation(); 

  // Use useEffect to handle the side effect of navigation/redirection
  useEffect(() => {
    // Only attempt redirection once loading is complete
    if (!isLoading && !isAuthenticated) {
      console.log(`User ${user} is not authenticated. Redirecting to /auth.`);
      // Correct way to redirect in wouter, respects hash routing
      navigate('/auth'); 
    }
  }, [isAuthenticated, isLoading, navigate, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If authenticated, render the children
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // If not authenticated (and loading is done), we return null because the 
  // useEffect hook above has already triggered the navigation.
  return null;
}