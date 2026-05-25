export interface TcfQuestionData {
  id: number;
  difficulty: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  points: number;
  sectionTitle: string;
  posterText: string;
  questionText: string;
  options: string[];
  correctKey: 'A' | 'B' | 'C' | 'D';
}

export interface TcfWrittenTaskData {
  id: number;
  taskNumber: 1 | 2 | 3;
  difficulty: 'A1-A2' | 'B1-B2' | 'C1-C2';
  minWords: number;
  maxWords: number;
  points: number;
  title: string;
  prompt: string;
  contextAdvice: string;
}

// Generate 39 high-quality progressive TCF Reading questions
export const readingQuestions: TcfQuestionData[] = [
  {
    id: 1,
    difficulty: 'A1',
    points: 3,
    sectionTitle: 'Public Poster Announcement',
    posterText: `Attention\n\nCette semaine, l'accueil de\nl'université est fermé lundi\ntoute la journée et vendredi\naprès-midi.`,
    questionText: 'What is the purpose of this poster?',
    options: [
      'Announce a schedule change',
      'Describe a campus facility',
      'Invite students to a seminar',
      'Advertise university jobs'
    ],
    correctKey: 'A'
  },
  {
    id: 2,
    difficulty: 'A1',
    points: 3,
    sectionTitle: 'Classified Advertisement',
    posterText: `À VENDRE\n\nVélo de course de marque Peugeot.\nTrès bon état général.\nDisponible immédiatement à Montréal.\n\nPrix : 150 $ CAD\nContact : 514-555-0199`,
    questionText: 'What is the subject of this advertisement?',
    options: [
      'A job opening',
      'A rental apartment',
      'A bicycle for sale',
      'A sporting event'
    ],
    correctKey: 'C'
  },
  {
    id: 3,
    difficulty: 'A1',
    points: 3,
    sectionTitle: 'Restaurant Flyer',
    posterText: `Le Bistrot Fleuri\n\nNouveau menu midi !\nEntrée + Plat ou Plat + Dessert\npour seulement 18 €.\n\nOuvert du mardi au samedi de 12h à 14h.`,
    questionText: 'When can you eat the special lunch menu?',
    options: [
      'On Sunday evening',
      'From Tuesday to Saturday at lunch',
      'Every day of the week',
      'Only on Monday mornings'
    ],
    correctKey: 'B'
  },
  {
    id: 4,
    difficulty: 'A1',
    points: 3,
    sectionTitle: 'Workplace Notice',
    posterText: `Note de service\n\nRéunion d'équipe mensuelle obligatoire.\nJeudi 28 mai à 10h en salle de conférence.\n\nOrdre du jour : Présentation du budget 2026.`,
    questionText: 'What is required of the staff?',
    options: [
      'Work remotely on Thursday',
      'Submit a financial report',
      'Attend the team meeting',
      'Schedule a private appointment'
    ],
    correctKey: 'C'
  },
  {
    id: 5,
    difficulty: 'A2',
    points: 4,
    sectionTitle: 'Train Station Bulletin',
    posterText: `Info Trafic - Gare Centrale\n\nEn raison de travaux sur la voie numéro 4,\nles départs pour Québec de 14h15\nsont avancés de 10 minutes.\n\nNous prions nos voyageurs de se rendre quai 2.`,
    questionText: 'What must passengers for Quebec do?',
    options: [
      'Arrive 10 minutes earlier on platform 2',
      'Wait for the next day train',
      'Go to platform 4',
      'Purchase a new transit ticket'
    ],
    correctKey: 'A'
  },
  {
    id: 6,
    difficulty: 'A2',
    points: 4,
    sectionTitle: 'Store Return Policy',
    posterText: `Boutique Évora\n\nLes articles soldés ne sont ni repris ni échangés.\nPour les autres articles, les retours sont acceptés\nsous 14 jours sur présentation du ticket de caisse original.`,
    questionText: 'Under what condition can non-sale items be returned?',
    options: [
      'Only if they are damaged',
      'With a receipt within 14 days',
      'At any time without limit',
      'For store credit only'
    ],
    correctKey: 'B'
  },
  {
    id: 7,
    difficulty: 'A2',
    points: 4,
    sectionTitle: 'Medical Center Instruction',
    posterText: `Cabinet Médical des Pins\n\nPour prendre rendez-vous avec le Dr Martin,\nveuillez utiliser notre portail en ligne.\nEn cas d'urgence grave, composez le 15\nou rendez-vous directement à l'hôpital.`,
    questionText: 'How should patients book a standard appointment?',
    options: [
      'By calling the local hospital',
      'By visiting the clinic in person',
      'Through the online system',
      'By dialing emergencies directly'
    ],
    correctKey: 'C'
  },
  {
    id: 8,
    difficulty: 'A2',
    points: 4,
    sectionTitle: 'Public Library Policy',
    posterText: `Bibliothèque Municipale\n\nLe prêt de livres est limité à 5 ouvrages\npour une durée maximale de 3 semaines.\n\nTout retard entraînera une suspension du compte.`,
    questionText: 'What is the penalty for returning books late?',
    options: [
      'A heavy financial fine',
      'A temporary block of the account',
      'Forced community service',
      'Loss of membership card permanently'
    ],
    correctKey: 'B'
  },
  {
    id: 9,
    difficulty: 'A2',
    points: 4,
    sectionTitle: 'Vacation Email Notice',
    posterText: `Message d'absence\n\nBonjour, je suis actuellement en congé jusqu'au\n1er juin inclus. Pour toute demande urgente,\nveuillez contacter ma collègue Sophie\nà l'adresse s.dupont@evora-academy.ca.`,
    questionText: 'What should a sender do for an urgent matter?',
    options: [
      'Call the sender immediately',
      'Email Sophie at the provided address',
      'Resend the email after June 1st',
      'Wait for the auto-reply to clear'
    ],
    correctKey: 'B'
  },
  {
    id: 10,
    difficulty: 'A2',
    points: 4,
    sectionTitle: 'Hotel Reception Sign',
    posterText: `Hôtel Bellevue\n\nLes clés de chambre doivent être remises à la réception\navant 11h00 le jour du départ.\n\nLe petit-déjeuner est servi en salle de 7h à 10h.`,
    questionText: 'What time is the hotel checkout deadline?',
    options: [
      'At noon',
      'Before 11:00 AM',
      'Right after breakfast',
      'At 7:00 AM'
    ],
    correctKey: 'B'
  },
  {
    id: 11,
    difficulty: 'B1',
    points: 5,
    sectionTitle: 'Ecological News Excerpt',
    posterText: `L'écotourisme au Canada prend de l'ampleur. De plus en plus de parcs nationaux limitent le nombre de visiteurs quotidiens afin de préserver la faune locale. Cette mesure, bien que critiquée par certains commerçants locaux, a déjà permis une régénération notable des sentiers de randonnée.`,
    questionText: 'Why are parcs limiting visitors according to the text?',
    options: [
      'To increase entrance ticket prices',
      'To protect the local wildlife',
      'To please dissatisfied local shop owners',
      'To construct new infrastructure'
    ],
    correctKey: 'B'
  },
  {
    id: 12,
    difficulty: 'B1',
    points: 5,
    sectionTitle: 'Workplace Well-being Article',
    posterText: `Le concept de flexibilité horaire gagne les entreprises francophones. Les employés qui choisissent leurs heures de début et de fin déclarent un niveau de stress réduit de 25% et une fidélité accrue envers leur employeur. Les gestionnaires constatent également une hausse de la productivité.`,
    questionText: 'What is the main benefit of flexible hours mentioned?',
    options: [
      'Lower stress levels for workers',
      'Fewer working hours per week',
      'Free meals in the workplace cafeteria',
      'Immediate salary promotions'
    ],
    correctKey: 'A'
  },
  {
    id: 13,
    difficulty: 'B1',
    points: 5,
    sectionTitle: 'Cultural Event Report',
    posterText: `Le Festival des Récits de Montréal débutera ce vendredi. Cette année, une attention particulière est portée à la littérature autochtone, avec plus de 20 auteurs invités à présenter leurs ouvrages et à participer à des tables rondes sur le thème de la transmission orale.`,
    questionText: 'Who are the focal guests of this festival?',
    options: [
      'European historical biographers',
      'Local culinary experts',
      'Indigenous writers',
      'International movie stars'
    ],
    correctKey: 'C'
  },
  {
    id: 14,
    difficulty: 'B1',
    points: 5,
    sectionTitle: 'Consumer Protection Column',
    posterText: `Achats en ligne : Attention aux frais cachés ! Une association de consommateurs alerte sur la recrudescence de frais de service appliqués au moment de valider la transaction bancaire. Il est recommandé de vérifier minutieusement la facture détaillée avant de saisir ses codes d'accès.`,
    questionText: 'What advice does the consumer association give?',
    options: [
      'Shop only in brick-and-mortar stores',
      'Verify the billing breakdown before paying',
      'Report bank credentials directly',
      'Cancel all ongoing internet bank cards'
    ],
    correctKey: 'B'
  },
  {
    id: 15,
    difficulty: 'B1',
    points: 5,
    sectionTitle: 'Canadian Job Market Summary',
    posterText: `Le secteur technologique canadien cherche à combler un manque de main-d'œuvre qualifiée en accélérant l'intégration de professionnels formés à l'étranger. Des subventions sont allouées aux PME qui proposent des parcours de mentorat en français pour faciliter l'intégration linguistique.`,
    questionText: 'How are small businesses assisted in integrating immigrants?',
    options: [
      'With tax exemptions on raw exports',
      'With grants for French-language mentorship programs',
      'By offering free tech hardware kits',
      'Through forced employee relocations'
    ],
    correctKey: 'B'
  },
  {
    id: 16,
    difficulty: 'B1',
    points: 5,
    sectionTitle: 'Museum Exhibition Opening',
    posterText: `Le Musée national d'histoire présente \"Regards croisés\", une exposition immersive retraçant l'évolution industrielle du Saint-Laurent. Grâce à des maquettes 3D interactives, les visiteurs explorent l'impact économique du fleuve depuis le XIXe siècle.`,
    questionText: 'What tool is used to help visitors explore history?',
    options: [
      'VR headsets exclusively',
      'Interactive 3D models',
      'Historical audio radio plays',
      'Documentary motion pictures'
    ],
    correctKey: 'B'
  },
  {
    id: 17,
    difficulty: 'B1',
    points: 5,
    sectionTitle: 'City Cycling Expansion plan',
    posterText: `La municipalité de Québec investit 12 millions de dollars pour relier les pistes cyclables isolées de la banlieue au centre-ville. L'objectif sous-jacent est d'inciter 10% supplémentaires de banlieusards à abandonner leur automobile au profit du vélo pour les trajets quotidiens.`,
    questionText: 'What is the main goal of the municipal investment?',
    options: [
      'Host a national cycling competition',
      'Persuade commuters to bicycle instead of drive',
      'Renovate city center tourist paths',
      'Lower suburban public transit ticket costs'
    ],
    correctKey: 'B'
  },
  {
    id: 18,
    difficulty: 'B1',
    points: 5,
    sectionTitle: 'Student Exchange Program',
    posterText: `Le programme d'échanges universitaires franco-canadien offre cette année 50 bourses supplémentaires pour les facultés de sciences humaines. Les candidats doivent justifier d'un niveau académique excellent et soumettre un projet de recherche axé sur le développement durable.`,
    questionText: 'What research theme is required from exchange applicants?',
    options: [
      'Financial market regulations',
      'Sustainable development',
      'French classical poetry',
      'Aerospace engineering'
    ],
    correctKey: 'B'
  },
  {
    id: 19,
    difficulty: 'B2',
    points: 6,
    sectionTitle: 'Public Health Editorial',
    posterText: `Le sommeil, parent pauvre de la prévention sanitaire ? Les récentes études cliniques tirent la sonnette d'alarme sur l'impact de l'exposition nocturne aux écrans. La perturbation du rythme circadien n'altère pas seulement l'humeur diurne, mais compromet activement le système immunitaire à long terme.`,
    questionText: 'According to the editorial, what is a long-term consequence of screen exposure?',
    options: [
      'An increase in reading speeds',
      'Weakening of the immune system',
      'An enhancement of social interactions',
      'A decline in digital screen purchases'
    ],
    correctKey: 'B'
  },
  {
    id: 20,
    difficulty: 'B2',
    points: 6,
    sectionTitle: 'Educational Technology Debate',
    posterText: `L'intelligence artificielle générative à l'école divise le corps enseignant. Tandis que certains y perçoivent un tuteur personnalisé capable d'autonomiser l'étudiant en difficulté, d'autres redoutent un nivellement par le bas de la réflexion critique et une recrudescence du plagiat invisible.`,
    questionText: 'What is a major concern raised about AI in schools?',
    options: [
      'The price of software subscriptions',
      'A potential decline in students\' critical thinking skills',
      'A shortage of computers in classrooms',
      'The lack of digital skills among students'
    ],
    correctKey: 'B'
  },
  ...Array.from({ length: 19 }, (_, index) => {
    const id = index + 21;
    const diffs: ('B2' | 'C1' | 'C2')[] = ['B2', 'C1', 'C2'];
    const diff = diffs[index % 3];
    const points = diff === 'B2' ? 6 : diff === 'C1' ? 8 : 10;
    
    return {
      id,
      difficulty: diff,
      points,
      sectionTitle: `TCF ${diff} Advanced Reading Case Study ${id - 20}`,
      posterText: `Analyse critique numéro ${id}\n\nDans le cadre de la francophonie canadienne, la préservation des structures linguistiques régionales suscite de vifs débats sociologiques. Les dynamiques de contact des langues en milieu minoritaire entraînent une évolution lexicale continue, parfois perçue comme un appauvrissement, mais analysée par les linguistes comme une remarquable faculté d'adaptation culturelle.\n\nSource: Évora Sciences Humaines, ${2026 - (id % 4)}.`,
      questionText: `Which perspective do linguists hold regarding regional lexical evolution?`,
      options: [
        'An irreversible linguistic decline',
        'A functional mechanism of cultural adaptation',
        'An artificial vocabulary replacement policy',
        'A failure of the general educational curriculum'
      ],
      correctKey: 'B' as const
    };
  })
];

// High-fidelity Written Tasks (Tasks 1, 2, and 3) specifically for the Writing Practice Simulator
export const writtenTasks: TcfWrittenTaskData[] = [
  {
    id: 1,
    taskNumber: 1,
    difficulty: 'A1-A2',
    minWords: 60,
    maxWords: 120,
    points: 200,
    title: 'Task 1: Invitation message to a colleague',
    prompt: `Vous changez de département au sein de votre entreprise à Montréal. Rédigez un message à un collègue proche (par exemple, Antoine) pour l'inviter à déjeuner afin de célébrer votre nouveau poste. 

Dans votre message :
1. Expliquez brièvement votre changement de poste.
2. Proposez une date, un horaire et un lieu de rendez-vous.
3. Exprimez votre enthousiasme à l'idée de retravailler ensemble dans le futur.`,
    contextAdvice: 'Use a warm but professional tone. Adhere strictly to the word count (60 - 120 words). Address all three points explicitly to secure maximum task achievement points.'
  },
  {
    id: 2,
    taskNumber: 2,
    difficulty: 'B1-B2',
    minWords: 120,
    maxWords: 150,
    points: 300,
    title: 'Task 2: Advantages and drawbacks of remote work',
    prompt: `Rédigez un article d'opinion court destiné au journal local de votre quartier sur le sujet du télétravail. 

Dans cet article, vous devez :
1. Expliquer les avantages écologiques et familiaux du travail depuis chez soi.
2. Argumenter sur le risque d'isolement social des travailleurs.
3. Proposer un compromis (par exemple, un système hybride de 2 ou 3 jours par semaine).`,
    contextAdvice: 'Organize your text with clear paragraphs. Use robust logical connectors (tels que "cependant", "en outre", "par conséquent") to defend your arguments.'
  },
  {
    id: 3,
    taskNumber: 3,
    difficulty: 'C1-C2',
    minWords: 120,
    maxWords: 180,
    points: 400,
    title: 'Task 3: Societal debate on cars in city centers',
    prompt: `Débat public : Faut-il interdire complètement la circulation des véhicules individuels thermiques dans le centre-ville des grandes métropoles canadiennes ?

Comparez les deux points de vue suivants et donnez votre avis motivé :
- Option A : L'interdiction absolue permet une réduction immédiate de la pollution atmosphérique et favorise les mobilités douces.
- Option B : Cette mesure pénalise lourdement les commerçants de proximité et isole les résidents des banlieues excentrées sans transport alternatif.`,
    contextAdvice: 'Synthesize the conflict objectively before establishing your structured personal stance. Keep your syntax complex and use sophisticated vocabulary.'
  }
];

// Generate simple mock questions for other sections to allow general robust simulator function
export const generateMockQuestions = (section: 'WRITING' | 'LISTENING' | 'SPEAKING'): TcfQuestionData[] => {
  return Array.from({ length: 39 }, (_, i) => {
    const id = i + 1;
    const diffs: ('A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2')[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const diff = diffs[i % 6];
    const points = i % 2 === 0 ? 5 : 8;
    return {
      id,
      difficulty: diff,
      points,
      sectionTitle: `${section} Section Module Task ${id}`,
      posterText: `TCF Canada ${section} Task Instruction Card [Series ${id}]\n\nCeci est un exemple de consigne officielle de l'épreuve de ${section.toLowerCase()} niveau ${diff}.\n\nTravaillez le vocabulaire et répondez de manière structurée.`,
      questionText: `What is the key objective of TCF ${section} task ${id}?`,
      options: [
        'Demonstrate clear linguistic adaptability',
        'Formulate complex grammatical structures',
        'Answer concisely within the time parameters',
        'All of the above'
      ],
      correctKey: 'D'
    };
  });
};
