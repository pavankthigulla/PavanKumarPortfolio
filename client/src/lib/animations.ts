import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Initialize animations on elements with data-animate attribute
export const initAnimations = () => {
  // Create floating particle effect for background sections
  const createParticles = () => {
    const sections = document.querySelectorAll("section");
    
    sections.forEach((section) => {
      // Don't add particles if they already exist
      if (section.querySelector('.particles-container')) return;
      
      // Create particle container
      const particleContainer = document.createElement('div');
      particleContainer.className = 'particles-container absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30';
      section.prepend(particleContainer);
      
      // Create particles based on section (more for hero, fewer for others)
      const count = section.id === 'home' ? 15 : 8;
      
      for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        
        // Size and style
        const size = Math.random() * 6 + 2;
        particle.className = 'absolute rounded-full bg-primary';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = (Math.random() * 0.4 + 0.1).toString();
        
        // Initial position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        particleContainer.appendChild(particle);
        
        // Floating animation
        gsap.to(particle, {
          x: `${(Math.random() - 0.5) * 200}`,
          y: `${(Math.random() - 0.5) * 200}`,
          duration: Math.random() * 40 + 20,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        
        // Pulsing effect
        gsap.to(particle, {
          opacity: Math.random() * 0.3,
          duration: Math.random() * 2 + 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });
  };
  
  // Enhanced scroll animations with staggered reveals
  const animateOnScroll = () => {
    const animatedElements = document.querySelectorAll("[data-animate]:not(.animated)");
    
    animatedElements.forEach((element, index) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 50) {
        // Add class for CSS animations
        element.classList.add("animated");
        
        // Add GSAP animations with staggered timing
        const delay = index * 0.1; // Stagger effect for multiple elements
        
        gsap.fromTo(
          element,
          { 
            y: 40,
            opacity: 0,
            scale: 0.97,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay,
            ease: "power2.out"
          }
        );
      }
    });
  };
  
  // Add ScrollTrigger animations for larger sections
  const setupScrollTriggers = () => {
    // Parallax backgrounds
    gsap.utils.toArray<HTMLElement>('.parallax-bg').forEach(bg => {
      gsap.to(bg, {
        y: '30%',
        ease: "none",
        scrollTrigger: {
          trigger: bg.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
    
    // Section entrance animations
    gsap.utils.toArray<HTMLElement>('section').forEach(section => {
      // Subtle scaling effect for sections
      gsap.fromTo(
        section,
        { backgroundColor: 'rgba(0,0,0,0)' },
        {
          backgroundColor: 'rgba(0,0,0,0.05)',
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: true
          }
        }
      );
    });
  };
  
  // Initialize everything
  createParticles();
  animateOnScroll();
  setupScrollTriggers();
  
  // Listen for scroll events
  window.addEventListener("scroll", animateOnScroll);
  
  return () => {
    window.removeEventListener("scroll", animateOnScroll);
  };
};

// Animate skill bars with improved effects
export const animateSkillBars = () => {
  const skillBars = document.querySelectorAll(".skill-progress");
  
  skillBars.forEach((bar, index) => {
    const width = bar.getAttribute("data-width");
    
    if (width) {
      // Staggered animation for each skill bar
      gsap.fromTo(
        bar, 
        { scaleX: 0 },
        {
          scaleX: parseInt(width) / 100,
          duration: 1.2,
          delay: index * 0.15, // Staggered timing
          ease: "elastic.out(1, 0.75)",
        }
      );
      
      // Add subtle glow effect
      gsap.fromTo(
        bar,
        { boxShadow: "0 0 0 rgba(var(--primary), 0)" },
        {
          boxShadow: "0 0 8px rgba(var(--primary), 0.5)",
          duration: 2,
          delay: index * 0.15 + 1, // Start after bar is filled
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }
      );
      
      // Skill label animation
      const label = bar.parentElement?.querySelector(".skill-label");
      if (label) {
        gsap.from(label, {
          x: -20,
          opacity: 0,
          duration: 0.5,
          delay: index * 0.15,
          ease: "power2.out"
        });
      }
      
      // Skill percentage animation
      const percent = bar.parentElement?.querySelector(".skill-percent");
      if (percent) {
        gsap.from(percent, {
          opacity: 0,
          duration: 0.5,
          delay: index * 0.15 + 0.5,
          ease: "power2.out"
        });
        
        // Counter animation for percentage
        const percentValue = parseInt(width);
        gsap.fromTo(
          percent,
          { innerText: "0%" },
          {
            innerText: `${percentValue}%`,
            duration: 1.2,
            delay: index * 0.15,
            snap: { innerText: 1 },
          }
        );
      }
    }
  });
};

// Enhanced hero section animation
export const animateHero = (element: HTMLElement) => {
  const timeline = gsap.timeline();
  
  // Prepare elements for smoother animation
  gsap.set([
    element.querySelector(".hero-title"),
    element.querySelector(".hero-subtitle"),
    element.querySelector(".hero-description"),
    element.querySelector(".hero-cta")
  ], { opacity: 0, y: 40 });
  
  // Create reveal line animation
  const revealLine = document.createElement('div');
  revealLine.className = 'absolute top-0 left-0 h-1 bg-primary';
  revealLine.style.width = '0';
  element.appendChild(revealLine);
  
  timeline
    .to(revealLine, {
      width: '100%',
      duration: 1.5,
      ease: "power3.inOut",
    })
    .from(
      element.querySelector(".hero-title"), 
      {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      },
      "-=1.2"
    )
    .from(
      element.querySelector(".hero-subtitle"),
      {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.9"
    )
    .from(
      element.querySelector(".hero-description"),
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.7"
    )
    .from(
      element.querySelector(".hero-cta"),
      {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        onComplete: () => {
          // Remove reveal line after animation completes
          gsap.to(revealLine, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => revealLine.remove()
          });
        }
      },
      "-=0.5"
    );
  
  // Add scroll indicator animation if it exists
  const scrollIndicator = element.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    gsap.from(scrollIndicator, {
      opacity: 0,
      y: -20,
      duration: 1,
      delay: 2,
      ease: "power2.out"
    });
    
    gsap.to(scrollIndicator, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }
    
  return timeline;
};

// Enhanced project card animation
export const animateProjectCard = (card: HTMLElement) => {
  // Advanced 3D effect setup
  gsap.set(card, { 
    transformPerspective: 1000,
    transformStyle: "preserve-3d"
  });
  
  // Prepare shine effect for cards
  const shine = document.createElement('div');
  shine.className = 'absolute inset-0 pointer-events-none opacity-0';
  shine.style.background = 'linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)';
  shine.style.transition = 'opacity 0.3s ease';
  card.appendChild(shine);
  
  const image = card.querySelector(".project-image");
  const title = card.querySelector("h3") || card.querySelector(".project-title");
  const description = card.querySelector("p") || card.querySelector(".project-description");
  const buttons = card.querySelectorAll("button, a");
  
  // Mouse enter animation with 3D effect
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      y: -10,
      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
      duration: 0.3,
      ease: "power2.out",
    });
    
    // Show shine effect
    shine.style.opacity = '1';
    
    if (image) {
      gsap.to(image, {
        scale: 1.05,
        rotationZ: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    }
    
    if (title) {
      gsap.to(title, {
        y: -3,
        duration: 0.3,
        ease: "power2.out",
      });
    }
    
    if (description) {
      gsap.to(description, {
        y: -2,
        duration: 0.3,
        delay: 0.05,
        ease: "power2.out",
      });
    }
  });
  
  // Advanced 3D tilt effect on mouse move
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const offsetX = (x - centerX) / centerX;
    const offsetY = (y - centerY) / centerY;
    
    // Rotate and tilt based on mouse position
    gsap.to(card, {
      rotationY: offsetX * 7,
      rotationX: -offsetY * 7,
      duration: 0.3,
      ease: "power2.out",
    });
    
    // Move shine effect with mouse
    shine.style.transform = `translate(${offsetX * 50}px, ${offsetY * 50}px)`;
    
    // Parallax effect for elements inside card
    if (image) {
      gsap.to(image, {
        x: offsetX * 15,
        y: offsetY * 15,
        duration: 0.3,
        ease: "power2.out",
      });
    }
    
    if (title) {
      gsap.to(title, {
        x: offsetX * -7,
        y: offsetY * -5,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  });
  
  // Reset on mouse leave
  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      y: 0,
      rotationY: 0,
      rotationX: 0,
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      duration: 0.5,
      ease: "power2.out",
    });
    
    // Hide shine effect
    shine.style.opacity = '0';
    
    if (image) {
      gsap.to(image, {
        scale: 1,
        rotationZ: 0,
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
    
    if (title) {
      gsap.to(title, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
    
    if (description) {
      gsap.to(description, {
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  });
  
  // Add hover animations for buttons
  buttons.forEach(button => {
    button.addEventListener("mouseenter", () => {
      gsap.to(button, {
        y: -3,
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out",
      });
    });
    
    button.addEventListener("mouseleave", () => {
      gsap.to(button, {
        y: 0,
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    });
  });
};
