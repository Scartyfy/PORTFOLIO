import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

// Utilitaire de conversion couleur Hex vers RGB normalisé (0.0 à 1.0)
const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result 
    ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]
    : [1, 1, 1];
};

const vertex = `#version 300 es
precision highp float;
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uOpacity;
uniform vec2 uMouse;
out vec4 fragColor;

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * iResolution.xy) / uScale;
  
  // Interaction souris simplifiée
  p += (uMouse / iResolution.xy - 0.5) * 50.0;

  float t = iTime * uSpeed;
  vec3 color = vec3(0.0);

  // Algorithme de plasma mathématique pur
  for(float i = 1.0; i < 5.0; i++) {
    p.x += 0.3 / i * sin(i * 3.0 * p.y + t + i * 0.5);
    p.y += 0.3 / i * cos(i * 3.0 * p.x + t + i * 0.5);
  }

  color = uColor * (0.5 + 0.5 * sin(p.x + p.y + t));
  
  fragColor = vec4(color, uOpacity);
}
`;

interface PlasmaProps {
  color?: string;
  speed?: number;
  scale?: number;
  opacity?: number;
  mouseInteractive?: boolean;
}

export const Plasma: React.FC<PlasmaProps> = ({
  color = '#ff6b35',
  speed = 0.6,
  scale = 1.0,
  opacity = 0.8,
  mouseInteractive = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const rgbColor = hexToRgb(color);
    const renderer = new Renderer({ webgl: 2, alpha: true, antialias: true });
    const gl = renderer.gl;
    const canvas = gl.canvas;
    
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    containerRef.current.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uColor: { value: new Float32Array(rgbColor) },
        uSpeed: { value: speed },
        uScale: { value: scale * 100.0 }, // Ajustement échelle
        uOpacity: { value: opacity },
        uMouse: { value: new Float32Array([0, 0]) }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseInteractive || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      program.uniforms.uMouse.value[0] = e.clientX - rect.left;
      program.uniforms.uMouse.value[1] = rect.height - (e.clientY - rect.top);
    };

    const resize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);
      program.uniforms.iResolution.value[0] = gl.drawingBufferWidth;
      program.uniforms.iResolution.value[1] = gl.drawingBufferHeight;
    };

    window.addEventListener('resize', resize);
    if (mouseInteractive) window.addEventListener('mousemove', handleMouseMove);
    resize();

    let raf: number;
    const update = (t: number) => {
      program.uniforms.iTime.value = t * 0.001;
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (canvas.parentNode && containerRef.current) containerRef.current.removeChild(canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [color, speed, scale, opacity, mouseInteractive]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />;
};

export default Plasma;
