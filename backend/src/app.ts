import type { Application, Request, Response } from 'express';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const expressLib = require('express');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const cors = require('cors');
import * as path from 'path';
import authRouter from './routes/auth.routes';
import learningRouter from './routes/learning.routes';
import tcfRouter from './routes/tcf.routes';
import aiRouter from './routes/ai.routes';
import billingRouter from './routes/billing.routes';
import { errorMiddleware } from './middlewares/error.middleware';

const app: Application = expressLib();

// Configure CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Serve Stripe webhooks with raw body parser BEFORE standard JSON parser
app.use('/api/billing', billingRouter);

// Standard parsers for all other routes
app.use(expressLib.json());
app.use(expressLib.urlencoded({ extended: true }));

// Serve static assets (e.g. generated voice files)
app.use('/static', expressLib.static(path.join(__dirname, '../public')));

// Mount API routes
app.use('/api/auth', authRouter);
app.use('/api/learning', learningRouter);
app.use('/api/tcf', tcfRouter);
app.use('/api/ai', aiRouter);

// Health Check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// Central Error Interceptor Middleware
app.use(errorMiddleware as any);

export default app;
