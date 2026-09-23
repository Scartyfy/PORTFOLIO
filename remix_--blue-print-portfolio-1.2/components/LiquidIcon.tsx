import React, { useRef, useEffect } from "react";
import {
  siBlender,
  siPython,
  siJavascript,
  siOpenjdk,
  siFigma,
  siThreedotjs,
  siReact
} from 'simple-icons';

// --- SOFTWARE ICONS DATA ---
export const SOFTWARE_ICONS = [
  {
    name: "Blender",
    viewBox: "0 0 24 24",
    path: <path d={siBlender.path} />,
  },
  {
    name: "Adobe Suite",
    viewBox: "0 0 24 24",
    path: (
      <path d="M12.919 12.378c-.287 0-1.666-.028-1.666-.028s-.016.143-.02.164a2.535 2.535 0 0 1 .425.86c.205.77.305 1.713.251 2.373-.08 1.002-.555 1.874-1.255 2.377-.704.502-1.636.577-2.457.266a2.915 2.915 0 0 1-1.688-1.74 3.738 3.738 0 0 1-.225-1.579c.075-.98.536-1.83 1.205-2.373.665-.544 1.545-.724 2.383-.496.48.132.89.376 1.196.657l.526-1.428a3.916 3.916 0 0 0-2.023-.538c-1.341 0-2.58.552-3.415 1.528-.84.97-1.265 2.274-1.18 3.655.086 1.38.685 2.658 1.636 3.541.95.882 2.27 1.272 3.615 1.144 1.35-.125 2.573-.787 3.394-1.83.826-1.045 1.196-2.41 1.05-3.81a5.861 5.861 0 0 0-1.752-4.742zm4.17 0c-.287 0-1.666-.028-1.666-.028s-.016.143-.02.164a2.536 2.536 0 0 1 .425.86c.204.77.305 1.713.25 2.373-.08 1.002-.554 1.874-1.255 2.377-.704.502-1.636.577-2.457.266a2.916 2.916 0 0 1-1.687-1.74 3.737 3.737 0 0 1-.226-1.579c.075-.98.537-1.83 1.205-2.373.666-.544 1.545-.724 2.383-.496.48.132.89.376 1.197.657l.525-1.428a3.916 3.916 0 0 0-2.022-.538c-1.342 0-2.582.552-3.416 1.528-.84.97-1.265 2.274-1.18 3.655.085 1.38.685 2.658 1.636 3.541.95.882 2.27 1.272 3.616 1.144 1.348-.125 2.573-.787 3.393-1.83.826-1.045 1.197-2.41 1.05-3.81a5.864 5.864 0 0 0-1.751-4.742zm5.402.772a8.682 8.682 0 0 0-1.006-2.486A8.75 8.75 0 0 0 17.514 6c-2.378-1.766-5.322-2.57-8.156-2.222-2.836.35-5.38 1.76-7.16 3.948A8.826 8.826 0 0 0 .546 12.392a8.91 8.91 0 0 0 .282 3.61c.42 1.306 1.107 2.476 1.986 3.42 1.76 1.895 4.225 3.01 6.88 3.235 2.656.223 5.302-.544 7.42-2.19 1.18-.918 2.148-2.09 2.824-3.407.675-1.314 1.046-2.735 1.102-4.175.056-1.442-.206-2.87-.788-4.185-.583-1.314-1.428-2.475-2.477-3.39.81.71 1.488 1.583 2 2.56a7.228 7.228 0 0 1 .947 3.486c.01 1.206-.296 2.4-.874 3.447a7.02 7.02 0 0 1-2.4 2.593 6.945 6.945 0 0 1-3.528.895 7.155 7.155 0 0 1-3.418-.958A6.974 6.974 0 0 1 8.878 19.3a7.1 7.1 0 0 1-.942-3.416c-.012-1.207.296-2.4.875-3.448a7.025 7.025 0 0 1 2.4-2.592 6.946 6.946 0 0 1 3.528-.896 7.152 7.152 0 0 1 3.418.957 6.98 6.98 0 0 1 2.42 2.138 7.086 7.086 0 0 1 1.916 1.107z"/>
    ),
  },
  {
    name: "Python",
    viewBox: "0 0 24 24",
    path: <path d={siPython.path} />,
  },
  {
    name: "JavaScript",
    viewBox: "0 0 24 24",
    path: <path d={siJavascript.path} />,
  },
  {
    name: "Java",
    viewBox: "0 0 24 24",
    path: (
      <path d="M15.421 16.488c-.642-.257-2.614-.856-2.614-.856-4.582-.556-9.164.6-9.164.6-.214 0-.171.129 0 .171.042.043 4.282.856 7.492 1.07 1.5.107 4.282.086 4.282.086v-1.071zm-9.336 2.441a18.2 18.2 0 005.18.599c1.927.043 4.41-.342 4.41-.342.342-.086.257-.171-.128-.214-2.826-.77-9.591-1.07-9.591-1.07s-.085.128.129.599v.428zm8.65-2.098s-3.725-.685-6.636-.599c-2.484.085-5.395.77-5.395.77-.385.129-.3.214-.043.257a16.897 16.897 0 004.839.813c3.511.086 7.236-.642 7.236-.642zM7.37 19.357s3.811.599 7.45.171c0 0 .172-.043.086-.257a34.398 34.398 0 01-7.151-.171c-1.327-.128-2.698-.385-2.698-.385-.214-.085-.3.043-.214.171a8.552 8.552 0 002.527.471zm5.994-3.768a3.102 3.102 0 00-.77.129c-.814.128-3.083.513-3.083.513-5.267.856-10.276.514-10.276.514-.214-.043-.385-.214-.171-.343a41.492 41.492 0 0110.19-2.098c2.955-.171 4.111.471 4.111.471zm10.533-3.211c0 1.285-.856 2.44-2.826 3.126-2.141.77-5.566.985-5.566.985s2.44-.086 4.367-.642c2.141-.599 3.126-1.67 3.126-2.698 0-1.156-1.113-2.098-2.526-2.783C22 7.245 22 6.817 22 6.817c1.327.942 1.895 2.072 1.895 3.339zm-3.382-7.15c0 1.156-2.527 2.055-6.294 2.526 1.456-1.156 1.627-2.655.471-3.64-1.327-1.156-4.667-.342-4.667-.342.3.043.342-.043.128-.214C7.039.294 10.89.594 12.602 1.835c1.456 1.07 1.285 3.254-.856 4.539 3.083-.342 5.395-1.199 5.395-2.227 0-.086-1.413-.642-1.413-.642.471.214.856.557.856.856zm-12.71 6.55l3.254-2.57s.085-.085-.128-.213-3.126-1.627-3.126-1.627-.129-.043-.171.128c0 0-.685 1.756-.3 2.912.385 1.156 1.541 2.226 2.654 2.526 0 0 .214.043-.3-.214-1.07-.642-1.884-1.944-1.884-1.944zM8.709 8.24c0 1.455.514 2.526 1.285 3.168.3.257 1.884 1.113 1.884 1.113-2.398-.257-4.11-1.327-4.667-2.911C6.611 8 7.382 6.402 7.382 6.402c.043-.086.257-.171.257-.171s-.428 1.07-.214 2.183z"/>
    ),
  },
  {
    name: "Figma",
    viewBox: "0 0 24 24",
    path: <path d={siFigma.path} />,
  },
  {
    name: "Three.js",
    viewBox: "0 0 24 24",
    path: <path d={siThreedotjs.path} />,
  },
  {
    name: "React",
    viewBox: "0 0 24 24",
    path: <path d={siReact.path} />,
  },
];

interface LiquidIconProps {
  icon: (typeof SOFTWARE_ICONS)[0];
  index: number;
  theme?: "dark" | "light"; // dark = for dark bg (white text), light = for white bg (black text)
}

export const LiquidIcon: React.FC<LiquidIconProps> = ({
  icon,
  index,
  theme = "dark",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Style Configuration based on Theme
  const isDark = theme === "dark";

  // Text Color
  const textColor = isDark ? "text-white/40" : "text-[#002FA7]";
  const hoverTextColor = isDark
    ? "group-hover:text-white"
    : "group-hover:text-[#002FA7]";

  // Icon Color (SVGs). Dark: Gray->White. Light: Solid Blue always. Remove border.
  const iconColor = isDark
    ? "text-white/50 group-hover:text-white"
    : "text-[#002FA7]";

  const glowColor = isDark ? "bg-white/5" : "bg-[#002FA7]/5";

  return (
    <div
      ref={containerRef}
      className="w-32 h-32 flex items-center justify-center relative group overflow-visible shrink-0"
    >
      <div
        ref={contentRef}
        className="flex flex-col items-center justify-center pointer-events-none w-full h-full"
      >
        <div
          className={`w-12 h-12 min-w-[3rem] min-h-[3rem] shrink-0 aspect-square ${iconColor} transition-colors duration-300 flex items-center justify-center p-2`}
        >
          {('img' in icon && icon.img) ? (
            <img
              src={icon.img as string}
              alt={icon.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          ) : (
            <svg
              viewBox={icon.viewBox}
              preserveAspectRatio="xMidYMid meet"
              className="w-full h-full fill-current shrink-0"
            >
              {icon.path}
            </svg>
          )}
        </div>
        <span
          className={`font-mono text-[10px] uppercase tracking-[0.3em] ${textColor} ${hoverTextColor} mt-4 transition-colors duration-300`}
        >
          {icon.name}
        </span>
      </div>
    </div>
  );
};
