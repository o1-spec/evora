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
  }
];
