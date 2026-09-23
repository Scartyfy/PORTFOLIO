export type Language = 'fr' | 'en';

export interface Project {
  id: string;
  title: Record<Language, string>;
  category: Record<Language, string>;
  description: Record<Language, string>;
  image?: string;
  gallery?: string[];
  challenge?: Record<Language, string>;
  solution?: Record<Language, string>;
  pdfUrl?: string;
}

export interface CardReading {
  cardName: string;
  reading: string;
}

export enum ViewState {
  INTRO = 'INTRO',         // Initial state, scrolling spreads deck
  REVEALING = 'REVEALING', // Card clicked, centering and flipping
  PROJECTS = 'PROJECTS',   // Project list visible
  TRANSITIONING = 'TRANSITIONING' // Transitioning state
}

