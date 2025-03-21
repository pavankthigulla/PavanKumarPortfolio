import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    // You would typically update class on the document here
    // and potentially save the preference to localStorage
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    
    // For this implementation, we're keeping it in dark mode by default
    // as per the design reference
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-40 bg-card p-3 rounded-full shadow-lg opacity-90 hover:opacity-100 transition-opacity hover-target">
      <button 
        onClick={toggleTheme} 
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? (
          <Sun className="w-6 h-6 text-primary" />
        ) : (
          <Moon className="w-6 h-6 text-primary" />
        )}
      </button>
    </div>
  );
};
