import * as nodemailer from 'nodemailer';

const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const FROM_NAME = 'Évora Academy';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

if (!SMTP_USER || !SMTP_PASS) {
  console.warn('[EmailService] ⚠️  SMTP_USER or SMTP_PASS missing – emails will fail at runtime.');
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // SSL
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

// Verify connection at startup (non-blocking)
transporter.verify()
  .then(() => console.log('[EmailService] ✅ Gmail SMTP connection verified.'))
  .catch((err) => console.error('[EmailService] ❌ SMTP verification failed:', err.message));

export class EmailService {
  /**
   * Send a welcome / email-verification link after registration
   */
  public static async sendVerificationEmail(toEmail: string, token: string, firstName?: string): Promise<void> {
    const verifyUrl = `${FRONTEND_URL}/verify-email?token=${token}`;
    const name = firstName || 'there';

    await transporter.sendMail({
      from: `"${FROM_NAME}" <${SMTP_USER}>`,
      to: toEmail,
      subject: 'Bienvenue sur Évora ! Vérifiez votre adresse email 🎉',
      html: `
        <div style="font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:520px;margin:0 auto;padding:40px 24px;background:#ffffff;">
          <div style="text-align:center;margin-bottom:32px;">
            <h1 style="font-size:28px;font-weight:800;color:#1a1a2e;margin:0;">Bienvenue, ${name} !</h1>
            <p style="color:#6b7280;margin-top:8px;font-size:15px;">Merci de vous être inscrit(e) sur <strong>Évora Academy</strong>.</p>
          </div>
          <p style="color:#374151;font-size:15px;line-height:1.7;">
            Cliquez sur le bouton ci-dessous pour confirmer votre adresse email et commencer votre apprentissage du français :
          </p>
          <div style="text-align:center;margin:32px 0;">
            <a href="${verifyUrl}" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#ffffff;text-decoration:none;border-radius:10px;font-weight:700;font-size:15px;box-shadow:0 4px 14px rgba(99,102,241,0.3);">
              ✅ Vérifier mon email
            </a>
          </div>
          <p style="color:#9ca3af;font-size:13px;line-height:1.6;">
            Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur :<br/>
            <a href="${verifyUrl}" style="color:#6366f1;word-break:break-all;">${verifyUrl}</a>
          </p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0;" />
          <p style="color:#9ca3af;font-size:12px;text-align:center;">
            © ${new Date().getFullYear()} Évora Academy · French Learning & TCF Canada Preparation
          </p>
        </div>
      `,
    });

    console.log(`[EmailService] Verification email sent to ${toEmail}`);
  }

  /**
   * Send a password-reset email with a secure token link
   */
  public static async sendPasswordResetEmail(toEmail: string, token: string): Promise<void> {
    const resetUrl = `${FRONTEND_URL}/reset-password?token=${token}`;

    await transporter.sendMail({
      from: `"${FROM_NAME}" <${SMTP_USER}>`,
      to: toEmail,
      subject: 'Réinitialisez votre mot de passe Évora 🔒',
      html: `
        <div style="font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:520px;margin:0 auto;padding:40px 24px;background:#ffffff;">
          <div style="text-align:center;margin-bottom:32px;">
            <h1 style="font-size:24px;font-weight:800;color:#1a1a2e;margin:0;">Réinitialisation du mot de passe</h1>
            <p style="color:#6b7280;margin-top:8px;font-size:15px;">Vous avez demandé à modifier votre mot de passe.</p>
          </div>
          <p style="color:#374151;font-size:15px;line-height:1.7;">
            Cliquez sur le bouton ci-dessous pour choisir un nouveau mot de passe. Ce lien est valable <strong>1 heure</strong>.
          </p>
          <div style="text-align:center;margin:32px 0;">
            <a href="${resetUrl}" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#ef4444,#f97316);color:#ffffff;text-decoration:none;border-radius:10px;font-weight:700;font-size:15px;box-shadow:0 4px 14px rgba(239,68,68,0.3);">
              🔑 Réinitialiser mon mot de passe
            </a>
          </div>
          <p style="color:#9ca3af;font-size:13px;line-height:1.6;">
            Si vous n'avez pas demandé cette réinitialisation, ignorez simplement cet email.<br/>
            Lien direct : <a href="${resetUrl}" style="color:#6366f1;word-break:break-all;">${resetUrl}</a>
          </p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0;" />
          <p style="color:#9ca3af;font-size:12px;text-align:center;">
            © ${new Date().getFullYear()} Évora Academy · French Learning & TCF Canada Preparation
          </p>
        </div>
      `,
    });

    console.log(`[EmailService] Password reset email sent to ${toEmail}`);
  }
}
