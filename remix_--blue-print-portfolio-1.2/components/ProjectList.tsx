import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Project, Language } from "../types";
import { ProjectTemplate } from "./ProjectTemplate";
import { SkillWheel } from "./SkillWheel";
import { ShapeBlur } from "./ShapeBlur";
import { AnimatedSpade } from "./AnimatedSpade";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import ScrambleIn, { ScrambleInHandle } from "./ui/scramble-in";

interface ProjectListProps {
  projects: Project[];
  lang: Language;
  onProjectStateChange?: (isOpen: boolean) => void;
  initialProject?: Project | null;
  isReady?: boolean;
}

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  lang,
  onProjectStateChange,
  initialProject,
  isReady = true,
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(
    initialProject || null,
  );
  const [creatorVisible, setCreatorVisible] = useState(false);
  const creatorRef = useRef<HTMLDivElement>(null);
  const scrambleRef = useRef<ScrambleInHandle>(null);
  const scrambleTitleRef = useRef<ScrambleInHandle>(null);

  const [trickStep, setTrickStep] = useState<"ASK" | "REVEAL">("ASK");
  const [isWrongCard, setIsWrongCard] = useState(true);
  const [perceptionShift, setPerceptionShift] = useState(false);
  const [questionOpacity, setQuestionOpacity] = useState(1);
  const [isYesHidden, setIsYesHidden] = useState(false);
  const [isMagicAnimating, setIsMagicAnimating] = useState(false);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const modalScrollRef = useRef<HTMLDivElement>(null);

  const t = {
    fr: {
      bio: "Ingénieur informatique et designer global. J'aborde chaque problème complexe avec une double grille de lecture : l'exploration empathique pour identifier le vrai besoin, et la méthode de l'ingénieur pour structurer la meilleure solution. Ma valeur ajoutée réside dans cette synergie : concevoir avec la vision du designer et bâtir avec la précision de l'ingénieur.",
      trickTitle: "Était-ce votre carte ?",
      trickQuestionLines: ["ÉTAIT-CE", "VOTRE", "CARTE ?"],
      yes: "Oui",
      no: "Non",
      prestige: "Le Prestige",
      manifestoMain:
        "Regardez ce Cœur devenir un Pique. Même forme, nouvel angle, fondation solide. C'est mon approche d'ingénieur-designer : partir de l'empathie du Cœur pour cerner le besoin, puis le retourner et le structurer avec la rigueur du Pique. Le problème et la solution ne sont qu'une question de perspective.",
      manifestoBold: "",
      close: "Fermer",
      year: "Année",
      category: "Catégorie",
      back: "Retour à l'index",
      rights: "Tous droits réservés.",
      workshopTitle: "Étude de Cas : Sprint de 5 Jours",
      day1: "Jour 1 : Immersion Terrain",
      day1Desc:
        "Visite du site à CY Tech. Confrontation directe avec les obstacles physiques et sensoriels. La réalité du terrain impose l'humilité.",
      day2: "Jour 2 : Idéation & Personas",
      day2Desc:
        "Création des personas pour humaniser les contraintes. Comprendre les besoins spécifiques est la clé d'un design inclusif.",
      day3: "Jour 3 : Mockup & Plans",
      day3Desc:
        "Repenser les flux. Zones de calme, éclairages indirects, accessibilité PMR. Passage du concept au dessin technique.",
      day4: "Jour 4 : Prototypage",
      day4Desc:
        "Validation des concepts par la forme. Intégration des contraintes réelles de fabrication.",
      dayFinal: "Jour 5 : Revue & Livrable",
      dayFinalDesc:
        "Finalisation des plans et présentation au commanditaire. Un havre de paix inclusif et fonctionnel.",
      planBefore: "Avant : Plan Existant",
      planAfter: "Après : Proposition d'Espace",
      personaTitle: "La Pertinence des Personas",
      personaTim: {
        name: "Tim, 22 ans",
        role: "Étudiant en ingénierie",
        handicap: "Handicap moteur",
        needs: "Espaces adaptés, accès facilité aux équipements.",
        challenge: "Mobilité restreinte dans les espaces communs.",
      },
      personaAnna: {
        name: "Anna, 19 ans",
        role: "Étudiante en biologie",
        handicap: "Déficience auditive sévère",
        needs: "Espaces calmes, éclairage adapté, boucle magnétique.",
        challenge: "Fatigue liée aux échanges prolongés en milieu bruyant.",
      },
      personaAlann: {
        name: "Alann, 18 ans",
        role: "Étudiant INGÉNIEUR DESIGNEUR",
        handicap: "Troubles autistiques & TDAH",
        needs:
          "Espace calme sans stimuli sensoriels, soutien à la concentration.",
        challenge: "Handicap invisible dû à une sur-adaptation permanente.",
      },
    },
    en: {
      bio: "Computer engineer and global designer. I approach each complex problem with a dual perspective: empathetic exploration to identify the real need, and the engineer's method to structure the best solution. My added value lies in this synergy: designing with the vision of the designer and building with the precision of the engineer.",
      trickTitle: "Was this your card?",
      trickQuestionLines: ["WAS THIS", "YOUR", "CARD?"],
      yes: "Yes",
      no: "No",
      prestige: "The Prestige",
      manifestoMain:
        "Watch this Heart turn into a Spade. Same shape, new angle, solid foundation. This is my engineer-designer approach: starting with the Heart's empathy to understand the need, then turning it around and structuring it with the rigor of the Spade. The problem and the solution are merely a matter of perspective.",
      manifestoBold: "",
      close: "Close",
      year: "Year",
      category: "Category",
      back: "Back to index",
      rights: "All rights reserved.",
      workshopTitle: "Case Study: 5-Day Sprint",
      day1: "Day 1: Site Immersion",
      day1Desc:
        "Site visit at CY Tech. Direct confrontation with physical and sensory obstacles. Reality dictates humility.",
      day2: "Day 2: Ideation & Personas",
      day2Desc:
        "Creating personas to humanize constraints. Understanding specific needs is the key to inclusive design.",
      day3: "Day 3: Mockup & Plans",
      day3Desc:
        "Rethinking flows. Quiet zones, indirect lighting, PRM accessibility. Moving from concept to technical drafting.",
      day4: "Day 4: Prototyping",
      day4Desc:
        "Concept validation through form. Integration of real manufacturing constraints.",
      dayFinal: "Day 5: Review & Deliverable",
      dayFinalDesc:
        "Plan finalization and client review. An inclusive and functional safe haven.",
      planBefore: "Before: Existing Plan",
      planAfter: "After: Space Proposal",
      personaTitle: "The Relevance of Personas",
      personaTim: {
        name: "Tim, 22",
        role: "Engineering student",
        handicap: "Motor impairment",
        needs: "Adapted spaces, easy access to equipment.",
        challenge: "Restricted mobility in common areas.",
      },
      personaAnna: {
        name: "Anna, 19",
        role: "Biology student",
        handicap: "Severe hearing loss",
        needs: "Quiet spaces, adapted lighting, magnetic loop.",
        challenge: "Fatigue from prolonged exchange in noisy environments.",
      },
      personaAlann: {
        name: "Alann, 18",
        role: "Engineer-designer student",
        handicap: "Autism & ADHD",
        needs: "Calm space without sensory stimuli, concentration support.",
        challenge: "Invisible handicap due to constant over-adaptation.",
      },
    },
  }[lang];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCreatorVisible(true);
          setTimeout(() => {
            scrambleTitleRef.current?.start();
            setTimeout(() => {
              scrambleRef.current?.start();
            }, 600);
          }, 800);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    if (creatorRef.current) observer.observe(creatorRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (onProjectStateChange) {
      onProjectStateChange(!!selectedProject);
    }
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedProject, onProjectStateChange]);

  useEffect(() => {
    if (initialProject) {
      setSelectedProject(initialProject);
    }
  }, [initialProject]);

  const handleClose = () => setSelectedProject(null);

  const handleRevealMagic = () => {
    setQuestionOpacity(0);
    setPerceptionShift(true);
    setIsMagicAnimating(true);
    setTimeout(() => {
      setIsWrongCard(false);
    }, 200); // the heart animation begins here
    setTimeout(() => {
      setTrickStep("REVEAL");
    }, 1300); // 1.1s into the 2.2s animation (middle of flip)
    setTimeout(() => {
      setPerceptionShift(false);
      setIsMagicAnimating(false);
    }, 2400); // 2.2s duration ends here
  };

  // Workshop Timeline Tracking
  const [activeDay, setActiveDay] = useState(0);
  const dayRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (selectedProject?.id !== "p4") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0",
            );
            setActiveDay(index);
          }
        });
      },
      { threshold: 0.45 },
    );

    dayRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, [selectedProject]);

  const scrollToDay = (index: number) => {
    dayRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax for About section
  const { scrollYProgress: aboutScrollY } = useScroll({
    target: creatorRef,
    offset: ["start end", "end start"],
  });

  const aboutTextY = useTransform(aboutScrollY, [0, 1], [80, -80]);
  const aboutImageY = useTransform(aboutScrollY, [0, 1], [-40, 40]);
  const aboutShapeBlurY = useTransform(aboutScrollY, [0, 1], [-120, 120]);

  // Gallery Section
  return (
    <div className="w-full relative">
      <div className="relative w-full z-10 flex flex-col items-center bg-[#002FA7]">
        {/* Dynamic Background Gradient on the deep blue background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden mix-blend-screen opacity-[0.85]">
          {projects.slice(0, 6).map((project) => {
            const isActuallyHovered = activeProjectId === project.id;
            return (
              <div
                key={`bg-${project.id}`}
                className={`absolute inset-[-40%] transition-opacity duration-1000 ${
                  isActuallyHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={project.image || project.gallery?.[0]}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover blur-[160px] scale-[1.2] brightness-125 saturate-200"
                />
              </div>
            );
          })}
        </div>

        <div ref={containerRef} className="w-full relative overflow-hidden">
          <div
            id="work"
            className="w-full max-w-7xl mx-auto px-6 pt-12 pb-32 relative z-10"
          >
            {/* Animated Project Lamelles */}
            <div className="w-full min-h-[600px] flex items-center justify-center relative mt-4 md:mt-12 pointer-events-none">
              {/* Custom Follow Cursor */}
              <motion.div
                className="fixed top-0 left-0 z-[10000] pointer-events-none flex items-center justify-center bg-white rounded-full mix-blend-normal"
                animate={{
                  x: mousePos.x - 50,
                  y: mousePos.y - 50,
                  opacity: activeProjectId ? 1 : 0,
                  scale: activeProjectId ? 1 : 0,
                }}
                transition={{
                  scale: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
                  opacity: { duration: 0.3 },
                  x: { duration: 0.15, ease: "backOut" },
                  y: { duration: 0.15, ease: "backOut" },
                }}
                style={{ width: 100, height: 100 }}
              >
                <ArrowUpRight
                  className="text-[#002FA7]"
                  size={24}
                  strokeWidth={4}
                />
              </motion.div>

              {/* Lamelles Accordion */}
              <div
                className="w-full h-[70vh] md:h-[500px] flex flex-col md:flex-row gap-2 md:gap-4 relative z-20 overflow-hidden md:overflow-visible min-h-[400px] md:min-h-[500px] pb-4 px-4 md:px-0 justify-center pointer-events-auto"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  cursor: "none",
                }}
                onPointerMove={(e) => {
                  setMousePos({ x: e.clientX, y: e.clientY });
                }}
                data-cursor-hidden="true"
              >
                <style>{`
                  ::-webkit-scrollbar { display: none; }
                `}</style>
                {(() => {
                  const sixProjects = projects.slice(0, 6);
                  return sixProjects.map((project, index) => {
                    const isActive = activeProjectId === project.id;
                    return (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 150, clipPath: "inset(100% 0 0 0)" }}
                        animate={{
                          opacity: isReady ? 1 : 0,
                          y: isReady ? 0 : 150,
                          clipPath: isReady ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)"
                        }}
                        transition={{
                          duration: 1.4,
                          delay: isReady ? 0.1 + index * 0.1 : 0,
                          ease: [0.76, 0, 0.24, 1],
                        }}
                        onMouseEnter={() => setActiveProjectId(project.id)}
                        onMouseLeave={() => setActiveProjectId(null)}
                        onClick={() => setSelectedProject(project)}
                        className={`relative transition-all duration-[1000ms] overflow-hidden group min-h-[40px] md:min-h-0 min-w-0 md:min-w-[32px] rounded-sm md:rounded ease-[0.16,1,0.3,1] origin-bottom ${isActive ? "flex-[4] min-h-[200px] md:min-h-0 md:min-w-[400px] text-white z-10" : "flex-[1] text-white"}`}
                        style={{ cursor: "none" }}
                        data-magnetic-no-pull
                      >
                        <div className="absolute inset-0 flex flex-col justify-between p-0 origin-bottom" style={{ transformStyle: "preserve-3d" }}>
                          <motion.img
                            initial={{ scale: 1.2 }}
                            animate={{ scale: isActive ? 1.05 : 1.1 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            src={project.image || project.gallery?.[0]}
                            referrerPolicy="no-referrer"
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1200ms] ${isActive ? "scale-105 grayscale-0" : "scale-100 grayscale"}`}
                          />
                          <div
                            className={`absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent transition-opacity duration-700 pointer-events-none ${isActive ? "opacity-100" : "opacity-0"}`}
                          />

                          <div
                            className={`absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col gap-2 transition-all duration-700 ease-[0.16,1,0.3,1] z-10 pointer-events-none ${isActive ? "translate-y-0 opacity-100 delay-300" : "translate-y-12 opacity-0"}`}
                          >
                            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/80">
                              {project.category[lang]}
                            </span>
                            <h3 className="font-display font-medium text-2xl md:text-3xl text-white tracking-tight">
                              {project.title[lang]}
                            </h3>
                          </div>
                        </div>
                      </motion.div>
                    );
                  });
                })()}
              </div>
            </div>
            <div className="w-full flex justify-center mt-8 relative z-40">
              <motion.div
                className="text-white/50"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowDown size={32} strokeWidth={1.5} />
              </motion.div>
            </div>
          </div>
        </div>
        {/* About Section - Inverted Colors */}
        <div
          id="about"
          ref={creatorRef}
          className="relative z-20 w-full bg-white transition-colors duration-1000 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
              <motion.div
                style={{ y: aboutTextY }}
                className="w-full md:w-2/3 flex flex-col justify-center text-left"
              >
                <h2
                  className={`font-display text-4xl md:text-5xl font-bold text-[#002FA7] mb-8 tracking-wide transition-all duration-1000 delay-500 ${creatorVisible ? "opacity-100 blur-0" : "opacity-0 blur-md"}`}
                >
                  <ScrambleIn
                    ref={scrambleTitleRef}
                    text="ARTHUR CHAUVIN"
                    autoStart={false}
                    scrambleSpeed={25}
                    scrambledLetterCount={4}
                  />
                </h2>
                <p
                  className={`font-display text-lg md:text-xl text-[#002FA7]/80 leading-relaxed font-light transition-all duration-1000 delay-700 ${creatorVisible ? "opacity-100 blur-0 translate-y-0" : "opacity-0 blur-lg translate-y-4"}`}
                >
                  <ScrambleIn
                    ref={scrambleRef}
                    text={t.bio}
                    autoStart={false}
                    scrambleSpeed={25}
                    scrambledLetterCount={6}
                  />
                </p>
              </motion.div>
              <motion.div
                style={{ y: aboutImageY }}
                className="w-full max-w-[280px] md:w-1/4 relative select-none group/photo"
              >
                {/* ShapeBlur Effect around the photo - Adjusted for light background */}
                <motion.div
                  className="absolute -inset-24 md:-inset-32 z-0 opacity-20 pointer-events-none transition-opacity duration-1000"
                  style={{
                    y: aboutShapeBlurY,
                    opacity: creatorVisible ? 0.4 : 0,
                  }}
                >
                  <ShapeBlur
                    variation={0}
                    pixelRatioProp={window.devicePixelRatio || 1}
                    shapeSize={1.4}
                    roundness={0.5}
                    borderSize={0.04}
                    circleSize={0.25}
                    circleEdge={0.8}
                  />
                </motion.div>
                <div className="aspect-[3/4] w-full relative overflow-hidden z-10">
                  <img
                    src="https://drive.google.com/thumbnail?id=1khLVzezL-HSyTZeDtHg45qTqPdV5Ro73&sz=w1000"
                    referrerPolicy="no-referrer"
                    alt="Arthur Chauvin"
                    className="w-full h-full object-cover filter grayscale contrast-125"
                  />
                  <div className="absolute inset-0 border border-[#002FA7]/5 z-20"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div id="skills" className="relative z-20 w-full mb-0 mt-0">
          <SkillWheel lang={lang} />
        </div>
      </div>

      {/* Contact Section / Prestige Trick */}
      <div
        id="contact"
        className="w-full min-h-screen relative flex flex-col overflow-hidden mt-0 z-20 bg-[#002FA7] transition-colors duration-1000"
      >
        <div className="w-full max-w-6xl mx-auto px-4 flex-grow flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24 relative z-10 py-24 min-h-[80vh]">
          
          {/* LEFT SIDE: Typography & Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center relative min-h-[450px] md:min-h-[500px]">
            {/* ASK PHASE TEXT & BUTTONS */}
            <div className={`absolute inset-0 flex flex-col items-center text-center justify-center transition-all duration-1000 ease-[0.16,1,0.3,1] ${trickStep === "ASK" ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-20 pointer-events-none"}`}>
              <h2 className="text-5xl md:text-7xl xl:text-[6vw] font-display font-medium uppercase tracking-tighter text-white leading-[0.85] mb-12 drop-shadow-2xl flex flex-col items-center">
                <span className="block overflow-hidden pb-2"><motion.span initial={{y:"100%"}} whileInView={{y:0}} transition={{duration:0.8}} className="block">{t.trickQuestionLines[0]}</motion.span></span>
                <span className="block overflow-hidden pb-2"><motion.span initial={{y:"100%"}} whileInView={{y:0}} transition={{delay:0.1, duration:0.8}} className="block text-white/50">{t.trickQuestionLines[1]}</motion.span></span>
                <span className="block overflow-hidden pb-4 -mb-4"><motion.span initial={{y:"100%"}} whileInView={{y:0}} transition={{delay:0.2, duration:0.8}} className="block">{t.trickQuestionLines[2]}</motion.span></span>
              </h2>
              <div className="flex gap-6 items-center justify-center" style={{ opacity: questionOpacity }}>
                <button
                  onClick={handleRevealMagic}
                  className={`group px-10 py-5 md:py-6 bg-white text-[#002FA7] font-bold text-xl md:text-2xl uppercase tracking-widest rounded-full hover:scale-105 transition-all duration-500 shadow-2xl flex items-center justify-center min-w-[140px] ${isYesHidden ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                >
                  <span className="relative z-10">{t.yes}</span>
                </button>
                <button
                  onClick={handleRevealMagic}
                  className="group px-10 py-5 md:py-6 bg-white text-[#002FA7] font-bold text-xl md:text-2xl uppercase tracking-widest rounded-full hover:scale-105 transition-all duration-500 shadow-2xl flex items-center justify-center min-w-[140px]"
                >
                  <span className="relative z-10">{t.no}</span>
                </button>
              </div>
            </div>

            {/* REVEAL PHASE TEXT */}
            <div className={`absolute inset-0 flex flex-col items-center text-center justify-center transition-all duration-1000 delay-300 ease-[0.16,1,0.3,1] ${trickStep === "REVEAL" ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-20 pointer-events-none"}`}>
              <p className="font-display font-light text-base md:text-lg lg:text-xl text-white/90 leading-[1.6] mb-6 md:mb-10 max-w-lg">
                {t.manifestoMain}
                {t.manifestoBold && (
                  <span className="font-medium text-white block mt-4 border-t border-white/20 pt-4 mx-auto max-w-[80%]">{t.manifestoBold}</span>
                )}
              </p>
              <div className="flex gap-4 md:gap-8 justify-center">
                <a
                  href="https://www.linkedin.com/in/arthur-chauvin-b798042bb/"
                  target="_blank"
                  className="group flex flex-col gap-2 items-center text-center"
                  data-magnetic
                  data-magnetic-no-pull
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white transition-all shadow-xl">
                    <svg className="w-5 h-5 text-white/60 group-hover:text-[#002FA7]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </div>
                  <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-white/50">LinkedIn</span>
                </a>
                <a
                  href="/cv.pdf"
                  target="_blank"
                  className="group flex flex-col gap-2 items-center text-center"
                  data-magnetic
                  data-magnetic-no-pull
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white transition-all shadow-xl">
                    <svg className="w-5 h-5 text-white/60 group-hover:text-[#002FA7]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                    </svg>
                  </div>
                  <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-white/50">CV</span>
                </a>
                <a
                  href="mailto:arthur.eg.chauvin@gmail.com"
                  className="group flex flex-col gap-2 items-center text-center"
                  data-magnetic
                  data-magnetic-no-pull
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white transition-all shadow-xl">
                    <svg className="w-5 h-5 text-white/60 group-hover:text-[#002FA7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-white/50">Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: The Card */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <div className={`perspective-1000 w-64 h-[360px] md:w-80 md:h-[450px] lg:w-[400px] lg:h-[560px] flex-shrink-0 relative z-20 transition-all duration-1000 transform-style-3d ${perceptionShift ? "animate-perception scale-105" : ""}`}>
              <div className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden flex flex-col justify-between p-6 md:p-8 border-2 border-white/30 bg-white shadow-2xl transition-colors duration-1000">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.05),transparent_80%)]" />
                
                <div className={`flex flex-col items-center self-start relative w-8 h-16 md:w-10 md:h-20 z-10 transition-all duration-700 ${isMagicAnimating ? "blur-md opacity-20 bg-white" : "blur-0 opacity-100"}`}>
                  {/* Hearts (Wrong Card) */}
                  <div className={`absolute inset-0 flex flex-col items-center transition-all duration-1000 ease-out ${isWrongCard ? "opacity-100 scale-100" : "opacity-0 scale-[1.5]"}`}>
                    <span className="font-display font-bold text-3xl md:text-4xl text-red-500">A</span>
                    <span className="text-xl md:text-2xl text-red-500 mt-1">♥</span>
                  </div>
                  {/* Spades (Correct Card) */}
                  <div className={`absolute inset-0 flex flex-col items-center transition-all duration-700 ease-out delay-200 ${!isWrongCard ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
                    <span className="font-display font-bold text-3xl md:text-4xl text-[#002FA7]">A</span>
                    <span className="text-2xl md:text-3xl text-[#002FA7] mt-1">♠</span>
                  </div>
                </div>
                
                <AnimatedSpade isWrongCard={isWrongCard} />
                
                <div className={`flex flex-col items-center self-end transform rotate-180 relative w-8 h-16 md:w-10 md:h-20 z-10 transition-all duration-700 ${isMagicAnimating ? "blur-md opacity-20 bg-white" : "blur-0 opacity-100"}`}>
                  <div className={`absolute inset-0 flex flex-col items-center transition-all duration-1000 ${isWrongCard ? "opacity-100" : "opacity-0"}`}>
                    <span className="font-display font-bold text-3xl md:text-4xl text-red-500">A</span>
                    <span className="text-xl md:text-2xl text-red-500 mt-1">♥</span>
                  </div>
                  <div className={`absolute inset-0 flex flex-col items-center transition-all duration-700 delay-200 ${!isWrongCard ? "opacity-100" : "opacity-0"}`}>
                    <span className="font-display font-bold text-3xl md:text-4xl text-[#002FA7]">A</span>
                    <span className="text-2xl md:text-3xl text-[#002FA7] mt-1">♠</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="w-full py-8 text-center border-t border-white/5 z-20">
          <p className="font-mono text-[9px] tracking-widest text-white/40 uppercase">
            © 2024 ARTHUR CHAUVIN. {t.rights}
          </p>
        </footer>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="project-modal"
            initial={{
              clipPath: "inset(100% 0 0 0)",
              filter: "blur(10px) brightness(0.5)",
              y: 100,
            }}
            animate={{
              clipPath: "inset(0% 0 0 0)",
              filter: "blur(0px) brightness(1)",
              y: 0,
            }}
            exit={{
              clipPath: "inset(0 0 100% 0)",
              filter: "blur(10px) brightness(0.5)",
              y: -100,
            }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className={`fixed inset-0 z-[100] ${["p1", "p2", "p3", "p4", "p5", "p6"].includes(selectedProject.id) ? "bg-[#0A0A0A]" : "bg-[#002FA7]"}`}
          >
            <div className="absolute inset-0 overflow-y-auto overflow-x-hidden" ref={modalScrollRef}>
              <div className="w-full relative z-10">
                {["p1", "p2", "p3", "p4", "p5", "p6"].includes(
                  selectedProject.id,
                ) ? (
                  <ProjectTemplate projectId={selectedProject.id} lang={lang} scrollContainerRef={modalScrollRef} onClose={handleClose} />
                ) : (
                  <div className="px-6 py-12 md:py-24 max-w-[1200px] mx-auto flex flex-col items-center">
                    <div className="text-center mb-16 w-full max-w-2xl">
                      <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-6">
                        {selectedProject.title[lang]}
                      </h1>
                      <div className="flex justify-center gap-8 border-t border-b border-white/5 py-4">
                      <div className="flex flex-col">
                        <span className="text-[8px] font-mono tracking-widest text-white/50">
                          {t.category}
                        </span>
                        <span className="text-sm text-white/70">
                          {selectedProject.category[lang]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* SPECIAL CASE: Workshop CY Tech Study Case */}
                  {selectedProject.id === "p4" ? (
                    <div className="w-full max-w-5xl relative flex flex-col md:flex-row gap-8 md:gap-16">
                      {/* FIXED Interactive Vertical Labels Following scroll - AT THE VERY SCREEN EDGE */}
                      <div className="hidden lg:flex flex-col fixed left-4 top-1/2 -translate-y-1/2 h-fit gap-10 z-[100]">
                        {[0, 1, 2, 3, 4].map((i) => {
                          const isActive = activeDay === i;
                          const labels = [
                            "IMMERSION",
                            "PERSONAS",
                            "MOCKUPS",
                            "PROTOTYPE",
                            "FINAL",
                          ];
                          return (
                            <button
                              key={i}
                              onClick={() => scrollToDay(i)}
                              className="group flex flex-col items-start text-left"
                              data-magnetic
                            >
                              <span
                                className={`font-mono text-[10px] tracking-[0.4em] transition-colors duration-500 ${isActive ? "text-white" : "text-white/20"}`}
                              >
                                0{i + 1}
                              </span>
                              <span
                                className={`font-display font-bold text-[12px] tracking-widest transition-all duration-500 mt-1 ${isActive ? "text-white opacity-100 translate-x-0" : "text-white/10 opacity-40 translate-x-[-15px]"}`}
                              >
                                {labels[i]}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex-1 space-y-96 pb-64 lg:ml-24">
                        {/* DAY 1: IMMERSION */}
                        <section
                          ref={(el) => {
                            dayRefs.current[0] = el;
                          }}
                          data-index="0"
                          className="space-y-12"
                        >
                          <div className="space-y-4">
                            <span className="text-[10px] font-mono text-white/40 tracking-[0.4em]">
                              {t.day1}
                            </span>
                            <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter">
                              Immersion Terrain
                            </h2>
                            <p className="text-xl text-white/60 font-light leading-relaxed max-w-2xl italic">
                              {t.day1Desc}
                            </p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="aspect-[4/3] bg-[#002480] rounded-2xl overflow-hidden border border-white/10 group relative">
                              <div className="absolute inset-0 bg-[#002FA7]/40 group-hover:bg-transparent transition-all z-10"></div>
                              <img
                                src={selectedProject.gallery?.[2]}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1500ms]"
                              />
                            </div>
                            <div className="aspect-[4/3] bg-[#002480] rounded-2xl overflow-hidden border border-white/10 group relative">
                              <div className="absolute inset-0 bg-[#002FA7]/40 group-hover:bg-transparent transition-all z-10"></div>
                              <img
                                src="https://picsum.photos/1200/800?grayscale&random=immersion"
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1500ms]"
                              />
                            </div>
                          </div>
                        </section>

                        {/* DAY 2: PERSONAS */}
                        <section
                          ref={(el) => {
                            dayRefs.current[1] = el;
                          }}
                          data-index="1"
                          className="space-y-16"
                        >
                          <div className="space-y-4">
                            <span className="text-[10px] font-mono text-white/40 tracking-[0.4em]">
                              {t.day2}
                            </span>
                            <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter">
                              {t.personaTitle}
                            </h2>
                            <p className="text-xl text-white/60 font-light leading-relaxed max-w-2xl italic">
                              {t.day2Desc}
                            </p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[t.personaTim, t.personaAnna, t.personaAlann].map(
                              (p, idx) => (
                                <div
                                  key={idx}
                                  className="p-10 border border-white/5 bg-[#002480]/80 rounded-2xl flex flex-col h-full border-t border-white/10 group hover:border-white/30 transition-all duration-700"
                                >
                                  <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white font-mono text-sm mb-8 group-hover:bg-white group-hover:text-[#002FA7] transition-all">
                                    0{idx + 1}
                                  </div>
                                  <h4 className="font-display font-bold text-white text-2xl mb-1">
                                    {p.name}
                                  </h4>
                                  <span className="text-[11px] font-mono text-white/50 tracking-widest mb-6 block">
                                    {p.handicap}
                                  </span>
                                  <p className="text-base text-white/60 font-light leading-relaxed mb-8">
                                    {p.needs}
                                  </p>
                                  <div className="mt-auto pt-6 border-t border-white/5 space-y-3 opacity-60 group-hover:opacity-100 transition-opacity">
                                    <p className="text-[10px] tracking-widest text-white/50">
                                      Challenges:
                                    </p>
                                    <p className="text-xs italic text-white/50 group-hover:text-white/70">
                                      {p.challenge}
                                    </p>
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        </section>

                        {/* DAY 3: MOCKUPS */}
                        <section
                          ref={(el) => {
                            dayRefs.current[2] = el;
                          }}
                          data-index="2"
                          className="space-y-16"
                        >
                          <div className="space-y-4">
                            <span className="text-[10px] font-mono text-white/40 tracking-[0.4em]">
                              {t.day3}
                            </span>
                            <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter">
                              Mockups & Plans
                            </h2>
                            <p className="text-xl text-white/60 font-light leading-relaxed max-w-2xl italic">
                              {t.day3Desc}
                            </p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-8">
                              <span className="text-[10px] font-mono text-white/40 tracking-widest">
                                {t.planBefore}
                              </span>
                              <div className="aspect-[4/3] bg-[#002480] rounded-2xl overflow-hidden border border-white/10 group relative">
                                <img
                                  src={selectedProject.gallery?.[0]}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-contain grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1500ms]"
                                />
                              </div>
                            </div>
                            <div className="space-y-8">
                              <span className="text-[10px] font-mono text-white/40 tracking-widest">
                                {t.planAfter}
                              </span>
                              <div className="aspect-[4/3] bg-[#002480] rounded-2xl overflow-hidden border border-white/10 group relative">
                                <img
                                  src={selectedProject.gallery?.[1]}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-contain grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1500ms]"
                                />
                              </div>
                            </div>
                          </div>
                        </section>

                        {/* DAY 4: PROTOTYPING */}
                        <section
                          ref={(el) => {
                            dayRefs.current[3] = el;
                          }}
                          data-index="3"
                          className="space-y-16"
                        >
                          <div className="space-y-4">
                            <span className="text-[10px] font-mono text-white/40 tracking-[0.4em]">
                              {t.day4}
                            </span>
                            <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter">
                              Prototypage FabLab
                            </h2>
                            <p className="text-xl text-white/60 font-light leading-relaxed max-w-2xl italic">
                              {t.day4Desc}
                            </p>
                          </div>
                          <div className="w-full aspect-video bg-[#002480] rounded-2xl overflow-hidden border border-white/10 group relative">
                            <img
                              src="https://picsum.photos/1920/1080?grayscale&random=proto"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1500ms]"
                            />
                          </div>
                        </section>

                        {/* DAY 5: FINAL DELIVERABLE */}
                        <section
                          ref={(el) => {
                            dayRefs.current[4] = el;
                          }}
                          data-index="4"
                          className="space-y-16"
                        >
                          <div className="space-y-4">
                            <span className="text-[10px] font-mono text-white/40 tracking-[0.4em]">
                              {t.dayFinal}
                            </span>
                            <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter">
                              Revue Client & Livrable
                            </h2>
                            <p className="text-xl text-white/60 font-light leading-relaxed max-w-2xl italic">
                              {t.dayFinalDesc}
                            </p>
                          </div>
                          <div className="w-full aspect-video bg-[#002480] rounded-2xl overflow-hidden border border-white/10 group relative">
                            <div className="absolute inset-0 bg-[#002FA7]/30 group-hover:bg-transparent transition-all z-10"></div>
                            <img
                              src={selectedProject.gallery?.[3]}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1500ms]"
                            />
                            <div className="absolute bottom-10 left-10 z-20">
                              <span className="text-[11px] font-mono text-white/50 tracking-[0.6em]">
                                Livrable Final // CY Tech // 2024
                              </span>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  ) : selectedProject.pdfUrl ? (
                    <div className="w-full flex flex-col items-center gap-12">
                      <p className="font-display font-light text-xl md:text-2xl text-white/80 leading-relaxed max-w-xl text-center">
                        {selectedProject.description[lang]}
                      </p>
                      <div className="w-full max-w-5xl h-[80vh] bg-[#002480] rounded-2xl overflow-hidden border border-white/10">
                        <iframe
                          src={selectedProject.pdfUrl}
                          className="w-full h-full border-none"
                          title="Project PDF"
                          allow="autoplay"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex flex-col items-center gap-24">
                      <p className="font-display font-light text-xl md:text-2xl text-white/80 leading-relaxed max-w-xl text-center">
                        {selectedProject.description[lang]}
                      </p>
                      <div className="w-full max-w-[700px] space-y-24">
                        {selectedProject.gallery?.map((imgUrl, idx) => (
                          <div key={idx} className="w-full group">
                            <div className="relative w-full overflow-hidden bg-[#002480] rounded-lg">
                              <img
                                src={imgUrl}
                                referrerPolicy="no-referrer"
                                alt={`Gallery item ${idx}`}
                                className="w-full h-auto grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="w-full mt-0 md:mt-0 relative h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-[#002FA7]">
                    <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
                    <div className="absolute inset-0 z-0">
                      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-white/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2"></div>
                    </div>
                    
                    <div className="relative z-10 flex flex-col items-center px-4">
                      <h2 className="text-5xl md:text-8xl font-display font-medium tracking-tight text-white mb-12 text-center uppercase">
                        <span className="block overflow-hidden"><motion.span initial={{y: "110%"}} whileInView={{y:0}} transition={{duration: 0.8, ease: [0.16,1,0.3,1]}} className="block">{lang === 'fr' ? 'Fin du' : 'End of'}</motion.span></span>
                        <span className="block overflow-hidden pb-4"><motion.span initial={{y: "110%"}} whileInView={{y:0}} transition={{delay: 0.1, duration: 0.8, ease: [0.16,1,0.3,1]}} className="block text-white/50">{lang === 'fr' ? 'Projet' : 'Project'}</motion.span></span>
                      </h2>
                      <button
                        onClick={handleClose}
                        className="group relative overflow-hidden px-10 py-5 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-500"
                        data-magnetic
                      >
                        <div className="absolute inset-0 bg-black/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                        <span className="relative z-10 text-sm font-mono font-bold uppercase tracking-[0.2em] text-[#002FA7]">
                          {t.back}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            </div>

            {/* FIXED CLOSE BUTTON - OUTSIDE SCROLL AREA */}
            <div className={`fixed top-6 right-6 md:top-8 md:right-10 z-[500]`}>
              <button
                onClick={handleClose}
                className="group relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-[#002FA7] rounded-full shadow-2xl hover:scale-110 transition-all duration-300 pointer-events-auto border border-white/20"
                data-magnetic
              >
                <div className="relative w-5 h-5 md:w-6 md:h-6">
                  <span className="absolute top-1/2 left-0 w-full h-[2px] transform -rotate-45 bg-white transition-transform duration-500 group-hover:rotate-[-135deg]"></span>
                  <span className="absolute top-1/2 left-0 w-full h-[2px] transform rotate-45 bg-white transition-transform duration-500 group-hover:rotate-[135deg]"></span>
                </div>
              </button>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
