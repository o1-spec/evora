import { Router } from 'express';
import { LearningController } from '../controllers/learning.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware as any);

router.get('/levels', LearningController.getLevels as any);
router.get('/levels/:code', LearningController.getLevelByCode as any);
router.get('/lessons/:lessonId', LearningController.getLesson as any);
router.post('/exercises/:exerciseId/submit', LearningController.submitAnswer as any);

export default router;
