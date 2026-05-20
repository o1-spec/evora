import { Router } from 'express';
import { AiController } from '../controllers/ai.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { checkAiUsageLimit } from '../middlewares/limit.middleware';
import type { StorageEngine } from 'multer';
import * as path from 'path';
import * as fs from 'fs';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const multerFn: any = require('multer');

// Configure local temp upload directory for speech recordings
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage: StorageEngine = multerFn.diskStorage({
  destination: (_req: any, _file: any, cb: (arg0: null, arg1: string) => void) => {
    cb(null, uploadDir);
  },
  filename: (_req: any, file: { originalname: string; }, cb: (arg0: null, arg1: string) => void) => {
    const ext = file.originalname ? path.extname(file.originalname) : '.wav';
    cb(null, `speech_${Date.now()}${ext}`);
  },
});

const upload = multerFn({ storage, limits: { fileSize: 15 * 1024 * 1024 } });

const router = Router();

router.use(authMiddleware as any);

// Evaluate speech with subscription limit checks and file upload handling
router.post(
  '/evaluate-speech',
  checkAiUsageLimit as any,
  upload.single('audio'),
  AiController.evaluateSpeech as any
);

router.post('/synthesize-text', AiController.synthesizeText as any);
router.post('/tutor-chat', AiController.tutorChat as any);

export default router;
