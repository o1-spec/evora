import { prisma } from "../services/db.service";

async function main() {
  console.log("🧹 Wiping academy data...");
  try {
    const userProgressCount = await prisma.userProgress.deleteMany();
    console.log(`Deleted ${userProgressCount.count} user progress records.`);
    
    const exerciseCount = await prisma.exercise.deleteMany();
    console.log(`Deleted ${exerciseCount.count} exercises.`);

    const lessonCount = await prisma.lesson.deleteMany();
    console.log(`Deleted ${lessonCount.count} lessons.`);

    const moduleCount = await prisma.module.deleteMany();
    console.log(`Deleted ${moduleCount.count} modules.`);

    const levelCount = await prisma.level.deleteMany();
    console.log(`Deleted ${levelCount.count} levels.`);

    console.log("✅ Successfully wiped all academy tables!");
  } catch (error) {
    console.error("Error wiping database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
