import crypto from 'node:crypto';

function json(body: unknown, status = 200) {
  return { status, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) };
}

export default async function handler(req: any) {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  const { email, otp, challenge } = req.body || {};
  if (typeof email !== 'string' || typeof otp !== 'string' || typeof challenge !== 'string') {
    return json({ error: 'Verification details are incomplete.' }, 400);
  }

  const secret = process.env.OTP_SECRET;
  if (!secret) return json({ error: 'Email verification is not configured yet.' }, 500);

  try {
    const decoded = Buffer.from(challenge, 'base64url').toString('utf8');
    const parts = decoded.split('|');
    if (parts.length !== 4) return json({ error: 'Invalid or expired verification code.' }, 400);

    const [savedEmail, savedOtp, expiresText, signature] = parts;
    const expires = Number(expiresText);
    const payload = `${savedEmail}|${savedOtp}|${expiresText}`;
    const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
      return json({ error: 'Invalid or expired verification code.' }, 400);
    }
    if (Date.now() > expires) return json({ error: 'This code has expired. Request a new code.' }, 400);
    if (savedEmail !== email.toLowerCase() || savedOtp !== otp) return json({ error: 'Incorrect verification code.' }, 400);

    return json({ ok: true });
  } catch {
    return json({ error: 'Invalid or expired verification code.' }, 400);
  }
}
