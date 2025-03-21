import confetti from 'canvas-confetti';

// Custom confetti configuration for a beautiful, celebratory effect
export function fireConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 1500
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  // Fire multiple bursts of confetti with different colors and angles for a spectacular effect
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#00bcd4', '#2196f3', '#3f51b5', '#9c27b0', '#f44336']
  });
  
  fire(0.2, {
    spread: 60,
    colors: ['#00e5ff', '#2979ff', '#651fff', '#d500f9', '#ff1744'],
    startVelocity: 45,
    decay: 0.91,
    scalar: 0.8
  });
  
  fire(0.35, {
    spread: 100,
    decay: 0.92,
    colors: ['#76ff03', '#ffea00', '#ff9100', '#ff3d00', '#00e676'],
    scalar: 0.8
  });
  
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    colors: ['#18ffff', '#69f0ae', '#ffff00', '#ffd740', '#ff6e40'],
    scalar: 1.2
  });
  
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#4fc3f7', '#29b6f6', '#03a9f4', '#039be5', '#0288d1'],
  });
}