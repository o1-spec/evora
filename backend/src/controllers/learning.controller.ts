import { Response } from 'express';
import { prisma } from '../services/db.service';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { ExerciseType } from '@prisma/client';

export class LearningController {

  /**
   * Fetch all French levels (A1, A2, etc.)
   */
  public static async getLevels(req: AuthenticatedRequest, res: Response) {
    try {
      const levels = await prisma.level.findMany({
        orderBy: { code: 'asc' },
        include: {
          modules: {
            orderBy: { orderIndex: 'asc' },
            select: { id: true, title: true, orderIndex: true }
          }
        }
      });
      return res.status(200).json({ levels });
    } catch (error) {
      console.error('Get levels error:', error);
      return res.status(500).json({ error: 'Failed to retrieve learning levels.' });
    }
  }

  /**
   * Fetch a single level by code (A1, B2) with its modules and lesson summaries
   */
  public static async getLevelByCode(req: AuthenticatedRequest, res: Response) {
    try {
      const { code } = req.params;
      const level = await prisma.level.findUnique({
        where: { code: code.toUpperCase() },
        include: {
          modules: {
            orderBy: { orderIndex: 'asc' },
            include: {
              lessons: {
                orderBy: { orderIndex: 'asc' },
                select: {
                  id: true,
                  title: true,
                  description: true,
                  orderIndex: true,
                  progress: {
                    where: { userId: req.user?.id },
                    select: { isCompleted: true, score: true }
                  }
                }
              }
            }
          }
        }
      });

      if (!level) {
        return res.status(404).json({ error: 'Level not found.' });
      }

      return res.status(200).json({ level });
    } catch (error) {
      console.error('Get level by code error:', error);
      return res.status(500).json({ error: 'Failed to retrieve level parameters.' });
    }
  }

  /**
   * Fetch full lesson content including vocabulary, grammar, and exercises
   */
  public static async getLesson(req: AuthenticatedRequest, res: Response) {
    try {
      const { lessonId } = req.params;
      const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId },
        include: {
          exercises: true,
          progress: {
            where: { userId: req.user?.id }
          }
        }
      });

      if (!lesson) {
        return res.status(404).json({ error: 'Lesson not found.' });
      }

      return res.status(200).json({ lesson });
    } catch (error) {
      console.error('Get lesson error:', error);
      return res.status(500).json({ error: 'Failed to load lesson detail.' });
    }
  }

  /**
   * Submit an exercise answer for instant grading and progress advancement
   */
  public static async submitAnswer(req: AuthenticatedRequest, res: Response) {
    try {
      const { exerciseId } = req.params;
      const { answer } = req.body; // Submitted answer string

      if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
      const userId = req.user.id;

      if (answer === undefined) {
        return res.status(400).json({ error: 'Le champ de réponse est requis.' });
      }

      // Fetch exercise
      const exercise = await prisma.exercise.findUnique({
        where: { id: exerciseId },
        include: { lesson: true }
      });

      if (!exercise) {
        return res.status(404).json({ error: 'Exercice non trouvé.' });
      }

      // Perform grading matching
      let isCorrect = false;
      const cleanAnswer = answer.toString().trim().toLowerCase();
      const cleanCorrectKey = exercise.correctKey.toString().trim().toLowerCase();

      if (exercise.type === ExerciseType.MULTIPLE_CHOICE || exercise.type === ExerciseType.FILL_IN_THE_BLANK) {
        isCorrect = (cleanAnswer === cleanCorrectKey);
      } else if (exercise.type === ExerciseType.MATCHING) {
        // Matching format could be custom, basic comparison for now
        isCorrect = (cleanAnswer === cleanCorrectKey);
      } else {
        // Writing/speaking exercises are marked correct instantly here or routed to the AI feedback controller
        isCorrect = true; 
      }

      const pointsEarned = isCorrect ? exercise.points : 0;

      // Fetch current lesson completion context
      const existingProgress = await prisma.userProgress.findUnique({
        where: {
          userId_lessonId: {
            userId,
            lessonId: exercise.lessonId
          }
        }
      });

      let updatedProgress;
      if (existingProgress) {
        updatedProgress = await prisma.userProgress.update({
          where: { id: existingProgress.id },
          data: {
            score: existingProgress.score + pointsEarned,
            isCompleted: true // Complete on submit for this example
          }
        });
      } else {
        updatedProgress = await prisma.userProgress.create({
          data: {
            userId,
            lessonId: exercise.lessonId,
            isCompleted: true,
            score: pointsEarned
          }
        });
      }

      return res.status(200).json({
        isCorrect,
        correctKey: exercise.correctKey,
        pointsEarned,
        totalLessonScore: updatedProgress.score,
        explanation: `La bonne réponse était: "${exercise.correctKey}".`
      });
    } catch (error) {
      console.error('Submit answer error:', error);
      return res.status(500).json({ error: 'Failed to grade exercise response.' });
    }
  }

  /**
   * Fetch live dynamic progress for TCF Bands and French Levels
   * TCF band skills are derived from real exam attempt data per section type.
   * CEFR level cards (A1–C2) come from real UserProgress completions.
   */
  public static async getAcademyProgress(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
      const userId = req.user.id;

      // ─── 1. TCF BAND REAL DATA ────────────────────────────────────────────────
      // For each skill type, we calculate:
      //   - exercises (total): total distinct TcfQuestions in that section type across all exams
      //   - done: total sections of that type covered by the user's completed exam attempts

      // Get all completed exam attempts with their exam sections
      const completedAttempts = await prisma.examAttempt.findMany({
        where: { userId, completedAt: { not: null } },
        include: {
          exam: {
            include: {
              sections: {
                include: {
                  questions: { select: { id: true } }
                }
              }
            }
          },
          feedbacks: {
            select: { sectionType: true, overallScore: true }
          }
        }
      });

      // Count total available questions per section type across ALL exams (not just attempted)
      const allExams = await prisma.tcfExam.findMany({
        include: {
          sections: {
            include: {
              questions: { select: { id: true } }
            }
          }
        }
      });

      // Build totals: { WRITING: N, SPEAKING: N, READING: N, LISTENING: N }
      const totalByType: Record<string, number> = {
        WRITING: 0, SPEAKING: 0, READING: 0, LISTENING: 0
      };
      for (const exam of allExams) {
        for (const section of exam.sections) {
          totalByType[section.type] = (totalByType[section.type] || 0) + section.questions.length;
        }
      }

      // Build done counts: questions answered by user (per section type covered in their attempts)
      const doneByType: Record<string, number> = {
        WRITING: 0, SPEAKING: 0, READING: 0, LISTENING: 0
      };
      for (const attempt of completedAttempts) {
        for (const section of attempt.exam.sections) {
          doneByType[section.type] = (doneByType[section.type] || 0) + section.questions.length;
        }
      }

      // Cap done at total (user can't do more than what exists)
      for (const key of Object.keys(doneByType)) {
        doneByType[key] = Math.min(doneByType[key], totalByType[key] || 0);
      }

      // Helper: build skill object for a section type
      const buildSkill = (label: string, sub: string, type: string) => ({
        label,
        sub,
        exercises: totalByType[type] || 0,
        done: doneByType[type] || 0
      });

      // Determine which CLB band the user is in based on their latest attempt clbLevel
      const latestAttempt = completedAttempts.sort(
        (a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime()
      )[0];
      const userClbLevel = latestAttempt?.clbLevel ?? null;

      // Build band skills arrays from real data
      // All four bands share the same pool of TCF questions but we split them
      // evenly across 4 bands so each band is contextually meaningful

      // Total questions per section: split into 4 bands (25% each)
      const bandSlice = (total: number, bandIndex: number) => {
        // bandIndex: 0=beginner, 1=intermediate, 2=advanced, 3=expert
        const perBand = Math.floor(total / 4) || 1;
        return perBand;
      };

      const bandDoneSlice = (total: number, done: number, bandIndex: number) => {
        const perBand = Math.floor(total / 4) || 1;
        const cumulativeDone = done;
        // How many "done" fall within this band's slice?
        const bandStart = bandIndex * perBand;
        const bandEnd = bandStart + perBand;
        return Math.max(0, Math.min(perBand, cumulativeDone - bandStart));
      };

      const buildBandSkills = (bandIndex: number) => [
        {
          label: 'Written Expression',
          sub: 'Expression Écrite',
          exercises: bandSlice(totalByType['WRITING'], bandIndex),
          done: bandDoneSlice(totalByType['WRITING'], doneByType['WRITING'], bandIndex)
        },
        {
          label: 'Oral Expression',
          sub: 'Expression Orale',
          exercises: bandSlice(totalByType['SPEAKING'], bandIndex),
          done: bandDoneSlice(totalByType['SPEAKING'], doneByType['SPEAKING'], bandIndex)
        },
        {
          label: 'Reading Comprehension',
          sub: 'Compréhension Écrite',
          exercises: bandSlice(totalByType['READING'], bandIndex),
          done: bandDoneSlice(totalByType['READING'], doneByType['READING'], bandIndex)
        },
        {
          label: 'Oral Comprehension',
          sub: 'Compréhension Orale',
          exercises: bandSlice(totalByType['LISTENING'], bandIndex),
          done: bandDoneSlice(totalByType['LISTENING'], doneByType['LISTENING'], bandIndex)
        }
      ];

      const calcProgress = (skills: { exercises: number; done: number }[]) => {
        const totalEx = skills.reduce((s, sk) => s + sk.exercises, 0);
        const totalDn = skills.reduce((s, sk) => s + sk.done, 0);
        return totalEx > 0 ? Math.round((totalDn / totalEx) * 100) : 0;
      };

      const beginnerSkills = buildBandSkills(0);
      const intermediateSkills = buildBandSkills(1);
      const advancedSkills = buildBandSkills(2);
      const expertSkills = buildBandSkills(3);

      // ─── 2. CEFR LEVEL REAL DATA (A1–C2) ─────────────────────────────────────
      const dbLevels = await prisma.level.findMany({
        include: {
          modules: {
            orderBy: { orderIndex: 'asc' },
            include: {
              lessons: {
                include: {
                  progress: {
                    where: { userId, isCompleted: true }
                  }
                }
              }
            }
          }
        }
      });

      const levelsData: Record<string, any> = {};
      for (const level of dbLevels) {
        const modules = level.modules.map(mod => {
          const count = mod.lessons.length;
          const done = mod.lessons.filter(l => l.progress.length > 0).length;
          return { label: mod.title, count, done };
        });

        const totalLessons = level.modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
        const totalDone = level.modules.reduce(
          (sum, mod) => sum + mod.lessons.filter(l => l.progress.length > 0).length, 0
        );

        levelsData[level.code.toLowerCase()] = {
          progress: totalLessons > 0 ? Math.round((totalDone / totalLessons) * 100) : 0,
          modules
        };
      }

      // ─── 3. BUILD RESPONSE ────────────────────────────────────────────────────
      return res.status(200).json({
        beginner: { progress: calcProgress(beginnerSkills), skills: beginnerSkills },
        intermediate: { progress: calcProgress(intermediateSkills), skills: intermediateSkills },
        advanced: { progress: calcProgress(advancedSkills), skills: advancedSkills },
        expert: { progress: calcProgress(expertSkills), skills: expertSkills },
        ...levelsData
      });

    } catch (error) {
      console.error('Get academy progress error:', error);
      return res.status(500).json({ error: 'Failed to retrieve progress indicators.' });
    }
  }
}
