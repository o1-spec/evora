const fs = require("fs");
const path = require("path");
const axios = require("axios");

const OLLAMA_BASE = "http://localhost:11434";
const OLLAMA_MODEL = "llama3.1:latest";

const A2_STRUCTURE = {
  vocabulary: [
    {
      title: "Around Town and Travel",
      description:
        "Learn vocabulary for public transport, directions, hotel bookings, and tourist services.",
      lessons: [
        {
          title: "Public Transport",
          description:
            "Buying train/metro tickets, schedules, and transit vocabulary.",
        },
        {
          title: "Asking and Giving Directions",
          description:
            "Navigating streets, landmarks, and spatial prepositions.",
        },
        {
          title: "At the Hotel",
          description:
            "Checking in, room amenities, and basic lodging services.",
        },
      ],
    },
    {
      title: "Shopping and Daily Routines",
      description:
        "Learn food items, supermarket shopping, clothing sizes, and describing daily habits.",
      lessons: [
        {
          title: "At the Supermarket",
          description:
            "Groceries, quantities, food items, and checkout vocabulary.",
        },
        {
          title: "Shopping for Clothes",
          description:
            "Sizes, colors, material descriptions, and payment vocabulary.",
        },
        {
          title: "Daily Habits",
          description:
            "Reflexive actions, morning routines, chores, and household terms.",
        },
      ],
    },
    {
      title: "Workplace and Leisure",
      description:
        "Learn vocabulary for jobs, workplace items, sports, hobbies, and weekend getaways.",
      lessons: [
        {
          title: "At the Office",
          description:
            "Office supplies, jobs, daily tasks, and meeting vocabulary.",
        },
        {
          title: "Sports and Hobbies",
          description:
            "Talking about physical activities, games, instruments, and pastimes.",
        },
        {
          title: "Weekend Getaways",
          description:
            "Planning outdoor activities, excursions, and travel destinations.",
        },
      ],
    },
  ],
  grammar: [
    {
      title: "Past Tenses",
      description:
        "Learn to describe past events using Passé Composé and Imparfait.",
      lessons: [
        {
          title: "Passé Composé with Avoir",
          description:
            "Conjugations, regular and common irregular past participles.",
        },
        {
          title: "Passé Composé with Être",
          description:
            "Conjugations, agreement rules, and Dr & Mrs Vandertramp verbs.",
        },
        {
          title: "Passé Composé vs Imparfait",
          description:
            "Distinguishing completed actions in the past from background descriptions.",
        },
      ],
    },
    {
      title: "Future and Conditional Tenses",
      description: "Express future plans, projections, and polite requests.",
      lessons: [
        {
          title: "Futur Proche",
          description:
            "Using aller + infinitive to express immediate future plans.",
        },
        {
          title: "Futur Simple",
          description:
            "Conjugations, stems of common irregular verbs, and future events.",
        },
        {
          title: "Conditionnel Présent",
          description:
            "Polite expressions using vouloir, aimer, and basic conditional requests.",
        },
      ],
    },
    {
      title: "Pronouns and Prepositions",
      description:
        "Avoid repetition with object pronouns and navigate geographic prepositions.",
      lessons: [
        {
          title: "Direct Object Pronouns (COD)",
          description:
            "Replacing nouns with le, la, l', les in simple sentences.",
        },
        {
          title: "Indirect Object Pronouns (COI)",
          description: "Replacing people with lui, leur in sentences with à.",
        },
        {
          title: "Geographic Prepositions",
          description:
            "Prepositions used with cities and countries (en, au, aux, à).",
        },
      ],
    },
    {
      title: "Adjectives and Comparisons",
      description:
        "Describe items and people using comparisons and descriptor agreement.",
      lessons: [
        {
          title: "Comparatives and Superlatives",
          description:
            "Using plus/moins/aussi... que and superlatives (le plus, la plus).",
        },
        {
          title: "Placement of Adjectives",
          description:
            "Understanding rules for BAGS adjectives and adjectives placed after nouns.",
        },
        {
          title: "Adjective Agreement",
          description:
            "Singular, plural, masculine, and feminine forms of standard adjectives.",
        },
      ],
    },
    {
      title: "Negatives and Questions",
      description:
        "Construct advanced questions and complex negative structures.",
      lessons: [
        {
          title: "Complex Negation",
          description:
            "Using ne... plus, ne... jamais, ne... rien, ne... personne.",
        },
        {
          title: "Inversion Questions",
          description:
            "Asking formal questions by inverting verbs and pronouns.",
        },
        {
          title: "Questions with Est-ce que",
          description:
            "Standard question formation using est-ce que, qui, quoi, and comment.",
        },
      ],
    },
  ],
  dialogue: [
    {
      title: "Travel and Hospitality",
      description:
        "Practice Elementary dialogue scenarios for booking tickets, hotel interactions, and transit.",
      lessons: [
        {
          title: "Booking a Train Ticket",
          description: "Interaction at the ticket booth or information desk.",
        },
        {
          title: "Hotel Check-in",
          description:
            "Arriving at the hotel lobby, confirming a booking, and requesting amenities.",
        },
        {
          title: "At the Tourist Information Office",
          description:
            "Asking for maps, event recommendations, and city attractions.",
        },
      ],
    },
    {
      title: "Socializing and Dining",
      description:
        "Practice dialogues for making dinner plans, dining out, and hobby discussions.",
      lessons: [
        {
          title: "Inviting a Friend to Dinner",
          description:
            "A phone or messaging conversation planning a dinner date.",
        },
        {
          title: "Ordering a Multi-course Meal",
          description:
            "Interaction with waitstaff, selecting appetizers, mains, and desserts.",
        },
        {
          title: "Talking about Your Weekend",
          description:
            "Sharing excursion experiences and talking about leisure activities.",
        },
      ],
    },
    {
      title: "Services and Shopping",
      description:
        "Practice dialogues for shopping returns, supermarket checkouts, and local bakery visits.",
      lessons: [
        {
          title: "Reporting Lost Luggage",
          description:
            "Interaction with airport services describing a lost bag.",
        },
        {
          title: "Returning a Clothing Item",
          description: "Requesting a refund or exchange at a boutique.",
        },
        {
          title: "Shopping at the local Boulangerie",
          description:
            "Ordering artisanal bread, pastries, and completing a cash transaction.",
        },
      ],
    },
  ],
  writing: [
    {
      title: "Invitations and Messages",
      description: "Write simple A2 notes, invitations, and family messages.",
      lessons: [
        {
          title: "Inviting Someone to a Birthday",
          description: "Writing a friendly invitation with event details.",
        },
        {
          title: "Replying to an Invitation",
          description:
            "Accepting or declining an invitation with short explanations.",
        },
        {
          title: "Postcard from a Holiday Trip",
          description:
            "Describing holiday activities, weather, and warm regards.",
        },
      ],
    },
    {
      title: "Practical Requests and Forms",
      description:
        "Write simple request emails, notes of explanation, and fill out forms.",
      lessons: [
        {
          title: "Email to Inquire about a Class",
          description: "Requesting schedule, cost, and availability details.",
        },
        {
          title: "Writing a Simple Explanation Note",
          description: "Explaining absence from school or work due to illness.",
        },
        {
          title: "Filling out a Gym Registration Form",
          description:
            "Understanding personal data fields and completing registration details.",
        },
      ],
    },
  ],
};

async function generateLessonContent(
  category,
  moduleTitle,
  moduleDesc,
  lessonTitle,
  lessonDesc,
) {
  let categoryContext = "";
  if (category === "vocabulary") {
    categoryContext =
      "This is a Vocabulary lesson. Focus on 10 thematic A2 words/phrases, simple grammar explanation, and a short reading text using them. Exercises should test vocabulary and sentence comprehension.";
  } else if (category === "grammar") {
    categoryContext =
      "This is a Grammar lesson. Focus on grammatical structures, conjugation tables or rules, a reading text that displays the grammar pattern, and exercises that directly test this grammatical rule.";
  } else if (category === "dialogue") {
    categoryContext =
      'This is a Dialogue lesson. Focus on a situational dialogue. The "reading" section MUST be formatted as a conversational script between two speakers (e.g. "Client: ... \\n Vendeur: ..."). The vocabulary should be useful conversational phrases. Exercises must test dialogue comprehension.';
  } else if (category === "writing") {
    categoryContext =
      'This is a Writing lesson. Focus on correspondence layout (letters, emails, postcards, forms). The "reading" section should be a sample written letter, email, postcard, or form. Vocabulary should contain common phrases used in correspondence. Exercises should test writing layout and conventions.';
  }

  const prompt = `You are a professional examiner and content creator for Level A2 (Elementary) French learning material.
Generate the core learning material and exercises for the following lesson:
- Category: ${category.toUpperCase()}
- Module Title: "${moduleTitle}" (${moduleDesc})
- Lesson Title: "${lessonTitle}" (${lessonDesc})

Context Requirement:
${categoryContext}

You MUST return a single valid JSON object representing the lesson content. Do NOT wrap it in markdown code blocks. The JSON must match this structure exactly:
{
  "vocabulary": [
    { "french": "<A2 French word/phrase>", "english": "<English translation>" },
    ... (exactly 10 vocabulary objects)
  ],
  "grammar": {
    "title": "<A2 Grammar tip title relevant to this lesson>",
    "text": "<Simple explanation in English of the grammar rule with clear French/English examples>"
  },
  "reading": "<Reading text in French. For Dialogues, format as a dialogue script with speaker names. For Writing, format as a sample letter/email. Max 5-7 lines.>",
  "exercises": [
    ... (exactly 5 exercises: 3 of type "MULTIPLE_CHOICE", 2 of type "FILL_IN_THE_BLANK")
  ]
}

Exercise specifications:
1. For MULTIPLE_CHOICE:
   {
     "type": "MULTIPLE_CHOICE",
     "question": "<The question in English or French. For A2, questions can be in simple French or English.>",
     "options": [
       "<Choice A>",
       "<Choice B>",
       "<Choice C>",
       "<Choice D>"
     ],
     "correctKey": "<The correct option string, matching one of the options EXACTLY. Do NOT use A, B, C, D.>"
   }
2. For FILL_IN_THE_BLANK:
   {
     "type": "FILL_IN_THE_BLANK",
     "question": "For every FILL_IN_THE_BLANK exercise, the question field MUST contain the exact characters *** (e.g. 'Je *** du vélo.')",
     "correctKey": "<The exact missing word that goes in the blank, e.g. 'fais'>"
   }
`;

  const res = await axios.post(
    `${OLLAMA_BASE}/api/generate`,
    {
      model: OLLAMA_MODEL,
      prompt: prompt,
      format: "json",
      stream: false,
      options: { temperature: 0.4, num_predict: 2500 },
    },
    { timeout: 240000 },
  );

  let responseText = res.data.response;
  if (!responseText) throw new Error("Empty response from Ollama");

  let cleaned = String(responseText).trim();
  cleaned = cleaned
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace < firstBrace) {
    throw new Error("No valid JSON object structure found in response");
  }

  const lessonContent = JSON.parse(cleaned.slice(firstBrace, lastBrace + 1));

  // Ensure reading is a string. If it's an object/array, format it to a nice string!
  if (
    typeof lessonContent.reading === "object" &&
    lessonContent.reading !== null
  ) {
    if (Array.isArray(lessonContent.reading)) {
      lessonContent.reading = lessonContent.reading
        .map((item) => {
          if (typeof item === "object" && item !== null) {
            if (item.name && item.text) {
              return `${item.name}: ${item.text}`;
            }
            return JSON.stringify(item);
          }
          return String(item);
        })
        .join("\n");
    } else if (
      lessonContent.reading.speakers &&
      Array.isArray(lessonContent.reading.speakers)
    ) {
      lessonContent.reading = lessonContent.reading.speakers
        .map((sp) => {
          return `${sp.name}: ${sp.text}`;
        })
        .join("\n");
    } else if (lessonContent.reading.text) {
      let txt = "";
      if (lessonContent.reading.title) {
        txt += `${lessonContent.reading.title}\n\n`;
      }
      txt += lessonContent.reading.text;
      lessonContent.reading = txt;
    } else {
      lessonContent.reading = JSON.stringify(lessonContent.reading);
    }
  } else {
    lessonContent.reading = String(lessonContent.reading || "");
  }

  // Clean up any HTML tags and replace <br> with newlines
  lessonContent.reading = lessonContent.reading
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?[a-z][a-z0-9]*[^<>]*>/gi, "")
    .trim();

  // Validation checks
  if (
    !Array.isArray(lessonContent.vocabulary) ||
    lessonContent.vocabulary.length === 0
  ) {
    throw new Error("Invalid or missing vocabulary list");
  }
  if (
    !lessonContent.grammar ||
    !lessonContent.grammar.title ||
    !lessonContent.grammar.text
  ) {
    throw new Error("Invalid or missing grammar tip");
  }
  if (!lessonContent.reading) {
    throw new Error("Missing reading text");
  }

  // Normalize exercises
  if (!Array.isArray(lessonContent.exercises)) {
    lessonContent.exercises = [];
  }

  lessonContent.exercises = lessonContent.exercises.slice(0, 5);

  while (lessonContent.exercises.length < 5) {
    lessonContent.exercises.push({
      type: "FILL_IN_THE_BLANK",
      question: "Je voudrais *** informations.",
      correctKey: "des",
      points: 10
    });
  }

  for (const ex of lessonContent.exercises) {
    ex.points = 10;

    if (ex.type === "MULTIPLE_CHOICE") {
      if (!Array.isArray(ex.options)) {
        ex.options = [ex.correctKey || "Option A", "Option B", "Option C", "Option D"];
      }

      ex.options = ex.options.slice(0, 4);

      while (ex.options.length < 4) {
        ex.options.push(`Option ${ex.options.length + 1}`);
      }

      if (!ex.options.includes(ex.correctKey)) {
        ex.correctKey = ex.options[0];
      }
    }

    if (ex.type === "FILL_IN_THE_BLANK") {
      if (!ex.question.includes("***")) {
        ex.question = `Complétez la phrase : *** ${ex.question}`;
      }

      if (!ex.correctKey) {
        ex.correctKey = "le";
      }

      ex.options = null;
    }
  }

  return lessonContent;
}

async function generateCategory(category) {
  console.log(`\n======================================================`);
  console.log(`🚀 Generating Category: ${category.toUpperCase()}...`);
  console.log(`======================================================`);

  const destPath = path.join(__dirname, `a2_${category}.json`);
  let modulesList = [];

  // 1. Load cached state if it exists
  if (fs.existsSync(destPath)) {
    try {
      modulesList = JSON.parse(fs.readFileSync(destPath, "utf8"));
      console.log(
        `📂 Loaded existing cache with ${modulesList.length} modules.`,
      );
    } catch (e) {
      console.log(`⚠️ Failed to parse cache. Starting fresh for ${category}.`);
    }
  }

  const structure = A2_STRUCTURE[category];

  for (let mIdx = 0; mIdx < structure.length; mIdx++) {
    const modSeed = structure[mIdx];

    // Find or create module in cached list
    let existingMod = modulesList.find((m) => m.title === modSeed.title);
    if (!existingMod) {
      existingMod = {
        title: modSeed.title,
        description: modSeed.description,
        lessons: [],
      };
      modulesList.push(existingMod);
    }

    for (let lIdx = 0; lIdx < modSeed.lessons.length; lIdx++) {
      const lessonSeed = modSeed.lessons[lIdx];

      // Check if lesson is already generated in cache
      const existingLesson = existingMod.lessons.find(
        (l) => l.title === lessonSeed.title,
      );
      if (
        existingLesson &&
        existingLesson.vocabulary &&
        existingLesson.vocabulary.length > 0
      ) {
        console.log(`⏭️  Skipping completed Lesson: "${lessonSeed.title}"`);
        continue;
      }

      let retries = 6;
      while (retries > 0) {
        try {
          console.log(
            ` ➡️ Generating Lesson: "${lessonSeed.title}" inside "${modSeed.title}" (Retries left: ${retries - 1})...`,
          );
          const content = await generateLessonContent(
            category,
            modSeed.title,
            modSeed.description,
            lessonSeed.title,
            lessonSeed.description,
          );

          const completedLesson = {
            title: lessonSeed.title,
            description: lessonSeed.description,
            ...content,
          };

          // Update cache list and save synchronously
          const lIndex = existingMod.lessons.findIndex(
            (l) => l.title === lessonSeed.title,
          );
          if (lIndex !== -1) {
            existingMod.lessons[lIndex] = completedLesson;
          } else {
            existingMod.lessons.push(completedLesson);
          }

          fs.writeFileSync(
            destPath,
            JSON.stringify(modulesList, null, 2),
            "utf8",
          );
          console.log(
            `   ✅ Saved Lesson: "${lessonSeed.title}" successfully!`,
          );
          break;
        } catch (err) {
          retries--;
          console.error(
            `   ❌ Failed to generate Lesson: "${lessonSeed.title}" - Error:`,
            err.message,
          );
          if (retries === 0) {
            console.error("🛑 Too many consecutive failures. Exiting...");
            process.exit(1);
          }
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
      }
    }
  }

  console.log(`🎉 Category ${category.toUpperCase()} generation completed!`);
}

async function run() {
  console.log("🏁 Starting Ollama Level A2 Content Generator...");
  console.log(`⚙️  Configuration: Model=${OLLAMA_MODEL}, API=${OLLAMA_BASE}`);

  try {
    await generateCategory("vocabulary");
    await generateCategory("grammar");
    await generateCategory("dialogue");
    await generateCategory("writing");
    console.log("\n🌟 ALL CATEGORIES COMPLETED SUCCESSFULLY!");
  } catch (err) {
    console.error("💥 Fatal error in generator loop:", err);
    process.exit(1);
  }
}

run();
