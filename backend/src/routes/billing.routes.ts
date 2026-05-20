import { Router } from 'express';
import { BillingController } from '../controllers/billing.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const express = require('express');

const router = Router();

// Public plan directory
router.get('/plans', BillingController.getPlans);

// Raw text parse needed for Stripe webhook signature verification
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  BillingController.stripeWebhook
);

// Protected billing routes
router.use(authMiddleware as any);
router.post('/checkout', BillingController.checkout as any);
router.post('/portal', BillingController.customerPortal as any);

// Developer Sandbox local upgrade trigger
router.post('/sandbox-upgrade', BillingController.handleSandboxUpgrade as any);

export default router;
