/**
 * Portfolio Data Store — Narindra Rackoto
 * Centralisation des données de profil, compétences, projets et parcours.
 * Conçu pour une maintenance aisée et une mise à jour transparente.
 */
const PORTFOLIO_DATA = {
  profile: {
    fullName: "Narindranjanahary RAKOTONINDRINA",
    name: "Narindra Rackoto",
    initials: "NR",
    title: "Ingénieur en informatique | Développeur Full Stack | Intelligence artificielle & Automatisation",
    headline: "Concevoir des solutions numériques performantes, intelligentes et pérennes.",
    
    // Possibilité de remplacer facilement l'image de profil
    // Pour utiliser votre propre photo : placez le fichier dans "assets/narindra-photo.jpg" et modifiez cette URL
    avatarUrl: "assets/avatar.svg",
    
    status: {
      text: "Disponible pour de nouveaux projets & opportunités",
      available: true
    },
    
    location: "Madagascar",
    timezone: "Indian/Antananarivo",
    timezoneLabel: "Heure de Madagascar (EAT / UTC+3)",
    email: "contact@narindra-rackoto.dev", // Remplacer par votre email de contact personnel ou professionnel
    emailNote: "Adresse e-mail à personnaliser selon vos préférences",
    github: "https://github.com/rackoto786",
    linkedin: "https://linkedin.com/in/narindra-rackoto-98222a3a6/",
    resumeUrl: "#resume-modal",

    shortBio: "Diplômé d'un Master professionnel en Informatique (ENI Fianarantsoa, nov. 2026). Passionné par l'intelligence artificielle, l'automatisation et le développement Full Stack.",

    fullBio: [
      "Développeur passionné par l'intelligence artificielle et les nouvelles technologies, je suis diplômé d'un Master professionnel en Informatique. Je m'intéresse particulièrement à la conception et au développement de solutions numériques innovantes, à l'intelligence artificielle, à l'automatisation des processus et à la transformation digitale.",
      "Polyvalent et autonome, je possède des compétences dans le développement Full Stack, la gestion des bases de données, l'analyse des données, les systèmes informatiques et les technologies modernes.",
      "Mon objectif est de concevoir des applications performantes, intelligentes et adaptées aux besoins réels des entreprises."
    ],

    qualities: [
      {
        title: "Autonomie",
        desc: "Capacité éprouvée à piloter des modules et des architectures logicielles complètes de bout en bout, de l'analyse des besoins jusqu'au déploiement.",
        icon: "compass"
      },
      {
        title: "Polyvalence",
        desc: "Aisance sur l'ensemble de la chaîne de valeur : interfaces modernes (React, TypeScript), backend robuste (Python, Flask, Django), bases de données et administration système.",
        icon: "layers"
      },
      {
        title: "Esprit d'analyse",
        desc: "Rigueur méthodique dans la décomposition des processus métiers complexes et la structuration des flux de données.",
        icon: "brain-circuit"
      },
      {
        title: "Capacité d'adaptation",
        desc: "Facilité d'intégration dans des environnements techniques et organisationnels variés (programmes institutionnels, hôpitaux, entreprises).",
        icon: "sliders"
      },
      {
        title: "Résolution de problèmes",
        desc: "Orientation résolue vers l'optimisation des performances, la sécurité informatique et l'élimination des goulots d'étranglement.",
        icon: "wrench"
      },
      {
        title: "Apprentissage continu",
        desc: "Veille technologique active et curiosité permanente pour l'intelligence artificielle générative (LLM, RAG, agents IA) et l'automatisation avancée.",
        icon: "sparkles"
      }
    ],

    educationHighlight: {
      degree: "Master professionnel en Informatique",
      specialization: "Informatique Générale",
      institution: "École Nationale d'Informatique (ENI) — Fianarantsoa, Madagascar",
      graduationDate: "Novembre 2026",
      badge: "Diplôme Obtenu • Nov. 2026"
    }
  },

  /**
   * Compétences Techniques organisées par domaines
   * Sans pourcentages arbitraires : valorisation par catégories, tags et cas d'usage réels.
   */
  skills: {
    categories: [
      {
        id: "frontend",
        name: "Développement Frontend",
        icon: "layout",
        color: "text-sky-400",
        description: "Création d'interfaces web réactives, ergonomiques et PWA adaptées aux contraintes du terrain.",
        items: [
          { name: "React.js", badge: "Composants & Hooks", tag: "UI Core" },
          { name: "TypeScript", badge: "Typage statique & robustesse", tag: "Langage" },
          { name: "JavaScript (ES6+)", badge: "Standards modernes", tag: "Core" },
          { name: "Tailwind CSS", badge: "Design system & utilitaires", tag: "CSS" },
          { name: "HTML5 & CSS3", badge: "Sémantique & Accessibilité", tag: "Web" },
          { name: "PWA (Progressive Web Apps)", badge: "Mode hors-ligne & mobile", tag: "Architecture" }
        ]
      },
      {
        id: "backend",
        name: "Développement Backend",
        icon: "server",
        color: "text-blue-400",
        description: "Conception d'APIs REST modulaires, sécurisées et performantes pour le traitement des données métiers.",
        items: [
          { name: "Python", badge: "Langage de référence", tag: "Backend/IA" },
          { name: "Flask", badge: "Micro-framework REST & Services", tag: "Framework" },
          { name: "Django", badge: "Architecture MVC & Sécurité", tag: "Framework" },
          { name: "Node.js", badge: "Environnement d'exécution JavaScript", tag: "Runtime" },
          { name: "Express.js", badge: "APIs & Middlewares légers", tag: "API" }
        ]
      },
      {
        id: "database",
        name: "Bases de Données",
        icon: "database",
        color: "text-cyan-400",
        description: "Modélisation relationnelle, intégrité référentielle, requêtes optimisées et traçabilité.",
        items: [
          { name: "PostgreSQL", badge: "SGBD relationnel avancé & ACID", tag: "Production" },
          { name: "MySQL", badge: "Gestion et requêtage relationnel", tag: "SGBD" },
          { name: "SQL", badge: "Modélisation, jointures & procédures", tag: "Langage" }
        ]
      },
      {
        id: "ai-data",
        name: "Intelligence Artificielle & Data",
        icon: "brain",
        color: "text-indigo-400",
        description: "Exploitation de la donnée, apprentissage automatique, modèles de langage et automatisation intelligente.",
        items: [
          { name: "Python (Data Science)", badge: "Écosystème data scientifique", tag: "Data" },
          { name: "Pandas", badge: "Manipulation & analyse de données", tag: "Librairie" },
          { name: "NumPy", badge: "Calcul matriciel haute performance", tag: "Calcul" },
          { name: "Scikit-learn", badge: "Modèles d'apprentissage supervisé", tag: "Machine Learning" },
          { name: "LLM & RAG", badge: "Retrieval-Augmented Generation", tag: "IA Générative" },
          { name: "OCR", badge: "Reconnaissance optique de caractères", tag: "Vision" },
          { name: "AI Agents", badge: "Agents autonomes & raisonnement", tag: "Automatisation" },
          { name: "Automatisation Intelligente", badge: "Pipelines décisionnels", tag: "Workflow" }
        ]
      },
      {
        id: "tools",
        name: "Outils & Technologies",
        icon: "wrench",
        color: "text-emerald-400",
        description: "Chaîne d'outillage moderne pour le versionnement, la conteneurisation et le déploiement continu.",
        items: [
          { name: "Git & GitHub", badge: "Gestion de versions & collaboration", tag: "DevOps" },
          { name: "Docker", badge: "Conteneurisation des environnements", tag: "Conteneur" },
          { name: "Visual Studio Code", badge: "IDE principal & extensions", tag: "Outil" },
          { name: "n8n", badge: "Automatisation de workflows no-code/code", tag: "Automation" },
          { name: "Playwright", badge: "Automatisation de navigateurs & tests", tag: "Testing" },
          { name: "Vercel", badge: "Déploiement et hébergement web", tag: "Cloud" },
          { name: "Odoo", badge: "ERP & applications de gestion", tag: "ERP" },
          { name: "WordPress", badge: "CMS & solutions web modulaires", tag: "CMS" }
        ]
      },
      {
        id: "systems",
        name: "Systèmes & Réseaux",
        icon: "shield",
        color: "text-amber-400",
        description: "Administration d'infrastructures, protocoles de sécurité, filtrage et monitoring opérationnel.",
        items: [
          { name: "Linux", badge: "Administration serveur & shell Bash", tag: "OS" },
          { name: "Windows Server", badge: "Services réseaux & environnements hôpital", tag: "OS" },
          { name: "Administration Réseau", badge: "Routage, sous-réseaux, DHCP/DNS", tag: "Réseaux" },
          { name: "Sécurité Informatique", badge: "Politiques d'accès & filtrage web", tag: "Sécurité" },
          { name: "Supervision & Monitoring", badge: "Surveillance de l'infrastructure", tag: "Audit" }
        ]
      }
    ]
  },

  /**
   * PROJETS PROFESSIONNELS
   * Projet Phare : FIARAmotion (Étude de cas détaillée, 5 profils, 11 fonctionnalités)
   * Autres Projets : Modules réservés et évolutifs sans inventions de faits fictifs.
   */
  projects: {
    flagship: {
      id: "fiaramotion",
      title: "FIARAmotion",
      subtitle: "Plateforme de pilotage opérationnel et financier d'un parc roulant",
      category: "Full Stack & PWA",
      isFlagship: true,
      context: "Solution numérique multiplateforme conçue et développée pour faciliter la gestion, le suivi et le pilotage opérationnel et financier d'un parc automobile. L'application a été réalisée dans le cadre d'un projet de stage au sein du programme CERES.",
      
      stack: [
        "React.js",
        "TypeScript",
        "Python",
        "Flask",
        "PostgreSQL",
        "Progressive Web App (PWA)"
      ],

      keyHighlights: [
        "Architecture PWA multiplateforme accessible sur smartphone terrain et poste de bureau.",
        "Gestion granulaire de 5 profils d'utilisateurs distincts avec droits d'accès sur-mesure.",
        "Suivi consolidé du carburant, de l'état des véhicules et planification des entretiens.",
        "Supervision opérationnelle des missions avec récapitulation des indicateurs clés."
      ],

      roles: [
        {
          role: "Administrateur",
          desc: "Gestion globale de la plateforme, paramétrage du système, gestion des utilisateurs et droits d'accès."
        },
        {
          role: "Chargée technique",
          desc: "Planification des activités de la flotte, suivi des maintenances préventives et curatives, validation des contrôles techniques."
        },
        {
          role: "Collaborateur",
          desc: "Demandes de réservation de véhicules, suivi de l'état d'avancement des demandes de mission."
        },
        {
          role: "Conducteur",
          desc: "Consultation des missions attribuées, saisie des relevés kilométriques et déclarations des pleins de carburant."
        },
        {
          role: "Direction",
          desc: "Accès aux tableaux de bord stratégiques, indicateurs financiers globaux et validation des rapports opérationnels."
        }
      ],

      features: [
        {
          title: "Gestion des véhicules",
          desc: "Fiches détaillées par véhicule (marque, modèle, immatriculation, état général, documents administratifs)."
        },
        {
          title: "Gestion des conducteurs",
          desc: "Suivi des chauffeurs, permis, disponibilités et historique des assignations."
        },
        {
          title: "Gestion des utilisateurs et des rôles",
          desc: "Authentification sécurisée et attribution des 5 profils (Admin, Chargée technique, Collaborateur, Conducteur, Direction)."
        },
        {
          title: "Gestion des missions",
          desc: "Enregistrement, approbation, suivi des trajets et rapports d'achèvement de mission."
        },
        {
          title: "Planification des activités",
          desc: "Calendrier prévisionnel d'utilisation de la flotte pour éviter les conflits d'assignation."
        },
        {
          title: "Suivi des entretiens et maintenance",
          desc: "Alertes sur les vidanges, visites techniques, contrôles périodiques et historique des réparations."
        },
        {
          title: "Gestion du carburant",
          desc: "Enregistrement des prises de carburant, calcul automatique des consommations aux 100 km et détection des anomalies."
        },
        {
          title: "Tableau de bord et indicateurs",
          desc: "KPIs visuels synthétisant la disponibilité de la flotte, les coûts opérationnels et les kilomètres parcourus."
        },
        {
          title: "Récapitulation des activités",
          desc: "Rapports périodiques d'activités téléchargeables pour la gouvernance interne du programme CERES."
        },
        {
          title: "Supervision en temps réel",
          desc: "Visualisation de l'état des véhicules en mission selon les modules actifs."
        },
        {
          title: "Gestion des paramètres",
          desc: "Configuration des alertes de seuils, types de véhicules, stations-services partenaires et réglages système."
        }
      ],

      caseStudy: {
        problem: "Avant la mise en place de FIARAmotion, la gestion du parc roulant au sein du programme CERES rencontrait des défis de traçabilité : suivi manuel ou dispersé des missions, difficulté d'anticiper les entretiens techniques périodiques, manque de visibilité en temps réel sur la consommation réelle de carburant et absence d'un tableau de bord financier unifié.",
        objectives: [
          "Centraliser l'ensemble des informations de la flotte (véhicules, conducteurs, documents) sur une base de données unique.",
          "Fournir une interface PWA réactive utilisable directement par les conducteurs sur le terrain et par les gestionnaires au bureau.",
          "Optimiser les coûts d'exploitation grâce au contrôle rigoureux du carburant et à la maintenance préventive.",
          "Offrir à la Direction une vision claire et analytique pour le pilotage financier et décisionnel."
        ],
        solution: "Conception et développement d'une Progressive Web App (PWA) Full Stack bâtie sur React.js et TypeScript pour le frontend, couplée à une API REST Python / Flask performante et une base de données relationnelle PostgreSQL. L'architecture assure la séparation stricte des rôles via un modèle RBAC à 5 niveaux et garantit une ergonomie fluide sur tous les terminaux.",
        architecture: {
          client: "React.js 18 + TypeScript + Tailwind CSS (PWA responsive, Service Workers)",
          backend: "Python Flask REST API (Modularité des blueprints, validation des données, sécurité)",
          database: "PostgreSQL (Modèle relationnel normalisé, intégrité référentielle, indexation)",
          deployment: "Architecture déployable sur conteneurs et plateformes cloud modernes"
        },
        results: [
          "Fluidification de la chaîne de transmission des demandes de mission entre collaborateurs et direction.",
          "Réduction des risques d'immobilisation imprévue grâce aux alertes préventives d'entretien.",
          "Traçabilité intégrale des dépenses en carburant et des kilométrages déclarés.",
          "Projet salué lors de l'évaluation académique et professionnelle du Master ENI."
        ],
        perspectives: [
          "Intégration d'un module de géolocalisation IoT / GPS en temps réel sur carte interactive.",
          "Implémentation d'algorithmes prédictifs pour l'anticipation de la dépréciation et de l'usure des pièces mécaniques.",
          "Extension des fonctions hors-ligne avec synchronisation en arrière-plan (Background Sync)."
        ]
      },

      gallery: [
        {
          title: "Tableau de Bord & KPIs Opérationnels",
          desc: "Vue d'ensemble de la flotte, indicateurs de disponibilité, suivi des missions et ratios de consommation.",
          image: "assets/fiaramotion-dashboard.svg",
          alt: "Maquette UI Tableau de Bord FIARAmotion",
          isPlaceholderNotice: "Espace configuré pour afficher les captures réelles de l'application (Illustration vectorielle de conception affichée)."
        },
        {
          title: "Architecture Système Full Stack CERES",
          desc: "Schéma complet des flux : Client PWA React/TypeScript → API REST Flask → PostgreSQL.",
          image: "assets/fiaramotion-architecture.svg",
          alt: "Schéma d'Architecture Technique FIARAmotion",
          isPlaceholderNotice: "Schéma technique officiel de conception du projet."
        },
        {
          title: "Interface Mobile PWA (Mode Conducteur)",
          desc: "Vue optimisée pour smartphone : suivi du trajet de mission, saisie rapide du carburant et contrôle de sécurité.",
          image: "assets/fiaramotion-mobile.svg",
          alt: "Interface PWA Mobile FIARAmotion",
          isPlaceholderNotice: "Modèle d'interface mobile prêt pour intégration des captures directes du terminal."
        }
      ]
    },

    /**
     * Emplacements modulaires pour les autres projets
     * Sans inventer de projets factices : espaces prêts pour les réalisations futures de Narindra.
     */
    otherSlots: [
      {
        id: "slot-ai-automation",
        title: "Intelligence Artificielle & AI Agents",
        category: "IA & Automatisation",
        categoryTag: "ai",
        status: "Espace réservé pour documentation",
        description: "Emplacement modulaire destiné à accueillir les projets d'agents autonomes, architectures RAG (Retrieval-Augmented Generation), modèles d'extraction de données (OCR) et intégrations de LLM.",
        technologies: ["Python", "LLM", "RAG", "Scikit-learn", "AI Agents", "n8n"],
        actionLabel: "Documentation en cours"
      },
      {
        id: "slot-web-mobile",
        title: "Applications Web & Mobiles Modernes",
        category: "Développement Full Stack",
        categoryTag: "web",
        status: "Espace réservé pour documentation",
        description: "Emplacement dédié à la présentation d'applications web interactives et de solutions mobiles responsives développées avec React, TypeScript, Python et des APIs REST performantes.",
        technologies: ["React.js", "TypeScript", "Python", "Tailwind CSS", "PostgreSQL"],
        actionLabel: "Documentation en cours"
      },
      {
        id: "slot-automation-n8n",
        title: "Solutions d'Automatisation & Workflows Métiers",
        category: "Automatisation de Processus",
        categoryTag: "automation",
        status: "Espace réservé pour documentation",
        description: "Emplacement réservé pour les projets d'orchestration de flux, d'automatisation de tâches répétitives, d'intégration d'API et de scripts Playwright / n8n.",
        technologies: ["n8n", "Playwright", "Python", "Webhooks", "Automatisation"],
        actionLabel: "Documentation en cours"
      },
      {
        id: "slot-management-erp",
        title: "Applications de Gestion & Systèmes Métiers",
        category: "Gestion & Systèmes",
        categoryTag: "management",
        status: "Espace réservé pour documentation",
        description: "Emplacement réservé pour les outils de gestion d'entreprise, personnalisations ERP (Odoo), et plateformes administratives pour les organisations.",
        technologies: ["Odoo", "Django", "PostgreSQL", "SQL", "Gestion de Parc"],
        actionLabel: "Documentation en cours"
      },
      {
        id: "slot-data-analytics",
        title: "Projets Data Analytics & Visualisation",
        category: "Data & Analyse",
        categoryTag: "data",
        status: "Espace réservé pour documentation",
        description: "Emplacement modulaire pour les pipelines de nettoyage de données, analyses exploratoires et tableaux de bord décisionnels construits avec l'écosystème Python data.",
        technologies: ["Python", "Pandas", "NumPy", "PostgreSQL", "Data Viz"],
        actionLabel: "Documentation en cours"
      },
      {
        id: "slot-systems-security",
        title: "Infrastructure Systèmes, Réseaux & Sécurité",
        category: "Systèmes & Réseaux",
        categoryTag: "systems",
        status: "Espace réservé pour documentation",
        description: "Emplacement réservé pour les projets d'administration de serveurs Linux/Windows, de sécurisation d'infrastructures, de filtrage réseau et d'outils de monitoring.",
        technologies: ["Linux", "Windows Server", "Sécurité", "Réseaux", "Monitoring"],
        actionLabel: "Documentation en cours"
      }
    ]
  },

  /**
   * EXPÉRIENCES PROFESSIONNELLES
   * Fidèle à l'énoncé sans invention de dates non confirmées.
   */
  experiences: [
    {
      institution: "CERES",
      project: "Projet FIARAmotion",
      role: "Développeur Full Stack & Concepteur PWA (Stage)",
      location: "Madagascar",
      type: "Stage de Master",
      summary: "Conception et développement d'une application web et mobile dédiée à la gestion, au suivi et au pilotage opérationnel et financier d'un parc roulant.",
      missions: [
        "Analyse approfondie des besoins opérationnels et formalisation du cahier des charges fonctionnel pour le programme CERES.",
        "Conception de l'architecture logicielle Full Stack découplée (Frontend React/TS PWA + Backend Flask REST API).",
        "Modélisation et mise en œuvre de la base de données relationnelle sous PostgreSQL avec intégrité référentielle stricte.",
        "Développement de modules clés : véhicules, conducteurs, 5 profils d'utilisateurs (RBAC), missions, gestion du carburant, maintenance et KPIs.",
        "Mise en place de l'ergonomie responsive et du support PWA pour les utilisateurs sur le terrain."
      ],
      technologies: ["React.js", "TypeScript", "Python", "Flask", "PostgreSQL", "PWA", "Tailwind CSS"]
    },
    {
      institution: "FID (Fonds d'Intervention pour le Développement)",
      project: "Gestion de Parc Roulant & Support IT",
      role: "Développeur d'Application & Support Informatique",
      location: "Ambositra, Madagascar",
      type: "Projet Professionnel",
      summary: "Développement d'une application de gestion de parc roulant avec Django et participation active au support et à la maintenance du parc informatique.",
      missions: [
        "Conception et développement d'une application web avec le framework Django pour le suivi des véhicules et du matériel roulant.",
        "Participation à l'assistance des utilisateurs et au support technique informatique quotidien.",
        "Maintenance préventive et curative des postes de travail et périphériques de l'institution."
      ],
      technologies: ["Django", "Python", "PostgreSQL", "HTML/CSS", "Support Informatique"]
    },
    {
      institution: "CHU / CHUA (Centre Hospitalier Universitaire)",
      project: "Infrastructure, Réseaux & Sécurité",
      role: "Stagiaire / Technicien Systèmes & Réseaux",
      location: "Fianarantsoa, Madagascar",
      type: "Stage Professionnel",
      summary: "Participation aux activités liées à la sécurité informatique, à l'administration réseau, au filtrage web et à la supervision de l'infrastructure informatique.",
      missions: [
        "Participation active à l'administration et à la configuration des équipements réseaux du complexe hospitalier.",
        "Mise en œuvre et paramétrage de politiques de filtrage web et de sécurisation des accès réseau.",
        "Surveillance et supervision de l'état des serveurs et liaisons informatiques pour garantir la continuité de service.",
        "Assistance technique aux équipes médicales et administratives pour la résolution des incidents réseaux."
      ],
      technologies: ["Administration Réseau", "Sécurité Informatique", "Filtrage Web", "Supervision & Monitoring", "Linux / Windows"]
    }
  ],

  /**
   * FORMATION ACADÉMIQUE
   * Mettant en valeur l'obtention du Master en 2026 à l'ENI Fianarantsoa.
   */
  education: [
    {
      year: "2026",
      isMasterFlagship: true,
      degree: "Master professionnel en Informatique",
      specialization: "Parcours Informatique Générale",
      institution: "École Nationale d'Informatique (ENI) — Fianarantsoa, Madagascar",
      dateInfo: "Diplôme obtenu en Novembre 2026",
      description: "Formation de haut niveau axée sur le génie logiciel, la conception d'architectures applicatives complexes, l'intelligence artificielle, les systèmes distribués et la conduite de projets informatiques d'envergure.",
      status: "Diplôme validé avec succès (Novembre 2026)"
    },
    {
      year: "2025",
      isMasterFlagship: false,
      degree: "Première année de Master professionnel (M1)",
      specialization: "Informatique Générale",
      institution: "École Nationale d'Informatique (ENI) — Fianarantsoa",
      dateInfo: "Année académique 2024–2025",
      description: "Approfondissement des méthodologies de développement avancées, algorithmique appliquée, bases de données relationnelles avancées et réseaux informatiques.",
      status: "Année validée"
    },
    {
      year: "2024",
      isMasterFlagship: false,
      degree: "Licence professionnelle en Informatique",
      specialization: "Génie Logiciel & Systèmes d'Information",
      institution: "École Nationale d'Informatique (ENI) — Fianarantsoa",
      dateInfo: "Diplôme obtenu en 2024",
      description: "Acquisition des fondements théoriques et pratiques de la programmation, des structures de données, du web et de l'administration système.",
      status: "Diplôme obtenu"
    },
    {
      year: "2021 — 2023",
      isMasterFlagship: false,
      degree: "Formation en Licence professionnelle",
      specialization: "Informatique Générale & Fondamentaux",
      institution: "École Nationale d'Informatique (ENI) — Fianarantsoa",
      dateInfo: "Cycle préparatoire et licence",
      description: "Apprentissage intensif des langages fondamentaux (C, Java, Python, Web), modélisation relationnelle (Merise, UML) et systèmes d'exploitation.",
      status: "Cycle validé"
    },
    {
      year: "2020",
      isMasterFlagship: false,
      degree: "Baccalauréat Série C",
      specialization: "Série Scientifique & Mathématiques",
      institution: "Enseignement Secondaire — Madagascar",
      dateInfo: "Session 2020",
      description: "Formation scientifique exigeante en mathématiques et sciences physiques, développant la rigueur logique et l'esprit analytique.",
      status: "Diplôme obtenu"
    }
  ],

  /**
   * SECTION ÉVOLUTIVE : CERTIFICATIONS & FORMATIONS SPÉCIALISÉES
   * Conçue pour recevoir les certifications officielles au fur et à mesure de leur validation.
   */
  certificationsSection: {
    notice: "Section évolutive : structure configurée pour l'ajout direct des certifications officielles au fur et à mesure de leur délivrance.",
    categories: [
      {
        title: "Intelligence Artificielle & Data Science",
        icon: "brain",
        status: "Espace prêt pour certifications officielles",
        examples: "Machine Learning, LLM & Prompt Engineering, Deep Learning, Data Analysis"
      },
      {
        title: "Développement Logiciel & Architecture",
        icon: "code",
        status: "Espace prêt pour certifications officielles",
        examples: "Full Stack Web Development, React / TypeScript, Python Professional"
      },
      {
        title: "Cybersécurité & Réseaux",
        icon: "shield-check",
        status: "Espace prêt pour certifications officielles",
        examples: "Sécurité des SI, Sécurité Réseau, Protocoles de communication"
      },
      {
        title: "Cloud Computing & DevOps",
        icon: "cloud",
        status: "Espace prêt pour certifications officielles",
        examples: "Conteneurisation Docker, CI/CD, Déploiement Cloud"
      }
    ]
  }
};

// Export global pour utilisation dans app.js et terminal.js
if (typeof window !== 'undefined') {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
