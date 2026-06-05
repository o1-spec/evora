const fs = require('fs');
const path = require('path');

// 1. Manually parse backend .env file to load configuration
function loadBackendEnv() {
  const dotenvPath = path.join(__dirname, '../../backend/.env');
  if (fs.existsSync(dotenvPath)) {
    const envContent = fs.readFileSync(dotenvPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.\-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
        process.env[key] = value;
      }
    });
  }
}

loadBackendEnv();

const OLLAMA_BASE = process.env.OLLAMA_API_URL ? process.env.OLLAMA_API_URL.replace('/v1', '') : "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.1:latest";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const USE_OLLAMA = process.env.USE_OLLAMA === "true";

// Helper to query OpenAI API using native fetch
async function queryOpenAI(systemPrompt, userPrompt) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7
    })
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API request failed: ${response.statusText} - ${errorText}`);
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
}

// Helper to query Ollama using native fetch (OpenAI compatible endpoint)
async function queryOllama(systemPrompt, userPrompt) {
  const ollamaUrl = `${OLLAMA_BASE}/v1/chat/completions`;
  const response = await fetch(ollamaUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.6
    })
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ollama API request failed: ${response.statusText} - ${errorText}`);
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
}

// Check if any LLM service is available and running
async function checkLLMAvailability() {
  if (OPENAI_API_KEY) {
    return "openai";
  }
  if (USE_OLLAMA) {
    try {
      const response = await fetch(`${OLLAMA_BASE}/api/tags`, { method: 'GET', signal: AbortSignal.timeout(2000) });
      if (response.ok) {
        return "ollama";
      }
    } catch (e) {
      // Ollama not listening
    }
  }
  return "mock";
}

// Generate premium mock articles in French when no LLM is configured
function generateMockContent(topic) {
  const { title, category, difficulty, template } = topic;
  
  let badgeColor = '#8b5cf6';
  let bgColor = 'hsl(262, 80%, 97%)';
  let themeClass = 'purple';
  
  if (category === 'Grammaire') {
    badgeColor = '#d97706';
    bgColor = 'hsl(45, 100%, 96%)';
    themeClass = 'amber';
  } else if (category === 'Expression Écrite') {
    badgeColor = '#10b981';
    bgColor = 'hsl(149, 80%, 96%)';
    themeClass = 'emerald';
  } else if (category === 'Expression Orale') {
    badgeColor = '#f97316';
    bgColor = 'hsl(31, 100%, 97%)';
    themeClass = 'orange';
  } else if (category === 'Compréhension') {
    badgeColor = '#3b82f6';
    bgColor = 'hsl(226, 100%, 97%)';
    themeClass = 'blue';
  }

  const excerpt = `Maîtrisez les clés de l'épreuve de ${category} pour le niveau ${difficulty}. Cet article vous offre des fiches pratiques, des conseils d'examinateurs et des exemples concrets pour optimiser votre score au TCF Canada.`;

  const intro = `<p className="text-gray-600 leading-relaxed text-base">
        L'épreuve de <strong>${category}</strong> est un élément déterminant pour obtenir un score élevé (CLB 7 à 9+) au TCF Canada. Une préparation ciblée, combinant l'acquisition de structures grammaticales rigoureuses et la compréhension des attentes de la grille d'évaluation, est indispensable pour réussir sereinement le jour de l'examen.
      </p>`;

  let contentTSX = '';

  if (template === 'A') {
    contentTSX = `      <div className="space-y-6">
        ${intro}

        <div className="border-l-4 border-${themeClass}-500 bg-${themeClass}-50 p-4 rounded-r-lg">
          <h4 className="font-bold text-${themeClass}-900 text-sm mb-1">💡 Règle d'or de l'examinateur</h4>
          <p className="text-${themeClass}-700 text-xs leading-relaxed">
            Pour le niveau ${difficulty}, évitez de répéter les mêmes expressions basiques. Structurez vos idées de manière rigoureuse en utilisant un lexique varié et adapté.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Les concepts clés</h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
              <strong className="text-${themeClass}-700 block">Structure fondamentale</strong>
              Toujours poser le cadre logique avant de développer vos arguments.
            </li>
            <li className="p-3 bg-slate-50 rounded-lg text-slate-700">
              <strong className="text-${themeClass}-700 block">Richesse lexicale</strong>
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
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-${themeClass}-500 mt-2" />
              <div>L'abus de connecteurs répétitifs comme "parce que" ou "mais".</div>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-gray-600">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-${themeClass}-500 mt-2" />
              <div>Le manque de clarté dans la liaison entre les paragraphes.</div>
            </div>
          </div>
        </div>
      </div>`;
  } else if (template === 'B') {
    contentTSX = `      <div className="space-y-6">
        ${intro}

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
      </div>`;
  } else if (template === 'C') {
    contentTSX = `      <div className="space-y-6">
        ${intro}

        <div className="bg-${themeClass}-50/50 border border-${themeClass}-200 p-4 rounded-xl">
          <h4 className="font-bold text-${themeClass}-900 text-sm mb-2">📚 Boîte à Vocabulaire clé</h4>
          <ul className="space-y-2 text-xs text-${themeClass}-950">
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
            <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-${themeClass}-100 text-${themeClass}-800 font-bold text-[10px]">1</span>
            <div className="leading-relaxed">Sélectionner 3 expressions clés à placer obligatoirement.</div>
          </div>
          <div className="flex items-start gap-3 text-xs text-slate-700">
            <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-${themeClass}-100 text-${themeClass}-800 font-bold text-[10px]">2</span>
            <div className="leading-relaxed">Rédiger les introductions et les conclusions au brouillon.</div>
          </div>
          <div className="flex items-start gap-3 text-xs text-slate-700">
            <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-${themeClass}-100 text-${themeClass}-800 font-bold text-[10px]">3</span>
            <div className="leading-relaxed">Vérifier systématiquement les accords de verbes et d'adjectifs.</div>
          </div>
        </div>
      </div>`;
  } else if (template === 'D') {
    contentTSX = `      <div className="space-y-6">
        ${intro}

        <h4 className="font-bold text-lg text-slate-800 border-b pb-2">1. Analyse approfondie du sujet</h4>
        <p className="text-sm text-gray-600 leading-relaxed">
          Pour atteindre le niveau ${difficulty}, votre argumentation doit reposer sur des concepts sociologiques ou économiques globaux plutôt que sur de simples anecdotes personnelles. L'examinateur recherche un esprit de synthèse analytique développé.
        </p>

        <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">2. Simulation / Modèle type</h4>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm font-mono text-slate-700">
          <p className="italic">"Monsieur l'Examinateur,<br/>
          Je partage en partie ce point de vue. Néanmoins, il convient de pondérer cette affirmation..."</p>
        </div>

        <h4 className="font-bold text-lg text-slate-800 border-b pb-2 mt-6">3. Grille d'évaluation : ce que cherche l'examinateur</h4>
        <div className="space-y-3 mt-3">
          <div className="flex items-start gap-2.5 text-sm text-gray-600">
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-${themeClass}-500 mt-2" />
            <div><strong>Coordonner :</strong> Aisance et clarté du débit de parole.</div>
          </div>
          <div className="flex items-start gap-2.5 text-sm text-gray-600">
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-${themeClass}-500 mt-2" />
            <div><strong>Précision :</strong> Utilisation d'un lexique très précis et varié.</div>
          </div>
        </div>
      </div>`;
  } else if (template === 'E') {
    contentTSX = `      <div className="space-y-6">
        ${intro}

        <div className="border-l-4 border-${themeClass}-500 bg-${themeClass}-50 p-4 rounded-r-lg">
          <h4 className="font-bold text-${themeClass}-900 text-sm mb-1">📌 Point important à retenir</h4>
          <p className="text-${themeClass}-700 text-xs leading-relaxed">
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
      </div>`;
  }

  const badgeColorMapping = {
    'Cheat Sheet': '#8b5cf6',
    'Grammaire': '#d97706',
    'Expression Écrite': '#10b981',
    'Expression Orale': '#f97316',
    'Compréhension': '#3b82f6'
  };

  const bgColorMapping = {
    'Cheat Sheet': 'hsl(262, 80%, 97%)',
    'Grammaire': 'hsl(45, 100%, 96%)',
    'Expression Écrite': 'hsl(149, 80%, 96%)',
    'Expression Orale': 'hsl(31, 100%, 97%)',
    'Compréhension': 'hsl(226, 100%, 97%)'
  };

  return {
    id: topic.id,
    title,
    excerpt,
    category,
    readTime: '6 min de lecture',
    date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }),
    author: 'Équipe Évora',
    difficulty,
    badgeColor: badgeColorMapping[category] || '#8b5cf6',
    bgColor: bgColorMapping[category] || 'hsl(262, 80%, 97%)',
    contentTSX
  };
}

// Parse topics directly from blogTopics.ts string
function parseTopicsFromContentMap() {
  const topicsFilePath = path.join(__dirname, '../src/lib/blogTopics.ts');
  if (!fs.existsSync(topicsFilePath)) {
    console.error("❌ blogTopics.ts content map does not exist.");
    process.exit(1);
  }
  
  const topicsFile = fs.readFileSync(topicsFilePath, 'utf8');
  const arrayMatch = topicsFile.match(/export const BLOG_TOPICS: BlogTopic\[\] = \[\s*([\s\S]*?)\s*\];/);
  if (!arrayMatch) {
    console.error("❌ Could not parse BLOG_TOPICS array from blogTopics.ts.");
    process.exit(1);
  }

  const itemsText = arrayMatch[1];
  const objectBlocks = itemsText.split('},').map(s => s.trim());
  const topics = [];
  
  const getFieldValue = (block, fieldName) => {
    const regex = new RegExp(`${fieldName}:\\s*(?:"([^"]*)"|'([^']*)')`);
    const match = block.match(regex);
    if (match) {
      return match[1] !== undefined ? match[1] : match[2];
    }
    return null;
  };

  for (let block of objectBlocks) {
    if (!block) continue;
    if (!block.endsWith('}')) block += '}';
    
    const id = getFieldValue(block, 'id');
    const category = getFieldValue(block, 'category');
    const title = getFieldValue(block, 'title');
    const difficulty = getFieldValue(block, 'difficulty');
    const template = getFieldValue(block, 'template');
    
    if (id && category && title && difficulty && template) {
      topics.push({ id, category, title, difficulty, template });
    }
  }
  
  return topics;
}

// Generate the blog post content using LLM AI
async function generateAIContent(llmService, topic) {
  const systemPrompt = `You are an expert TCF Canada (Test de connaissance du français) instructor and professional French content creator.
Generate a comprehensive, educational blog post article in French about TCF preparation.
Category: ${topic.category}
Difficulty: ${topic.difficulty}
Template Style Required: ${topic.template}

Layout specifications based on Template Style:
- Template A: Intro paragraph, callout block ("💡 Règle d'or de l'examinateur"), subtitle "1. Les concepts clés" followed by a list of key items inside 50px vertical spacing cards, subtitle "2. Exemples d'application pratique" with blocks of examples, subtitle "3. Erreurs fréquentes à éviter" with a custom list of items, and a summary.
- Template B: Intro paragraph, subtitle "1. Tableau de référence rapide" containing a grid-based comparison table, subtitle "2. Exemples d'entraînement", subtitle "3. Mini-Quiz d'auto-évaluation" with 1-2 questions and answers, and a summary.
- Template C: Intro paragraph, callout box ("📚 Boîte à Vocabulaire clé"), subtitle "1. Fiche Stratégie d'Examen" with strategic concepts, subtitle "2. Plan d'Action Recommandé" containing a numbered checklist, and a summary.
- Template D: Intro paragraph, subtitle "1. Analyse approfondie du sujet" detailing examiner grading rubrics, subtitle "2. Simulation / Modèle type" with a sample letter/dialogue text, subtitle "3. Grille d'évaluation : ce que cherche l'examinateur", and a conclusion.
- Template E: Intro paragraph, callout block ("📌 Point important à retenir"), subtitle "1. Structure recommandée pour viser le CLB 9+" breaking down sections, subtitle "2. Modèle de réponse rédigé (Extrait)" showing a gold-standard response, and a summary.

CRITICAL RULES FOR RENDER SAFETY:
1. You MUST return a valid JSON object. Do not wrap the JSON output in markdown blocks (like \`\`\`json). Return ONLY the raw JSON string.
2. The JSON object MUST have exactly two keys:
   - "excerpt": A 2-3 sentence, engaging preview summary in French (max 60 words).
   - "contentTSX": A string containing the React JSX/TSX layout (enclosed in a single outer container \`<div className="space-y-6">...</div>\`).
3. Inside "contentTSX", DO NOT USE standard browser HTML list tags (\`<ul>\` or \`<ol>\` with default browser bullet styles). Tailwind resets will hide them or make them overlap.
   - For lists, use custom flex rows: \`<div className="space-y-3 mt-3">\` wrapping rows like:
     \`<div className="flex items-start gap-2.5 text-sm text-gray-600">\`
       \`<span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-theme mt-2" />\`
       \`<div>...</div>\`
     \`</div>\`
   - For numbered badges: \`<span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-theme text-theme font-bold text-[10px]">1</span>\`
4. Use standard classes like text-slate-800, leading-relaxed, text-sm, border-l-4, bg-emerald-50, etc. DO NOT import or use Lucide icons.
5. All text content (except keywords) must be written in fluent, grammatically correct French.
6. The TSX markup must compile perfectly in React (ensure all tags like <br/> or <hr/> are closed).`;

  const userPrompt = `Generate the blog article content for:
Title: "${topic.title}"
Category: "${topic.category}"
Difficulty: "${topic.difficulty}"
Template: "${topic.template}"`;

  let responseText = "";
  if (llmService === "openai") {
    responseText = await queryOpenAI(systemPrompt, userPrompt);
  } else {
    responseText = await queryOllama(systemPrompt, userPrompt);
  }

  let cleaned = responseText.trim();
  cleaned = cleaned
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace < firstBrace) {
    throw new Error("No JSON object found in LLM response.");
  }
  
  const parsed = JSON.parse(cleaned.slice(firstBrace, lastBrace + 1));
  if (!parsed.excerpt || !parsed.contentTSX) {
    throw new Error("Missing excerpt or contentTSX fields in LLM JSON response.");
  }

  // Adjust theme color mappings
  let badgeColor = '#8b5cf6';
  let bgColor = 'hsl(262, 80%, 97%)';
  let themeClass = 'purple';
  
  if (topic.category === 'Grammaire') {
    badgeColor = '#d97706';
    bgColor = 'hsl(45, 100%, 96%)';
    themeClass = 'amber';
  } else if (topic.category === 'Expression Écrite') {
    badgeColor = '#10b981';
    bgColor = 'hsl(149, 80%, 96%)';
    themeClass = 'emerald';
  } else if (topic.category === 'Expression Orale') {
    badgeColor = '#f97316';
    bgColor = 'hsl(31, 100%, 97%)';
    themeClass = 'orange';
  } else if (topic.category === 'Compréhension') {
    badgeColor = '#3b82f6';
    bgColor = 'hsl(226, 100%, 97%)';
    themeClass = 'blue';
  }

  return {
    id: topic.id,
    title: topic.title,
    excerpt: parsed.excerpt,
    category: topic.category,
    readTime: '6 min de lecture',
    date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }),
    author: 'Équipe Évora',
    difficulty: topic.difficulty,
    badgeColor,
    bgColor,
    contentTSX: parsed.contentTSX
  };
}

// Append generated post directly to the array inside blogPosts.tsx
function appendPostToBlogPostsFile(post) {
  const blogPostsFilePath = path.join(__dirname, '../src/lib/blogPosts.tsx');
  if (!fs.existsSync(blogPostsFilePath)) {
    console.error("❌ blogPosts.tsx file does not exist.");
    process.exit(1);
  }

  let fileContent = fs.readFileSync(blogPostsFilePath, 'utf8');

  // Find the closing bracket ]; of the blogPosts array
  const closingIndex = fileContent.lastIndexOf('];');
  if (closingIndex === -1) {
    throw new Error("Could not find the closing '];' of the blogPosts array inside blogPosts.tsx.");
  }

  // Build the TSX insertion string
  const cleanContentTSX = post.contentTSX
    .split('\n')
    .map(line => '      ' + line)
    .join('\n')
    .trim();

  const newPostStr = `,\n  {\n    id: "${post.id}",\n    title: "${post.title}",\n    excerpt: "${post.excerpt}",\n    category: "${post.category}",\n    readTime: "${post.readTime}",\n    date: "${post.date}",\n    author: "${post.author}",\n    difficulty: "${post.difficulty}",\n    badgeColor: "${post.badgeColor}",\n    bgColor: "${post.bgColor}",\n    content: (\n      ${cleanContentTSX}\n    )\n  }`;

  // Insert before the closing array bracket
  fileContent = fileContent.substring(0, closingIndex).trim() + newPostStr + '\n' + fileContent.substring(closingIndex);
  fs.writeFileSync(blogPostsFilePath, fileContent, 'utf8');
}

async function run() {
  console.log("📝 Evora Content Generation Pipeline starting...");
  
  // 1. Get batch size from CLI arguments (default 10)
  const args = process.argv.slice(2);
  const batchSize = parseInt(args[0], 10) || 10;
  console.log(`📦 Targeted Batch Size: ${batchSize} articles.`);

  // 2. Load Topics content map
  const allTopics = parseTopicsFromContentMap();
  console.log(`📂 Loaded content map with ${allTopics.length} total topics.`);

  // 3. Scan existing articles inside blogPosts.tsx
  const blogPostsFilePath = path.join(__dirname, '../src/lib/blogPosts.tsx');
  const blogPostsFileContent = fs.readFileSync(blogPostsFilePath, 'utf8');
  
  const existingIds = [];
  const regex = /id:\s*["']([^"']+)["']/g;
  let match;
  while ((match = regex.exec(blogPostsFileContent)) !== null) {
    existingIds.push(match[1]);
  }
  
  console.log(`📂 Found ${existingIds.length} already generated articles in blogPosts.tsx.`);

  // 4. Identify missing topics
  const missingTopics = allTopics.filter(t => !existingIds.includes(t.id));
  console.log(`🔍 Found ${missingTopics.length} missing topics.`);

  if (missingTopics.length === 0) {
    console.log("✅ All 100 blog posts are already generated and present in blogPosts.tsx!");
    process.exit(0);
  }

  // 5. Select batch
  const batchTopics = missingTopics.slice(0, batchSize);
  console.log(`🚀 Starting generation of ${batchTopics.length} articles...`);

  // 6. Check LLM availability
  const llmService = await checkLLMAvailability();
  
  if (llmService === "mock") {
    console.log("⚠️ No active LLM connection found (Ollama not running, and OPENAI_API_KEY is empty).");
    console.log("💡 Switching to high-fidelity Mock Generator to demonstrate the pipeline...\n");
  } else {
    console.log(`🤖 LLM service detected: ${llmService.toUpperCase()}. Starting real AI content generation...\n`);
  }

  let generatedCount = 0;
  for (let topic of batchTopics) {
    console.log(`👉 [${generatedCount + 1}/${batchTopics.length}] Generating: "${topic.title}" (${topic.category} - Template ${topic.template})...`);
    
    let retries = 3;
    let post = null;
    
    while (retries > 0 && !post) {
      try {
        if (llmService === "mock") {
          post = generateMockContent(topic);
        } else {
          post = await generateAIContent(llmService, topic);
        }
      } catch (e) {
        retries--;
        console.error(`   ❌ Failed: ${e.message}. Retries left: ${retries}`);
        if (retries > 0) {
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
      }
    }
    
    if (post) {
      try {
        appendPostToBlogPostsFile(post);
        console.log(`   ✅ Saved successfully! ID: ${post.id}\n`);
        generatedCount++;
      } catch (writeError) {
        console.error(`   ❌ Failed to write post to file: ${writeError.message}`);
      }
    } else {
      console.error(`   ❌ Skiped topic "${topic.title}" due to generation errors.\n`);
    }
  }

  console.log("======================================================");
  console.log(`🎉 Batch completed! Successfully generated and saved ${generatedCount} articles.`);
  console.log(`📈 Academy size is now ${existingIds.length + generatedCount} / 100 articles.`);
  console.log("======================================================");
}

run();
