import { prisma } from "../services/db.service";
import { ExerciseType, ExamSectionType } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import { getAcademyContent } from "./academy_data";

async function seed() {
  console.log("🌱 Starting Database Seeding...");

  try {
    // Clear existing exams and custom content to prevent duplicate records
    console.log(" - Wiping existing TCF Exams...");
    await prisma.tcfExam.deleteMany();

    // Clear lesson exercises & lessons to prevent duplicate seeds
    console.log(" - Wiping existing learning modules & content...");
    await prisma.exercise.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.module.deleteMany();

    // 1. Seed French Learning Levels, Modules, Lessons, and Exercises
    console.log(" - Seeding Learning Academy (Levels, Modules, Lessons, Exercises)...");
    const academyContent = getAcademyContent();

    for (const lvlSeed of academyContent) {
      console.log(`   * Seeding Level ${lvlSeed.code}...`);
      const level = await prisma.level.upsert({
        where: { code: lvlSeed.code },
        update: {
          name: lvlSeed.name,
          description: lvlSeed.description,
        },
        create: {
          code: lvlSeed.code,
          name: lvlSeed.name,
          description: lvlSeed.description,
        },
      });

      for (let modIdx = 0; modIdx < lvlSeed.modules.length; modIdx++) {
        const modSeed = lvlSeed.modules[modIdx];
        const module = await prisma.module.create({
          data: {
            levelId: level.id,
            title: modSeed.title,
            description: modSeed.description,
            orderIndex: modIdx + 1,
          },
        });

        for (let lesIdx = 0; lesIdx < modSeed.lessons.length; lesIdx++) {
          const lesSeed = modSeed.lessons[lesIdx];
          const lesson = await prisma.lesson.create({
            data: {
              moduleId: module.id,
              title: lesSeed.title,
              description: lesSeed.description,
              orderIndex: lesIdx + 1,
              content: {
                vocabulary: lesSeed.vocabulary,
                grammar: lesSeed.grammar,
                reading: lesSeed.reading,
              },
            },
          });

          for (const exSeed of lesSeed.exercises) {
            await prisma.exercise.create({
              data: {
                lessonId: lesson.id,
                type: exSeed.type,
                question: exSeed.question,
                options: exSeed.options,
                correctKey: exSeed.correctKey,
                points: exSeed.points,
              },
            });
          }
        }
      }
    }

    // 5. Seed a Complete Simulated TCF Canada Practice Exam
    console.log(" - Seeding TCF Canada Practice Exam Simulator...");
    const tcfExam = await prisma.tcfExam.create({
      data: {
        title: "Simulation Complète TCF Canada - Session Officielle #1",
        description:
          "Examen blanc standard simulant fidèlement les quatre épreuves obligatoires du TCF pour l'immigration canadienne (Listening, Reading, Writing, Speaking).",
        isOfficial: true,
      },
    });

    // --- Section 1: Listening Section ---
    const listeningSec = await prisma.tcfSection.create({
      data: {
        examId: tcfExam.id,
        type: ExamSectionType.LISTENING,
        durationMin: 35,
        orderIndex: 1,
      },
    });

    await prisma.tcfQuestion.create({
      data: {
        sectionId: listeningSec.id,
        text: "Écoutez la bande audio. Quelle est la raison principale du déplacement de la personne ?",
        audioUrl: "/static/audio/tcf_listening_q1.mp3",
        options: [
          "Un voyage d'affaires professionnel.",
          "Des vacances en famille au bord de la mer.",
          "Une recherche de logement étudiant.",
          "Une visite médicale urgente chez un spécialiste.",
        ],
        correctKey: "Un voyage d'affaires professionnel.",
        orderIndex: 1,
      },
    });

    await prisma.tcfQuestion.create({
      data: {
        sectionId: listeningSec.id,
        text: "Écoutez la bande audio. Qu'est-ce que l'interlocuteur conseille d'apporter ?",
        audioUrl: "/static/audio/tcf_listening_q2.mp3",
        options: [
          "Un passeport valide et un visa imprimé.",
          "Un parapluie ou un imperméable.",
          "Des vêtements chauds d'hiver.",
          "Des documents financiers originaux.",
        ],
        correctKey: "Un parapluie ou un imperméable.",
        orderIndex: 2,
      },
    });

    // --- Section 2: Reading Section ---
    const readingSec = await prisma.tcfSection.create({
      data: {
        examId: tcfExam.id,
        type: ExamSectionType.READING,
        durationMin: 60,
        orderIndex: 2,
      },
    });

    await prisma.tcfQuestion.create({
      data: {
        sectionId: readingSec.id,
        text: "### CONSEILS AUX VOYAGEURS : TEMPÊTE HIVERNALE\nEn raison de conditions climatiques extrêmes annoncées dans la région des Prairies, nous recommandons aux automobilistes de reporter tout voyage non essentiel. Des vents forts et de la poudrerie réduiront la visibilité à presque nulle.\n\n**Question : Quelle est la directive principale de ce bulletin d'alerte ?**",
        options: [
          "Acheter des pneus neige immédiatement.",
          "Reporter les déplacements en voiture non indispensables.",
          "Prendre les transports ferroviaires alternatifs.",
          "Prendre la route uniquement pendant la nuit.",
        ],
        correctKey: "Reporter les déplacements en voiture non indispensables.",
        orderIndex: 1,
      },
    });

    await prisma.tcfQuestion.create({
      data: {
        sectionId: readingSec.id,
        text: "### LE MARCHÉ DU TRAVAIL ET LE MULTILINGUISME\nUne étude récente démontre que les employés maîtrisant à la fois le français et l'anglais ont un taux d'employabilité supérieur de 12% dans les provinces maritimes du Canada par rapport à leurs homologues unilingues.\n\n**Question : Quel avantage le bilinguisme offre-t-il d'après l'étude ?**",
        options: [
          "Une augmentation directe de salaire de 12%.",
          "Une plus grande probabilité de trouver un emploi.",
          "Une mutation prioritaire vers d'autres provinces.",
          "Des congés annuels payés plus longs.",
        ],
        correctKey: "Une plus grande probabilité de trouver un emploi.",
        orderIndex: 2,
      },
    });

    // --- Section 3: Writing Section ---
    const writingSec = await prisma.tcfSection.create({
      data: {
        examId: tcfExam.id,
        type: ExamSectionType.WRITING,
        durationMin: 60,
        orderIndex: 3,
      },
    });

    await prisma.tcfQuestion.create({
      data: {
        sectionId: writingSec.id,
        text: "### TÂCHE 1 (Minimum 60 mots) : Message descriptif\nVous avez fait un voyage inoubliable au Canada récemment. Écrivez un message à un ami français pour lui décrire les paysages que vous avez vus et ce qui vous a le plus marqué.",
        correctKey: "writing_task_1",
        orderIndex: 1,
      },
    });

    await prisma.tcfQuestion.create({
      data: {
        sectionId: writingSec.id,
        text: "### TÂCHE 2 (Minimum 150 mots) : Lettre formelle d'opinion\nVous habitez dans une ville où les pistes cyclables sont quasi-inexistantes. Écrivez une lettre au maire pour justifier l'intérêt écologique et économique de développer le réseau cyclable dans votre commune.",
        correctKey: "writing_task_2",
        orderIndex: 2,
      },
    });

    // --- Section 4: Speaking Section ---
    const speakingSec = await prisma.tcfSection.create({
      data: {
        examId: tcfExam.id,
        type: ExamSectionType.SPEAKING,
        durationMin: 12,
        orderIndex: 4,
      },
    });

    await prisma.tcfQuestion.create({
      data: {
        sectionId: speakingSec.id,
        text: "### TÂCHE 1 (2 minutes) : Entretien sans préparation\nPrésentez-vous brièvement : parlez de votre profession, de votre famille, de vos loisirs et des raisons pour lesquelles vous souhaitez apprendre le français et vous installer au Canada.",
        correctKey: "speaking_task_1",
        orderIndex: 1,
      },
    });

    await prisma.tcfQuestion.create({
      data: {
        sectionId: speakingSec.id,
        text: "### TÂCHE 2 (5 minutes avec préparation) : Exercice en interaction\nSujet : Vous souhaitez inscrire votre enfant à une activité sportive locale, mais vous hésitez entre le hockey et le football. Posez des questions au responsable de l'association sportive (l'examinateur) pour vous renseigner et prendre votre décision.",
        correctKey: "speaking_task_2",
        orderIndex: 2,
      },
    });

    console.log(
      "🎉 Seeding Completed Successfully! All levels, modules, exercises, and TCF simulator mock questions are in place.",
    );

    // 6. Seed the 40 Training Series
    console.log(
      " - Seeding Reading, Listening, Writing & Speaking Training Tasks (Batched)...",
    );
    const writtenTasksPath = path.join(__dirname, "written_tasks.json");
    const oralTasksPath = path.join(__dirname, "oral_tasks.json");
    const readingQuestionsPath = path.join(__dirname, "reading_questions.json");
    const listeningQuestionsPath = path.join(
      __dirname,
      "listening_questions.json",
    );

    if (fs.existsSync(writtenTasksPath) && fs.existsSync(oralTasksPath)) {
      const writtenTasks = JSON.parse(
        fs.readFileSync(writtenTasksPath, "utf8"),
      );
      const oralTasks = JSON.parse(fs.readFileSync(oralTasksPath, "utf8"));
      const readingQuestions = fs.existsSync(readingQuestionsPath)
        ? JSON.parse(fs.readFileSync(readingQuestionsPath, "utf8"))
        : [];
      const listeningQuestions = fs.existsSync(listeningQuestionsPath)
        ? JSON.parse(fs.readFileSync(listeningQuestionsPath, "utf8"))
        : [];

      // One transaction per series to avoid DB timeout on large datasets
      let seededCount = 0;
      for (let seriesId = 1; seriesId <= 40; seriesId++) {
        // Main tasks: TCF Canada official format = 2 writing + 2 speaking tasks
        const wTasks = writtenTasks.filter((t: any) => t.seriesId === seriesId && t.taskNumber <= 2);
        const oTasks = oralTasks.filter((t: any) => t.seriesId === seriesId && t.taskNumber <= 2);
        // Bonus tasks (task 3) — shown after completing the main section
        const wBonus = writtenTasks.filter((t: any) => t.seriesId === seriesId && t.taskNumber === 3);
        const oBonus = oralTasks.filter((t: any) => t.seriesId === seriesId && t.taskNumber === 3);
        const rQuestions = readingQuestions.filter(
          (q: any) => q.seriesId === seriesId,
        );
        const lQuestions = listeningQuestions.filter(
          (q: any) => q.seriesId === seriesId,
        );

        if (
          wTasks.length === 0 &&
          oTasks.length === 0 &&
          rQuestions.length === 0 &&
          lQuestions.length === 0
        )
          continue;

        const exam = await prisma.tcfExam.create({
          data: {
            title: `TCF Canada - Entraînement Série #${seriesId}`,
            description: `Série d'entraînement intensive #${seriesId} — Compréhension Orale, Compréhension Écrite, Expression Écrite et Expression Orale (A1→C2).`,
            isOfficial: false,
          },
        });

        const questionData: any[] = [];

        if (lQuestions.length > 0) {
          const sec = await prisma.tcfSection.create({
            data: {
              examId: exam.id,
              type: ExamSectionType.LISTENING,
              durationMin: 35,
              orderIndex: 1,
            },
          });

          for (const q of lQuestions) {
            questionData.push({
              sectionId: sec.id,
              text: `### ${q.sectionTitle} (${q.difficulty})\n\n${q.posterText}\n\n**Question : ${q.questionText}**`,
              options: q.options,
              correctKey: q.correctKey,
              orderIndex: q.id,
            });
          }
        }

        if (rQuestions.length > 0) {
          const sec = await prisma.tcfSection.create({
            data: {
              examId: exam.id,
              type: ExamSectionType.READING,
              durationMin: 60,
              orderIndex: 2,
            },
          });

          for (const q of rQuestions) {
            questionData.push({
              sectionId: sec.id,
              text: `### ${q.sectionTitle} (${q.difficulty})\n\n${q.posterText}\n\n**Question : ${q.questionText}**`,
              options: q.options,
              correctKey: q.correctKey,
              orderIndex: q.id,
            });
          }
        }

        if (wTasks.length > 0) {
          const sec = await prisma.tcfSection.create({
            data: {
              examId: exam.id,
              type: ExamSectionType.WRITING,
              durationMin: 60,
              orderIndex: 3,
            },
          });

          for (const t of wTasks) {
            questionData.push({
              sectionId: sec.id,
              text: `### TÂCHE ${t.taskNumber} (${t.difficulty}) : ${t.title}\n\n${t.prompt}\n\n**Conseil :** ${t.contextAdvice}\n\n*${t.minWords}–${t.maxWords} mots.*`,
              correctKey: `writing_series_${seriesId}_task_${t.taskNumber}`,
              orderIndex: t.taskNumber,
              options: {
                minWords: t.minWords,
                maxWords: t.maxWords,
                points: t.points,
                title: t.title,
                contextAdvice: t.contextAdvice,
              },
            });
          }
        }

        if (oTasks.length > 0) {
          const sec = await prisma.tcfSection.create({
            data: {
              examId: exam.id,
              type: ExamSectionType.SPEAKING,
              durationMin: 12,
              orderIndex: 4,
            },
          });

          for (const t of oTasks) {
            questionData.push({
              sectionId: sec.id,
              text: `### TÂCHE ${t.taskNumber} (${t.difficulty}) : ${t.title}\n\n${t.prompt}\n\n**Conseil :** ${t.contextAdvice}\n\n*${t.minDurationSec}s–${t.maxDurationSec}s.*`,
              correctKey: `speaking_series_${seriesId}_task_${t.taskNumber}`,
              orderIndex: t.taskNumber,
              options: {
                minDurationSec: t.minDurationSec,
                maxDurationSec: t.maxDurationSec,
                points: t.points,
                title: t.title,
                contextAdvice: t.contextAdvice,
              },
            });
          }
        }

        // ── Bonus sections (task 3 only, shown as optional challenge) ──
        if (wBonus.length > 0) {
          const bonusWritingSec = await prisma.tcfSection.create({
            data: {
              examId: exam.id,
              type: ExamSectionType.WRITING,
              durationMin: 30,
              orderIndex: 5,
            },
          });
          for (const t of wBonus) {
            questionData.push({
              sectionId: bonusWritingSec.id,
              text: `### 🌟 BONUS : TÂCHE ${t.taskNumber} (${t.difficulty}) : ${t.title}\n\n${t.prompt}\n\n**Conseil :** ${t.contextAdvice}\n\n*${t.minWords}–${t.maxWords} mots.*`,
              correctKey: `bonus_writing_series_${seriesId}_task_${t.taskNumber}`,
              orderIndex: t.taskNumber,
              options: {
                minWords: t.minWords,
                maxWords: t.maxWords,
                points: t.points,
                title: t.title,
                contextAdvice: t.contextAdvice,
                isBonus: true,
              },
            });
          }
        }

        if (oBonus.length > 0) {
          const bonusSpeakingSec = await prisma.tcfSection.create({
            data: {
              examId: exam.id,
              type: ExamSectionType.SPEAKING,
              durationMin: 8,
              orderIndex: 6,
            },
          });
          for (const t of oBonus) {
            questionData.push({
              sectionId: bonusSpeakingSec.id,
              text: `### 🌟 BONUS : TÂCHE ${t.taskNumber} (${t.difficulty}) : ${t.title}\n\n${t.prompt}\n\n**Conseil :** ${t.contextAdvice}\n\n*${t.minDurationSec}s–${t.maxDurationSec}s.*`,
              correctKey: `bonus_speaking_series_${seriesId}_task_${t.taskNumber}`,
              orderIndex: t.taskNumber,
              options: {
                minDurationSec: t.minDurationSec,
                maxDurationSec: t.maxDurationSec,
                points: t.points,
                title: t.title,
                contextAdvice: t.contextAdvice,
                isBonus: true,
              },
            });
          }
        }

        if (questionData.length > 0) {
          for (let i = 0; i < questionData.length; i += 25) {
            await prisma.tcfQuestion.createMany({
              data: questionData.slice(i, i + 25),
            });
          }
        }

        seededCount++;
        console.log(
          `  ✅ Series #${seriesId} (L:${lQuestions.length} R:${rQuestions.length} W:${wTasks.length} S:${oTasks.length} | Bonus W:${wBonus.length} S:${oBonus.length})`,

        );
      }
      console.log(`🎉 Successfully seeded all Training Exams!`);
    } else {
      console.log("⚠️ Required JSON files missing. Skipping training series.");
    }
  } catch (error) {
    console.error("Fatal error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
