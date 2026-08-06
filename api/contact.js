'use strict';

const nodemailer = require('nodemailer');

// ─── Validation ────────────────────────────────────────────────
function validate({ name, email, message }) {
  if (!name   || typeof name   !== 'string' || name.trim().length < 2)
    return 'Name must be at least 2 characters.';
  if (!email  || typeof email  !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    return 'A valid email address is required.';
  if (!message || typeof message !== 'string' || message.trim().length < 10)
    return 'Message must be at least 10 characters.';
  if (name.trim().length > 100 || email.trim().length > 200 || message.trim().length > 4000)
    return 'One or more fields exceed maximum length.';
  return null;
}

// ─── Nodemailer transporter (lazy-init) ────────────────────────
let _transporter = null;
function getTransporter() {
  if (_transporter) return _transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_USER || !SMTP_PASS || SMTP_USER.startsWith('your_')) {
    console.warn('[contact] ⚠  No valid SMTP credentials — MOCK mode active.');
    return null;
  }

  _transporter = nodemailer.createTransport({
    host:   SMTP_HOST || 'smtp.gmail.com',
    port:   parseInt(SMTP_PORT || '587', 10),
    secure: SMTP_SECURE === 'true',
    auth:   { user: SMTP_USER, pass: SMTP_PASS },
  });

  return _transporter;
}

// ─── Vercel Serverless Handler ─────────────────────────────────
module.exports = async function handler(req, res) {
  // ── CORS headers ──────────────────────────────────────────────
  const allowedOrigins = (process.env.CLIENT_URL || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  const origin = req.headers.origin || '';
  const corsOrigin = allowedOrigins.includes(origin) ? origin : (allowedOrigins[0] || '*');

  res.setHeader('Access-Control-Allow-Origin',  corsOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');

  // Pre-flight
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Method guard
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  const { name, email, message, honeypot } = req.body || {};

  // Honeypot — silently accept bots
  if (honeypot) return res.status(200).json({ success: true });

  // Validate
  const validationError = validate({ name, email, message });
  if (validationError) {
    return res.status(422).json({ success: false, message: validationError });
  }

  const dest = process.env.CONTACT_DEST || 'mahanidhi.gk@gmail.com';

  const mailOptions = {
    from:    `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to:      dest,
    replyTo: email.trim(),
    subject: `[Portfolio] New message from ${name.trim()}`,
    text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
    html: `
<div style="font-family:monospace;background:#12131a;color:#e2e1eb;padding:24px;border-left:3px solid #74f5ff;">
  <h2 style="color:#74f5ff;font-size:18px;margin:0 0 16px">[ NEW_CONTACT_RECEIVED ]</h2>
  <p><strong style="color:#00dbe7">Name:</strong> ${name.trim()}</p>
  <p><strong style="color:#00dbe7">Email:</strong> <a href="mailto:${email.trim()}" style="color:#d0bcff">${email.trim()}</a></p>
  <hr style="border-color:#3a494b;margin:16px 0"/>
  <p><strong style="color:#00dbe7">Message:</strong></p>
  <p style="white-space:pre-wrap">${message.trim()}</p>
</div>`,
  };

  const transporter = getTransporter();

  if (!transporter) {
    // MOCK — log to Vercel function logs
    console.log('[contact] MOCK EMAIL:');
    console.log('  To:     ', dest);
    console.log('  From:   ', email.trim());
    console.log('  Subject:', mailOptions.subject);
    console.log('  Body:\n ', mailOptions.text);
    return res.status(200).json({
      success: true,
      message: 'Message received (SMTP not configured — check function logs).',
    });
  }

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[contact] ✅ Email sent to ${dest} from ${email.trim()}`);
    return res.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch (err) {
    console.error('[contact] ❌ Send error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.',
    });
  }
};
