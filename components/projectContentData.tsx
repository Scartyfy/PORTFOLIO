import React from 'react';
import { Database, LayoutDashboard, Palette, Briefcase, Settings, Target, Layers, Code, PenTool, Type, Zap, Scissors, Cog, Map, Monitor, Ruler, Shield, Heart, CheckCircle } from "lucide-react";
import { Language } from "../types";

export const getProjectData = (id: string, lang: Language) => {
  const data: any = {
    'p1': {
      subtitle: "",
      title: "That's My Jam",
      headerDesc: "Création d'entreprise",
      contextTitle: "La Problématique & Le Défi",
      contextText: "À côté de mes études, avec deux amis, nous avons monté une start-up qui nous permet d'appliquer toutes les compétences apprises à l'école dans un projet concret. Cela me permet d'aller encore plus loin et de monter en compétence sur de nombreux sujets qui touchent à l'entrepreneuriat.",
      concept: {
        title: "Le Concept",
        text: "That's My Jam est né d'une ambition simple : briser le mur invisible entre la scène et la fosse.\n\nNous avons conçu une plateforme web interactive qui transforme les spectateurs en acteurs de l'événement. Le public vote en temps réel pour ses morceaux préférés depuis son smartphone, tandis que l'artiste (DJ ou groupe) reçoit les tendances en direct pour adapter sa setlist et créer une synergie électrique dans la salle.",
        image: "https://drive.google.com/thumbnail?id=1FHJs5vCDogyqyLkG-C4bg9UHaSMu4lYn&sz=w2000"
      },
      techTitle: "Compétences Appliquées",
      skills: true,
      skillsList: [
        {
          label: "Relational Database",
          text: "Modélisation et requêtes via base de données relationnelle",
          details: "Mise en pratique de l'ingénierie apprise à l'école avec la création d'une base de données relationnelle robuste pour gérer les salles, les utilisateurs et les votes en temps réel.",
          image: "https://drive.google.com/thumbnail?id=1EoFttAcjlnFPrtDQDddkxs54gTrCPSP-&sz=w1000"
        },
        {
          label: "Interface UX/UI",
          text: "Clarté, accessibilité et compréhension immédiate",
          details: "Création d'une interface claire, accessible et compréhensible pour tout le monde, assurant qu'un invité peu technophile puisse s'en servir immédiatement lors d'un événement festif.",
          images: [
            { src: "https://drive.google.com/thumbnail?id=1ipGpwDlo4zdXIgsCYGKFpZoUefeTmQw9&sz=w1000", label: "Vue Public" },
            { src: [
                "https://drive.google.com/thumbnail?id=1DgjrZ3QifQYEQo_G4wJ2jDkKxYUg3nbK&sz=w1000",
                "https://drive.google.com/thumbnail?id=1RzPdPqclgXampDIvFUq4dv8LHGbhgqTO&sz=w1000"
              ], 
              label: "Vue Artiste" 
            }
          ]
        },
        {
          label: "Design d'Expérience",
          text: "Créer un dialogue continu avec le public",
          details: "Le design d'expérience a été pensé pour recréer du lien et créer un fort engagement envers le groupe. Il s'agit d'instaurer un vrai dialogue interactif entre les personnes présentes dans la salle et le groupe ou le DJ sur scène."
        }
      ],
      resultTitle: "Le Résultat & L'Apprentissage",
      resultText: "Cette expérience entrepreneuriale immersive m'a apporté une vision à 360° de la création d'un produit. Les retours actuels sur la boîte sont très prometteurs : le public comme les artistes saluent une interface intuitive qui révolutionne l'ambiance des événements sans en casser le rythme.",
      images: {
        heroBg: "https://drive.google.com/thumbnail?id=12Y1whGrGWg2l--aMALl6DM2Y_IJWkgoo&sz=w2000",
        context: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=1000",
        resultBg: "https://images.unsplash.com/photo-1540039155732-d68a91b4fa7b?auto=format&fit=crop&q=80&w=2000"
      }
    },
    'p2': {
      subtitle: "",
      title: "Projet SNCF",
      headerDesc: "Projet partenaire",
      contextTitle: "",
      contextText: "Réhumaniser le voyage TER à l'ère de l'hyperdigitalisation.",
      techTitle: "Observations & Recherches",
      skills: true,
      skillsList: [
        {
          label: "Interviews Terrain",
          text: "12 personnes interviewées & Agent TER Occitanie",
          details: "Impact du sous-effectif : manque de présence humaine et insécurité. L'uniforme est perçu comme une barrière. Aux arrêts isolés (PANG sans borne de validation), le contrôleur reste la seule ressource. La nécessité de privilégier les contacts humains a été confirmée.",
          quotes: [
            { text: "Je choisis les petites gares pour être sûre de trouver un humain au guichet.", author: "Voyageuse" },
            { text: "Sans ce TER, notre village serait complètement coupé du monde.", author: "Étudiant" },
            { text: "C'est l'uniforme qu'ils engueulent, pas la personne.", author: "Agent de bord" },
            { text: "La borne sur le quai était en panne, heureusement que le contrôleur m'a dépanné !", author: "Usager régulier" },
            { text: "On manque cruellement de présence humaine, on se sent seuls le soir.", author: "Voyageuse" },
            { text: "Seul pour gérer tout un train la nuit, le sentiment d'insécurité monte vite.", author: "Contrôleur" },
            { text: "Train en panne : en dix minutes, on s'était tous organisés pour covoiturer.", author: "Passager" },
            { text: "Ici, pas de touristes. Juste des travailleurs et des étudiants qui font le trajet tous les jours.", author: "Travailleur pendulaire" },
            { text: "Prendre son temps dans une gare historique, ça change tout.", author: "Voyageuse occasionnelle" },
            { text: "Le contrôleur, c'est bien plus qu'un simple vérificateur de billets.", author: "Habitué de la ligne" }
          ]
        },
        {
          label: "La Concurrence",
          text: "Veille concurrentielle & Offres alternatives",
          details: "La concurrence (e.g. Transdev) propose une offre doublée, un engagement strict sur la ponctualité, et des trains de dernière génération: plus de personnel à bord, sièges confortables, Wi-Fi, espaces vélos et sécurité renforcée, le tout axé sur l'accessibilité à tous."
        },
        {
          label: "La Sociologie",
          text: "The Social Life of Small Urban Spaces (William H. Whyte)",
          details: "Une place ne dépend pas de son esthétique mais de sa capacité à favoriser les intéractions sociales via : la Triangulation (quelque chose d'extérieur qui crée le lien), la Projection, et le Mouvement (l'humain aime regarder le mouvement).",
          image: "https://drive.google.com/thumbnail?id=10ZggtwEmj4Da76AQ2U30Go4n2Mn2fHH4&sz=w1000"
        }
      ],
      postResearchText: "Constat :\n\nCe sous-effectif étant inévitable, il fallait se concentrer sur le dernier humain présent dans les trains : l'agent TER, et faire passer l'agent d'une figure de contrôle isolée et répressive à un repère rassurant et accessible pour les voyageurs.",
      processTitle: "Solution",
      steps: [
        {
          title: "Concept Général",
          desc: "Un système de géolocalisation interne à bord du train permettant de localiser facilement le contrôleur.\n\nComment ça marche ? L'agent porte un émetteur qui envoie un signal en continu. Ce signal est capté par des récepteurs situés dans chaque wagon de la rame.",
        },
        {
          title: "Le Matériel : L'Émetteur",
          desc: "Un petit boîtier électronique (TAG) porté par l'agent qui émet un signal en continu. Composé d'une carte ESP32, d'une batterie Li-Po 5V et d'une LED, son design a été pensé pour l'ergonomie de l'agent.",
          image: "https://drive.google.com/thumbnail?id=1J5dudpctxl4QwO1UEGodEbrGOCSj_8Tp&sz=w1000",
          image2: "https://drive.google.com/thumbnail?id=1nIZ3cYLqpC4KCv_rWDGGWJtzRDgOhhqN&sz=w1000"
        },
        {
          title: "Les Récepteurs",
          desc: "Des petits récepteurs discrets (ancres) répartis au plafond dans chaque wagon du train. Ils captent le signal de l'émetteur porté par l'agent. Architecture intérieure des ancres. Composants embarqués sécurisés pour s'intégrer discrètement au plafond de chaque wagon.",
          image: "https://drive.google.com/thumbnail?id=1dV8PDpPb23biy6QHFpyOdrefsZftAgnY&sz=w1000",
          image2: "https://drive.google.com/thumbnail?id=1xfu-EW3-CtAnS1V-UoOvc_I0ubfxIRjy&sz=w1000"
        },
        {
          title: "L'Infrastructure Technique",
          desc: "Un système Plug & Play très facile à implémenter : les récepteurs se calent sur le réseau existant du train, évitant l'ajout de nouveaux câbles. Il traite les signaux et affiche en direct sur tous les écrans de la rame où se trouve exactement le contrôleur (ex. \"Votre agent est en voiture 4\").",
          image: "https://drive.google.com/thumbnail?id=1wV1HyHVQjdHoaCBJBrk15-HfKp7CcLMD&sz=w1000"
        },
        {
          title: "L'Expérience Humaine",
          blocks: [
            {
              title: "Pour l'Agent",
              text: "Le système pallie le sentiment de sous-effectif, l'agent \"occupe\" visuellement tout le train.\nLa dynamique s'inverse : ce n'est plus l'agent qui traque le client pour exiger un titre, c'est la technologie qui guide le client vers l'agent. Les conflits sont désamorcés."
            },
            {
              title: "Pour le Passager",
              text: "En cas de problème (borne en panne, besoin d'info), il ne stresse plus à sa place : il sait exactement où aller.\nSavoir l'agent présent (\"L'agent est en Voiture 2\") crée un filet de sécurité psychologique, même à distance."
            }
          ]
        },
        {
          image: "https://drive.google.com/thumbnail?id=12jVPNY-uvmuAwicHia_nnjDDRYxvrQf3&sz=w1000"
        },
        {
          title: "La Gestion de la Fraude",
          desc: "La position de l'agent étant affichée en direct, un passager sans billet a l'obligation stricte de se lever et de marcher dans sa direction.\n\nLa transparence totale justifie l'amende maximale pour les personnes de mauvaise foi, tout en préservant la bienveillance pour les voyageurs honnêtes.",
        },
        {
          title: "Preuve de Concept (LE POC)",
          desc: "Des tests de terrain et des interviews (9 participants) ont été réalisés dans les gares avec de faux flyers annonçant la fonctionnalité. \n\nRetours usagers : \"Ça cartonnerait chez les jeunes\", \"À son époque l'agent faisait un appel vocal pour dire où il était\", \"Good idea, it could have helped me during my trip\".",
          image: "https://drive.google.com/thumbnail?id=1lYWhBA1v2wQ7zI4Fsb34NRhBFjGqpnD1&sz=w1000"
        }
      ],
      resultTitle: "Le Résultat & L'Apprentissage",
      resultText: "Ce projet m'a permis de comprendre comment l'intégration de technologies simples et robustes peut avoir un impact significatif sur l'expérience utilisateur globale, en réhumanisant le contact et en apaisant les tensions dans un environnement contraint.",
      images: {
        heroBg: "https://drive.google.com/thumbnail?id=1lLITLZdFeR9_07zkoQxYjThbcnY7DTku&sz=w2000",
        context: "https://images.unsplash.com/photo-1540039155732-d68a91b4fa7b?auto=format&fit=crop&q=80&w=1000",
        resultBg: "https://images.unsplash.com/photo-1522780550166-284a0288c8dc?auto=format&fit=crop&q=80&w=2000"
      }
    },
    'p3': {
      subtitle: "Design Automobile & Mobilité",
      title: "Deux Concept Cars — Lobster Car",
      headerDesc: "Design Automobile & Aérodynamique",
      contextTitle: "Le Défi & La Vision",
      contextText: "Conception de concept cars explorant la convergence entre efficience aérodynamique, morphologie sculptée et ergonomie de l'habitacle. En tant qu'ingénieur-designer, l'enjeu était de créer une présence visuelle forte dictée par l'équilibre des volumes et la pureté des lignes.",
      concept: {
        title: "L'Aérodynamique comme Forme Pure",
        text: "Le concept Lobster Car explore une silhouette sculpturale inspirée des carapaces et des lignes de tension organiques. La carrosserie guide les flux d'air pour assurer la stabilité et l'efficience tout en proposant une identité visuelle radicale.",
        image: "/1.png"
      },
      techTitle: "Recherches & Compétences Appliquées",
      skills: true,
      skillsList: [
        {
          label: "Aérodynamique & Forme Extérieure",
          text: "Optimisation de la silhouette et écoulement des flux",
          details: "Étude poussée des volumes et des écoulements d'air sur carrosserie sculpturale pour allier performance aérodynamique et présence esthétique.",
          images: [
            { src: "/2.png", label: "Étude Aérodynamique & Profil" },
            { src: "/1.png", label: "Affiche Principale" }
          ]
        },
        {
          label: "Cockpit & Ergonomie",
          text: "Interface conducteur et ergonomie du poste de pilotage",
          details: "Conception ergonomique du poste de conduite : commandes physiques intuitives et visibilité optimale pour une expérience de conduite pure.",
          images: [
            { src: "/3.png", label: "Poste de Pilotage" }
          ]
        },
        {
          label: "Esquisses & Recherche Formelle",
          text: "Recherche stylistique et études préliminaires",
          details: "De la feuille de croquis aux rendus volumiques, le processus explore les lignes de tension et l'équilibre des masses.",
          images: [
            { src: "/4.png", label: "Recherche Formelle & Croquis" }
          ]
        }
      ],
      postResearchText: "Constat :\n\nLe projet Lobster Car démontre la synergie entre vision formelle de designer et précision de conception. Une démarche épurée où chaque élément visuel trouve sa justification.",
      processTitle: "Architecture & Solutions Techniques",
      steps: [
        {
          title: "1. Affiche & Manifeste de Style",
          desc: "Présentation grand format définissant les intentions stylistiques et l'impact visuel du concept.",
          image: "/1.png"
        },
        {
          title: "2. Recherche & Esquisses Préparatoires",
          desc: "Étude des proportions et des lignes de force avant toute phase de modélisation.",
          image: "/4.png"
        },
        {
          title: "3. Visuels Photographiques",
          desc: "Rendus en situation révélant la silhouette, les détails de carrosserie et l'équilibre général.",
          image: "/2.png"
        }
      ],
      resultTitle: "Bilan & Acquis Ingénieur-Designer",
      resultText: "Cette étude complète valide une méthodologie double : aborder l'objet automobile avec la sensibilité formelle du designer et la rigueur technique de l'ingénieur.",
      images: {
        heroBg: "/1.png",
        context: "/2.png",
        resultBg: "/5.png"
      }
    },
    'p4': {
      subtitle: "Conception Interface",
      title: "Maquette APP UX/UI",
      headerDesc: "Ergonomie & Design Visuel",
      contextTitle: "La Problématique & Le Défi",
      contextText: "L'objectif était de concevoir une maquette d'application de bout en bout, en articulant les méthodes de l'UX design avec le raffinement de l'interface graphique (UI). Le défi consistait à résoudre des problèmes complexes tout en offrant une expérience sans friction, digne des standards de l'industrie.",
      techTitle: "Observations & Recherches",
      skills: true,
      skillsList: [
        {
          label: "Recherche Utilisateur",
          text: "Cartographie des Parcours & Pain Points",
          details: "L'empathie est au cœur du processus. Avant de tracer la moindre ligne de pixel, j'ai mené des interviews et des tests d'utilisabilité pour comprendre les véritables frictions des utilisateurs. Les observations ont révélé que la charge cognitive était trop élevée sur les écrans clés.",
          image: "https://images.unsplash.com/photo-1581291518196-7bb18ef77a28?auto=format&fit=crop&q=80&w=1000",
          quotes: [
            { text: "Je suis souvent perdu au moment de valider, il y a trop d'informations.", author: "Utilisateur Test" },
            { text: "Je veux juste que ce soit rapide et que je n'aie pas à réfléchir.", author: "Utilisateur Test" }
          ]
        },
        {
          label: "Architecture de l'Info",
          text: "Wireframing & Structuration",
          details: "La restructuration de l'architecture de l'information s'est traduite par la création de wireframes basse-fidélité. L'objectif : définir une hiérarchie claire et prioriser les actions primaires (Call to Action) avant d'appliquer la surcouche visuelle.",
          images: [
            { src: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=1000", label: "Wireframes" },
            { src: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=1000", label: "User Flow" }
          ]
        },
        {
          label: "Interface UX/UI",
          text: "Design System & Micro-interactions",
          details: "Le design visuel a été pensé pour être minimaliste, accessible et engageant. Un Design System complet a été mis en place (couleurs, typographie, composants réutilisables) pour garantir une cohérence parfaite sur l'ensemble de l'application.",
          images: [
            { src: ["https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1000", "https://images.unsplash.com/photo-1542744094-24638ea0b3b5?auto=format&fit=crop&q=80&w=1000"], label: "Design System" },
            { src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000", label: "Composants" }
          ]
        }
      ],
      postResearchText: "Constat :\n\nL'expérience actuelle manquait de fluidité. La nouvelle architecture devait impérativement guider l'utilisateur naturellement vers son but, en utilisant le design visuel non pas comme décoration, mais comme outil de compréhension et de hiérarchie.",
      processTitle: "Solution & Parcours",
      steps: [
        {
          title: "Le Flow d'Onboarding",
          desc: "Un processus d'accueil réduit à 3 étapes claires, permettant à l'utilisateur de comprendre immédiatement la valeur de l'application sans friction à l'inscription.",
          image: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=1000",
          image2: "https://images.unsplash.com/photo-1616423641405-b6d4c5520e5c?auto=format&fit=crop&q=80&w=1000"
        },
        {
          title: "Dashboard Principal",
          desc: "L'écran central a été épuré pour mettre en évidence les métriques clés. Utilisation des principes de la Gestalt pour regrouper les informations logiquement.",
          blocks: [
            { title: "Hiérarchie", text: "Mise en avant des actions principales via des contrastes forts." },
            { title: "Accessibilité", text: "Vérification des contrastes typographiques pour les normes WCAG AA." }
          ],
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000"
        },
        {
          title: "Prototypage & Animations",
          desc: "L'intégration de micro-interactions (hover states, transitions de pages douces) donne vie à l'interface et fournit un feedback immédiat à l'utilisateur, renforçant le sentiment de qualité.",
          image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1000",
          image2: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&q=80&w=1000"
        }
      ],
      resultTitle: "Le Résultat & L'Apprentissage",
      resultText: "Cette conception UX/UI met en évidence l'importance primordiale de placer l'utilisateur final au centre de chaque décision créative et fonctionnelle. Le prototype interactif final offre une navigation fluide, validée par des tests utilisateurs concluant à une baisse significative du taux d'abandon.",
      images: {
        heroBg: "https://drive.google.com/thumbnail?id=1jJGwkYIGr3go1w2FGDS6b6XGvN1AarIy&sz=w2000",
        context: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=1000",
        resultBg: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000"
      },
      pdfUrl: "https://drive.google.com/file/d/1jJGwkYIGr3go1w2FGDS6b6XGvN1AarIy/preview"
    },
    'p5': {
      subtitle: "Maker & Concepteur",
      title: "La Matière",
      headerDesc: "Casque Daft Punk & Sculpture",
      contextTitle: "La Problématique & Le Défi",
      contextText: "L'ingénierie et le design se rencontrent souvent dans le prototypage physique. J'éprouve le besoin constant de travailler avec mes mains. J'ai donc conçu une sculpture originale et reproduit fidèlement un casque des Daft Punk pour l'anniversaire d'un ami.",
      techTitle: "Technologies & Compétences",
      skills: {
        col1Label: "Tech",
        col1Text: "Impression 3D, Électronique de base (LEDs)",
        col2Label: "Design",
        col2Text: "Maquettage, Ponçage, Modélisation 3D",
        col3Label: "Méthodologie",
        col3Text: "Assemblage, Ingénierie inversée, Peinture"
      },
      processTitle: "Mon Processus & Mes Actions",
      steps: [
        {
          title: "Modélisation & Découpage",
          desc: "Conception 3D des pièces ou récupération de patrons pour préparer l'assemblage physique.",
          icon: <Layers className="w-6 h-6 text-[#002FA7]" />,
          image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=1000"
        },
        {
          title: "Fabrication Structurelle",
          desc: "Utilisation de l'impression 3D et de divers matériaux pour créer la structure de base.",
          icon: <Settings className="w-6 h-6 text-[#002FA7]" />,
          image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1000"
        },
        {
          title: "Finition & Électronique",
          desc: "Travail de ponçage, d'apprêt et de peinture, couplé à l'intégration d'un circuit LED.",
          icon: <Zap className="w-6 h-6 text-[#002FA7]" />,
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000"
        }
      ],
      resultTitle: "Le Résultat & L'Apprentissage",
      resultText: "Le monde physique ne pardonne pas les erreurs de calcul. Ces projets personnels démontrent ma capacité à prototyper des objets, à résoudre des problèmes concrets d'assemblage et à livrer un produit aux finitions professionnelles.",
      images: {
        heroBg: "https://drive.google.com/thumbnail?id=1z-ZZdWXI2DyLbJ_6nSgWxZaKrIDcejox&sz=w2000",
        context: "https://images.unsplash.com/photo-1621084556062-c100ebaf8a44?auto=format&fit=crop&q=80&w=1000",
        resultBg: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?auto=format&fit=crop&q=80&w=2000"
      }
    },
    'p6': {
      subtitle: "L'Artisan du Détail",
      title: "Création Typographique",
      headerDesc: "La Rigueur Visuelle",
      contextTitle: "La Problématique & Le Défi",
      contextText: "La typographie est l'architecture invisible de tout bon design. Pour affiner mon œil et ma précision, je me suis lancé le défi de concevoir une police de caractère originale de A à Z.",
      techTitle: "Technologies & Compétences",
      skills: {
        col1Label: "Outils",
        col1Text: "Illustrator, FontForge, Glyphs",
        col2Label: "Design",
        col2Text: "Dessin vectoriel, Typographie, Géométrie",
        col3Label: "Technique",
        col3Text: "Crénage (Kerning), Ajustements Optiques"
      },
      processTitle: "Mon Processus & Mes Actions",
      steps: [
        {
          title: "Concept de base",
          desc: "Définition de l'ADN de la police (empattements, graisses, style) par des croquis à la main.",
          icon: <PenTool className="w-6 h-6 text-[#002FA7]" />,
          image: "/IMAGE/typo/IMG_1434 2.jpg"
        },
        {
          title: "Vectorisation",
          desc: "Tracé géométrique minutieux de chaque lettre, chiffre et glyphe pour assurer une harmonie visuelle.",
          icon: <Type className="w-6 h-6 text-[#002FA7]" />,
          image: "/IMAGE/typo/IMG_1447 2.jpg"
        },
        {
          title: "Ajustements optiques",
          desc: "Réglage des espaces entre les lettres (crénage/approche) pour garantir une lisibilité parfaite.",
          icon: <Ruler className="w-6 h-6 text-[#002FA7]" />,
          image: "/IMAGE/typo/IMG_1870.jpg"
        }
      ],
      resultTitle: "Le Résultat & L'Apprentissage",
      resultText: "La création d'une fonte est un exercice d'une exigence extrême. Cette expérience a radicalement amélioré ma sensibilité aux proportions et aux alignements dans tous mes autres projets d'ingénierie et de design.",
      images: {
        heroBg: "https://drive.google.com/thumbnail?id=18wDDKBDGx9-iNKOM-WwpVAspPNVjrmfP&sz=w2000",
        context: "/IMAGE/typo/IMG_1888.jpg",
        resultBg: "/IMAGE/typo/IMG_1890.jpg"
      },
      pdfUrl: "https://drive.google.com/file/d/1oD9b05hL91gJgi0PasOhIs1tbRs_LZjK/preview"
    }
  };
  
  return data[id] || data['p1'];
}
