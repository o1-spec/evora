export interface LessonSeed {
  title: string;
  description: string;
  vocabulary: { french: string; english: string }[];
  grammar: { title: string; text: string };
  reading: string;
  exercises: {
    type: "MULTIPLE_CHOICE" | "FILL_IN_THE_BLANK" | "WRITING" | "SPEAKING";
    question: string;
    options?: string[];
    correctKey: string;
    points: number;
  }[];
}

export interface ModuleSeed {
  title: string;
  description: string;
  lessons: LessonSeed[];
}

export interface LevelSeed {
  code: string;
  name: string;
  description: string;
  modules: ModuleSeed[];
}

export function getAcademyContent(): LevelSeed[] {
  return [
    // =========================================================================
    // A1 - BEGINNER 🌱
    // =========================================================================
    {
      code: "A1",
      name: "Débutant (A1)",
      description: "Pour les personnes n'ayant aucune connaissance préalable de la langue française. Apprenez à saluer, compter, et poser vos premières questions de base.",
      modules: [
        {
          title: "Vocabulaire",
          description: "Apprentissage des mots essentiels de la vie quotidienne.",
          lessons: generateModuleLessons("A1", "Vocabulaire", [
            "Les salutations et politesse",
            "Les nombres de 0 à 100",
            "Les jours de la semaine et les mois",
            "Les couleurs et adjectifs de base",
            "La famille et les proches",
            "La nourriture et les boissons",
            "Les objets de la classe",
            "Les professions de base",
            "Les pays et les nationalités",
            "Les émotions fondamentales"
          ].slice(0, 8)) // Exactly 8 lessons as expected by frontend
        },
        {
          title: "Grammaire",
          description: "Les règles fondamentales pour construire ses premières phrases.",
          lessons: generateModuleLessons("A1", "Grammaire", [
            "Les pronoms sujets",
            "Les verbes Être et Avoir au présent",
            "Le verbe Aller et le futur proche",
            "Les verbes réguliers en -ER au présent",
            "Les articles définis et indéfinis",
            "La négation simple"
          ].slice(0, 6)) // Exactly 6 lessons
        },
        {
          title: "Dialogues",
          description: "Situations de conversation courante en français.",
          lessons: generateModuleLessons("A1", "Dialogues", [
            "Rencontre à l'université",
            "Au café du coin",
            "Présenter sa famille",
            "Faire les courses au marché",
            "Demander son chemin",
            "Raconter sa journée"
          ].slice(0, 6)) // Exactly 6 lessons
        },
        {
          title: "Écriture",
          description: "Rédiger des messages et notes de base en français.",
          lessons: generateModuleLessons("A1", "Écriture", [
            "Se présenter brièvement",
            "Écrire un SMS d'invitation",
            "Remplir un formulaire de contact",
            "Rédiger un courriel amical"
          ].slice(0, 4)) // Exactly 4 lessons
        }
      ]
    },

    // =========================================================================
    // A2 - ELEMENTARY 📖
    // =========================================================================
    {
      code: "A2",
      name: "Élémentaire (A2)",
      description: "Pour communiquer dans des situations familières de la vie courante (achats, transports, rendez-vous).",
      modules: [
        {
          title: "Vocabulaire",
          description: "Vocabulaire thématique de la vie quotidienne.",
          lessons: generateModuleLessons("A2", "Vocabulaire", [
            "Faire les courses",
            "Les transports en commun",
            "La santé et le corps",
            "Le logement et la maison",
            "Les voyages et vacances",
            "La météo et le climat",
            "Les activités de loisir",
            "La routine quotidienne",
            "Les vêtements et la mode",
            "La nature et l'environnement"
          ].slice(0, 10)) // Exactly 10 lessons
        },
        {
          title: "Grammaire",
          description: "Renforcement grammatical pour plus de fluidité.",
          lessons: generateModuleLessons("A2", "Grammaire", [
            "Le passé composé",
            "Les verbes pronominaux",
            "Les pronoms COI et COD",
            "Les comparatifs de supériorité",
            "Le futur proche",
            "L'impératif présent",
            "Les pronoms Y et EN",
            "Les adjectifs démonstratifs"
          ].slice(0, 8)) // Exactly 8 lessons
        },
        {
          title: "Dialogues",
          description: "Pratique orale dans des contextes familiers.",
          lessons: generateModuleLessons("A2", "Dialogues", [
            "Acheter des vêtements",
            "Acheter un ticket de métro",
            "Chez le médecin",
            "Visiter un appartement",
            "Réserver un hôtel",
            "Parler du beau temps",
            "Organiser une sortie",
            "Raconter son week-end"
          ].slice(0, 8)) // Exactly 8 lessons
        },
        {
          title: "Écriture",
          description: "Écrire des textes informels simples.",
          lessons: generateModuleLessons("A2", "Écriture", [
            "Rédiger un e-mail informel",
            "Répondre à une invitation",
            "Raconter un souvenir d'enfance",
            "Décrire un voyage récent",
            "Écrire une carte postale",
            "Rédiger une note de service simple"
          ].slice(0, 6)) // Exactly 6 lessons
        }
      ]
    },

    // =========================================================================
    // B1 - INTERMEDIATE 💬
    // =========================================================================
    {
      code: "B1",
      name: "Intermédiaire (B1)",
      description: "Pour comprendre l'essentiel de discussions de travail, école ou loisirs. Permet d'exprimer une opinion simplement.",
      modules: [
        {
          title: "Vocabulaire",
          description: "Mots clés pour s'exprimer sur des sujets d'intérêt personnel et de société.",
          lessons: generateModuleLessons("B1", "Vocabulaire", [
            "Le monde du travail",
            "Le système éducatif",
            "Les nouvelles technologies",
            "Les médias et l'information",
            "La protection de la planète",
            "La vie en société",
            "Les arts et la culture",
            "La consommation responsable",
            "Le bénévolat et l'engagement",
            "Les loisirs numériques",
            "La gastronomie française",
            "La diversité culturelle"
          ].slice(0, 12)) // Exactly 12 lessons
        },
        {
          title: "Grammaire",
          description: "Formes verbales et constructions syntaxiques intermédiaires.",
          lessons: generateModuleLessons("B1", "Grammaire", [
            "L'imparfait de l'indicatif",
            "Passé composé vs Imparfait",
            "Les pronoms relatifs simples",
            "Le conditionnel présent",
            "Le futur simple",
            "Les propositions subordonnées",
            "Les expressions de cause et conséquence",
            "Le gérondif",
            "Les pronoms possessifs",
            "Le discours rapporté au présent"
          ].slice(0, 10)) // Exactly 10 lessons
        },
        {
          title: "Dialogues",
          description: "Échanges d'opinions et situations d'adaptation.",
          lessons: generateModuleLessons("B1", "Dialogues", [
            "Entretien d'embauche",
            "Choisir une formation universitaire",
            "Discuter des réseaux sociaux",
            "Débattre d'un fait divers",
            "Proposer un projet écologique",
            "Résoudre un conflit de voisinage",
            "Choisir un livre ou un film",
            "Faire une réclamation client",
            "Parler d'une expérience de bénévolat",
            "Partager une recette de cuisine"
          ].slice(0, 10)) // Exactly 10 lessons
        },
        {
          title: "Écriture",
          description: "Rédiger des argumentations courtes.",
          lessons: generateModuleLessons("B1", "Écriture", [
            "Rédiger un paragraphe d'opinion",
            "Écrire une lettre de réclamation",
            "Raconter une expérience marquante",
            "Rédiger une lettre de motivation simple",
            "Exprimer un désaccord formel",
            "Résumer un court article de presse",
            "Participer à un forum de discussion",
            "Écrire un e-mail professionnel interne"
          ].slice(0, 8)) // Exactly 8 lessons
        }
      ]
    },

    // =========================================================================
    // B2 - ADVANCED / TCF TARGET 🎯
    // =========================================================================
    {
      code: "B2",
      name: "Intermédiaire Avancé (B2)",
      description: "Le niveau cible pour l'immigration canadienne. Permet d'argumenter de façon fluide, de comprendre des exposés longs et de défendre son opinion.",
      modules: [
        {
          title: "Vocabulaire",
          description: "Mots avancés touchant à l'actualité, la société et le travail.",
          lessons: generateModuleLessons("B2", "Vocabulaire", [
            "L'immigration et l'intégration",
            "Le monde des affaires",
            "La politique et les institutions",
            "L'économie et la finance",
            "La communication professionnelle",
            "Les actualités internationales",
            "Le système judiciaire",
            "Les enjeux environnementaux globaux",
            "Les innovations scientifiques",
            "L'urbanisme et la ville intelligente",
            "La francophonie dans le monde",
            "Le marché de l'emploi au Canada",
            "L'entrepreneuriat",
            "Les relations interculturelles"
          ].slice(0, 14)) // Exactly 14 lessons
        },
        {
          title: "Grammaire",
          description: "Structures de phrases complexes et expressions de nuances.",
          lessons: generateModuleLessons("B2", "Grammaire", [
            "Le subjonctif présent",
            "Les connecteurs logiques avancés",
            "La voix passive",
            "Le discours rapporté au passé",
            "Les structures de phrases complexes",
            "Le subjonctif passé",
            "Le conditionnel passé",
            "Les pronoms relatifs composés",
            "L'expression du but et de la concession",
            "Les participes présents et adjectifs verbaux",
            "L'hypothèse et la condition complexe",
            "Le double pronominal"
          ].slice(0, 12)) // Exactly 12 lessons
        },
        {
          title: "Textes",
          description: "Analyse et compréhension de longs articles argumentatifs.",
          lessons: generateModuleLessons("B2", "Textes", [
            "L'immigration francophone hors Québec",
            "L'intelligence artificielle au travail",
            "La transition énergétique au Canada",
            "L'économie circulaire en Europe",
            "Les défis de l'éducation moderne",
            "La télémédecine en zone rurale",
            "La liberté de la presse à l'ère numérique",
            "L'évolution de la langue française",
            "Le télétravail et l'équilibre de vie",
            "L'impact du tourisme de masse",
            "L'art urbain et la culture populaire",
            "La diversité en milieu professionnel"
          ].slice(0, 12)) // Exactly 12 lessons
        },
        {
          title: "Débat oral",
          description: "Pratique de l'argumentation orale spontanée ou préparée.",
          lessons: generateModuleLessons("B2", "Débat oral", [
            "Faut-il taxer les produits polluants ?",
            "L'anglais doit-il être la seule langue de travail internationale ?",
            "Pour ou contre l'interdiction des voitures en ville ?",
            "Le vote électronique est-il l'avenir ?",
            "L'IA va-t-elle remplacer les professeurs ?",
            "Le congé paternité doit-il être obligatoire ?",
            "Faut-il imposer des quotas de diversité ?",
            "La semaine de 4 jours est-elle viable ?"
          ].slice(0, 8)) // Exactly 8 lessons
        }
      ]
    },

    // =========================================================================
    // C1 - AUTONOMOUS 🏅
    // =========================================================================
    {
      code: "C1",
      name: "Autonome (C1)",
      description: "Pour s'exprimer de façon fluide et spontanée sur des sujets complexes et abstraits dans les domaines académiques et professionnels.",
      modules: [
        {
          title: "Vocabulaire",
          description: "Terminologie spécialisée et nuances lexicales de haut niveau.",
          lessons: generateModuleLessons("C1", "Vocabulaire", [
            "Le discours académique",
            "La terminologie spécialisée",
            "Les concepts abstraits",
            "Le discours culturel et philosophique",
            "La géopolitique et relations internationales",
            "L'épistémologie et sciences",
            "Les mutations sociologiques",
            "La sémantique et linguistique",
            "L'éthique et la bioéthique",
            "La sociologie des organisations",
            "Le droit international",
            "Le patrimoine mondial",
            "L'esthétique et la critique d'art",
            "L'anthropologie moderne"
          ].slice(0, 14)) // Exactly 14 lessons
        },
        {
          title: "Grammaire",
          description: "Maîtriser les nuances verbales et les variations stylistiques littéraires.",
          lessons: generateModuleLessons("C1", "Grammaire", [
            "Nuances des temps de l'indicatif",
            "L'usage avancé du subjonctif et du conditionnel",
            "Les variations stylistiques",
            "Les constructions idiomatiques de haut niveau",
            "Les figures de style dans l'argumentation",
            "Les tournures impersonnelles complexes",
            "Le participe présent et le gérondif avancés",
            "Les nuances de la négation (ne explétif)",
            "Les adverbes de liaison littéraires",
            "L'accord du participe passé avec les pronominaux",
            "L'expression de la restriction et de l'exclusion",
            "Les structures nominales complexes"
          ].slice(0, 12)) // Exactly 12 lessons
        },
        {
          title: "Textes avancés",
          description: "Lecture critique de textes d'opinion ou d'extraits d'essais.",
          lessons: generateModuleLessons("C1", "Textes avancés", [
            "L'impact du multiculturalisme sur l'identité nationale",
            "Analyse de la dégradation de la biodiversité",
            "Les enjeux de la protection des données personnelles",
            "Réflexions sur l'éthique de l'IA générative",
            "Les transformations du travail dans la société post-industrielle",
            "Évolution de la démocratie représentative",
            "L'impact culturel des médias de masse",
            "La place de la philosophie dans l'éducation moderne",
            "Analyse d'une crise économique contemporaine",
            "Les défis de la mondialisation linguistique",
            "Anthropologie des espaces urbains modernes",
            "L'importance de la recherche fondamentale",
            "Les théories de la justice sociale",
            "Analyse d'une oeuvre d'art contemporaine"
          ].slice(0, 14)) // Exactly 14 lessons
        },
        {
          title: "Expression libre",
          description: "Prendre position sur des thèmes abstraits sous forme de monologue de 3 minutes.",
          lessons: generateModuleLessons("C1", "Expression libre", [
            "Comment concilier croissance économique et écologie ?",
            "L'education doit-elle s'adapter au marché du travail ?",
            "Les réseaux sociaux détruisent-ils la cohésion sociale ?",
            "La technologie nous rend-elle plus libres ?",
            "Faut-il encadrer la recherche génétique ?",
            "L'art doit-il être nécessairement politique ?",
            "Quel avenir pour le multilinguisme ?",
            "La mondialisation efface-t-elle les identités ?",
            "L'humanité survivra-t-elle à ses propres technologies ?",
            "L'éthique peut-elle réguler le capitalisme ?"
          ].slice(0, 10)) // Exactly 10 lessons
        }
      ]
    },

    // =========================================================================
    // C2 - MASTERY ⭐
    // =========================================================================
    {
      code: "C2",
      name: "Maîtrise (C2)",
      description: "Pour comprendre sans effort pratiquement tout ce qui est lu ou entendu, et restituer faits et arguments de diverses sources en résumant de façon cohérente.",
      modules: [
        {
          title: "Littérature",
          description: "Analyse textuelle fine des grands courants littéraires français.",
          lessons: generateModuleLessons("C2", "Littérature", [
            "L'évolution du roman au XXe siècle",
            "L'analyse des textes classiques français",
            "La poésie moderne et le surréalisme",
            "Le théâtre de l'absurde",
            "L'existentialisme littéraire",
            "Le nouveau roman et l'écriture expérimentale",
            "La critique littéraire contemporaine",
            "La littérature francophone mondiale",
            "L'art du portrait et de la description",
            "L'analyse des figures de style complexes"
          ].slice(0, 10)) // Exactly 10 lessons
        },
        {
          title: "Stylistique",
          description: "Exercices de style pour adapter le niveau de langue et écrire de façon convaincante.",
          lessons: generateModuleLessons("C2", "Stylistique", [
            "Les registres de langue et les transitions",
            "L'art de la rhétorique et de l'éloquence",
            "La structure de l'essai argumentatif expert",
            "Les subtilités de l'ironie et du sarcasme",
            "L'écriture journalistique et éditoriale",
            "Les néologismes et l'évolution lexicale",
            "L'art de la synthèse et de la concision",
            "Les nuances stylistiques de la correspondance officielle"
          ].slice(0, 8)) // Exactly 8 lessons
        },
        {
          title: "Débats experts",
          description: "Prise de parole spontanée face à des contradicteurs sur des thèmes philosophiques.",
          lessons: generateModuleLessons("C2", "Débats experts", [
            "La crise de l'universalisme républicain",
            "L'avenir de l'État-nation face à la mondialisation",
            "Éthique et transhumanisme : jusqu'où aller ?",
            "Le rôle de l'intellectuel dans la société moderne",
            "Décroissance ou croissance verte : le grand débat",
            "L'hégémonie culturelle à l'ère numérique",
            "Économie de marché et justice distributive",
            "La science est-elle le seul chemin vers la vérité ?"
          ].slice(0, 8)) // Exactly 8 lessons
        },
        {
          title: "Masterclass",
          description: "Sujets d'évaluation de niveau agrégation ou traduction d'élite.",
          lessons: generateModuleLessons("C2", "Masterclass", [
            "Rédaction d'un éditorial de presse",
            "Discours politique argumenté",
            "Synthèse de documents philosophiques complexes",
            "Rédaction d'une dissertation littéraire",
            "Évaluation critique d'une politique publique canadienne",
            "Expression orale spontanée face à un jury académique"
          ].slice(0, 6)) // Exactly 6 lessons
        }
      ]
    }
  ];
}

// Dynamic rule-based curriculum content builder
function generateModuleLessons(levelCode: string, moduleTitle: string, titles: string[]): LessonSeed[] {
  return titles.map((title) => {
    const lowerTitle = title.toLowerCase();

    // Default structure values
    let vocabulary = [
      { french: "Exemple", english: "Example" },
      { french: "Pratique", english: "Practice" },
      { french: "Apprendre", english: "To learn" }
    ];
    let grammar = {
      title: `Grammaire de niveau ${levelCode} - ${title}`,
      text: `Cette leçon de grammaire explique comment structurer et appliquer les notions requises pour aborder le sujet : **${title}**.`
    };
    let reading = `### Lecture (${levelCode})\n\nCe texte illustre la pratique de la langue française dans le contexte de **${title}**. Révisez le vocabulaire associé.`;
    let exercises: LessonSeed["exercises"] = [
      {
        type: "MULTIPLE_CHOICE",
        question: `Sélectionnez l'option correcte liée au thème: ${title}`,
        options: ["Option A (Correcte)", "Option B", "Option C", "Option D"],
        correctKey: "Option A (Correcte)",
        points: 10
      },
      {
        type: "FILL_IN_THE_BLANK",
        question: `En français, pour exprimer le concept de ${title}, on emploie le terme '___'.`,
        correctKey: "Exemple",
        points: 10
      }
    ];

    // --- A1 SPECIFIC CURRICULUM ---
    if (levelCode === "A1") {
      if (lowerTitle.includes("salutation") || lowerTitle.includes("politesse")) {
        vocabulary = [
          { french: "Bonjour", english: "Hello / Good morning" },
          { french: "S'il vous plaît", english: "Please" },
          { french: "Merci beaucoup", english: "Thank you very much" },
          { french: "Au revoir", english: "Goodbye" }
        ];
        grammar = {
          title: "Les formules de politesse en français",
          text: "En français, on salue avec 'Bonjour' en journée et 'Bonsoir' le soir. Pour remercier quelqu'un, on utilise 'Merci' ou 'Merci beaucoup'. Pour demander quelque chose, on dit 'S'il vous plaît'."
        };
        reading = "### Dialogue de Salutations\n- Bonjour Madame, comment allez-vous ?\n- Bonjour Monsieur. Je vais bien, merci. Et vous ?\n- Très bien, merci. Bonne journée !";
        exercises = [
          {
            type: "MULTIPLE_CHOICE",
            question: "Comment dit-on 'Please' poliment en français ?",
            options: ["Bonjour", "Merci", "S'il vous plaît", "Au revoir"],
            correctKey: "S'il vous plaît",
            points: 10
          },
          {
            type: "FILL_IN_THE_BLANK",
            question: "Pour dire au revoir en fin de journée, on dit : '___ !'",
            correctKey: "Au revoir",
            points: 10
          }
        ];
      } else if (lowerTitle.includes("nombres")) {
        vocabulary = [
          { french: "Dix", english: "Ten" },
          { french: "Vingt", english: "Twenty" },
          { french: "Cinquante", english: "Fifty" },
          { french: "Cent", english: "One hundred" }
        ];
        grammar = {
          title: "Les chiffres de 0 à 100",
          text: "Les nombres de 20 à 69 se forment avec des dizaines et des unités liées par un trait d'union (ex: vingt-deux). Pour 21, 31, etc., on dit 'vingt-et-un'."
        };
        reading = "### Les courses au marché\nJ'achète dix pommes pour trois euros, vingt bananes pour cinq euros et cinquante fraises.";
        exercises = [
          {
            type: "MULTIPLE_CHOICE",
            question: "Quel nombre correspond au mot anglais 'Twenty' ?",
            options: ["Dix", "Vingt", "Cinquante", "Cent"],
            correctKey: "Vingt",
            points: 10
          }
        ];
      } else if (lowerTitle.includes("jours") || lowerTitle.includes("mois")) {
        vocabulary = [
          { french: "Lundi", english: "Monday" },
          { french: "Samedi", english: "Saturday" },
          { french: "Janvier", english: "January" },
          { french: "Décembre", english: "December" }
        ];
        grammar = {
          title: "Le calendrier et le temps",
          text: "En français, les jours de la semaine et les mois de l'année s'écrivent sans majuscule, sauf s'ils débutent une phrase."
        };
        reading = "### Mon emploi du temps\nLundi, mardi et mercredi, je vais à l'école. Samedi et dimanche, c'est le week-end !";
        exercises = [
          {
            type: "MULTIPLE_CHOICE",
            question: "Quel jour correspond au mot 'Monday' ?",
            options: ["Lundi", "Mardi", "Samedi", "Dimanche"],
            correctKey: "Lundi",
            points: 10
          }
        ];
      } else if (lowerTitle.includes("pronoms sujets")) {
        vocabulary = [
          { french: "Je / Tu", english: "I / You (singular, informal)" },
          { french: "Il / Elle", english: "He / She" },
          { french: "Nous / Vous", english: "We / You (plural, formal)" },
          { french: "Ils / Elles", english: "They (masc. / fem.)" }
        ];
        grammar = {
          title: "Les pronoms personnels sujets",
          text: "Le pronom 'Vous' s'utilise pour s'adresser poliment à une personne seule (le vouvoiement) ou pour s'adresser à plusieurs personnes."
        };
        reading = "### Dialogue de bureau\n- Bonjour. Vous êtes le nouveau directeur ?\n- Oui, je suis Monsieur Martin. Et toi, tu es Luc ?\n- Oui, je suis stagiaire.";
        exercises = [
          {
            type: "MULTIPLE_CHOICE",
            question: "Quel pronom personnel utilise-t-on pour parler de 'They' (groupe féminin) ?",
            options: ["Ils", "Elles", "Nous", "Vous"],
            correctKey: "Elles",
            points: 10
          }
        ];
      } else if (lowerTitle.includes("être") || lowerTitle.includes("avoir")) {
        vocabulary = [
          { french: "Je suis", english: "I am" },
          { french: "Tu es", english: "You are" },
          { french: "J'ai", english: "I have" },
          { french: "Elle a", english: "She has" }
        ];
        grammar = {
          title: "Conjugaison des verbes Être et Avoir au Présent",
          text: "Les verbes Être et Avoir sont les auxiliaires essentiels en français. Ils ont des conjugaisons irrégulières : \n- Être : suis, es, est, sommes, êtes, sont\n- Avoir : ai, as, a, avons, avez, ont."
        };
        reading = "### Présentation simple\nJe suis canadien et j'ai une grande maison à Toronto. Mon frère est médecin et il a 30 ans.";
        exercises = [
          {
            type: "MULTIPLE_CHOICE",
            question: "Complétez la phrase : 'Nous ___ fatigués.'",
            options: ["sommes", "êtes", "avez", "avons"],
            correctKey: "sommes",
            points: 10
          }
        ];
      } else if (lowerTitle.includes("écrire") || lowerTitle.includes("présenter")) {
        vocabulary = [
          { french: "S'appeler", english: "To be named" },
          { french: "Habiter à", english: "To live in" },
          { french: "Étudiant", english: "Student" },
          { french: "Canadien", english: "Canadian" }
        ];
        grammar = {
          title: "Se présenter par écrit",
          text: "Pour se présenter simplement à l'écrit, utilisez le verbe 's'appeler' (Je m'appelle), le verbe 'habiter' (j'habite à) et le verbe 'être' pour la nationalité."
        };
        reading = "### Présentation écrite\nBonjour ! Je m'appelle Thomas. J'ai 28 ans et j'habite à Montréal. Je suis canadien. J'aime lire et voyager.";
        exercises = [
          {
            type: "WRITING",
            question: "Rédigez une courte présentation de vous-même (nom, âge, ville, nationalité) en 20 à 30 mots.",
            correctKey: "nom âge ville nationalité",
            points: 20
          }
        ];
      }
    }

    // --- A2 SPECIFIC CURRICULUM ---
    else if (levelCode === "A2") {
      if (lowerTitle.includes("courses") || lowerTitle.includes("magasin")) {
        vocabulary = [
          { french: "Le supermarché", english: "Supermarket" },
          { french: "Combien coûte... ?", english: "How much does ... cost?" },
          { french: "Payer par carte", english: "Pay by card" },
          { french: "Le client / La cliente", english: "Customer" }
        ];
        grammar = {
          title: "Les articles partitifs (du, de la, des)",
          text: "Les partitifs s'utilisent pour exprimer une quantité indéfinie ou non quantifiable. Exemple: 'Je mange du fromage' (masc), 'de la confiture' (fem), 'de l'eau' (voyelle), 'des fruits' (pluriel)."
        };
        reading = "### Dialogue chez l'épicier\n- Bonjour, je voudrais du beurre et de la salade s'il vous plaît.\n- Voilà. Autre chose ?\n- Oui, combien coûtent ces pommes ?\n- Deux euros le kilo. Je paye par carte.";
        exercises = [
          {
            type: "MULTIPLE_CHOICE",
            question: "Choisissez l'article correct : 'Je voudrais ___ eau s'il vous plaît.'",
            options: ["du", "de la", "de l'", "des"],
            correctKey: "de l'",
            points: 10
          }
        ];
      } else if (lowerTitle.includes("passé composé")) {
        vocabulary = [
          { french: "Hier", english: "Yesterday" },
          { french: "Le week-end dernier", english: "Last weekend" },
          { french: "Avoir fini", english: "To have finished" },
          { french: "Être allé", english: "To have gone" }
        ];
        grammar = {
          title: "Le passé composé : le choix de l'auxiliaire",
          text: "La majorité des verbes français se conjuguent au passé composé avec l'auxiliaire 'avoir'. Seize verbes de mouvement (comme aller, venir, entrer, sortir, monter, descendre) et tous les verbes pronominaux se conjuguent avec 'être' (avec accord du participe passé)."
        };
        reading = "### Récit de week-end\nHier, je suis allé à Québec. J'ai visité le Château Frontenac et j'ai dîné dans un petit restaurant traditionnel. J'ai beaucoup aimé mon séjour.";
        exercises = [
          {
            type: "MULTIPLE_CHOICE",
            question: "Complétez : 'Hier soir, elles ___ sorties au restaurant.'",
            options: ["ont", "sont", "vont", "seront"],
            correctKey: "sont",
            points: 10
          }
        ];
      } else if (lowerTitle.includes("transport")) {
        vocabulary = [
          { french: "Le métro", english: "Subway / Underground" },
          { french: "Prendre le bus", english: "To take the bus" },
          { french: "Le billet / Le ticket", english: "Ticket" },
          { french: "La gare", english: "Train station" }
        ];
        grammar = {
          title: "Les prépositions de lieu devant les moyens de transport",
          text: "On utilise 'en' pour les moyens de transport fermés dans lesquels on entre (en voiture, en train, en métro) et 'à' pour les moyens de transport ouverts (à vélo, à moto, à pied)."
        };
        reading = "### Trajet quotidien\nPour aller au travail, je prends le métro à la station Berri-UQAM. Parfois, quand il fait beau, je préfère faire le trajet à vélo.";
        exercises = [
          {
            type: "FILL_IN_THE_BLANK",
            question: "Complétez : 'Chaque matin, je vais au bureau ___ métro.'",
            correctKey: "en",
            points: 10
          }
        ];
      }
    }

    // --- B1 SPECIFIC CURRICULUM ---
    else if (levelCode === "B1") {
      if (lowerTitle.includes("travail") || lowerTitle.includes("emploi")) {
        vocabulary = [
          { french: "Postuler", english: "To apply for a job" },
          { french: "Un entretien d'embauche", english: "Job interview" },
          { french: "Le curriculum vitae (CV)", english: "Resume / CV" },
          { french: "Le télétravail", english: "Remote work" }
        ];
        grammar = {
          title: "Exprimer l'intention et le projet",
          text: "Pour parler de vos projets professionnels, vous pouvez employer 'avoir l'intention de + infinitif', 'envisager de + infinitif', ou 'projeter de + infinitif'."
        };
        reading = "### Projet de carrière\nJ'envisage de postuler à un emploi au Canada. J'ai rédigé mon CV en français et je me prépare activement pour passer un entretien d'embauche en ligne.";
        exercises = [
          {
            type: "MULTIPLE_CHOICE",
            question: "Quel terme désigne le travail effectué depuis son domicile grâce aux outils informatiques ?",
            options: ["Le chômage", "Le télétravail", "La retraite", "Le bénévolat"],
            correctKey: "Le télétravail",
            points: 10
          }
        ];
      } else if (lowerTitle.includes("imparfait")) {
        vocabulary = [
          { french: "Autrefois", english: "In the past" },
          { french: "Quand j'étais jeune", english: "When I was young" },
          { french: "Habituellement", english: "Usually / Habitually" },
          { french: "Prendre le temps", english: "To take one's time" }
        ];
        grammar = {
          title: "L'imparfait : formation et valeurs",
          text: "L'imparfait sert à décrire un décor, une situation ou une habitude dans le passé. Il se forme à partir du radical de la première personne du pluriel (nous) au présent, auquel on ajoute les terminaisons : -ais, -ais, -ait, -ions, -iez, -aient."
        };
        reading = "### Souvenirs\nAutrefois, nous habitions au bord de la mer. Tous les après-midis, nous allions nager et nous regardions les voiliers s'éloigner vers l'horizon.";
        exercises = [
          {
            type: "MULTIPLE_CHOICE",
            question: "Choisissez la conjugaison correcte à l'imparfait : 'Quand j'___ petit, je jouais au soccer.'",
            options: ["suis", "étais", "avais", "serais"],
            correctKey: "étais",
            points: 10
          }
        ];
      } else if (lowerTitle.includes("opinion") || lowerTitle.includes("lettre")) {
        vocabulary = [
          { french: "À mon avis", english: "In my opinion" },
          { french: "Je soutiens que", english: "I maintain that" },
          { french: "Tout d'abord", english: "First of all" },
          { french: "En conclusion", english: "In conclusion" }
        ];
        grammar = {
          title: "Structurer un paragraphe d'opinion amical ou formel",
          text: "Un texte d'opinion de niveau B1 doit être structuré : introduire l'opinion (À mon avis...), développer 2 arguments à l'aide de connecteurs logiques simples (tout d'abord, ensuite), et conclure."
        };
        reading = "### Avis sur le transport en commun\nÀ mon avis, la gratuité des transports en commun est une excellente mesure. Tout d'abord, cela incite les conducteurs à laisser leur voiture, réduisant la pollution. Ensuite, c'est une aide financière pour les ménages modestes. En conclusion, cette politique est à la fois écologique et sociale.";
        exercises = [
          {
            type: "WRITING",
            question: "Donnez votre avis en 50 mots sur le sujet suivant : 'Pensez-vous que les livres numériques vont remplacer les livres papier ?'",
            correctKey: "opinion livre numérique papier",
            points: 20
          }
        ];
      }
    }

    // --- B2 SPECIFIC CURRICULUM ---
    else if (levelCode === "B2") {
      if (lowerTitle.includes("immigration") || lowerTitle.includes("intégration")) {
        vocabulary = [
          { french: "Le marché du travail", english: "The job market" },
          { french: "Un atout linguistique", english: "A linguistic asset" },
          { french: "Favoriser la diversité", english: "To promote diversity" },
          { french: "S'installer au Canada", english: "To settle in Canada" }
        ];
        grammar = {
          title: "Le subjonctif présent pour exprimer une obligation",
          text: "Pour exprimer la nécessité, la tournure 'Il faut que + subjonctif' est incontournable à l'épreuve d'expression écrite et orale du TCF B2. Exemple : 'Il faut que l'État favorise l'intégration des immigrants'."
        };
        reading = "### Intégration francophone au Canada\nL'immigration constitue un pilier de la démographie canadienne. Afin de préserver la richesse de la langue française hors Québec, il est crucial que les nouveaux résidents francophones s'insèrent rapidement sur le marché de l'emploi.";
        exercises = [
          {
            type: "MULTIPLE_CHOICE",
            question: "Complétez : 'Il est indispensable que vous ___ des cours de français pour vous intégrer.'",
            options: ["faites", "fassiez", "faisiez", "ferez"],
            correctKey: "fassiez",
            points: 10
          }
        ];
      } else if (lowerTitle.includes("subjonctif")) {
        vocabulary = [
          { french: "Bien que", english: "Although" },
          { french: "Afin que", english: "So that" },
          { french: "Pourvu que", english: "Provided that" },
          { french: "Il est capital que", english: "It is capital that" }
        ];
        grammar = {
          title: "Le subjonctif présent : conjonctions courantes",
          text: "Le subjonctif est obligatoire après certaines conjonctions de concession (bien que, quoique), de but (pour que, afin que) et de condition (pourvu que, à moins que)."
        };
        reading = "### Extrait de débat politique\nBien que ce projet de loi comporte des atouts non négligeables, il convient de le modifier afin que les droits fondamentaux des travailleurs soient pleinement respectés.";
        exercises = [
          {
            type: "MULTIPLE_CHOICE",
            question: "Choisissez la bonne forme : 'Bien que la situation ___ complexe, nous trouverons une solution.'",
            options: ["est", "soit", "sera", "serait"],
            correctKey: "soit",
            points: 10
          }
        ];
      } else if (lowerTitle.includes("débat") || lowerTitle.includes("taxer")) {
        vocabulary = [
          { french: "Le pouvoir d'achat", english: "Purchasing power" },
          { french: "Une mesure incitative", english: "An incentive measure" },
          { french: "L'empreinte carbone", english: "Carbon footprint" },
          { french: "Sensibiliser l'opinion", english: "To raise public awareness" }
        ];
        grammar = {
          title: "Soutenir un point de vue contradictoire",
          text: "Dans un débat B2 (TCF Tâche 2 Expression Orale), structurez vos arguments en concédant tout d'abord un point ('Certes, la taxe carbone réduit la pollution...'), puis en le nuançant ('...cependant elle affecte le pouvoir d'achat des foyers modestes')."
        };
        reading = "### Débat sur l'interdiction des voitures individuelles\n- **Partisan** : L'urgence climatique impose d'interdire les voitures en ville.\n- **Opposant** : Cette interdiction pénalise les banlieusards qui n'ont pas accès à un réseau de transport efficace.";
        exercises = [
          {
            type: "SPEAKING",
            question: "Exprimez à haute voix vos arguments (pour et contre) sur le sujet suivant : 'Faut-il imposer la semaine de 4 jours de travail ?' (2 minutes)",
            correctKey: "semaine 4 jours travail productivité équilibre",
            points: 20
          }
        ];
      }
    }

    // --- C1 SPECIFIC CURRICULUM ---
    else if (levelCode === "C1") {
      if (lowerTitle.includes("académique")) {
        vocabulary = [
          { french: "Corroborer", english: "To corroborate / support" },
          { french: "Mettre en exergue", english: "To highlight" },
          { french: "Un paradigme dominant", english: "A dominant paradigm" },
          { french: "L'épistémologie", english: "Epistemology" }
        ];
        grammar = {
          title: "Le style nominal pour l'analyse académique",
          text: "Pour exprimer des arguments complexes de manière formelle et concise, privilégiez le style nominal (utilisation de noms au lieu de propositions verbales). Exemple: 'La mise en place de la réforme' au lieu de 'Quand le gouvernement a mis en place la réforme'."
        };
        reading = "### Essai de sociologie\nLa corroboration de ces hypothèses s'appuie sur la mise en exergue de plusieurs mutations sociologiques contemporaines, lesquelles viennent bousculer le paradigme économique dominant du siècle dernier.";
        exercises = [
          {
            type: "MULTIPLE_CHOICE",
            question: "Que signifie la locution verbale 'mettre en exergue' ?",
            options: ["Passer sous silence", "Mettre en relief ou souligner", "Contredire formellement", "Éliminer d'un texte"],
            correctKey: "Mettre en relief ou souligner",
            points: 10
          }
        ];
      } else if (lowerTitle.includes("multiculturalisme")) {
        vocabulary = [
          { french: "La laïcité républicaine", english: "Republican secularism" },
          { french: "Le communautarisme", english: "Communitarianism" },
          { french: "La cohésion sociale", english: "Social cohesion / glue" },
          { french: "Le creuset national", english: "The national melting pot" }
        ];
        grammar = {
          title: "Le 'ne' explétif en registre soutenu",
          text: "Le 'ne' explétif s'emploie dans les propositions subordonnées après des verbes de crainte (craindre, avoir peur), d'empêchement (éviter, empêcher) ou après certaines conjonctions (avant que, à moins que). Il n'a pas de valeur négative. Exemple : 'Je crains que la laïcité ne soit affaiblie'."
        };
        reading = "### Débat sociologique contemporain\nLa question du multiculturalisme demeure sensible au sein de la république française. Certains observateurs craignent que le communautarisme ne fragilise la cohésion sociale, tandis que d'autres prônent l'enrichissement par la diversité culturelle.";
        exercises = [
          {
            type: "MULTIPLE_CHOICE",
            question: "Dans quelle phrase le 'ne' est-il un 'ne' explétif sans valeur de négation ?",
            options: [
              "Il ne mange aucun fruit.",
              "Nous craignons que le projet ne prenne du retard.",
              "Elle ne veut pas venir ce soir.",
              "Ils ne font jamais de sport."
            ],
            correctKey: "Nous craignons que le projet ne prenne du retard.",
            points: 10
          }
        ];
      }
    }

    // --- C2 SPECIFIC CURRICULUM ---
    else if (levelCode === "C2") {
      if (lowerTitle.includes("littérature") || lowerTitle.includes("roman")) {
        vocabulary = [
          { french: "Le flux de conscience", english: "Stream of consciousness" },
          { french: "L'affabulation", english: "Plotting / fictionalization" },
          { french: "Une écriture blanche", english: "Flat / neutral writing style" },
          { french: "La polysémie", english: "Polysemy (multiple meanings)" }
        ];
        grammar = {
          title: "L'emploi littéraire du subjonctif imparfait",
          text: "En littérature ou en rédaction oratoire de niveau C2, le subjonctif imparfait est utilisé dans la subordonnée lorsque la principale est au passé. Exemple: 'Il fallut que l'auteur fît preuve d'une grande audace stylistiques'."
        };
        reading = "### Critique du Nouveau Roman\nLe Nouveau Roman s'attache à récuser l'affabulation traditionnelle balzacienne au profit d'une écriture blanche, dénuée de tout lyrisme suranné. Il fallut que le lecteur fît sienne cette déconstruction pour en apprécier la profonde polysémie.";
        exercises = [
          {
            type: "MULTIPLE_CHOICE",
            question: "Identifiez le verbe conjugué au subjonctif imparfait dans le texte critique ci-dessus :",
            options: ["rêve", "fît", "récuse", "apprécier"],
            correctKey: "fît",
            points: 10
          }
        ];
      } else if (lowerTitle.includes("registre") || lowerTitle.includes("transitions")) {
        vocabulary = [
          { french: "Éprouver une lassitude", english: "To feel weary / tired (Elevated)" },
          { french: "Avoir marre de", english: "To be sick of / fed up (Slang)" },
          { french: "La congruence stylistique", english: "Stylistic alignment" },
          { french: "Une tournure surannée", english: "An outdated/obsolete expression" }
        ];
        grammar = {
          title: "L'inversion complexe du sujet",
          text: "L'inversion complexe consiste à placer le pronom sujet après le verbe tout en maintenant le groupe nominal sujet au début de la phrase pour des raisons stylistiques de très haut niveau. Exemple: 'Cette mesure, dont l'efficacité demeure à prouver, est-elle viable ?'"
        };
        reading = "### Exercices de commutation de registre\n- **Familier** : Il a lâché l'affaire parce qu'il en avait sa claque.\n- **Soutenu** : Il renonça promptement à son entreprise, en proie à un profond découragement.";
        exercises = [
          {
            type: "MULTIPLE_CHOICE",
            question: "Quelle phrase illustre la transition vers le registre littéraire le plus soutenu ?",
            options: [
              "Il s'est cassé parce qu'il y avait trop de bruit.",
              "Il a quitté les lieux en raison d'un tapage intempestif.",
              "Il s'en alla derechef, excédé par la rumeur discordante de l'assemblée.",
              "Il est parti car c'était vraiment trop bruyant."
            ],
            correctKey: "Il s'en alla derechef, excédé par la rumeur discordante de l'assemblée.",
            points: 10
          }
        ];
      } else if (lowerTitle.includes("éditorial") || lowerTitle.includes("presse")) {
        vocabulary = [
          { french: "Une diatribe cinglante", english: "A scathing diatribe" },
          { french: "Un pamphlet acerbe", english: "A sharp lampoon / satire" },
          { french: "Ciseler son style", english: "To polish/hone one's style" },
          { french: "L'apogée", english: "The peak / pinnacle" }
        ];
        grammar = {
          title: "L'art de la métaphore filée dans l'éditorial",
          text: "Pour marquer l'esprit du lecteur, l'éditorialiste de niveau C2 déploie une métaphore filée (une comparaison prolongée sur plusieurs phrases) afin de structurer son argumentation littéraire de manière mémorable."
        };
        reading = "### Éditorial : Le navire de la démocratie\nNotre démocratie moderne navigue en eaux troubles. Les vagues successives du populisme se brisent contre les falaises de nos institutions. Il est grand temps d'en colmater les brèches avant que le vaisseau ne sombre dans l'océan de la démagogie.";
        exercises = [
          {
            type: "WRITING",
            question: "Rédigez un éditorial court (80 à 100 mots) employant une métaphore filée pour critiquer l'impact des réseaux sociaux sur le débat public.",
            correctKey: "editorial reseaux sociaux métaphore",
            points: 20
          }
        ];
      }
    }

    return {
      title,
      description: `Développement des compétences de niveau ${levelCode} en rapport avec: ${title}.`,
      vocabulary,
      grammar,
      reading,
      exercises
    };
  });
}
