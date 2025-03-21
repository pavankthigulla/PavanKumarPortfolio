import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Initialize animations on elements with data-animate attribute
export const initAnimations = () => {
  // Animate elements when scrolled into view
  const animateOnScroll = () => {
    const animatedElements = document.querySelectorAll("[data-animate]:not(.animated)");
    
    animatedElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.classList.add("animated");
      }
    });
  };
  
  // Initialize animations on load
  animateOnScroll();
  
  // Listen for scroll events
  window.addEventListener("scroll", animateOnScroll);
  
  return () => {
    window.removeEventListener("scroll", animateOnScroll);
  };
};

// Animate skill bars
export const animateSkillBars = () => {
  const skillBars = document.querySelectorAll(".skill-progress");
  
  skillBars.forEach(bar => {
    const width = bar.getAttribute("data-width");
    setTimeout(() => {
      if (width) {
        bar.style.transform = `scaleX(${parseInt(width) / 100})`;
      }
    }, 200);
  });
};

// Timeline animation for hero section
export const animateHero = (element: HTMLElement) => {
  const timeline = gsap.timeline();
  
  timeline
    .from(element.querySelector(".hero-title"), {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
    .from(
      element.querySelector(".hero-subtitle"),
      {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.4"
    )
    .from(
      element.querySelector(".hero-description"),
      {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.2"
    )
    .from(
      element.querySelector(".hero-cta"),
      {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.2"
    );
    
  return timeline;
};

// Project card hover animation
export const animateProjectCard = (card: HTMLElement) => {
  const image = card.querySelector(".project-image");
  
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      y: -10,
      duration: 0.3,
      ease: "power2.out",
    });
    
    if (image) {
      gsap.to(image, {
        scale: 1.05,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  });
  
  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
    
    if (image) {
      gsap.to(image, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  });
};
