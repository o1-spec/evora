import { prisma } from '../services/db.service';
import { ExerciseType, ExamSectionType } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

async function seed() {
  console.log('🌱 Starting Database Seeding...');

  try {
    // Clear existing exams and custom content to prevent duplicate records
    console.log(' - Wiping existing TCF Exams...');
    await prisma.tcfExam.deleteMany();
    
    // Clear lesson exercises & lessons to prevent duplicate seeds
    console.log(' - Wiping existing learning modules & content...');
    await prisma.exercise.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.module.deleteMany();

    // 1. Seed French Learning Levels
    console.log(' - Seeding Learning Levels...');
    const a1Level = await prisma.level.upsert({
      where: { code: 'A1' },
      update: {},
      create: {
        code: 'A1',
        name: 'Débutant (A1)',
        description: 'Pour les personnes n\'ayant aucune connaissance préalable de la langue française.'
      }
    });

    const b2Level = await prisma.level.upsert({
      where: { code: 'B2' },
      update: {},
      create: {
        code: 'B2',
        name: 'Intermédiaire Avancé (B2)',
        description: 'Pour les personnes capables de comprendre les idées principales de textes complexes et d\'argumenter de façon fluide.'
      }
    });

    // 2. Seed Modules for A1 and B2
    console.log(' - Seeding Learning Modules...');
    const a1Module = await prisma.module.create({
      data: {
        levelId: a1Level.id,
        title: 'Premiers pas en français',
        description: 'Apprendre à saluer, se présenter et poser des questions de base.',
        orderIndex: 1
      }
    });

    const b2Module = await prisma.module.create({
      data: {
        levelId: b2Level.id,
        title: 'Argumenter et Débattre',
        description: 'S\'exprimer sur des sujets d\'actualité et exprimer son opinion sur l\'immigration au Canada.',
        orderIndex: 1
      }
    });

    // 3. Seed Lessons
    console.log(' - Seeding Lessons...');
    
    // A1 Lesson 1
    const a1Lesson1 = await prisma.lesson.create({
      data: {
        moduleId: a1Module.id,
        title: 'Salutations et Présentation',
        description: 'Apprendre à dire bonjour, au revoir et à se présenter simplement.',
        orderIndex: 1,
        content: {
          vocabulary: [
            { french: 'Bonjour', english: 'Hello / Good morning', audio: '/static/audio/bonjour.mp3' },
            { french: "S'appeler", english: 'To be named', audio: '/static/audio/sappeler.mp3' },
            { french: 'Enchanté', english: 'Nice to meet you', audio: '/static/audio/enchante.mp3' },
            { french: 'Comment ça va ?', english: 'How is it going?', audio: '/static/audio/comment_ca_va.mp3' }
          ],
          grammar: {
            title: 'Le verbe S\'appeler au Présent',
            text: 'Pour se présenter, on utilise le verbe pronominal s\'appeler :\n- Je m\'appelle (I am named)\n- Tu t\'appelles (You are named)\n- Il/Elle s\'appelle (He/She is named)'
          },
          reading: "### Dialogue de présentation\n\n**Thomas** : Bonjour ! Comment tu t'appelles ?\n\n**Sarah** : Bonjour ! Je m'appelle Sarah. Et toi ?\n\n**Thomas** : Je m'appelle Thomas. Enchanté Sarah ! Comment ça va ?\n\n**Sarah** : Ça va très bien, merci ! Et toi ?"
        }
      }
    });

    // B2 Lesson 1
    const b2Lesson1 = await prisma.lesson.create({
      data: {
        moduleId: b2Module.id,
        title: "L'Immigration et l'Intégration au Canada",
        description: "Comprendre et débattre des enjeux liés à l'immigration francophone au Canada.",
        orderIndex: 1,
        content: {
          vocabulary: [
            { french: "L'intégration", english: 'Integration / adaptation', audio: '/static/audio/integration.mp3' },
            { french: "Le marché de l'emploi", english: 'The job market', audio: '/static/audio/marche_emploi.mp3' },
            { french: "Un atout linguistique", english: 'A linguistic asset', audio: '/static/audio/atout.mp3' },
            { french: "Favoriser la diversité", english: 'To promote diversity', audio: '/static/audio/favoriser.mp3' }
          ],
          grammar: {
            title: "Le Subjonctif Présent pour exprimer l'obligation ou la nécessité",
            text: "Pour exprimer une nécessité courante lors des épreuves d'opinion :\n- Il faut que + subjonctif\nExemple : *Il faut que le gouvernement soutienne* l'intégration des nouveaux arrivants.\nFormes courantes : *que je fasse*, *que tu sois*, *qu'il ait*."
          },
          reading: "### L'apport culturel de l'immigration\n\nL'immigration au Canada, particulièrement dans les provinces francophones comme le Québec ou pour les communautés francophones hors Québec, constitue un levier démographique et économique indispensable. De nombreux experts soulignent qu'il est capital que les nouveaux résidents reçoivent des cours linguistiques approfondis pour s'insérer rapidement sur le marché du travail."
        }
      }
    });

    // 4. Seed Lesson Exercises
    console.log(' - Seeding Lesson Exercises...');
    
    // A1 Exercises
    await prisma.exercise.create({
      data: {
        lessonId: a1Lesson1.id,
        type: ExerciseType.MULTIPLE_CHOICE,
        question: "Choisissez la bonne forme : 'Je ___ Sarah.'",
        options: ['appelle', 'm\'appelle', 't\'appelles', 's\'appelle'],
        correctKey: 'm\'appelle',
        points: 10
      }
    });

    await prisma.exercise.create({
      data: {
        lessonId: a1Lesson1.id,
        type: ExerciseType.FILL_IN_THE_BLANK,
        question: "Complétez la salutation : '___ ! Enchanté de vous rencontrer.'",
        correctKey: 'Bonjour',
        points: 10
      }
    });

    await prisma.exercise.create({
      data: {
        lessonId: a1Lesson1.id,
        type: ExerciseType.SPEAKING,
        question: "Présentez-vous à haute voix en disant votre prénom (ex: Bonjour, je m'appelle Pierre).",
        correctKey: "Je m'appelle",
        points: 20
      }
    });

    // B2 Exercises
    await prisma.exercise.create({
      data: {
        lessonId: b2Lesson1.id,
        type: ExerciseType.MULTIPLE_CHOICE,
        question: "Complétez avec la bonne conjugaison : 'Il faut que vous ___ des efforts pour vous intégrer.'",
        options: ['faites', 'fassiez', 'faisiez', 'fassent'],
        correctKey: 'fassiez',
        points: 10
      }
    });

    await prisma.exercise.create({
      data: {
        lessonId: b2Lesson1.id,
        type: ExerciseType.WRITING,
        question: "Exprimez votre avis en 50 mots sur la question : 'Selon vous, l'apprentissage du français est-il obligatoire pour s'intégrer au Canada ?'",
        correctKey: "avis obligatoire integration",
        points: 20
      }
    });

    // 5. Seed a Complete Simulated TCF Canada Practice Exam
    console.log(' - Seeding TCF Canada Practice Exam Simulator...');
    const tcfExam = await prisma.tcfExam.create({
      data: {
        title: "Simulation Complète TCF Canada - Session Officielle #1",
        description: "Examen blanc standard simulant fidèlement les quatre épreuves obligatoires du TCF pour l'immigration canadienne (Listening, Reading, Writing, Speaking).",
        isOfficial: true
      }
    });

    // --- Section 1: Listening Section ---
    const listeningSec = await prisma.tcfSection.create({
      data: {
        examId: tcfExam.id,
        type: ExamSectionType.LISTENING,
        durationMin: 35,
        orderIndex: 1
      }
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
          "Une visite médicale urgente chez un spécialiste."
        ],
        correctKey: "Un voyage d'affaires professionnel.",
        orderIndex: 1
      }
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
          "Des documents financiers originaux."
        ],
        correctKey: "Un parapluie ou un imperméable.",
        orderIndex: 2
      }
    });

    // --- Section 2: Reading Section ---
    const readingSec = await prisma.tcfSection.create({
      data: {
        examId: tcfExam.id,
        type: ExamSectionType.READING,
        durationMin: 60,
        orderIndex: 2
      }
    });

    await prisma.tcfQuestion.create({
      data: {
        sectionId: readingSec.id,
        text: "### CONSEILS AUX VOYAGEURS : TEMPÊTE HIVERNALE\nEn raison de conditions climatiques extrêmes annoncées dans la région des Prairies, nous recommandons aux automobilistes de reporter tout voyage non essentiel. Des vents forts et de la poudrerie réduiront la visibilité à presque nulle.\n\n**Question : Quelle est la directive principale de ce bulletin d'alerte ?**",
        options: [
          "Acheter des pneus neige immédiatement.",
          "Reporter les déplacements en voiture non indispensables.",
          "Prendre les transports ferroviaires alternatifs.",
          "Prendre la route uniquement pendant la nuit."
        ],
        correctKey: "Reporter les déplacements en voiture non indispensables.",
        orderIndex: 1
      }
    });

    await prisma.tcfQuestion.create({
      data: {
        sectionId: readingSec.id,
        text: "### LE MARCHÉ DU TRAVAIL ET LE MULTILINGUISME\nUne étude récente démontre que les employés maîtrisant à la fois le français et l'anglais ont un taux d'employabilité supérieur de 12% dans les provinces maritimes du Canada par rapport à leurs homologues unilingues.\n\n**Question : Quel avantage le bilinguisme offre-t-il d'après l'étude ?**",
        options: [
          "Une augmentation directe de salaire de 12%.",
          "Une plus grande probabilité de trouver un emploi.",
          "Une mutation prioritaire vers d'autres provinces.",
          "Des congés annuels payés plus longs."
        ],
        correctKey: "Une plus grande probabilité de trouver un emploi.",
        orderIndex: 2
      }
    });

    // --- Section 3: Writing Section ---
    const writingSec = await prisma.tcfSection.create({
      data: {
        examId: tcfExam.id,
        type: ExamSectionType.WRITING,
        durationMin: 60,
        orderIndex: 3
      }
    });

    await prisma.tcfQuestion.create({
      data: {
        sectionId: writingSec.id,
        text: "### TÂCHE 1 (Minimum 60 mots) : Message descriptif\nVous avez fait un voyage inoubliable au Canada récemment. Écrivez un message à un ami français pour lui décrire les paysages que vous avez vus et ce qui vous a le plus marqué.",
        correctKey: "writing_task_1",
        orderIndex: 1
      }
    });

    await prisma.tcfQuestion.create({
      data: {
        sectionId: writingSec.id,
        text: "### TÂCHE 2 (Minimum 150 mots) : Lettre formelle d'opinion\nVous habitez dans une ville où les pistes cyclables sont quasi-inexistantes. Écrivez une lettre au maire pour justifier l'intérêt écologique et économique de développer le réseau cyclable dans votre commune.",
        correctKey: "writing_task_2",
        orderIndex: 2
      }
    });

    // --- Section 4: Speaking Section ---
    const speakingSec = await prisma.tcfSection.create({
      data: {
        examId: tcfExam.id,
        type: ExamSectionType.SPEAKING,
        durationMin: 12,
        orderIndex: 4
      }
    });

    await prisma.tcfQuestion.create({
      data: {
        sectionId: speakingSec.id,
        text: "### TÂCHE 1 (2 minutes) : Entretien sans préparation\nPrésentez-vous brièvement : parlez de votre profession, de votre famille, de vos loisirs et des raisons pour lesquelles vous souhaitez apprendre le français et vous installer au Canada.",
        correctKey: "speaking_task_1",
        orderIndex: 1
      }
    });

    await prisma.tcfQuestion.create({
      data: {
        sectionId: speakingSec.id,
        text: "### TÂCHE 2 (5 minutes avec préparation) : Exercice en interaction\nSujet : Vous souhaitez inscrire votre enfant à une activité sportive locale, mais vous hésitez entre le hockey et le football. Posez des questions au responsable de l'association sportive (l'examinateur) pour vous renseigner et prendre votre décision.",
        correctKey: "speaking_task_2",
        orderIndex: 2
      }
    });

    console.log('🎉 Seeding Completed Successfully! All levels, modules, exercises, and TCF simulator mock questions are in place.');

    // 6. Seed the 40 Training Series (120 Written Tasks & 120 Oral Tasks)
    console.log(' - Seeding 120 Writing & 120 Speaking Training Tasks...');
    const writtenTasksPath = path.join(__dirname, 'written_tasks.json');
    const oralTasksPath = path.join(__dirname, 'oral_tasks.json');

    if (fs.existsSync(writtenTasksPath) && fs.existsSync(oralTasksPath)) {
      const writtenTasksRaw = fs.readFileSync(writtenTasksPath, 'utf8');
      const writtenTasks = JSON.parse(writtenTasksRaw);

      const oralTasksRaw = fs.readFileSync(oralTasksPath, 'utf8');
      const oralTasks = JSON.parse(oralTasksRaw);

      // Group written tasks by seriesId
      const writtenMap: { [key: number]: any[] } = {};
      for (const task of writtenTasks) {
        if (!writtenMap[task.seriesId]) {
          writtenMap[task.seriesId] = [];
        }
        writtenMap[task.seriesId].push(task);
      }

      // Group oral tasks by seriesId
      const oralMap: { [key: number]: any[] } = {};
      for (const task of oralTasks) {
        if (!oralMap[task.seriesId]) {
          oralMap[task.seriesId] = [];
        }
        oralMap[task.seriesId].push(task);
      }

      for (const seriesId of Object.keys(writtenMap).map(Number).sort((a, b) => a - b)) {
        const wTasks = writtenMap[seriesId] || [];
        const oTasks = oralMap[seriesId] || [];

        // Create an exam for each series
        const trainingExam = await prisma.tcfExam.create({
          data: {
            title: `TCF Canada - Entraînement Série #${seriesId}`,
            description: `Série d'entraînement intensive #${seriesId} comprenant les sections progressives d'Expression Écrite et d'Expression Orale (A1 à C2).`,
            isOfficial: false
          }
        });

        // Seed WRITING section
        if (wTasks.length > 0) {
          const trainingWritingSec = await prisma.tcfSection.create({
            data: {
              examId: trainingExam.id,
              type: ExamSectionType.WRITING,
              durationMin: 60,
              orderIndex: 1
            }
          });

          for (const t of wTasks) {
            const richText = `### TÂCHE ${t.taskNumber} (${t.difficulty}) : ${t.title}\n\n${t.prompt}\n\n**Conseil contextuel :** ${t.contextAdvice}\n\n*Word bounds: ${t.minWords} - ${t.maxWords} words. Points: ${t.points}.*`;
            await prisma.tcfQuestion.create({
              data: {
                sectionId: trainingWritingSec.id,
                text: richText,
                correctKey: `writing_series_${seriesId}_task_${t.taskNumber}`,
                orderIndex: t.taskNumber,
                options: {
                  minWords: t.minWords,
                  maxWords: t.maxWords,
                  points: t.points,
                  title: t.title,
                  contextAdvice: t.contextAdvice
                }
              }
            });
          }
        }

        // Seed SPEAKING section
        if (oTasks.length > 0) {
          const trainingSpeakingSec = await prisma.tcfSection.create({
            data: {
              examId: trainingExam.id,
              type: ExamSectionType.SPEAKING,
              durationMin: 12,
              orderIndex: 2
            }
          });

          for (const t of oTasks) {
            const richText = `### TÂCHE ${t.taskNumber} (${t.difficulty}) : ${t.title}\n\n${t.prompt}\n\n**Conseil contextuel :** ${t.contextAdvice}\n\n*Duration bounds: ${t.minDurationSec}s - ${t.maxDurationSec}s. Points: ${t.points}.*`;
            await prisma.tcfQuestion.create({
              data: {
                sectionId: trainingSpeakingSec.id,
                text: richText,
                correctKey: `speaking_series_${seriesId}_task_${t.taskNumber}`,
                orderIndex: t.taskNumber,
                options: {
                  minDurationSec: t.minDurationSec,
                  maxDurationSec: t.maxDurationSec,
                  points: t.points,
                  title: t.title,
                  contextAdvice: t.contextAdvice
                }
              }
            });
          }
        }
      }
      console.log(`🎉 Successfully seeded 40 Training Exams with 120 Written and 120 Speaking Tasks!`);
    } else {
      console.log('⚠️ written_tasks.json or oral_tasks.json not found in seeds folder. Skipping training series seeding.');
    }
  } catch (error) {
    console.error('Fatal error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
