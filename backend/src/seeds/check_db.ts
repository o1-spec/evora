import { prisma } from "../services/db.service";

async function main() {
  const levels = await prisma.level.findMany({
    include: {
      modules: {
        orderBy: { orderIndex: "asc" }
      }
    }
  });

  console.log("Current Levels & Modules in DB:");
  console.log(JSON.stringify(levels, null, 2));
}

main().catch(console.error);
