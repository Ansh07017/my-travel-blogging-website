
import React, { useState } from 'react';
import { Settings, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isRotating, setIsRotating] = useState(false);

  const handleToggle = () => {
    setIsRotating(true);
    toggleTheme();
    
    // Reset rotation after animation completes
    setTimeout(() => {
      setIsRotating(false);
    }, 600);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggle}
        className="relative h-10 w-10 rounded-full border border-border/20 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {/* Settings Icon with Rotation Animation */}
        <Settings 
          className={cn(
            "h-5 w-5 text-foreground/70 transition-all duration-600 ease-in-out",
            isRotating && "rotate-180 scale-110"
          )}
        />
        
        {/* Theme Icons with Fade Animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Sun 
            className={cn(
              "h-3 w-3 transition-all duration-500 ease-in-out absolute",
              theme === 'light' ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 rotate-90",
              "text-amber-500"
            )}
          />
          <Moon 
            className={cn(
              "h-3 w-3 transition-all duration-500 ease-in-out absolute",
              theme === 'dark' ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-90",
              "text-blue-400"
            )}
          />
        </div>
        
        {/* Ripple Effect */}
        <div 
          className={cn(
            "absolute inset-0 rounded-full bg-current opacity-0 transition-opacity duration-300",
            isRotating && "animate-ping opacity-20"
          )}
        />
      </Button>
      
      {/* Tooltip */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <span className="text-xs bg-popover text-popover-foreground px-2 py-1 rounded border whitespace-nowrap">
          {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
        </span>
      </div>
    </div>
  );
};

export default ThemeToggle;
