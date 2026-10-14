/* ==========================================================================
   CONTENU DU PORTFOLIO
   --------------------------------------------------------------------------
   C'est LE fichier à modifier pour changer les textes du site.
   La page (index.html) lit ce fichier et affiche tout automatiquement.

   Trois règles, sinon la page reste vide :
   1. Chaque texte est entre guillemets droits : "mon texte".
      Les apostrophes ' et ’ marchent sans problème.
      Pour des guillemets à l'intérieur d'un texte, utilise « ».
   2. Chaque élément se termine par une virgule, même le dernier d'une liste.
   3. Un champ vide ("" ou []) n'est pas affiché sur le site :
      laisse-le vide tant que tu n'as pas l'information.

   Après une modification : enregistre, puis recharge la page (Ctrl + F5).
   Si tu as fait une erreur, un encadré orange apparaît en bas de la page
   (seulement sur ton ordinateur) et t'indique quoi corriger.
   ========================================================================== */

const PORTFOLIO = {

  /* ------------------------------------------------------------------------
     1. RÉGLAGES GÉNÉRAUX
     ------------------------------------------------------------------------ */
  site: {
    nomMachine: "portfolio",          // nom affiché dans la console : portfolio#
    miseAJour: "octobre 2026",        // affiché en bas de page
  },

  /* ------------------------------------------------------------------------
     2. PROFIL : haut de page et console
     ------------------------------------------------------------------------ */
  profil: {
    nom: "Nathan Place",
    accroche: "Étudiant en 2e année de BUT Réseaux & Télécommunications à l’IUT de Béziers, spécialité Cybersécurité.",
    formation: "BUT Réseaux & Télécommunications",
    annee: "2e année",
    specialite: "Cybersécurité",
    etablissement: "IUT de Béziers",
    photo: "images/photo.jpg",
    cv: "CV_Nathan_Place.pdf",        // ton CV, à remplacer par la nouvelle version quand tu le mets à jour

    stage: {
      enRecherche: true,              // false = cache « je recherche un stage » partout sur le site
      poste: "technicien systèmes et réseaux",
      duree: "8 semaines",
      disponibilite: "",              // ex. "à partir du 6 avril 2027" (vide = non affiché)
    },
  },

  /* ------------------------------------------------------------------------
     3. À PROPOS
     ------------------------------------------------------------------------ */
  aPropos: {
    paragraphes: [
      "Je suis étudiant en deuxième année de BUT Réseaux & Télécommunications à l’IUT de Béziers, en spécialité Cybersécurité. Je viens d’un bac général avec les spécialités Numérique et sciences informatiques (NSI) et Mathématiques.",
      "Je suis passionné par l’informatique, les réseaux et les télécommunications. Curieux de nature, je me renseigne sur les nouvelles technologies.",
      "J’espère rejoindre l’Armée de Terre à la suite de mon BUT, pour un métier précis qui reste à définir.",
    ],
    langues: [
      { nom: "Français", niveau: "Langue maternelle" },
      { nom: "Anglais", niveau: "B2-C1" },
      { nom: "Espagnol", niveau: "Bases acquises" },
    ],
    atouts: [
      "Persévérant",
      "Curieux",
      "Communication orale claire et naturelle",
      "Sociable, je m’intègre vite dans une équipe",
    ],
    infosPratiques: [
      "Permis B",
      "Béziers et Montpellier",
    ],
    interets: [
      "Football",
      "Course à pied",
      "Mangas",
    ],
  },

  /* ------------------------------------------------------------------------
     4. COMPÉTENCES
     Niveaux possibles : "notions", "pratique", "valide" (définis juste après).
     Chaque compétence a un identifiant (id) : c'est lui que tu écris dans
     un projet ou une certification pour la relier. Les preuves s'affichent
     ensuite toutes seules à côté de la compétence.
     ------------------------------------------------------------------------ */
  niveaux: {
    notions:  { nom: "Notions",  explication: "Bases acquises." },
    pratique: { nom: "Pratiqué", explication: "Mis en œuvre concrètement." },
    valide:   { nom: "Validé",   explication: "Attesté par une certification ou une évaluation." },
  },

  competences: [
    {
      categorie: "Réseaux",
      items: [
        { id: "adressage",   nom: "Adressage IP et sous-réseaux",            detail: "VLSM, subnetting",           niveau: "pratique" },
        { id: "vlan",        nom: "VLAN et routage inter-VLAN",              detail: "",                           niveau: "pratique" },
        { id: "dhcp-dns",    nom: "Services DHCP et DNS",                    detail: "",                           niveau: "pratique" },
        { id: "mikrotik",    nom: "Configuration d’équipements MikroTik",    detail: "Avec WinBox",                niveau: "pratique" },
        { id: "diagnostic",  nom: "Diagnostic de pannes",                    detail: "Réseaux et systèmes",        niveau: "pratique" },
      ],
    },
    {
      categorie: "Câblage et infrastructure",
      items: [
        { id: "cablage",       nom: "Câblage et déploiement d’infrastructure réseau", detail: "",                    niveau: "pratique" },
        { id: "certif-cuivre", nom: "Certification de câblage cuivre",               detail: "Cat 6A et Cat 5e",     niveau: "pratique" },
        // Exemple à activer quand tu auras ajouté ton projet d'accès optique :
        // { id: "fibre", nom: "Accès optique", detail: "", niveau: "pratique" },
      ],
    },
    {
      categorie: "Systèmes et virtualisation",
      items: [
        { id: "os",             nom: "Installation et configuration de systèmes d’exploitation", detail: "Windows, Linux",                    niveau: "pratique" },
        { id: "virtualisation", nom: "Création et déploiement de machines virtuelles",            detail: "Oracle VirtualBox",                 niveau: "pratique" },
        { id: "nginx",          nom: "Serveur web Nginx",                                         detail: "Configuration et administration sous Debian", niveau: "pratique" },
        { id: "materiel",       nom: "Remplacement de composants matériels",                      detail: "RAM, disques…",                     niveau: "pratique" },
      ],
    },
    {
      categorie: "Cybersécurité",
      items: [
        { id: "acl-nat",        nom: "Sécurisation par ACL et NAT/PAT",              detail: "",                                                                    niveau: "pratique" },
        { id: "securite-acces", nom: "Sécurité réseau et gestion des accès",         detail: "",                                                                    niveau: "notions" },
        { id: "hygiene",        nom: "Hygiène informatique et sécurité du numérique", detail: "Authentification, sécurité sur Internet, poste de travail et nomadisme", niveau: "valide" },
      ],
    },
    {
      categorie: "Développement et données",
      items: [
        { id: "scripts", nom: "Programmation de scripts",        detail: "Visual Studio Code",           niveau: "pratique" },
        { id: "bdd",     nom: "Bases de données relationnelles", detail: "Création et gestion, MariaDB", niveau: "pratique" },
        { id: "web",     nom: "HTML et CSS",                     detail: "Sites vitrines",               niveau: "pratique" },
      ],
    },
    {
      categorie: "Méthodes et outils numériques",
      items: [
        { id: "documentation", nom: "Rédaction de documentation technique", detail: "",                 niveau: "pratique" },
        { id: "veille",        nom: "Recherche et veille d’information",    detail: "Niveau 4 sur 7",   niveau: "valide" },
        { id: "donnees",       nom: "Gestion et traitement de données",     detail: "Niveau 4 sur 7",   niveau: "valide" },
      ],
    },
  ],

  // Badges « Outils utilisés », affichés sous les compétences
  outils: [
    "Cisco Packet Tracer",
    "WinBox",
    "Oracle VirtualBox",
    "Debian",
    "Nginx",
    "MariaDB",
    "Visual Studio Code",
    "Windows",
    "Linux",
    "Microsoft Office",
  ],

  /* ------------------------------------------------------------------------
     5. PROJETS
     Pour ajouter un projet : copie le modèle ci-dessous, colle-le dans la
     liste « projets » (entre les crochets [ ]), puis remplis les champs.
     Les projets s'affichent dans l'ordre de la liste : mets le plus
     important en premier.

     {
       id: "mon-projet",                 // unique, sans espace ni accent
       type: "Projet",                   // "Projet" ou "Stage"
       categorie: "Réseau",              // ex. Réseau, Accès optique, Systèmes, Web
       titre: "Titre du projet",
       titreCourt: "",                   // titre court pour les liens de preuve (facultatif)
       cadre: "SAÉ, BUT R&T, IUT de Béziers",
       periode: "Semestre 3, 2026",
       resume: "Une ou deux phrases visibles sans ouvrir le détail.",
       contexte: "",
       objectif: "",
       realisations: [
         "Ce que j’ai fait, étape 1",
         "Ce que j’ai fait, étape 2",
       ],
       outils: ["Outil 1", "Outil 2"],
       competences: ["vlan", "dhcp-dns"],  // identifiants de la partie 4
       resultat: "",
       liens: [
         { texte: "Rapport (PDF)", url: "documents/rapport.pdf" },
       ],
       image: "",                        // ex. "images/topologie.png"
     },
     ------------------------------------------------------------------------ */
  projets: [
    {
      id: "reseau-multisites",
      type: "Projet",
      categorie: "Réseau",
      titre: "Réseau d’entreprise multisites",
      titreCourt: "Réseau multisites",
      cadre: "Projet BUT R&T, IUT de Béziers",
      periode: "",
      resume: "Conception sous Cisco Packet Tracer puis déploiement sur matériel réel : VLAN, routage inter-VLAN, DHCP, DNS, ACL et NAT/PAT.",
      contexte: "Projet réalisé dans le cadre du BUT Réseaux & Télécommunications à l’IUT de Béziers.",
      objectif: "Concevoir le réseau d’une entreprise multisites sous Cisco Packet Tracer, puis le déployer sur du matériel réel.",
      realisations: [
        "Conception du réseau multisites sous Cisco Packet Tracer",
        "Segmentation en VLAN et routage inter-VLAN",
        "Mise en place des services DHCP et DNS",
        "Sécurisation du réseau par listes de contrôle d’accès (ACL) et NAT/PAT",
        "Déploiement sur matériel réel",
        "Rédaction de la documentation technique",
      ],
      outils: ["Cisco Packet Tracer"],
      competences: ["vlan", "dhcp-dns", "acl-nat", "documentation"],
      resultat: "",
      liens: [],
      image: "",
    },
    {
      id: "cablage-cuivre",
      type: "Projet",
      categorie: "Câblage",
      titre: "Certification d’une infrastructure de câblage cuivre",
      titreCourt: "Câblage cuivre",
      cadre: "Projet BUT R&T, IUT de Béziers",
      periode: "",
      resume: "Certification de liens en câblage cuivre de catégories 6A et 5e.",
      contexte: "Projet réalisé dans le cadre du BUT Réseaux & Télécommunications à l’IUT de Béziers.",
      objectif: "",
      realisations: [],
      outils: [],
      competences: ["cablage", "certif-cuivre"],
      resultat: "",
      liens: [],
      image: "",
    },
    {
      id: "stage-crous",
      type: "Stage",
      categorie: "Systèmes",
      titre: "Stage d’observation à la DSIN du Crous",
      titreCourt: "DSIN du Crous",
      cadre: "Crous de Montpellier – Occitanie",
      periode: "Décembre 2021",
      resume: "Installation de systèmes d’exploitation et remplacement de composants matériels sur des équipements informatiques.",
      contexte: "Stage d’observation au sein de la DSIN du Crous de Montpellier – Occitanie, à Montpellier.",
      objectif: "",
      realisations: [
        "Installation de systèmes d’exploitation sur des postes de travail via des clés USB bootables",
        "Démontage et remplacement de composants matériels (RAM, disques…) sur des équipements informatiques",
      ],
      outils: ["Clés USB bootables"],
      competences: ["os", "materiel"],
      resultat: "",
      liens: [],
      image: "",
    },
    {
      id: "portfolio-v1",
      type: "Projet",
      categorie: "Web",
      titre: "Premier portfolio web",
      titreCourt: "",
      cadre: "",
      periode: "2025",
      resume: "Site vitrine de quatre pages en HTML et CSS pour présenter mon profil.",
      contexte: "",
      objectif: "Présenter mon profil en ligne : accueil, compétences, diplômes et certifications, contact.",
      realisations: [
        "Création de quatre pages en HTML : accueil, compétences, diplômes et certifications, contact",
        "Mise en page en CSS : Flexbox, barre de navigation fixe, cartes translucides, zoom des attestations au survol",
        "Ajout d’un module de traduction automatique du français vers l’anglais",
      ],
      outils: ["HTML", "CSS"],
      competences: ["web"],
      resultat: "Première version de ce portfolio.",
      liens: [],
      image: "",
    },
  ],

  /* ------------------------------------------------------------------------
     6. PARCOURS (du plus récent au plus ancien)
     Le stage que tu recherches s'ajoute tout seul en haut de la frise
     tant que profil.stage.enRecherche vaut true.
     etat : "en-cours" pour ce que tu fais en ce moment, sinon "".
     projet : identifiant d'un projet de la partie 5 pour ajouter un lien.
     ------------------------------------------------------------------------ */
  parcours: [
    {
      quand: "Depuis 2025",
      quoi: "BUT Réseaux & Télécommunications",
      ou: "IUT de Béziers (34)",
      details: ["Spécialité Cybersécurité", "Actuellement en 2e année"],
      etat: "en-cours",
      projet: "",
    },
    {
      quand: "2024 – 2025",
      quoi: "Baccalauréat général",
      ou: "Lycée Georges Pompidou, Castelnau-le-Lez (34)",
      details: ["Spécialités Numérique et sciences informatiques (NSI) et Mathématiques", "Mention Assez bien"],
      etat: "",
      projet: "",
    },
    {
      quand: "Décembre 2021",
      quoi: "Stage d’observation à la DSIN du Crous",
      ou: "Crous de Montpellier – Occitanie, Montpellier (34)",
      details: [],
      etat: "",
      projet: "stage-crous",
    },
  ],

  /* ------------------------------------------------------------------------
     7. CERTIFICATIONS
     console : texte court affiché dans la console du haut de page
               (vide = la certification n'y apparaît pas).
     ------------------------------------------------------------------------ */
  certifications: [
    {
      id: "anssi",
      titre: "MOOC SecNumacadémie",
      titreCourt: "SecNumacadémie",
      organisme: "ANSSI",
      date: "19 novembre 2025",
      resultat: "100 % aux 4 modules",
      titreDetails: "Modules évalués",
      details: [
        "Panorama de la SSI",
        "Sécurité de l’authentification",
        "Sécurité sur Internet",
        "Sécurité du poste de travail et nomadisme",
      ],
      image: "images/attestation-anssi.jpg",
      verification: null,
      console: "100 % aux 4 modules",
      competences: ["hygiene"],
    },
    {
      id: "pix",
      titre: "Certification Pix",
      titreCourt: "Pix",
      organisme: "Pix",
      date: "23 janvier 2025",
      resultat: "419 pix sur 896",
      titreDetails: "Extrait des compétences certifiées",
      details: [
        "Mener une recherche et une veille d’information : niveau 4 sur 7",
        "Gérer des données : niveau 4 sur 7",
        "Traiter des données : niveau 4 sur 7",
      ],
      image: "images/attestation-pix.jpg",   // date de naissance floutée
      verification: {
        code: "P-Y9GP6VYP",
        url: "https://app.pix.fr/verification-certificat",
        texte: "Vérifier sur le site Pix",
      },
      console: "419 pix",
      competences: ["veille", "donnees"],
    },
    {
      id: "cybert",
      titre: "CybeR&T – Hygiène informatique",
      titreCourt: "CybeR&T",
      organisme: "",
      date: "",
      resultat: "",
      titreDetails: "",
      details: [],
      image: "",
      verification: null,
      console: "Hygiène informatique",
      competences: ["hygiene"],
    },
  ],

  /* ------------------------------------------------------------------------
     8. CONTACT
     Le premier email de la liste est utilisé par le bouton « M'écrire ».
     ------------------------------------------------------------------------ */
  contact: {
    emails: [
      { libelle: "Email", adresse: "nath.place415@gmail.com" },
      { libelle: "Email étudiant", adresse: "nathan.place-neveux@etu.umontpellier.fr" },
    ],
    linkedin: "https://www.linkedin.com/in/nathan-place/",
    github: "",                       // ex. "https://github.com/ton-pseudo" (vide = non affiché)
    localisation: "Béziers et Montpellier",
  },

  /* ------------------------------------------------------------------------
     9. PHRASES D'INTRODUCTION DES SECTIONS
     Elles s'adressent aux visiteurs (recruteurs) : garde le vouvoiement.
     ------------------------------------------------------------------------ */
  intros: {
    competences: "Chaque compétence indique son niveau et renvoie aux projets, stages ou certifications qui la prouvent.",
    projets: "Ouvrez le détail d’un projet pour voir son contexte, ce que j’ai fait et les outils utilisés.",
    contact: "Une offre de stage ou une question ? Écrivez-moi par email ou sur LinkedIn.",
  },
};
