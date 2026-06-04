import { prisma } from "../services/db.service";

async function main() {
  const levels = await prisma.level.findMany({
    include: {
      modules: {
        orderBy: { orderIndex: "asc" },
        include: {
          lessons: {
            orderBy: { orderIndex: "asc" },
            include: {
              exercises: true
            }
          }
        }
      }
    }
  });

  console.log("Current Levels, Modules, Lessons, & Exercises in DB:");
  for (const level of levels) {
    console.log(`\n========================================`);
    console.log(`Level: ${level.code} - ${level.name}`);
    console.log(`========================================`);
    for (const mod of level.modules) {
      console.log(`  Module [Idx ${mod.orderIndex}]: ${mod.title}`);
      console.log(`    Lessons count: ${mod.lessons.length}`);
      let totalExercises = 0;
      for (const lesson of mod.lessons) {
        totalExercises += lesson.exercises.length;
      }
      console.log(`    Total Exercises count: ${totalExercises}`);
    }
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });

