import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Initialize animations on elements with data-animate attribute
export const initAnimations = () => {
  // Simple scroll animations with immediate reveal
  const animateOnScroll = () => {
    const animatedElements = document.querySelectorAll("[data-animate]:not(.animated)");
    
    animatedElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 50) {
        // Add class for CSS animations
        element.classList.add("animated");
        
        // Simple fade in for elements
        gsap.to(element, {
          opacity: 1,
          duration: 0.5,
          ease: "power1.out"
        });
      }
    });
  };
  
  // Initialize scroll animations
  animateOnScroll();
  
  // Listen for scroll events
  window.addEventListener("scroll", animateOnScroll);
  
  return () => {
    window.removeEventListener("scroll", animateOnScroll);
  };
};

// Animate skill bars with simplified effects
export const animateSkillBars = () => {
  const skillBars = document.querySelectorAll(".skill-progress");
  
  skillBars.forEach((bar, index) => {
    const width = bar.getAttribute("data-width");
    
    if (width) {
      // Simple animation for each skill bar
      gsap.to(bar, {
        scaleX: parseInt(width) / 100,
        duration: 0.8,
        delay: index * 0.1, // Slight stagger
        ease: "power1.out",
      });
    }
  });
};

// Simplified hero section animation
export const animateHero = (element: HTMLElement) => {
  const timeline = gsap.timeline();
  
  // Simple animation sequence
  timeline
    .from(
      element.querySelector(".hero-title"), 
      {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power1.out",
      }
    )
    .from(
      element.querySelector(".hero-subtitle"),
      {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power1.out",
      },
      "-=0.3"
    )
    .from(
      element.querySelector(".hero-description"),
      {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power1.out",
      },
      "-=0.3"
    )
    .from(
      element.querySelector(".hero-cta"),
      {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power1.out",
      },
      "-=0.3"
    );
    
  return timeline;
};

// Simplified project card animation
export const animateProjectCard = (card: HTMLElement) => {
  const image = card.querySelector(".project-image");
  
  // Basic hover effects only
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      y: -5,
      boxShadow: "0 8px 15px rgba(0,0,0,0.1)",
      duration: 0.3,
      ease: "power1.out",
    });
    
    if (image) {
      gsap.to(image, {
        scale: 1.03,
        duration: 0.3,
        ease: "power1.out",
      });
    }
  });
  
  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      y: 0,
      boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
      duration: 0.3,
      ease: "power1.out",
    });
    
    if (image) {
      gsap.to(image, {
        scale: 1,
        duration: 0.3,
        ease: "power1.out",
      });
    }
  });
};
