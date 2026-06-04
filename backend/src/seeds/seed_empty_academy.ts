import { prisma } from "../services/db.service";

const ACADEMY_STRUCTURE = [
  {
    code: "A1",
    name: "Débutant (A1)",
    description: "Pour les personnes n'ayant aucune connaissance préalable de la langue française. Apprenez à saluer, compter, et poser vos premières questions de base.",
    modules: [
      { title: "Vocabulaire", description: "Apprentissage des mots essentiels de la vie quotidienne.", orderIndex: 1 },
      { title: "Grammaire", description: "Les règles fondamentales pour construire ses premières phrases.", orderIndex: 2 },
      { title: "Dialogues", description: "Situations de conversation courante en français.", orderIndex: 3 },
      { title: "Écriture", description: "Rédiger des messages et notes de base en français.", orderIndex: 4 }
    ]
  },
  {
    code: "A2",
    name: "Élémentaire (A2)",
    description: "Pour communiquer dans des situations familières de la vie courante (achats, transports, rendez-vous).",
    modules: [
      { title: "Vocabulaire", description: "Vocabulaire thématique de la vie quotidienne.", orderIndex: 1 },
      { title: "Grammaire", description: "Renforcement grammatical pour plus de fluidité.", orderIndex: 2 },
      { title: "Dialogues", description: "Pratique orale dans des contextes familiers.", orderIndex: 3 },
      { title: "Écriture", description: "Écrire des textes informels simples.", orderIndex: 4 }
    ]
  },
  {
    code: "B1",
    name: "Intermédiaire (B1)",
    description: "Pour comprendre les points essentiels d'une conversation et se débrouiller en voyage ou au travail.",
    modules: [
      { title: "Vocabulaire", description: "Vocabulaire d'intérêt général, professionnel et d'opinion.", orderIndex: 1 },
      { title: "Grammaire", description: "Structures de phrases complexes et temps du verbe (imparfait, conditionnel).", orderIndex: 2 },
      { title: "Dialogues", description: "Mises en situation et interactions professionnelles.", orderIndex: 3 },
      { title: "Écriture", description: "Rédiger des lettres simples et résumés.", orderIndex: 4 }
    ]
  },
  {
    code: "B2",
    name: "Avancé — Cible TCF (B2)",
    description: "Le niveau recommandé pour l'immigration canadienne. Comprenez le contenu essentiel de sujets complexes et argumentez de façon claire.",
    modules: [
      { title: "Vocabulaire", description: "Vocabulaire idiomatique, soutenu et spécialisé.", orderIndex: 1 },
      { title: "Grammaire", description: "Maîtrise fine de la syntaxe et des modes (subjonctif).", orderIndex: 2 },
      { title: "Textes", description: "Lecture critique d'articles de presse et d'analyses.", orderIndex: 3 },
      { title: "Débat oral", description: "Prendre position et argumenter spontanément sur des sujets de société.", orderIndex: 4 }
    ]
  },
  {
    code: "C1",
    name: "Autonome (C1)",
    description: "Pour comprendre une grande variété de textes longs et exigeants, et s'exprimer de façon fluide et structurée.",
    modules: [
      { title: "Vocabulaire", description: "Subtilités de sens, expressions idiomatiques avancées.", orderIndex: 1 },
      { title: "Grammaire", description: "Structures stylistiques et syntaxe littéraire.", orderIndex: 2 },
      { title: "Textes avancés", description: "Étude d'essais littéraires, de rapports complexes et de chroniques.", orderIndex: 3 },
      { title: "Expression libre", description: "Discussions académiques, exposés structurés.", orderIndex: 4 }
    ]
  },
  {
    code: "C2",
    name: "Maîtrise (C2)",
    description: "Le niveau le plus élevé du cadre européen. Comprenez sans effort pratiquement tout ce que vous lisez ou entendez.",
    modules: [
      { title: "Littérature", description: "Analyse d'oeuvres littéraires classiques et contemporaines.", orderIndex: 1 },
      { title: "Stylistique", description: "L'art de la rédaction, rhétorique et nuances fines.", orderIndex: 2 },
      { title: "Débats experts", description: "Défendre une position sur des problématiques complexes et nuancées.", orderIndex: 3 },
      { title: "Masterclass", description: "Perfectionnement ultime de la langue parlée et écrite.", orderIndex: 4 }
    ]
  }
];

async function main() {
  console.log("🧹 Wiping academy data before seed...");
  try {
    await prisma.userProgress.deleteMany();
    await prisma.exercise.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.module.deleteMany();
    await prisma.level.deleteMany();
    console.log(" Wiped successfully.");

    console.log("🌱 Seeding Levels and Modules with 0% progress...");
    for (const lvl of ACADEMY_STRUCTURE) {
      console.log(` - Seeding Level ${lvl.code} (${lvl.name})...`);
      const levelRecord = await prisma.level.create({
        data: {
          code: lvl.code,
          name: lvl.name,
          description: lvl.description
        }
      });

      for (const mod of lvl.modules) {
        await prisma.module.create({
          data: {
            levelId: levelRecord.id,
            title: mod.title,
            description: mod.description,
            orderIndex: mod.orderIndex
          }
        });
      }
    }

    console.log("✅ Seed completed successfully! All levels and empty modules are created.");
  } catch (error) {
    console.error("Error seeding empty database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
