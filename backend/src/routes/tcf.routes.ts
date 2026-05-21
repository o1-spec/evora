import { Router } from 'express';
import { TcfController } from '../controllers/tcf.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { checkExamAttemptLimit } from '../middlewares/limit.middleware';

const router = Router();

router.use(authMiddleware as any);

router.get('/exams', TcfController.getExams as any);
router.get('/history', TcfController.getHistory as any);
router.get('/exams/:examId', TcfController.getExamDetails as any);

// Start an attempt with dynamic limit verification
router.post('/attempts/start', checkExamAttemptLimit as any, TcfController.startAttempt as any);
router.post('/attempts/:attemptId/submit', TcfController.submitAttempt as any);
router.get('/attempts/:attemptId/report', TcfController.getAttemptReport as any);

export default router;
