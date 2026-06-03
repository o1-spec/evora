import { Response } from 'express';
import { prisma } from '../services/db.service';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { adminResponse } from '../middlewares/admin.middleware';
import { Role, SubscriptionTier } from '@prisma/client';

export class AdminController {

  // ─── DASHBOARD ─────────────────────────────────────────────────────────────

  public static async getDashboardStats(req: AuthenticatedRequest, res: Response) {
    try {
      const [
        totalUsers,
        totalStudents,
        totalAdminsInstructors,
        totalAttempts,
        completedAttempts,
        totalAiCalls,
        activeSubscriptions,
        recentUsers,
        recentAttempts,
      ] = await Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { role: Role.STUDENT } }),
        prisma.user.count({ where: { role: { in: [Role.ADMIN, Role.INSTRUCTOR, Role.SUPER_ADMIN] } } }),
        prisma.examAttempt.count(),
        prisma.examAttempt.count({ where: { completedAt: { not: null } } }),
        prisma.aIUsageLog.count(),
        prisma.user.count({ where: { subscriptionTier: { not: SubscriptionTier.FREE } } }),
        prisma.user.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          select: { id: true, email: true, firstName: true, lastName: true, role: true, subscriptionTier: true, createdAt: true },
        }),
        prisma.examAttempt.findMany({
          take: 5,
          orderBy: { startedAt: 'desc' },
          include: {
            user: { select: { email: true, firstName: true, lastName: true } },
            exam: { select: { title: true } },
          },
        }),
      ]);

      return res.status(200).json(adminResponse({
        stats: {
          totalUsers,
          totalStudents,
          totalAdminsInstructors,
          totalAttempts,
          completedAttempts,
          totalAiCalls,
          activeSubscriptions,
        },
        recentUsers,
        recentAttempts,
      }));
    } catch (error) {
      console.error('[Admin] getDashboardStats error:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch dashboard stats.' });
    }
  }

  // ─── USERS ─────────────────────────────────────────────────────────────────

  public static async getUsers(req: AuthenticatedRequest, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const search = (req.query.search as string) || '';
      const role = req.query.role as string;
      const tier = req.query.tier as string;
      const skip = (page - 1) * limit;

      const where: any = {};
      if (search) {
        where.OR = [
          { email: { contains: search, mode: 'insensitive' } },
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
        ];
      }
      if (role && Object.values(Role).includes(role as Role)) {
        where.role = role as Role;
      }
      if (tier && Object.values(SubscriptionTier).includes(tier as SubscriptionTier)) {
        where.subscriptionTier = tier as SubscriptionTier;
      }

      const [users, total] = await Promise.all([
        prisma.user.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
            subscriptionTier: true,
            subActiveUntil: true,
            isEmailVerified: true,
            createdAt: true,
            _count: { select: { examAttempts: true, aiUsageLogs: true } },
          },
        }),
        prisma.user.count({ where }),
      ]);

      return res.status(200).json(adminResponse({
        users,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      }));
    } catch (error) {
      console.error('[Admin] getUsers error:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch users.' });
    }
  }

  public static async getUserById(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          examAttempts: {
            orderBy: { startedAt: 'desc' },
            take: 10,
            include: { exam: { select: { title: true } }, feedbacks: true },
          },
          aiUsageLogs: {
            orderBy: { timestamp: 'desc' },
            take: 20,
          },
          _count: { select: { examAttempts: true, aiUsageLogs: true, progress: true } },
        },
      });

      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found.' });
      }

      // Never expose passwordHash
      const { passwordHash, resetToken, verificationToken, ...safeUser } = user as any;
      return res.status(200).json(adminResponse({ user: safeUser }));
    } catch (error) {
      console.error('[Admin] getUserById error:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch user.' });
    }
  }

  public static async updateUserRole(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const { role } = req.body;

      if (!role || !Object.values(Role).includes(role)) {
        return res.status(400).json({ success: false, error: 'Invalid role value.' });
      }

      // Only SUPER_ADMIN can promote/demote admins
      if ([Role.ADMIN, Role.SUPER_ADMIN, Role.INSTRUCTOR].includes(role) && req.user?.role !== Role.SUPER_ADMIN) {
        return res.status(403).json({ success: false, error: 'Only Super Admins can assign admin roles.' });
      }

      const target = await prisma.user.findUnique({ where: { id } });
      if (!target) return res.status(404).json({ success: false, error: 'User not found.' });

      // Prevent demoting another SUPER_ADMIN unless you're one too
      if (target.role === Role.SUPER_ADMIN && req.user?.role !== Role.SUPER_ADMIN) {
        return res.status(403).json({ success: false, error: 'Cannot modify a Super Admin.' });
      }

      const updated = await prisma.user.update({
        where: { id },
        data: { role },
        select: { id: true, email: true, role: true },
      });

      return res.status(200).json(adminResponse({ user: updated }));
    } catch (error) {
      console.error('[Admin] updateUserRole error:', error);
      return res.status(500).json({ success: false, error: 'Failed to update role.' });
    }
  }

  public static async deleteUser(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;

      const target = await prisma.user.findUnique({ where: { id } });
      if (!target) return res.status(404).json({ success: false, error: 'User not found.' });
      if (target.role === Role.SUPER_ADMIN) {
        return res.status(403).json({ success: false, error: 'Cannot delete a Super Admin account.' });
      }

      await prisma.user.delete({ where: { id } });
      return res.status(200).json(adminResponse({ message: 'User deleted successfully.' }));
    } catch (error) {
      console.error('[Admin] deleteUser error:', error);
      return res.status(500).json({ success: false, error: 'Failed to delete user.' });
    }
  }

  // ─── SUBSCRIPTIONS ─────────────────────────────────────────────────────────

  public static async getSubscriptions(req: AuthenticatedRequest, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const tier = req.query.tier as string;
      const skip = (page - 1) * limit;

      const where: any = {};
      if (tier && Object.values(SubscriptionTier).includes(tier as SubscriptionTier)) {
        where.subscriptionTier = tier as SubscriptionTier;
      }

      const [users, total] = await Promise.all([
        prisma.user.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            subscriptionTier: true,
            subActiveUntil: true,
            stripeCustomerId: true,
            subscriptionId: true,
            createdAt: true,
          },
        }),
        prisma.user.count({ where }),
      ]);

      return res.status(200).json(adminResponse({
        subscriptions: users,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      }));
    } catch (error) {
      console.error('[Admin] getSubscriptions error:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch subscriptions.' });
    }
  }

  public static async updateSubscription(req: AuthenticatedRequest, res: Response) {
    try {
      const { userId } = req.params;
      const { tier, extendDays, cancel } = req.body;

      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) return res.status(404).json({ success: false, error: 'User not found.' });

      const updateData: any = {};

      if (cancel) {
        updateData.subscriptionTier = SubscriptionTier.FREE;
        updateData.subActiveUntil = null;
        updateData.subscriptionId = null;
      } else {
        if (tier && Object.values(SubscriptionTier).includes(tier)) {
          updateData.subscriptionTier = tier;
        }
        if (extendDays && typeof extendDays === 'number') {
          const base = user.subActiveUntil && user.subActiveUntil > new Date()
            ? user.subActiveUntil
            : new Date();
          updateData.subActiveUntil = new Date(base.getTime() + extendDays * 24 * 60 * 60 * 1000);
        }
      }

      const updated = await prisma.user.update({
        where: { id: userId },
        data: updateData,
        select: { id: true, email: true, subscriptionTier: true, subActiveUntil: true },
      });

      return res.status(200).json(adminResponse({ user: updated }));
    } catch (error) {
      console.error('[Admin] updateSubscription error:', error);
      return res.status(500).json({ success: false, error: 'Failed to update subscription.' });
    }
  }

  // ─── EXAMS ─────────────────────────────────────────────────────────────────

  public static async getExams(req: AuthenticatedRequest, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const skip = (page - 1) * limit;

      const [exams, total] = await Promise.all([
        prisma.tcfExam.findMany({
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: {
            _count: { select: { sections: true, attempts: true } },
          },
        }),
        prisma.tcfExam.count(),
      ]);

      return res.status(200).json(adminResponse({
        exams,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      }));
    } catch (error) {
      console.error('[Admin] getExams error:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch exams.' });
    }
  }

  public static async getExamById(req: AuthenticatedRequest, res: Response) {
    try {
      const exam = await prisma.tcfExam.findUnique({
        where: { id: req.params.id },
        include: {
          sections: {
            orderBy: { orderIndex: 'asc' },
            include: { _count: { select: { questions: true } } },
          },
          _count: { select: { attempts: true } },
        },
      });
      if (!exam) return res.status(404).json({ success: false, error: 'Exam not found.' });
      return res.status(200).json(adminResponse({ exam }));
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Failed to fetch exam.' });
    }
  }

  public static async createExam(req: AuthenticatedRequest, res: Response) {
    try {
      const { title, description, isOfficial } = req.body;
      if (!title || !description) {
        return res.status(400).json({ success: false, error: 'Title and description are required.' });
      }
      const exam = await prisma.tcfExam.create({ data: { title, description, isOfficial: Boolean(isOfficial) } });
      return res.status(201).json(adminResponse({ exam }));
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Failed to create exam.' });
    }
  }

  public static async updateExam(req: AuthenticatedRequest, res: Response) {
    try {
      const { title, description, isOfficial } = req.body;
      const exam = await prisma.tcfExam.update({
        where: { id: req.params.id },
        data: { title, description, isOfficial: Boolean(isOfficial) },
      });
      return res.status(200).json(adminResponse({ exam }));
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Failed to update exam.' });
    }
  }

  public static async deleteExam(req: AuthenticatedRequest, res: Response) {
    try {
      await prisma.tcfExam.delete({ where: { id: req.params.id } });
      return res.status(200).json(adminResponse({ message: 'Exam deleted.' }));
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Failed to delete exam.' });
    }
  }

  // ─── QUESTIONS ─────────────────────────────────────────────────────────────

  public static async getQuestions(req: AuthenticatedRequest, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 25;
      const sectionId = req.query.sectionId as string;
      const examId = req.query.examId as string;
      const skip = (page - 1) * limit;

      const where: any = {};
      if (sectionId) where.sectionId = sectionId;
      if (examId) where.section = { examId };

      const [questions, total] = await Promise.all([
        prisma.tcfQuestion.findMany({
          where,
          skip,
          take: limit,
          orderBy: { orderIndex: 'asc' },
          include: { section: { select: { type: true, exam: { select: { title: true } } } } },
        }),
        prisma.tcfQuestion.count({ where }),
      ]);

      return res.status(200).json(adminResponse({
        questions,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      }));
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Failed to fetch questions.' });
    }
  }

  public static async createQuestion(req: AuthenticatedRequest, res: Response) {
    try {
      const { sectionId, text, options, correctKey, audioUrl, imageUrl, maxScore, orderIndex } = req.body;
      if (!sectionId || !text) {
        return res.status(400).json({ success: false, error: 'sectionId and text are required.' });
      }
      const question = await prisma.tcfQuestion.create({
        data: { sectionId, text, options, correctKey, audioUrl, imageUrl, maxScore: maxScore || 1, orderIndex: orderIndex || 0 },
      });
      return res.status(201).json(adminResponse({ question }));
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Failed to create question.' });
    }
  }

  public static async updateQuestion(req: AuthenticatedRequest, res: Response) {
    try {
      const { text, options, correctKey, audioUrl, imageUrl, maxScore, orderIndex } = req.body;
      const question = await prisma.tcfQuestion.update({
        where: { id: req.params.id },
        data: { text, options, correctKey, audioUrl, imageUrl, maxScore, orderIndex },
      });
      return res.status(200).json(adminResponse({ question }));
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Failed to update question.' });
    }
  }

  public static async deleteQuestion(req: AuthenticatedRequest, res: Response) {
    try {
      await prisma.tcfQuestion.delete({ where: { id: req.params.id } });
      return res.status(200).json(adminResponse({ message: 'Question deleted.' }));
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Failed to delete question.' });
    }
  }

  // ─── ATTEMPTS ──────────────────────────────────────────────────────────────

  public static async getAttempts(req: AuthenticatedRequest, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const userId = req.query.userId as string;
      const examId = req.query.examId as string;
      const skip = (page - 1) * limit;

      const where: any = {};
      if (userId) where.userId = userId;
      if (examId) where.examId = examId;

      const [attempts, total] = await Promise.all([
        prisma.examAttempt.findMany({
          where,
          skip,
          take: limit,
          orderBy: { startedAt: 'desc' },
          include: {
            user: { select: { email: true, firstName: true, lastName: true } },
            exam: { select: { title: true } },
            feedbacks: { select: { sectionType: true, overallScore: true } },
          },
        }),
        prisma.examAttempt.count({ where }),
      ]);

      return res.status(200).json(adminResponse({
        attempts,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      }));
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Failed to fetch attempts.' });
    }
  }

  public static async getAttemptById(req: AuthenticatedRequest, res: Response) {
    try {
      const attempt = await prisma.examAttempt.findUnique({
        where: { id: req.params.id },
        include: {
          user: { select: { email: true, firstName: true, lastName: true } },
          exam: { include: { sections: { include: { questions: true } } } },
          feedbacks: true,
        },
      });
      if (!attempt) return res.status(404).json({ success: false, error: 'Attempt not found.' });
      return res.status(200).json(adminResponse({ attempt }));
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Failed to fetch attempt.' });
    }
  }

  // ─── AI FEEDBACK ───────────────────────────────────────────────────────────

  public static async getAiFeedback(req: AuthenticatedRequest, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const skip = (page - 1) * limit;

      const [feedbacks, total] = await Promise.all([
        prisma.aIFeedback.findMany({
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: {
            attempt: {
              include: {
                user: { select: { email: true, firstName: true, lastName: true } },
                exam: { select: { title: true } },
              },
            },
          },
        }),
        prisma.aIFeedback.count(),
      ]);

      return res.status(200).json(adminResponse({
        feedbacks,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      }));
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Failed to fetch AI feedback.' });
    }
  }

  // ─── AI USAGE LOGS ─────────────────────────────────────────────────────────

  public static async getAiUsageLogs(req: AuthenticatedRequest, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 25;
      const service = req.query.service as string;
      const userId = req.query.userId as string;
      const skip = (page - 1) * limit;

      const where: any = {};
      if (service) where.service = { contains: service, mode: 'insensitive' };
      if (userId) where.userId = userId;

      const [logs, total, totalTokens] = await Promise.all([
        prisma.aIUsageLog.findMany({
          where,
          skip,
          take: limit,
          orderBy: { timestamp: 'desc' },
          include: { user: { select: { email: true, firstName: true, lastName: true } } },
        }),
        prisma.aIUsageLog.count({ where }),
        prisma.aIUsageLog.aggregate({
          _sum: { inputToken: true, outputToken: true, costUSD: true },
          where,
        }),
      ]);

      return res.status(200).json(adminResponse({
        logs,
        totals: totalTokens._sum,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      }));
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Failed to fetch AI usage logs.' });
    }
  }

  // ─── ACADEMY ───────────────────────────────────────────────────────────────

  public static async getAcademy(req: AuthenticatedRequest, res: Response) {
    try {
      const levels = await prisma.level.findMany({
        orderBy: { code: 'asc' },
        include: {
          modules: {
            orderBy: { orderIndex: 'asc' },
            include: {
              lessons: {
                orderBy: { orderIndex: 'asc' },
                include: { _count: { select: { exercises: true } } },
              },
              _count: { select: { lessons: true } },
            },
          },
        },
      });
      return res.status(200).json(adminResponse({ levels }));
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Failed to fetch academy content.' });
    }
  }

  public static async getLessonDetail(req: AuthenticatedRequest, res: Response) {
    try {
      const lesson = await prisma.lesson.findUnique({
        where: { id: req.params.id },
        include: { exercises: true },
      });
      if (!lesson) return res.status(404).json({ success: false, error: 'Lesson not found.' });
      return res.status(200).json(adminResponse({ lesson }));
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Failed to fetch lesson.' });
    }
  }

  // ─── USER SUSPENSION ───────────────────────────────────────────────────────

  public static async updateUserStatus(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const { isSuspended } = req.body;

      if (typeof isSuspended !== 'boolean') {
        return res.status(400).json({ success: false, error: 'isSuspended (boolean) is required.' });
      }

      const target = await prisma.user.findUnique({ where: { id } });
      if (!target) return res.status(404).json({ success: false, error: 'User not found.' });

      if (target.role === Role.SUPER_ADMIN) {
        return res.status(403).json({ success: false, error: 'Cannot suspend a Super Admin.' });
      }

      const updated = await prisma.user.update({
        where: { id },
        data: { isSuspended },
        select: { id: true, email: true, isSuspended: true },
      });

      return res.status(200).json(adminResponse({ user: updated }));
    } catch (error) {
      console.error('[Admin] updateUserStatus error:', error);
      return res.status(500).json({ success: false, error: 'Failed to update user status.' });
    }
  }

  // ─── AI FEEDBACK REVIEW ────────────────────────────────────────────────────

  public static async reviewAiFeedback(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const { isReviewed } = req.body;

      const fb = await prisma.aIFeedback.findUnique({ where: { id } });
      if (!fb) return res.status(404).json({ success: false, error: 'AI feedback not found.' });

      const updated = await prisma.aIFeedback.update({
        where: { id },
        data: {
          isReviewed: Boolean(isReviewed),
          reviewedAt: isReviewed ? new Date() : null,
        },
      });

      return res.status(200).json(adminResponse({ feedback: updated }));
    } catch (error) {
      console.error('[Admin] reviewAiFeedback error:', error);
      return res.status(500).json({ success: false, error: 'Failed to review AI feedback.' });
    }
  }

  // ─── EMAIL LOGS ────────────────────────────────────────────────────────────

  public static async getEmailLogs(req: AuthenticatedRequest, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 25;
      const search = (req.query.search as string) || '';
      const status = req.query.status as string;
      const skip = (page - 1) * limit;

      const where: any = {};
      if (search) {
        where.toEmail = { contains: search, mode: 'insensitive' };
      }
      if (status) {
        where.status = status;
      }

      const [logs, total] = await Promise.all([
        prisma.emailLog.findMany({
          where,
          skip,
          take: limit,
          orderBy: { sentAt: 'desc' },
        }),
        prisma.emailLog.count({ where }),
      ]);

      return res.status(200).json(adminResponse({
        logs,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      }));
    } catch (error) {
      console.error('[Admin] getEmailLogs error:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch email logs.' });
    }
  }

  public static async resendVerification(req: AuthenticatedRequest, res: Response) {
    try {
      const { userId } = req.params;
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) return res.status(404).json({ success: false, error: 'User not found.' });

      const token = user.verificationToken || Math.random().toString(36).substring(2, 15);
      
      if (!user.verificationToken) {
        await prisma.user.update({
          where: { id: userId },
          data: { verificationToken: token },
        });
      }

      const { EmailService } = require('../services/email.service');
      await EmailService.sendVerificationEmail(user.email, token, user.firstName || undefined);

      return res.status(200).json(adminResponse({ message: 'Verification email sent successfully.' }));
    } catch (error) {
      console.error('[Admin] resendVerification error:', error);
      return res.status(500).json({ success: false, error: 'Failed to resend verification.' });
    }
  }

  // ─── PLATFORM SETTINGS ─────────────────────────────────────────────────────

  public static async getSettings(req: AuthenticatedRequest, res: Response) {
    try {
      const settings = await prisma.platformSetting.findMany();
      const config: Record<string, string> = {};
      settings.forEach(s => {
        config[s.key] = s.value;
      });
      return res.status(200).json(adminResponse({ settings: config }));
    } catch (error) {
      console.error('[Admin] getSettings error:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch settings.' });
    }
  }

  public static async updateSettings(req: AuthenticatedRequest, res: Response) {
    try {
      const { settings } = req.body;
      if (!settings || typeof settings !== 'object') {
        return res.status(400).json({ success: false, error: 'Settings object is required.' });
      }

      await Promise.all(
        Object.entries(settings).map(([key, value]) => 
          prisma.platformSetting.upsert({
            where: { key },
            update: { value: String(value) },
            create: { key, value: String(value) },
          })
        )
      );

      return res.status(200).json(adminResponse({ message: 'Settings updated successfully.' }));
    } catch (error) {
      console.error('[Admin] updateSettings error:', error);
      return res.status(500).json({ success: false, error: 'Failed to update settings.' });
    }
  }
}

