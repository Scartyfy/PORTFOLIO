
import { Project } from './types';
import img1 from './components/assets/1.png';
import img2 from './components/assets/2.png';
import img3 from './components/assets/3.png';
import img4 from './components/assets/4.png';
import img5 from './components/assets/5.png';

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: { fr: "That's my jam", en: "That's my jam" },
    category: { fr: 'Entrepreneuriat', en: 'Entrepreneurship' },
    description: { 
      fr: 'Créer That\'s my jam a été mon épreuve du feu pour fusionner toutes mes expertises. De la structuration robuste de la base de données à la direction artistique, en passant par le design UX/UI, j\'ai piloté la création de ce produit de A à Z. Ce projet entrepreneurial m\'a confronté aux réalités du terrain : gérer les contraintes administratives, la comptabilité et la stratégie sociale, tout en maintenant une conception strictement centrée sur l\'utilisateur. C\'est la preuve que je peux non seulement concevoir un produit, mais aussi le faire naître et le diriger.',
      en: 'Creating That\'s my jam was my trial by fire to fuse all my expertise. From robust database structuring to art direction, through UX/UI design, I piloted the creation of this product from A to Z. This entrepreneurial project confronted me with the realities of the field: managing administrative constraints, accounting, and social strategy, while maintaining a strictly user-centered design. It\'s proof that I can not only design a product, but also bring it to life and direct it.'
    },
    image: 'https://drive.google.com/thumbnail?id=12Y1whGrGWg2l--aMALl6DM2Y_IJWkgoo&sz=w1000',
    gallery: []
  },
  {
    id: 'p2',
    title: { fr: 'Projet SNCF', en: 'SNCF Project' },
    category: { fr: 'Design de service', en: 'Service design' },
    description: { 
      fr: 'Travailler avec un acteur majeur comme la SNCF exigeait une approche à la fois techniquement irréprochable et parfaitement adaptée aux besoins des utilisateurs finaux. Sur ce projet, j\'ai agi comme le trait d\'union entre l\'ingénierie pure et le design global. Mon bagage technique m\'a permis de comprendre et d\'intégrer les contraintes systémiques, tandis que ma vision de designer a garanti une solution finale ergonomique, fluide et orientée vers l\'humain.',
      en: 'Working with a major player like SNCF required an approach that was both technically impeccable and perfectly adapted to the needs of end users. On this project, I acted as the link between pure engineering and global design. My technical background allowed me to understand and integrate systemic constraints, while my designer vision guaranteed a final ergonomic, fluid, and human-oriented solution.'
    },
    image: 'https://drive.google.com/thumbnail?id=1lLITLZdFeR9_07zkoQxYjThbcnY7DTku&sz=w1000',
    gallery: []
  },
  {
    id: 'p3',
    title: { fr: 'LOBSTER CAR — Concept Car', en: 'LOBSTER CAR — Concept Car' },
    category: { fr: 'Design Automobile & Modélisation', en: 'Automotive Design & 3D Modeling' },
    description: {
      fr: 'Étude stylistique et formelle du concept car Lobster Car. Morphologie sculptée, pureté aérodynamique et proportions radicales. Affiche de style, esquisses d\'idéation et visuels photographiques.',
      en: 'Stylistic and formal study of the Lobster Car concept. Sculpted morphology, aerodynamic purity, and radical proportions. Styling poster, ideation sketches, and photographic visuals.'
    },
    image: img1 || '/1.png',
    gallery: [img1 || '/1.png', img4 || '/4.png', img2 || '/2.png', img3 || '/3.png', img5 || '/5.png']
  },
  {
    id: 'p4',
    title: { fr: 'Maquette APP UX/UI', en: 'UX/UI App Prototype' },
    category: { fr: 'Design Interface', en: 'Interface Design' },
    description: {
      fr: 'Conception d\'une maquette d\'application axée sur l\'expérience utilisateur (UX) et l\'interface utilisateur (UI). Ce projet regroupe une réflexion approfondie sur l\'architecture de l\'information, l\'ergonomie et le design visuel pour créer une solution intuitive et esthétique',
      en: 'Design of an application prototype focused on user experience (UX) and user interface (UI). This project brings together in-depth thought on information architecture, ergonomics, and visual design to create an intuitive and aesthetic solution.'
    },
    image: 'https://drive.google.com/thumbnail?id=1jJGwkYIGr3go1w2FGDS6b6XGvN1AarIy&sz=w1000',
    gallery: [],
    pdfUrl: 'https://drive.google.com/file/d/1jJGwkYIGr3go1w2FGDS6b6XGvN1AarIy/preview'
  },
  {
    id: 'p6',
    title: { fr: 'Design Typographique', en: 'Typographic Design' },
    category: { fr: 'Typographie', en: 'Typography' },
    description: {
      fr: 'La typographie est l\'intersection parfaite entre la rigueur mathématique et l\'expression artistique. La création de cette police de caractère originale témoigne de mon souci du détail et de ma patience. Chaque courbe, chaque espacement et chaque proportion ont été pensés pour créer un équilibre visuel cohérent. C\'est un exercice de précision extrême qui nourrit quotidiennement ma pratique du design d\'interface.',
      en: 'Typography is the perfect intersection between mathematical rigor and artistic expression. The creation of this original typeface bears witness to my attention to detail and patience. Every curve, spacing, and proportion was thought out to create a coherent visual balance. It is an exercise in extreme precision that fuels my interface design practice daily.'
    },
    image: 'https://drive.google.com/thumbnail?id=18wDDKBDGx9-iNKOM-WwpVAspPNVjrmfP&sz=w1000',
    gallery: [],
    pdfUrl: 'https://drive.google.com/file/d/1oD9b05hL91gJgi0PasOhIs1tbRs_LZjK/preview'
  },
  {
    id: 'p5',
    title: { fr: 'Matière & Maquettage', en: 'Material & Prototyping' },
    category: { fr: 'Prototypage Physique', en: 'Physical Prototyping' },
    description: {
      fr: 'Mon besoin de concevoir ne s\'arrête pas aux écrans. Le travail de la matière, le maquettage et le prototypage physique sont pour moi un terrain de jeu essentiel. Qu\'il s\'agisse de concevoir une sculpture abstraite ou de reproduire fidèlement un casque des Daft Punk pour célébrer un événement, j\'aime me confronter à la résistance des matériaux. Ces projets incarnent ma créativité brute, mon ingéniosité technique et ma passion pour le \'faire-soi-même\'.',
      en: 'My need to design doesn\'t stop at screens. Working with materials, modeling, and physical prototyping are an essential playground for me. Whether it is designing an abstract sculpture or faithfully reproducing a Daft Punk helmet to celebrate an event, I like to confront the resistance of materials. These projects embody my raw creativity, my technical ingenuity, and my passion for \'do-it-yourself\'.'
    },
    image: 'https://drive.google.com/thumbnail?id=1z-ZZdWXI2DyLbJ_6nSgWxZaKrIDcejox&sz=w1000',
    gallery: []
  }
];

export const INTRO_SCROLL_HEIGHT = 1200;
