import { useEffect, useRef } from "react";
import { animateHero } from "@/lib/animations";
import { ChevronDown } from "lucide-react";

export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      const timeline = animateHero(sectionRef.current);
      return () => {
        timeline.kill();
      };
    }
  }, []);

  return (
    <section ref={sectionRef} id="home" className="section flex items-center justify-center relative min-h-screen overflow-hidden" data-section="home">
      <div className="absolute inset-0 z-0">
        {/* Background elements */}
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-primary/10 filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-secondary/10 filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
        <div data-animate>
          <p className="text-primary font-code mb-4 tracking-widest hero-title">Hello, my name is</p>
          <h1 className="text-4xl md:text-7xl font-display font-bold mb-4 hero-title">Pavan Kumar</h1>
          <h2 className="text-xl md:text-3xl text-muted-foreground font-display mb-8 hero-subtitle">Software Engineer</h2>
          <p className="max-w-lg mx-auto text-muted-foreground mb-12 hero-description">
            Experienced Software Engineer with expertise in full-stack development, specializing in React, Spring Boot and Node.js.
            Creating scalable, user-focused solutions with a passion for innovation.
          </p>
          
          <div className="flex justify-center gap-4 hero-cta">
            <a 
              href="#projects" 
              className="bg-transparent hover:bg-primary/10 text-primary border-2 border-primary px-6 py-3 rounded-md font-medium 
              transition-all duration-300 hover:shadow-[0_0_15px_rgba(14,231,183,0.4)] hover-target"
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className="bg-primary hover:bg-primary/90 text-black font-medium px-6 py-3 rounded-md transition-all duration-300 hover-target"
            >
              Contact Me
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </div>
    </section>
  );
};
