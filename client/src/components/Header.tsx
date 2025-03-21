import { useState, useEffect } from "react";
import { Link } from "wouter";
import { X, Menu } from "lucide-react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 px-5 py-3 flex justify-end items-center transition-all duration-300 ${
      scrolled ? "bg-background/80 backdrop-blur-lg shadow-md" : "bg-transparent"
    }`}>
      
      <nav className="hidden md:flex gap-6 mr-12">
        <a href="#home" className="nav-link font-medium hover-target relative group">
          <span className="inline-block">Home</span>
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </a>
        <a href="#about" className="nav-link font-medium hover-target relative group">
          <span className="inline-block">About</span>
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </a>
        <a href="#projects" className="nav-link font-medium hover-target relative group">
          <span className="inline-block">Projects</span>
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </a>
        <a href="#skills" className="nav-link font-medium hover-target relative group">
          <span className="inline-block">Skills</span>
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </a>
        <a href="#contact" className="nav-link font-medium hover-target relative group">
          <span className="inline-block">Contact</span>
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </a>
      </nav>
      
      <button 
        className="fixed left-5 md:hidden hover-target" 
        onClick={() => setIsMenuOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>
      
      {/* Mobile menu */}
      <div className={`fixed inset-y-0 right-0 w-64 bg-muted/90 backdrop-blur-md p-8 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="flex justify-end mb-8">
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="hover-target"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col gap-6">
          <a 
            href="#home" 
            className="text-lg hover-target"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </a>
          <a 
            href="#about" 
            className="text-lg hover-target"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </a>
          <a 
            href="#projects" 
            className="text-lg hover-target"
            onClick={() => setIsMenuOpen(false)}
          >
            Projects
          </a>
          <a 
            href="#skills" 
            className="text-lg hover-target"
            onClick={() => setIsMenuOpen(false)}
          >
            Skills
          </a>
          <a 
            href="#contact" 
            className="text-lg hover-target"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
};
