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
}
