import { Language } from '../types';
import img1 from './assets/1.png';
import img2 from './assets/2.png';
import img3 from './assets/3.png';
import img4 from './assets/4.png';
import img5 from './assets/5.png';

export interface ConceptCarData {
  id: string;
  code: string;
  name: string;
  tagline: { fr: string; en: string };
  category: { fr: string; en: string };
  year: string;
  specs: {
    cx: string;
    powertrain: { fr: string; en: string };
    chassis: { fr: string; en: string };
    weight: string;
  };
  poster: {
    image: string;
    title: { fr: string; en: string };
    description: { fr: string; en: string };
  };
  sketch: {
    image: string;
    title: { fr: string; en: string };
    caption: { fr: string; en: string };
    text: { fr: string; en: string };
    bullets: { fr: string[]; en: string[] };
  };
  photos: Array<{
    id: string;
    image: string;
    title: { fr: string; en: string };
    caption: { fr: string; en: string };
  }>;
}

// Built-in high fidelity vector visuals for Concept 02
export const CONCEPT_2_VISUALS = {
  poster: `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050608"/>
      <stop offset="50%" stop-color="#0b0e14"/>
      <stop offset="100%" stop-color="#040507"/>
    </linearGradient>
    <linearGradient id="carBody" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#151922"/>
      <stop offset="30%" stop-color="#283244"/>
      <stop offset="55%" stop-color="#4f6285"/>
      <stop offset="70%" stop-color="#1d2432"/>
      <stop offset="100%" stop-color="#0d1118"/>
    </linearGradient>
    <linearGradient id="accentGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00f2fe" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#4facfe" stop-opacity="0.2"/>
    </linearGradient>
    <linearGradient id="aeroFlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0"/>
      <stop offset="50%" stop-color="#38bdf8" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#818cf8" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="floorReflection" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.12"/>
      <stop offset="70%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1600" height="1000" fill="url(#bg)"/>

  <!-- Studio Blueprint Subtle Grid -->
  <g stroke="#ffffff" stroke-width="1" stroke-opacity="0.03">
    <line x1="0" y1="200" x2="1600" y2="200"/>
    <line x1="0" y1="400" x2="1600" y2="400"/>
    <line x1="0" y1="600" x2="1600" y2="600"/>
    <line x1="0" y1="800" x2="1600" y2="800"/>
    <line x1="200" y1="0" x2="200" y2="1000"/>
    <line x1="400" y1="0" x2="400" y2="1000"/>
    <line x1="600" y1="0" x2="600" y2="1000"/>
    <line x1="800" y1="0" x2="800" y2="1000"/>
    <line x1="1000" y1="0" x2="1000" y2="1000"/>
    <line x1="1200" y1="0" x2="1200" y2="1000"/>
    <line x1="1400" y1="0" x2="1400" y2="1000"/>
  </g>

  <!-- Floor Glow & Ground Reflection -->
  <ellipse cx="800" cy="730" rx="650" ry="120" fill="url(#floorReflection)"/>
  <line x1="150" y1="740" x2="1450" y2="740" stroke="#38bdf8" stroke-opacity="0.15" stroke-width="1.5"/>

  <!-- Aerodynamic Streamlines (CFD Vectors) -->
  <path d="M 120 540 Q 400 480 750 490 T 1480 430" fill="none" stroke="url(#aeroFlow)" stroke-width="3" filter="url(#glow)"/>
  <path d="M 100 590 Q 420 560 820 550 T 1500 520" fill="none" stroke="url(#aeroFlow)" stroke-width="2"/>
  <path d="M 160 660 Q 460 650 900 640 T 1460 610" fill="none" stroke="url(#aeroFlow)" stroke-width="2.5" stroke-dasharray="12 8"/>

  <!-- Car Silhouette: Sculptural Low Profile Hypercar -->
  <!-- Shadow Under Body -->
  <path d="M 280 740 Q 800 750 1320 740 L 1260 720 Q 800 725 340 720 Z" fill="#000000" opacity="0.9"/>

  <!-- Rear Wheel Assembly -->
  <g transform="translate(1120, 680)">
    <circle cx="0" cy="0" r="72" fill="#08090c" stroke="#2a3547" stroke-width="4"/>
    <circle cx="0" cy="0" r="54" fill="#0d1117" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="6 6"/>
    <circle cx="0" cy="0" r="22" fill="#151b24" stroke="#ffffff" stroke-opacity="0.3"/>
  </g>

  <!-- Front Wheel Assembly -->
  <g transform="translate(480, 680)">
    <circle cx="0" cy="0" r="72" fill="#08090c" stroke="#2a3547" stroke-width="4"/>
    <circle cx="0" cy="0" r="54" fill="#0d1117" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="6 6"/>
    <circle cx="0" cy="0" r="22" fill="#151b24" stroke="#ffffff" stroke-opacity="0.3"/>
  </g>

  <!-- Main Body Shell -->
  <path d="M 250 690 
           C 280 670, 320 640, 380 640 
           C 420 640, 440 600, 480 600 
           C 540 600, 560 635, 600 635 
           L 700 630 
           C 740 540, 800 480, 910 475 
           C 1020 470, 1080 520, 1140 625 
           C 1170 610, 1210 595, 1260 600 
           C 1310 605, 1340 640, 1370 660 
           L 1360 695 
           C 1320 705, 1260 710, 1200 705 
           C 1160 640, 1080 640, 1040 705 
           L 560 705 
           C 520 640, 440 640, 400 705 
           L 270 705 Z" 
        fill="url(#carBody)" stroke="#4facfe" stroke-width="1.5" stroke-opacity="0.4"/>

  <!-- Cockpit Greenhouse (Glass Canopy) -->
  <path d="M 720 620 
           C 760 550, 820 500, 910 495 
           C 1000 490, 1045 540, 1090 620 
           C 970 610, 840 610, 720 620 Z" 
        fill="#070a0f" stroke="#38bdf8" stroke-width="2" stroke-opacity="0.7"/>

  <!-- Active Aero Winglet at Rear -->
  <path d="M 1260 590 L 1350 560 L 1380 565 L 1290 600 Z" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>

  <!-- Sharp LED Laser Signature Headlight -->
  <path d="M 270 670 Q 340 655 410 655" fill="none" stroke="#ffffff" stroke-width="4" filter="url(#glow)"/>
  <path d="M 270 670 Q 340 655 410 655" fill="none" stroke="#38bdf8" stroke-width="8" opacity="0.6" filter="url(#glow)"/>

  <!-- Rear OLED Horizontal Blade Light -->
  <path d="M 1270 610 Q 1340 630 1370 655" fill="none" stroke="#f43f5e" stroke-width="3.5" filter="url(#glow)"/>

  <!-- Lateral Tension & Intake Sculpting -->
  <path d="M 640 645 C 720 660, 860 665, 960 635 C 900 680, 780 690, 680 680 Z" fill="#0b0e14" opacity="0.8"/>
  <path d="M 620 640 L 980 635" stroke="#ffffff" stroke-width="1" stroke-opacity="0.2"/>

  <!-- Poster Typography / Haute Horlogerie & Automotive Design Layout -->
  <text x="120" y="140" fill="#38bdf8" font-family="'Space Grotesk', -apple-system, sans-serif" font-size="14" font-weight="700" letter-spacing="8">CONCEPT CAR 02 // MANIFESTO</text>
  <text x="120" y="210" fill="#ffffff" font-family="'Space Grotesk', -apple-system, sans-serif" font-size="64" font-weight="800" letter-spacing="2">VORTEX STRATOS</text>
  <text x="120" y="250" fill="#94a3b8" font-family="'Space Grotesk', -apple-system, sans-serif" font-size="18" font-weight="400" letter-spacing="4">RADICAL ELECTRIC HYPERCAR PROTOTYPE</text>

  <!-- Technical Spec Watermark / Tabular Data -->
  <g transform="translate(120, 880)" fill="#64748b" font-family="ui-monospace, monospace" font-size="12" letter-spacing="3">
    <text x="0" y="0">DRAG COEFF : <tspan fill="#ffffff">0.18 CX</tspan></text>
    <text x="260" y="0">DOWNFORCE : <tspan fill="#ffffff">1 100 KG @ 280 KM/H</tspan></text>
    <text x="640" y="0">MONOCOQUE : <tspan fill="#ffffff">PRE-PREG CARBON &amp; TITANIUM</tspan></text>
    <text x="1100" y="0">CHASSIS CODE : <tspan fill="#38bdf8">VX-2026-X1</tspan></text>
  </g>
</svg>
`)}`,

  sketch: `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
  <defs>
    <linearGradient id="paperBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#121316"/>
      <stop offset="100%" stop-color="#0a0b0d"/>
    </linearGradient>
    <filter id="paperNoise">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise"/>
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.05 0"/>
      <feComposite in2="SourceGraphic" in="gl" operator="in"/>
    </filter>
  </defs>

  <!-- Dark Designer Textured Board -->
  <rect width="1200" height="900" fill="url(#paperBg)"/>

  <!-- Construction Construction Perspective Grid -->
  <g stroke="#ffffff" stroke-width="0.75" stroke-opacity="0.08">
    <!-- Horizon Line -->
    <line x1="50" y1="450" x2="1150" y2="450"/>
    <!-- Vanishing Point Rays Left -->
    <line x1="100" y1="450" x2="600" y2="150"/>
    <line x1="100" y1="450" x2="800" y2="250"/>
    <line x1="100" y1="450" x2="1100" y2="400"/>
    <line x1="100" y1="450" x2="1100" y2="600"/>
    <line x1="100" y1="450" x2="900" y2="780"/>
    <!-- Vanishing Point Rays Right -->
    <line x1="1100" y1="450" x2="100" y2="250"/>
    <line x1="1100" y1="450" x2="300" y2="650"/>
    <line x1="1100" y1="450" x2="200" y2="780"/>
    <!-- Wheel Base Ellipses Guide -->
    <ellipse cx="380" cy="580" rx="90" ry="110" fill="none" stroke-dasharray="4 4"/>
    <ellipse cx="860" cy="560" rx="100" ry="120" fill="none" stroke-dasharray="4 4"/>
  </g>

  <!-- Dynamic Marker Shading Passes (Grey-Blue Copic Marker Aesthetic) -->
  <path d="M 240 560 Q 550 490 980 500 L 960 620 Q 560 610 260 630 Z" fill="#1e293b" opacity="0.4"/>
  <path d="M 420 440 Q 640 370 820 420 L 780 480 Q 600 460 440 480 Z" fill="#0f172a" opacity="0.6"/>

  <!-- Rapid Ideation Pencil & Ink Lines (Multiple Passes for Authentic Hand Sketch) -->
  <!-- Pass 1: Loose Construction Lines (Cyan Blue Pencil) -->
  <g stroke="#38bdf8" stroke-width="1.2" stroke-opacity="0.5" fill="none">
    <path d="M 180 620 C 260 580, 360 480, 520 420 C 680 360, 840 380, 960 460 C 1020 500, 1080 580, 1060 620"/>
    <path d="M 160 640 L 280 620 C 340 530, 440 530, 480 620 L 760 610 C 800 500, 920 500, 960 600 L 1080 610"/>
    <path d="M 520 420 C 600 340, 720 340, 800 420"/>
  </g>

  <!-- Pass 2: Heavy Confident Graphite & Ink Stroke (Styling Character Lines) -->
  <g stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <!-- Hood to Roof Arc -->
    <path d="M 210 600 C 300 560, 400 460, 540 410 C 660 370, 760 380, 860 440 C 940 490, 1020 560, 1040 600"/>
    <!-- Shoulder Line -->
    <path d="M 190 620 C 280 590, 380 580, 500 560 C 660 540, 800 530, 940 540 C 1000 545, 1060 570, 1050 610"/>
    <!-- Rocker Panel & Diffuser -->
    <path d="M 440 625 L 780 615 C 820 615, 840 635, 870 635 L 1020 625"/>
    <!-- Greenhouse / Canopy -->
    <path d="M 520 420 C 600 370, 700 370, 780 430 C 720 435, 620 435, 520 420 Z" stroke-width="2" fill="#05070a" fill-opacity="0.7"/>
  </g>

  <!-- Pass 3: Bold Expressive Highlights & Marker White Gouache -->
  <path d="M 280 575 C 380 520, 500 430, 640 400 C 720 385, 780 395, 840 430" fill="none" stroke="#ffffff" stroke-width="4" stroke-opacity="0.85"/>
  <path d="M 330 605 C 420 580, 600 560, 780 545" fill="none" stroke="#38bdf8" stroke-width="2.5"/>

  <!-- Wheels Sketch -->
  <g transform="translate(380, 590)">
    <circle cx="0" cy="0" r="75" stroke="#ffffff" stroke-width="2.5" fill="#08090d"/>
    <circle cx="0" cy="0" r="58" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="8 6" fill="none"/>
    <line x1="-50" y1="0" x2="50" y2="0" stroke="#ffffff" stroke-width="2"/>
    <line x1="0" y1="-50" x2="0" y2="50" stroke="#ffffff" stroke-width="2"/>
  </g>
  <g transform="translate(880, 570)">
    <circle cx="0" cy="0" r="82" stroke="#ffffff" stroke-width="2.5" fill="#08090d"/>
    <circle cx="0" cy="0" r="64" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="8 6" fill="none"/>
    <line x1="-55" y1="0" x2="55" y2="0" stroke="#ffffff" stroke-width="2"/>
    <line x1="0" y1="-55" x2="0" y2="55" stroke="#ffffff" stroke-width="2"/>
  </g>

  <!-- Designer Hand Annotations & Dimension Arrows -->
  <g stroke="#38bdf8" stroke-width="1.2" fill="none" font-family="'Space Grotesk', ui-monospace, sans-serif" font-size="12">
    <!-- Air Intake Vector -->
    <path d="M 680 530 L 730 490 M 730 490 L 715 490 M 730 490 L 730 505"/>
    <text x="740" y="490" fill="#38bdf8" stroke="none" letter-spacing="1">VENTURI DUCT -22% DRAG</text>

    <!-- Rear Downforce Vector -->
    <path d="M 980 430 L 980 370 M 980 370 L 970 380 M 980 370 L 990 380"/>
    <text x="940" y="355" fill="#ffffff" stroke="none" letter-spacing="1">ACTIVE WINGLET DEPLOYMENT</text>

    <!-- Front Splitter Stance -->
    <path d="M 210 635 L 140 670 M 140 670 L 155 670"/>
    <text x="40" y="690" fill="#94a3b8" stroke="none" letter-spacing="1">GROUND CLEARANCE : 85mm</text>
  </g>

  <!-- Title Block (Automotive Studio Signature) -->
  <g transform="translate(80, 80)">
    <text x="0" y="0" fill="#38bdf8" font-family="ui-monospace, monospace" font-size="11" letter-spacing="4">STUDIO SKETCHBOOK // SHEET 04-B</text>
    <text x="0" y="24" fill="#ffffff" font-family="'Space Grotesk', sans-serif" font-size="20" font-weight="700" letter-spacing="2">IDEATION &amp; TENSION LINES</text>
    <text x="0" y="44" fill="#64748b" font-family="'Space Grotesk', sans-serif" font-size="12" letter-spacing="1">EARLY SEARCH ON PROPORTION RATIO 3.8:1</text>
  </g>
</svg>
`)}`,

  photo1: `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1067" width="1600" height="1067">
  <defs>
    <linearGradient id="p1Sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#08090d"/>
      <stop offset="60%" stop-color="#111622"/>
      <stop offset="100%" stop-color="#07080b"/>
    </linearGradient>
    <linearGradient id="p1Paint" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="35%" stop-color="#475569"/>
      <stop offset="50%" stop-color="#94a3b8"/>
      <stop offset="70%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <radialGradient id="headlightBeam" cx="30%" cy="60%" r="50%">
      <stop offset="0%" stop-color="#e0f2fe" stop-opacity="0.9"/>
      <stop offset="30%" stop-color="#38bdf8" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#0284c7" stop-opacity="0"/>
    </radialGradient>
    <filter id="p1Glow">
      <feGaussianBlur stdDeviation="10" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect width="1600" height="1067" fill="url(#p1Sky)"/>

  <!-- Concrete Architectural Pavilion Minimal Background -->
  <polygon points="0,0 1600,0 1600,680 0,720" fill="#0d1117" opacity="0.6"/>
  <line x1="0" y1="720" x2="1600" y2="680" stroke="#334155" stroke-width="1.5" stroke-opacity="0.4"/>
  <polygon points="0,720 1600,680 1600,1067 0,1067" fill="#090a0e"/>

  <!-- Wet Asphalt Ground Reflections -->
  <ellipse cx="780" cy="850" rx="700" ry="160" fill="#1e293b" opacity="0.25"/>

  <!-- Front 3/4 Perspective Silhouette -->
  <!-- Front Wheel (Large in Foreground) -->
  <g transform="translate(560, 780)">
    <ellipse cx="0" cy="0" rx="90" ry="120" fill="#05070a" stroke="#1e293b" stroke-width="5"/>
    <ellipse cx="0" cy="0" rx="68" ry="90" fill="#0c1017" stroke="#38bdf8" stroke-width="2"/>
    <line x1="-50" y1="0" x2="50" y2="0" stroke="#ffffff" stroke-width="3" opacity="0.7"/>
    <line x1="0" y1="-70" x2="0" y2="70" stroke="#ffffff" stroke-width="3" opacity="0.7"/>
  </g>

  <!-- Rear Wheel (Perspective Depth) -->
  <g transform="translate(1220, 690)">
    <ellipse cx="0" cy="0" rx="60" ry="85" fill="#05070a" stroke="#1e293b" stroke-width="4"/>
    <ellipse cx="0" cy="0" rx="45" ry="65" fill="#0c1017" stroke="#38bdf8" stroke-width="1.5"/>
  </g>

  <!-- Car Bodywork (Front 3/4 Aggressive Stance) -->
  <path d="M 280 750 
           C 320 680, 420 640, 520 640 
           C 560 640, 600 580, 680 580 
           L 780 575 
           C 820 480, 920 420, 1060 415 
           C 1180 410, 1260 460, 1340 560 
           C 1390 570, 1440 610, 1480 660 
           L 1420 730 
           C 1340 730, 1260 640, 1180 720 
           L 660 740 
           C 620 660, 500 660, 460 760 
           L 290 770 Z" 
        fill="url(#p1Paint)" stroke="#64748b" stroke-width="1.5"/>

  <!-- Cockpit Glass Monolith -->
  <path d="M 800 565 
           C 850 480, 940 435, 1050 430 
           C 1140 425, 1200 470, 1270 555 
           C 1120 545, 960 550, 800 565 Z" 
        fill="#040609" stroke="#38bdf8" stroke-width="1.5"/>

  <!-- Twin Razor-Thin LED Matrix Laser Blades -->
  <path d="M 300 730 L 460 690" stroke="#ffffff" stroke-width="5" filter="url(#p1Glow)"/>
  <path d="M 320 745 L 480 705" stroke="#38bdf8" stroke-width="3" filter="url(#p1Glow)"/>

  <!-- Headlight Volumetric Beam Flare -->
  <polygon points="460,690 100,640 50,850 300,730" fill="url(#headlightBeam)" opacity="0.35"/>

  <!-- Lower Aerodynamic Carbon Splitter -->
  <polygon points="260,770 540,770 520,795 240,790" fill="#0a0c10" stroke="#38bdf8" stroke-width="1"/>

  <!-- Cinematic Framing Badge -->
  <text x="80" y="980" fill="#94a3b8" font-family="'Space Grotesk', -apple-system, sans-serif" font-size="14" font-weight="600" letter-spacing="4">01 // VUE TROIS-QUARTS AVANT · DYNAMIQUE</text>
  <text x="1440" y="980" fill="#64748b" font-family="ui-monospace, monospace" font-size="12" letter-spacing="2" text-anchor="end">STUDIO LIGHTING · 8K</text>
</svg>
`)}`,

  photo2: `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1067" width="1600" height="1067">
  <defs>
    <linearGradient id="p2Bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#07080a"/>
      <stop offset="70%" stop-color="#10141d"/>
      <stop offset="100%" stop-color="#050608"/>
    </linearGradient>
    <linearGradient id="rearLight" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff1744"/>
      <stop offset="50%" stop-color="#ff5252"/>
      <stop offset="100%" stop-color="#ff1744"/>
    </linearGradient>
    <filter id="neonRed">
      <feGaussianBlur stdDeviation="8" result="b1"/>
      <feGaussianBlur stdDeviation="20" result="b2"/>
      <feMerge><feMergeNode in="b2"/><feMergeNode in="b1"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect width="1600" height="1067" fill="url(#p2Bg)"/>

  <!-- Architectural Tunnel Ambience -->
  <line x1="300" y1="0" x2="100" y2="1067" stroke="#ffffff" stroke-width="1" stroke-opacity="0.05"/>
  <line x1="1300" y1="0" x2="1500" y2="1067" stroke="#ffffff" stroke-width="1" stroke-opacity="0.05"/>

  <!-- Massive Ground Effect Venturi Diffuser & Rear Stance -->
  <!-- Wide Rear Silhouette -->
  <path d="M 320 720 
           C 360 620, 440 540, 560 520 
           C 660 510, 720 440, 800 440 
           C 880 440, 940 510, 1040 520 
           C 1160 540, 1240 620, 1280 720 
           L 1320 770 
           C 1240 780, 1160 790, 800 790 
           C 440 790, 360 780, 280 770 Z" 
        fill="#0d1117" stroke="#334155" stroke-width="2"/>

  <!-- Continuous Horizon OLED Light Signature -->
  <path d="M 340 620 Q 800 595 1260 620" fill="none" stroke="url(#rearLight)" stroke-width="6" filter="url(#neonRed)"/>
  <path d="M 340 620 Q 800 595 1260 620" fill="none" stroke="#ffffff" stroke-width="2"/>

  <!-- Active Rear Wing Blade Elevated on Struts -->
  <g transform="translate(800, 420)">
    <!-- Struts -->
    <line x1="-180" y1="0" x2="-140" y2="60" stroke="#475569" stroke-width="6"/>
    <line x1="180" y1="0" x2="140" y2="60" stroke="#475569" stroke-width="6"/>
    <!-- Wing Airfoil -->
    <path d="M -480 -8 L 480 -8 C 500 -8, 510 -2, 500 4 L -500 4 C -510 -2, -500 -8, -480 -8 Z" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/>
  </g>

  <!-- Carbon Venturi Diffuser Fins (5 Vertical Airfoil Strakes) -->
  <g stroke="#38bdf8" stroke-width="2" stroke-opacity="0.4" fill="#070a0e">
    <rect x="520" y="720" width="16" height="70" rx="3"/>
    <rect x="660" y="715" width="16" height="75" rx="3"/>
    <rect x="792" y="710" width="16" height="80" rx="3"/>
    <rect x="924" y="715" width="16" height="75" rx="3"/>
    <rect x="1064" y="720" width="16" height="70" rx="3"/>
  </g>

  <!-- Dual Titanium Exhaust / Heat Extraction Ports -->
  <ellipse cx="730" cy="670" rx="26" ry="18" fill="#000000" stroke="#38bdf8" stroke-width="2"/>
  <ellipse cx="870" cy="670" rx="26" ry="18" fill="#000000" stroke="#38bdf8" stroke-width="2"/>

  <!-- Reflection on Gloss Floor -->
  <path d="M 340 820 Q 800 840 1260 820" fill="none" stroke="#ff1744" stroke-width="4" opacity="0.3" filter="url(#neonRed)"/>

  <!-- Badge Caption -->
  <text x="80" y="980" fill="#94a3b8" font-family="'Space Grotesk', -apple-system, sans-serif" font-size="14" font-weight="600" letter-spacing="4">02 // SIGNATURE LUMINEUSE &amp; DIFFUSEUR DE FLUX</text>
  <text x="1440" y="980" fill="#64748b" font-family="ui-monospace, monospace" font-size="12" letter-spacing="2" text-anchor="end">OLED MATRIX · GROUND EFFECT</text>
</svg>
`)}`,

  photo3: `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1067" width="1600" height="1067">
  <defs>
    <linearGradient id="p3Cockpit" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080a0f"/>
      <stop offset="50%" stop-color="#141824"/>
      <stop offset="100%" stop-color="#06070a"/>
    </linearGradient>
    <linearGradient id="screenHud" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00f2fe" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#4facfe" stop-opacity="0.9"/>
    </linearGradient>
    <filter id="hudGlow">
      <feGaussianBlur stdDeviation="5" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect width="1600" height="1067" fill="url(#p3Cockpit)"/>

  <!-- Monocoque Carbon Fiber Texture Pattern -->
  <g opacity="0.08" stroke="#ffffff" stroke-width="1">
    <pattern id="carbonWeave" width="16" height="16" patternUnits="userSpaceOnUse">
      <rect width="8" height="8" fill="#ffffff" opacity="0.1"/>
      <rect x="8" y="8" width="8" height="8" fill="#ffffff" opacity="0.1"/>
    </pattern>
    <rect width="1600" height="1067" fill="url(#carbonWeave)"/>
  </g>

  <!-- Curved OLED Panoramic Cluster Display -->
  <path d="M 280 440 Q 800 390 1320 440 L 1300 580 Q 800 540 300 580 Z" fill="#040608" stroke="#38bdf8" stroke-width="2" stroke-opacity="0.5"/>

  <!-- Telemetry HUD Graphics Inside Panoramic Display -->
  <g filter="url(#hudGlow)" font-family="ui-monospace, monospace">
    <!-- Speedometer Numerals -->
    <text x="800" y="500" fill="#ffffff" font-size="72" font-weight="800" text-anchor="middle" letter-spacing="4">284</text>
    <text x="800" y="530" fill="#38bdf8" font-size="16" font-weight="700" text-anchor="middle" letter-spacing="6">KM / H</text>

    <!-- G-Force Vector Orb Left -->
    <circle cx="520" cy="500" r="42" fill="none" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="6 4"/>
    <circle cx="532" cy="492" r="8" fill="#38bdf8"/>
    <text x="520" y="560" fill="#94a3b8" font-size="12" text-anchor="middle">LATERAL 1.84G</text>

    <!-- Battery & Thermal Bar Right -->
    <rect x="1040" y="475" width="140" height="12" rx="6" fill="#1e293b"/>
    <rect x="1040" y="475" width="112" height="12" rx="6" fill="url(#screenHud)"/>
    <text x="1110" y="515" fill="#38bdf8" font-size="12" text-anchor="middle">BATTERY 82% · 800V</text>
  </g>

  <!-- Yoke Steering Wheel Assembly (Steer-by-Wire) -->
  <g transform="translate(800, 780)">
    <!-- Central Hub -->
    <rect x="-100" y="-50" width="200" height="100" rx="20" fill="#0d1117" stroke="#38bdf8" stroke-width="2"/>
    <text x="0" y="8" fill="#ffffff" font-family="'Space Grotesk', sans-serif" font-size="16" font-weight="700" letter-spacing="6" text-anchor="middle">VORTEX</text>
    
    <!-- Yoke Grips Left and Right -->
    <path d="M -100 -20 C -220 -30, -280 20, -260 120 C -240 180, -180 180, -160 120 L -100 40" fill="#141a24" stroke="#475569" stroke-width="4"/>
    <path d="M 100 -20 C 220 -30, 280 20, 260 120 C 240 180, 180 180, 160 120 L 100 40" fill="#141a24" stroke="#475569" stroke-width="4"/>

    <!-- Rotary Switches on Steering -->
    <circle cx="-60" cy="15" r="14" fill="#05070a" stroke="#ff1744" stroke-width="2"/>
    <circle cx="60" cy="15" r="14" fill="#05070a" stroke="#38bdf8" stroke-width="2"/>
  </g>

  <!-- Floating Carbon Center Console -->
  <polygon points="720,860 880,860 920,1067 680,1067" fill="#0a0d13" stroke="#1e293b" stroke-width="2"/>

  <!-- Caption -->
  <text x="80" y="980" fill="#94a3b8" font-family="'Space Grotesk', -apple-system, sans-serif" font-size="14" font-weight="600" letter-spacing="4">03 // COCKPIT ERGONOMIQUE HMI · POSTE DE PILOTAGE</text>
  <text x="1440" y="980" fill="#64748b" font-family="ui-monospace, monospace" font-size="12" letter-spacing="2" text-anchor="end">STEER-BY-WIRE · CARBON CELL</text>
</svg>
`)}`
};

export const CONCEPT_CARS: ConceptCarData[] = [
  {
    id: 'concept-1',
    code: '01',
    name: 'LOBSTER CAR',
    tagline: {
      fr: 'Concept Car & Exploration Formelle',
      en: 'Concept Car & Formal Exploration'
    },
    category: {
      fr: 'Design Automobile & Modélisation',
      en: 'Automotive Design & 3D Modeling'
    },
    year: '2026',
    specs: {
      cx: '0.19 Cx',
      powertrain: {
        fr: 'Propulsion Haute Performance',
        en: 'High Performance Powertrain'
      },
      chassis: {
        fr: 'Cellule Carbone & Alliage Léger',
        en: 'Carbon Cell & Lightweight Alloy'
      },
      weight: '1 420 kg'
    },
    poster: {
      image: img1 || '/1.png',
      title: {
        fr: 'LOBSTER CAR — Affiche & Manifeste de Style',
        en: 'LOBSTER CAR — Poster & Style Manifesto'
      },
      description: {
        fr: 'Étude stylistique et formelle du concept Lobster Car. Une morphologie sculptée axée sur la tension des volumes, la pureté des lignes aérodynamiques et l\'équilibre des masses pour repousser les limites de la silhouette automobile.',
        en: 'Stylistic and formal study of the Lobster Car concept. A sculpted morphology focused on volumetric tension, purity of aerodynamic lines, and mass balance to push the boundaries of automotive silhouettes.'
      }
    },
    sketch: {
      image: img4 || '/4.png',
      title: {
        fr: 'Recherche & Croquis Préparatoires',
        en: 'Styling Sketches & Formal Research'
      },
      caption: {
        fr: 'Planche d\'exploration formelle et de proportions',
        en: 'Formal exploration and proportion board'
      },
      text: {
        fr: 'La phase d\'esquisse et de recherche graphique permet de tester l\'équilibre des volumes, d\'éprouver la silhouette et d\'ancrer les intentions esthétiques fondamentales avant toute modélisation 3D.',
        en: 'The sketching and ideation phase tests volume balance, challenges the silhouette, and anchors core aesthetic intent before transitioning to 3D modeling.'
      },
      bullets: {
        fr: [
          'Recherche de proportions et dynamique de silhouette',
          'Étude des lignes de tension et des volumes aérodynamiques',
          'Intégration fluide des signatures lumineuses et des flux'
        ],
        en: [
          'Proportion research and silhouette dynamics',
          'Tension line studies and aerodynamic sculpting',
          'Seamless integration of lighting signatures and airflows'
        ]
      }
    },
    photos: [
      {
        id: 'c1-p1',
        image: img2 || '/2.png',
        title: {
          fr: 'LOBSTER CAR — Visuel 01',
          en: 'LOBSTER CAR — Visual 01'
        },
        caption: {
          fr: '',
          en: ''
        }
      },
      {
        id: 'c1-p2',
        image: img3 || '/3.png',
        title: {
          fr: 'LOBSTER CAR — Visuel 02',
          en: 'LOBSTER CAR — Visual 02'
        },
        caption: {
          fr: '',
          en: ''
        }
      },
      {
        id: 'c1-p3',
        image: img5 || '/5.png',
        title: {
          fr: 'LOBSTER CAR — Visuel 03',
          en: 'LOBSTER CAR — Visual 03'
        },
        caption: {
          fr: '',
          en: ''
        }
      }
    ]
  },
  {
    id: 'concept-2',
    code: '02',
    name: 'VORTEX — STRATOS RADICAL',
    tagline: {
      fr: 'Hypercar Monocoque & Aérodynamique Active Extrême',
      en: 'Radical Monocoque Hypercar & Kinetic Aerodynamics'
    },
    category: {
      fr: 'Prototype Circuit & Haute Performance',
      en: 'Track Prototype & Ultra High Performance'
    },
    year: '2026',
    specs: {
      cx: '0.18 Cx',
      powertrain: {
        fr: 'Quad-Motor Vectoriel 900V · 1 100 ch',
        en: 'Quad-Motor Torque-Vectoring 900V · 1,100 hp'
      },
      chassis: {
        fr: 'Carbone T1000 & Titane Imprimé 3D',
        en: 'T1000 Carbon Fiber & 3D Printed Titanium'
      },
      weight: '1 280 kg'
    },
    poster: {
      image: CONCEPT_2_VISUALS.poster,
      title: {
        fr: 'VORTEX STRATOS — La Puissance Dictée par la Physique',
        en: 'VORTEX STRATOS — Raw Power Dictated by Physics'
      },
      description: {
        fr: 'VORTEX STRATOS pousse la philosophie du minimalisme fonctionnel à son paroxysme. Dépourvu de tout artifice ornemental, le véhicule est une machine à fendre l\'air générant plus de 1 100 kg d\'appui vertical à haute vitesse grâce à son fond plat à effet Venturi intégral et ses volets aérocinétiques adaptatifs. Sa structure monocoque en composite T1000 optimise la rigidité en torsion tout en allégeant la masse totale.',
        en: 'VORTEX STRATOS pushes functional minimalism to its radical apex. Stripped of all ornamental excess, the vehicle is a precision air-splitting prototype generating over 1,100 kg of downforce at track speed through its full-length Venturi ground effect floor and kinetic winglets. Its T1000 carbon monocoque maximizes torsional stiffness while achieving extraordinary weight reduction.'
      }
    },
    sketch: {
      image: CONCEPT_2_VISUALS.sketch,
      title: {
        fr: 'Esquisses de Style & Géométrie Cinétique',
        en: 'Kinetic Styling Sketches & Volumetric Ideation'
      },
      caption: {
        fr: 'Planche de recherche volumique, calcul des vortex d\'admission et silhouette agressive',
        en: 'Volumetric research board, intake vortex calculations and kinetic stance'
      },
      text: {
        fr: 'L\'exploration graphique de VORTEX a débuté par l\'étude des avions de chasse supersoniques et des requins pélagiques. Les coups de crayon traduisent la tension musculaire d\'un prédateur prêt à bondir : arêtes tranchantes, épaules larges et verrière en goutte d\'eau monobloc. Les croquis permettent d\'ajuster au millimètre près l\'orientation des prises d\'air naca et la trajectoire des vortex arrières.',
        en: 'The graphic exploration for VORTEX began by studying supersonic fighter aircraft and pelagic apex predators. The pencil lines capture kinetic muscular tension: razor-sharp body creases, wide rear shoulders, and a seamless single-piece canopy. Hand sketches allowed millimetric tuning of NACA ducts and trailing-edge vortex shedding.'
      },
      bullets: {
        fr: [
          'Silhouette ultra-basse inspirée de l\'aérodynamique aérospatiale',
          'Conduits NACA intégrés directement dans l\'enveloppe structurelle',
          'Aileron arrière bi-plan adaptatif commandé par télémétrie'
        ],
        en: [
          'Ultra-low stance inspired by aerospace high-speed aerodynamics',
          'NACA ducts integrated directly into the structural carbon skin',
          'Adaptive dual-element rear wing governed by dynamic telemetry'
        ]
      }
    },
    photos: [
      {
        id: 'c2-p1',
        image: CONCEPT_2_VISUALS.photo1,
        title: {
          fr: 'Vue Trois-Quarts Avant & Signature Laser',
          en: 'Front Three-Quarter Stance & Laser Blades'
        },
        caption: {
          fr: 'Regard acéré à matrice OLED, lame de spoiler en carbone forgé et calandre à volets actifs.',
          en: 'OLED matrix headlight signature, forged carbon front splitter, and active intake louvers.'
        }
      },
      {
        id: 'c2-p2',
        image: CONCEPT_2_VISUALS.photo2,
        title: {
          fr: 'Diffuseur Venturi & Signature Lumineuse Arrière',
          en: 'Venturi Diffuser & Full-Width Horizon Lightbar'
        },
        caption: {
          fr: 'Signature lumineuse arrière continue en bandeau OLED rouge et tunnels de décharge aérodynamique.',
          en: 'Continuous horizon OLED rear lightbar and full venturi ground-effect diffuser tunnels.'
        }
      },
      {
        id: 'c2-p3',
        image: CONCEPT_2_VISUALS.photo3,
        title: {
          fr: 'Poste de Conduite & Cockpit Monocoque',
          en: 'Driver Monocoque Cockpit & Steer-by-Wire'
        },
        caption: {
          fr: 'Volant ergonomique Yoke steer-by-wire et affichage tête haute à réalité augmentée.',
          en: 'Steer-by-wire ergonomic yoke steering and augmented reality heads-up telemetry display.'
        }
      }
    ]
  }
];
