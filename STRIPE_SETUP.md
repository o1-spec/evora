# Stripe Production Setup Guide

## Overview
This guide walks you through setting up real Stripe payment processing for Évora. The Developer Sandbox Mode has been removed and the application is now configured for production.

## Step 1: Create a Stripe Account
1. Go to [stripe.com](https://stripe.com)
2. Sign up for a Stripe account or log in
3. Complete your account verification

## Step 2: Get Your API Keys
1. In the Stripe Dashboard, go to **Developers** → **API Keys**
2. You'll see two sets of keys:
   - **Publishable Key** (starts with `pk_`)
   - **Secret Key** (starts with `sk_`)
3. You'll need the **Secret Key** for backend

**Important:** Keep your Secret Key confidential! Never commit it to version control.

## Step 3: Create Price Objects in Stripe
You need to create three products and pricing tiers:

### Free Plan (No payment needed)
- Product Name: "Évora Free Plan"
- Price: $0/month (if supported) or just skip Stripe integration for free tier

### Basic Plan
1. Create Product: "Évora Basic Plan"
2. Create Price: €19/month
3. Copy the Price ID (starts with `price_`)

### Premium Plan
1. Create Product: "Évora Premium Plan"
2. Create Price: €39/month
3. Copy the Price ID (starts with `price_`)

### Pro Plan
1. Create Product: "Évora Pro Plan"
2. Create Price: €79/month
3. Copy the Price ID (starts with `price_`)

## Step 4: Set Up Webhooks (Optional but Recommended)
1. Go to **Developers** → **Webhooks**
2. Click "Add endpoint"
3. Endpoint URL: `https://yourdomain.com/api/billing/webhook`
4. Select events:
   - `charge.succeeded`
   - `charge.failed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the Webhook Secret (starts with `whsec_`)

## Step 5: Update Your `.env` File
Replace the empty Stripe settings in `backend/.env`:

```properties
# Stripe Settings (Production Keys)
STRIPE_SECRET_KEY="sk_live_YOUR_SECRET_KEY_HERE"
STRIPE_WEBHOOK_SECRET="whsec_YOUR_WEBHOOK_SECRET_HERE"
STRIPE_BASIC_PRICE_ID="price_YOUR_BASIC_PRICE_ID"
STRIPE_PREMIUM_PRICE_ID="price_YOUR_PREMIUM_PRICE_ID"
STRIPE_PRO_PRICE_ID="price_YOUR_PRO_PRICE_ID"
```

## Step 6: Update Frontend Configuration
In `frontend/src/lib/api.ts`, ensure your checkout endpoint is pointing to your production backend.

## Step 7: Test the Integration
1. Restart your backend server
2. Navigate to the Subscription & Billing page
3. Click "Subscribe" on any plan
4. You'll be redirected to Stripe Checkout
5. Test with Stripe test card: `4242 4242 4242 4242`
6. Use any future expiration date and any CVC

## Step 8: Deploy to Production
When deploying:
1. Use **Stripe Live Keys** (not test keys)
2. Set secure environment variables on your hosting platform
3. Verify webhook endpoints are configured correctly
4. Enable HTTPS (required by Stripe)

## Test Mode vs Live Mode
- **Test Mode Keys** (start with `pk_test_` and `sk_test_`): For development and testing
- **Live Mode Keys** (start with `pk_live_` and `sk_live_`): For production, handles real payments

**Important:** Never use live keys in development!

## Stripe Test Cards
For testing in development:

| Card Number | Status |
|---|---|
| 4242 4242 4242 4242 | Successful payment |
| 5555 5555 5555 4444 | Mastercard test |
| 4000 0000 0000 9995 | Declined |
| 3782 822463 10005 | American Express |

## Troubleshooting

### "Invalid API Key" Error
- Check that you're using the correct Secret Key (from Stripe Dashboard)
- Ensure no extra spaces in the `.env` file

### Webhook Not Firing
- Verify webhook endpoint URL is publicly accessible
- Check webhook secret matches in `.env`
- Use Stripe Dashboard → Developers → Webhooks to view delivery attempts

### Checkout Redirects to Error
- Verify all Price IDs are correct
- Ensure your Stripe account is fully verified
- Check CORS settings if using a separate frontend domain

## Need Help?
- Stripe Documentation: [stripe.com/docs](https://stripe.com/docs)
- Stripe Support: [support.stripe.com](https://support.stripe.com)
- Évora Issues: Check your GitHub repository

---

**Status:** ✅ Sandbox mode removed. Ready for production Stripe integration.
