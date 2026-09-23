import React, { useRef, useEffect, useState } from 'react';

const TRAIL_MAX_POINTS = 60;
const TRAIL_HEAD_R = 140;
const TRAIL_NOISE_AMP = 44;
const TRAIL_BLOB_PTS = 24;
const TRAIL_FADE_SPEED = 0.92;
const TRAIL_SAMPLE_DIST = 8;

interface Point {
  x: number;
  y: number;
  r: number;
  alpha: number;
  seed: number;
}

export const FlowerHoverEffect = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerBgRef = useRef<HTMLDivElement>(null);
  const layerTopRef = useRef<HTMLDivElement>(null);
  const sizerRef = useRef<HTMLImageElement>(null);

  const [hovering, setHovering] = useState(false);
  const isHoveringRef = useRef(false);
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Create virtual canvases
    const canvasBg = document.createElement('canvas');
    const ctxBg = canvasBg.getContext('2d', { willReadFrequently: true });
    const canvasTop = document.createElement('canvas');
    const ctxTop = canvasTop.getContext('2d', { willReadFrequently: true });
    
    if (!ctxBg || !ctxTop) return;

    let width = 0, height = 0;
    let headRadius = 0;
    let time = 0;
    let points: Point[] = [];
    let rafId: number;

    const resize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvasBg.width = width;
      canvasBg.height = height;
      canvasTop.width = width;
      canvasTop.height = height;
    };

    window.addEventListener('resize', resize);
    if (sizerRef.current) {
      if (sizerRef.current.complete) {
        resize();
      } else {
        sizerRef.current.onload = resize;
      }
    } else {
      resize();
    }
    
    // Fallbacks to ensure it resizes after images load or container settles
    setTimeout(resize, 100);
    setTimeout(resize, 500);
    setTimeout(resize, 1000);

    const drawMorphBlob = (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, t: number, seed: number) => {
      if (r < 2) return;
      ctx.beginPath();
      
      const pts = [];
      for(let i = 0; i < TRAIL_BLOB_PTS; i++) {
        const angle = (i / TRAIL_BLOB_PTS) * Math.PI * 2;
        const n1 = Math.sin(angle * 3 + t * 1.4 + seed) * 0.45;
        const n2 = Math.sin(angle * 5 - t * 0.9 + seed * 2.3) * 0.3;
        const n3 = Math.cos(angle * 2 + t * 1.8 + seed * 0.7) * 0.25;
        const noise = (n1 + n2 + n3) * TRAIL_NOISE_AMP * (r / TRAIL_HEAD_R);
        
        pts.push({
          x: cx + Math.cos(angle) * (r + noise),
          y: cy + Math.sin(angle) * (r + noise)
        });
      }

      ctx.moveTo((pts[0].x + pts[TRAIL_BLOB_PTS - 1].x) / 2, (pts[0].y + pts[TRAIL_BLOB_PTS - 1].y) / 2);
      for(let i = 0; i < TRAIL_BLOB_PTS; i++) {
        const p1 = pts[i];
        const p2 = pts[(i + 1) % TRAIL_BLOB_PTS];
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;
        ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
      }
      ctx.fill();
    };

    const animate = () => {
      const isHovering = isHoveringRef.current;
      const mouseX = mousePosRef.current.x;
      const mouseY = mousePosRef.current.y;

      const targetR = isHovering ? TRAIL_HEAD_R : 0;
      headRadius += (targetR - headRadius) * (isHovering ? 0.14 : 0.04);
      time += 0.016;

      if (isHovering && headRadius > 5) {
        const lastPoint = points[points.length - 1];
        const dist = lastPoint ? Math.hypot(mouseX - lastPoint.x, mouseY - lastPoint.y) : Infinity;
        if (dist > TRAIL_SAMPLE_DIST) {
          points.push({
            x: mouseX, 
            y: mouseY, 
            r: headRadius, 
            alpha: 1, 
            seed: Math.random() * 100
          });
          if (points.length > TRAIL_MAX_POINTS) points.shift();
        }
      }

      let active = false;

      ctxBg.clearRect(0, 0, width, height);
      ctxBg.fillStyle = 'white';
      ctxBg.fillRect(0, 0, width, height);
      ctxBg.globalCompositeOperation = 'destination-out';
      
      ctxTop.clearRect(0, 0, width, height);
      ctxTop.globalCompositeOperation = 'source-over';

      for (let i = points.length - 1; i >= 0; i--) {
        let p = points[i];
        
        ctxBg.fillStyle = `rgba(0, 0, 0, ${p.alpha})`;
        drawMorphBlob(ctxBg, p.x, p.y, p.r, time, p.seed);
        
        ctxTop.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        drawMorphBlob(ctxTop, p.x, p.y, p.r, time, p.seed);

        p.alpha *= TRAIL_FADE_SPEED;
        p.r *= 0.995;

        if (p.alpha < 0.01) {
          points.splice(i, 1);
        } else {
          active = true;
        }
      }

      if ((active || isHovering || headRadius > 1) && layerBgRef.current && layerTopRef.current && width > 0 && height > 0) {
        const bgData = canvasBg.toDataURL();
        const topData = canvasTop.toDataURL();
        layerBgRef.current.style.webkitMaskImage = `url(${bgData})`;
        layerBgRef.current.style.maskImage = `url(${bgData})`;
        layerTopRef.current.style.webkitMaskImage = `url(${topData})`;
        layerTopRef.current.style.maskImage = `url(${topData})`;
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div 
      className="relative cursor-crosshair max-w-full"
      style={{ height: '90vh' }}
      ref={containerRef}
      id="flower-container"
      onMouseEnter={() => {
        isHoveringRef.current = true;
        setHovering(true);
      }}
      onMouseLeave={() => {
        isHoveringRef.current = false;
        setHovering(false);
      }}
      onMouseMove={(e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mousePosRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }}
    >
      <img 
        className="h-full w-auto invisible" 
        src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260808_192942_e1086505-d7da-433b-a59b-8220f4e6c808.png&w=1280&q=85" 
        alt="" 
        aria-hidden="true" 
        ref={sizerRef}
        onLoad={() => {
          // Trigger a global resize event to ensure dimensions are updated
          window.dispatchEvent(new Event('resize'));
        }}
      />
      
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat'
        }}
        id="flower-bg"
        ref={layerBgRef}
      >
        <img 
          className="w-full h-full object-cover block"
          src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260808_192942_e1086505-d7da-433b-a59b-8220f4e6c808.png&w=1280&q=85" 
          alt="Pixel-art pink and violet lily" 
        />
      </div>
      
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          WebkitMaskImage: 'linear-gradient(#0000, #0000)',
          maskImage: 'linear-gradient(#0000, #0000)',
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat'
        }}
        id="flower-top" 
        ref={layerTopRef}
        aria-hidden="true"
      >
        <img 
          className="w-full h-full object-cover block"
          src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260808_151324_bf318a5f-5525-4fc7-aab5-e9a341018828.png&w=1280&q=85" 
          alt="" 
        />
      </div>
    </div>
  );
};
