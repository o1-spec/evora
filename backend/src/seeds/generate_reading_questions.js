const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const outputFileName = 'reading_questions.json';
const frontendDestPath = path.join(__dirname, '../../../frontend/src/lib/', outputFileName);
const backendDestPath = path.join(__dirname, outputFileName);

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const USE_OLLAMA = process.env.USE_OLLAMA === 'true' || !OPENAI_API_KEY;
const OLLAMA_BASE = process.env.OLLAMA_API_URL ? process.env.OLLAMA_API_URL.replace('/v1','') : 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.1:latest';

async function generateSingleQuestion(seriesId, questionNum) {
  // Determine difficulty
  let difficulty = 'B1';
  let points = 5;
  let questionLanguage = 'French';
  let contextDescription = '';

  if (questionNum <= 6) {
    difficulty = 'A1';
    points = 3;
    questionLanguage = 'English';
    contextDescription = 'Very short French text (classified ad, public announcement, flyer, invitation card, short personal email). Focuses on basic facts. The question itself must be in English.';
  } else if (questionNum <= 13) {
    difficulty = 'A2';
    points = 3;
    questionLanguage = 'English';
    contextDescription = 'Short French text (train station bulletin, library policy, store return policy, email notice, hotel sign). Focuses on simple everyday facts. The question itself must be in English.';
  } else if (questionNum <= 20) {
    difficulty = 'B1';
    points = 5;
    questionLanguage = 'French';
    contextDescription = 'Medium-length French text (workplace memo, brief news report, company announcement, consumer warning). Focuses on main ideas. The question and options must be in French.';
  } else if (questionNum <= 26) {
    difficulty = 'B2';
    points = 5;
    questionLanguage = 'French';
    contextDescription = 'Medium-length complex French text (opinion columns, workplace regulations, educational technology debates, cultural reports). Focuses on details and main thesis. The question and options must be in French.';
  } else if (questionNum <= 32) {
    difficulty = 'C1';
    points = 8;
    questionLanguage = 'French';
    contextDescription = 'Complex, dense, long French text (philosophical essays, socio-economic columns, literary critiques, scientific debates). Focuses on implicit meaning, nuance, and logical synthesis. The question and options must be in French.';
  } else {
    difficulty = 'C2';
    points = 8;
    questionLanguage = 'French';
    contextDescription = 'Highly complex, abstract, dense academic French text (societal critiques, advanced scientific/literary editorials, historical reflections). Focuses on subtle viewpoints, ironies, and implicit logical flow. The question and options must be in French.';
  }

  const prompt = `You are an expert TCF Canada (Test de connaissance du français) examiner.
Generate exactly ONE high-fidelity, highly realistic Reading Comprehension (Compréhension Écrite) multiple-choice question (MCQ) for practice exam Series #${seriesId}.

Question specifications:
- Question Number within Series: ${questionNum} (Progressive order from 1 to 39)
- Difficulty Level: "${difficulty}"
- Weight/Points: ${points} points
- Language of Question Text: ${questionLanguage}
- Context/Topic requirement: ${contextDescription}

JSON Output Requirement:
You MUST respond with a single valid JSON object matching this exact structure:
{
  "seriesId": ${seriesId},
  "id": <Absolute question sequential ID matching the pattern: (seriesId - 1) * 39 + questionNum>,
  "difficulty": "${difficulty}",
  "points": ${points},
  "sectionTitle": "<Context genre in English, e.g. 'Classified Ad', 'Editorial Critique', 'Workplace Notice'>",
  "posterText": "<The French reading passage. Use \\n for line breaks>",
  "questionText": "<The question text in ${questionLanguage}>",
  "options": [
    "<Option A choice in ${questionLanguage === 'English' ? 'English' : 'French'}>",
    "<Option B choice in ${questionLanguage === 'English' ? 'English' : 'French'}>",
    "<Option C choice in ${questionLanguage === 'English' ? 'English' : 'French'}>",
    "<Option D choice in ${questionLanguage === 'English' ? 'English' : 'French'}>"
  ],
  "correctKey": "<A | B | C | D>"
}`;

  let responseText = '';
  
  if (OPENAI_API_KEY && !USE_OLLAMA) {
    const res = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.4,
        response_format: { type: 'json_object' }
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 60000
      }
    );
    responseText = res.data.choices[0].message.content;
  } else {
    const res = await axios.post(
      `${OLLAMA_BASE}/api/generate`,
      {
        model: OLLAMA_MODEL,
        prompt: prompt,
        format: 'json',
        stream: false,
        options: { temperature: 0.4, num_predict: 2000 }
      },
      { timeout: 240000 }
    );
    responseText = res.data.response;
    if (responseText === undefined || responseText === null) {
      responseText = typeof res.data === 'string' ? res.data : JSON.stringify(res.data);
    }
  }

  if (!responseText) throw new Error('Empty response from model');

  // Aggressively extract JSON object from response
  let cleaned = String(responseText).trim();
  cleaned = cleaned.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();

  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace === -1 || lastBrace === -1 || lastBrace < firstBrace) {
    throw new Error('No valid JSON object structure found in response');
  }

  const q = JSON.parse(cleaned.slice(firstBrace, lastBrace + 1));

  // Normalize and validate properties
  q.seriesId = seriesId;
  q.id = (seriesId - 1) * 39 + questionNum;
  q.difficulty = difficulty;
  q.points = points;
  
  if (!q.sectionTitle) q.sectionTitle = 'TCF Reading Exercise';
  if (!q.posterText) q.posterText = 'Texte manquant';
  if (!q.questionText) q.questionText = 'Question manquante';
  
  if (!Array.isArray(q.options) && q.choices) q.options = q.choices;
  if (!Array.isArray(q.options)) q.options = ['A', 'B', 'C', 'D'];
  while (q.options.length < 4) q.options.push(`Option ${String.fromCharCode(65 + q.options.length)}`);
  q.options = q.options.slice(0, 4);

  q.correctKey = q.correctKey || q.correct_answer || q.answer || 'A';
  const key = String(q.correctKey).toUpperCase().trim();
  q.correctKey = ['A','B','C','D'].includes(key) ? key : 'A';

  return q;
}

async function run() {
  console.log('🏁 Starting Granular Question-by-Question Reading Comprehension Generator...');
  console.log(`⚙️  Configuration: Engine=${OPENAI_API_KEY && !USE_OLLAMA ? 'OpenAI GPT-4o-mini' : 'Ollama (' + OLLAMA_MODEL + ')'}`);

  let existingData = [];
  if (fs.existsSync(backendDestPath)) {
    try {
      existingData = JSON.parse(fs.readFileSync(backendDestPath, 'utf8'));
      console.log(`📂 Loaded existing cache file with ${existingData.length} questions.`);
    } catch (e) {
      console.log('⚠️ Failed to parse existing cache file. Starting fresh.');
    }
  }

  // Map existing questions by ID to avoid re-generating
  const existingMap = new Map(existingData.map(q => [q.id, q]));

  for (let s = 1; s <= 10; s++) {
    console.log(`\n======================================================`);
    console.log(`🚀 Processing Series #${s}/10...`);
    console.log(`======================================================`);

    for (let qNum = 1; qNum <= 39; qNum++) {
      const absoluteId = (s - 1) * 39 + qNum;

      if (existingMap.has(absoluteId)) {
        // Skip already-completed questions
        continue;
      }

      let retries = 3;
      while (retries > 0) {
        try {
          console.log(` ➡️ Generating Question #${qNum}/39 of Series #${s} (Absolute ID: ${absoluteId})...`);
          const newQuestion = await generateSingleQuestion(s, qNum);
          
          // Re-load cache to avoid race conditions with multiple writers
          let freshCache = [];
          if (fs.existsSync(backendDestPath)) {
            try {
              freshCache = JSON.parse(fs.readFileSync(backendDestPath, 'utf8'));
            } catch(e) {}
          }

          // Filter out any duplicates
          freshCache = freshCache.filter(item => item.id !== absoluteId);
          freshCache.push(newQuestion);
          freshCache.sort((a, b) => a.id - b.id);

          // Update active map
          existingMap.set(absoluteId, newQuestion);

          // Save synchronously to backend and copy to frontend
          fs.writeFileSync(backendDestPath, JSON.stringify(freshCache, null, 2), 'utf8');
          try {
            fs.writeFileSync(frontendDestPath, JSON.stringify(freshCache, null, 2), 'utf8');
          } catch (err) {
            console.log(' ⚠️ Could not copy to frontend dir yet:', err.message);
          }

          console.log(`   ✅ Question #${qNum} saved! (Total Questions in Cache: ${freshCache.length})`);
          break;
        } catch (err) {
          retries--;
          console.error(`   ❌ Error generating Question #${qNum} (Retries left: ${retries}):`, err.message);
          if (retries === 0) {
            console.error('🛑 Fatal: generation stopped due to consecutive failures. Run the script again to resume.');
            process.exit(1);
          }
          await new Promise(resolve => setTimeout(resolve, 4000));
        }
      }
    }
    console.log(`🎉 Completed Series #${s}!`);
  }

  console.log('\n🎉 ALL 40 SERIES COMPLETED SUCCESSFULLY!');
}

run();
