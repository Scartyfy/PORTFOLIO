import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Folder, MousePointer2 } from 'lucide-react';

interface PhotoshopTransitionProps {
  text: string;
  onComplete: () => void;
  onStartSlide?: () => void;
}

export const PhotoshopTransition: React.FC<PhotoshopTransitionProps> = ({ text, onComplete, onStartSlide }) => {
  const [step, setStep] = useState<'IDLE' | 'SELECTING' | 'DRAGGING' | 'CENTERED' | 'SLIDING_LEFT'>('IDLE');

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep('SELECTING'), 50),
      setTimeout(() => setStep('DRAGGING'), 1500),
      setTimeout(() => setStep('CENTERED'), 2500),
      setTimeout(() => {
        setStep('SLIDING_LEFT');
        if (onStartSlide) onStartSlide();
      }, 3200),
      setTimeout(() => onComplete(), 4600), // Completes when sliding left finishes
    ];

    return () => timers.forEach(t => clearTimeout(t));
  }, []); // Empty dependency array to run only once

  const words = text.split(' ');

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[150] flex items-center justify-center overflow-hidden pointer-events-auto" 
      style={{ perspective: '1200px' }}
    >
      <svg className="absolute invisible w-0 h-0">
        <defs>
          <filter id="liquid" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="liquid" />
            <feSpecularLighting in="liquid" surfaceScale="3" specularConstant="0.75" specularExponent="40" lightingColor="#ffffff" result="specOut">
              <fePointLight x="-50" y="-100" z="200" />
            </feSpecularLighting>
            <feComposite in="specOut" in2="liquid" operator="in" result="specOut" />
            <feComposite in="liquid" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litLiquid" />
            <feComposite in="litLiquid" in2="SourceGraphic" operator="over" />
          </filter>
        </defs>
      </svg>

      <motion.div 
        animate={{ 
          opacity: step === 'DRAGGING' || step === 'CENTERED' || step === 'SLIDING_LEFT' ? 0 : 1,
          scale: step === 'DRAGGING' || step === 'CENTERED' || step === 'SLIDING_LEFT' ? 0.2 : 1,
          y: step === 'DRAGGING' || step === 'CENTERED' || step === 'SLIDING_LEFT' ? 300 : 0,
          filter: step === 'DRAGGING' || step === 'CENTERED' || step === 'SLIDING_LEFT' ? 'blur(20px)' : 'blur(0px)'
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center justify-center w-full pointer-events-none"
      >
        <div className="relative flex flex-col items-center justify-center gap-4">
          {words.map((word, i) => (
            <div key={i} className="overflow-hidden py-2 w-full flex justify-center">
              <span className="block font-display font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-none text-white">
                {word}
              </span>
            </div>
          ))}

          <AnimatePresence>
            {step === 'SELECTING' && (
              <motion.div 
                initial={{ width: 0, height: 0, top: 0, left: 0 }}
                animate={{ width: '100%', height: '100%' }}
                transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
                className="absolute border-2 border-dashed border-white/50 z-10 pointer-events-none origin-top-left"
                style={{ 
                  backgroundImage: `linear-gradient(to right, white 50%, transparent 50%), linear-gradient(to right, white 50%, transparent 50%), linear-gradient(to bottom, white 50%, transparent 50%), linear-gradient(to bottom, white 50%, transparent 50%)`,
                  backgroundSize: '10px 2px, 10px 2px, 2px 10px, 2px 10px',
                  backgroundPosition: '0 0, 0 100%, 0 0, 100% 0',
                  backgroundRepeat: 'repeat-x, repeat-x, repeat-y, repeat-y',
                  animation: 'marching-ants 0.5s infinite linear'
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        initial={{ x: '-30vw', y: '-20vh', opacity: 0, filter: 'blur(0px)', scale: 0.8 }}
        animate={{ 
          x: step === 'IDLE' ? '-30vw' : step === 'SELECTING' ? '30vw' : 0,
          y: step === 'IDLE' ? '-20vh' : step === 'SELECTING' ? '20vh' : step === 'DRAGGING' ? 300 : 0,
          opacity: step === 'IDLE' ? 0 : (step === 'CENTERED' || step === 'SLIDING_LEFT' ? 0 : 1),
          filter: step === 'SELECTING' || step === 'DRAGGING' ? ['blur(0px)', 'blur(6px)', 'blur(0px)'] : 'blur(0px)',
          scale: step === 'IDLE' ? 0.8 : 1
        }}
        transition={{ 
          duration: step === 'SELECTING' ? 1.2 : 0.8, 
          ease: step === 'SELECTING' ? [0.65, 0, 0.35, 1] : [0.16, 1, 0.3, 1],
          opacity: { duration: 0.4 }
        }}
        className="fixed z-[180] pointer-events-none flex items-center justify-center"
        style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <div className="relative">
            <MousePointer2 size={28} fill="white" fillOpacity={0.9} stroke="rgba(0,0,0,0.8)" strokeWidth={1.5} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
        </div>
      </motion.div>

      <AnimatePresence>
        {(step === 'DRAGGING' || step === 'CENTERED' || step === 'SLIDING_LEFT') && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 300, filter: 'blur(10px)', rotateX: 0 }}
            animate={{ 
              opacity: step === 'SLIDING_LEFT' ? 0.2 : 1, 
              scale: step === 'SLIDING_LEFT' ? 0.8 : 1, 
              y: step === 'DRAGGING' ? 300 : (step === 'SLIDING_LEFT' ? -1200 : 0),
              x: 0,
              rotateX: 0,
              filter: step === 'DRAGGING' ? ['blur(0px)', 'blur(8px)', 'blur(0px)'] : 'blur(0px)',
            }}
            transition={{
              duration: step === 'SLIDING_LEFT' ? 1.5 : 0.6,
              ease: step === 'SLIDING_LEFT' ? [0.4, 0, 0.2, 1] : [0.16, 1, 0.3, 1]
            }}
            className="fixed z-[170] flex flex-col items-center gap-4 pointer-events-none"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div className="relative">
              <Folder size={120} className="text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.25)]" fill="white" fillOpacity={1} stroke="white" strokeWidth={0.5} style={{ filter: 'url(#liquid)' }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marching-ants {
          0% { background-position: 0 0, 0 100%, 0 0, 100% 0; }
          100% { background-position: 10px 0, -10px 100%, 0 -10px, 100% 10px; }
        }
      `}} />
    </motion.div>
  );
};

