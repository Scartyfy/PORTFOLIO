import React, { useEffect, useRef, useState } from 'react';

// Defined props interface to accept activeImage
interface CursorProps {
  activeImage?: string | null;
}

export const Cursor: React.FC<CursorProps> = ({ activeImage }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Robust check for interactivity:
      // 1. Check strict tag names (Buttons, Links, Inputs)
      // 2. Check for explicit roles or data attributes
      // 3. Check computed style for 'cursor: pointer' (catches almost everything else)
      
      const computedStyle = window.getComputedStyle(target);
      const isPointer = computedStyle.cursor === 'pointer';

      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'LABEL' ||
        target.closest('button') || 
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.getAttribute('data-hover') === 'true' ||
        target.closest('[data-hover="true"]') ||
        target.classList.contains('cursor-pointer') ||
        isPointer;

      setIsHovered(!!isInteractive);
    };

    // We use mouseover (bubbles) to detect entry into elements
    // We also listen to mouseout to potentially reset if moving to non-interactive,
    // though mouseover usually handles the transition between elements well enough.
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className={`custom-cursor ${isHovered ? 'hovered' : ''}`}
    />
  );
};