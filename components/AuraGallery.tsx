import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { ArrowLeft, ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

interface AuraGalleryProps {
  lang: Language;
  onClose?: () => void;
}

const PHOTOS = [
  {
    id: 1,
    src: '/1.png',
    title: {
      fr: 'Vue Principale & Silhouette Aérodynamique',
      en: 'Main View & Aerodynamic Silhouette'
    },
    desc: {
      fr: 'Rendu d\'ensemble de face trois-quarts mettant en valeur la fluidité de la calandre active et l\'intégration aérodynamique.',
      en: 'Front three-quarter overview showcasing the fluid active grille and seamless aerodynamic integration.'
    }
  },
  {
    id: 2,
    src: '/2.png',
    title: {
      fr: 'Rendu Visuel & Proportions',
      en: 'Visual Render & Proportions'
    },
    desc: {
      fr: 'Manifeste visuel vertical détaillant les proportions géométriques, l\'assiette au sol et les lignes de force.',
      en: 'Vertical visual manifesto detailing geometric proportions, ground stance, and dynamic character lines.'
    }
  },
  {
    id: 3,
    src: '/3.png',
    title: {
      fr: 'Étude Aérodynamique & Flux CFD',
      en: 'Aerodynamic Study & CFD Airflow'
    },
    desc: {
      fr: 'Analyse numérique des flux d\'air laminaires et des zones de dépression réduisant le coefficient de traînée.',
      en: 'Numerical analysis of laminar airflow dynamics and pressure vortices optimizing the drag coefficient.'
    }
  },
  {
    id: 4,
    src: '/4.png',
    title: {
      fr: 'Habitacle Cockpit & Interface Conducteur HMI',
      en: 'Cockpit Interior & Driver HMI Interface'
    },
    desc: {
      fr: 'Conception ergonomique du poste de conduite avec instrumentation panoramique et volant à commandes haptiques.',
      en: 'Ergonomic cockpit layout featuring panoramic digital instrumentation and haptic steering wheel.'
    }
  },
  {
    id: 5,
    src: '/5.png',
    title: {
      fr: 'Châssis Modulaire & Architecture Technique',
      en: 'Modular Chassis & Technical Architecture'
    },
    desc: {
      fr: 'Structure monocoque en fibre de carbone et aluminium avec intégration ultra-plate du pack batterie.',
      en: 'Carbon fiber and aluminum monocoque chassis structure with ultra-flat structural battery pack integration.'
    }
  }
];

export const AuraGallery: React.FC<AuraGalleryProps> = ({ lang, onClose }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : PHOTOS.length - 1));
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev !== null && prev < PHOTOS.length - 1 ? prev + 1 : 0));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const scrollToPhoto = (index: number) => {
    const el = document.getElementById(`aura-photo-${index + 1}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const t = {
    fr: {
      back: 'Retour aux projets',
      projectNum: 'PROJET 03',
      title: 'AURA — Concept Car',
      category: 'Design Automobile & UX/UI',
      subtitle: 'Les 5 photos du projet présentées dans l’ordre, en format original sans zoom ni recadrage.',
      jumpTo: 'Accès direct aux photos :',
      photoBadge: 'PHOTO',
      originalNotice: 'Format original • Non zoomé • Sans recadrage',
      expand: 'Plein écran',
      close: 'Fermer',
      prev: 'Photo précédente',
      next: 'Photo suivante',
      summaryTitle: 'À Propos du Projet AURA',
      summaryText: 'Le projet AURA incarne la symbiose entre ingénierie aérodynamique et émotion esthétique. Chaque ligne est guidée par l\'écoulement des flux d\'air pour allier performance énergétique et présence sculpturale.'
    },
    en: {
      back: 'Back to projects',
      projectNum: 'PROJECT 03',
      title: 'AURA — Concept Car',
      category: 'Automotive & UX/UI Design',
      subtitle: 'All 5 project photos displayed in order, in full original resolution without zoom or cropping.',
      jumpTo: 'Direct photo access:',
      photoBadge: 'PHOTO',
      originalNotice: 'Original format • Uncropped • Not zoomed',
      expand: 'Fullscreen',
      close: 'Close',
      prev: 'Previous photo',
      next: 'Next photo',
      summaryTitle: 'About Project AURA',
      summaryText: 'Project AURA embodies the synergy between aerodynamic engineering and sculptural emotion. Every curve is shaped by laminar airflow physics to achieve optimal efficiency and striking road presence.'
    }
  }[lang];

  return (
    <div className="w-full min-h-screen bg-[#090B10] text-white selection:bg-white selection:text-[#002FA7] font-sans pb-32">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-50 w-full bg-[#090B10]/90 backdrop-blur-md border-b border-white/10 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onClose}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white hover:text-[#002FA7] transition-all duration-300 font-mono text-xs uppercase tracking-widest"
          >
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span>{t.back}</span>
          </button>

          <div className="text-center hidden sm:block">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50 block">
              {t.projectNum}
            </span>
            <span className="font-display font-bold text-sm md:text-base tracking-tight text-white">
              {t.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs bg-white text-[#002FA7] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              5 PHOTOS
            </span>
            {onClose && (
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#002FA7] flex items-center justify-center transition-all duration-300"
                title={t.close}
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 pt-8 md:pt-12">
        {/* Project Intro Header */}
        <section className="mb-12 border-b border-white/10 pb-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#60A5FA]">
                {t.category}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
                100% UNZOOMED • DANS L'ORDRE
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-white uppercase">
              {t.title}
            </h1>

            <p className="text-base md:text-xl text-white/80 max-w-3xl font-light leading-relaxed">
              {t.subtitle}
            </p>

            {/* Quick Jump Pills */}
            <div className="mt-4 pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-white/50 shrink-0">
                {t.jumpTo}
              </span>
              <div className="flex flex-wrap gap-2">
                {PHOTOS.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => scrollToPhoto(idx)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white hover:text-[#002FA7] border border-white/10 font-mono text-xs tracking-wider transition-all duration-200"
                  >
                    0{p.id}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* The 5 Photos in Exact Order (1 -> 5) - Strictly Unzoomed & Uncropped */}
        <div className="flex flex-col gap-16 md:gap-24">
          {PHOTOS.map((photo, index) => (
            <article
              key={photo.id}
              id={`aura-photo-${photo.id}`}
              className="scroll-mt-24 w-full bg-[#0E1118] border border-white/15 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-6"
            >
              {/* Photo Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3 md:gap-4">
                  <span className="font-mono text-xs md:text-sm font-bold bg-white text-[#002FA7] px-3.5 py-1.5 rounded-full uppercase tracking-wider shrink-0 shadow">
                    {t.photoBadge} 0{photo.id} / 05
                  </span>
                  <h2 className="font-display font-medium text-lg md:text-2xl text-white tracking-tight">
                    {photo.title[lang]}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] md:text-xs text-white/50 uppercase tracking-widest hidden sm:inline">
                    {t.originalNotice}
                  </span>
                  <button
                    onClick={() => setLightboxIndex(index)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white hover:text-[#002FA7] font-mono text-xs tracking-wider transition-colors"
                    title={t.expand}
                  >
                    <Maximize2 size={14} />
                    <span className="hidden md:inline">{t.expand}</span>
                  </button>
                </div>
              </div>

              {/* IMAGE CONTAINER: STRICTLY NO ZOOM, NO CROP, NATURAL PROPORTIONS */}
              <div
                onClick={() => setLightboxIndex(index)}
                className="w-full min-h-[260px] md:min-h-[400px] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/60 rounded-xl md:rounded-2xl border border-white/5 cursor-pointer group relative overflow-visible"
              >
                <img
                  src={photo.src}
                  alt={`Photo 0${photo.id}: ${photo.title[lang]}`}
                  className="w-full h-auto max-h-[85vh] object-contain mx-auto block select-none rounded shadow-2xl transition-opacity duration-300 group-hover:opacity-95"
                  style={{
                    objectFit: 'contain',
                    maxWidth: '100%',
                    transform: 'none',
                  }}
                  loading="eager"
                />

                {/* Subtle Click-to-Enlarge Hint */}
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full font-mono text-[10px] tracking-widest uppercase text-white/70 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1.5 border border-white/10">
                  <Maximize2 size={12} />
                  <span>{t.expand}</span>
                </div>
              </div>

              {/* Photo Description & Details */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 text-white/70">
                <p className="text-sm md:text-base font-light leading-relaxed max-w-3xl">
                  {photo.desc[lang]}
                </p>
                <span className="font-mono text-xs text-white/40 shrink-0">
                  0{photo.id} • 05
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Project Summary Section */}
        <section className="mt-24 p-8 md:p-12 rounded-3xl bg-[#0E1118] border border-white/15 text-center flex flex-col items-center gap-6">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#60A5FA]">
            AURA CONCEPT CAR
          </span>
          <h2 className="text-2xl md:text-4xl font-display font-medium text-white tracking-tight max-w-2xl">
            {t.summaryTitle}
          </h2>
          <p className="text-base md:text-lg text-white/70 font-light max-w-2xl leading-relaxed">
            {t.summaryText}
          </p>
          <button
            onClick={onClose}
            className="mt-4 px-8 py-3.5 rounded-full bg-white text-[#002FA7] font-bold text-sm uppercase tracking-widest hover:bg-[#60A5FA] hover:text-white transition-all shadow-xl"
          >
            ← {t.back}
          </button>
        </section>
      </main>

      {/* LIGHTBOX MODAL: FULLSCREEN UNZOOMED INSPECTION */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-black/95 flex flex-col justify-between p-4 md:p-6 select-none"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Lightbox Bar */}
            <div
              className="w-full flex items-center justify-between text-white z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold bg-white text-[#002FA7] px-3 py-1 rounded-full uppercase tracking-wider">
                  0{PHOTOS[lightboxIndex].id} / 05
                </span>
                <span className="font-display font-medium text-sm md:text-lg text-white hidden sm:inline">
                  {PHOTOS[lightboxIndex].title[lang]}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest hidden md:inline">
                  {t.originalNotice}
                </span>
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-[#002FA7] flex items-center justify-center transition-colors"
                  title={t.close}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Central Image Container: 100% UNZOOMED */}
            <div
              className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={PHOTOS[lightboxIndex].src}
                alt={PHOTOS[lightboxIndex].title[lang]}
                className="max-w-[96vw] max-h-[86vh] w-auto h-auto object-contain mx-auto select-none rounded shadow-2xl"
                style={{ objectFit: 'contain' }}
              />

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : PHOTOS.length - 1));
                }}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-white hover:text-[#002FA7] border border-white/20 flex items-center justify-center text-white transition-all shadow-xl"
                title={t.prev}
              >
                <ChevronLeft size={24} />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev !== null && prev < PHOTOS.length - 1 ? prev + 1 : 0));
                }}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-white hover:text-[#002FA7] border border-white/20 flex items-center justify-center text-white transition-all shadow-xl"
                title={t.next}
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bottom Lightbox Bar */}
            <div
              className="w-full flex items-center justify-between text-white/70 text-xs font-mono border-t border-white/10 pt-3"
              onClick={(e) => e.stopPropagation()}
            >
              <span>{PHOTOS[lightboxIndex].desc[lang]}</span>
              <span className="shrink-0 ml-4">ESC = {t.close}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
