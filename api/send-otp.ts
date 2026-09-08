import crypto from 'node:crypto';

function json(body: unknown, status = 200) {
  return { status, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) };
}

export default async function handler(req: any) {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  const { email } = req.body || {};
  if (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
    return json({ error: 'Enter a valid email address.' }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const secret = process.env.OTP_SECRET;
  if (!apiKey || !from || !secret) {
    return json({ error: 'Email verification is not configured yet.' }, 500);
  }

  const otp = crypto.randomInt(100000, 1000000).toString();
  const expires = Date.now() + 10 * 60 * 1000;
  const payload = `${email.toLowerCase()}|${otp}|${expires}`;
  const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  const challenge = Buffer.from(`${payload}|${signature}`).toString('base64url');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [email],
      subject: 'Your Northbridge Trust verification code',
      text: `Your Northbridge Trust email verification code is ${otp}. It expires in 10 minutes. If you did not request this code, you can ignore this email.`,
    }),
  });

  if (!response.ok) return json({ error: 'We could not send the verification email. Please try again.' }, 502);
  return json({ ok: true, challenge });
}
