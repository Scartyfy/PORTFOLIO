
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface MotionTextProps {
  text: string;
  onComplete: () => void;
}

export const MotionText: React.FC<MotionTextProps> = ({ text, onComplete }) => {
  const words = text.split(' ');
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    words.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setCurrentIndex(i);
      }, i * 300)); // Faster rhythm
    });

    const completeTimer = setTimeout(() => {
      onComplete();
    }, words.length * 300 + 400);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(completeTimer);
    };
  }, [words.length, onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      className="fixed inset-0 z-[120] flex items-center justify-center pointer-events-none overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        {words.map((word, i) => {
          // Alternating directions: 0 -> Left, 1 -> Right, 2 -> Left
          const isFromLeft = i % 2 === 0;
          
          return (
            <div key={i} className="overflow-hidden py-2 w-full flex justify-center">
              <motion.span
                initial={{ 
                  x: isFromLeft ? '-100%' : '100%',
                  opacity: 0,
                  filter: 'blur(10px)'
                }}
                animate={{ 
                  x: currentIndex >= i ? 0 : (isFromLeft ? '-100%' : '100%'),
                  opacity: currentIndex >= i ? 1 : 0,
                  filter: currentIndex >= i ? 'blur(0px)' : 'blur(10px)'
                }}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.16, 1, 0.3, 1], // Smooth "out-expo" style
                  opacity: { duration: 0.8 }
                }}
                className="block font-display font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-none text-white"
              >
                {word}
              </motion.span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
