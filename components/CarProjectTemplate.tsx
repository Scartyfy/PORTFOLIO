import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { Maximize2, X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { CONCEPT_CARS, ConceptCarData } from './carProjectData';

interface CarProjectTemplateProps {
  lang: Language;
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
  onClose?: () => void;
}

export const CarProjectTemplate: React.FC<CarProjectTemplateProps> = ({
  lang,
  onClose
}) => {
  const [activeCarId, setActiveCarId] = useState<string>('concept-1');
  const [showAll, setShowAll] = useState<boolean>(false);
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);
  const [lightboxList, setLightboxList] = useState<{ src: string; title: string }[]>([]);
  const [lightboxIdx, setLightboxIdx] = useState<number>(0);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightbox) return;
      if (e.key === 'Escape') {
        setLightbox(null);
      } else if (e.key === 'ArrowRight') {
        if (lightboxList.length > 0) {
          const next = (lightboxIdx + 1) % lightboxList.length;
          setLightboxIdx(next);
          setLightbox(lightboxList[next]);
        }
      } else if (e.key === 'ArrowLeft') {
        if (lightboxList.length > 0) {
          const prev = (lightboxIdx - 1 + lightboxList.length) % lightboxList.length;
          setLightboxIdx(prev);
          setLightbox(lightboxList[prev]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox, lightboxIdx, lightboxList]);

  const openLightbox = (car: ConceptCarData, currentSrc: string) => {
    const items = [
      { src: car.poster.image, title: car.poster.title[lang] },
      { src: car.sketch.image, title: car.sketch.title[lang] },
      { src: car.photos[0].image, title: car.photos[0].title[lang] },
      { src: car.photos[1].image, title: car.photos[1].title[lang] },
      { src: car.photos[2].image, title: car.photos[2].title[lang] }
    ];
    setLightboxList(items);
    const found = items.findIndex(i => i.src === currentSrc);
    const idx = found >= 0 ? found : 0;
    setLightboxIdx(idx);
    setLightbox(items[idx]);
  };

  const displayedCars = showAll 
    ? CONCEPT_CARS 
    : CONCEPT_CARS.filter(c => c.id === activeCarId);

  const t = {
    fr: {
      projectBadge: "P/03 — PROJET AUTOMOBILE",
      headerDesc: "DESIGN AUTOMOBILE & CONCEPT CARS",
      switchLabel: "Concept :",
      viewAll: "Voir les 2 concepts",
      posterTag: "01 — Grosse Affiche de Style",
      sketchTag: "02 — Recherche & Esquisses",
      photosTag: "03 — Visuels Photographiques",
      clickZoom: "Agrandir",
      back: "Retour",
      photosSubtitle: "Galerie de 3 visuels haute définition sans artifice"
    },
    en: {
      projectBadge: "P/03 — AUTOMOTIVE PROJECT",
      headerDesc: "AUTOMOTIVE DESIGN & CONCEPT CARS",
      switchLabel: "Concept:",
      viewAll: "View both concepts",
      posterTag: "01 — Styling Poster",
      sketchTag: "02 — Styling Sketches",
      photosTag: "03 — Photographic Visuals",
      clickZoom: "Zoom",
      back: "Back",
      photosSubtitle: "Gallery of 3 high-definition visuals without extra text"
    }
  }[lang];

  return (
    <div className="w-full bg-[#F5F5F3] text-[#002FA7] min-h-screen relative font-sans selection:bg-[#002FA7] selection:text-white pb-32">
      {/* Global Noise Overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-[100] opacity-[0.035] mix-blend-darken" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* Floating Close / Back button */}
      {onClose && (
        <button
          onClick={onClose}
          className="fixed top-6 right-6 md:top-8 md:right-8 z-50 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-[#002FA7] border border-[#002FA7]/20 shadow-lg backdrop-blur-md text-xs font-mono tracking-widest uppercase transition-all hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.back}</span>
        </button>
      )}

      {/* ========================================================================= */}
      {/* EN-TÊTE ÉPURÉ & NAVIGATION ENTRE LES 2 CONCEPT CARS                      */}
      {/* ========================================================================= */}
      <header className="w-full pt-8 md:pt-12 pb-8 px-6 md:px-12 border-b border-[#002FA7]/10 bg-[#F5F5F3]/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs font-bold tracking-widest uppercase px-2.5 py-1 bg-[#002FA7]/10 rounded-md">
                {t.projectBadge}
              </span>
              <span className="font-mono text-xs tracking-wider text-[#002FA7]/60">
                2 CONCEPT CARS
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight uppercase text-[#002FA7]">
              {!showAll ? displayedCars[0]?.name : 'LOBSTER CAR & VORTEX'}
            </h1>
          </div>

          {/* Switcher 2 Concept Cars */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#002FA7]/60 mr-1 hidden sm:inline">
              {t.switchLabel}
            </span>
            {CONCEPT_CARS.map((car, idx) => {
              const isActive = !showAll && activeCarId === car.id;
              return (
                <button
                  key={car.id}
                  onClick={() => {
                    setShowAll(false);
                    setActiveCarId(car.id);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all font-semibold ${
                    isActive
                      ? 'bg-[#002FA7] text-white shadow-md'
                      : 'bg-white text-[#002FA7] border border-[#002FA7]/20 hover:bg-[#002FA7]/5'
                  }`}
                >
                  0{idx + 1} — {car.name.split('—')[0].trim()}
                </button>
              );
            })}
            <button
              onClick={() => setShowAll(true)}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all font-semibold ${
                showAll
                  ? 'bg-[#002FA7] text-white shadow-md'
                  : 'bg-white text-[#002FA7] border border-[#002FA7]/20 hover:bg-[#002FA7]/5'
              }`}
            >
              {t.viewAll}
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* CORPS : LES CONCEPT CARS AVEC LA STRUCTURE DEMANDÉE :                     */}
      {/* 1. Grosse affiche avec texte descriptif                                   */}
      {/* 2. Photo avec des sketch et texte à côté                                  */}
      {/* 3. Uniquement des visuels photos (3) sans texte superflu qui servent à rien*/}
      {/* ========================================================================= */}
      <main className="max-w-[1500px] mx-auto px-6 md:px-12 py-10 md:py-16 space-y-32 md:space-y-44">
        {displayedCars.map((car) => (
          <article key={car.id} className="relative">
            
            {/* Header du Concept spécifique */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-10 pb-4 border-b border-[#002FA7]/20">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-2xl md:text-3xl font-bold text-[#002FA7]/50">
                  {car.code}
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-[#002FA7]">
                  {car.name}
                </h2>
              </div>
              <span className="text-xs sm:text-sm font-mono text-[#002FA7]/70 uppercase tracking-widest font-medium">
                {car.tagline[lang]}
              </span>
            </div>

            {/* =================================================================== */}
            {/* 1. GROSSE AFFICHE AVEC TEXTE DESCRIPTIF                             */}
            {/* =================================================================== */}
            <section className="mb-20 md:mb-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-[#002FA7]" />
                <span className="text-xs font-mono uppercase tracking-widest font-bold text-[#002FA7]/80">
                  {t.posterTag}
                </span>
              </div>

              {/* Conteneur Grosse Affiche */}
              <div 
                onClick={() => openLightbox(car, car.poster.image)}
                className="w-full relative group cursor-zoom-in rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-white shadow-[0_25px_60px_rgba(0,47,167,0.1)] border border-[#002FA7]/15 p-3 sm:p-6 md:p-8 flex items-center justify-center transition-all duration-300 hover:border-[#002FA7]/30"
              >
                <div className="relative w-full flex items-center justify-center rounded-xl sm:rounded-2xl overflow-hidden bg-[#0A0A0A]/[0.02] min-h-[300px] sm:min-h-[480px] md:min-h-[620px]">
                  <img
                    src={car.poster.image}
                    alt={car.poster.title[lang]}
                    className="w-full max-w-[1050px] h-auto max-h-[82vh] object-contain rounded-xl transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-[1.01]"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-[#002FA7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />
                  
                  {/* Badge Zoom */}
                  <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 px-4 py-2 rounded-full bg-white/95 text-[#002FA7] text-xs font-mono uppercase tracking-wider shadow-lg backdrop-blur-md opacity-90 group-hover:opacity-100 transition-all flex items-center gap-2">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>{t.clickZoom}</span>
                  </div>
                </div>
              </div>

              {/* Texte Descriptif sous la grosse affiche */}
              <div className="max-w-4xl mt-6 md:mt-8">
                <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase text-[#002FA7] mb-3">
                  {car.poster.title[lang]}
                </h3>
                <p className="text-base sm:text-lg md:text-xl font-light text-[#002FA7]/85 leading-relaxed">
                  {car.poster.description[lang]}
                </p>
              </div>
            </section>

            {/* =================================================================== */}
            {/* 2. PHOTO AVEC DES SKETCH ET TEXTE A COTE                            */}
            {/* =================================================================== */}
            <section className="mb-20 md:mb-28 pt-10 border-t border-[#002FA7]/15">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[2px] bg-[#002FA7]" />
                <span className="text-xs font-mono uppercase tracking-widest font-bold text-[#002FA7]/80">
                  {t.sketchTag}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                {/* Photo avec des sketch */}
                <div className="lg:col-span-7">
                  <div
                    onClick={() => openLightbox(car, car.sketch.image)}
                    className="w-full relative group cursor-zoom-in rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-white shadow-[0_20px_50px_rgba(0,47,167,0.08)] border border-[#002FA7]/15 p-2 sm:p-4 transition-all duration-300 hover:border-[#002FA7]/30"
                  >
                    <div className="relative w-full aspect-[16/10] overflow-hidden flex items-center justify-center bg-black/5 rounded-xl sm:rounded-2xl min-h-[250px] sm:min-h-[340px]">
                      <img
                        src={car.sketch.image}
                        alt={car.sketch.title[lang]}
                        className="w-full h-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105"
                        loading="eager"
                      />
                      <div className="absolute inset-0 bg-[#002FA7]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl sm:rounded-2xl" />
                      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 px-4 py-2 rounded-full bg-white/95 text-[#002FA7] text-xs font-mono uppercase tracking-wider shadow-lg backdrop-blur-md opacity-90 group-hover:opacity-100 transition-all flex items-center gap-2">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>{t.clickZoom}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Texte à côté */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#002FA7]/60 block mb-2 font-bold">
                    {car.sketch.caption[lang]}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase text-[#002FA7] mb-4">
                    {car.sketch.title[lang]}
                  </h3>
                  <p className="text-base sm:text-lg font-light text-[#002FA7]/85 leading-relaxed mb-6">
                    {car.sketch.text[lang]}
                  </p>
                  
                  {/* Puces de recherche stylistique */}
                  {car.sketch.bullets && car.sketch.bullets[lang] && (
                    <ul className="space-y-2.5 pt-2 border-t border-[#002FA7]/10">
                      {car.sketch.bullets[lang].map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm font-mono text-[#002FA7]/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#002FA7] mt-1.5 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </section>

            {/* =================================================================== */}
            {/* 3. UNIQUEMENT DES VISUELS PHOTOS (3) - SANS TEXTE SUPERFLU         */}
            {/* =================================================================== */}
            <section className="pt-10 border-t border-[#002FA7]/15">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-[#002FA7]" />
                  <span className="text-xs font-mono uppercase tracking-widest font-bold text-[#002FA7]/80">
                    {t.photosTag}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#002FA7]/50 uppercase tracking-wider hidden sm:inline">
                  {t.photosSubtitle}
                </span>
              </div>

              {/* 3 Visuels Photos purs, sans texte superflu */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {car.photos.map((photo, pIdx) => (
                  <div
                    key={photo.id}
                    onClick={() => openLightbox(car, photo.image)}
                    className="w-full relative group cursor-zoom-in rounded-[1.5rem] overflow-hidden bg-white shadow-[0_15px_40px_rgba(0,47,167,0.08)] border border-[#002FA7]/15 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,47,167,0.15)]"
                  >
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-black/5 flex items-center justify-center min-h-[220px]">
                      <img
                        src={photo.image}
                        alt={`Photo 0${pIdx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105"
                        loading="eager"
                      />
                      <div className="absolute inset-0 bg-[#002FA7]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      
                      {/* Numéro & Zoom indicator */}
                      <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-black/40 text-white text-[10px] font-mono tracking-wider backdrop-blur-sm">
                        VISUEL 0{pIdx + 1}
                      </div>

                      <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-white/95 text-[#002FA7] text-[11px] font-mono uppercase tracking-wider shadow-md backdrop-blur-md opacity-90 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
                        <Maximize2 className="w-3 h-3" />
                        <span>{t.clickZoom}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </article>
        ))}
      </main>

      {/* ========================================================================= */}
      {/* LIGHTBOX PLEIN ÉCRAN                                                     */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 md:p-8"
            onClick={() => setLightbox(null)}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between w-full" onClick={(e) => e.stopPropagation()}>
              <span className="text-xs font-mono text-white/60 tracking-widest uppercase">
                {lightboxIdx + 1} / {lightboxList.length}
              </span>
              <button
                onClick={() => setLightbox(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95"
                title="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Image */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={lightbox.src}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                src={lightbox.src}
                alt={lightbox.title}
                className="max-h-[84vh] max-w-[94vw] object-contain rounded-xl select-none shadow-2xl"
              />

              {lightboxList.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const prev = (lightboxIdx - 1 + lightboxList.length) % lightboxList.length;
                      setLightboxIdx(prev);
                      setLightbox(lightboxList[prev]);
                    }}
                    className="absolute left-2 md:left-6 w-12 h-12 rounded-full bg-black/40 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all backdrop-blur-sm"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const next = (lightboxIdx + 1) % lightboxList.length;
                      setLightboxIdx(next);
                      setLightbox(lightboxList[next]);
                    }}
                    className="absolute right-2 md:right-6 w-12 h-12 rounded-full bg-black/40 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all backdrop-blur-sm"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Caption */}
            <div className="w-full text-center" onClick={(e) => e.stopPropagation()}>
              <h4 className="text-sm md:text-base font-medium text-white mb-1">
                {lightbox.title}
              </h4>
              <p className="text-[11px] font-mono text-white/40 tracking-wider">
                Utilisez ← et → pour naviguer · Échap pour fermer
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Close */}
      <div className="w-full py-16 border-t border-[#002FA7]/10 flex justify-center">
        {onClose && (
          <button
            onClick={onClose}
            className="px-8 py-3.5 rounded-full bg-[#002FA7] text-white hover:bg-[#002FA7]/90 text-xs font-mono uppercase tracking-widest transition-all shadow-xl hover:scale-105 active:scale-95"
          >
            {t.back}
          </button>
        )}
      </div>
    </div>
  );
};
