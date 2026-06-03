import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireAdmin, requireSuperAdmin } from '../middlewares/admin.middleware';
import { AdminController } from '../controllers/admin.controller';

const router = Router();

// All admin routes require authentication + admin role
router.use(authMiddleware as any);
router.use(requireAdmin as any);

// ─── Dashboard ───────────────────────────────────────────────────────────────
router.get('/stats', AdminController.getDashboardStats as any);

// ─── Users ───────────────────────────────────────────────────────────────────
router.get('/users', AdminController.getUsers as any);
router.get('/users/:id', AdminController.getUserById as any);
router.patch('/users/:id/role', AdminController.updateUserRole as any);
router.patch('/users/:id/status', AdminController.updateUserStatus as any);
router.delete('/users/:id', requireSuperAdmin as any, AdminController.deleteUser as any);

// ─── Subscriptions ───────────────────────────────────────────────────────────
router.get('/subscriptions', AdminController.getSubscriptions as any);
router.patch('/subscriptions/:userId', AdminController.updateSubscription as any);

// ─── Exams ───────────────────────────────────────────────────────────────────
router.get('/exams', AdminController.getExams as any);
router.get('/exams/:id', AdminController.getExamById as any);
router.post('/exams', AdminController.createExam as any);
router.patch('/exams/:id', AdminController.updateExam as any);
router.delete('/exams/:id', AdminController.deleteExam as any);

// ─── Questions ───────────────────────────────────────────────────────────────
router.get('/questions', AdminController.getQuestions as any);
router.post('/questions', AdminController.createQuestion as any);
router.post('/questions/import', AdminController.importQuestions as any);
router.patch('/questions/:id', AdminController.updateQuestion as any);
router.delete('/questions/:id', AdminController.deleteQuestion as any);

// ─── Attempts ────────────────────────────────────────────────────────────────
router.get('/attempts', AdminController.getAttempts as any);
router.get('/attempts/:id', AdminController.getAttemptById as any);

// ─── AI Feedback ─────────────────────────────────────────────────────────────
router.get('/ai-feedback', AdminController.getAiFeedback as any);
router.patch('/ai-feedback/:id/review', AdminController.reviewAiFeedback as any);

// ─── AI Usage Logs ───────────────────────────────────────────────────────────
router.get('/ai-usage', AdminController.getAiUsageLogs as any);

// ─── Email Logs ──────────────────────────────────────────────────────────────
router.get('/email-logs', AdminController.getEmailLogs as any);
router.post('/email-logs/resend/:userId', AdminController.resendVerification as any);

// ─── Audit Logs ──────────────────────────────────────────────────────────────
router.get('/audit-logs', AdminController.getAuditLogs as any);

// ─── Platform Settings ───────────────────────────────────────────────────────
router.get('/settings', AdminController.getSettings as any);
router.patch('/settings', AdminController.updateSettings as any);

// ─── Academy Content ─────────────────────────────────────────────────────────
router.get('/academy', AdminController.getAcademy as any);
router.get('/academy/lessons/:id', AdminController.getLessonDetail as any);

export default router;
