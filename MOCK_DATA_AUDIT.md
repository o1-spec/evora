# Mock Data Audit - Évora Platform

This document lists all mock data, fallbacks, and test implementations throughout the application that should be replaced or updated for production.

---

## 🎯 Backend Mock Data

### 1. **Auth Controller - Mocked Email**
- **File**: `backend/src/controllers/auth.controller.ts` (Line 257+)
- **Issue**: Password reset emails are logged to console, not actually sent
- **Status**: ⚠️ MOCK
- **Fix Required**: Implement real email service (SendGrid, AWS SES, or Nodemailer)
```typescript
// MOCK Email send
console.log(`[MOCK EMAIL] Password reset token for ${email}: ${resetToken}`);
```

---

### 2. **ElevenLabs Voice Synthesis Fallback**
- **File**: `backend/src/services/elevenlabs.service.ts` (Line 41-60)
- **Issue**: If ElevenLabs API fails or is not configured, falls back to dummy MP3
- **Status**: ⚠️ FALLBACK (no actual voice synthesis happens)
- **Fix Required**: Set up real ElevenLabs API key in `.env`
```typescript
// Falls back to dummy/mock silent MP3 if API fails
const mockMp3Base64 = 'SUQzBAAAAAAAI1RTU0UAAAAPAAADTGFtZTMuMTAwA1VUAQALAAADLwAAAAA=';
fs.writeFileSync(fullOutputPath, Buffer.from(mockMp3Base64, 'base64'));
```
- **Env Vars**: `ELEVENLABS_API_KEY` (currently empty)

---

### 3. **Whisper Transcription - Offline Fallback**
- **File**: `backend/src/services/whisper.service.ts` (Line 43+)
- **Issue**: Mock transcripts returned if OpenAI Whisper API is not available
- **Status**: ⚠️ FALLBACK
- **Fix Required**: Configure real OpenAI API key
```typescript
private static getOfflineTranscript(): string {
  const mockTranscripts = [
    "Bonjour, je m'appelle Pierre...",
    "Oui, je suis tout à fait d'accord...",
    // ... more mock transcripts
  ];
}
```
- **Env Vars**: `OPENAI_API_KEY` (currently empty)

---

### 4. **Stripe Payment - Sandbox Mode**
- **File**: `backend/src/services/stripe.service.ts` (Line 166+)
- **Issue**: `processSandboxUpgrade()` creates fake subscription IDs for testing
- **Status**: ⚠️ SANDBOX (for development only)
- **Fix Required**: Remove sandbox method or gate it behind environment checks
```typescript
public static async processSandboxUpgrade(userId: string, tier: SubscriptionTier): Promise<void> {
  // Creates fake subscription IDs like: sub_sandbox_xxxxx
  subscriptionId: `sub_sandbox_${Math.random().toString(36).substring(4)}`
}
```
- **Env Vars**: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` (currently empty - will use mocks)

---

### 5. **Database Seeds - Mock TCF Exam Questions**
- **File**: `backend/src/seeds/index.ts` (Line 151-312)
- **Issue**: Database seeded with ~40 mock TCF exams and questions for testing
- **Status**: ✅ ACCEPTABLE (seed data for development/testing)
- **Data Seeded**:
  - 6 CEFR levels (A1, A2, B1, B2, C1, C2)
  - Sample lessons and exercises
  - Complete TCF Canada practice exam with 4 sections
  - 40 training series with reading/writing/speaking tasks
  - Mock exam data from `written_tasks.json`, `oral_tasks.json`, `reading_questions.json`
- **Action**: Keep for testing, replace with real exam data in production

---

## 🎯 Frontend Mock Data

### 1. **TCF Questions - Generated Mock**
- **File**: `frontend/src/lib/tcfQuestions.ts` (Line 54+)
- **Issue**: `generateMockQuestions()` creates fake questions for WRITING/LISTENING/SPEAKING sections
- **Status**: ⚠️ MOCK (fallback if real data unavailable)
- **Fix Required**: Ensure API always returns real questions
```typescript
export const generateMockQuestions = (section: 'WRITING' | 'LISTENING' | 'SPEAKING') => {
  // Generates 39 fake questions with random options
}
```

---

### 2. **Training Series Grid - Simulated Answers**
- **File**: `frontend/src/components/portal/TrainingSeriesGrid.tsx` (Line 258-270)
- **Issue**: "Auto-fill answers" feature generates fake answers with 78% accuracy
- **Status**: ⚠️ MOCK (for demonstration only)
- **Fix Required**: Remove or hide this feature in production
```typescript
const simulatedAnswers: Record<number, string> = {};
simulatedAnswers[1] = "Bonjour Antoine, j'espère que tu vas bien..."; // Fake answer
const hitRate = 0.78; // 78% accuracy simulation
```

---

### 3. **Hero Section - Mock Dashboard Card**
- **File**: `frontend/src/components/portal/HeroSection.tsx` (Line 185-340)
- **Issue**: Landing page shows fake "Your Progress" dashboard card as mockup
- **Status**: ✅ ACCEPTABLE (visual demonstration)
- **Data Shown**:
  - Fake CLB 7 level
  - Fake 24 lessons completed
  - Mock speaking feedback
  - Mock next lesson info

---

### 4. **Register Page - Carousel Slides**
- **File**: `frontend/src/app/register/page.tsx` (Line 20+)
- **Issue**: Registration page shows carousel with demo features and fake benefits
- **Status**: ✅ ACCEPTABLE (marketing material)
- **Content**: Feature descriptions, benefit slides, etc.

---

### 5. **Exam Report - Mock CLB Colors**
- **File**: `frontend/src/app/dashboard/exams/report/[attemptId]/page.tsx` (Line 1-15)
- **Issue**: Color mapping for CLB scores hardcoded
- **Status**: ✅ ACCEPTABLE (visual styling)
```typescript
const CLB_COLOR: Record<string, string> = {
  'CLB 4': '#ef4444', 'CLB 5': '#f97316', // ... etc
};
```

---

## 🎯 Configuration Mocks

### 1. **JWT Secrets - Default Fallback**
- **File**: `backend/src/controllers/auth.controller.ts` (Line 7-10)
- **Issue**: Default JWT secrets used if not in `.env`
- **Status**: 🔴 CRITICAL - MUST change for production
- **Fix Required**: Set proper secrets in production `.env`
```typescript
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'evora_super_jwt_access_secret_key_change_me_in_production_123!';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'evora_super_jwt_refresh_secret_key_change_me_in_production_456!';
```

---

## 📋 Checklist for Production Deployment

### Critical (Must Fix)
- [ ] **JWT Secrets**: Replace default secrets in `.env`
- [ ] **Stripe Keys**: Add real `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`
- [ ] **OpenAI API**: Add real `OPENAI_API_KEY` 
- [ ] **ElevenLabs API**: Add real `ELEVENLABS_API_KEY`
- [ ] **Email Service**: Implement real email sending (not console.log)
- [ ] **Remove Sandbox Mode**: Delete `/api/billing/sandbox-upgrade` endpoint or gate it

### Important (Should Fix)
- [ ] Remove auto-fill answers demo feature from training series
- [ ] Clear database and re-seed with real TCF exam questions
- [ ] Add real exam data import from official TCF Canada source
- [ ] Implement rate limiting on API endpoints
- [ ] Add CORS restrictions
- [ ] Enable HTTPS only

### Nice to Have
- [ ] Add analytics/monitoring
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Implement CDN for static assets
- [ ] Add caching strategies

---

## 🔧 Environment Variables to Configure

```bash
# Critical
JWT_ACCESS_SECRET="your-super-secret-key-change-me"
JWT_REFRESH_SECRET="your-super-secret-key-change-me"
STRIPE_SECRET_KEY="sk_live_your_real_stripe_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"
OPENAI_API_KEY="sk-your-openai-key"
ELEVENLABS_API_KEY="your-elevenlabs-api-key"

# Important
DATABASE_URL="postgresql://user:password@prod-db-host:5432/evora"
REDIS_HOST="prod-redis-host"
REDIS_PORT="6379"
PORT="5001"

# Optional
CLOUDINARY_URL="cloudinary://your-cloudinary-url"
```

---

## 📞 Support

For production issues or questions about replacing mock data:
- Review `.env.example` for all available configuration options
- Check individual service files for API requirements
- Ensure all API keys are valid before deploying
