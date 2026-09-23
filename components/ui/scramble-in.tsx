import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:',.<>/?";

export interface ScrambleInHandle {
  start: () => void;
}

interface ScrambleInProps {
  text: string;
  scrambleSpeed?: number;
  scrambledLetterCount?: number;
  autoStart?: boolean;
  className?: string;
  onScrambleComplete?: () => void;
}

export const ScrambleIn = forwardRef<ScrambleInHandle, ScrambleInProps>(
  ({ text, scrambleSpeed = 25, scrambledLetterCount = 5, autoStart = true, className = "", onScrambleComplete }, ref) => {
    const [displayText, setDisplayText] = useState("");
    const [isScrambling, setIsScrambling] = useState(autoStart);
    const iterationRef = useRef(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useImperativeHandle(ref, () => ({
      start: () => {
        setIsScrambling(true);
        iterationRef.current = 0;
      }
    }));

    useEffect(() => {
      if (!isScrambling) return;

      clearInterval(intervalRef.current!);

      // Calculate a step size so that the animation finishes in a reasonable time (e.g., max ~ 1.5s for long text)
      // 1.5s / 25ms = 60 steps. text.length / 60
      const stepSize = Math.max(1, text.length / 60);
      const dynamicScrambledCount = Math.max(scrambledLetterCount, Math.floor(text.length / 6));

      intervalRef.current = setInterval(() => {
        let currentText = text.split("")
          .map((char, index) => {
            if (index < iterationRef.current) {
              return text[index];
            }
            if (index >= iterationRef.current && index < iterationRef.current + dynamicScrambledCount) {
              return char === " " ? " " : CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            }
            return "";
          })
          .join("");

        setDisplayText(currentText);

        if (iterationRef.current >= text.length) {
          clearInterval(intervalRef.current!);
          setDisplayText(text);
          setIsScrambling(false);
          onScrambleComplete?.();
        }

        iterationRef.current += stepSize;
      }, scrambleSpeed);

      return () => clearInterval(intervalRef.current!);
    }, [text, scrambleSpeed, scrambledLetterCount, isScrambling, onScrambleComplete]);

    return <span className={className}>{displayText}</span>;
  }
);
ScrambleIn.displayName = "ScrambleIn";

export default ScrambleIn;
