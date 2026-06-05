import React from "react";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: "Grammaire" | "Expression Écrite" | "Expression Orale" | "Compréhension" | "Cheat Sheet";
  readTime: string;
  date: string;
  author: string;
  difficulty: "Tous Niveaux" | "B2 / CLB 7+" | "C1-C2 / CLB 9+";
  badgeColor: string;
  bgColor: string;
  content: React.ReactNode;
}

export const blogPosts: BlogPost[] = [
  {
    id: "connecteurs-logiques",
    title: "Cheat Sheet — Les Connecteurs Logiques pour viser le CLB 9+",
    excerpt: "Maîtrisez les articulations logiques indispensables pour structurer vos écrits et vos monologues et obtenir le niveau C1/C2 au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "5 min de lecture",
    date: "04 juin 2026",
    author: "Équipe Évora",
    difficulty: "C1-C2 / CLB 9+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed text-base">
          Pour obtenir un score élevé (CLB 9 ou 10) aux épreuves d'expression écrite et orale du TCF Canada, les examinateurs évaluent votre capacité à structurer vos arguments de manière fluide et logique. L'usage varié et précis de connecteurs logiques est le moyen le plus simple de booster votre note.
        </p>

        <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
          <h4 className="font-bold text-purple-900 text-sm mb-1">Règle d'or de l'examinateur</h4>
          <p className="text-purple-700 text-xs leading-relaxed">
            Ne répétez pas sans cesse <em>"parce que"</em> ou <em>"mais"</em>. Utilisez des alternatives plus formelles et académiques comme <em>"en raison de"</em> ou <em>"néanmoins"</em>.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Introduire et hiérarchiser ses idées</h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <li className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-purple-700 block">En premier lieu / Tout d'abord</strong>
              Idéal pour lancer votre premier argument de manière formelle.
            </li>
            <li className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-purple-700 block">Par ailleurs / En second lieu</strong>
              Permet d'ajouter un nouvel argument distinct du précédent.
            </li>
          </ul>

          <h4 className="font-bold text-lg text-slate-800 border-b pb-2">2. Renforcer et ajouter une idée</h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <li className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-purple-700 block">De surcroît / En outre</strong>
              Signifie "de plus" dans un registre très soutenu (hautement valorisé).
            </li>
            <li className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-purple-700 block">Non seulement... mais aussi</strong>
              Structure syntaxique avancée qui démontre une aisance grammaticale.
            </li>
          </ul>

          <h4 className="font-bold text-lg text-slate-800 border-b pb-2">3. Exprimer l'opposition ou la concession</h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <li className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-purple-700 block">Néanmoins / Toutefois</strong>
              Remplace avantageusement "mais" et marque une réserve claire.
            </li>
            <li className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-purple-700 block">Certes... or...</strong>
              Idéal pour concéder un point avant de le réfuter (structure de débat de haut niveau).
            </li>
          </ul>

          <h4 className="font-bold text-lg text-slate-800 border-b pb-2">4. Exprimer la cause et la conséquence</h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <li className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-purple-700 block">En raison de / D'autant plus que</strong>
              Introduit une cause objective de façon précise.
            </li>
            <li className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-purple-700 block">Par conséquent / Il s'ensuit que</strong>
              Exprime une conséquence directe et logique.
            </li>
          </ul>

          <h4 className="font-bold text-lg text-slate-800 border-b pb-2">5. Conclure et résumer</h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <li className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-purple-700 block">En définitive / Somme toute</strong>
              Idéal pour boucler votre synthèse ou votre monologue en une formule percutante.
            </li>
            <li className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-purple-700 block">Tout bien considéré</strong>
              Montre que vous avez pesé le pour et le contre avant de trancher.
            </li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: "ecrite-tache-1",
    title: "Modèle Pratique — Expression Écrite Tâche 1 : Le Courriel de la Vie Quotidienne",
    excerpt: "Découvrez la structure exacte et les expressions clés pour réussir la Tâche 1 de l'Expression Écrite du TCF Canada.",
    category: "Expression Écrite",
    readTime: "6 min de lecture",
    date: "28 mai 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#10b981",
    bgColor: "hsl(149, 80%, 96%)",
    content: (
      <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed text-base">
          La Tâche 1 de l'Expression Écrite consiste à rédiger un court message de la vie quotidienne (courriel, lettre amicale, mot d'excuse) pour décrire une expérience personnelle, demander un conseil, inviter quelqu'un, ou expliquer une décision.
        </p>

        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg">
          <h4 className="font-bold text-emerald-900 text-sm mb-1">Contraintes clés de la Tâche 1</h4>
          <div className="space-y-2 mt-2">
            <div className="flex items-start gap-2 text-xs text-emerald-800">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
              <div>
                <strong>Nombre de mots :</strong> Entre 60 et 120 mots maximum. (Écrire moins de 60 ou plus de 120 entraîne une baisse de score sévère).
              </div>
            </div>
            <div className="flex items-start gap-2 text-xs text-emerald-800">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
              <div>
                <strong>Destinataire :</strong> Lisez attentivement pour savoir s'il faut tutoyer (ami, collègue proche) ou vouvoyer (voisin, responsable).
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-lg text-slate-800 border-b pb-2">Structure type à respecter</h4>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>1. Formule d'appel (Salutations) :</strong> Salut Thomas, / Cher voisin, / Madame, Monsieur,</p>
            <p><strong>2. Introduction (Le motif du courriel) :</strong> Je t'écris ce petit mot pour... / Je me permets de vous contacter au sujet de...</p>
            <p><strong>3. Développement (Les détails exigés par la consigne) :</strong> Décrivez précisément la situation ou l'événement.</p>
            <p><strong>4. Conclusion & Appel à l'action :</strong> Dis-moi si tu es disponible. / Dans l'attente de votre retour, je vous remercie.</p>
            <p><strong>5. Formule de politesse & Signature :</strong> À bientôt, / Cordialement, [Votre Prénom]</p>
          </div>

          <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">Exemple de Réponse Rédigée (Sujet : Invitation à fêter une promotion)</h4>
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-400 mb-2 border-b pb-2 flex justify-between">
              <span>Modèle Évora (CLB 9 Target)</span>
              <span>88 mots</span>
            </div>
            <p className="italic text-slate-700 leading-relaxed text-sm">
              Salut Antoine,<br /><br />
              J'espère que tu vas bien. Je t'écris car je viens tout juste de recevoir une promotion à mon travail ! Pour fêter cette excellente nouvelle, j'organise un petit dîner ce vendredi soir à partir de 20 heures dans un nouveau restaurant italien au centre-ville.<br /><br />
              J'aimerais beaucoup que tu sois de la partie pour célébrer cela avec moi. Dis-moi au plus vite si tu es disponible pour que je puisse réserver la table.<br /><br />
              À vendredi j'espère !<br /><br />
              Amicalement,<br />
              Marc
            </p>
          </div>

          <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">Pourquoi ce modèle obtient un score maximal ?</h4>
          <div className="space-y-3 mt-3">
            <div className="flex items-start gap-2.5 text-sm text-gray-600">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2" />
              <div>
                <strong>Respect de la consigne :</strong> L'invitation est claire, l'heure, le jour et le lieu sont mentionnés.
              </div>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-gray-600">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2" />
              <div>
                <strong>Richesse lexicale :</strong> Des expressions naturelles comme <em>"être de la partie"</em> ou <em>"tout juste"</em> montrent une maîtrise idiomatique.
              </div>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-gray-600">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2" />
              <div>
                <strong>Grammaire correcte :</strong> Pas de fautes de conjugaison ou d'accords, structures de phrases bien rythmées.
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "orale-tache-2",
    title: "Réussir l'Expression Orale Tâche 2 : L'Entretien en Interaction",
    excerpt: "Apprenez à poser des questions variées et naturelles pour convaincre l'examinateur lors du jeu de rôle de la Tâche 2 du TCF.",
    category: "Expression Orale",
    readTime: "7 min de lecture",
    date: "19 mai 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#f97316",
    bgColor: "hsl(31, 100%, 97%)",
    content: (
      <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed text-base">
          La Tâche 2 de l'Expression Orale du TCF Canada est une épreuve d'interaction de 3 minutes et 30 secondes. Vous devez imaginer une situation de la vie quotidienne à partir d'un document déclencheur (ex. louer une voiture, s'inscrire à une bibliothèque) et poser des questions à l'examinateur qui joue le rôle de votre interlocuteur.
        </p>

        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
          <h4 className="font-bold text-orange-900 text-sm mb-1">Attention au piège classique</h4>
          <p className="text-orange-700 text-xs leading-relaxed">
            Ne faites pas un monologue ! C'est une <strong>interaction</strong>. Laissez l'examinateur répondre à vos questions, réagissez à ses réponses ("Ah d'accord !", "C'est parfait", "Très bien"), puis posez la question suivante de manière fluide.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-lg text-slate-800 border-b pb-2">Les 3 phases indispensables</h4>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong className="text-orange-600">Phase 1 : L'introduction (15-30s)</strong><br />
              Saluez chaleureusement votre interlocuteur, présentez le motif de votre appel ou visite. (ex. <em>"Bonjour Monsieur, je vous contacte car j'ai vu votre annonce pour..."</em>).
            </p>
            <p>
              <strong className="text-orange-600">Phase 2 : Le corps de l'interaction (2m30s)</strong><br />
              Posez vos questions de façon logique (tarifs, horaires, conditions d'inscription, matériel à fournir). Varier les structures grammaticales.
            </p>
            <p>
              <strong className="text-orange-600">Phase 3 : La conclusion (20-30s)</strong><br />
              Remerciez votre interlocuteur, récapitulez brièvement et fixez un rendez-vous ou proposez de rappeler. (ex. <em>"Je vous remercie pour tous ces détails. Je vais y réfléchir et je repasserai vous voir demain."</em>).
            </p>
          </div>

          <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">Fiche mémo : Structures de questions à varier</h4>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-sm">
            <div>
              <strong className="text-slate-700 block">1. Formules de politesse (Conditionnel Présent)</strong>
              "Je souhaiterais savoir si..." / "Serait-il possible de..." / "Pourriez-vous me dire comment..."
            </div>
            <div>
              <strong className="text-slate-700 block">2. Inversion sujet-verbe (Registre Soutenu)</strong>
              "Proposez-vous des tarifs réduits pour étudiants ?" / "Quels sont les documents requis ?"
            </div>
            <div>
              <strong className="text-slate-700 block">3. Interrogation indirecte</strong>
              "Je me demandais si l'équipement était fourni dans l'abonnement."
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "lecture-rapide",
    title: "Techniques de Lecture Rapide pour la Compréhension Écrite du TCF",
    excerpt: "Nos techniques de lecture rapide (scanning & skimming) pour répondre sereinement aux 39 questions du TCF en 60 minutes.",
    category: "Compréhension",
    readTime: "5 min de lecture",
    date: "12 mai 2026",
    author: "Équipe Évora",
    difficulty: "Tous Niveaux",
    badgeColor: "#3b82f6",
    bgColor: "hsl(226, 100%, 97%)",
    content: (
      <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed text-base">
          L'épreuve de Compréhension Écrite comporte 39 questions à choix multiples à faire en 60 minutes chrono. La gestion du temps est le défi majeur de cette épreuve, car les textes des questions 25 à 39 sont longs et complexes.
        </p>

        <div className="space-y-4">
          <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. La technique du Skimming (Lecture Globale)</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            Pour les premières questions (1 à 15), qui portent souvent sur des panneaux publicitaires, des petites annonces ou des consignes courtes : ne lisez pas mot à mot. Lisez en diagonale pour capter la nature du document (Qui écrit ? Pour qui ? Dans quel but ?). Repérez immédiatement les gros titres et les mots en gras.
          </p>

          <h4 className="font-bold text-lg text-slate-800 border-b pb-2">2. La technique du Scanning (Recherche d'indices)</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            Pour les questions intermédiaires (16 à 30) : lisez d'abord la question et les quatre options proposées. Notez les mots-clés de la consigne (dates, noms propres, verbes d'action). Parcourez ensuite le texte rapidement pour repérer ces mots ou leurs synonymes. Une fois le passage trouvé, lisez-le attentivement pour valider la bonne option.
          </p>

          <h4 className="font-bold text-lg text-slate-800 border-b pb-2">3. Déconstruire les textes argumentatifs complexes</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            Pour les textes académiques difficiles du niveau C1/C2 (questions 31 à 39) :
          </p>
          <div className="space-y-3 mt-3">
            <div className="flex items-start gap-2.5 text-sm text-gray-600">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
              <div>
                Repérez les articulateurs logiques d'opposition (or, cependant, néanmoins) car l'avis réel de l'auteur se cache souvent juste après ces mots.
              </div>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-gray-600">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
              <div>
                Éliminez systématiquement les options contenant des affirmations absolues (ex : "toujours", "tous les", "aucun") qui ne figurent presque jamais dans le ton nuancé d'un texte d'expert.
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "orale-tache-3",
    title: "Cheat Sheet — Vocabulaire et Structures pour la Tâche 3 de l'Expression Orale",
    excerpt: "Exprimez votre opinion de manière claire, académique et structurée sur un sujet de société complexe.",
    category: "Grammaire",
    readTime: "6 min de lecture",
    date: "05 mai 2026",
    author: "Équipe Évora",
    difficulty: "C1-C2 / CLB 9+",
    badgeColor: "#d97706",
    bgColor: "hsl(45, 100%, 96%)",
    content: (
      <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed text-base">
          Dans la Tâche 3 de l'Expression Orale, vous devez donner votre point de vue de façon argumentée pendant 4 minutes et 30 secondes sans aucune préparation écrite préalable. Vous devez démontrer que vous savez nuancer vos propos et utiliser un lexique de haut niveau.
        </p>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
          <h4 className="font-bold text-amber-900 text-sm mb-1">Structure attendue du Monologue</h4>
          <div className="space-y-3 mt-3">
            <div className="flex items-start gap-3 text-xs text-amber-800">
              <span className="shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-amber-200/80 text-amber-900 font-bold text-[10px]">
                1
              </span>
              <div className="leading-relaxed">
                <strong>Introduction :</strong> Présentez le thème général, posez la problématique sous forme de question et annoncez brièvement le plan de votre argumentation.
              </div>
            </div>
            <div className="flex items-start gap-3 text-xs text-amber-800">
              <span className="shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-amber-200/80 text-amber-900 font-bold text-[10px]">
                2
              </span>
              <div className="leading-relaxed">
                <strong>Développement :</strong> Défendez deux arguments distincts et illustrez-les par des exemples concrets de la vie courante ou de l'actualité.
              </div>
            </div>
            <div className="flex items-start gap-3 text-xs text-amber-800">
              <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-amber-200/80 text-amber-900 font-bold text-[10px]">
                3
              </span>
              <div className="leading-relaxed">
                <strong>Nuance (Le contre-argument) :</strong> Montrez les limites de votre point de vue ou donnez une perspective opposée.
              </div>
            </div>
            <div className="flex items-start gap-3 text-xs text-amber-800">
              <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-amber-200/80 text-amber-900 font-bold text-[10px]">
                4
              </span>
              <div className="leading-relaxed">
                <strong>Conclusion :</strong> Résumez votre stance et ouvrez le débat sur une autre thématique connexe.
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-lg text-slate-800 border-b pb-2">Expressions phares à mémoriser</h4>

          <div className="space-y-3 text-sm">
            <div>
              <strong className="text-amber-700 block">Pour introduire le sujet :</strong>
              "Le sujet qui nous préoccupe aujourd'hui est d'une importance capitale..." / "Il convient tout d'abord de définir ce que l'on entend par..."
            </div>

            <div>
              <strong className="text-amber-700 block">Pour structurer la transition :</strong>
              "Il va sans dire que... néanmoins, il ne faut pas occulter le fait que..." / "Si d'un côté la situation semble alarmante, d'un autre côté..."
            </div>

            <div>
              <strong className="text-amber-700 block">Pour illustrer par un exemple :</strong>
              "À cet égard, citons le cas de..." / "L'expérience canadienne dans ce secteur illustre parfaitement ce phénomène..."
            </div>

          </div>
        </div>
      </div>
    )
  },
  {
    id: "expressions-subjonctives-incontournables-expression-ecrite",
    title: "Les expressions subjonctives incontournables pour l'Expression Écrite",
    excerpt: "Maîtrisez les expressions qui déclenchent le subjonctif pour enrichir vos productions écrites et viser un niveau B2 solide.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "05 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed text-base">
          Le subjonctif est l'un des éléments grammaticaux les plus valorisés dans les
          productions écrites du TCF Canada. Son utilisation appropriée démontre une
          excellente maîtrise de la langue et permet d'obtenir un meilleur score dans
          les tâches argumentatives.
        </p>

        <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
          <h4 className="font-bold text-purple-900 text-sm mb-1">
            Astuce de l'examinateur
          </h4>
          <p className="text-purple-700 text-xs leading-relaxed">
            Utilisez au moins deux ou trois structures au subjonctif dans vos textes
            B2. Cela montre une maîtrise grammaticale avancée sans alourdir votre rédaction.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-lg text-slate-800 border-b pb-2">
            1. Les expressions les plus fréquentes
          </h4>

          <p className="text-sm text-gray-600 leading-relaxed">
            Certaines expressions exigent systématiquement le subjonctif. Elles sont
            particulièrement utiles pour exprimer l'opinion, la nécessité, le doute ou
            le souhait.
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <li className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-purple-700 block">Il faut que</strong>
              Il faut que les autorités améliorent les transports publics.
            </li>

            <li className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-purple-700 block">Bien que</strong>
              Bien que cette solution soit coûteuse, elle reste efficace.
            </li>

            <li className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-purple-700 block">Pour que</strong>
              Nous devons agir pour que les résultats soient durables.
            </li>

            <li className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-purple-700 block">Il est important que</strong>
              Il est important que chacun participe au débat.
            </li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: "guide-tache-1-se-presenter-de-facon-impactante",
    title: "Guide de la Tâche 1 : Se présenter de façon impactante",
    excerpt: "Découvrez une méthode simple pour faire une excellente première impression lors de l'Expression Orale du TCF Canada.",
    category: "Expression Orale",
    readTime: "6 min de lecture",
    date: "05 juin 2026",
    author: "Équipe Évora",
    difficulty: "Tous Niveaux",
    badgeColor: "#f97316",
    bgColor: "hsl(31, 100%, 97%)",
    content: (
      <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed text-base">
          La première tâche de l'expression orale consiste souvent à se présenter ou à
          parler de soi. Même si elle paraît simple, cette étape permet à l'examinateur
          d'évaluer votre fluidité, votre prononciation et votre capacité à développer
          vos idées.
        </p>

        <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg">
          <h4 className="font-bold text-orange-900 text-sm mb-1">
            Astuce de l'examinateur
          </h4>
          <p className="text-orange-700 text-xs leading-relaxed">
            Évitez les réponses trop courtes. Développez chaque idée avec un exemple
            personnel afin de gagner des points en richesse linguistique.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-lg text-slate-800 border-b pb-2">
            1. Structure gagnante
          </h4>

          <p className="text-sm text-gray-600 leading-relaxed">
            Une présentation efficace suit une progression logique : identité,
            parcours, centres d'intérêt et objectifs futurs.
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <li className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-orange-700 block">Qui êtes-vous ?</strong>
              Présentez votre nom, votre âge, votre ville et votre profession.
            </li>

            <li className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-orange-700 block">Vos activités</strong>
              Parlez de vos études, de votre travail ou de vos projets actuels.
            </li>

            <li className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-orange-700 block">Vos passions</strong>
              Décrivez vos loisirs et expliquez pourquoi vous les appréciez.
            </li>

            <li className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-orange-700 block">Vos objectifs</strong>
              Présentez vos ambitions académiques ou professionnelles.
            </li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: "gerondif-fluidifier-ses-phrases-b2",
    title: "Comment utiliser le gérondif pour fluidifier ses phrases",
    excerpt: "Le gérondif permet de relier les idées avec élégance et de produire des phrases plus naturelles à l'écrit comme à l'oral.",
    category: "Grammaire",
    readTime: "6 min de lecture",
    date: "05 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#d97706",
    bgColor: "hsl(45, 100%, 96%)",
    content: (
      <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed text-base">
          Le gérondif est une structure très appréciée au TCF Canada car elle permet
          d'éviter la répétition de phrases courtes et de montrer une meilleure maîtrise
          des liens logiques.
        </p>

        <div className="border-l-4 border-amber-500 bg-amber-50 p-4 rounded-r-lg">
          <h4 className="font-bold text-amber-900 text-sm mb-1">
            Astuce de l'examinateur
          </h4>
          <p className="text-amber-700 text-xs leading-relaxed">
            Remplacez certaines propositions introduites par "et" ou "pendant que"
            par un gérondif afin de rendre votre discours plus naturel.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-lg text-slate-800 border-b pb-2">
            1. Les usages essentiels du gérondif
          </h4>

          <p className="text-sm text-gray-600 leading-relaxed">
            Le gérondif se forme avec "en" suivi du participe présent. Il sert à
            exprimer la simultanéité, la manière ou la condition.
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <li className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-amber-700 block">Simultanéité</strong>
              Il écoute un podcast en faisant du sport.
            </li>

            <li className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-amber-700 block">Manière</strong>
              Elle a réussi son examen en travaillant régulièrement.
            </li>

            <li className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-amber-700 block">Cause</strong>
              En étudiant davantage, vous progresserez rapidement.
            </li>

            <li className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-amber-700 block">Condition</strong>
              En suivant cette méthode, vous améliorerez votre score.
            </li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: "structure-comparer-deux-points-de-vue-tache-3",
    title: "Expression Écrite Tâche 3 : Structure type pour comparer deux points de vue",
    excerpt: "Une méthode claire et efficace pour analyser, comparer et nuancer deux opinions dans les productions argumentatives du TCF Canada.",
    category: "Expression Écrite",
    readTime: "6 min de lecture",
    date: "05 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#10b981",
    bgColor: "hsl(149, 80%, 96%)",
    content: (
      <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed text-base">
          Dans la Tâche 3 du TCF Canada, vous devez souvent présenter deux opinions
          opposées, analyser leurs avantages et leurs limites, puis exprimer votre
          propre point de vue de manière nuancée.
        </p>

        <div className="border-l-4 border-emerald-500 bg-emerald-50 p-4 rounded-r-lg">
          <h4 className="font-bold text-emerald-900 text-sm mb-1">
            Astuce de l'examinateur
          </h4>
          <p className="text-emerald-700 text-xs leading-relaxed">
            Ne choisissez pas un camp dès le début. Présentez d'abord les deux
            perspectives de manière équilibrée avant d'exprimer votre opinion.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-lg text-slate-800 border-b pb-2">
            1. Plan recommandé
          </h4>

          <p className="text-sm text-gray-600 leading-relaxed">
            Une structure claire améliore la cohérence du texte et facilite la lecture
            pour l'examinateur.
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <li className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-emerald-700 block">Introduction</strong>
              Présentez brièvement le sujet et les deux opinions.
            </li>

            <li className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-emerald-700 block">Premier point de vue</strong>
              Expliquez les avantages avec un exemple concret.
            </li>

            <li className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-emerald-700 block">Deuxième point de vue</strong>
              Présentez les arguments opposés de manière équilibrée.
            </li>

            <li className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-emerald-700 block">Opinion personnelle</strong>
              Adoptez une position nuancée et justifiez votre choix.
            </li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: "50-expressions-nuancer-opinion",
    title: "50 expressions indispensables pour nuancer son opinion au TCF",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="bg-purple-50/50 border border-purple-200 p-4 rounded-xl">
                <h4 className="font-bold text-purple-900 text-sm mb-2">📚 Boîte à Vocabulaire clé</h4>
                <ul className="space-y-2 text-xs text-purple-950">
                  <li><strong>S'avérer :</strong> Se révéler être de façon indiscutable.</li>
                  <li><strong>Sous-tendre :</strong> Être la base de, soutenir de manière invisible.</li>
                  <li><strong>Nonobstant :</strong> Malgré (registre très soutenu).</li>
                </ul>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Fiche Stratégie d'Examen</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <p className="leading-relaxed">
                  Consacrez toujours les 2 premières minutes de votre épreuve à bâtir un schéma conceptuel. Ne rédigez pas directement : listez vos mots-clés et organisez-les selon un enchaînement logique rigoureux.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Plan d'Action Recommandé</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">1</span>
                  <div className="leading-relaxed">Sélectionner 3 expressions clés à placer obligatoirement.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">2</span>
                  <div className="leading-relaxed">Rédiger les introductions et les conclusions au brouillon.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">3</span>
                  <div className="leading-relaxed">Vérifier systématiquement les accords de verbes et d'adjectifs.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "lexique-accord-desaccord-tache-3",
    title: "Le lexique avancé de l'accord et du désaccord",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau C1-C2 / CLB 9+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "C1-C2 / CLB 9+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-purple-900 text-sm mb-1">💡 Règle d'or de l'examinateur</h4>
                <p className="text-purple-700 text-xs leading-relaxed">
                  Pour le niveau C1-C2 / CLB 9+, évitez de répéter les mêmes expressions basiques. Structurez vos idées de manière rigoureuse en utilisant un lexique varié et adapté.
                </p>
              </div>
      
              <div className="space-y-4">
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Les concepts clés</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-purple-700 block">Structure fondamentale</strong>
                    Toujours poser le cadre logique avant de développer vos arguments.
                  </li>
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-purple-700 block">Richesse lexicale</strong>
                    Intégrez des mots de liaison peu communs mais précis.
                  </li>
                </ul>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'application pratique</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2">
                  <p><strong>Exemple 1 :</strong> "Bien que la situation soit complexe, il convient de souligner que..." (CLB 9+ target)</p>
                  <p><strong>Exemple 2 :</strong> "En définitive, cette mesure s'avère indispensable pour..."</p>
                </div>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Erreurs fréquentes à éviter</h4>
                <div className="space-y-3 mt-3">
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                    <div>L'abus de connecteurs répétitifs comme "parce que" ou "mais".</div>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                    <div>Le manque de clarté dans la liaison entre les paragraphes.</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "exprimer-cause-consequence-elegance",
    title: "Fiche mémo : Exprimer la cause et la conséquence avec élégance",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Tableau de référence rapide</h4>
              <div className="border border-slate-100 rounded-xl overflow-hidden text-sm">
                <div className="bg-slate-50 p-3 font-semibold border-b border-slate-100 flex justify-between">
                  <span>Élément</span>
                  <span>Usage recommandé</span>
                </div>
                <div className="p-3 border-b border-slate-100 flex justify-between">
                  <strong>Niveau B2</strong>
                  <span className="text-gray-600">Expression claire avec nuances de base</span>
                </div>
                <div className="p-3 flex justify-between">
                  <strong>Niveau C1 / C2</strong>
                  <span className="text-gray-600">Maîtrise complète avec flexibilité et style</span>
                </div>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'entraînement</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour vous approprier ces notions, lisez régulièrement des articles de presse française (Le Monde, Le Figaro) et observez comment les journalistes structurent leurs transitions.
              </p>
      
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 text-sm mb-3">📝 Mini-Quiz d'auto-évaluation</h4>
                <div className="space-y-3 text-xs">
                  <p className="font-semibold text-slate-700">Quelle tournure exprime au mieux une nuance formelle ?</p>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded border border-slate-150">A) "Mais je pense que..."</div>
                    <div className="p-2 bg-white rounded border border-slate-150 font-medium text-emerald-700">B) "Néanmoins, force est de constater que..." (Correct)</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "vocabulaire-environnement-ecologie-clb9",
    title: "Vocabulaire thématique : Environnement et Écologie pour le niveau C1/C2",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau C1-C2 / CLB 9+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "C1-C2 / CLB 9+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-purple-900 text-sm mb-1">💡 Règle d'or de l'examinateur</h4>
                <p className="text-purple-700 text-xs leading-relaxed">
                  Pour le niveau C1-C2 / CLB 9+, évitez de répéter les mêmes expressions basiques. Structurez vos idées de manière rigoureuse en utilisant un lexique varié et adapté.
                </p>
              </div>
      
              <div className="space-y-4">
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Les concepts clés</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-purple-700 block">Structure fondamentale</strong>
                    Toujours poser le cadre logique avant de développer vos arguments.
                  </li>
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-purple-700 block">Richesse lexicale</strong>
                    Intégrez des mots de liaison peu communs mais précis.
                  </li>
                </ul>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'application pratique</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2">
                  <p><strong>Exemple 1 :</strong> "Bien que la situation soit complexe, il convient de souligner que..." (CLB 9+ target)</p>
                  <p><strong>Exemple 2 :</strong> "En définitive, cette mesure s'avère indispensable pour..."</p>
                </div>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Erreurs fréquentes à éviter</h4>
                <div className="space-y-3 mt-3">
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                    <div>L'abus de connecteurs répétitifs comme "parce que" ou "mais".</div>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                    <div>Le manque de clarté dans la liaison entre les paragraphes.</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "vocabulaire-education-nouvelles-technologies",
    title: "Vocabulaire thématique : Éducation et Nouvelles Technologies",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Tableau de référence rapide</h4>
              <div className="border border-slate-100 rounded-xl overflow-hidden text-sm">
                <div className="bg-slate-50 p-3 font-semibold border-b border-slate-100 flex justify-between">
                  <span>Élément</span>
                  <span>Usage recommandé</span>
                </div>
                <div className="p-3 border-b border-slate-100 flex justify-between">
                  <strong>Niveau B2</strong>
                  <span className="text-gray-600">Expression claire avec nuances de base</span>
                </div>
                <div className="p-3 flex justify-between">
                  <strong>Niveau C1 / C2</strong>
                  <span className="text-gray-600">Maîtrise complète avec flexibilité et style</span>
                </div>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'entraînement</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour vous approprier ces notions, lisez régulièrement des articles de presse française (Le Monde, Le Figaro) et observez comment les journalistes structurent leurs transitions.
              </p>
      
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 text-sm mb-3">📝 Mini-Quiz d'auto-évaluation</h4>
                <div className="space-y-3 text-xs">
                  <p className="font-semibold text-slate-700">Quelle tournure exprime au mieux une nuance formelle ?</p>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded border border-slate-150">A) "Mais je pense que..."</div>
                    <div className="p-2 bg-white rounded border border-slate-150 font-medium text-emerald-700">B) "Néanmoins, force est de constater que..." (Correct)</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "vocabulaire-travail-tele-travail",
    title: "Vocabulaire thématique : Travail, Télétravail et Équilibre de Vie",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="bg-purple-50/50 border border-purple-200 p-4 rounded-xl">
                <h4 className="font-bold text-purple-900 text-sm mb-2">📚 Boîte à Vocabulaire clé</h4>
                <ul className="space-y-2 text-xs text-purple-950">
                  <li><strong>S'avérer :</strong> Se révéler être de façon indiscutable.</li>
                  <li><strong>Sous-tendre :</strong> Être la base de, soutenir de manière invisible.</li>
                  <li><strong>Nonobstant :</strong> Malgré (registre très soutenu).</li>
                </ul>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Fiche Stratégie d'Examen</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <p className="leading-relaxed">
                  Consacrez toujours les 2 premières minutes de votre épreuve à bâtir un schéma conceptuel. Ne rédigez pas directement : listez vos mots-clés et organisez-les selon un enchaînement logique rigoureux.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Plan d'Action Recommandé</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">1</span>
                  <div className="leading-relaxed">Sélectionner 3 expressions clés à placer obligatoirement.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">2</span>
                  <div className="leading-relaxed">Rédiger les introductions et les conclusions au brouillon.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">3</span>
                  <div className="leading-relaxed">Vérifier systématiquement les accords de verbes et d'adjectifs.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "vocabulaire-sante-intelligence-artificielle",
    title: "Vocabulaire thématique : Santé, Éthique et Intelligence Artificielle",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau C1-C2 / CLB 9+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "C1-C2 / CLB 9+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Analyse approfondie du sujet</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour atteindre le niveau C1-C2 / CLB 9+, votre argumentation doit reposer sur des concepts sociologiques ou économiques globaux plutôt que sur de simples anecdotes personnelles. L'examinateur recherche un esprit de synthèse analytique développé.
              </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Simulation / Modèle type</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm font-mono text-slate-700">
                <p className="italic">"Monsieur l'Examinateur,<br/>
                Je partage en partie ce point de vue. Néanmoins, il convient de pondérer cette affirmation..."</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Grille d'évaluation : ce que cherche l'examinateur</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                  <div><strong>Coordonner :</strong> Aisance et clarté du débit de parole.</div>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                  <div><strong>Précision :</strong> Utilisation d'un lexique très précis et varié.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "expressions-idiomatiques-adorees-examinateurs",
    title: "15 expressions idiomatiques françaises adorées des examinateurs",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau C1-C2 / CLB 9+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "C1-C2 / CLB 9+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-purple-900 text-sm mb-1">💡 Règle d'or de l'examinateur</h4>
                <p className="text-purple-700 text-xs leading-relaxed">
                  Pour le niveau C1-C2 / CLB 9+, évitez de répéter les mêmes expressions basiques. Structurez vos idées de manière rigoureuse en utilisant un lexique varié et adapté.
                </p>
              </div>
      
              <div className="space-y-4">
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Les concepts clés</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-purple-700 block">Structure fondamentale</strong>
                    Toujours poser le cadre logique avant de développer vos arguments.
                  </li>
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-purple-700 block">Richesse lexicale</strong>
                    Intégrez des mots de liaison peu communs mais précis.
                  </li>
                </ul>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'application pratique</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2">
                  <p><strong>Exemple 1 :</strong> "Bien que la situation soit complexe, il convient de souligner que..." (CLB 9+ target)</p>
                  <p><strong>Exemple 2 :</strong> "En définitive, cette mesure s'avère indispensable pour..."</p>
                </div>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Erreurs fréquentes à éviter</h4>
                <div className="space-y-3 mt-3">
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                    <div>L'abus de connecteurs répétitifs comme "parce que" ou "mais".</div>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                    <div>Le manque de clarté dans la liaison entre les paragraphes.</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "remplacer-verbes-ternes",
    title: "Comment remplacer les verbes ternes (faire, dire, avoir, être) à l'écrit",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="bg-purple-50/50 border border-purple-200 p-4 rounded-xl">
                <h4 className="font-bold text-purple-900 text-sm mb-2">📚 Boîte à Vocabulaire clé</h4>
                <ul className="space-y-2 text-xs text-purple-950">
                  <li><strong>S'avérer :</strong> Se révéler être de façon indiscutable.</li>
                  <li><strong>Sous-tendre :</strong> Être la base de, soutenir de manière invisible.</li>
                  <li><strong>Nonobstant :</strong> Malgré (registre très soutenu).</li>
                </ul>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Fiche Stratégie d'Examen</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <p className="leading-relaxed">
                  Consacrez toujours les 2 premières minutes de votre épreuve à bâtir un schéma conceptuel. Ne rédigez pas directement : listez vos mots-clés et organisez-les selon un enchaînement logique rigoureux.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Plan d'Action Recommandé</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">1</span>
                  <div className="leading-relaxed">Sélectionner 3 expressions clés à placer obligatoirement.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">2</span>
                  <div className="leading-relaxed">Rédiger les introductions et les conclusions au brouillon.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">3</span>
                  <div className="leading-relaxed">Vérifier systématiquement les accords de verbes et d'adjectifs.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "15-adverbes-sophistiques-structure",
    title: "15 adverbes sophistiqués pour structurer vos phrases",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-purple-900 text-sm mb-1">💡 Règle d'or de l'examinateur</h4>
                <p className="text-purple-700 text-xs leading-relaxed">
                  Pour le niveau B2 / CLB 7+, évitez de répéter les mêmes expressions basiques. Structurez vos idées de manière rigoureuse en utilisant un lexique varié et adapté.
                </p>
              </div>
      
              <div className="space-y-4">
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Les concepts clés</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-purple-700 block">Structure fondamentale</strong>
                    Toujours poser le cadre logique avant de développer vos arguments.
                  </li>
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-purple-700 block">Richesse lexicale</strong>
                    Intégrez des mots de liaison peu communs mais précis.
                  </li>
                </ul>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'application pratique</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2">
                  <p><strong>Exemple 1 :</strong> "Bien que la situation soit complexe, il convient de souligner que..." (CLB 9+ target)</p>
                  <p><strong>Exemple 2 :</strong> "En définitive, cette mesure s'avère indispensable pour..."</p>
                </div>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Erreurs fréquentes à éviter</h4>
                <div className="space-y-3 mt-3">
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                    <div>L'abus de connecteurs répétitifs comme "parce que" ou "mais".</div>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                    <div>Le manque de clarté dans la liaison entre les paragraphes.</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "guide-prepositions-lieu-temps",
    title: "Le guide des prépositions de lieu et de temps",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau Tous Niveaux. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "Tous Niveaux",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Tableau de référence rapide</h4>
              <div className="border border-slate-100 rounded-xl overflow-hidden text-sm">
                <div className="bg-slate-50 p-3 font-semibold border-b border-slate-100 flex justify-between">
                  <span>Élément</span>
                  <span>Usage recommandé</span>
                </div>
                <div className="p-3 border-b border-slate-100 flex justify-between">
                  <strong>Niveau B2</strong>
                  <span className="text-gray-600">Expression claire avec nuances de base</span>
                </div>
                <div className="p-3 flex justify-between">
                  <strong>Niveau C1 / C2</strong>
                  <span className="text-gray-600">Maîtrise complète avec flexibilité et style</span>
                </div>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'entraînement</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour vous approprier ces notions, lisez régulièrement des articles de presse française (Le Monde, Le Figaro) et observez comment les journalistes structurent leurs transitions.
              </p>
      
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 text-sm mb-3">📝 Mini-Quiz d'auto-évaluation</h4>
                <div className="space-y-3 text-xs">
                  <p className="font-semibold text-slate-700">Quelle tournure exprime au mieux une nuance formelle ?</p>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded border border-slate-150">A) "Mais je pense que..."</div>
                    <div className="p-2 bg-white rounded border border-slate-150 font-medium text-emerald-700">B) "Néanmoins, force est de constater que..." (Correct)</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "lexique-immigration-integration-canada",
    title: "Lexique de l'immigration et de l'intégration au Canada",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="bg-purple-50/50 border border-purple-200 p-4 rounded-xl">
                <h4 className="font-bold text-purple-900 text-sm mb-2">📚 Boîte à Vocabulaire clé</h4>
                <ul className="space-y-2 text-xs text-purple-950">
                  <li><strong>S'avérer :</strong> Se révéler être de façon indiscutable.</li>
                  <li><strong>Sous-tendre :</strong> Être la base de, soutenir de manière invisible.</li>
                  <li><strong>Nonobstant :</strong> Malgré (registre très soutenu).</li>
                </ul>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Fiche Stratégie d'Examen</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <p className="leading-relaxed">
                  Consacrez toujours les 2 premières minutes de votre épreuve à bâtir un schéma conceptuel. Ne rédigez pas directement : listez vos mots-clés et organisez-les selon un enchaînement logique rigoureux.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Plan d'Action Recommandé</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">1</span>
                  <div className="leading-relaxed">Sélectionner 3 expressions clés à placer obligatoirement.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">2</span>
                  <div className="leading-relaxed">Rédiger les introductions et les conclusions au brouillon.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">3</span>
                  <div className="leading-relaxed">Vérifier systématiquement les accords de verbes et d'adjectifs.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "art-concession-bien-que-certes",
    title: "Fiche mémo : L'art de la concession (bien que, quoique, certes...)",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau C1-C2 / CLB 9+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "C1-C2 / CLB 9+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-purple-900 text-sm mb-1">📌 Point important à retenir</h4>
                <p className="text-purple-700 text-xs leading-relaxed">
                  Dans la tâche de type comparaison ou synthèse, l'équilibre des parties est primordial. Consacrez un volume de rédaction similaire pour chaque point de vue.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Structure recommandée pour viser le CLB 9+</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Introduction :</strong> Présentation neutre du thème général.</p>
                <p><strong>Partie 1 :</strong> Avantages et perspectives favorables.</p>
                <p><strong>Partie 2 :</strong> Limites et objections constructives.</p>
                <p><strong>Conclusion :</strong> Bilan synthétique et prise de position personnelle.</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Modèle de réponse rédigé (Extrait)</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-700 italic">
                "En somme, s'il est indéniable que cette technologie facilite le quotidien, elle pose d'importants défis éthiques qui ne sauraient être ignorés."
              </div>
            </div>
    )
  },
  {
    id: "structures-impersonnelles-introduction-argument",
    title: "Structures impersonnelles pour introduire un argument (il est indéniable que...)",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau C1-C2 / CLB 9+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "C1-C2 / CLB 9+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-purple-900 text-sm mb-1">💡 Règle d'or de l'examinateur</h4>
                <p className="text-purple-700 text-xs leading-relaxed">
                  Pour le niveau C1-C2 / CLB 9+, évitez de répéter les mêmes expressions basiques. Structurez vos idées de manière rigoureuse en utilisant un lexique varié et adapté.
                </p>
              </div>
      
              <div className="space-y-4">
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Les concepts clés</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-purple-700 block">Structure fondamentale</strong>
                    Toujours poser le cadre logique avant de développer vos arguments.
                  </li>
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-purple-700 block">Richesse lexicale</strong>
                    Intégrez des mots de liaison peu communs mais précis.
                  </li>
                </ul>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'application pratique</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2">
                  <p><strong>Exemple 1 :</strong> "Bien que la situation soit complexe, il convient de souligner que..." (CLB 9+ target)</p>
                  <p><strong>Exemple 2 :</strong> "En définitive, cette mesure s'avère indispensable pour..."</p>
                </div>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Erreurs fréquentes à éviter</h4>
                <div className="space-y-3 mt-3">
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                    <div>L'abus de connecteurs répétitifs comme "parce que" ou "mais".</div>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                    <div>Le manque de clarté dans la liaison entre les paragraphes.</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "verbes-opinion-constructions",
    title: "Les verbes d'opinion et leurs constructions (subjonctif vs indicatif)",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Analyse approfondie du sujet</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour atteindre le niveau B2 / CLB 7+, votre argumentation doit reposer sur des concepts sociologiques ou économiques globaux plutôt que sur de simples anecdotes personnelles. L'examinateur recherche un esprit de synthèse analytique développé.
              </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Simulation / Modèle type</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm font-mono text-slate-700">
                <p className="italic">"Monsieur l'Examinateur,<br/>
                Je partage en partie ce point de vue. Néanmoins, il convient de pondérer cette affirmation..."</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Grille d'évaluation : ce que cherche l'examinateur</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                  <div><strong>Coordonner :</strong> Aisance et clarté du débit de parole.</div>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                  <div><strong>Précision :</strong> Utilisation d'un lexique très précis et varié.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "vocabulaire-comparaison-proportion",
    title: "Vocabulaire de la comparaison et de la proportion",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Tableau de référence rapide</h4>
              <div className="border border-slate-100 rounded-xl overflow-hidden text-sm">
                <div className="bg-slate-50 p-3 font-semibold border-b border-slate-100 flex justify-between">
                  <span>Élément</span>
                  <span>Usage recommandé</span>
                </div>
                <div className="p-3 border-b border-slate-100 flex justify-between">
                  <strong>Niveau B2</strong>
                  <span className="text-gray-600">Expression claire avec nuances de base</span>
                </div>
                <div className="p-3 flex justify-between">
                  <strong>Niveau C1 / C2</strong>
                  <span className="text-gray-600">Maîtrise complète avec flexibilité et style</span>
                </div>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'entraînement</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour vous approprier ces notions, lisez régulièrement des articles de presse française (Le Monde, Le Figaro) et observez comment les journalistes structurent leurs transitions.
              </p>
      
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 text-sm mb-3">📝 Mini-Quiz d'auto-évaluation</h4>
                <div className="space-y-3 text-xs">
                  <p className="font-semibold text-slate-700">Quelle tournure exprime au mieux une nuance formelle ?</p>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded border border-slate-150">A) "Mais je pense que..."</div>
                    <div className="p-2 bg-white rounded border border-slate-150 font-medium text-emerald-700">B) "Néanmoins, force est de constater que..." (Correct)</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "mots-liaison-temporels-tache-1",
    title: "Les mots de liaison temporels pour raconter une expérience (Tâche 1)",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau Tous Niveaux. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "Tous Niveaux",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="bg-purple-50/50 border border-purple-200 p-4 rounded-xl">
                <h4 className="font-bold text-purple-900 text-sm mb-2">📚 Boîte à Vocabulaire clé</h4>
                <ul className="space-y-2 text-xs text-purple-950">
                  <li><strong>S'avérer :</strong> Se révéler être de façon indiscutable.</li>
                  <li><strong>Sous-tendre :</strong> Être la base de, soutenir de manière invisible.</li>
                  <li><strong>Nonobstant :</strong> Malgré (registre très soutenu).</li>
                </ul>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Fiche Stratégie d'Examen</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <p className="leading-relaxed">
                  Consacrez toujours les 2 premières minutes de votre épreuve à bâtir un schéma conceptuel. Ne rédigez pas directement : listez vos mots-clés et organisez-les selon un enchaînement logique rigoureux.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Plan d'Action Recommandé</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">1</span>
                  <div className="leading-relaxed">Sélectionner 3 expressions clés à placer obligatoirement.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">2</span>
                  <div className="leading-relaxed">Rédiger les introductions et les conclusions au brouillon.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">3</span>
                  <div className="leading-relaxed">Vérifier systématiquement les accords de verbes et d'adjectifs.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "vocabulaire-formel-courriel-professionnel",
    title: "Vocabulaire formel et tournures pour le courriel professionnel",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-purple-900 text-sm mb-1">📌 Point important à retenir</h4>
                <p className="text-purple-700 text-xs leading-relaxed">
                  Dans la tâche de type comparaison ou synthèse, l'équilibre des parties est primordial. Consacrez un volume de rédaction similaire pour chaque point de vue.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Structure recommandée pour viser le CLB 9+</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Introduction :</strong> Présentation neutre du thème général.</p>
                <p><strong>Partie 1 :</strong> Avantages et perspectives favorables.</p>
                <p><strong>Partie 2 :</strong> Limites et objections constructives.</p>
                <p><strong>Conclusion :</strong> Bilan synthétique et prise de position personnelle.</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Modèle de réponse rédigé (Extrait)</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-700 italic">
                "En somme, s'il est indéniable que cette technologie facilite le quotidien, elle pose d'importants défis éthiques qui ne sauraient être ignorés."
              </div>
            </div>
    )
  },
  {
    id: "exprimer-doute-certitude-probabilite",
    title: "Comment exprimer le doute, la certitude et la probabilité",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau C1-C2 / CLB 9+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "C1-C2 / CLB 9+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Analyse approfondie du sujet</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour atteindre le niveau C1-C2 / CLB 9+, votre argumentation doit reposer sur des concepts sociologiques ou économiques globaux plutôt que sur de simples anecdotes personnelles. L'examinateur recherche un esprit de synthèse analytique développé.
              </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Simulation / Modèle type</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm font-mono text-slate-700">
                <p className="italic">"Monsieur l'Examinateur,<br/>
                Je partage en partie ce point de vue. Néanmoins, il convient de pondérer cette affirmation..."</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Grille d'évaluation : ce que cherche l'examinateur</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                  <div><strong>Coordonner :</strong> Aisance et clarté du débit de parole.</div>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                  <div><strong>Précision :</strong> Utilisation d'un lexique très précis et varié.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "lexique-transition-numerique-cybersecurite",
    title: "Lexique de la transition numérique et de la cybersécurité",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau C1-C2 / CLB 9+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "C1-C2 / CLB 9+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-purple-900 text-sm mb-1">💡 Règle d'or de l'examinateur</h4>
                <p className="text-purple-700 text-xs leading-relaxed">
                  Pour le niveau C1-C2 / CLB 9+, évitez de répéter les mêmes expressions basiques. Structurez vos idées de manière rigoureuse en utilisant un lexique varié et adapté.
                </p>
              </div>
      
              <div className="space-y-4">
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Les concepts clés</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-purple-700 block">Structure fondamentale</strong>
                    Toujours poser le cadre logique avant de développer vos arguments.
                  </li>
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-purple-700 block">Richesse lexicale</strong>
                    Intégrez des mots de liaison peu communs mais précis.
                  </li>
                </ul>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'application pratique</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2">
                  <p><strong>Exemple 1 :</strong> "Bien que la situation soit complexe, il convient de souligner que..." (CLB 9+ target)</p>
                  <p><strong>Exemple 2 :</strong> "En définitive, cette mesure s'avère indispensable pour..."</p>
                </div>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Erreurs fréquentes à éviter</h4>
                <div className="space-y-3 mt-3">
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                    <div>L'abus de connecteurs répétitifs comme "parce que" ou "mais".</div>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                    <div>Le manque de clarté dans la liaison entre les paragraphes.</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "expressions-cles-introduire-exemples",
    title: "Les expressions clés pour introduire des exemples pertinents",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau Tous Niveaux. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "Tous Niveaux",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Tableau de référence rapide</h4>
              <div className="border border-slate-100 rounded-xl overflow-hidden text-sm">
                <div className="bg-slate-50 p-3 font-semibold border-b border-slate-100 flex justify-between">
                  <span>Élément</span>
                  <span>Usage recommandé</span>
                </div>
                <div className="p-3 border-b border-slate-100 flex justify-between">
                  <strong>Niveau B2</strong>
                  <span className="text-gray-600">Expression claire avec nuances de base</span>
                </div>
                <div className="p-3 flex justify-between">
                  <strong>Niveau C1 / C2</strong>
                  <span className="text-gray-600">Maîtrise complète avec flexibilité et style</span>
                </div>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'entraînement</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour vous approprier ces notions, lisez régulièrement des articles de presse française (Le Monde, Le Figaro) et observez comment les journalistes structurent leurs transitions.
              </p>
      
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 text-sm mb-3">📝 Mini-Quiz d'auto-évaluation</h4>
                <div className="space-y-3 text-xs">
                  <p className="font-semibold text-slate-700">Quelle tournure exprime au mieux une nuance formelle ?</p>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded border border-slate-150">A) "Mais je pense que..."</div>
                    <div className="p-2 bg-white rounded border border-slate-150 font-medium text-emerald-700">B) "Néanmoins, force est de constater que..." (Correct)</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "vocabulaire-presse-medias-information",
    title: "Vocabulaire de la presse et des médias d'information",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="bg-purple-50/50 border border-purple-200 p-4 rounded-xl">
                <h4 className="font-bold text-purple-900 text-sm mb-2">📚 Boîte à Vocabulaire clé</h4>
                <ul className="space-y-2 text-xs text-purple-950">
                  <li><strong>S'avérer :</strong> Se révéler être de façon indiscutable.</li>
                  <li><strong>Sous-tendre :</strong> Être la base de, soutenir de manière invisible.</li>
                  <li><strong>Nonobstant :</strong> Malgré (registre très soutenu).</li>
                </ul>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Fiche Stratégie d'Examen</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <p className="leading-relaxed">
                  Consacrez toujours les 2 premières minutes de votre épreuve à bâtir un schéma conceptuel. Ne rédigez pas directement : listez vos mots-clés et organisez-les selon un enchaînement logique rigoureux.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Plan d'Action Recommandé</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">1</span>
                  <div className="leading-relaxed">Sélectionner 3 expressions clés à placer obligatoirement.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">2</span>
                  <div className="leading-relaxed">Rédiger les introductions et les conclusions au brouillon.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">3</span>
                  <div className="leading-relaxed">Vérifier systématiquement les accords de verbes et d'adjectifs.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "pronoms-y-en-simplifies",
    title: "Fiche de révision : Les pronoms y et en simplifiés",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau Tous Niveaux. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "Tous Niveaux",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Tableau de référence rapide</h4>
              <div className="border border-slate-100 rounded-xl overflow-hidden text-sm">
                <div className="bg-slate-50 p-3 font-semibold border-b border-slate-100 flex justify-between">
                  <span>Élément</span>
                  <span>Usage recommandé</span>
                </div>
                <div className="p-3 border-b border-slate-100 flex justify-between">
                  <strong>Niveau B2</strong>
                  <span className="text-gray-600">Expression claire avec nuances de base</span>
                </div>
                <div className="p-3 flex justify-between">
                  <strong>Niveau C1 / C2</strong>
                  <span className="text-gray-600">Maîtrise complète avec flexibilité et style</span>
                </div>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'entraînement</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour vous approprier ces notions, lisez régulièrement des articles de presse française (Le Monde, Le Figaro) et observez comment les journalistes structurent leurs transitions.
              </p>
      
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 text-sm mb-3">📝 Mini-Quiz d'auto-évaluation</h4>
                <div className="space-y-3 text-xs">
                  <p className="font-semibold text-slate-700">Quelle tournure exprime au mieux une nuance formelle ?</p>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded border border-slate-150">A) "Mais je pense que..."</div>
                    <div className="p-2 bg-white rounded border border-slate-150 font-medium text-emerald-700">B) "Néanmoins, force est de constater que..." (Correct)</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "doubles-pronoms-le-lui-la-leur",
    title: "Les doubles pronoms (le lui, la leur) sans fautes",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Analyse approfondie du sujet</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour atteindre le niveau B2 / CLB 7+, votre argumentation doit reposer sur des concepts sociologiques ou économiques globaux plutôt que sur de simples anecdotes personnelles. L'examinateur recherche un esprit de synthèse analytique développé.
              </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Simulation / Modèle type</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm font-mono text-slate-700">
                <p className="italic">"Monsieur l'Examinateur,<br/>
                Je partage en partie ce point de vue. Néanmoins, il convient de pondérer cette affirmation..."</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Grille d'évaluation : ce que cherche l'examinateur</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                  <div><strong>Coordonner :</strong> Aisance et clarté du débit de parole.</div>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                  <div><strong>Précision :</strong> Utilisation d'un lexique très précis et varié.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "subjonctif-passe-usage",
    title: "Le subjonctif passé : quand et comment l'utiliser",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau C1-C2 / CLB 9+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "C1-C2 / CLB 9+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-purple-900 text-sm mb-1">💡 Règle d'or de l'examinateur</h4>
                <p className="text-purple-700 text-xs leading-relaxed">
                  Pour le niveau C1-C2 / CLB 9+, évitez de répéter les mêmes expressions basiques. Structurez vos idées de manière rigoureuse en utilisant un lexique varié et adapté.
                </p>
              </div>
      
              <div className="space-y-4">
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Les concepts clés</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-purple-700 block">Structure fondamentale</strong>
                    Toujours poser le cadre logique avant de développer vos arguments.
                  </li>
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-purple-700 block">Richesse lexicale</strong>
                    Intégrez des mots de liaison peu communs mais précis.
                  </li>
                </ul>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'application pratique</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2">
                  <p><strong>Exemple 1 :</strong> "Bien que la situation soit complexe, il convient de souligner que..." (CLB 9+ target)</p>
                  <p><strong>Exemple 2 :</strong> "En définitive, cette mesure s'avère indispensable pour..."</p>
                </div>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Erreurs fréquentes à éviter</h4>
                <div className="space-y-3 mt-3">
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                    <div>L'abus de connecteurs répétitifs comme "parce que" ou "mais".</div>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                    <div>Le manque de clarté dans la liaison entre les paragraphes.</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "futur-anterieur-expression-projection",
    title: "Le futur antérieur pour exprimer la projection",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Tableau de référence rapide</h4>
              <div className="border border-slate-100 rounded-xl overflow-hidden text-sm">
                <div className="bg-slate-50 p-3 font-semibold border-b border-slate-100 flex justify-between">
                  <span>Élément</span>
                  <span>Usage recommandé</span>
                </div>
                <div className="p-3 border-b border-slate-100 flex justify-between">
                  <strong>Niveau B2</strong>
                  <span className="text-gray-600">Expression claire avec nuances de base</span>
                </div>
                <div className="p-3 flex justify-between">
                  <strong>Niveau C1 / C2</strong>
                  <span className="text-gray-600">Maîtrise complète avec flexibilité et style</span>
                </div>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'entraînement</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour vous approprier ces notions, lisez régulièrement des articles de presse française (Le Monde, Le Figaro) et observez comment les journalistes structurent leurs transitions.
              </p>
      
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 text-sm mb-3">📝 Mini-Quiz d'auto-évaluation</h4>
                <div className="space-y-3 text-xs">
                  <p className="font-semibold text-slate-700">Quelle tournure exprime au mieux une nuance formelle ?</p>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded border border-slate-150">A) "Mais je pense que..."</div>
                    <div className="p-2 bg-white rounded border border-slate-150 font-medium text-emerald-700">B) "Néanmoins, force est de constater que..." (Correct)</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "conditionnel-passe-regret-reproche",
    title: "Le conditionnel passé pour exprimer le regret ou le reproche",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="bg-purple-50/50 border border-purple-200 p-4 rounded-xl">
                <h4 className="font-bold text-purple-900 text-sm mb-2">📚 Boîte à Vocabulaire clé</h4>
                <ul className="space-y-2 text-xs text-purple-950">
                  <li><strong>S'avérer :</strong> Se révéler être de façon indiscutable.</li>
                  <li><strong>Sous-tendre :</strong> Être la base de, soutenir de manière invisible.</li>
                  <li><strong>Nonobstant :</strong> Malgré (registre très soutenu).</li>
                </ul>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Fiche Stratégie d'Examen</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <p className="leading-relaxed">
                  Consacrez toujours les 2 premières minutes de votre épreuve à bâtir un schéma conceptuel. Ne rédigez pas directement : listez vos mots-clés et organisez-les selon un enchaînement logique rigoureux.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Plan d'Action Recommandé</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">1</span>
                  <div className="leading-relaxed">Sélectionner 3 expressions clés à placer obligatoirement.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">2</span>
                  <div className="leading-relaxed">Rédiger les introductions et les conclusions au brouillon.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">3</span>
                  <div className="leading-relaxed">Vérifier systématiquement les accords de verbes et d'adjectifs.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "participe-present-adjectif-verbal",
    title: "Structures avancées : Le participe présent et l'adjectif verbal",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau C1-C2 / CLB 9+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "C1-C2 / CLB 9+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Analyse approfondie du sujet</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour atteindre le niveau C1-C2 / CLB 9+, votre argumentation doit reposer sur des concepts sociologiques ou économiques globaux plutôt que sur de simples anecdotes personnelles. L'examinateur recherche un esprit de synthèse analytique développé.
              </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Simulation / Modèle type</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm font-mono text-slate-700">
                <p className="italic">"Monsieur l'Examinateur,<br/>
                Je partage en partie ce point de vue. Néanmoins, il convient de pondérer cette affirmation..."</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Grille d'évaluation : ce que cherche l'examinateur</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                  <div><strong>Coordonner :</strong> Aisance et clarté du débit de parole.</div>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                  <div><strong>Précision :</strong> Utilisation d'un lexique très précis et varié.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "expression-condition-hypothese",
    title: "L'expression de la condition et de l'hypothèse (si, au cas où...)",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-purple-900 text-sm mb-1">📌 Point important à retenir</h4>
                <p className="text-purple-700 text-xs leading-relaxed">
                  Dans la tâche de type comparaison ou synthèse, l'équilibre des parties est primordial. Consacrez un volume de rédaction similaire pour chaque point de vue.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Structure recommandée pour viser le CLB 9+</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Introduction :</strong> Présentation neutre du thème général.</p>
                <p><strong>Partie 1 :</strong> Avantages et perspectives favorables.</p>
                <p><strong>Partie 2 :</strong> Limites et objections constructives.</p>
                <p><strong>Conclusion :</strong> Bilan synthétique et prise de position personnelle.</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Modèle de réponse rédigé (Extrait)</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-700 italic">
                "En somme, s'il est indéniable que cette technologie facilite le quotidien, elle pose d'importants défis éthiques qui ne sauraient être ignorés."
              </div>
            </div>
    )
  },
  {
    id: "articulateurs-restriction-ne-que",
    title: "Les articulateurs de restriction (ne... que, seulement, uniquement)",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau Tous Niveaux. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "Tous Niveaux",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Tableau de référence rapide</h4>
              <div className="border border-slate-100 rounded-xl overflow-hidden text-sm">
                <div className="bg-slate-50 p-3 font-semibold border-b border-slate-100 flex justify-between">
                  <span>Élément</span>
                  <span>Usage recommandé</span>
                </div>
                <div className="p-3 border-b border-slate-100 flex justify-between">
                  <strong>Niveau B2</strong>
                  <span className="text-gray-600">Expression claire avec nuances de base</span>
                </div>
                <div className="p-3 flex justify-between">
                  <strong>Niveau C1 / C2</strong>
                  <span className="text-gray-600">Maîtrise complète avec flexibilité et style</span>
                </div>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'entraînement</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour vous approprier ces notions, lisez régulièrement des articles de presse française (Le Monde, Le Figaro) et observez comment les journalistes structurent leurs transitions.
              </p>
      
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 text-sm mb-3">📝 Mini-Quiz d'auto-évaluation</h4>
                <div className="space-y-3 text-xs">
                  <p className="font-semibold text-slate-700">Quelle tournure exprime au mieux une nuance formelle ?</p>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded border border-slate-150">A) "Mais je pense que..."</div>
                    <div className="p-2 bg-white rounded border border-slate-150 font-medium text-emerald-700">B) "Néanmoins, force est de constater que..." (Correct)</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "vocabulaire-urbanisme-transports-demain",
    title: "Vocabulaire de l'urbanisme et des transports de demain",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="bg-purple-50/50 border border-purple-200 p-4 rounded-xl">
                <h4 className="font-bold text-purple-900 text-sm mb-2">📚 Boîte à Vocabulaire clé</h4>
                <ul className="space-y-2 text-xs text-purple-950">
                  <li><strong>S'avérer :</strong> Se révéler être de façon indiscutable.</li>
                  <li><strong>Sous-tendre :</strong> Être la base de, soutenir de manière invisible.</li>
                  <li><strong>Nonobstant :</strong> Malgré (registre très soutenu).</li>
                </ul>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Fiche Stratégie d'Examen</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <p className="leading-relaxed">
                  Consacrez toujours les 2 premières minutes de votre épreuve à bâtir un schéma conceptuel. Ne rédigez pas directement : listez vos mots-clés et organisez-les selon un enchaînement logique rigoureux.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Plan d'Action Recommandé</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">1</span>
                  <div className="leading-relaxed">Sélectionner 3 expressions clés à placer obligatoirement.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">2</span>
                  <div className="leading-relaxed">Rédiger les introductions et les conclusions au brouillon.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">3</span>
                  <div className="leading-relaxed">Vérifier systématiquement les accords de verbes et d'adjectifs.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "lexique-economie-marche-emploi-canada",
    title: "Lexique de l'économie et du marché de l'emploi canadien",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau C1-C2 / CLB 9+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "C1-C2 / CLB 9+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-purple-900 text-sm mb-1">💡 Règle d'or de l'examinateur</h4>
                <p className="text-purple-700 text-xs leading-relaxed">
                  Pour le niveau C1-C2 / CLB 9+, évitez de répéter les mêmes expressions basiques. Structurez vos idées de manière rigoureuse en utilisant un lexique varié et adapté.
                </p>
              </div>
      
              <div className="space-y-4">
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Les concepts clés</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-purple-700 block">Structure fondamentale</strong>
                    Toujours poser le cadre logique avant de développer vos arguments.
                  </li>
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-purple-700 block">Richesse lexicale</strong>
                    Intégrez des mots de liaison peu communs mais précis.
                  </li>
                </ul>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'application pratique</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2">
                  <p><strong>Exemple 1 :</strong> "Bien que la situation soit complexe, il convient de souligner que..." (CLB 9+ target)</p>
                  <p><strong>Exemple 2 :</strong> "En définitive, cette mesure s'avère indispensable pour..."</p>
                </div>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Erreurs fréquentes à éviter</h4>
                <div className="space-y-3 mt-3">
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                    <div>L'abus de connecteurs répétitifs comme "parce que" ou "mais".</div>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                    <div>Le manque de clarté dans la liaison entre les paragraphes.</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "exprimer-surprise-indignation-enthousiasme",
    title: "Comment exprimer la surprise, l'indignation et l'enthousiasme à l'oral",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Analyse approfondie du sujet</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour atteindre le niveau B2 / CLB 7+, votre argumentation doit reposer sur des concepts sociologiques ou économiques globaux plutôt que sur de simples anecdotes personnelles. L'examinateur recherche un esprit de synthèse analytique développé.
              </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Simulation / Modèle type</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm font-mono text-slate-700">
                <p className="italic">"Monsieur l'Examinateur,<br/>
                Je partage en partie ce point de vue. Néanmoins, il convient de pondérer cette affirmation..."</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Grille d'évaluation : ce que cherche l'examinateur</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                  <div><strong>Coordonner :</strong> Aisance et clarté du débit de parole.</div>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                  <div><strong>Précision :</strong> Utilisation d'un lexique très précis et varié.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "formules-politesse-fin-lettre-courriel",
    title: "Les formules de politesse de fin de lettre (Tâche 1 & 2 Écrite)",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau Tous Niveaux. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "Tous Niveaux",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-purple-900 text-sm mb-1">📌 Point important à retenir</h4>
                <p className="text-purple-700 text-xs leading-relaxed">
                  Dans la tâche de type comparaison ou synthèse, l'équilibre des parties est primordial. Consacrez un volume de rédaction similaire pour chaque point de vue.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Structure recommandée pour viser le CLB 9+</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Introduction :</strong> Présentation neutre du thème général.</p>
                <p><strong>Partie 1 :</strong> Avantages et perspectives favorables.</p>
                <p><strong>Partie 2 :</strong> Limites et objections constructives.</p>
                <p><strong>Conclusion :</strong> Bilan synthétique et prise de position personnelle.</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Modèle de réponse rédigé (Extrait)</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-700 italic">
                "En somme, s'il est indéniable que cette technologie facilite le quotidien, elle pose d'importants défis éthiques qui ne sauraient être ignorés."
              </div>
            </div>
    )
  },
  {
    id: "vocabulaire-culture-arts-patrimoine",
    title: "Le vocabulaire de la culture, des arts et du patrimoine",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="bg-purple-50/50 border border-purple-200 p-4 rounded-xl">
                <h4 className="font-bold text-purple-900 text-sm mb-2">📚 Boîte à Vocabulaire clé</h4>
                <ul className="space-y-2 text-xs text-purple-950">
                  <li><strong>S'avérer :</strong> Se révéler être de façon indiscutable.</li>
                  <li><strong>Sous-tendre :</strong> Être la base de, soutenir de manière invisible.</li>
                  <li><strong>Nonobstant :</strong> Malgré (registre très soutenu).</li>
                </ul>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Fiche Stratégie d'Examen</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <p className="leading-relaxed">
                  Consacrez toujours les 2 premières minutes de votre épreuve à bâtir un schéma conceptuel. Ne rédigez pas directement : listez vos mots-clés et organisez-les selon un enchaînement logique rigoureux.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Plan d'Action Recommandé</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">1</span>
                  <div className="leading-relaxed">Sélectionner 3 expressions clés à placer obligatoirement.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">2</span>
                  <div className="leading-relaxed">Rédiger les introductions et les conclusions au brouillon.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">3</span>
                  <div className="leading-relaxed">Vérifier systématiquement les accords de verbes et d'adjectifs.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "introduire-objection-diplomatie",
    title: "Comment introduire une objection de manière diplomatique",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau C1-C2 / CLB 9+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "C1-C2 / CLB 9+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Analyse approfondie du sujet</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour atteindre le niveau C1-C2 / CLB 9+, votre argumentation doit reposer sur des concepts sociologiques ou économiques globaux plutôt que sur de simples anecdotes personnelles. L'examinateur recherche un esprit de synthèse analytique développé.
              </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Simulation / Modèle type</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm font-mono text-slate-700">
                <p className="italic">"Monsieur l'Examinateur,<br/>
                Je partage en partie ce point de vue. Néanmoins, il convient de pondérer cette affirmation..."</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Grille d'évaluation : ce que cherche l'examinateur</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                  <div><strong>Coordonner :</strong> Aisance et clarté du débit de parole.</div>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                  <div><strong>Précision :</strong> Utilisation d'un lexique très précis et varié.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "transitions-logiques-entre-paragraphes",
    title: "Fiche mémo : Réussir les transitions logiques entre vos paragraphes",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-purple-900 text-sm mb-1">📌 Point important à retenir</h4>
                <p className="text-purple-700 text-xs leading-relaxed">
                  Dans la tâche de type comparaison ou synthèse, l'équilibre des parties est primordial. Consacrez un volume de rédaction similaire pour chaque point de vue.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Structure recommandée pour viser le CLB 9+</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Introduction :</strong> Présentation neutre du thème général.</p>
                <p><strong>Partie 1 :</strong> Avantages et perspectives favorables.</p>
                <p><strong>Partie 2 :</strong> Limites et objections constructives.</p>
                <p><strong>Conclusion :</strong> Bilan synthétique et prise de position personnelle.</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Modèle de réponse rédigé (Extrait)</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-700 italic">
                "En somme, s'il est indéniable que cette technologie facilite le quotidien, elle pose d'importants défis éthiques qui ne sauraient être ignorés."
              </div>
            </div>
    )
  },
  {
    id: "pieges-faux-amis-francais-avance",
    title: "Les pièges des faux-amis en français de niveau avancé",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau C1-C2 / CLB 9+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "C1-C2 / CLB 9+",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-purple-900 text-sm mb-1">💡 Règle d'or de l'examinateur</h4>
                <p className="text-purple-700 text-xs leading-relaxed">
                  Pour le niveau C1-C2 / CLB 9+, évitez de répéter les mêmes expressions basiques. Structurez vos idées de manière rigoureuse en utilisant un lexique varié et adapté.
                </p>
              </div>
      
              <div className="space-y-4">
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Les concepts clés</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-purple-700 block">Structure fondamentale</strong>
                    Toujours poser le cadre logique avant de développer vos arguments.
                  </li>
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-purple-700 block">Richesse lexicale</strong>
                    Intégrez des mots de liaison peu communs mais précis.
                  </li>
                </ul>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'application pratique</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2">
                  <p><strong>Exemple 1 :</strong> "Bien que la situation soit complexe, il convient de souligner que..." (CLB 9+ target)</p>
                  <p><strong>Exemple 2 :</strong> "En définitive, cette mesure s'avère indispensable pour..."</p>
                </div>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Erreurs fréquentes à éviter</h4>
                <div className="space-y-3 mt-3">
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                    <div>L'abus de connecteurs répétitifs comme "parce que" ou "mais".</div>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                    <div>Le manque de clarté dans la liaison entre les paragraphes.</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "passe-compose-vs-imparfait-regle-definitive",
    title: "Passé composé vs imparfait : la règle définitive",
    excerpt: "Maîtrisez les clés de l'épreuve de Grammaire pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Grammaire",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#d97706",
    bgColor: "hsl(45, 100%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Grammaire</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-amber-500 bg-amber-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-amber-900 text-sm mb-1">📌 Point important à retenir</h4>
                <p className="text-amber-700 text-xs leading-relaxed">
                  Dans la tâche de type comparaison ou synthèse, l'équilibre des parties est primordial. Consacrez un volume de rédaction similaire pour chaque point de vue.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Structure recommandée pour viser le CLB 9+</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Introduction :</strong> Présentation neutre du thème général.</p>
                <p><strong>Partie 1 :</strong> Avantages et perspectives favorables.</p>
                <p><strong>Partie 2 :</strong> Limites et objections constructives.</p>
                <p><strong>Conclusion :</strong> Bilan synthétique et prise de position personnelle.</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Modèle de réponse rédigé (Extrait)</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-700 italic">
                "En somme, s'il est indéniable que cette technologie facilite le quotidien, elle pose d'importants défis éthiques qui ne sauraient être ignorés."
              </div>
            </div>
    )
  },
  {
    id: "subjonctif-present-conjugaison-declencheurs",
    title: "Le subjonctif présent : conjugaison et déclencheurs fréquents",
    excerpt: "Maîtrisez les clés de l'épreuve de Grammaire pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Grammaire",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#d97706",
    bgColor: "hsl(45, 100%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Grammaire</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-amber-500 bg-amber-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-amber-900 text-sm mb-1">💡 Règle d'or de l'examinateur</h4>
                <p className="text-amber-700 text-xs leading-relaxed">
                  Pour le niveau B2 / CLB 7+, évitez de répéter les mêmes expressions basiques. Structurez vos idées de manière rigoureuse en utilisant un lexique varié et adapté.
                </p>
              </div>
      
              <div className="space-y-4">
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Les concepts clés</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-amber-700 block">Structure fondamentale</strong>
                    Toujours poser le cadre logique avant de développer vos arguments.
                  </li>
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-amber-700 block">Richesse lexicale</strong>
                    Intégrez des mots de liaison peu communs mais précis.
                  </li>
                </ul>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'application pratique</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2">
                  <p><strong>Exemple 1 :</strong> "Bien que la situation soit complexe, il convient de souligner que..." (CLB 9+ target)</p>
                  <p><strong>Exemple 2 :</strong> "En définitive, cette mesure s'avère indispensable pour..."</p>
                </div>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Erreurs fréquentes à éviter</h4>
                <div className="space-y-3 mt-3">
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
                    <div>L'abus de connecteurs répétitifs comme "parce que" ou "mais".</div>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
                    <div>Le manque de clarté dans la liaison entre les paragraphes.</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "pronoms-relatifs-simples-maitrise",
    title: "Les pronoms relatifs simples (qui, que, où, dont) maîtrisés",
    excerpt: "Maîtrisez les clés de l'épreuve de Grammaire pour le niveau Tous Niveaux. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Grammaire",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "Tous Niveaux",
    badgeColor: "#d97706",
    bgColor: "hsl(45, 100%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Grammaire</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Tableau de référence rapide</h4>
              <div className="border border-slate-100 rounded-xl overflow-hidden text-sm">
                <div className="bg-slate-50 p-3 font-semibold border-b border-slate-100 flex justify-between">
                  <span>Élément</span>
                  <span>Usage recommandé</span>
                </div>
                <div className="p-3 border-b border-slate-100 flex justify-between">
                  <strong>Niveau B2</strong>
                  <span className="text-gray-600">Expression claire avec nuances de base</span>
                </div>
                <div className="p-3 flex justify-between">
                  <strong>Niveau C1 / C2</strong>
                  <span className="text-gray-600">Maîtrise complète avec flexibilité et style</span>
                </div>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'entraînement</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour vous approprier ces notions, lisez régulièrement des articles de presse française (Le Monde, Le Figaro) et observez comment les journalistes structurent leurs transitions.
              </p>
      
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 text-sm mb-3">📝 Mini-Quiz d'auto-évaluation</h4>
                <div className="space-y-3 text-xs">
                  <p className="font-semibold text-slate-700">Quelle tournure exprime au mieux une nuance formelle ?</p>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded border border-slate-150">A) "Mais je pense que..."</div>
                    <div className="p-2 bg-white rounded border border-slate-150 font-medium text-emerald-700">B) "Néanmoins, force est de constater que..." (Correct)</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "pronoms-relatifs-composes-lesquels",
    title: "Les pronoms relatifs composés (lequel, auquel, duquel) simplifiés",
    excerpt: "Maîtrisez les clés de l'épreuve de Grammaire pour le niveau C1-C2 / CLB 9+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Grammaire",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "C1-C2 / CLB 9+",
    badgeColor: "#d97706",
    bgColor: "hsl(45, 100%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Grammaire</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Analyse approfondie du sujet</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour atteindre le niveau C1-C2 / CLB 9+, votre argumentation doit reposer sur des concepts sociologiques ou économiques globaux plutôt que sur de simples anecdotes personnelles. L'examinateur recherche un esprit de synthèse analytique développé.
              </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Simulation / Modèle type</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm font-mono text-slate-700">
                <p className="italic">"Monsieur l'Examinateur,<br/>
                Je partage en partie ce point de vue. Néanmoins, il convient de pondérer cette affirmation..."</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Grille d'évaluation : ce que cherche l'examinateur</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
                  <div><strong>Coordonner :</strong> Aisance et clarté du débit de parole.</div>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
                  <div><strong>Précision :</strong> Utilisation d'un lexique très précis et varié.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "accord-participe-passe-auxiliaire-avoir",
    title: "L'accord du participe passé avec l'auxiliaire avoir : règles et pièges",
    excerpt: "Maîtrisez les clés de l'épreuve de Grammaire pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Grammaire",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#d97706",
    bgColor: "hsl(45, 100%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Grammaire</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-amber-500 bg-amber-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-amber-900 text-sm mb-1">📌 Point important à retenir</h4>
                <p className="text-amber-700 text-xs leading-relaxed">
                  Dans la tâche de type comparaison ou synthèse, l'équilibre des parties est primordial. Consacrez un volume de rédaction similaire pour chaque point de vue.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Structure recommandée pour viser le CLB 9+</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Introduction :</strong> Présentation neutre du thème général.</p>
                <p><strong>Partie 1 :</strong> Avantages et perspectives favorables.</p>
                <p><strong>Partie 2 :</strong> Limites et objections constructives.</p>
                <p><strong>Conclusion :</strong> Bilan synthétique et prise de position personnelle.</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Modèle de réponse rédigé (Extrait)</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-700 italic">
                "En somme, s'il est indéniable que cette technologie facilite le quotidien, elle pose d'importants défis éthiques qui ne sauraient être ignorés."
              </div>
            </div>
    )
  },
  {
    id: "subjonctif-vs-indicatif-verbes-opinion",
    title: "Le subjonctif vs l'indicatif après les verbes d'opinion",
    excerpt: "Maîtrisez les clés de l'épreuve de Grammaire pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Grammaire",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#d97706",
    bgColor: "hsl(45, 100%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Grammaire</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="bg-amber-50/50 border border-amber-200 p-4 rounded-xl">
                <h4 className="font-bold text-amber-900 text-sm mb-2">📚 Boîte à Vocabulaire clé</h4>
                <ul className="space-y-2 text-xs text-amber-950">
                  <li><strong>S'avérer :</strong> Se révéler être de façon indiscutable.</li>
                  <li><strong>Sous-tendre :</strong> Être la base de, soutenir de manière invisible.</li>
                  <li><strong>Nonobstant :</strong> Malgré (registre très soutenu).</li>
                </ul>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Fiche Stratégie d'Examen</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <p className="leading-relaxed">
                  Consacrez toujours les 2 premières minutes de votre épreuve à bâtir un schéma conceptuel. Ne rédigez pas directement : listez vos mots-clés et organisez-les selon un enchaînement logique rigoureux.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Plan d'Action Recommandé</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">1</span>
                  <div className="leading-relaxed">Sélectionner 3 expressions clés à placer obligatoirement.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">2</span>
                  <div className="leading-relaxed">Rédiger les introductions et les conclusions au brouillon.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">3</span>
                  <div className="leading-relaxed">Vérifier systématiquement les accords de verbes et d'adjectifs.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "concordance-temps-discours-indirect",
    title: "La concordance des temps dans le discours indirect",
    excerpt: "Maîtrisez les clés de l'épreuve de Grammaire pour le niveau C1-C2 / CLB 9+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Grammaire",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "C1-C2 / CLB 9+",
    badgeColor: "#d97706",
    bgColor: "hsl(45, 100%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Grammaire</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Analyse approfondie du sujet</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour atteindre le niveau C1-C2 / CLB 9+, votre argumentation doit reposer sur des concepts sociologiques ou économiques globaux plutôt que sur de simples anecdotes personnelles. L'examinateur recherche un esprit de synthèse analytique développé.
              </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Simulation / Modèle type</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm font-mono text-slate-700">
                <p className="italic">"Monsieur l'Examinateur,<br/>
                Je partage en partie ce point de vue. Néanmoins, il convient de pondérer cette affirmation..."</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Grille d'évaluation : ce que cherche l'examinateur</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
                  <div><strong>Coordonner :</strong> Aisance et clarté du débit de parole.</div>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
                  <div><strong>Précision :</strong> Utilisation d'un lexique très précis et varié.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "futur-simple-vs-futur-proche-nuances",
    title: "Le futur simple vs le futur proche : nuances et usages",
    excerpt: "Maîtrisez les clés de l'épreuve de Grammaire pour le niveau Tous Niveaux. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Grammaire",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "Tous Niveaux",
    badgeColor: "#d97706",
    bgColor: "hsl(45, 100%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Grammaire</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Tableau de référence rapide</h4>
              <div className="border border-slate-100 rounded-xl overflow-hidden text-sm">
                <div className="bg-slate-50 p-3 font-semibold border-b border-slate-100 flex justify-between">
                  <span>Élément</span>
                  <span>Usage recommandé</span>
                </div>
                <div className="p-3 border-b border-slate-100 flex justify-between">
                  <strong>Niveau B2</strong>
                  <span className="text-gray-600">Expression claire avec nuances de base</span>
                </div>
                <div className="p-3 flex justify-between">
                  <strong>Niveau C1 / C2</strong>
                  <span className="text-gray-600">Maîtrise complète avec flexibilité et style</span>
                </div>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'entraînement</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour vous approprier ces notions, lisez régulièrement des articles de presse française (Le Monde, Le Figaro) et observez comment les journalistes structurent leurs transitions.
              </p>
      
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 text-sm mb-3">📝 Mini-Quiz d'auto-évaluation</h4>
                <div className="space-y-3 text-xs">
                  <p className="font-semibold text-slate-700">Quelle tournure exprime au mieux une nuance formelle ?</p>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded border border-slate-150">A) "Mais je pense que..."</div>
                    <div className="p-2 bg-white rounded border border-slate-150 font-medium text-emerald-700">B) "Néanmoins, force est de constater que..." (Correct)</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "conditionnel-present-politesse-conseil-hypothese",
    title: "Le conditionnel présent : politesse, conseil et hypothèse",
    excerpt: "Maîtrisez les clés de l'épreuve de Grammaire pour le niveau Tous Niveaux. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Grammaire",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "Tous Niveaux",
    badgeColor: "#d97706",
    bgColor: "hsl(45, 100%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Grammaire</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-amber-500 bg-amber-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-amber-900 text-sm mb-1">💡 Règle d'or de l'examinateur</h4>
                <p className="text-amber-700 text-xs leading-relaxed">
                  Pour le niveau Tous Niveaux, évitez de répéter les mêmes expressions basiques. Structurez vos idées de manière rigoureuse en utilisant un lexique varié et adapté.
                </p>
              </div>
      
              <div className="space-y-4">
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Les concepts clés</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-amber-700 block">Structure fondamentale</strong>
                    Toujours poser le cadre logique avant de développer vos arguments.
                  </li>
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-amber-700 block">Richesse lexicale</strong>
                    Intégrez des mots de liaison peu communs mais précis.
                  </li>
                </ul>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'application pratique</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2">
                  <p><strong>Exemple 1 :</strong> "Bien que la situation soit complexe, il convient de souligner que..." (CLB 9+ target)</p>
                  <p><strong>Exemple 2 :</strong> "En définitive, cette mesure s'avère indispensable pour..."</p>
                </div>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Erreurs fréquentes à éviter</h4>
                <div className="space-y-3 mt-3">
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
                    <div>L'abus de connecteurs répétitifs comme "parce que" ou "mais".</div>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
                    <div>Le manque de clarté dans la liaison entre les paragraphes.</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "negation-complexe-plus-jamais-guere",
    title: "La négation complexe (ne... plus, ne... jamais, ne... guère)",
    excerpt: "Maîtrisez les clés de l'épreuve de Grammaire pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Grammaire",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#d97706",
    bgColor: "hsl(45, 100%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Grammaire</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Tableau de référence rapide</h4>
              <div className="border border-slate-100 rounded-xl overflow-hidden text-sm">
                <div className="bg-slate-50 p-3 font-semibold border-b border-slate-100 flex justify-between">
                  <span>Élément</span>
                  <span>Usage recommandé</span>
                </div>
                <div className="p-3 border-b border-slate-100 flex justify-between">
                  <strong>Niveau B2</strong>
                  <span className="text-gray-600">Expression claire avec nuances de base</span>
                </div>
                <div className="p-3 flex justify-between">
                  <strong>Niveau C1 / C2</strong>
                  <span className="text-gray-600">Maîtrise complète avec flexibilité et style</span>
                </div>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'entraînement</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour vous approprier ces notions, lisez régulièrement des articles de presse française (Le Monde, Le Figaro) et observez comment les journalistes structurent leurs transitions.
              </p>
      
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 text-sm mb-3">📝 Mini-Quiz d'auto-évaluation</h4>
                <div className="space-y-3 text-xs">
                  <p className="font-semibold text-slate-700">Quelle tournure exprime au mieux une nuance formelle ?</p>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded border border-slate-150">A) "Mais je pense que..."</div>
                    <div className="p-2 bg-white rounded border border-slate-150 font-medium text-emerald-700">B) "Néanmoins, force est de constater que..." (Correct)</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "adverbes-en-ment-formation-place",
    title: "Les adverbes en -ment : formation et place dans la phrase",
    excerpt: "Maîtrisez les clés de l'épreuve de Grammaire pour le niveau Tous Niveaux. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Grammaire",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "Tous Niveaux",
    badgeColor: "#d97706",
    bgColor: "hsl(45, 100%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Grammaire</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="bg-amber-50/50 border border-amber-200 p-4 rounded-xl">
                <h4 className="font-bold text-amber-900 text-sm mb-2">📚 Boîte à Vocabulaire clé</h4>
                <ul className="space-y-2 text-xs text-amber-950">
                  <li><strong>S'avérer :</strong> Se révéler être de façon indiscutable.</li>
                  <li><strong>Sous-tendre :</strong> Être la base de, soutenir de manière invisible.</li>
                  <li><strong>Nonobstant :</strong> Malgré (registre très soutenu).</li>
                </ul>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Fiche Stratégie d'Examen</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <p className="leading-relaxed">
                  Consacrez toujours les 2 premières minutes de votre épreuve à bâtir un schéma conceptuel. Ne rédigez pas directement : listez vos mots-clés et organisez-les selon un enchaînement logique rigoureux.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Plan d'Action Recommandé</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">1</span>
                  <div className="leading-relaxed">Sélectionner 3 expressions clés à placer obligatoirement.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">2</span>
                  <div className="leading-relaxed">Rédiger les introductions et les conclusions au brouillon.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">3</span>
                  <div className="leading-relaxed">Vérifier systématiquement les accords de verbes et d'adjectifs.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "expression-cause-structures-utiles",
    title: "L'expression de la cause : de 'parce que' à 'en raison de'",
    excerpt: "Maîtrisez les clés de l'épreuve de Grammaire pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Grammaire",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#d97706",
    bgColor: "hsl(45, 100%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Grammaire</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-amber-500 bg-amber-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-amber-900 text-sm mb-1">📌 Point important à retenir</h4>
                <p className="text-amber-700 text-xs leading-relaxed">
                  Dans la tâche de type comparaison ou synthèse, l'équilibre des parties est primordial. Consacrez un volume de rédaction similaire pour chaque point de vue.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Structure recommandée pour viser le CLB 9+</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Introduction :</strong> Présentation neutre du thème général.</p>
                <p><strong>Partie 1 :</strong> Avantages et perspectives favorables.</p>
                <p><strong>Partie 2 :</strong> Limites et objections constructives.</p>
                <p><strong>Conclusion :</strong> Bilan synthétique et prise de position personnelle.</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Modèle de réponse rédigé (Extrait)</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-700 italic">
                "En somme, s'il est indéniable que cette technologie facilite le quotidien, elle pose d'importants défis éthiques qui ne sauraient être ignorés."
              </div>
            </div>
    )
  },
  {
    id: "expression-but-pour-que-afin-de",
    title: "L'expression du but : pour que, afin de, dans le but de",
    excerpt: "Maîtrisez les clés de l'épreuve de Grammaire pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Grammaire",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#d97706",
    bgColor: "hsl(45, 100%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Grammaire</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="bg-amber-50/50 border border-amber-200 p-4 rounded-xl">
                <h4 className="font-bold text-amber-900 text-sm mb-2">📚 Boîte à Vocabulaire clé</h4>
                <ul className="space-y-2 text-xs text-amber-950">
                  <li><strong>S'avérer :</strong> Se révéler être de façon indiscutable.</li>
                  <li><strong>Sous-tendre :</strong> Être la base de, soutenir de manière invisible.</li>
                  <li><strong>Nonobstant :</strong> Malgré (registre très soutenu).</li>
                </ul>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Fiche Stratégie d'Examen</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <p className="leading-relaxed">
                  Consacrez toujours les 2 premières minutes de votre épreuve à bâtir un schéma conceptuel. Ne rédigez pas directement : listez vos mots-clés et organisez-les selon un enchaînement logique rigoureux.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Plan d'Action Recommandé</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">1</span>
                  <div className="leading-relaxed">Sélectionner 3 expressions clés à placer obligatoirement.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">2</span>
                  <div className="leading-relaxed">Rédiger les introductions et les conclusions au brouillon.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">3</span>
                  <div className="leading-relaxed">Vérifier systématiquement les accords de verbes et d'adjectifs.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "opposition-concession-mais-pourtant-bien-que",
    title: "L'expression de l'opposition et de la concession : mais, pourtant, bien que",
    excerpt: "Maîtrisez les clés de l'épreuve de Grammaire pour le niveau C1-C2 / CLB 9+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Grammaire",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "C1-C2 / CLB 9+",
    badgeColor: "#d97706",
    bgColor: "hsl(45, 100%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Grammaire</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-amber-500 bg-amber-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-amber-900 text-sm mb-1">💡 Règle d'or de l'examinateur</h4>
                <p className="text-amber-700 text-xs leading-relaxed">
                  Pour le niveau C1-C2 / CLB 9+, évitez de répéter les mêmes expressions basiques. Structurez vos idées de manière rigoureuse en utilisant un lexique varié et adapté.
                </p>
              </div>
      
              <div className="space-y-4">
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Les concepts clés</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-amber-700 block">Structure fondamentale</strong>
                    Toujours poser le cadre logique avant de développer vos arguments.
                  </li>
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-amber-700 block">Richesse lexicale</strong>
                    Intégrez des mots de liaison peu communs mais précis.
                  </li>
                </ul>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'application pratique</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2">
                  <p><strong>Exemple 1 :</strong> "Bien que la situation soit complexe, il convient de souligner que..." (CLB 9+ target)</p>
                  <p><strong>Exemple 2 :</strong> "En définitive, cette mesure s'avère indispensable pour..."</p>
                </div>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Erreurs fréquentes à éviter</h4>
                <div className="space-y-3 mt-3">
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
                    <div>L'abus de connecteurs répétitifs comme "parce que" ou "mais".</div>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
                    <div>Le manque de clarté dans la liaison entre les paragraphes.</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "voix-passive-structure-interet",
    title: "La voix passive : structure, intérêt et écriture journalistique",
    excerpt: "Maîtrisez les clés de l'épreuve de Grammaire pour le niveau C1-C2 / CLB 9+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Grammaire",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "C1-C2 / CLB 9+",
    badgeColor: "#d97706",
    bgColor: "hsl(45, 100%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Grammaire</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Analyse approfondie du sujet</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour atteindre le niveau C1-C2 / CLB 9+, votre argumentation doit reposer sur des concepts sociologiques ou économiques globaux plutôt que sur de simples anecdotes personnelles. L'examinateur recherche un esprit de synthèse analytique développé.
              </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Simulation / Modèle type</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm font-mono text-slate-700">
                <p className="italic">"Monsieur l'Examinateur,<br/>
                Je partage en partie ce point de vue. Néanmoins, il convient de pondérer cette affirmation..."</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Grille d'évaluation : ce que cherche l'examinateur</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
                  <div><strong>Coordonner :</strong> Aisance et clarté du débit de parole.</div>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
                  <div><strong>Précision :</strong> Utilisation d'un lexique très précis et varié.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "verbes-pronominaux-accord-participe-passe",
    title: "Les verbes pronominaux et l'accord de leur participe passé",
    excerpt: "Maîtrisez les clés de l'épreuve de Grammaire pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Grammaire",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#d97706",
    bgColor: "hsl(45, 100%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Grammaire</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-amber-500 bg-amber-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-amber-900 text-sm mb-1">📌 Point important à retenir</h4>
                <p className="text-amber-700 text-xs leading-relaxed">
                  Dans la tâche de type comparaison ou synthèse, l'équilibre des parties est primordial. Consacrez un volume de rédaction similaire pour chaque point de vue.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Structure recommandée pour viser le CLB 9+</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Introduction :</strong> Présentation neutre du thème général.</p>
                <p><strong>Partie 1 :</strong> Avantages et perspectives favorables.</p>
                <p><strong>Partie 2 :</strong> Limites et objections constructives.</p>
                <p><strong>Conclusion :</strong> Bilan synthétique et prise de position personnelle.</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Modèle de réponse rédigé (Extrait)</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-700 italic">
                "En somme, s'il est indéniable que cette technologie facilite le quotidien, elle pose d'importants défis éthiques qui ne sauraient être ignorés."
              </div>
            </div>
    )
  },
  {
    id: "pluriel-noms-composes-adjectifs-couleur",
    title: "Le pluriel des noms composés et des adjectifs de couleur",
    excerpt: "Maîtrisez les clés de l'épreuve de Grammaire pour le niveau C1-C2 / CLB 9+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Grammaire",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "C1-C2 / CLB 9+",
    badgeColor: "#d97706",
    bgColor: "hsl(45, 100%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Grammaire</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="bg-amber-50/50 border border-amber-200 p-4 rounded-xl">
                <h4 className="font-bold text-amber-900 text-sm mb-2">📚 Boîte à Vocabulaire clé</h4>
                <ul className="space-y-2 text-xs text-amber-950">
                  <li><strong>S'avérer :</strong> Se révéler être de façon indiscutable.</li>
                  <li><strong>Sous-tendre :</strong> Être la base de, soutenir de manière invisible.</li>
                  <li><strong>Nonobstant :</strong> Malgré (registre très soutenu).</li>
                </ul>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Fiche Stratégie d'Examen</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <p className="leading-relaxed">
                  Consacrez toujours les 2 premières minutes de votre épreuve à bâtir un schéma conceptuel. Ne rédigez pas directement : listez vos mots-clés et organisez-les selon un enchaînement logique rigoureux.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Plan d'Action Recommandé</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">1</span>
                  <div className="leading-relaxed">Sélectionner 3 expressions clés à placer obligatoirement.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">2</span>
                  <div className="leading-relaxed">Rédiger les introductions et les conclusions au brouillon.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">3</span>
                  <div className="leading-relaxed">Vérifier systématiquement les accords de verbes et d'adjectifs.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "infinitif-passe-expression-anteriorite",
    title: "L'infinitif passé pour exprimer l'antériorité",
    excerpt: "Maîtrisez les clés de l'épreuve de Grammaire pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Grammaire",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#d97706",
    bgColor: "hsl(45, 100%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Grammaire</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-amber-500 bg-amber-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-amber-900 text-sm mb-1">💡 Règle d'or de l'examinateur</h4>
                <p className="text-amber-700 text-xs leading-relaxed">
                  Pour le niveau B2 / CLB 7+, évitez de répéter les mêmes expressions basiques. Structurez vos idées de manière rigoureuse en utilisant un lexique varié et adapté.
                </p>
              </div>
      
              <div className="space-y-4">
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Les concepts clés</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-amber-700 block">Structure fondamentale</strong>
                    Toujours poser le cadre logique avant de développer vos arguments.
                  </li>
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-amber-700 block">Richesse lexicale</strong>
                    Intégrez des mots de liaison peu communs mais précis.
                  </li>
                </ul>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'application pratique</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2">
                  <p><strong>Exemple 1 :</strong> "Bien que la situation soit complexe, il convient de souligner que..." (CLB 9+ target)</p>
                  <p><strong>Exemple 2 :</strong> "En définitive, cette mesure s'avère indispensable pour..."</p>
                </div>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Erreurs fréquentes à éviter</h4>
                <div className="space-y-3 mt-3">
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
                    <div>L'abus de connecteurs répétitifs comme "parce que" ou "mais".</div>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
                    <div>Le manque de clarté dans la liaison entre les paragraphes.</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "subjonctif-imparfait-valeur-litteraire",
    title: "Le subjonctif imparfait : comprendre sa valeur dans la littérature",
    excerpt: "Maîtrisez les clés de l'épreuve de Grammaire pour le niveau C1-C2 / CLB 9+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Grammaire",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "C1-C2 / CLB 9+",
    badgeColor: "#d97706",
    bgColor: "hsl(45, 100%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Grammaire</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Analyse approfondie du sujet</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour atteindre le niveau C1-C2 / CLB 9+, votre argumentation doit reposer sur des concepts sociologiques ou économiques globaux plutôt que sur de simples anecdotes personnelles. L'examinateur recherche un esprit de synthèse analytique développé.
              </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Simulation / Modèle type</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm font-mono text-slate-700">
                <p className="italic">"Monsieur l'Examinateur,<br/>
                Je partage en partie ce point de vue. Néanmoins, il convient de pondérer cette affirmation..."</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Grille d'évaluation : ce que cherche l'examinateur</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
                  <div><strong>Coordonner :</strong> Aisance et clarté du débit de parole.</div>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
                  <div><strong>Précision :</strong> Utilisation d'un lexique très précis et varié.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "reussir-tache-1-lettre-invitation-amicale",
    title: "Réussir la Tâche 1 : Rédiger une lettre d'invitation amicale",
    excerpt: "Maîtrisez les clés de l'épreuve de Expression Écrite pour le niveau Tous Niveaux. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Expression Écrite",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "Tous Niveaux",
    badgeColor: "#10b981",
    bgColor: "hsl(149, 80%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Expression Écrite</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-emerald-500 bg-emerald-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-emerald-900 text-sm mb-1">📌 Point important à retenir</h4>
                <p className="text-emerald-700 text-xs leading-relaxed">
                  Dans la tâche de type comparaison ou synthèse, l'équilibre des parties est primordial. Consacrez un volume de rédaction similaire pour chaque point de vue.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Structure recommandée pour viser le CLB 9+</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Introduction :</strong> Présentation neutre du thème général.</p>
                <p><strong>Partie 1 :</strong> Avantages et perspectives favorables.</p>
                <p><strong>Partie 2 :</strong> Limites et objections constructives.</p>
                <p><strong>Conclusion :</strong> Bilan synthétique et prise de position personnelle.</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Modèle de réponse rédigé (Extrait)</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-700 italic">
                "En somme, s'il est indéniable que cette technologie facilite le quotidien, elle pose d'importants défis éthiques qui ne sauraient être ignorés."
              </div>
            </div>
    )
  },
  {
    id: "reussir-tache-1-demande-informations-formelle",
    title: "Réussir la Tâche 1 : Rédiger une demande d'informations formelle",
    excerpt: "Maîtrisez les clés de l'épreuve de Expression Écrite pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Expression Écrite",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#10b981",
    bgColor: "hsl(149, 80%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Expression Écrite</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-emerald-500 bg-emerald-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-emerald-900 text-sm mb-1">📌 Point important à retenir</h4>
                <p className="text-emerald-700 text-xs leading-relaxed">
                  Dans la tâche de type comparaison ou synthèse, l'équilibre des parties est primordial. Consacrez un volume de rédaction similaire pour chaque point de vue.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Structure recommandée pour viser le CLB 9+</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Introduction :</strong> Présentation neutre du thème général.</p>
                <p><strong>Partie 1 :</strong> Avantages et perspectives favorables.</p>
                <p><strong>Partie 2 :</strong> Limites et objections constructives.</p>
                <p><strong>Conclusion :</strong> Bilan synthétique et prise de position personnelle.</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Modèle de réponse rédigé (Extrait)</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-700 italic">
                "En somme, s'il est indéniable que cette technologie facilite le quotidien, elle pose d'importants défis éthiques qui ne sauraient être ignorés."
              </div>
            </div>
    )
  },
  {
    id: "reussir-tache-1-courriel-excuses-desistement",
    title: "Réussir la Tâche 1 : Rédiger un courriel d'excuses ou de désistement",
    excerpt: "Maîtrisez les clés de l'épreuve de Expression Écrite pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Expression Écrite",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#10b981",
    bgColor: "hsl(149, 80%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Expression Écrite</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-emerald-500 bg-emerald-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-emerald-900 text-sm mb-1">📌 Point important à retenir</h4>
                <p className="text-emerald-700 text-xs leading-relaxed">
                  Dans la tâche de type comparaison ou synthèse, l'équilibre des parties est primordial. Consacrez un volume de rédaction similaire pour chaque point de vue.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Structure recommandée pour viser le CLB 9+</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Introduction :</strong> Présentation neutre du thème général.</p>
                <p><strong>Partie 1 :</strong> Avantages et perspectives favorables.</p>
                <p><strong>Partie 2 :</strong> Limites et objections constructives.</p>
                <p><strong>Conclusion :</strong> Bilan synthétique et prise de position personnelle.</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Modèle de réponse rédigé (Extrait)</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-700 italic">
                "En somme, s'il est indéniable que cette technologie facilite le quotidien, elle pose d'importants défis éthiques qui ne sauraient être ignorés."
              </div>
            </div>
    )
  },
  {
    id: "reussir-tache-2-experience-voyage-marquante",
    title: "Réussir la Tâche 2 : Décrire une expérience de voyage marquante",
    excerpt: "Maîtrisez les clés de l'épreuve de Expression Écrite pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Expression Écrite",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#10b981",
    bgColor: "hsl(149, 80%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Expression Écrite</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-emerald-500 bg-emerald-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-emerald-900 text-sm mb-1">💡 Règle d'or de l'examinateur</h4>
                <p className="text-emerald-700 text-xs leading-relaxed">
                  Pour le niveau B2 / CLB 7+, évitez de répéter les mêmes expressions basiques. Structurez vos idées de manière rigoureuse en utilisant un lexique varié et adapté.
                </p>
              </div>
      
              <div className="space-y-4">
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Les concepts clés</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-emerald-700 block">Structure fondamentale</strong>
                    Toujours poser le cadre logique avant de développer vos arguments.
                  </li>
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-emerald-700 block">Richesse lexicale</strong>
                    Intégrez des mots de liaison peu communs mais précis.
                  </li>
                </ul>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'application pratique</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2">
                  <p><strong>Exemple 1 :</strong> "Bien que la situation soit complexe, il convient de souligner que..." (CLB 9+ target)</p>
                  <p><strong>Exemple 2 :</strong> "En définitive, cette mesure s'avère indispensable pour..."</p>
                </div>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Erreurs fréquentes à éviter</h4>
                <div className="space-y-3 mt-3">
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2" />
                    <div>L'abus de connecteurs répétitifs comme "parce que" ou "mais".</div>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2" />
                    <div>Le manque de clarté dans la liaison entre les paragraphes.</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "reussir-tache-2-compte-rendu-evenement",
    title: "Réussir la Tâche 2 : Rédiger un compte-rendu d'événement",
    excerpt: "Maîtrisez les clés de l'épreuve de Expression Écrite pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Expression Écrite",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#10b981",
    bgColor: "hsl(149, 80%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Expression Écrite</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="bg-emerald-50/50 border border-emerald-200 p-4 rounded-xl">
                <h4 className="font-bold text-emerald-900 text-sm mb-2">📚 Boîte à Vocabulaire clé</h4>
                <ul className="space-y-2 text-xs text-emerald-950">
                  <li><strong>S'avérer :</strong> Se révéler être de façon indiscutable.</li>
                  <li><strong>Sous-tendre :</strong> Être la base de, soutenir de manière invisible.</li>
                  <li><strong>Nonobstant :</strong> Malgré (registre très soutenu).</li>
                </ul>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Fiche Stratégie d'Examen</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <p className="leading-relaxed">
                  Consacrez toujours les 2 premières minutes de votre épreuve à bâtir un schéma conceptuel. Ne rédigez pas directement : listez vos mots-clés et organisez-les selon un enchaînement logique rigoureux.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Plan d'Action Recommandé</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">1</span>
                  <div className="leading-relaxed">Sélectionner 3 expressions clés à placer obligatoirement.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">2</span>
                  <div className="leading-relaxed">Rédiger les introductions et les conclusions au brouillon.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">3</span>
                  <div className="leading-relaxed">Vérifier systématiquement les accords de verbes et d'adjectifs.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "reussir-tache-2-portrait-personne-inspirante",
    title: "Réussir la Tâche 2 : Faire le portrait d'une personne inspirante",
    excerpt: "Maîtrisez les clés de l'épreuve de Expression Écrite pour le niveau Tous Niveaux. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Expression Écrite",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "Tous Niveaux",
    badgeColor: "#10b981",
    bgColor: "hsl(149, 80%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Expression Écrite</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Tableau de référence rapide</h4>
              <div className="border border-slate-100 rounded-xl overflow-hidden text-sm">
                <div className="bg-slate-50 p-3 font-semibold border-b border-slate-100 flex justify-between">
                  <span>Élément</span>
                  <span>Usage recommandé</span>
                </div>
                <div className="p-3 border-b border-slate-100 flex justify-between">
                  <strong>Niveau B2</strong>
                  <span className="text-gray-600">Expression claire avec nuances de base</span>
                </div>
                <div className="p-3 flex justify-between">
                  <strong>Niveau C1 / C2</strong>
                  <span className="text-gray-600">Maîtrise complète avec flexibilité et style</span>
                </div>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'entraînement</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour vous approprier ces notions, lisez régulièrement des articles de presse française (Le Monde, Le Figaro) et observez comment les journalistes structurent leurs transitions.
              </p>
      
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 text-sm mb-3">📝 Mini-Quiz d'auto-évaluation</h4>
                <div className="space-y-3 text-xs">
                  <p className="font-semibold text-slate-700">Quelle tournure exprime au mieux une nuance formelle ?</p>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded border border-slate-150">A) "Mais je pense que..."</div>
                    <div className="p-2 bg-white rounded border border-slate-150 font-medium text-emerald-700">B) "Néanmoins, force est de constater que..." (Correct)</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "reussir-tache-3-analyser-fait-societe-equilibre",
    title: "Réussir la Tâche 3 : Comment analyser un fait de société de manière équilibrée",
    excerpt: "Maîtrisez les clés de l'épreuve de Expression Écrite pour le niveau C1-C2 / CLB 9+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Expression Écrite",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "C1-C2 / CLB 9+",
    badgeColor: "#10b981",
    bgColor: "hsl(149, 80%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Expression Écrite</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-emerald-500 bg-emerald-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-emerald-900 text-sm mb-1">💡 Règle d'or de l'examinateur</h4>
                <p className="text-emerald-700 text-xs leading-relaxed">
                  Pour le niveau C1-C2 / CLB 9+, évitez de répéter les mêmes expressions basiques. Structurez vos idées de manière rigoureuse en utilisant un lexique varié et adapté.
                </p>
              </div>
      
              <div className="space-y-4">
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Les concepts clés</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-emerald-700 block">Structure fondamentale</strong>
                    Toujours poser le cadre logique avant de développer vos arguments.
                  </li>
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-emerald-700 block">Richesse lexicale</strong>
                    Intégrez des mots de liaison peu communs mais précis.
                  </li>
                </ul>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'application pratique</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2">
                  <p><strong>Exemple 1 :</strong> "Bien que la situation soit complexe, il convient de souligner que..." (CLB 9+ target)</p>
                  <p><strong>Exemple 2 :</strong> "En définitive, cette mesure s'avère indispensable pour..."</p>
                </div>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Erreurs fréquentes à éviter</h4>
                <div className="space-y-3 mt-3">
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2" />
                    <div>L'abus de connecteurs répétitifs comme "parce que" ou "mais".</div>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2" />
                    <div>Le manque de clarté dans la liaison entre les paragraphes.</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "reussir-tache-3-argumentation-persuasive-c1",
    title: "Réussir la Tâche 3 : Rédiger une argumentation persuasive de niveau C1",
    excerpt: "Maîtrisez les clés de l'épreuve de Expression Écrite pour le niveau C1-C2 / CLB 9+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Expression Écrite",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "C1-C2 / CLB 9+",
    badgeColor: "#10b981",
    bgColor: "hsl(149, 80%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Expression Écrite</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Analyse approfondie du sujet</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour atteindre le niveau C1-C2 / CLB 9+, votre argumentation doit reposer sur des concepts sociologiques ou économiques globaux plutôt que sur de simples anecdotes personnelles. L'examinateur recherche un esprit de synthèse analytique développé.
              </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Simulation / Modèle type</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm font-mono text-slate-700">
                <p className="italic">"Monsieur l'Examinateur,<br/>
                Je partage en partie ce point de vue. Néanmoins, il convient de pondérer cette affirmation..."</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Grille d'évaluation : ce que cherche l'examinateur</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2" />
                  <div><strong>Coordonner :</strong> Aisance et clarté du débit de parole.</div>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2" />
                  <div><strong>Précision :</strong> Utilisation d'un lexique très précis et varié.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "gestion-temps-expression-ecrite-tcf",
    title: "La gestion du temps pour l'Expression Écrite du TCF Canada",
    excerpt: "Maîtrisez les clés de l'épreuve de Expression Écrite pour le niveau Tous Niveaux. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Expression Écrite",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "Tous Niveaux",
    badgeColor: "#10b981",
    bgColor: "hsl(149, 80%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Expression Écrite</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="bg-emerald-50/50 border border-emerald-200 p-4 rounded-xl">
                <h4 className="font-bold text-emerald-900 text-sm mb-2">📚 Boîte à Vocabulaire clé</h4>
                <ul className="space-y-2 text-xs text-emerald-950">
                  <li><strong>S'avérer :</strong> Se révéler être de façon indiscutable.</li>
                  <li><strong>Sous-tendre :</strong> Être la base de, soutenir de manière invisible.</li>
                  <li><strong>Nonobstant :</strong> Malgré (registre très soutenu).</li>
                </ul>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Fiche Stratégie d'Examen</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <p className="leading-relaxed">
                  Consacrez toujours les 2 premières minutes de votre épreuve à bâtir un schéma conceptuel. Ne rédigez pas directement : listez vos mots-clés et organisez-les selon un enchaînement logique rigoureux.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Plan d'Action Recommandé</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">1</span>
                  <div className="leading-relaxed">Sélectionner 3 expressions clés à placer obligatoirement.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">2</span>
                  <div className="leading-relaxed">Rédiger les introductions et les conclusions au brouillon.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">3</span>
                  <div className="leading-relaxed">Vérifier systématiquement les accords de verbes et d'adjectifs.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "compter-mots-efficacement-eviter-penalites",
    title: "Comment compter ses mots efficacement et éviter les pénalités",
    excerpt: "Maîtrisez les clés de l'épreuve de Expression Écrite pour le niveau Tous Niveaux. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Expression Écrite",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "Tous Niveaux",
    badgeColor: "#10b981",
    bgColor: "hsl(149, 80%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Expression Écrite</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Tableau de référence rapide</h4>
              <div className="border border-slate-100 rounded-xl overflow-hidden text-sm">
                <div className="bg-slate-50 p-3 font-semibold border-b border-slate-100 flex justify-between">
                  <span>Élément</span>
                  <span>Usage recommandé</span>
                </div>
                <div className="p-3 border-b border-slate-100 flex justify-between">
                  <strong>Niveau B2</strong>
                  <span className="text-gray-600">Expression claire avec nuances de base</span>
                </div>
                <div className="p-3 flex justify-between">
                  <strong>Niveau C1 / C2</strong>
                  <span className="text-gray-600">Maîtrise complète avec flexibilité et style</span>
                </div>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'entraînement</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour vous approprier ces notions, lisez régulièrement des articles de presse française (Le Monde, Le Figaro) et observez comment les journalistes structurent leurs transitions.
              </p>
      
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 text-sm mb-3">📝 Mini-Quiz d'auto-évaluation</h4>
                <div className="space-y-3 text-xs">
                  <p className="font-semibold text-slate-700">Quelle tournure exprime au mieux une nuance formelle ?</p>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded border border-slate-150">A) "Mais je pense que..."</div>
                    <div className="p-2 bg-white rounded border border-slate-150 font-medium text-emerald-700">B) "Néanmoins, force est de constater que..." (Correct)</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "5-erreurs-grammaticales-frequentes-ecrit",
    title: "Les 5 erreurs grammaticales les plus fréquentes à l'écrit",
    excerpt: "Maîtrisez les clés de l'épreuve de Expression Écrite pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Expression Écrite",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#10b981",
    bgColor: "hsl(149, 80%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Expression Écrite</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-emerald-500 bg-emerald-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-emerald-900 text-sm mb-1">💡 Règle d'or de l'examinateur</h4>
                <p className="text-emerald-700 text-xs leading-relaxed">
                  Pour le niveau B2 / CLB 7+, évitez de répéter les mêmes expressions basiques. Structurez vos idées de manière rigoureuse en utilisant un lexique varié et adapté.
                </p>
              </div>
      
              <div className="space-y-4">
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Les concepts clés</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-emerald-700 block">Structure fondamentale</strong>
                    Toujours poser le cadre logique avant de développer vos arguments.
                  </li>
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-emerald-700 block">Richesse lexicale</strong>
                    Intégrez des mots de liaison peu communs mais précis.
                  </li>
                </ul>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'application pratique</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2">
                  <p><strong>Exemple 1 :</strong> "Bien que la situation soit complexe, il convient de souligner que..." (CLB 9+ target)</p>
                  <p><strong>Exemple 2 :</strong> "En définitive, cette mesure s'avère indispensable pour..."</p>
                </div>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Erreurs fréquentes à éviter</h4>
                <div className="space-y-3 mt-3">
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2" />
                    <div>L'abus de connecteurs répétitifs comme "parce que" ou "mais".</div>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2" />
                    <div>Le manque de clarté dans la liaison entre les paragraphes.</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "structurer-brouillon-5-minutes-chaque-tache",
    title: "Comment structurer son brouillon en 5 minutes pour chaque tâche",
    excerpt: "Maîtrisez les clés de l'épreuve de Expression Écrite pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Expression Écrite",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#10b981",
    bgColor: "hsl(149, 80%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Expression Écrite</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Analyse approfondie du sujet</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour atteindre le niveau B2 / CLB 7+, votre argumentation doit reposer sur des concepts sociologiques ou économiques globaux plutôt que sur de simples anecdotes personnelles. L'examinateur recherche un esprit de synthèse analytique développé.
              </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Simulation / Modèle type</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm font-mono text-slate-700">
                <p className="italic">"Monsieur l'Examinateur,<br/>
                Je partage en partie ce point de vue. Néanmoins, il convient de pondérer cette affirmation..."</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Grille d'évaluation : ce que cherche l'examinateur</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2" />
                  <div><strong>Coordonner :</strong> Aisance et clarté du débit de parole.</div>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2" />
                  <div><strong>Précision :</strong> Utilisation d'un lexique très précis et varié.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "checklist-auto-correction-soumission",
    title: "Check-list d'auto-correction avant de soumettre sa copie",
    excerpt: "Maîtrisez les clés de l'épreuve de Expression Écrite pour le niveau Tous Niveaux. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Expression Écrite",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "Tous Niveaux",
    badgeColor: "#10b981",
    bgColor: "hsl(149, 80%, 96%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Expression Écrite</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-emerald-500 bg-emerald-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-emerald-900 text-sm mb-1">📌 Point important à retenir</h4>
                <p className="text-emerald-700 text-xs leading-relaxed">
                  Dans la tâche de type comparaison ou synthèse, l'équilibre des parties est primordial. Consacrez un volume de rédaction similaire pour chaque point de vue.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Structure recommandée pour viser le CLB 9+</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Introduction :</strong> Présentation neutre du thème général.</p>
                <p><strong>Partie 1 :</strong> Avantages et perspectives favorables.</p>
                <p><strong>Partie 2 :</strong> Limites et objections constructives.</p>
                <p><strong>Conclusion :</strong> Bilan synthétique et prise de position personnelle.</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Modèle de réponse rédigé (Extrait)</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-700 italic">
                "En somme, s'il est indéniable que cette technologie facilite le quotidien, elle pose d'importants défis éthiques qui ne sauraient être ignorés."
              </div>
            </div>
    )
  },
  {
    id: "reussir-tache-1-parcours-professionnel-2-minutes",
    title: "Réussir la Tâche 1 : Parler de son parcours professionnel en 2 minutes",
    excerpt: "Maîtrisez les clés de l'épreuve de Expression Orale pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Expression Orale",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#f97316",
    bgColor: "hsl(31, 100%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Expression Orale</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Analyse approfondie du sujet</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour atteindre le niveau B2 / CLB 7+, votre argumentation doit reposer sur des concepts sociologiques ou économiques globaux plutôt que sur de simples anecdotes personnelles. L'examinateur recherche un esprit de synthèse analytique développé.
              </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Simulation / Modèle type</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm font-mono text-slate-700">
                <p className="italic">"Monsieur l'Examinateur,<br/>
                Je partage en partie ce point de vue. Néanmoins, il convient de pondérer cette affirmation..."</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Grille d'évaluation : ce que cherche l'examinateur</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500 mt-2" />
                  <div><strong>Coordonner :</strong> Aisance et clarté du débit de parole.</div>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500 mt-2" />
                  <div><strong>Précision :</strong> Utilisation d'un lexique très précis et varié.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "reussir-tache-1-decrire-ville-origine-vocabulaire-riche",
    title: "Réussir la Tâche 1 : Décrire sa ville d'origine avec un vocabulaire riche",
    excerpt: "Maîtrisez les clés de l'épreuve de Expression Orale pour le niveau Tous Niveaux. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Expression Orale",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "Tous Niveaux",
    badgeColor: "#f97316",
    bgColor: "hsl(31, 100%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Expression Orale</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="bg-orange-50/50 border border-orange-200 p-4 rounded-xl">
                <h4 className="font-bold text-orange-900 text-sm mb-2">📚 Boîte à Vocabulaire clé</h4>
                <ul className="space-y-2 text-xs text-orange-950">
                  <li><strong>S'avérer :</strong> Se révéler être de façon indiscutable.</li>
                  <li><strong>Sous-tendre :</strong> Être la base de, soutenir de manière invisible.</li>
                  <li><strong>Nonobstant :</strong> Malgré (registre très soutenu).</li>
                </ul>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Fiche Stratégie d'Examen</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <p className="leading-relaxed">
                  Consacrez toujours les 2 premières minutes de votre épreuve à bâtir un schéma conceptuel. Ne rédigez pas directement : listez vos mots-clés et organisez-les selon un enchaînement logique rigoureux.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Plan d'Action Recommandé</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-orange-100 text-orange-800 font-bold text-[10px]">1</span>
                  <div className="leading-relaxed">Sélectionner 3 expressions clés à placer obligatoirement.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-orange-100 text-orange-800 font-bold text-[10px]">2</span>
                  <div className="leading-relaxed">Rédiger les introductions et les conclusions au brouillon.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-orange-100 text-orange-800 font-bold text-[10px]">3</span>
                  <div className="leading-relaxed">Vérifier systématiquement les accords de verbes et d'adjectifs.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "reussir-tache-2-poser-questions-recherche-logement",
    title: "Réussir la Tâche 2 : Poser des questions variées lors d'une recherche de logement",
    excerpt: "Maîtrisez les clés de l'épreuve de Expression Orale pour le niveau Tous Niveaux. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Expression Orale",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "Tous Niveaux",
    badgeColor: "#f97316",
    bgColor: "hsl(31, 100%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Expression Orale</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-orange-900 text-sm mb-1">📌 Point important à retenir</h4>
                <p className="text-orange-700 text-xs leading-relaxed">
                  Dans la tâche de type comparaison ou synthèse, l'équilibre des parties est primordial. Consacrez un volume de rédaction similaire pour chaque point de vue.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Structure recommandée pour viser le CLB 9+</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Introduction :</strong> Présentation neutre du thème général.</p>
                <p><strong>Partie 1 :</strong> Avantages et perspectives favorables.</p>
                <p><strong>Partie 2 :</strong> Limites et objections constructives.</p>
                <p><strong>Conclusion :</strong> Bilan synthétique et prise de position personnelle.</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Modèle de réponse rédigé (Extrait)</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-700 italic">
                "En somme, s'il est indéniable que cette technologie facilite le quotidien, elle pose d'importants défis éthiques qui ne sauraient être ignorés."
              </div>
            </div>
    )
  },
  {
    id: "reussir-tache-2-negocier-convaincre-inscription-sportive",
    title: "Réussir la Tâche 2 : Négocier et convaincre lors d'une inscription sportive",
    excerpt: "Maîtrisez les clés de l'épreuve de Expression Orale pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Expression Orale",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#f97316",
    bgColor: "hsl(31, 100%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Expression Orale</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Analyse approfondie du sujet</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour atteindre le niveau B2 / CLB 7+, votre argumentation doit reposer sur des concepts sociologiques ou économiques globaux plutôt que sur de simples anecdotes personnelles. L'examinateur recherche un esprit de synthèse analytique développé.
              </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Simulation / Modèle type</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm font-mono text-slate-700">
                <p className="italic">"Monsieur l'Examinateur,<br/>
                Je partage en partie ce point de vue. Néanmoins, il convient de pondérer cette affirmation..."</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Grille d'évaluation : ce que cherche l'examinateur</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500 mt-2" />
                  <div><strong>Coordonner :</strong> Aisance et clarté du débit de parole.</div>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500 mt-2" />
                  <div><strong>Précision :</strong> Utilisation d'un lexique très précis et varié.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "reussir-tache-2-expressions-relance-interaction",
    title: "Réussir la Tâche 2 : Les expressions de relance pour dynamiser l'interaction",
    excerpt: "Maîtrisez les clés de l'épreuve de Expression Orale pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Expression Orale",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#f97316",
    bgColor: "hsl(31, 100%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Expression Orale</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-orange-900 text-sm mb-1">💡 Règle d'or de l'examinateur</h4>
                <p className="text-orange-700 text-xs leading-relaxed">
                  Pour le niveau B2 / CLB 7+, évitez de répéter les mêmes expressions basiques. Structurez vos idées de manière rigoureuse en utilisant un lexique varié et adapté.
                </p>
              </div>
      
              <div className="space-y-4">
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Les concepts clés</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-orange-700 block">Structure fondamentale</strong>
                    Toujours poser le cadre logique avant de développer vos arguments.
                  </li>
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-orange-700 block">Richesse lexicale</strong>
                    Intégrez des mots de liaison peu communs mais précis.
                  </li>
                </ul>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'application pratique</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2">
                  <p><strong>Exemple 1 :</strong> "Bien que la situation soit complexe, il convient de souligner que..." (CLB 9+ target)</p>
                  <p><strong>Exemple 2 :</strong> "En définitive, cette mesure s'avère indispensable pour..."</p>
                </div>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Erreurs fréquentes à éviter</h4>
                <div className="space-y-3 mt-3">
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500 mt-2" />
                    <div>L'abus de connecteurs répétitifs comme "parce que" ou "mais".</div>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500 mt-2" />
                    <div>Le manque de clarté dans la liaison entre les paragraphes.</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "reussir-tache-3-developper-monologue-argumente-4-minutes",
    title: "Réussir la Tâche 3 : Développer un monologue argumenté de 4 minutes",
    excerpt: "Maîtrisez les clés de l'épreuve de Expression Orale pour le niveau C1-C2 / CLB 9+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Expression Orale",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "C1-C2 / CLB 9+",
    badgeColor: "#f97316",
    bgColor: "hsl(31, 100%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Expression Orale</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-orange-900 text-sm mb-1">💡 Règle d'or de l'examinateur</h4>
                <p className="text-orange-700 text-xs leading-relaxed">
                  Pour le niveau C1-C2 / CLB 9+, évitez de répéter les mêmes expressions basiques. Structurez vos idées de manière rigoureuse en utilisant un lexique varié et adapté.
                </p>
              </div>
      
              <div className="space-y-4">
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Les concepts clés</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-orange-700 block">Structure fondamentale</strong>
                    Toujours poser le cadre logique avant de développer vos arguments.
                  </li>
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-orange-700 block">Richesse lexicale</strong>
                    Intégrez des mots de liaison peu communs mais précis.
                  </li>
                </ul>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'application pratique</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2">
                  <p><strong>Exemple 1 :</strong> "Bien que la situation soit complexe, il convient de souligner que..." (CLB 9+ target)</p>
                  <p><strong>Exemple 2 :</strong> "En définitive, cette mesure s'avère indispensable pour..."</p>
                </div>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Erreurs fréquentes à éviter</h4>
                <div className="space-y-3 mt-3">
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500 mt-2" />
                    <div>L'abus de connecteurs répétitifs comme "parce que" ou "mais".</div>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500 mt-2" />
                    <div>Le manque de clarté dans la liaison entre les paragraphes.</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "reussir-tache-3-introduire-structurer-sujet-oral",
    title: "Réussir la Tâche 3 : Comment introduire et structurer son sujet à l'oral",
    excerpt: "Maîtrisez les clés de l'épreuve de Expression Orale pour le niveau C1-C2 / CLB 9+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Expression Orale",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "C1-C2 / CLB 9+",
    badgeColor: "#f97316",
    bgColor: "hsl(31, 100%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Expression Orale</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="bg-orange-50/50 border border-orange-200 p-4 rounded-xl">
                <h4 className="font-bold text-orange-900 text-sm mb-2">📚 Boîte à Vocabulaire clé</h4>
                <ul className="space-y-2 text-xs text-orange-950">
                  <li><strong>S'avérer :</strong> Se révéler être de façon indiscutable.</li>
                  <li><strong>Sous-tendre :</strong> Être la base de, soutenir de manière invisible.</li>
                  <li><strong>Nonobstant :</strong> Malgré (registre très soutenu).</li>
                </ul>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Fiche Stratégie d'Examen</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <p className="leading-relaxed">
                  Consacrez toujours les 2 premières minutes de votre épreuve à bâtir un schéma conceptuel. Ne rédigez pas directement : listez vos mots-clés et organisez-les selon un enchaînement logique rigoureux.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Plan d'Action Recommandé</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-orange-100 text-orange-800 font-bold text-[10px]">1</span>
                  <div className="leading-relaxed">Sélectionner 3 expressions clés à placer obligatoirement.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-orange-100 text-orange-800 font-bold text-[10px]">2</span>
                  <div className="leading-relaxed">Rédiger les introductions et les conclusions au brouillon.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-orange-100 text-orange-800 font-bold text-[10px]">3</span>
                  <div className="leading-relaxed">Vérifier systématiquement les accords de verbes et d'adjectifs.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "reussir-tache-3-formuler-transitions-orales-fluides",
    title: "Réussir la Tâche 3 : Formuler des transitions orales fluides",
    excerpt: "Maîtrisez les clés de l'épreuve de Expression Orale pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Expression Orale",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#f97316",
    bgColor: "hsl(31, 100%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Expression Orale</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-orange-900 text-sm mb-1">📌 Point important à retenir</h4>
                <p className="text-orange-700 text-xs leading-relaxed">
                  Dans la tâche de type comparaison ou synthèse, l'équilibre des parties est primordial. Consacrez un volume de rédaction similaire pour chaque point de vue.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Structure recommandée pour viser le CLB 9+</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Introduction :</strong> Présentation neutre du thème général.</p>
                <p><strong>Partie 1 :</strong> Avantages et perspectives favorables.</p>
                <p><strong>Partie 2 :</strong> Limites et objections constructives.</p>
                <p><strong>Conclusion :</strong> Bilan synthétique et prise de position personnelle.</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Modèle de réponse rédigé (Extrait)</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-700 italic">
                "En somme, s'il est indéniable que cette technologie facilite le quotidien, elle pose d'importants défis éthiques qui ne sauraient être ignorés."
              </div>
            </div>
    )
  },
  {
    id: "gerer-stress-eviter-blancs-oral",
    title: "Comment gérer le stress et éviter les blancs à l'oral",
    excerpt: "Maîtrisez les clés de l'épreuve de Expression Orale pour le niveau Tous Niveaux. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Expression Orale",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "Tous Niveaux",
    badgeColor: "#f97316",
    bgColor: "hsl(31, 100%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Expression Orale</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="bg-orange-50/50 border border-orange-200 p-4 rounded-xl">
                <h4 className="font-bold text-orange-900 text-sm mb-2">📚 Boîte à Vocabulaire clé</h4>
                <ul className="space-y-2 text-xs text-orange-950">
                  <li><strong>S'avérer :</strong> Se révéler être de façon indiscutable.</li>
                  <li><strong>Sous-tendre :</strong> Être la base de, soutenir de manière invisible.</li>
                  <li><strong>Nonobstant :</strong> Malgré (registre très soutenu).</li>
                </ul>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Fiche Stratégie d'Examen</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <p className="leading-relaxed">
                  Consacrez toujours les 2 premières minutes de votre épreuve à bâtir un schéma conceptuel. Ne rédigez pas directement : listez vos mots-clés et organisez-les selon un enchaînement logique rigoureux.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Plan d'Action Recommandé</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-orange-100 text-orange-800 font-bold text-[10px]">1</span>
                  <div className="leading-relaxed">Sélectionner 3 expressions clés à placer obligatoirement.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-orange-100 text-orange-800 font-bold text-[10px]">2</span>
                  <div className="leading-relaxed">Rédiger les introductions et les conclusions au brouillon.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-orange-100 text-orange-800 font-bold text-[10px]">3</span>
                  <div className="leading-relaxed">Vérifier systématiquement les accords de verbes et d'adjectifs.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "ameliorer-prononciation-intonation-tcf",
    title: "Améliorer sa prononciation et son intonation pour le TCF",
    excerpt: "Maîtrisez les clés de l'épreuve de Expression Orale pour le niveau Tous Niveaux. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Expression Orale",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "Tous Niveaux",
    badgeColor: "#f97316",
    bgColor: "hsl(31, 100%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Expression Orale</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Tableau de référence rapide</h4>
              <div className="border border-slate-100 rounded-xl overflow-hidden text-sm">
                <div className="bg-slate-50 p-3 font-semibold border-b border-slate-100 flex justify-between">
                  <span>Élément</span>
                  <span>Usage recommandé</span>
                </div>
                <div className="p-3 border-b border-slate-100 flex justify-between">
                  <strong>Niveau B2</strong>
                  <span className="text-gray-600">Expression claire avec nuances de base</span>
                </div>
                <div className="p-3 flex justify-between">
                  <strong>Niveau C1 / C2</strong>
                  <span className="text-gray-600">Maîtrise complète avec flexibilité et style</span>
                </div>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'entraînement</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour vous approprier ces notions, lisez régulièrement des articles de presse française (Le Monde, Le Figaro) et observez comment les journalistes structurent leurs transitions.
              </p>
      
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 text-sm mb-3">📝 Mini-Quiz d'auto-évaluation</h4>
                <div className="space-y-3 text-xs">
                  <p className="font-semibold text-slate-700">Quelle tournure exprime au mieux une nuance formelle ?</p>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded border border-slate-150">A) "Mais je pense que..."</div>
                    <div className="p-2 bg-white rounded border border-slate-150 font-medium text-emerald-700">B) "Néanmoins, force est de constater que..." (Correct)</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "importance-ecoute-active-reactions-jeu-role",
    title: "L'importance de l'écoute active et des réactions dans le jeu de rôle",
    excerpt: "Maîtrisez les clés de l'épreuve de Expression Orale pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Expression Orale",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#f97316",
    bgColor: "hsl(31, 100%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Expression Orale</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Analyse approfondie du sujet</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour atteindre le niveau B2 / CLB 7+, votre argumentation doit reposer sur des concepts sociologiques ou économiques globaux plutôt que sur de simples anecdotes personnelles. L'examinateur recherche un esprit de synthèse analytique développé.
              </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Simulation / Modèle type</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm font-mono text-slate-700">
                <p className="italic">"Monsieur l'Examinateur,<br/>
                Je partage en partie ce point de vue. Néanmoins, il convient de pondérer cette affirmation..."</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Grille d'évaluation : ce que cherche l'examinateur</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500 mt-2" />
                  <div><strong>Coordonner :</strong> Aisance et clarté du débit de parole.</div>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500 mt-2" />
                  <div><strong>Précision :</strong> Utilisation d'un lexique très précis et varié.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "nuancer-point-vue-face-objections-examinateur",
    title: "Comment nuancer son point de vue face aux objections de l'examinateur",
    excerpt: "Maîtrisez les clés de l'épreuve de Expression Orale pour le niveau C1-C2 / CLB 9+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Expression Orale",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "C1-C2 / CLB 9+",
    badgeColor: "#f97316",
    bgColor: "hsl(31, 100%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Expression Orale</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-orange-900 text-sm mb-1">💡 Règle d'or de l'examinateur</h4>
                <p className="text-orange-700 text-xs leading-relaxed">
                  Pour le niveau C1-C2 / CLB 9+, évitez de répéter les mêmes expressions basiques. Structurez vos idées de manière rigoureuse en utilisant un lexique varié et adapté.
                </p>
              </div>
      
              <div className="space-y-4">
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Les concepts clés</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-orange-700 block">Structure fondamentale</strong>
                    Toujours poser le cadre logique avant de développer vos arguments.
                  </li>
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-orange-700 block">Richesse lexicale</strong>
                    Intégrez des mots de liaison peu communs mais précis.
                  </li>
                </ul>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'application pratique</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2">
                  <p><strong>Exemple 1 :</strong> "Bien que la situation soit complexe, il convient de souligner que..." (CLB 9+ target)</p>
                  <p><strong>Exemple 2 :</strong> "En définitive, cette mesure s'avère indispensable pour..."</p>
                </div>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Erreurs fréquentes à éviter</h4>
                <div className="space-y-3 mt-3">
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500 mt-2" />
                    <div>L'abus de connecteurs répétitifs comme "parce que" ou "mais".</div>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500 mt-2" />
                    <div>Le manque de clarté dans la liaison entre les paragraphes.</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "fiche-synthese-consignes-cles-expression-orale",
    title: "Fiche de synthèse : Les consignes clés de l'épreuve d'expression orale",
    excerpt: "Maîtrisez les clés de l'épreuve de Expression Orale pour le niveau Tous Niveaux. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Expression Orale",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "Tous Niveaux",
    badgeColor: "#f97316",
    bgColor: "hsl(31, 100%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Expression Orale</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-orange-900 text-sm mb-1">📌 Point important à retenir</h4>
                <p className="text-orange-700 text-xs leading-relaxed">
                  Dans la tâche de type comparaison ou synthèse, l'équilibre des parties est primordial. Consacrez un volume de rédaction similaire pour chaque point de vue.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Structure recommandée pour viser le CLB 9+</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Introduction :</strong> Présentation neutre du thème général.</p>
                <p><strong>Partie 1 :</strong> Avantages et perspectives favorables.</p>
                <p><strong>Partie 2 :</strong> Limites et objections constructives.</p>
                <p><strong>Conclusion :</strong> Bilan synthétique et prise de position personnelle.</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Modèle de réponse rédigé (Extrait)</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-700 italic">
                "En somme, s'il est indéniable que cette technologie facilite le quotidien, elle pose d'importants défis éthiques qui ne sauraient être ignorés."
              </div>
            </div>
    )
  },
  {
    id: "comprehension-ecrite-repérer-pieges-questions-b2",
    title: "Compréhension Écrite : Repérer les pièges des questions de niveau B2",
    excerpt: "Maîtrisez les clés de l'épreuve de Compréhension pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Compréhension",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#3b82f6",
    bgColor: "hsl(226, 100%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Compréhension</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Tableau de référence rapide</h4>
              <div className="border border-slate-100 rounded-xl overflow-hidden text-sm">
                <div className="bg-slate-50 p-3 font-semibold border-b border-slate-100 flex justify-between">
                  <span>Élément</span>
                  <span>Usage recommandé</span>
                </div>
                <div className="p-3 border-b border-slate-100 flex justify-between">
                  <strong>Niveau B2</strong>
                  <span className="text-gray-600">Expression claire avec nuances de base</span>
                </div>
                <div className="p-3 flex justify-between">
                  <strong>Niveau C1 / C2</strong>
                  <span className="text-gray-600">Maîtrise complète avec flexibilité et style</span>
                </div>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'entraînement</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour vous approprier ces notions, lisez régulièrement des articles de presse française (Le Monde, Le Figaro) et observez comment les journalistes structurent leurs transitions.
              </p>
      
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 text-sm mb-3">📝 Mini-Quiz d'auto-évaluation</h4>
                <div className="space-y-3 text-xs">
                  <p className="font-semibold text-slate-700">Quelle tournure exprime au mieux une nuance formelle ?</p>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded border border-slate-150">A) "Mais je pense que..."</div>
                    <div className="p-2 bg-white rounded border border-slate-150 font-medium text-emerald-700">B) "Néanmoins, force est de constater que..." (Correct)</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "comprehension-ecrite-analyser-documents-administratifs",
    title: "Compréhension Écrite : Comment analyser les documents administratifs",
    excerpt: "Maîtrisez les clés de l'épreuve de Compréhension pour le niveau Tous Niveaux. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Compréhension",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "Tous Niveaux",
    badgeColor: "#3b82f6",
    bgColor: "hsl(226, 100%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Compréhension</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-blue-900 text-sm mb-1">📌 Point important à retenir</h4>
                <p className="text-blue-700 text-xs leading-relaxed">
                  Dans la tâche de type comparaison ou synthèse, l'équilibre des parties est primordial. Consacrez un volume de rédaction similaire pour chaque point de vue.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Structure recommandée pour viser le CLB 9+</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Introduction :</strong> Présentation neutre du thème général.</p>
                <p><strong>Partie 1 :</strong> Avantages et perspectives favorables.</p>
                <p><strong>Partie 2 :</strong> Limites et objections constructives.</p>
                <p><strong>Conclusion :</strong> Bilan synthétique et prise de position personnelle.</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Modèle de réponse rédigé (Extrait)</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-700 italic">
                "En somme, s'il est indéniable que cette technologie facilite le quotidien, elle pose d'importants défis éthiques qui ne sauraient être ignorés."
              </div>
            </div>
    )
  },
  {
    id: "comprehension-ecrite-strategies-articles-presse-complexes",
    title: "Compréhension Écrite : Stratégies pour les articles de presse complexes (C1/C2)",
    excerpt: "Maîtrisez les clés de l'épreuve de Compréhension pour le niveau C1-C2 / CLB 9+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Compréhension",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "C1-C2 / CLB 9+",
    badgeColor: "#3b82f6",
    bgColor: "hsl(226, 100%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Compréhension</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-blue-900 text-sm mb-1">💡 Règle d'or de l'examinateur</h4>
                <p className="text-blue-700 text-xs leading-relaxed">
                  Pour le niveau C1-C2 / CLB 9+, évitez de répéter les mêmes expressions basiques. Structurez vos idées de manière rigoureuse en utilisant un lexique varié et adapté.
                </p>
              </div>
      
              <div className="space-y-4">
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Les concepts clés</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-blue-700 block">Structure fondamentale</strong>
                    Toujours poser le cadre logique avant de développer vos arguments.
                  </li>
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-blue-700 block">Richesse lexicale</strong>
                    Intégrez des mots de liaison peu communs mais précis.
                  </li>
                </ul>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'application pratique</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2">
                  <p><strong>Exemple 1 :</strong> "Bien que la situation soit complexe, il convient de souligner que..." (CLB 9+ target)</p>
                  <p><strong>Exemple 2 :</strong> "En définitive, cette mesure s'avère indispensable pour..."</p>
                </div>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Erreurs fréquentes à éviter</h4>
                <div className="space-y-3 mt-3">
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                    <div>L'abus de connecteurs répétitifs comme "parce que" ou "mais".</div>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                    <div>Le manque de clarté dans la liaison entre les paragraphes.</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "comprehension-orale-s-entrainer-accents-francophones",
    title: "Compréhension Orale : S'entraîner à comprendre les différents accents francophones",
    excerpt: "Maîtrisez les clés de l'épreuve de Compréhension pour le niveau Tous Niveaux. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Compréhension",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "Tous Niveaux",
    badgeColor: "#3b82f6",
    bgColor: "hsl(226, 100%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Compréhension</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="bg-blue-50/50 border border-blue-200 p-4 rounded-xl">
                <h4 className="font-bold text-blue-900 text-sm mb-2">📚 Boîte à Vocabulaire clé</h4>
                <ul className="space-y-2 text-xs text-blue-950">
                  <li><strong>S'avérer :</strong> Se révéler être de façon indiscutable.</li>
                  <li><strong>Sous-tendre :</strong> Être la base de, soutenir de manière invisible.</li>
                  <li><strong>Nonobstant :</strong> Malgré (registre très soutenu).</li>
                </ul>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Fiche Stratégie d'Examen</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <p className="leading-relaxed">
                  Consacrez toujours les 2 premières minutes de votre épreuve à bâtir un schéma conceptuel. Ne rédigez pas directement : listez vos mots-clés et organisez-les selon un enchaînement logique rigoureux.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Plan d'Action Recommandé</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 font-bold text-[10px]">1</span>
                  <div className="leading-relaxed">Sélectionner 3 expressions clés à placer obligatoirement.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 font-bold text-[10px]">2</span>
                  <div className="leading-relaxed">Rédiger les introductions et les conclusions au brouillon.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 font-bold text-[10px]">3</span>
                  <div className="leading-relaxed">Vérifier systématiquement les accords de verbes et d'adjectifs.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "comprehension-orale-reperer-mots-cles-dialogues-rapides",
    title: "Compréhension Orale : Repérer les mots-clés dans les dialogues rapides",
    excerpt: "Maîtrisez les clés de l'épreuve de Compréhension pour le niveau B2 / CLB 7+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Compréhension",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "B2 / CLB 7+",
    badgeColor: "#3b82f6",
    bgColor: "hsl(226, 100%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Compréhension</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Analyse approfondie du sujet</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour atteindre le niveau B2 / CLB 7+, votre argumentation doit reposer sur des concepts sociologiques ou économiques globaux plutôt que sur de simples anecdotes personnelles. L'examinateur recherche un esprit de synthèse analytique développé.
              </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Simulation / Modèle type</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm font-mono text-slate-700">
                <p className="italic">"Monsieur l'Examinateur,<br/>
                Je partage en partie ce point de vue. Néanmoins, il convient de pondérer cette affirmation..."</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Grille d'évaluation : ce que cherche l'examinateur</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                  <div><strong>Coordonner :</strong> Aisance et clarté du débit de parole.</div>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                  <div><strong>Précision :</strong> Utilisation d'un lexique très précis et varié.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "comprehension-orale-comprendre-implicite-opinions",
    title: "Compréhension Orale : Comprendre l'implicite et les opinions des locuteurs",
    excerpt: "Maîtrisez les clés de l'épreuve de Compréhension pour le niveau C1-C2 / CLB 9+. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Compréhension",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "C1-C2 / CLB 9+",
    badgeColor: "#3b82f6",
    bgColor: "hsl(226, 100%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Compréhension</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-blue-900 text-sm mb-1">💡 Règle d'or de l'examinateur</h4>
                <p className="text-blue-700 text-xs leading-relaxed">
                  Pour le niveau C1-C2 / CLB 9+, évitez de répéter les mêmes expressions basiques. Structurez vos idées de manière rigoureuse en utilisant un lexique varié et adapté.
                </p>
              </div>
      
              <div className="space-y-4">
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Les concepts clés</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-blue-700 block">Structure fondamentale</strong>
                    Toujours poser le cadre logique avant de développer vos arguments.
                  </li>
                  <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
                    <strong className="text-blue-700 block">Richesse lexicale</strong>
                    Intégrez des mots de liaison peu communs mais précis.
                  </li>
                </ul>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'application pratique</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2">
                  <p><strong>Exemple 1 :</strong> "Bien que la situation soit complexe, il convient de souligner que..." (CLB 9+ target)</p>
                  <p><strong>Exemple 2 :</strong> "En définitive, cette mesure s'avère indispensable pour..."</p>
                </div>
      
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Erreurs fréquentes à éviter</h4>
                <div className="space-y-3 mt-3">
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                    <div>L'abus de connecteurs répétitifs comme "parce que" ou "mais".</div>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                    <div>Le manque de clarté dans la liaison entre les paragraphes.</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "comprehension-orale-gerer-rythme-enregistrements-audio",
    title: "Compréhension Orale : Gérer le rythme des enregistrements audio",
    excerpt: "Maîtrisez les clés de l'épreuve de Compréhension pour le niveau Tous Niveaux. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Compréhension",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "Tous Niveaux",
    badgeColor: "#3b82f6",
    bgColor: "hsl(226, 100%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Compréhension</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Tableau de référence rapide</h4>
              <div className="border border-slate-100 rounded-xl overflow-hidden text-sm">
                <div className="bg-slate-50 p-3 font-semibold border-b border-slate-100 flex justify-between">
                  <span>Élément</span>
                  <span>Usage recommandé</span>
                </div>
                <div className="p-3 border-b border-slate-100 flex justify-between">
                  <strong>Niveau B2</strong>
                  <span className="text-gray-600">Expression claire avec nuances de base</span>
                </div>
                <div className="p-3 flex justify-between">
                  <strong>Niveau C1 / C2</strong>
                  <span className="text-gray-600">Maîtrise complète avec flexibilité et style</span>
                </div>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'entraînement</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour vous approprier ces notions, lisez régulièrement des articles de presse française (Le Monde, Le Figaro) et observez comment les journalistes structurent leurs transitions.
              </p>
      
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 text-sm mb-3">📝 Mini-Quiz d'auto-évaluation</h4>
                <div className="space-y-3 text-xs">
                  <p className="font-semibold text-slate-700">Quelle tournure exprime au mieux une nuance formelle ?</p>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded border border-slate-150">A) "Mais je pense que..."</div>
                    <div className="p-2 bg-white rounded border border-slate-150 font-medium text-emerald-700">B) "Néanmoins, force est de constater que..." (Correct)</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "strategies-globales-maximiser-score-qcm-tcf",
    title: "Stratégies globales pour maximiser son score au QCM du TCF",
    excerpt: "Maîtrisez les clés de l'épreuve de Compréhension pour le niveau Tous Niveaux. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Compréhension",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "Tous Niveaux",
    badgeColor: "#3b82f6",
    bgColor: "hsl(226, 100%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Compréhension</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Analyse approfondie du sujet</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour atteindre le niveau Tous Niveaux, votre argumentation doit reposer sur des concepts sociologiques ou économiques globaux plutôt que sur de simples anecdotes personnelles. L'examinateur recherche un esprit de synthèse analytique développé.
              </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Simulation / Modèle type</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm font-mono text-slate-700">
                <p className="italic">"Monsieur l'Examinateur,<br/>
                Je partage en partie ce point de vue. Néanmoins, il convient de pondérer cette affirmation..."</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Grille d'évaluation : ce que cherche l'examinateur</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                  <div><strong>Coordonner :</strong> Aisance et clarté du débit de parole.</div>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                  <div><strong>Précision :</strong> Utilisation d'un lexique très précis et varié.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "s-entrainer-quotidiennement-radio-journaux-francais",
    title: "Comment s'entraîner quotidiennement avec la radio et les journaux français",
    excerpt: "Maîtrisez les clés de l'épreuve de Compréhension pour le niveau Tous Niveaux. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Compréhension",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "Tous Niveaux",
    badgeColor: "#3b82f6",
    bgColor: "hsl(226, 100%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Compréhension</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="bg-blue-50/50 border border-blue-200 p-4 rounded-xl">
                <h4 className="font-bold text-blue-900 text-sm mb-2">📚 Boîte à Vocabulaire clé</h4>
                <ul className="space-y-2 text-xs text-blue-950">
                  <li><strong>S'avérer :</strong> Se révéler être de façon indiscutable.</li>
                  <li><strong>Sous-tendre :</strong> Être la base de, soutenir de manière invisible.</li>
                  <li><strong>Nonobstant :</strong> Malgré (registre très soutenu).</li>
                </ul>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Fiche Stratégie d'Examen</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <p className="leading-relaxed">
                  Consacrez toujours les 2 premières minutes de votre épreuve à bâtir un schéma conceptuel. Ne rédigez pas directement : listez vos mots-clés et organisez-les selon un enchaînement logique rigoureux.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Plan d'Action Recommandé</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 font-bold text-[10px]">1</span>
                  <div className="leading-relaxed">Sélectionner 3 expressions clés à placer obligatoirement.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 font-bold text-[10px]">2</span>
                  <div className="leading-relaxed">Rédiger les introductions et les conclusions au brouillon.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 font-bold text-[10px]">3</span>
                  <div className="leading-relaxed">Vérifier systématiquement les accords de verbes et d'adjectifs.</div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "quel-score-tcf-pour-entree-express",
    title: "Immigration — Quel score TCF pour Entrée Express ?",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau Tous Niveaux. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "Tous Niveaux",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Tableau de référence rapide</h4>
              <div className="border border-slate-100 rounded-xl overflow-hidden text-sm">
                <div className="bg-slate-50 p-3 font-semibold border-b border-slate-100 flex justify-between">
                  <span>Élément</span>
                  <span>Usage recommandé</span>
                </div>
                <div className="p-3 border-b border-slate-100 flex justify-between">
                  <strong>Niveau B2</strong>
                  <span className="text-gray-600">Expression claire avec nuances de base</span>
                </div>
                <div className="p-3 flex justify-between">
                  <strong>Niveau C1 / C2</strong>
                  <span className="text-gray-600">Maîtrise complète avec flexibilité et style</span>
                </div>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'entraînement</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour vous approprier ces notions, lisez régulièrement des articles de presse française (Le Monde, Le Figaro) et observez comment les journalistes structurent leurs transitions.
              </p>
      
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 text-sm mb-3">📝 Mini-Quiz d'auto-évaluation</h4>
                <div className="space-y-3 text-xs">
                  <p className="font-semibold text-slate-700">Quelle tournure exprime au mieux une nuance formelle ?</p>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded border border-slate-150">A) "Mais je pense que..."</div>
                    <div className="p-2 bg-white rounded border border-slate-150 font-medium text-emerald-700">B) "Néanmoins, force est de constater que..." (Correct)</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "tcf-ou-tef-lequel-choisir",
    title: "Immigration — TCF Canada vs TEF Canada : lequel choisir ?",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau Tous Niveaux. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "Tous Niveaux",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-purple-900 text-sm mb-1">📌 Point important à retenir</h4>
                <p className="text-purple-700 text-xs leading-relaxed">
                  Dans la tâche de type comparaison ou synthèse, l'équilibre des parties est primordial. Consacrez un volume de rédaction similaire pour chaque point de vue.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Structure recommandée pour viser le CLB 9+</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Introduction :</strong> Présentation neutre du thème général.</p>
                <p><strong>Partie 1 :</strong> Avantages et perspectives favorables.</p>
                <p><strong>Partie 2 :</strong> Limites et objections constructives.</p>
                <p><strong>Conclusion :</strong> Bilan synthétique et prise de position personnelle.</p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Modèle de réponse rédigé (Extrait)</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-700 italic">
                "En somme, s'il est indéniable que cette technologie facilite le quotidien, elle pose d'importants défis éthiques qui ne sauraient être ignorés."
              </div>
            </div>
    )
  },
  {
    id: "comprendre-niveaux-clb-niveaux-nclc",
    title: "Immigration — Comprendre la correspondance des niveaux CLB et NCLC",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau Tous Niveaux. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "Tous Niveaux",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Tableau de référence rapide</h4>
              <div className="border border-slate-100 rounded-xl overflow-hidden text-sm">
                <div className="bg-slate-50 p-3 font-semibold border-b border-slate-100 flex justify-between">
                  <span>Élément</span>
                  <span>Usage recommandé</span>
                </div>
                <div className="p-3 border-b border-slate-100 flex justify-between">
                  <strong>Niveau B2</strong>
                  <span className="text-gray-600">Expression claire avec nuances de base</span>
                </div>
                <div className="p-3 flex justify-between">
                  <strong>Niveau C1 / C2</strong>
                  <span className="text-gray-600">Maîtrise complète avec flexibilité et style</span>
                </div>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Exemples d'entraînement</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour vous approprier ces notions, lisez régulièrement des articles de presse française (Le Monde, Le Figaro) et observez comment les journalistes structurent leurs transitions.
              </p>
      
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 text-sm mb-3">📝 Mini-Quiz d'auto-évaluation</h4>
                <div className="space-y-3 text-xs">
                  <p className="font-semibold text-slate-700">Quelle tournure exprime au mieux une nuance formelle ?</p>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded border border-slate-150">A) "Mais je pense que..."</div>
                    <div className="p-2 bg-white rounded border border-slate-150 font-medium text-emerald-700">B) "Néanmoins, force est de constater que..." (Correct)</div>
                  </div>
                </div>
              </div>
            </div>
    )
  },
  {
    id: "combien-temps-preparer-tcf-canada",
    title: "Immigration — Combien de temps faut-il pour préparer le TCF Canada ?",
    excerpt: "Maîtrisez les clés de l'épreuve de Cheat Sheet pour le niveau Tous Niveaux. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.",
    category: "Cheat Sheet",
    readTime: "6 min de lecture",
    date: "06 juin 2026",
    author: "Équipe Évora",
    difficulty: "Tous Niveaux",
    badgeColor: "#8b5cf6",
    bgColor: "hsl(262, 80%, 97%)",
    content: (
      <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
              L'épreuve de <strong>Cheat Sheet</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
            </p>
      
              <div className="bg-purple-50/50 border border-purple-200 p-4 rounded-xl">
                <h4 className="font-bold text-purple-900 text-sm mb-2">📚 Boîte à Vocabulaire clé</h4>
                <ul className="space-y-2 text-xs text-purple-950">
                  <li><strong>S'avérer :</strong> Se révéler être de façon indiscutable.</li>
                  <li><strong>Sous-tendre :</strong> Être la base de, soutenir de manière invisible.</li>
                  <li><strong>Nonobstant :</strong> Malgré (registre très soutenu).</li>
                </ul>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">1. Fiche Stratégie d'Examen</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <p className="leading-relaxed">
                  Consacrez toujours les 2 premières minutes de votre épreuve à bâtir un schéma conceptuel. Ne rédigez pas directement : listez vos mots-clés et organisez-les selon un enchaînement logique rigoureux.
                </p>
              </div>
      
              <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Plan d'Action Recommandé</h4>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">1</span>
                  <div className="leading-relaxed">Sélectionner 3 expressions clés à placer obligatoirement.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">2</span>
                  <div className="leading-relaxed">Rédiger les introductions et les conclusions au brouillon.</div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">3</span>
                  <div className="leading-relaxed">Vérifier systématiquement les accords de verbes et d'adjectifs.</div>
                </div>
              </div>
            </div>
    )
  }
];
