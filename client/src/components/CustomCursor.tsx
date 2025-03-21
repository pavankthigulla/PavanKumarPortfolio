import { useEffect, useState } from "react";

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isButton = target.tagName.toLowerCase() === "button" || 
                       target.tagName.toLowerCase() === "a" ||
                       !!target.closest("button") || 
                       !!target.closest("a");
      
      setIsHovering(isButton);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", updateCursorPosition);
    window.addEventListener("mousemove", updateHoverState);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      window.removeEventListener("mousemove", updateHoverState);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (typeof window === "undefined") return null;

  // Don't render on mobile/touch devices
  const isTouchDevice = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  if (isTouchDevice) return null;

  return (
    <>
      <div 
        className={`fixed pointer-events-none z-50 rounded-full mix-blend-difference transition-all duration-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px)`,
          left: -16,
          top: -16,
          width: isHovering ? '80px' : '32px',
          height: isHovering ? '80px' : '32px',
          backgroundColor: "white",
          transition: "width 0.3s, height 0.3s, background-color 0.3s",
        }}
      />
      <style dangerouslySetInnerHTML={{
        __html: `
          body {
            cursor: none;
          }
          a, button, [role="button"], .clickable {
            cursor: none;
          }
          @media (pointer: coarse) {
            body, a, button, [role="button"], .clickable {
              cursor: auto;
            }
          }
        `
      }} />
    </>
  );
};