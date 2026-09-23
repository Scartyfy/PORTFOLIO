import React, { useState, useRef, useEffect } from 'react';
import { useInView, useScroll, useTransform, motion, useSpring } from 'motion/react';
import { LiquidIcon, SOFTWARE_ICONS } from './LiquidIcon';
import { Language } from '../types';

const SKILLS_DATA = {
  fr: [
    { 
      id: 'shs', 
      label: 'Sc. Humaines', 
      category: 'Stratégie', 
      desc: "Comprendre l'humain pour concevoir avec sens. J'utilise l'anthropologie, la sociologie et la recherche documentaire pour analyser des enjeux complexes et définir une vision stratégique éthique." 
    },
    { 
      id: 'eng', 
      label: 'Ingénierie', 
      category: 'Systèmes', 
      desc: "Développer des solutions informatique robustes. Je maîtrise le code, l'algorithmique et l'architecture des systèmes pour concevoir des logiciels l'intelligents et intégrer des technologies complexes." 
    },
    { 
      id: 'design', 
      label: 'Ux/Ui Design', 
      category: 'Visuel', 
      desc: "Créer des interfaces fluides et impactantes. De la recherche utilisateur au prototypage haute fidélité, je maîtrise la Suite Adobe et la modélisation 3D pour rendre chaque interaction intuitive." 
    },
    { 
      id: 'proto', 
      label: 'Prototypage', 
      category: 'Fablab', 
      desc: "Passer de l'idée au Proof of Concept. Je fabrique des prototypes physiques au FabLab (maquettes, IoT, matériaux) pour tester la faisabilité technique et l'ergonomie réelle de mes concepts." 
    },
  ],
  en: [
    { 
      id: 'shs', 
      label: 'Social Sc.', 
      category: 'Strategy', 
      desc: "Understanding humans to design with purpose. I use anthropology, sociology, and documentary research to analyze complex issues and define an ethical strategic vision." 
    },
    { 
      id: 'eng', 
      label: 'Engineering', 
      category: 'Systems', 
      desc: "Developing robust IT solutions. I master code, algorithms, and system architecture to design intelligent software and integrate complex technologies." 
    },
    { 
      id: 'design', 
      label: 'Ux/Ui Design', 
      category: 'Visual', 
      desc: "Creating smooth and impactful interfaces. From user research to high-fidelity prototyping, I master the Adobe Suite and 3D modeling to make every interaction intuitive." 
    },
    { 
      id: 'proto', 
      label: 'Prototyping', 
      category: 'Fablab', 
      desc: "Moving from idea to Proof of Concept. I manufacture physical prototypes in the FabLab (models, IoT, materials) to test technical feasibility and real ergonomics of my concepts." 
    },
  ]
};

const SKILL_SOFTWARE_MAP: Record<string, string[]> = {
    eng: ['Python', 'Java', 'JavaScript'],
    design: ['Blender', 'Adobe Suite', 'Figma'],
    proto: [], 
    shs: [] 
};

export const SkillWheel: React.FC<{ lang: Language }> = ({ lang }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const hasAnimated = useRef(false);
  const skills = SKILLS_DATA[lang];
  
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInView = useInView(containerRef, { amount: 0.01, once: true });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      setActiveId('eng');
      timeoutRef.current = setTimeout(() => {
        setActiveId(prev => prev === 'eng' ? null : prev);
      }, 1500);
    }
  }, [isInView]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = (id: string) => {
    if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
    }
    setActiveId(id);
  };

  return (
    <div ref={containerRef} className="w-full bg-[#002FA7] pt-24 pb-40 border-t border-white/5 overflow-hidden">
      <div className="w-full mb-24 mt-8 border-y border-white/10 py-8 overflow-hidden flex items-center">
        <motion.div className="flex whitespace-nowrap gap-12" style={{ x }}>
            {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex items-center gap-12">
                    <h2 className="text-6xl md:text-8xl font-display font-bold tracking-widest text-white uppercase">
                        {lang === 'fr' ? 'Compétences' : 'Skills'}
                    </h2>
                </div>
            ))}
        </motion.div>
      </div>
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="hidden md:flex flex-row h-[600px] w-full gap-2 p-2 bg-[#001f70]/20 rounded-[40px] border border-white/10 shadow-[inset_0_4px_20px_rgba(0,0,0,0.2)]" onMouseLeave={() => setActiveId(null)}>
            {skills.map((skill, index) => {
                const isActive = activeId === skill.id;
                const relatedSoftware = SKILL_SOFTWARE_MAP[skill.id] || [];
                return (
                    <div key={skill.id} className={`relative transition-all duration-[800ms] cubic-bezier(0.23, 1, 0.32, 1) rounded-[32px] overflow-hidden group cursor-pointer ${isActive ? 'flex-[4] bg-white text-[#002FA7] shadow-[0_0_40px_rgba(255,255,255,0.2)] z-10' : 'flex-[1] bg-[#002FA7] hover:bg-[#002480] text-white border border-white/10 shadow-lg'}`} onMouseEnter={() => handleMouseEnter(skill.id)}>
                        <div className="absolute inset-0 flex flex-col justify-between p-6 whitespace-nowrap">
                            <div className="flex justify-end items-start text-[10px] font-mono tracking-widest">
                                <span className={`transition-all duration-300 mt-2 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>{skill.category}</span>
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center">
                                <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center -rotate-90 transition-all duration-700 cubic-bezier(0.19, 1, 0.22, 1) ${isActive ? 'opacity-0 scale-75 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
                                    <span className="text-2xl md:text-3xl font-display font-bold tracking-[0.2em] text-white/40 group-hover:text-white transition-colors whitespace-nowrap">{skill.label}</span>
                                </div>
                                <div className={`flex flex-col items-center text-center transition-all duration-[1000ms] cubic-bezier(0.19, 1, 0.22, 1) transform w-full px-12 ${isActive ? 'opacity-100 translate-y-0 scale-100 delay-[200ms]' : 'opacity-0 translate-y-12 scale-95 pointer-events-none'}`}>
                                    <h3 className="text-4xl lg:text-6xl font-display font-bold tracking-tighter mb-8 whitespace-normal leading-none">{skill.label}</h3>
                                    
                                    <div className="w-full max-w-xl text-left pl-8">
                                        <p className={`font-display font-light text-base lg:text-lg text-justify text-wrap whitespace-normal leading-relaxed transition-opacity duration-700 delay-[400ms] ${isActive ? 'opacity-100 text-[#002FA7]/80' : 'opacity-0 text-white/60'}`}>
                                            {skill.desc}
                                        </p>
                                    </div>

                                    {relatedSoftware.length > 0 && (
                                        <div className={`w-full mt-12 overflow-hidden relative transition-all duration-1000 delay-[600ms] ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                            <div className="flex gap-16 py-4 w-max" style={{ 
                                                animationName: 'scroll',
                                                animationDuration: '15s',
                                                animationTimingFunction: 'linear',
                                                animationIterationCount: 'infinite'
                                            }}>
                                                {[...relatedSoftware, ...relatedSoftware].map((name, i) => {
                                                     const icon = SOFTWARE_ICONS.find(s => s.name === name);
                                                     if(!icon) return null;
                                                     return (
                                                        <div key={`${name}-${i}`} className="transform scale-90 translate-y-4 flex-shrink-0">
                                                            <LiquidIcon icon={icon} index={i + (index * 100)} theme="light" />
                                                        </div>
                                                     );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-start items-end z-20 pointer-events-none">
                                <span className={`flex items-center justify-center w-8 h-8 rounded-full font-mono text-[10px] font-bold transition-colors duration-300 ${isActive ? 'bg-[#002FA7] text-white' : 'bg-white text-[#002FA7]'}`}>0{index + 1}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
        <div className="md:hidden flex flex-col border-t border-white/10">
            {skills.map((skill, index) => (
                <div key={skill.id} className={`border-b border-white/10 overflow-hidden transition-colors duration-300 ${activeId === skill.id ? 'bg-white text-[#002FA7]' : 'bg-[#002FA7] text-white'}`} onClick={() => setActiveId(activeId === skill.id ? null : skill.id)} onMouseEnter={() => setActiveId(skill.id)}>
                    <div className="p-6 flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-4">
                            <span className={`flex items-center justify-center min-w-[32px] h-8 rounded-full font-mono text-[10px] font-bold transition-colors duration-300 ${activeId === skill.id ? 'bg-[#002FA7] text-white' : 'bg-white text-[#002FA7]'}`}>0{index + 1}</span>
                            <span className="font-display font-bold text-lg tracking-widest">{skill.label}</span>
                        </div>
                        <span className={`text-xl font-light transition-transform duration-300 ${activeId === skill.id ? 'rotate-45' : 'rotate-0'}`}>+</span>
                    </div>
                    {activeId === skill.id && (
                        <div className="px-6 pb-8">
                            <div className="pl-6 opacity-60">
                                <p className="font-display font-light text-justify text-sm leading-relaxed">
                                    {skill.desc}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};
