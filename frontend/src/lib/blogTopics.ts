export interface BlogTopic {
  id: string;
  category: "Grammaire" | "Expression Écrite" | "Expression Orale" | "Compréhension" | "Cheat Sheet";
  title: string;
  difficulty: "Tous Niveaux" | "B2 / CLB 7+" | "C1-C2 / CLB 9+";
  template: "A" | "B" | "C" | "D" | "E";
}

export const BLOG_TOPICS: BlogTopic[] = [
  // ==========================================
  // EXISTING ARTICLES (Cached / Completed)
  // ==========================================
  {
    id: "connecteurs-logiques",
    category: "Cheat Sheet",
    title: "Cheat Sheet — Les Connecteurs Logiques pour viser le CLB 9+",
    difficulty: "C1-C2 / CLB 9+",
    template: "A"
  },
  {
    id: "ecrite-tache-1",
    category: "Expression Écrite",
    title: "Modèle Pratique — Expression Écrite Tâche 1 : Le Courriel de la Vie Quotidienne",
    difficulty: "B2 / CLB 7+",
    template: "E"
  },
  {
    id: "orale-tache-2",
    category: "Expression Orale",
    title: "Réussir l'Expression Orale Tâche 2 : L'Entretien en Interaction",
    difficulty: "B2 / CLB 7+",
    template: "D"
  },
  {
    id: "lecture-rapide",
    category: "Compréhension",
    title: "Techniques de Lecture Rapide pour la Compréhension Écrite du TCF",
    difficulty: "Tous Niveaux",
    template: "B"
  },
  {
    id: "orale-tache-3",
    category: "Grammaire",
    title: "Cheat Sheet — Vocabulaire et Structures pour la Tâche 3 de l'Expression Orale",
    difficulty: "C1-C2 / CLB 9+",
    template: "A"
  },
  {
    id: "expressions-subjonctives-incontournables-expression-ecrite",
    category: "Cheat Sheet",
    title: "Les expressions subjonctives incontournables pour l'Expression Écrite",
    difficulty: "B2 / CLB 7+",
    template: "C"
  },
  {
    id: "guide-tache-1-se-presenter-de-facon-impactante",
    category: "Expression Orale",
    title: "Guide de la Tâche 1 : Se présenter de façon impactante",
    difficulty: "Tous Niveaux",
    template: "C"
  },
  {
    id: "gerondif-fluidifier-ses-phrases-b2",
    category: "Grammaire",
    title: "Comment utiliser le gérondif pour fluidifier ses phrases",
    difficulty: "B2 / CLB 7+",
    template: "B"
  },
  {
    id: "structure-comparer-deux-points-de-vue-tache-3",
    category: "Expression Écrite",
    title: "Expression Écrite Tâche 3 : Structure type pour comparer deux points de vue",
    difficulty: "B2 / CLB 7+",
    template: "E"
  },

  // ==========================================
  // CHEAT SHEETS (40 total, 3 existing, 37 new)
  // ==========================================
  {
    id: "50-expressions-nuancer-opinion",
    category: "Cheat Sheet",
    title: "50 expressions indispensables pour nuancer son opinion au TCF",
    difficulty: "B2 / CLB 7+",
    template: "C"
  },
  {
    id: "lexique-accord-desaccord-tache-3",
    category: "Cheat Sheet",
    title: "Le lexique avancé de l'accord et du désaccord",
    difficulty: "C1-C2 / CLB 9+",
    template: "A"
  },
  {
    id: "exprimer-cause-consequence-elegance",
    category: "Cheat Sheet",
    title: "Fiche mémo : Exprimer la cause et la conséquence avec élégance",
    difficulty: "B2 / CLB 7+",
    template: "B"
  },
  {
    id: "vocabulaire-environnement-ecologie-clb9",
    category: "Cheat Sheet",
    title: "Vocabulaire thématique : Environnement et Écologie pour le niveau C1/C2",
    difficulty: "C1-C2 / CLB 9+",
    template: "A"
  },
  {
    id: "vocabulaire-education-nouvelles-technologies",
    category: "Cheat Sheet",
    title: "Vocabulaire thématique : Éducation et Nouvelles Technologies",
    difficulty: "B2 / CLB 7+",
    template: "B"
  },
  {
    id: "vocabulaire-travail-tele-travail",
    category: "Cheat Sheet",
    title: "Vocabulaire thématique : Travail, Télétravail et Équilibre de Vie",
    difficulty: "B2 / CLB 7+",
    template: "C"
  },
  {
    id: "vocabulaire-sante-intelligence-artificielle",
    category: "Cheat Sheet",
    title: "Vocabulaire thématique : Santé, Éthique et Intelligence Artificielle",
    difficulty: "C1-C2 / CLB 9+",
    template: "D"
  },
  {
    id: "expressions-idiomatiques-adorees-examinateurs",
    category: "Cheat Sheet",
    title: "15 expressions idiomatiques françaises adorées des examinateurs",
    difficulty: "C1-C2 / CLB 9+",
    template: "A"
  },
  {
    id: "remplacer-verbes-ternes",
    category: "Cheat Sheet",
    title: "Comment remplacer les verbes ternes (faire, dire, avoir, être) à l'écrit",
    difficulty: "B2 / CLB 7+",
    template: "C"
  },
  {
    id: "15-adverbes-sophistiques-structure",
    category: "Cheat Sheet",
    title: "15 adverbes sophistiqués pour structurer vos phrases",
    difficulty: "B2 / CLB 7+",
    template: "A"
  },
  {
    id: "guide-prepositions-lieu-temps",
    category: "Cheat Sheet",
    title: "Le guide des prépositions de lieu et de temps",
    difficulty: "Tous Niveaux",
    template: "B"
  },
  {
    id: "lexique-immigration-integration-canada",
    category: "Cheat Sheet",
    title: "Lexique de l'immigration et de l'intégration au Canada",
    difficulty: "B2 / CLB 7+",
    template: "C"
  },
  {
    id: "art-concession-bien-que-certes",
    category: "Cheat Sheet",
    title: "Fiche mémo : L'art de la concession (bien que, quoique, certes...)",
    difficulty: "C1-C2 / CLB 9+",
    template: "E"
  },
  {
    id: "structures-impersonnelles-introduction-argument",
    category: "Cheat Sheet",
    title: "Structures impersonnelles pour introduire un argument (il est indéniable que...)",
    difficulty: "C1-C2 / CLB 9+",
    template: "A"
  },
  {
    id: "verbes-opinion-constructions",
    category: "Cheat Sheet",
    title: "Les verbes d'opinion et leurs constructions (subjonctif vs indicatif)",
    difficulty: "B2 / CLB 7+",
    template: "D"
  },
  {
    id: "vocabulaire-comparaison-proportion",
    category: "Cheat Sheet",
    title: "Vocabulaire de la comparaison et de la proportion",
    difficulty: "B2 / CLB 7+",
    template: "B"
  },
  {
    id: "mots-liaison-temporels-tache-1",
    category: "Cheat Sheet",
    title: "Les mots de liaison temporels pour raconter une expérience (Tâche 1)",
    difficulty: "Tous Niveaux",
    template: "C"
  },
  {
    id: "vocabulaire-formel-courriel-professionnel",
    category: "Cheat Sheet",
    title: "Vocabulaire formel et tournures pour le courriel professionnel",
    difficulty: "B2 / CLB 7+",
    template: "E"
  },
  {
    id: "exprimer-doute-certitude-probabilite",
    category: "Cheat Sheet",
    title: "Comment exprimer le doute, la certitude et la probabilité",
    difficulty: "C1-C2 / CLB 9+",
    template: "D"
  },
  {
    id: "lexique-transition-numerique-cybersecurite",
    category: "Cheat Sheet",
    title: "Lexique de la transition numérique et de la cybersécurité",
    difficulty: "C1-C2 / CLB 9+",
    template: "A"
  },
  {
    id: "expressions-cles-introduire-exemples",
    category: "Cheat Sheet",
    title: "Les expressions clés pour introduire des exemples pertinents",
    difficulty: "Tous Niveaux",
    template: "B"
  },
  {
    id: "vocabulaire-presse-medias-information",
    category: "Cheat Sheet",
    title: "Vocabulaire de la presse et des médias d'information",
    difficulty: "B2 / CLB 7+",
    template: "C"
  },
  {
    id: "pronoms-y-en-simplifies",
    category: "Cheat Sheet",
    title: "Fiche de révision : Les pronoms y et en simplifiés",
    difficulty: "Tous Niveaux",
    template: "B"
  },
  {
    id: "doubles-pronoms-le-lui-la-leur",
    category: "Cheat Sheet",
    title: "Les doubles pronoms (le lui, la leur) sans fautes",
    difficulty: "B2 / CLB 7+",
    template: "D"
  },
  {
    id: "subjonctif-passe-usage",
    category: "Cheat Sheet",
    title: "Le subjonctif passé : quand et comment l'utiliser",
    difficulty: "C1-C2 / CLB 9+",
    template: "A"
  },
  {
    id: "futur-anterieur-expression-projection",
    category: "Cheat Sheet",
    title: "Le futur antérieur pour exprimer la projection",
    difficulty: "B2 / CLB 7+",
    template: "B"
  },
  {
    id: "conditionnel-passe-regret-reproche",
    category: "Cheat Sheet",
    title: "Le conditionnel passé pour exprimer le regret ou le reproche",
    difficulty: "B2 / CLB 7+",
    template: "C"
  },
  {
    id: "participe-present-adjectif-verbal",
    category: "Cheat Sheet",
    title: "Structures avancées : Le participe présent et l'adjectif verbal",
    difficulty: "C1-C2 / CLB 9+",
    template: "D"
  },
  {
    id: "expression-condition-hypothese",
    category: "Cheat Sheet",
    title: "L'expression de la condition et de l'hypothèse (si, au cas où...)",
    difficulty: "B2 / CLB 7+",
    template: "E"
  },
  {
    id: "articulateurs-restriction-ne-que",
    category: "Cheat Sheet",
    title: "Les articulateurs de restriction (ne... que, seulement, uniquement)",
    difficulty: "Tous Niveaux",
    template: "B"
  },
  {
    id: "vocabulaire-urbanisme-transports-demain",
    category: "Cheat Sheet",
    title: "Vocabulaire de l'urbanisme et des transports de demain",
    difficulty: "B2 / CLB 7+",
    template: "C"
  },
  {
    id: "lexique-economie-marche-emploi-canada",
    category: "Cheat Sheet",
    title: "Lexique de l'économie et du marché de l'emploi canadien",
    difficulty: "C1-C2 / CLB 9+",
    template: "A"
  },
  {
    id: "exprimer-surprise-indignation-enthousiasme",
    category: "Cheat Sheet",
    title: "Comment exprimer la surprise, l'indignation et l'enthousiasme à l'oral",
    difficulty: "B2 / CLB 7+",
    template: "D"
  },
  {
    id: "formules-politesse-fin-lettre-courriel",
    category: "Cheat Sheet",
    title: "Les formules de politesse de fin de lettre (Tâche 1 & 2 Écrite)",
    difficulty: "Tous Niveaux",
    template: "E"
  },
  {
    id: "vocabulaire-culture-arts-patrimoine",
    category: "Cheat Sheet",
    title: "Le vocabulaire de la culture, des arts et du patrimoine",
    difficulty: "B2 / CLB 7+",
    template: "C"
  },
  {
    id: "introduire-objection-diplomatie",
    category: "Cheat Sheet",
    title: "Comment introduire une objection de manière diplomatique",
    difficulty: "C1-C2 / CLB 9+",
    template: "D"
  },
  {
    id: "transitions-logiques-entre-paragraphes",
    category: "Cheat Sheet",
    title: "Fiche mémo : Réussir les transitions logiques entre vos paragraphes",
    difficulty: "B2 / CLB 7+",
    template: "E"
  },
  {
    id: "pieges-faux-amis-francais-avance",
    category: "Cheat Sheet",
    title: "Les pièges des faux-amis en français de niveau avancé",
    difficulty: "C1-C2 / CLB 9+",
    template: "A"
  },

  // ==========================================
  // GRAMMAIRE (20 total, 2 existing, 18 new)
  // ==========================================
  {
    id: "passe-compose-vs-imparfait-regle-definitive",
    category: "Grammaire",
    title: "Passé composé vs imparfait : la règle définitive",
    difficulty: "B2 / CLB 7+",
    template: "E"
  },
  {
    id: "subjonctif-present-conjugaison-declencheurs",
    category: "Grammaire",
    title: "Le subjonctif présent : conjugaison et déclencheurs fréquents",
    difficulty: "B2 / CLB 7+",
    template: "A"
  },
  {
    id: "pronoms-relatifs-simples-maitrise",
    category: "Grammaire",
    title: "Les pronoms relatifs simples (qui, que, où, dont) maîtrisés",
    difficulty: "Tous Niveaux",
    template: "B"
  },
  {
    id: "pronoms-relatifs-composes-lesquels",
    category: "Grammaire",
    title: "Les pronoms relatifs composés (lequel, auquel, duquel) simplifiés",
    difficulty: "C1-C2 / CLB 9+",
    template: "D"
  },
  {
    id: "accord-participe-passe-auxiliaire-avoir",
    category: "Grammaire",
    title: "L'accord du participe passé avec l'auxiliaire avoir : règles et pièges",
    difficulty: "B2 / CLB 7+",
    template: "E"
  },
  {
    id: "subjonctif-vs-indicatif-verbes-opinion",
    category: "Grammaire",
    title: "Le subjonctif vs l'indicatif après les verbes d'opinion",
    difficulty: "B2 / CLB 7+",
    template: "C"
  },
  {
    id: "concordance-temps-discours-indirect",
    category: "Grammaire",
    title: "La concordance des temps dans le discours indirect",
    difficulty: "C1-C2 / CLB 9+",
    template: "D"
  },
  {
    id: "futur-simple-vs-futur-proche-nuances",
    category: "Grammaire",
    title: "Le futur simple vs le futur proche : nuances et usages",
    difficulty: "Tous Niveaux",
    template: "B"
  },
  {
    id: "conditionnel-present-politesse-conseil-hypothese",
    category: "Grammaire",
    title: "Le conditionnel présent : politesse, conseil et hypothèse",
    difficulty: "Tous Niveaux",
    template: "A"
  },
  {
    id: "negation-complexe-plus-jamais-guere",
    category: "Grammaire",
    title: "La négation complexe (ne... plus, ne... jamais, ne... guère)",
    difficulty: "B2 / CLB 7+",
    template: "B"
  },
  {
    id: "adverbes-en-ment-formation-place",
    category: "Grammaire",
    title: "Les adverbes en -ment : formation et place dans la phrase",
    difficulty: "Tous Niveaux",
    template: "C"
  },
  {
    id: "expression-cause-structures-utiles",
    category: "Grammaire",
    title: "L'expression de la cause : de 'parce que' à 'en raison de'",
    difficulty: "B2 / CLB 7+",
    template: "E"
  },
  {
    id: "expression-but-pour-que-afin-de",
    category: "Grammaire",
    title: "L'expression du but : pour que, afin de, dans le but de",
    difficulty: "B2 / CLB 7+",
    template: "C"
  },
  {
    id: "opposition-concession-mais-pourtant-bien-que",
    category: "Grammaire",
    title: "L'expression de l'opposition et de la concession : mais, pourtant, bien que",
    difficulty: "C1-C2 / CLB 9+",
    template: "A"
  },
  {
    id: "voix-passive-structure-interet",
    category: "Grammaire",
    title: "La voix passive : structure, intérêt et écriture journalistique",
    difficulty: "C1-C2 / CLB 9+",
    template: "D"
  },
  {
    id: "verbes-pronominaux-accord-participe-passe",
    category: "Grammaire",
    title: "Les verbes pronominaux et l'accord de leur participe passé",
    difficulty: "B2 / CLB 7+",
    template: "E"
  },
  {
    id: "pluriel-noms-composes-adjectifs-couleur",
    category: "Grammaire",
    title: "Le pluriel des noms composés et des adjectifs de couleur",
    difficulty: "C1-C2 / CLB 9+",
    template: "C"
  },
  {
    id: "infinitif-passe-expression-anteriorite",
    category: "Grammaire",
    title: "L'infinitif passé pour exprimer l'antériorité",
    difficulty: "B2 / CLB 7+",
    template: "A"
  },
  {
    id: "subjonctif-imparfait-valeur-litteraire",
    category: "Grammaire",
    title: "Le subjonctif imparfait : comprendre sa valeur dans la littérature",
    difficulty: "C1-C2 / CLB 9+",
    template: "D"
  },

  // ==========================================
  // EXPRESSION ÉCRITE (15 total, 2 existing, 13 new)
  // ==========================================
  {
    id: "reussir-tache-1-lettre-invitation-amicale",
    category: "Expression Écrite",
    title: "Réussir la Tâche 1 : Rédiger une lettre d'invitation amicale",
    difficulty: "Tous Niveaux",
    template: "E"
  },
  {
    id: "reussir-tache-1-demande-informations-formelle",
    category: "Expression Écrite",
    title: "Réussir la Tâche 1 : Rédiger une demande d'informations formelle",
    difficulty: "B2 / CLB 7+",
    template: "E"
  },
  {
    id: "reussir-tache-1-courriel-excuses-desistement",
    category: "Expression Écrite",
    title: "Réussir la Tâche 1 : Rédiger un courriel d'excuses ou de désistement",
    difficulty: "B2 / CLB 7+",
    template: "E"
  },
  {
    id: "reussir-tache-2-experience-voyage-marquante",
    category: "Expression Écrite",
    title: "Réussir la Tâche 2 : Décrire une expérience de voyage marquante",
    difficulty: "B2 / CLB 7+",
    template: "A"
  },
  {
    id: "reussir-tache-2-compte-rendu-evenement",
    category: "Expression Écrite",
    title: "Réussir la Tâche 2 : Rédiger un compte-rendu d'événement",
    difficulty: "B2 / CLB 7+",
    template: "C"
  },
  {
    id: "reussir-tache-2-portrait-personne-inspirante",
    category: "Expression Écrite",
    title: "Réussir la Tâche 2 : Faire le portrait d'une personne inspirante",
    difficulty: "Tous Niveaux",
    template: "B"
  },
  {
    id: "reussir-tache-3-analyser-fait-societe-equilibre",
    category: "Expression Écrite",
    title: "Réussir la Tâche 3 : Comment analyser un fait de société de manière équilibrée",
    difficulty: "C1-C2 / CLB 9+",
    template: "A"
  },
  {
    id: "reussir-tache-3-argumentation-persuasive-c1",
    category: "Expression Écrite",
    title: "Réussir la Tâche 3 : Rédiger une argumentation persuasive de niveau C1",
    difficulty: "C1-C2 / CLB 9+",
    template: "D"
  },
  {
    id: "gestion-temps-expression-ecrite-tcf",
    category: "Expression Écrite",
    title: "La gestion du temps pour l'Expression Écrite du TCF Canada",
    difficulty: "Tous Niveaux",
    template: "C"
  },
  {
    id: "compter-mots-efficacement-eviter-penalites",
    category: "Expression Écrite",
    title: "Comment compter ses mots efficacement et éviter les pénalités",
    difficulty: "Tous Niveaux",
    template: "B"
  },
  {
    id: "5-erreurs-grammaticales-frequentes-ecrit",
    category: "Expression Écrite",
    title: "Les 5 erreurs grammaticales les plus fréquentes à l'écrit",
    difficulty: "B2 / CLB 7+",
    template: "A"
  },
  {
    id: "structurer-brouillon-5-minutes-chaque-tache",
    category: "Expression Écrite",
    title: "Comment structurer son brouillon en 5 minutes pour chaque tâche",
    difficulty: "B2 / CLB 7+",
    template: "D"
  },
  {
    id: "checklist-auto-correction-soumission",
    category: "Expression Écrite",
    title: "Check-list d'auto-correction avant de soumettre sa copie",
    difficulty: "Tous Niveaux",
    template: "E"
  },

  // ==========================================
  // EXPRESSION ORALE (15 total, 2 existing, 13 new)
  // ==========================================
  {
    id: "reussir-tache-1-parcours-professionnel-2-minutes",
    category: "Expression Orale",
    title: "Réussir la Tâche 1 : Parler de son parcours professionnel en 2 minutes",
    difficulty: "B2 / CLB 7+",
    template: "D"
  },
  {
    id: "reussir-tache-1-decrire-ville-origine-vocabulaire-riche",
    category: "Expression Orale",
    title: "Réussir la Tâche 1 : Décrire sa ville d'origine avec un vocabulaire riche",
    difficulty: "Tous Niveaux",
    template: "C"
  },
  {
    id: "reussir-tache-2-poser-questions-recherche-logement",
    category: "Expression Orale",
    title: "Réussir la Tâche 2 : Poser des questions variées lors d'une recherche de logement",
    difficulty: "Tous Niveaux",
    template: "E"
  },
  {
    id: "reussir-tache-2-negocier-convaincre-inscription-sportive",
    category: "Expression Orale",
    title: "Réussir la Tâche 2 : Négocier et convaincre lors d'une inscription sportive",
    difficulty: "B2 / CLB 7+",
    template: "D"
  },
  {
    id: "reussir-tache-2-expressions-relance-interaction",
    category: "Expression Orale",
    title: "Réussir la Tâche 2 : Les expressions de relance pour dynamiser l'interaction",
    difficulty: "B2 / CLB 7+",
    template: "A"
  },
  {
    id: "reussir-tache-3-developper-monologue-argumente-4-minutes",
    category: "Expression Orale",
    title: "Réussir la Tâche 3 : Développer un monologue argumenté de 4 minutes",
    difficulty: "C1-C2 / CLB 9+",
    template: "A"
  },
  {
    id: "reussir-tache-3-introduire-structurer-sujet-oral",
    category: "Expression Orale",
    title: "Réussir la Tâche 3 : Comment introduire et structurer son sujet à l'oral",
    difficulty: "C1-C2 / CLB 9+",
    template: "C"
  },
  {
    id: "reussir-tache-3-formuler-transitions-orales-fluides",
    category: "Expression Orale",
    title: "Réussir la Tâche 3 : Formuler des transitions orales fluides",
    difficulty: "B2 / CLB 7+",
    template: "E"
  },
  {
    id: "gerer-stress-eviter-blancs-oral",
    category: "Expression Orale",
    title: "Comment gérer le stress et éviter les blancs à l'oral",
    difficulty: "Tous Niveaux",
    template: "C"
  },
  {
    id: "ameliorer-prononciation-intonation-tcf",
    category: "Expression Orale",
    title: "Améliorer sa prononciation et son intonation pour le TCF",
    difficulty: "Tous Niveaux",
    template: "B"
  },
  {
    id: "importance-ecoute-active-reactions-jeu-role",
    category: "Expression Orale",
    title: "L'importance de l'écoute active et des réactions dans le jeu de rôle",
    difficulty: "B2 / CLB 7+",
    template: "D"
  },
  {
    id: "nuancer-point-vue-face-objections-examinateur",
    category: "Expression Orale",
    title: "Comment nuancer son point de vue face aux objections de l'examinateur",
    difficulty: "C1-C2 / CLB 9+",
    template: "A"
  },
  {
    id: "fiche-synthese-consignes-cles-expression-orale",
    category: "Expression Orale",
    title: "Fiche de synthèse : Les consignes clés de l'épreuve d'expression orale",
    difficulty: "Tous Niveaux",
    template: "E"
  },

  // ==========================================
  // COMPRÉHENSION (10 total, 1 existing, 9 new)
  // ==========================================
  {
    id: "comprehension-ecrite-repérer-pieges-questions-b2",
    category: "Compréhension",
    title: "Compréhension Écrite : Repérer les pièges des questions de niveau B2",
    difficulty: "B2 / CLB 7+",
    template: "B"
  },
  {
    id: "comprehension-ecrite-analyser-documents-administratifs",
    category: "Compréhension",
    title: "Compréhension Écrite : Comment analyser les documents administratifs",
    difficulty: "Tous Niveaux",
    template: "E"
  },
  {
    id: "comprehension-ecrite-strategies-articles-presse-complexes",
    category: "Compréhension",
    title: "Compréhension Écrite : Stratégies pour les articles de presse complexes (C1/C2)",
    difficulty: "C1-C2 / CLB 9+",
    template: "A"
  },
  {
    id: "comprehension-orale-s-entrainer-accents-francophones",
    category: "Compréhension",
    title: "Compréhension Orale : S'entraîner à comprendre les différents accents francophones",
    difficulty: "Tous Niveaux",
    template: "C"
  },
  {
    id: "comprehension-orale-reperer-mots-cles-dialogues-rapides",
    category: "Compréhension",
    title: "Compréhension Orale : Repérer les mots-clés dans les dialogues rapides",
    difficulty: "B2 / CLB 7+",
    template: "D"
  },
  {
    id: "comprehension-orale-comprendre-implicite-opinions",
    category: "Compréhension",
    title: "Compréhension Orale : Comprendre l'implicite et les opinions des locuteurs",
    difficulty: "C1-C2 / CLB 9+",
    template: "A"
  },
  {
    id: "comprehension-orale-gerer-rythme-enregistrements-audio",
    category: "Compréhension",
    title: "Compréhension Orale : Gérer le rythme des enregistrements audio",
    difficulty: "Tous Niveaux",
    template: "B"
  },
  {
    id: "strategies-globales-maximiser-score-qcm-tcf",
    category: "Compréhension",
    title: "Stratégies globales pour maximiser son score au QCM du TCF",
    difficulty: "Tous Niveaux",
    template: "D"
  },
  {
    id: "s-entrainer-quotidiennement-radio-journaux-francais",
    category: "Compréhension",
    title: "Comment s'entraîner quotidiennement avec la radio et les journaux français",
    difficulty: "Tous Niveaux",
    template: "C"
  },

  // ==========================================
  // HIGH-SEO / IMMIGRATION (Additional Conversion Layer)
  // ==========================================
  {
    id: "quel-score-tcf-pour-entree-express",
    category: "Cheat Sheet",
    title: "Immigration — Quel score TCF pour Entrée Express ?",
    difficulty: "Tous Niveaux",
    template: "B"
  },
  {
    id: "tcf-ou-tef-lequel-choisir",
    category: "Cheat Sheet",
    title: "Immigration — TCF Canada vs TEF Canada : lequel choisir ?",
    difficulty: "Tous Niveaux",
    template: "E"
  },
  {
    id: "comprendre-niveaux-clb-niveaux-nclc",
    category: "Cheat Sheet",
    title: "Immigration — Comprendre la correspondance des niveaux CLB et NCLC",
    difficulty: "Tous Niveaux",
    template: "B"
  },
  {
    id: "combien-temps-preparer-tcf-canada",
    category: "Cheat Sheet",
    title: "Immigration — Combien de temps faut-il pour préparer le TCF Canada ?",
    difficulty: "Tous Niveaux",
    template: "C"
  }
];
