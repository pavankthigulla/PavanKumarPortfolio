import { useEffect, useState } from "react";

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      if (!isVisible) {
        setIsVisible(true);
      }
    };
    
    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable = target.closest('.hover-target') !== null || 
                          target.tagName.toLowerCase() === 'a' || 
                          target.tagName.toLowerCase() === 'button';
      
      setIsHovering(isHoverable);
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mousemove', updateHoverState);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mousemove', updateHoverState);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);
  
  // Hide on mobile devices
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      setIsVisible(false);
    }
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <>
      <div 
        className="cursor"
        style={{
          width: isHovering ? '50px' : '20px',
          height: isHovering ? '50px' : '20px',
          border: `2px solid #0ee7b7`,
          borderRadius: '50%',
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          transition: 'width 0.2s, height 0.2s, transform 0.2s',
          transform: isHovering ? 'translate(-50%, -50%) scale(1.5)' : 'translate(-50%, -50%) scale(1)',
          left: position.x,
          top: position.y,
          backgroundColor: isHovering ? 'rgba(14, 231, 183, 0.1)' : 'transparent'
        }}
      />
      <div 
        className="cursor-follower"
        style={{
          width: '8px',
          height: '8px',
          backgroundColor: '#0ee7b7',
          borderRadius: '50%',
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.1s, top 0.1s'
        }}
      />
    </>
  );
};
