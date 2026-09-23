import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  AnimatePresence,
  useMotionValueEvent,
} from "motion/react";
import { Language } from "../types";
import { Target, BarChart2, ArrowRight, ArrowDownRight } from "lucide-react";
import { getProjectData } from "./projectContentData";
import { CarProjectTemplate } from "./CarProjectTemplate";

const MarqueeText = ({ children, direction = 1 }: { children: React.ReactNode, direction?: number }) => (
  <div className="w-full flex overflow-hidden whitespace-nowrap opacity-[0.03] pointer-events-none select-none">
     <motion.div
         animate={{ x: direction > 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
         transition={{ ease: "linear", duration: 30, repeat: Infinity }}
         className="text-[20vw] font-display font-bold uppercase leading-none tracking-tighter shrink-0"
     >
       {children} {children} {children} {children}
     </motion.div>
  </div>
);

const SkillRow = ({ label, text, index, details, image, images, quotes, theme = "dark" }: {label: string, text: string, index: number, details?: string, image?: string, images?: {src: string | string[], label: string}[], quotes?: {text: string, author: string}[], theme?: "light" | "dark"}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className={`w-full py-12 md:py-24 flex flex-col gap-8 md:gap-12 relative overflow-hidden ${theme === "light" ? "bg-white text-[#002FA7] rounded-[2rem] md:rounded-[3rem] px-6 md:px-16 shadow-[0_20px_60px_rgb(0,0,0,0.12)] my-8 border border-black/5" : "border-b border-white/20"}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start w-full z-10 relative">
        {/* Index */}
        <div className={`lg:col-span-1 font-mono text-sm hidden lg:block pt-4 ${theme === "light" ? "text-[#002FA7]/40" : "text-white/40"}`}>0{index + 1}</div>
        
        {/* Content (Text/Details) */}
        <div className={`flex flex-col gap-6 ${(images && images.length > 0) || (!image && (!quotes || quotes.length === 0)) ? "lg:col-span-11" : "lg:col-span-5 lg:pr-8"}`}>
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">
             <div className="flex-1">
               <h3 className="text-3xl md:text-5xl lg:text-6xl font-display font-medium uppercase tracking-tight">
                 {label}
               </h3>
               <div className={`w-full h-[1px] hidden md:block my-2 ${theme === "light" ? "bg-[#002FA7]/10" : "bg-white/10"}`} />
               <h4 className={`text-xl md:text-2xl font-light css-typing ${theme === "light" ? "text-[#002FA7]" : "text-white"}`}>
                 {text}
               </h4>
             </div>
             {details && images && images.length > 0 && (
               <div className="flex-1 md:max-w-xl">
                 <p className={`text-lg md:text-xl font-light leading-relaxed ${theme === "light" ? "text-[#002FA7]/70" : "text-white/70"}`}>
                   {details}
                 </p>
               </div>
             )}
           </div>

           {details && (!images || images.length === 0) && (
             <div className="mt-4 md:mt-8">
               <div className={`w-12 h-[2px] mb-6 ${theme === "light" ? "bg-[#002FA7]/50" : "bg-white/50"}`}></div>
               <p className={`text-lg md:text-xl font-light leading-relaxed ${theme === "light" ? "text-[#002FA7]/70" : "text-white/70"}`}>
                 {details}
               </p>
             </div>
           )}

           {images && images.length > 0 && (
            <div className={`w-full grid ${images.length === 1 ? 'grid-cols-1 md:w-3/4 md:mx-auto' : images.length === 2 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'} gap-12 lg:gap-16 items-stretch mt-12`}>
               {images.map((img, iIdx) => (
                 <div key={iIdx} className={`w-full relative flex flex-col items-center justify-start gap-8 group ${theme === "light" ? "bg-black/[0.02] rounded-[2rem] p-8 border border-black/[0.03]" : ""}`}>
                   {Array.isArray(img.src) ? (
                     <div className="w-full flex flex-col items-center justify-center gap-4 md:gap-8 h-full">
                       {img.src.map((s, sIdx) => (
                         <div key={sIdx} className="w-full relative overflow-hidden rounded-2xl shadow-xl border border-black/5">
                           <img src={s} referrerPolicy="no-referrer" className="w-full h-auto object-contain transition-transform duration-700 hover:scale-105" alt={`${img.label} ${sIdx}`} />
                         </div>
                       ))}
                     </div>
                   ) : (
                      <div className="w-full flex justify-center items-center h-full">
                        <div className={`relative overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-black/5 ${img.label === 'Vue Public' ? 'w-4/5 md:w-[90%] lg:w-[85%]' : 'w-full'}`}>
                          <img src={img.src as string} referrerPolicy="no-referrer" className="w-full h-auto object-contain transition-transform duration-700 hover:scale-105" alt={img.label} />
                        </div>
                      </div>
                   )}
                   <div className={`bg-transparent px-4 py-2 rounded-full font-mono font-bold uppercase tracking-widest text-center mt-auto text-sm ${theme === "light" ? "text-[#002FA7] bg-[#002FA7]/5" : "text-white bg-white/10"}`}>
                     {img.label}
                   </div>
                 </div>
               ))}
            </div>
           )}
        </div>

        {/* Image / Visual for single image */}
        {(!images || images.length === 0) && (image || (quotes && quotes.length > 0)) && (
          <div className="lg:col-span-6 w-full flex flex-col h-full">
            {image ? (
            <div className="w-full relative overflow-hidden rounded-2xl bg-white/5 aspect-[4/3] lg:aspect-auto lg:h-full min-h-[300px]">
              <img src={image} referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] hover:scale-105" alt={label} />
              <div className="absolute inset-0 bg-[#002FA7]/10 mix-blend-multiply transition-opacity duration-700 hover:opacity-0" />
              <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.2)] pointer-events-none" />
            </div>
          ) : quotes ? (
            <div className="w-full relative overflow-hidden rounded-2xl border border-white/10 flex items-center justify-center p-8 aspect-[4/3] lg:aspect-auto lg:h-full min-h-[300px] bg-black/20">
               <div className="absolute inset-0 flex flex-col" style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}>
                 <motion.div
                   animate={{ y: ["0%", "-50%"] }}
                   transition={{ ease: "linear", duration: 40, repeat: Infinity }}
                   className="flex flex-col gap-6 w-full py-8"
                 >
                    {[...quotes, ...quotes].map((quote, qIdx) => (
                      <div key={qIdx} className="bg-white/5 border border-white/10 p-6 rounded-xl flex flex-col gap-4 backdrop-blur-sm w-11/12 mx-auto">
                         <p className={`text-lg italic font-light leading-relaxed ${theme === "light" ? "text-[#002FA7]/80" : "text-white/80"}`}>« {quote.text} »</p>
                         <p className={`text-sm font-medium self-end uppercase tracking-wider ${theme === "light" ? "text-[#002FA7]/50" : "text-white/50"}`}>— {quote.author}</p>
                      </div>
                    ))}
                 </motion.div>
               </div>
            </div>
          ) : (
            <div className="w-full relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center p-8 aspect-[4/3] lg:aspect-auto lg:h-full min-h-[300px]">
               <div className="w-full h-full border border-white/10 border-dashed rounded-xl flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/20">
                     0{index + 1}
                  </div>
               </div>
            </div>
          )}
        </div>
        )}
      </div>
    </motion.div>
  );
};

const RevealTitle = ({ children }: { children: string }) => {
  return (
    <div className="overflow-hidden inline-block pr-2 pb-4 -mb-4">
      <motion.div
        initial={{ y: "110%", rotate: 5 }}
        whileInView={{ y: 0, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="origin-top-left inline-block"
      >
        {children}
      </motion.div>
    </div>
  );
};

export const ProjectTemplate: React.FC<{
  projectId: string;
  lang: Language;
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
  onClose?: () => void;
}> = ({ projectId, lang, scrollContainerRef, onClose }) => {
  if (projectId === 'p3') {
    return <CarProjectTemplate lang={lang} scrollContainerRef={scrollContainerRef} onClose={onClose} />;
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const data = getProjectData(projectId, lang);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    container: scrollContainerRef,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
  });

  const heroImageY = useTransform(smoothProgress, [0, 0.2], ["0%", "30%"]);
  const heroImageScale = useTransform(smoothProgress, [0, 0.2], [1, 1.1]);
  const heroTextY = useTransform(smoothProgress, [0, 0.2], ["0%", "50%"]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#F5F5F3] text-[#002FA7] min-h-screen relative font-sans selection:bg-[#002FA7] selection:text-white"
    >
      {/* Global Noise Overlay */}
      <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.04] mix-blend-darken" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Brutalist Hero Section with Parallax */}
      <section className="relative w-full min-h-screen pt-2 md:pt-4 pb-12 px-4 md:px-8 flex flex-col justify-between overflow-hidden">
        <div className="w-full relative z-10">
          {/* Content Top */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative pointer-events-none pt-12 md:pt-16">
            <div className="md:col-span-3 flex flex-col gap-8 md:gap-20">
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight overflow-hidden pb-2 -mb-2">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    delay: 0.2,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="block"
                >
                  P/0{projectId.replace("p", "")} — Project
                </motion.span>
              </h2>
              {/* Arrow */}
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.4,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="hidden md:block w-20 h-20 origin-center"
              >
                <svg
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path d="M10 10 L80 80" stroke="#002FA7" strokeWidth="6" />
                  <path
                    d="M85 30 L85 85 L30 85"
                    stroke="#002FA7"
                    strokeWidth="6"
                    fill="none"
                    strokeLinejoin="miter"
                  />
                </svg>
              </motion.div>
            </div>

            <div className="md:col-span-4 mt-8 md:mt-0">
              <h3 className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] font-medium tracking-tight">
                {data.headerDesc
                  .split(" & ")
                  .map((line: string, i: number, arr: any[]) => (
                    <div key={i} className="overflow-hidden pb-1 -mb-1">
                      <motion.div
                        initial={{ y: "110%", clipPath: "inset(0 0 100% 0)" }}
                        animate={{ y: 0, clipPath: "inset(0 0 0% 0)" }}
                        transition={{
                          delay: 0.1 * i + 0.5,
                          duration: 1.2,
                          ease: [0.76, 0, 0.24, 1],
                        }}
                      >
                        {line}
                        {i < arr.length - 1 && <>&nbsp;&amp;</>}
                      </motion.div>
                    </div>
                  ))}
              </h3>
            </div>

            <div className="md:col-span-5 flex justify-start md:justify-end mt-4 md:mt-0">
            </div>
          </div>
        </div>

        {/* Massive Title */}
        <motion.div
          style={{ y: heroTextY }}
          className="w-full text-right mt-16 md:-mt-12 md:mb-4 relative z-20 mix-blend-difference text-white pointer-events-none"
        >
          <h1 className="text-[15vw] md:text-[13vw] font-display font-medium tracking-tighter leading-[0.8] uppercase whitespace-nowrap">
            {data.title.split(" ").map((word: string, i: number) => (
              <RevealTitle key={i}>{word}</RevealTitle>
            ))}
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-[4vw] align-top ml-2 inline-block text-white mix-blend-normal"
            >
              ©
            </motion.span>
          </h1>
        </motion.div>

        {/* Bottom Content & Main Image */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-16 md:mt-0 items-stretch flex-grow z-10 relative">
          {/* Left Metadata Column */}
          <div className="md:col-span-3 flex flex-col justify-start pt-4 md:pt-8 pb-0 md:pb-4 gap-8 md:gap-16 text-[#002FA7]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-base md:text-lg pr-4 md:pr-8 leading-relaxed font-bold whitespace-pre-wrap">
                {data.subtitle}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h4 className="font-sans text-xs md:text-sm font-bold uppercase tracking-widest mb-2 md:mb-4">
                Context
              </h4>
              <p className="text-base md:text-lg pr-4 md:pr-8 leading-relaxed max-w-sm font-bold whitespace-pre-wrap">
                {data.contextText}
              </p>
            </motion.div>
          </div>

          {/* Large Image Area */}
          <div className="md:col-span-9 relative w-full h-full flex items-end">
            <motion.div
              initial={{
                clipPath: "inset(100% 0 0 0)",
              }}
              animate={{
                clipPath: "inset(0% 0 0 0)",
              }}
              transition={{
                delay: 0.2,
                duration: 1.4,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="w-full aspect-[4/3] md:aspect-[21/9] relative z-20 overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-[#002FA7]/10 z-10 pointer-events-none mix-blend-multiply" />
              <motion.img
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                style={{ y: heroImageY, scale: heroImageScale }}
                transition={{
                  delay: 0.2,
                  duration: 1.4,
                  ease: [0.76, 0, 0.24, 1],
                }}
                src={data.images.heroBg}
                alt={data.title}
                className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover contrast-[1.1] saturate-50 origin-center"
              />
            </motion.div>
          </div>
        </div>
      </section>

    

      {/* Concept Section */}
      {data.concept && (
        <section className="relative w-full py-32 md:py-48 px-4 md:px-8 bg-[#002FA7] text-white overflow-hidden">
          {/* Subtle Background Typography */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden pointer-events-none opacity-[0.03]">
            <span className="text-[25vw] font-display font-bold leading-none whitespace-nowrap">CONCEPT CONCEPT</span>
          </div>

          <div className="max-w-[1500px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32 items-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="w-full lg:w-5/12 flex flex-col gap-8"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-[2px] bg-white"></div>
                <span className="font-mono text-sm uppercase tracking-widest font-bold">L'Idée Fondatrice</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-medium tracking-tight uppercase leading-[0.9]">
                {data.concept.title || "Le Concept"}
              </h2>
              <div className="text-lg md:text-xl font-light leading-relaxed text-white/80 whitespace-pre-wrap mt-4">
                {data.concept.text}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="w-full lg:w-7/12 relative"
            >
              <div className="relative w-full max-w-2xl mx-auto">
                <div className="absolute -inset-8 bg-white/5 rounded-[3rem] transform -rotate-2 transition-transform duration-700 hover:rotate-0 hidden md:block"></div>
                <div className="relative rounded-[2rem] overflow-hidden bg-white shadow-[0_20px_60px_rgb(0,0,0,0.08)] p-6 md:p-12 border border-black/5">
                  <img 
                    src={data.concept.image} 
                    alt="Concept" 
                    referrerPolicy="no-referrer"
                    className="w-4/5 lg:w-[60%] mx-auto h-auto object-contain transition-transform duration-1000 hover:scale-105" 
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Marquee Separator */}
      {data.concept && data.skills && (
        <div className="w-full py-6 bg-white border-y border-[#002FA7]/10 overflow-hidden flex relative z-20">
          <motion.div
             animate={{ x: ["0%", "-50%"] }}
             transition={{ ease: "linear", duration: 120, repeat: Infinity }}
             className="text-2xl md:text-4xl font-display font-light uppercase tracking-widest text-[#002FA7] whitespace-nowrap flex shrink-0 items-center gap-12"
          >
            <span>COMPÉTENCES APPLIQUÉES</span>
            <span className="w-3 h-3 rounded-full bg-[#002FA7]/30"></span>
            <span>COMPÉTENCES APPLIQUÉES</span>
            <span className="w-3 h-3 rounded-full bg-[#002FA7]/30"></span>
            <span>COMPÉTENCES APPLIQUÉES</span>
            <span className="w-3 h-3 rounded-full bg-[#002FA7]/30"></span>
            <span>COMPÉTENCES APPLIQUÉES</span>
            <span className="w-3 h-3 rounded-full bg-[#002FA7]/30"></span>
            <span>COMPÉTENCES APPLIQUÉES</span>
            <span className="w-3 h-3 rounded-full bg-[#002FA7]/30"></span>
            <span>COMPÉTENCES APPLIQUÉES</span>
            <span className="w-3 h-3 rounded-full bg-[#002FA7]/30"></span>
            <span>COMPÉTENCES APPLIQUÉES</span>
            <span className="w-3 h-3 rounded-full bg-[#002FA7]/30"></span>
            <span>COMPÉTENCES APPLIQUÉES</span>
            <span className="w-3 h-3 rounded-full bg-[#002FA7]/30"></span>
            <span>COMPÉTENCES APPLIQUÉES</span>
            <span className="w-3 h-3 rounded-full bg-[#002FA7]/30"></span>
            <span>COMPÉTENCES APPLIQUÉES</span>
            <span className="w-3 h-3 rounded-full bg-[#002FA7]/30"></span>
          </motion.div>
        </div>
      )}

      {/* Interactive Skills Accordion */}
      {data.skills && (
        <section className="relative w-full py-32 md:py-48 px-4 md:px-8 bg-[#002FA7] text-white">
          <div className="max-w-[1500px] mx-auto">
            <div className="w-full border-t border-white/20 flex flex-col">
              {(data.skillsList || [
                { label: data.skills.col1Label, text: data.skills.col1Text },
                { label: data.skills.col2Label, text: data.skills.col2Text },
                { label: data.skills.col3Label, text: data.skills.col3Text },
              ]).map((skill: any, idx: number) => (
                <SkillRow 
                  key={idx} 
                  label={skill.label} 
                  text={skill.text} 
                  details={skill.details} 
                  image={skill.image} 
                  images={skill.images}
                  quotes={skill.quotes}
                  index={idx} 
                  theme={skill.label === "Interface UX/UI" || skill.label === "Interface UX UI" ? "light" : "dark"}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Post Research Text */}
      {data.postResearchText && (
        <section className="relative w-full py-20 md:py-32 px-6 md:px-12 bg-white text-[#002FA7]">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-8 md:gap-24 px-4 md:px-8">
            {data.postResearchText.startsWith("Constat :") ? (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="md:w-1/3 flex flex-col pt-2 md:border-l-4 md:border-[#002FA7] md:pl-8"
                >
                  <h2 className="text-3xl md:text-5xl font-medium font-display tracking-tight uppercase">
                    Constat
                  </h2>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="md:w-2/3 text-lg md:text-xl lg:text-2xl font-light text-[#002FA7]/80 leading-[1.6] whitespace-pre-wrap"
                >
                  {data.postResearchText.replace('Constat :\n\n', '').split("l'agent TER").map((part: string, index: number, array: string[]) => (
                    <span key={index}>
                      {part}
                      {index < array.length - 1 && <strong className="font-bold">l'agent TER</strong>}
                    </span>
                  ))}
                </motion.p>
              </>
            ) : (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full text-lg md:text-xl lg:text-2xl font-light text-[#002FA7]/80 leading-[1.6] whitespace-pre-wrap text-center"
              >
                {data.postResearchText}
              </motion.p>
            )}
          </div>
        </section>
      )}

      {/* Process Steps */}
      {data.steps && data.steps.length > 0 && (
        <VerticalProcess steps={data.steps} title={data.processTitle} />
      )}

      {/* PDF Document Viewer (if provided) */}
      {data.pdfUrl && (
        <section className="relative w-full py-20 px-4 md:px-8 bg-[#F5F5F3]">
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-12">
            <h2 className="text-3xl md:text-5xl font-medium font-display tracking-tight text-[#002FA7] uppercase">
              Document Embed
            </h2>
            <div className="w-full h-[80vh] md:h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl border border-[#002FA7]/10">
              <iframe
                src={data.pdfUrl}
                className="w-full h-full border-none"
                title="Project Document"
                allow="autoplay"
              />
            </div>
          </div>
        </section>
      )}

      {/* End of Project Trigger */}
      <div className="w-full h-[5vh] bg-[#F5F5F3]" />
      <motion.div 
        onViewportEnter={() => onClose && onClose()}
        className="w-full h-1"
        viewport={{ margin: "100px" }}
      />
    </div>
  );
};

const HorizontalScrollProcess = ({
  steps,
  title,
  scrollContainerRef,
}: {
  steps: any[];
  title: string;
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef, container: scrollContainerRef });
  
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const skewX = useTransform(smoothVelocity, [-1, 1], [15, -15]);

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${((steps.length - 1) * 100) / steps.length}%`],
  );

  return (
    <section
      ref={targetRef}
      className="relative bg-[#F5F5F3] text-[#002FA7]"
      style={{ height: `${steps.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center overflow-hidden pt-16 md:pt-24 pb-20 border-t border-[#002FA7]/10">
        <div className="w-full px-8 md:px-16 mb-8 flex items-center justify-between">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight uppercase flex items-center gap-6">
            {title}
          </h2>
        </div>

        <motion.div
          style={{ x, width: `${steps.length * 100}vw` }}
          className="flex h-full pb-16"
        >
          {steps.map((step: any, index: number) => (
            <div
              key={index}
              className="w-screen h-full flex items-center justify-center px-6 md:px-24"
            >
              <div className={`w-full max-w-[1500px] max-h-[80vh] ${step.image ? "grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center" : "flex flex-col items-center text-center justify-center"}`}>
                <div className={`flex flex-col justify-center ${step.image ? "order-2 md:order-1" : "max-w-4xl"}`}>
                  <h3 className="text-4xl md:text-5xl lg:text-7xl font-medium font-display mb-8 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xl md:text-2xl lg:text-3xl font-light text-[#002FA7]/80 leading-[1.6] whitespace-pre-wrap">
                    {step.desc}
                  </p>
                </div>
                {step.image && (
                  <div className={`w-full max-h-[50vh] md:max-h-[60vh] relative group order-1 md:order-2 flex flex-col sm:flex-row gap-4 ${step.image2 ? 'items-stretch lg:w-[120%] lg:-ml-[10%]' : 'items-center'}`}>
                    <div className={`flex-1 ${step.image2 ? 'aspect-[4/3]' : 'aspect-[4/3] md:aspect-square'} w-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2rem] overflow-hidden bg-white/50 p-2 md:p-4 backdrop-blur-sm border border-[#002FA7]/10 relative`}>
                      <motion.div style={{ skewX }} className="w-full h-full overflow-hidden origin-bottom rounded-xl flex items-center justify-center relative">
                        <img
                          src={step.image}
                          alt={step.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain group-hover:scale-105 transition-all duration-[1.5s] ease-[0.16,1,0.3,1]"
                        />
                      </motion.div>
                    </div>
                    {step.image2 && (
                      <div className="flex-1 aspect-[4/3] w-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2rem] overflow-hidden bg-white/50 p-2 md:p-4 backdrop-blur-sm border border-[#002FA7]/10 relative">
                        <motion.div style={{ skewX }} className="w-full h-full overflow-hidden origin-bottom rounded-xl flex items-center justify-center relative">
                          <img
                            src={step.image2}
                            alt={`${step.title} detail`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain group-hover:scale-105 transition-all duration-[1.5s] ease-[0.16,1,0.3,1]"
                          />
                        </motion.div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const VerticalProcess = ({
  steps,
  title,
}: {
  steps: any[];
  title: string;
}) => {
  return (
    <section className="relative bg-[#F5F5F3] text-[#002FA7] py-32 md:py-48 border-t border-[#002FA7]/10">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col gap-32">
        {title && (
          <div className="flex flex-col text-left mb-[-32px] md:mb-[-64px]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:border-l-4 md:border-[#002FA7] md:pl-8 px-4 md:px-0"
            >
              <h2 className="text-3xl md:text-5xl font-medium font-display tracking-tight uppercase">
                {title}
              </h2>
            </motion.div>
          </div>
        )}
        
        <div className="flex flex-col gap-24 md:gap-32 mt-8">
          {steps.map((step: any, index: number) => (
          <div key={index} className="flex flex-col gap-8 md:gap-12 w-full px-4 md:px-8">
            {(step.title || step.desc || step.blocks) && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col max-w-4xl"
              >
                {step.title && (
                  <h3 className="text-3xl md:text-5xl font-medium font-display mb-8 tracking-tight">
                    {step.title}
                  </h3>
                )}
                {step.desc && (
                  <p className="text-lg md:text-xl lg:text-2xl font-light text-[#002FA7]/80 leading-[1.6] whitespace-pre-wrap">
                    {step.desc}
                  </p>
                )}
                {step.blocks && (
                  <div className="flex flex-col md:flex-row gap-8 md:gap-16 mt-12">
                    {step.blocks.map((block: any, bIdx: number) => (
                      <div key={bIdx} className="flex-1 flex flex-col gap-4 border-l-2 border-[#002FA7]/20 pl-6 hover:border-[#002FA7] transition-colors duration-500">
                        <h4 className="text-xl md:text-2xl font-medium font-display uppercase tracking-wide">
                          {block.title}
                        </h4>
                        <p className="text-lg md:text-xl font-light text-[#002FA7]/80 leading-[1.6] whitespace-pre-wrap">
                          {block.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
            
            {step.image && (
              <div className={`w-full relative flex flex-col sm:flex-row gap-4 md:gap-8 mt-8 ${step.image2 ? 'items-start lg:w-[120%] lg:-ml-[10%]' : 'items-center'}`}>
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1 w-full flex items-center justify-center relative group"
                >
                  <div className="absolute inset-0 bg-[#002FA7]/5 rounded-3xl transform -rotate-1 transition-transform duration-500 group-hover:rotate-0 hidden md:block"></div>
                  <img
                    src={step.image}
                    alt={step.title || 'Project content image'}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-contain relative z-10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-transform duration-[1.5s] hover:scale-[1.02]"
                  />
                </motion.div>
                {step.image2 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1 w-full flex items-center justify-center relative group mt-8 md:mt-24"
                  >
                    <div className="absolute inset-0 bg-[#002FA7]/5 rounded-3xl transform rotate-1 transition-transform duration-500 group-hover:rotate-0 hidden md:block"></div>
                    <img
                      src={step.image2}
                      alt={`${step.title || 'Project detail'} detail`}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-contain relative z-10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-transform duration-[1.5s] hover:scale-[1.02]"
                    />
                  </motion.div>
                )}
              </div>
            )}
          </div>
        ))}
        </div>
      </div>
    </section>
  );
};
