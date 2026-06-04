import { prisma } from "../services/db.service";
import { ExerciseType } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("🌱 Seeding B1 Intermediate Grammar Content...");

  // Load JSON file
  const jsonPath = path.join(__dirname, "b1_grammar.json");
  if (!fs.existsSync(jsonPath)) {
    throw new Error(`JSON file not found at ${jsonPath}`);
  }
  const rawData = fs.readFileSync(jsonPath, "utf-8");
  const modulesData = JSON.parse(rawData);

  // Find Level B1
  const levelB1 = await prisma.level.findUnique({
    where: { code: "B1" }
  });

  if (!levelB1) {
    throw new Error("Level B1 not found in the database. Please run seed_empty_academy.ts first.");
  }

  // 1. Delete default empty 'Grammaire' module if it exists
  const defaultGrammarMod = await prisma.module.findFirst({
    where: {
      levelId: levelB1.id,
      title: "Grammaire"
    }
  });

  if (defaultGrammarMod) {
    console.log("🧹 Removing default empty 'Grammaire' module...");
    await prisma.module.delete({
      where: { id: defaultGrammarMod.id }
    });
  }

  // 2. Clean up any existing 'Grammar: *' modules to ensure idempotency
  const existingGrammarMods = await prisma.module.findMany({
    where: {
      levelId: levelB1.id,
      title: { startsWith: "Grammar: " }
    }
  });

  if (existingGrammarMods.length > 0) {
    console.log(`🧹 Removing ${existingGrammarMods.length} existing grammar modules to re-seed...`);
    for (const mod of existingGrammarMods) {
      await prisma.module.delete({
        where: { id: mod.id }
      });
    }
  }

  // Calculate starting orderIndex dynamically after vocabulary modules
  const vocabCount = await prisma.module.count({
    where: {
      levelId: levelB1.id,
      title: { startsWith: "Vocabulary: " }
    }
  });
  console.log(`ℹ️ Found ${vocabCount} Vocabulary modules. Grammar modules will start at orderIndex ${vocabCount + 1}.`);

  // 3. Create the B1 Grammar modules
  let startIdx = vocabCount + 1;
  for (let mIdx = 0; mIdx < modulesData.length; mIdx++) {
    const modSeed = modulesData[mIdx];
    const moduleTitle = `Grammar: ${modSeed.title}`;
    const orderIndexVal = startIdx + mIdx;
    console.log(`📦 Seeding Module: "${moduleTitle}" (orderIndex: ${orderIndexVal})`);

    const moduleRecord = await prisma.module.create({
      data: {
        levelId: levelB1.id,
        title: moduleTitle,
        description: modSeed.description,
        orderIndex: orderIndexVal
      }
    });

    // Seed lessons for this module
    for (let lIdx = 0; lIdx < modSeed.lessons.length; lIdx++) {
      const lessonSeed = modSeed.lessons[lIdx];
      console.log(`   📖 Seeding Lesson: "${lessonSeed.title}"`);

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

  // 4. Update the orderIndex of any other remaining modules (Dialogues, Écriture)
  const remainingB1Mods = await prisma.module.findMany({
    where: {
      levelId: levelB1.id,
      NOT: [
        { title: { startsWith: "Vocabulary: " } },
        { title: { startsWith: "Grammar: " } }
      ]
    },
    orderBy: { orderIndex: "asc" }
  });

  console.log("🔄 Updating order indices of other B1 modules...");
  let otherStartIdx = startIdx + modulesData.length;
  for (const mod of remainingB1Mods) {
    await prisma.module.update({
      where: { id: mod.id },
      data: { orderIndex: otherStartIdx }
    });
    console.log(`   - "${mod.title}" set to orderIndex ${otherStartIdx}`);
    otherStartIdx++;
  }

  console.log("✅ B1 Grammar seeding completed successfully!");
}

main()
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
