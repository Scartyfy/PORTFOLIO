
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Deck } from './components/Deck';
import { ProjectList } from './components/ProjectList';
import { MagneticCursor } from './components/ui/magnetic-cursor';
import { MotionText } from './components/MotionText';
import { PhotoshopTransition } from './components/PhotoshopTransition';
import { PROJECTS, INTRO_SCROLL_HEIGHT } from './constants';
import { ViewState, Language, Project } from './types';
import { GooeyText } from './components/ui/gooey-text-morphing';
import { TextRoll } from './components/ui/text-roll-navigation';
import { AnimatedLayerButton } from './components/ui/button';
import MotionButton from './components/ui/motion-button';
import { MenuToggleIcon } from './components/ui/menu-toggle-icon';
import { PortfolioCube } from './components/PortfolioCube';

export const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('fr');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewState, setViewState] = useState<ViewState>(ViewState.INTRO);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showMotionText, setShowMotionText] = useState(false);
  const [showPhotoshopTransition, setShowPhotoshopTransition] = useState(false);
  const [showMemorizeText, setShowMemorizeText] = useState(false);
  const [introStep, setIntroStep] = useState<'WELCOME' | 'EXPANDING_WHITE' | 'SHOW_TEXT' | 'PICK_CARD'>('WELCOME');
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<Project | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (viewState !== ViewState.INTRO) return;
      const scrollY = window.scrollY;
      const maxScroll = INTRO_SCROLL_HEIGHT - window.innerHeight;
      setScrollProgress(Math.min(Math.max(scrollY / maxScroll, 0), 1));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewState]);

  const handleCardSelect = () => {
    setViewState(ViewState.REVEALING);
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (viewState === ViewState.REVEALING) {
      // Show memorize text after the card has flipped
      const memorizeTimer = setTimeout(() => {
        setShowMemorizeText(true);
      }, 1000);

      const transitionTimer = setTimeout(() => {
        setShowMemorizeText(false);
        
        // Step 1: Slide card up
        setViewState(ViewState.PROJECTS);
        
        // Step 2: Show text after card has started moving up
        const textTimer = setTimeout(() => {
          document.body.style.overflow = 'hidden'; 
          setShowMotionText(true);
        }, 100); // Reduced delay to appear almost immediately
        
        return () => clearTimeout(textTimer);
      }, 3000); // 1s flip + 2s memorization time (reduced from 3.5s)
      
      return () => {
        clearTimeout(memorizeTimer);
        clearTimeout(transitionTimer);
      };
    } else if (viewState === ViewState.INTRO) {
      setShowProjects(false);
      setShowMotionText(false);
      setShowMemorizeText(false);
    }
  }, [viewState]);

  const handleMotionComplete = () => {
    setShowMotionText(false);
    setShowPhotoshopTransition(true);
  };

  const handlePhotoshopComplete = () => {
    setShowPhotoshopTransition(false);
    setShowProjects(true);
    document.body.style.overflow = '';
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
    }
  };

  const toggleLang = () => {
    setLang(prev => prev === 'fr' ? 'en' : 'fr');
  };

  const nav = {
    fr: { 
      work: "PROJETS", 
      about: "À PROPOS", 
      skills: "COMPÉTENCES", 
      contact: "CONTACT", 
      scroll: "DÉFILER", 
      pick: "CHOISISSEZ UNE CARTE", 
      menu: "MENU", 
      close: "FERMER",
      introTop: "INGÉNIEUR",
      introBottom: "DESIGNEUR*",
      experiencePart1: "LE DESIGN N'EST PAS CE QUE L'ON VOIT,",
      experiencePart2: "C'EST LA FAÇON DONT ON REGARDE."
    },
    en: { 
      work: "WORK", 
      about: "ABOUT", 
      skills: "SKILLS", 
      contact: "CONTACT", 
      scroll: "SCROLL", 
      pick: "PICK A CARD", 
      menu: "MENU", 
      close: "CLOSE",
      introTop: "ENGINEER",
      introBottom: "DESIGNER*",
      experiencePart1: "DESIGN IS NOT WHAT YOU SEE,",
      experiencePart2: "IT'S THE WAY YOU LOOK AT IT."
    }
  }[lang];

  const isWhiteBg = introStep !== 'WELCOME' && viewState !== ViewState.PROJECTS && viewState !== ViewState.REVEALING;

  return (
    <MagneticCursor
      magneticFactor={0.55}
      cursorSize={40}
      blendMode="normal"
      lerpAmount={1}
    >
      <div className="w-full min-h-screen text-white relative selection:bg-white selection:text-[#002FA7]"
        style={{ 
          height: viewState === ViewState.INTRO ? '100vh' : 'auto',
          overflow: viewState === ViewState.INTRO ? 'hidden' : ''
        }}
      >
        <AnimatePresence>
        {showMotionText && (
          <MotionText 
            text={lang === 'fr' ? "VOYONS QUELQUES PROJETS" : "LET'S SEE SOME PROJECTS"} 
            onComplete={handleMotionComplete} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPhotoshopTransition && (
          <PhotoshopTransition 
            text={lang === 'fr' ? "VOYONS QUELQUES PROJETS" : "LET'S SEE SOME PROJECTS"} 
            onComplete={handlePhotoshopComplete} 
            onStartSlide={() => setShowProjects(true)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMemorizeText && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ 
              opacity: 0, 
              y: -20, 
              scale: 1.05, 
              transition: { duration: 0.6, ease: "easeOut" }
            }}
            className="fixed top-24 left-0 right-0 z-[100] pointer-events-none flex flex-col items-center gap-3"
          >
            <motion.div
              variants={{ hidden: { opacity: 1 }, show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
              initial="hidden"
              animate="show"
              className="flex flex-wrap justify-center gap-x-2 md:gap-x-3 text-white font-display text-3xl md:text-5xl font-bold tracking-tight text-center px-6"
            >
              {(lang === 'fr' ? "RETENEZ BIEN CETTE CARTE" : "MEMORIZE THIS CARD").split(' ').map((word, i) => (
                <motion.span key={i} variants={{ hidden: { opacity: 0, y: 20, filter: 'blur(8px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }} className="inline-block">
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LOGO - TOP LEFT (Point to AC Transformation) */}
      <div className="fixed top-6 left-5 md:left-6 z-[110] flex items-center justify-center min-w-[40px] min-h-[40px]">
        <div className="relative flex items-center justify-center w-full h-full">
          {/* THE POINT */}
          <div className={`absolute transition-all duration-[1200ms] cubic-bezier(0.23, 1, 0.32, 1) rounded-full ${isWhiteBg ? 'bg-[#002FA7]' : 'bg-white'}
            ${viewState === ViewState.INTRO ? 'w-1.5 h-1.5 opacity-100 scale-100' : 'w-1.5 h-1.5 opacity-0 scale-[2] blur-md'}
          `}></div>
          
          {/* THE TEXT AC */}
          <span className={`font-display font-bold text-lg md:text-xl tracking-tighter transition-all duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1) ${isWhiteBg ? 'text-[#002FA7]' : 'text-white'}
            ${viewState === ViewState.INTRO ? 'opacity-0 scale-95 blur-sm pointer-events-none' : 'opacity-100 scale-100 blur-0 delay-[200ms]'}
          `}>
            AC
          </span>
        </div>
      </div>

      {/* QUICK ACCESS BUTTONS */}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-wrap items-center gap-2">
        <button
          onClick={() => {
            const lobsterCar = PROJECTS.find(p => p.id === 'p3') || PROJECTS[2];
            setSelectedProjectForModal(lobsterCar);
            setViewState(ViewState.PROJECTS);
            setShowProjects(true);
            document.body.style.overflow = '';
          }}
          className="bg-[#002FA7] text-white px-4 py-2.5 rounded-full font-mono font-bold text-xs shadow-2xl hover:bg-[#00227a] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-white/30 backdrop-blur-md"
        >
          <span>🏎️</span>
          <span>VOIR LOBSTER CAR</span>
        </button>
        <button
          onClick={() => {
            setSelectedProjectForModal(null);
            setViewState(ViewState.PROJECTS);
            setShowProjects(true);
            document.body.style.overflow = '';
          }}
          className="bg-black/90 text-white px-3.5 py-2.5 rounded-full font-mono font-bold text-xs shadow-xl hover:bg-black hover:scale-105 active:scale-95 transition-all border border-white/20 backdrop-blur-md"
        >
          {lang === 'fr' ? 'TOUS LES PROJETS' : 'ALL PROJECTS'}
        </button>
      </div>

      {/* LANGUAGE TOGGLE - HIDDEN WHEN PROJECT IS OPEN */}
      {!isProjectOpen && (
        <div className="fixed top-6 right-4 md:right-6 z-[110] flex flex-col items-center group/lang transition-opacity duration-500">
           <button 
              onClick={toggleLang} 
              className={`group relative flex flex-col items-center gap-0 overflow-hidden h-[32px] px-3 transition-all duration-300 rounded-full border border-transparent ${isWhiteBg ? 'hover:bg-[#002FA7]/5 hover:border-[#002FA7]/10' : 'hover:bg-white/5 hover:border-white/10'}`}
              data-magnetic
           >
              <div className={`flex flex-col items-center transition-transform duration-600 cubic-bezier(0.76, 0, 0.24, 1) ${lang === 'en' ? '-translate-y-1/2' : 'translate-y-0'}`}>
                  <span className={`font-mono text-[10px] tracking-[0.2em] h-[32px] flex items-center text-white/50 transition-colors duration-300 ${isWhiteBg ? 'group-hover/lang:text-[#002FA7]' : 'group-hover/lang:text-white'}`}>FR</span>
                  <span className={`font-mono text-[10px] tracking-[0.2em] h-[32px] flex items-center text-white/50 transition-colors duration-300 ${isWhiteBg ? 'group-hover/lang:text-[#002FA7]' : 'group-hover/lang:text-white'}`}>EN</span>
              </div>
           </button>
           <div className={`w-1 h-1 rounded-full mt-1.5 transition-all duration-500 group-hover/lang:scale-125 animate-pulse-light ${isWhiteBg ? 'bg-[#002FA7] group-hover/lang:shadow-[0_0_8px_rgba(0,47,167,0.5)]' : 'bg-white group-hover/lang:shadow-[0_0_8px_rgba(255,255,255,0.5)]'}`}></div>
        </div>
      )}

      {viewState === ViewState.PROJECTS && !isProjectOpen && (
        <>
            {/* MENU BUTTON */}
            <div className="fixed top-6 right-20 z-[100]">
                <button className="group flex items-center gap-3 cursor-pointer p-2 rounded-full" onClick={() => setMenuOpen(!menuOpen)} data-magnetic data-magnetic-no-pull>
                    <span className="text-[10px] tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {menuOpen ? nav.close : nav.menu}
                    </span>
                    <MenuToggleIcon open={menuOpen} className="w-8 h-8 text-white" duration={500} />
                </button>
            </div>
            <div className={`fixed inset-0 z-[95] bg-[#002FA7] flex items-center justify-center transition-opacity duration-500 ease-in-out ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="flex flex-col items-center gap-12 text-center">
                    {['work', 'about', 'skills', 'contact'].map(id => (
                        <button key={id} onClick={() => scrollToSection(id)} className="group relative block cursor-pointer select-none" data-magnetic data-magnetic-no-pull>
                            <TextRoll center className="font-display font-bold text-5xl md:text-7xl tracking-tighter text-white transition-colors">
                                {nav[id as keyof typeof nav]}
                            </TextRoll>
                        </button>
                    ))}
                </div>
            </div>
        </>
      )}

      {/* INTRO TEXT RIGHT */}
      <div className={`fixed right-6 bottom-6 md:right-8 md:bottom-8 z-[110] transition-opacity duration-1000 ${viewState === ViewState.INTRO && introStep === 'WELCOME' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <p className={`font-mono text-[8px] tracking-[0.3em] uppercase text-white`}>
          ARTHUR CHAUVIN PORTFOLIO — ALL RIGHTS RESERVED © 2024
        </p>
      </div>

      {/* Main Container */}
      <div className="w-full flex flex-col items-center">
        <div className="fixed inset-0 flex items-center px-8 md:px-16 pointer-events-none z-50"
            style={{ 
              opacity: viewState !== ViewState.INTRO || introStep === 'PICK_CARD' ? 0 : 1, 
              transition: 'all 0.5s linear' 
            }}>
            <div className="flex-1 flex justify-start">
                <div className="transition-all duration-75 ease-out">
                    <GooeyText
                    texts={[nav.introTop, nav.introBottom]}
                    morphTime={0.75}
                    cooldownTime={1.25}
                    className="h-[100px] md:h-[160px] w-[300px] md:w-[600px] flex items-center justify-start"
                    textClassName="font-display font-bold tracking-tighter text-5xl md:text-7xl lg:text-8xl text-left left-0 text-white"
                  />
                </div>
            </div>
            {/* Empty divs to balance the flex layout so the center is perfectly centered if needed, but since button is in another container, we just need to align text left */}
        </div>
        
        {/* Welcome Button */}
        <div className={`fixed inset-0 flex items-center justify-center z-[60] pointer-events-none transition-all duration-1000 ease-in-out ${viewState === ViewState.INTRO && introStep === 'WELCOME' ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`relative flex flex-col md:flex-row items-center justify-center mt-96 md:mt-0 ${viewState === ViewState.INTRO && introStep === 'WELCOME' ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                <MotionButton
                    label="Portfolio"
                    onClick={() => {
                        setIntroStep('EXPANDING_WHITE');
                        window.scrollTo(0, 0);
                        
                        setTimeout(() => {
                            setIntroStep('SHOW_TEXT');
                            setTimeout(() => {
                                setIntroStep('PICK_CARD');
                            }, 4500);
                        }, 400);
                    }}
                />
            </div>
        </div>

        {/* Massive Vitruvian Man (Homme de Vitruve) stuck to the right edge and sliced in half */}
        <div 
          className={`fixed right-0 w-[32.7vw] sm:w-[26vw] md:w-[24.5vw] lg:w-[26vw] xl:w-[26vw] h-screen overflow-hidden flex items-center justify-start z-[55] pointer-events-none transition-all duration-[1500ms] cubic-bezier(0.16, 1, 0.3, 1) ${
            viewState === ViewState.INTRO && introStep === 'WELCOME' 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-[15vw] pointer-events-none'
          }`}
        >
            <PortfolioCube />
        </div>

        {/* Expanding White Square */}
        <div 
          className={`fixed inset-0 z-[70] flex items-center justify-center pointer-events-none transition-opacity duration-1000 ${viewState === ViewState.PROJECTS || viewState === ViewState.REVEALING ? 'opacity-0' : 'opacity-100'}`}
        >
          <motion.div 
            initial={{ width: '192px', height: '56px', borderRadius: '28px', opacity: 0 }}
            animate={{ 
              width: introStep !== 'WELCOME' ? '200vmax' : '192px',
              height: introStep !== 'WELCOME' ? '200vmax' : '56px',
              borderRadius: introStep !== 'WELCOME' ? '150px' : '28px',
              opacity: introStep !== 'WELCOME' ? 1 : 0
            }}
            transition={{ 
              duration: 1.5, 
              ease: [0.83, 0, 0.17, 1],
              opacity: { duration: 0.01 }
            }}
            className="bg-white absolute"
          />
        </div>

        {/* Experience Text & Pick Card Text */}
        <div className={`fixed inset-0 z-[80] flex flex-col items-center justify-center pointer-events-none`}>
          <AnimatePresence>
            {introStep === 'SHOW_TEXT' && (
              <motion.div 
                key="experience"
                exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05, transition: { duration: 0.8, ease: "easeOut" } }}
                className="text-[#002FA7] font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center px-6 flex flex-col gap-2 md:gap-4 absolute"
              >
                <div className="flex flex-wrap justify-center gap-x-2 md:gap-x-3">
                  {nav.experiencePart1.split(' ').map((word, wordIndex, words) => {
                    const baseCharIndex = words.slice(0, wordIndex).join('').length + wordIndex;
                    return (
                      <span key={wordIndex} className="inline-flex overflow-hidden pb-1" style={{ lineHeight: 1.1 }}>
                        {word.split('').map((char, charIndex) => (
                           <motion.span 
                             key={charIndex}
                             variants={{ hidden: { y: "120%" }, show: { y: 0 } }}
                             initial="hidden"
                             animate="show"
                             transition={{ ease: [0.16, 1, 0.3, 1], duration: 1, delay: 0.2 + (baseCharIndex + charIndex) * 0.04 }}
                             className="inline-block origin-bottom"
                           >
                             {char}
                           </motion.span>
                        ))}
                      </span>
                    );
                  })}
                </div>
                <div className="flex flex-wrap justify-center gap-x-2 md:gap-x-3">
                  {nav.experiencePart2.split(' ').map((word, wordIndex, words) => {
                    const baseCharIndex = words.slice(0, wordIndex).join('').length + wordIndex;
                    return (
                      <span key={wordIndex} className="inline-flex overflow-hidden pb-1" style={{ lineHeight: 1.1 }}>
                        {word.split('').map((char, charIndex) => (
                           <motion.span 
                             key={charIndex}
                             variants={{ hidden: { y: "120%" }, show: { y: 0 } }}
                             initial="hidden"
                             animate="show"
                             transition={{ ease: [0.16, 1, 0.3, 1], duration: 1, delay: 1.5 + (baseCharIndex + charIndex) * 0.04 }}
                             className="inline-block origin-bottom"
                           >
                             {char}
                           </motion.span>
                        ))}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            )}
            {introStep === 'PICK_CARD' && viewState === ViewState.INTRO && (
              <motion.div 
                key="pick"
                exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05, transition: { duration: 0.8, ease: "easeOut" } }}
                className="text-[#002FA7] font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center px-6 flex flex-col gap-2 md:gap-4 absolute bottom-24 md:bottom-32"
              >
                <div className="flex flex-wrap justify-center gap-x-2 md:gap-x-3">
                  {nav.pick.split(' ').map((word, wordIndex, words) => {
                    const baseCharIndex = words.slice(0, wordIndex).join('').length + wordIndex;
                    return (
                      <span key={wordIndex} className="inline-flex overflow-hidden pb-1" style={{ lineHeight: 1.1 }}>
                        {word.split('').map((char, charIndex) => (
                           <motion.span 
                             key={charIndex}
                             variants={{ hidden: { y: "120%" }, show: { y: 0 } }}
                             initial="hidden"
                             animate="show"
                             transition={{ ease: [0.16, 1, 0.3, 1], duration: 1, delay: 0.2 + (baseCharIndex + charIndex) * 0.04 }}
                             className="inline-block origin-bottom"
                           >
                             {char}
                           </motion.span>
                        ))}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className={`fixed inset-0 flex items-center justify-center z-[75] ${viewState === ViewState.REVEALING || viewState === ViewState.PROJECTS || viewState === ViewState.TRANSITIONING ? 'pointer-events-none' : ''} ${introStep === 'WELCOME' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
             <Deck scrollProgress={introStep === 'PICK_CARD' ? 1 : 0} viewState={viewState} onCardSelect={handleCardSelect} />
        </div>

        {(viewState === ViewState.PROJECTS || viewState === ViewState.TRANSITIONING) && (
            <div className={`w-full min-h-screen pt-0 z-10 ${showProjects ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <ProjectList 
                  projects={PROJECTS} 
                  lang={lang} 
                  onProjectStateChange={setIsProjectOpen} 
                  isReady={showProjects} 
                  initialProject={selectedProjectForModal} 
                />
            </div>
        )}
      </div>
      </div>
    </MagneticCursor>
  );
};
