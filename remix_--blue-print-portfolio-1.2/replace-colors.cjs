const fs = require('fs');

const files = [
  './components/ProjectList.tsx',
  './components/Deck.tsx',
  './components/SkillWheel.tsx',
  './components/LiquidIcon.tsx',
  './components/ui/motion-button.tsx'
];

function themeReplace(filePath) {
  if(!fs.existsSync(filePath)) return;
  let text = fs.readFileSync(filePath, 'utf8');
  
  // Apply transformations
  text = text.replace(/text-black/g, 'text-[#002FA7]');
  text = text.replace(/bg-black/g, 'bg-[#002FA7]');
  text = text.replace(/border-black/g, 'border-[#002FA7]');
  
  text = text.replace(/text-neutral-900/g, 'text-white/10');
  text = text.replace(/text-neutral-800/g, 'text-white/20');
  text = text.replace(/text-neutral-700/g, 'text-white/30');
  text = text.replace(/text-neutral-600/g, 'text-white/40');
  text = text.replace(/text-neutral-500/g, 'text-white/50');
  text = text.replace(/text-neutral-400/g, 'text-white/60');
  text = text.replace(/text-neutral-300/g, 'text-white/70');
  text = text.replace(/text-neutral-200/g, 'text-white/80');
  text = text.replace(/text-neutral-100/g, 'text-white/90');
  
  text = text.replace(/bg-neutral-900/g, 'bg-[#002480]');
  text = text.replace(/bg-neutral-800/g, 'bg-[#001D66]');
  text = text.replace(/border-neutral-800/g, 'border-white/10');
  text = text.replace(/border-neutral-900/g, 'border-white/5');
  
  text = text.replace(/text-blue-800/g, 'text-[#002FA7]'); // remove other blues just in case
  
  fs.writeFileSync(filePath, text);
  console.log(`Updated ${filePath}`);
}

files.forEach(themeReplace);
