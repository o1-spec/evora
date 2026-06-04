import { prisma } from "../services/db.service";
import { ExerciseType } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("🌱 Seeding B1 Intermediate Vocabulary Content...");

  // Load JSON file
  const jsonPath = path.join(__dirname, "b1_vocabulary.json");
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

  // 1. Delete the default empty 'Vocabulaire' module under B1 if it exists
  const defaultVocabMod = await prisma.module.findFirst({
    where: {
      levelId: levelB1.id,
      title: "Vocabulaire"
    }
  });

  if (defaultVocabMod) {
    console.log("🧹 Removing default empty 'Vocabulaire' module...");
    await prisma.module.delete({
      where: { id: defaultVocabMod.id }
    });
  }

  // 2. Clean up any existing 'Vocabulary: *' modules to ensure idempotency
  const existingVocabMods = await prisma.module.findMany({
    where: {
      levelId: levelB1.id,
      title: { startsWith: "Vocabulary: " }
    }
  });

  if (existingVocabMods.length > 0) {
    console.log(`🧹 Removing ${existingVocabMods.length} existing vocabulary modules to re-seed...`);
    for (const mod of existingVocabMods) {
      await prisma.module.delete({
        where: { id: mod.id }
      });
    }
  }

  // 3. Create the B1 Vocabulary modules
  for (let mIdx = 0; mIdx < modulesData.length; mIdx++) {
    const modSeed = modulesData[mIdx];
    const moduleTitle = `Vocabulary: ${modSeed.title}`;
    console.log(`📦 Seeding Module: "${moduleTitle}"`);

    const moduleRecord = await prisma.module.create({
      data: {
        levelId: levelB1.id,
        title: moduleTitle,
        description: modSeed.description,
        orderIndex: mIdx + 1
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

  // 4. Update the orderIndex of the remaining B1 modules (Grammaire, Dialogues, Écriture)
  const remainingB1Mods = await prisma.module.findMany({
    where: {
      levelId: levelB1.id,
      NOT: {
        title: { startsWith: "Vocabulary: " }
      }
    },
    orderBy: { orderIndex: "asc" }
  });

  console.log("🔄 Updating order indices of other B1 modules...");
  let startIdx = modulesData.length + 1; // starts at 5
  for (const mod of remainingB1Mods) {
    await prisma.module.update({
      where: { id: mod.id },
      data: { orderIndex: startIdx }
    });
    console.log(`   - "${mod.title}" set to orderIndex ${startIdx}`);
    startIdx++;
  }

  console.log("✅ B1 Vocabulary seeding completed successfully!");
}

main()
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
