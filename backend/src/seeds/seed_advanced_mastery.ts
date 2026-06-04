import { prisma } from "../services/db.service";
import { ExerciseType } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

interface LessonSeed {
  title: string;
  description: string;
  vocabulary: any[];
  grammar: any;
  reading: string;
  exercises: any[];
}

interface ModuleSeed {
  title: string;
  description: string;
  lessons: LessonSeed[];
}

async function seedModuleData(levelId: string, modulePrefix: string, modulesData: ModuleSeed[], startOrderIdx: number) {
  let currentOrderIdx = startOrderIdx;

  for (let mIdx = 0; mIdx < modulesData.length; mIdx++) {
    const modSeed = modulesData[mIdx];
    const moduleTitle = `${modulePrefix}${modSeed.title}`;
    console.log(`   📦 Seeding Module: "${moduleTitle}" (orderIndex: ${currentOrderIdx})`);

    const moduleRecord = await prisma.module.create({
      data: {
        levelId: levelId,
        title: moduleTitle,
        description: modSeed.description,
        orderIndex: currentOrderIdx
      }
    });

    currentOrderIdx++;

    // Seed lessons for this module
    for (let lIdx = 0; lIdx < modSeed.lessons.length; lIdx++) {
      const lessonSeed = modSeed.lessons[lIdx];
      console.log(`      📖 Seeding Lesson: "${lessonSeed.title}"`);

      const lessonRecord = await prisma.lesson.create({
        data: {
          moduleId: moduleRecord.id,
          title: lessonSeed.title,
          description: lessonSeed.description,
          orderIndex: lIdx + 1,
          content: {
            vocabulary: lessonSeed.vocabulary,
            grammar: lessonSeed.grammar,
            reading: lessonSeed.reading
          }
        }
      });

      // Seed exercises for this lesson
      for (let exIdx = 0; exIdx < lessonSeed.exercises.length; exIdx++) {
        const exSeed = lessonSeed.exercises[exIdx];
        
        let typeVal: ExerciseType = ExerciseType.MULTIPLE_CHOICE;
        if (exSeed.type === "FILL_IN_THE_BLANK") {
          typeVal = ExerciseType.FILL_IN_THE_BLANK;
        } else if (exSeed.type === "WRITING") {
          typeVal = ExerciseType.WRITING;
        } else if (exSeed.type === "SPEAKING") {
          typeVal = ExerciseType.SPEAKING;
        }

        await prisma.exercise.create({
          data: {
            lessonId: lessonRecord.id,
            type: typeVal,
            question: exSeed.question,
            options: exSeed.options || null,
            correctKey: exSeed.correctKey,
            points: exSeed.points || 10
          }
        });
      }
    }
  }

  return currentOrderIdx - startOrderIdx; // return count of modules created
}

async function loadJsonFile(fileName: string): Promise<ModuleSeed[]> {
  const jsonPath = path.join(__dirname, fileName);
  if (!fs.existsSync(jsonPath)) {
    throw new Error(`JSON file not found at ${jsonPath}`);
  }
  const rawData = fs.readFileSync(jsonPath, "utf-8");
  return JSON.parse(rawData);
}

async function main() {
  console.log("🌱 Starting Advanced & Mastery Seeding (B2, C1, C2)...");

  // =========================================================================
  // 1. SEED LEVEL B2
  // =========================================================================
  console.log("\n--- Seeding Level B2 ---");
  const levelB2 = await prisma.level.findUnique({ where: { code: "B2" } });
  if (!levelB2) {
    throw new Error("Level B2 not found in the database. Run seed_empty_academy.ts first.");
  }

  // Clear default empty B2 modules
  const b2DefaultTitles = ["Vocabulaire", "Grammaire", "Textes", "Débat oral"];
  await prisma.module.deleteMany({
    where: {
      levelId: levelB2.id,
      title: { in: b2DefaultTitles }
    }
  });

  // Clear existing seeded B2 modules to ensure idempotency
  await prisma.module.deleteMany({
    where: {
      levelId: levelB2.id,
      OR: [
        { title: { startsWith: "Vocabulary: " } },
        { title: { startsWith: "Grammar: " } },
        { title: { startsWith: "Writing: " } },
        { title: { startsWith: "Dialogue: " } }
      ]
    }
  });

  // Load JSON files
  const b2VocabData = await loadJsonFile("b2_vocabulary.json");
  const b2GrammarData = await loadJsonFile("b2_grammar.json");
  const b2DialogueData = await loadJsonFile("b2_dialogue.json");
  const b2WritingData = await loadJsonFile("b2_writing.json");

  let b2OrderIdx = 1;
  b2OrderIdx += await seedModuleData(levelB2.id, "Vocabulary: ", b2VocabData, b2OrderIdx);
  b2OrderIdx += await seedModuleData(levelB2.id, "Grammar: ", b2GrammarData, b2OrderIdx);
  b2OrderIdx += await seedModuleData(levelB2.id, "Dialogue: ", b2DialogueData, b2OrderIdx);
  b2OrderIdx += await seedModuleData(levelB2.id, "Writing: ", b2WritingData, b2OrderIdx);
  console.log("✅ Level B2 seeded successfully!");

  // =========================================================================
  // 2. SEED LEVEL C1
  // =========================================================================
  console.log("\n--- Seeding Level C1 ---");
  const levelC1 = await prisma.level.findUnique({ where: { code: "C1" } });
  if (!levelC1) {
    throw new Error("Level C1 not found in the database. Run seed_empty_academy.ts first.");
  }

  // Clear default empty C1 modules
  const c1DefaultTitles = ["Vocabulaire", "Grammaire", "Textes avancés", "Expression libre"];
  await prisma.module.deleteMany({
    where: {
      levelId: levelC1.id,
      title: { in: c1DefaultTitles }
    }
  });

  // Clear existing seeded C1 modules
  await prisma.module.deleteMany({
    where: {
      levelId: levelC1.id,
      OR: [
        { title: { startsWith: "Vocabulary: " } },
        { title: { startsWith: "Grammar: " } },
        { title: { startsWith: "Writing: " } },
        { title: { startsWith: "Dialogue: " } }
      ]
    }
  });

  // Load JSON files
  const c1VocabData = await loadJsonFile("c1_vocabulary.json");
  const c1GrammarData = await loadJsonFile("c1_grammar.json");
  const c1WritingData = await loadJsonFile("c1_writing.json");
  const c1FreeExpData = await loadJsonFile("c1_free_expression.json");

  let c1OrderIdx = 1;
  c1OrderIdx += await seedModuleData(levelC1.id, "Vocabulary: ", c1VocabData, c1OrderIdx);
  c1OrderIdx += await seedModuleData(levelC1.id, "Grammar: ", c1GrammarData, c1OrderIdx);
  c1OrderIdx += await seedModuleData(levelC1.id, "Dialogue: ", c1FreeExpData, c1OrderIdx);
  c1OrderIdx += await seedModuleData(levelC1.id, "Writing: ", c1WritingData, c1OrderIdx);
  console.log("✅ Level C1 seeded successfully!");

  // =========================================================================
  // 3. SEED LEVEL C2
  // =========================================================================
  console.log("\n--- Seeding Level C2 ---");
  const levelC2 = await prisma.level.findUnique({ where: { code: "C2" } });
  if (!levelC2) {
    throw new Error("Level C2 not found in the database. Run seed_empty_academy.ts first.");
  }

  // Clear default empty C2 modules
  const c2DefaultTitles = ["Littérature", "Stylistique", "Débats experts", "Masterclass"];
  await prisma.module.deleteMany({
    where: {
      levelId: levelC2.id,
      title: { in: c2DefaultTitles }
    }
  });

  // Clear existing seeded C2 modules
  await prisma.module.deleteMany({
    where: {
      levelId: levelC2.id,
      OR: [
        { title: { startsWith: "Literature: " } },
        { title: { startsWith: "Stylistic: " } },
        { title: { startsWith: "Débats experts: " } },
        { title: { startsWith: "Masterclass: " } }
      ]
    }
  });

  // Load JSON files
  const c2LiteratureData = await loadJsonFile("c2_literature.json");
  const c2StylistiqueData = await loadJsonFile("c2_stylistique.json");
  const c2DebatesExpData = await loadJsonFile("c2_debates_experts.json");
  const c2MasterclassData = await loadJsonFile("c2_masterclass.json");

  let c2OrderIdx = 1;
  c2OrderIdx += await seedModuleData(levelC2.id, "Literature: ", c2LiteratureData, c2OrderIdx);
  c2OrderIdx += await seedModuleData(levelC2.id, "Stylistic: ", c2StylistiqueData, c2OrderIdx);
  c2OrderIdx += await seedModuleData(levelC2.id, "Débats experts: ", c2DebatesExpData, c2OrderIdx);
  c2OrderIdx += await seedModuleData(levelC2.id, "Masterclass: ", c2MasterclassData, c2OrderIdx);
  console.log("✅ Level C2 seeded successfully!");

  console.log("\n🎉 All levels (B2, C1, C2) seeded successfully!");
}

main()
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
