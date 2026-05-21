import { Response } from 'express';
import { prisma } from '../services/db.service';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { OpenAIService } from '../services/openai.service';
import { ExamSectionType } from '@prisma/client';

export class TcfController {

  /**
   * Get all TCF Canada simulated exams
   */
  public static async getExams(req: AuthenticatedRequest, res: Response) {
    try {
      const exams = await prisma.tcfExam.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          sections: {
            select: { id: true, type: true, durationMin: true }
          }
        }
      });
      return res.status(200).json({ exams });
    } catch (error) {
      console.error('Get exams error:', error);
      return res.status(500).json({ error: 'Failed to retrieve TCF simulated exams.' });
    }
  }

  /**
   * Fetch a full TCF simulated exam with questions
   */
  public static async getExamDetails(req: AuthenticatedRequest, res: Response) {
    try {
      const { examId } = req.params;
      const exam = await prisma.tcfExam.findUnique({
        where: { id: examId },
        include: {
          sections: {
            orderBy: { orderIndex: 'asc' },
            include: {
              questions: {
                orderBy: { orderIndex: 'asc' }
              }
            }
          }
        }
      });

      if (!exam) {
        return res.status(404).json({ error: 'Exam not found.' });
      }

      return res.status(200).json({ exam });
    } catch (error) {
      console.error('Get exam details error:', error);
      return res.status(500).json({ error: 'Failed to load TCF exam elements.' });
    }
  }

  /**
   * Start a new TCF Exam Attempt
   */
  public static async startAttempt(req: AuthenticatedRequest, res: Response) {
    try {
      const { examId } = req.body;
      if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
      const userId = req.user.id;

      const exam = await prisma.tcfExam.findUnique({ where: { id: examId } });
      if (!exam) {
        return res.status(404).json({ error: 'TCF Exam not found.' });
      }

      const attempt = await prisma.examAttempt.create({
        data: {
          userId,
          examId
        }
      });

      return res.status(201).json({
        message: 'Simulation TCF démarrée.',
        attemptId: attempt.id
      });
    } catch (error) {
      console.error('Start attempt error:', error);
      return res.status(500).json({ error: 'Failed to initialize TCF exam attempt.' });
    }
  }

  /**
   * Submit exam answers for final evaluation (Autograding & AI marking)
   */
  public static async submitAttempt(req: AuthenticatedRequest, res: Response) {
    try {
      const { attemptId } = req.params;
      const { answers } = req.body; // Key-value object of { questionId: submittedAnswerString }

      if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
      const userId = req.user.id;

      const attempt = await prisma.examAttempt.findUnique({
        where: { id: attemptId },
        include: { exam: { include: { sections: { include: { questions: true } } } } }
      });

      if (!attempt || attempt.userId !== userId) {
        return res.status(404).json({ error: 'Tentative d\'examen non trouvée.' });
      }

      if (attempt.completedAt) {
        return res.status(400).json({ error: 'Cet examen a déjà été soumis.' });
      }

      const sections = attempt.exam.sections;
      let totalMcqCorrect = 0;
      let totalMcqQuestions = 0;
      const sectionFeedbacks: any[] = [];

      let writingText = "";
      let speakingTranscript = "";

      // 1. Grade MCQ sections (Listening & Reading) and gather text for descriptive parts (Writing & Speaking)
      for (const section of sections) {
        let sectionCorrect = 0;
        let sectionTotal = 0;

        for (const question of section.questions) {
          const studentAnswer = answers[question.id] || "";
          
          if (section.type === ExamSectionType.LISTENING || section.type === ExamSectionType.READING) {
            sectionTotal++;
            totalMcqQuestions++;
            if (question.correctKey && studentAnswer.trim().toLowerCase() === question.correctKey.trim().toLowerCase()) {
              sectionCorrect++;
              totalMcqCorrect++;
            }
          } else if (section.type === ExamSectionType.WRITING) {
            writingText += `[Tâche ${question.orderIndex}]: ${studentAnswer}\n\n`;
          } else if (section.type === ExamSectionType.SPEAKING) {
            speakingTranscript += `[Tâche ${question.orderIndex}]: ${studentAnswer}\n\n`;
          }
        }

        // Add pre-calculation for MCQs feedback
        if (section.type === ExamSectionType.LISTENING || section.type === ExamSectionType.READING) {
          const pct = sectionTotal > 0 ? (sectionCorrect / sectionTotal) * 100 : 0;
          sectionFeedbacks.push({
            sectionType: section.type,
            overallScore: pct,
            strengths: pct > 75 ? ["Bonne compréhension globale.", "Capacité à saisir les détails."] : ["Saisit les mots clés principaux."],
            weaknesses: pct < 60 ? ["Difficulté à interpréter le sens implicite.", "Vocabulaire de base manquant."] : ["Quelques erreurs d'attention."],
            corrections: [],
            comments: `Score final de la section: ${sectionCorrect}/${sectionTotal} (${pct.toFixed(1)}%).`
          });
        }
      }

      // 2. Perform AI Grading for Writing and Speaking
      // Writing
      let writingScore = 50;
      let writingClb = "CLB 5";
      let writingStrengths = ["Texte formulé de manière basique."];
      let writingWeaknesses = ["Manque de phrases complexes."];
      let writingCorrections: any[] = [];
      let writingComments = "Aucun texte rédigé.";

      if (writingText.trim().length > 5) {
        const aiWritingResult = await OpenAIService.evaluateWriting(
          writingText,
          "TCF Canada Section Écrite - Rédiger des textes descriptifs et argumentatifs."
        );
        writingScore = aiWritingResult.overallScore;
        writingClb = aiWritingResult.clbLevel;
        writingStrengths = aiWritingResult.strengths;
        writingWeaknesses = aiWritingResult.weaknesses;
        writingCorrections = aiWritingResult.corrections;
        writingComments = aiWritingResult.comments;

        // Log AI Usage
        await prisma.aIUsageLog.create({
          data: { userId, service: 'gpt-4o-writing', inputToken: 300, outputToken: 400 }
        });
      }

      sectionFeedbacks.push({
        sectionType: ExamSectionType.WRITING,
        overallScore: writingScore,
        strengths: writingStrengths,
        weaknesses: writingWeaknesses,
        corrections: writingCorrections,
        comments: `[Niveau estimé: ${writingClb}] ${writingComments}`
      });

      // Speaking
      let speakingScore = 50;
      let speakingClb = "CLB 5";
      let speakingStrengths = ["Expression orale intelligible."];
      let speakingWeaknesses = ["Pauses fréquentes."];
      let speakingCorrections: any[] = [];
      let speakingComments = "Aucun enregistrement vocal fourni.";

      if (speakingTranscript.trim().length > 5) {
        const aiSpeakingResult = await OpenAIService.evaluateSpeaking(
          speakingTranscript,
          "TCF Canada Section Orale - Exprimer un avis et argumenter sur un sujet d'intérêt général."
        );
        speakingScore = aiSpeakingResult.overallScore;
        speakingClb = aiSpeakingResult.clbLevel;
        speakingStrengths = aiSpeakingResult.strengths;
        speakingWeaknesses = aiSpeakingResult.weaknesses;
        speakingCorrections = aiSpeakingResult.corrections;
        speakingComments = aiSpeakingResult.comments;

        // Log AI Usage
        await prisma.aIUsageLog.create({
          data: { userId, service: 'gpt-4o-speaking', inputToken: 300, outputToken: 400 }
        });
      }

      sectionFeedbacks.push({
        sectionType: ExamSectionType.SPEAKING,
        overallScore: speakingScore,
        strengths: speakingStrengths,
        weaknesses: speakingWeaknesses,
        corrections: speakingCorrections,
        comments: `[Niveau estimé: ${speakingClb}] ${speakingComments}`
      });

      // 3. Compute Cumulative Final Scores
      const mcqScore = totalMcqQuestions > 0 ? (totalMcqCorrect / totalMcqQuestions) * 100 : 50;
      const combinedRawScore = (mcqScore + writingScore + speakingScore) / 3;

      // Determine final CLB Level based on total score
      let finalClb = "CLB 5";
      if (combinedRawScore >= 85) finalClb = "CLB 9";
      else if (combinedRawScore >= 75) finalClb = "CLB 8";
      else if (combinedRawScore >= 65) finalClb = "CLB 7";
      else if (combinedRawScore >= 55) finalClb = "CLB 6";
      else if (combinedRawScore >= 45) finalClb = "CLB 5";
      else finalClb = "CLB 4";

      // 4. Update ExamAttempt Table record
      const updatedAttempt = await prisma.examAttempt.update({
        where: { id: attemptId },
        data: {
          completedAt: new Date(),
          rawScore: combinedRawScore,
          clbLevel: finalClb
        }
      });

      // Save feedbacks to DB
      for (const sectionFeedback of sectionFeedbacks) {
        await prisma.aIFeedback.create({
          data: {
            attemptId,
            sectionType: sectionFeedback.sectionType,
            overallScore: sectionFeedback.overallScore,
            strengths: sectionFeedback.strengths,
            weaknesses: sectionFeedback.weaknesses,
            corrections: sectionFeedback.corrections,
            comments: sectionFeedback.comments
          }
        });
      }

      const fullAttemptResult = await prisma.examAttempt.findUnique({
        where: { id: attemptId },
        include: { feedbacks: true }
      });

      return res.status(200).json({
        message: 'Examen noté avec succès.',
        rawScore: combinedRawScore,
        clbLevel: finalClb,
        results: fullAttemptResult
      });
    } catch (error) {
      console.error('Submit attempt error:', error);
      return res.status(500).json({ error: 'Failed to complete exam evaluation.' });
    }
  }

  /**
   * Fetch specific report details for an exam attempt
   */
  public static async getAttemptReport(req: AuthenticatedRequest, res: Response) {
    try {
      const { attemptId } = req.params;
      if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

      const attempt = await prisma.examAttempt.findUnique({
        where: { id: attemptId },
        include: {
          feedbacks: true,
          exam: true
        }
      });

      if (!attempt || (attempt.userId !== req.user.id && req.user.role !== 'ADMIN')) {
        return res.status(404).json({ error: 'Rapport introuvable.' });
      }

      return res.status(200).json({ attempt });
    } catch (error) {
      console.error('Get attempt report error:', error);
      return res.status(500).json({ error: 'Failed to download exam report.' });
    }
  }

  /**
   * Fetch recent simulated exam attempts history for the logged-in user
   */
  public static async getHistory(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
      const userId = req.user.id;

      const attempts = await prisma.examAttempt.findMany({
        where: { userId },
        orderBy: { startedAt: 'desc' },
        include: {
          exam: {
            select: { title: true }
          }
        }
      });

      const history = attempts.map(attempt => ({
        ...attempt,
        status: attempt.completedAt ? 'COMPLETED' : 'IN_PROGRESS'
      }));

      return res.status(200).json({ attempts: history });
    } catch (error) {
      console.error('Get history error:', error);
      return res.status(500).json({ error: 'Failed to retrieve exam attempt history.' });
    }
  }
}
