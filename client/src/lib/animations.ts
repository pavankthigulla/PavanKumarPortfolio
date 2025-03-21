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
  
  // Initialize scroll progress indicator and section dots
  const initScrollGraphics = () => {
    // Create container for scroll graphics
    const scrollGraphicsContainer = document.createElement('div');
    scrollGraphicsContainer.className = 'scroll-graphics-container';
    document.body.appendChild(scrollGraphicsContainer);

    // Create section dots container
    const sectionDotsContainer = document.createElement('div');
    sectionDotsContainer.className = 'section-dots';
    document.body.appendChild(sectionDotsContainer);

    // Get all sections
    const sections = document.querySelectorAll('section');

    // Create a dot for each section
    sections.forEach((section, index) => {
      // Add section glow
      const sectionGlow = document.createElement('div');
      sectionGlow.className = 'section-glow';
      section.appendChild(sectionGlow);

      // Create dot
      const dot = document.createElement('div');
      dot.className = 'section-dot';
      dot.setAttribute('data-index', index.toString());
      sectionDotsContainer.appendChild(dot);
      
      // Add click event to dot
      dot.addEventListener('click', () => {
        section.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Highlight active dot and show scroll indicator on scroll
    const handleScroll = () => {
      // Add scrolled class to body when scrolled
      if (window.scrollY > 50) {
        document.body.classList.add('scrolled');
      } else {
        document.body.classList.remove('scrolled');
      }

      // Find active section
      let activeIndex = 0;
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          activeIndex = index;
        }
      });

      // Highlight active dot
      document.querySelectorAll('.section-dot').forEach((dot, index) => {
        if (index === activeIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };

    // Initial setup
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (document.body.contains(scrollGraphicsContainer)) {
        document.body.removeChild(scrollGraphicsContainer);
      }
      if (document.body.contains(sectionDotsContainer)) {
        document.body.removeChild(sectionDotsContainer);
      }
    };
  };
  
  // Initialize scroll animations
  animateOnScroll();
  
  // Listen for scroll events
  window.addEventListener("scroll", animateOnScroll);
  
  // Initialize scroll graphics
  const cleanupScrollGraphics = initScrollGraphics();
  
  return () => {
    window.removeEventListener("scroll", animateOnScroll);
    cleanupScrollGraphics();
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
