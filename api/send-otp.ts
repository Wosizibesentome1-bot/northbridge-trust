import crypto from 'node:crypto';

function json(body: unknown, status = 200) {
  return { status, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) };
}

export default async function handler(req: any) {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  const { email } = req.body || {};
  if (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) return json({ error: 'Enter a valid email address.' }, 400);
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const secret = process.env.OTP_SECRET;
  if (!apiKey || !from || !secret) return json({ error: 'Email verification is not configured yet.' }, 500);

  const otp = crypto.randomInt(100000, 1000000).toString();
  const expires = Date.now() + 10 * 60 * 1000;
  const normalizedEmail = email.toLowerCase();
  const payload = `${normalizedEmail}|${otp}|${expires}`;
  const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  const challenge = Buffer.from(`${payload}|${signature}`).toString('base64url');
  const forwardedProto = req.headers?.['x-forwarded-proto'] || 'https';
  const host = req.headers?.host;
  const baseUrl = process.env.APP_URL || req.headers?.origin || (host ? `${forwardedProto}://${host}` : '');
  const verificationUrl = `${baseUrl}/#/verify?email=${encodeURIComponent(normalizedEmail)}&challenge=${encodeURIComponent(challenge)}`;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [email],
      subject: 'Verify your Northbridge Trust email',
      html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#10233f"><h2>Verify your email</h2><p>Use the button below to verify your email address for your Northbridge Trust account.</p><p><a href="${verificationUrl}" style="display:inline-block;background:#3B82F6;color:#fff;padding:13px 20px;border-radius:8px;text-decoration:none;font-weight:700">Verify email</a></p><p>Or enter this 6-digit code on the registration page:</p><p style="font-size:28px;font-weight:700;letter-spacing:6px">${otp}</p><p>This verification expires in 10 minutes. If you did not request this, you can ignore this email.</p></div>`,
      text: `Verify your Northbridge Trust email by opening this link: ${verificationUrl}\n\nOr enter this verification code: ${otp}\n\nThe verification expires in 10 minutes. If you did not request this, you can ignore this email.`,
    }),
  });
  if (!response.ok) return json({ error: 'We could not send the verification email. Please try again.' }, 502);
  return json({ ok: true, challenge });
}
