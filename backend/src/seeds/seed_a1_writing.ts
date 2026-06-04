import { prisma } from "../services/db.service";
import { ExerciseType } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("🌱 Seeding A1 Beginner Writing Content...");

  // Load JSON file
  const jsonPath = path.join(__dirname, "a1_writing.json");
  if (!fs.existsSync(jsonPath)) {
    throw new Error(`JSON file not found at ${jsonPath}`);
  }
  const rawData = fs.readFileSync(jsonPath, "utf-8");
  const modulesData = JSON.parse(rawData);

  // Find Level A1
  const levelA1 = await prisma.level.findUnique({
    where: { code: "A1" }
  });

  if (!levelA1) {
    throw new Error("Level A1 not found in the database. Please run seed_empty_academy.ts first.");
  }

  // 1. Delete default empty 'Écriture' module if it exists
  const defaultWritingMod = await prisma.module.findFirst({
    where: {
      levelId: levelA1.id,
      title: "Écriture"
    }
  });

  if (defaultWritingMod) {
    console.log("🧹 Removing default empty 'Écriture' module...");
    await prisma.module.delete({
      where: { id: defaultWritingMod.id }
    });
  }

  // 2. Clean up any existing 'Writing: *' modules to ensure idempotency
  const existingWritingMods = await prisma.module.findMany({
    where: {
      levelId: levelA1.id,
      title: { startsWith: "Writing: " }
    }
  });

  if (existingWritingMods.length > 0) {
    console.log(`🧹 Removing ${existingWritingMods.length} existing writing modules to re-seed...`);
    for (const mod of existingWritingMods) {
      await prisma.module.delete({
        where: { id: mod.id }
      });
    }
  }

  // Calculate starting orderIndex dynamically after vocabulary, grammar and dialogue modules
  const vocabCount = await prisma.module.count({
    where: {
      levelId: levelA1.id,
      title: { startsWith: "Vocabulary: " }
    }
  });
  const grammarCount = await prisma.module.count({
    where: {
      levelId: levelA1.id,
      title: { startsWith: "Grammar: " }
    }
  });
  const dialogueCount = await prisma.module.count({
    where: {
      levelId: levelA1.id,
      title: { startsWith: "Dialogue: " }
    }
  });
  const startIdx = vocabCount + grammarCount + dialogueCount + 1;
  console.log(`ℹ️ Found ${vocabCount} Vocabulary, ${grammarCount} Grammar, and ${dialogueCount} Dialogue modules. Writing modules will start at orderIndex ${startIdx}.`);

  // 3. Create the Writing modules
  for (let mIdx = 0; mIdx < modulesData.length; mIdx++) {
    const modSeed = modulesData[mIdx];
    const moduleTitle = `Writing: ${modSeed.title}`;
    const orderIndexVal = startIdx + mIdx;
    console.log(`📦 Seeding Module: "${moduleTitle}" (orderIndex: ${orderIndexVal})`);

    const moduleRecord = await prisma.module.create({
      data: {
        levelId: levelA1.id,
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

  // 4. Update the orderIndex of any other remaining modules
  const remainingA1Mods = await prisma.module.findMany({
    where: {
      levelId: levelA1.id,
      NOT: [
        { title: { startsWith: "Vocabulary: " } },
        { title: { startsWith: "Grammar: " } },
        { title: { startsWith: "Dialogue: " } },
        { title: { startsWith: "Writing: " } }
      ]
    },
    orderBy: { orderIndex: "asc" }
  });

  console.log("🔄 Updating order indices of other A1 modules...");
  let otherStartIdx = startIdx + modulesData.length;
  for (const mod of remainingA1Mods) {
    await prisma.module.update({
      where: { id: mod.id },
      data: { orderIndex: otherStartIdx }
    });
    console.log(`   - "${mod.title}" set to orderIndex ${otherStartIdx}`);
    otherStartIdx++;
  }

  console.log("✅ A1 Writing seeding completed successfully!");
}

main()
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
