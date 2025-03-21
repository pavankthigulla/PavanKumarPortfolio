import { gsap } from 'gsap';

// Cool success animation effect
export function fireConfetti() {
  // Create a full-screen overlay for the animation effect
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.right = '0';
  overlay.style.bottom = '0';
  overlay.style.backgroundColor = 'transparent';
  overlay.style.pointerEvents = 'none';
  overlay.style.zIndex = '9999';
  overlay.style.overflow = 'hidden';
  document.body.appendChild(overlay);

  // Create glowing particles
  const particleCount = 15;
  const particles = [];
  
  const colors = [
    '#00e5ff', // cyan
    '#2979ff', // blue
    '#651fff', // indigo
    '#00bcd4', // teal
    '#4fc3f7', // light blue
  ];

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = `${Math.random() * 15 + 5}px`;
    particle.style.height = particle.style.width;
    particle.style.borderRadius = '50%';
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.boxShadow = `0 0 10px 2px ${particle.style.backgroundColor}`;
    particle.style.opacity = '0';
    
    overlay.appendChild(particle);
    particles.push(particle);
    
    // Random starting positions around screen center
    const startX = window.innerWidth / 2 + (Math.random() - 0.5) * 100;
    const startY = window.innerHeight / 2 + (Math.random() - 0.5) * 100;
    
    // Random end positions spread out
    const endX = Math.random() * window.innerWidth;
    const endY = Math.random() * window.innerHeight;
    
    // Animate particles
    gsap.set(particle, { 
      x: startX, 
      y: startY,
      scale: 0,
      opacity: 0
    });
    
    // First animation - burst from center
    gsap.to(particle, {
      duration: 0.8 + Math.random() * 0.5,
      x: startX + (Math.random() - 0.5) * 200,
      y: startY + (Math.random() - 0.5) * 200,
      scale: Math.random() * 1.5 + 0.5,
      opacity: 1,
      ease: "power2.out",
      delay: Math.random() * 0.3,
      onComplete: () => {
        // Second animation - float around
        gsap.to(particle, {
          duration: 1 + Math.random() * 1,
          x: endX,
          y: endY,
          scale: 0,
          opacity: 0,
          ease: "power1.inOut",
          onComplete: () => {
            if (particle.parentNode) {
              particle.parentNode.removeChild(particle);
            }
          }
        });
      }
    });
  }
  
  // Create a pulse wave effect
  const pulse = document.createElement('div');
  pulse.style.position = 'absolute';
  pulse.style.top = '50%';
  pulse.style.left = '50%';
  pulse.style.transform = 'translate(-50%, -50%)';
  pulse.style.width = '50px';
  pulse.style.height = '50px';
  pulse.style.borderRadius = '50%';
  pulse.style.boxShadow = '0 0 0 0 rgba(0, 229, 255, 0.7)';
  pulse.style.backgroundColor = 'rgba(0, 229, 255, 0.3)';
  overlay.appendChild(pulse);
  
  // Animate the pulse
  gsap.to(pulse, {
    duration: 1.5,
    width: '300px',
    height: '300px',
    opacity: 0,
    boxShadow: '0 0 0 100px rgba(0, 229, 255, 0)',
    ease: "power2.out",
    onComplete: () => {
      // Remove overlay after animations complete
      setTimeout(() => {
        if (overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      }, 1500);
    }
  });
}