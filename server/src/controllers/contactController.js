'use strict';

const nodemailer  = require('nodemailer');
const { validateContact } = require('../middleware/validation.js');

// ---------------------------------------------------------------------------
// Build a Nodemailer transporter.
// If SMTP_USER / SMTP_PASS are not set we fall back to a mock that logs to
// the console instead of sending real email — useful for local dev without
// SMTP credentials.
// ---------------------------------------------------------------------------

function buildTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_USER || !SMTP_PASS || SMTP_USER.startsWith('your_')) {
    console.warn('[mailer] ⚠  No valid SMTP credentials found — email sends will be MOCKED.');
    return null; // signal to use mock
  }

  return nodemailer.createTransport({
    host: SMTP_HOST   || 'smtp.gmail.com',
    port: parseInt(SMTP_PORT || '587', 10),
    secure: SMTP_SECURE === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

let transporter = null;

async function handleContact(req, res) {
  // Honeypot check (submitted from trusted client, but double-checked)
  if (req.body.honeypot) {
    // Silently accept without doing anything
    return res.status(200).json({ success: true, message: 'Submission received.' });
  }

  // Validate
  const validation = validateContact(req.body);
  if (!validation.valid) {
    return res.status(422).json({ success: false, message: validation.message });
  }

  const { name, email, message } = req.body;
  const dest = process.env.CONTACT_DEST || 'mahanidhi.gk@gmail.com';

  const mailOptions = {
    from:    `"Portfolio Contact" <${process.env.SMTP_USER || 'noreply@portfolio.dev'}>`,
    to:      dest,
    replyTo: email.trim(),
    subject: `[Portfolio] New message from ${name.trim()}`,
    text: `
Name:    ${name.trim()}
Email:   ${email.trim()}
Message:
${message.trim()}
    `.trim(),
    html: `
<div style="font-family: 'JetBrains Mono', monospace; background:#12131a; color:#e2e1eb; padding:24px; border-left:3px solid #74f5ff;">
  <h2 style="color:#74f5ff; font-size:18px; margin:0 0 16px;">[ NEW_CONTACT_RECEIVED ]</h2>
  <p><strong style="color:#00dbe7;">Name:</strong> ${name.trim()}</p>
  <p><strong style="color:#00dbe7;">Email:</strong> <a href="mailto:${email.trim()}" style="color:#d0bcff;">${email.trim()}</a></p>
  <hr style="border-color:#3a494b; margin:16px 0;"/>
  <p><strong style="color:#00dbe7;">Message:</strong></p>
  <p style="white-space:pre-wrap;">${message.trim()}</p>
</div>
    `,
  };

  // Lazy-init transporter
  if (!transporter) transporter = buildTransporter();

  if (!transporter) {
    // ── MOCK MODE ──────────────────────────────────────────────────────────
    console.log('\n[mailer] 📬  MOCK EMAIL — would have sent:');
    console.log('  To:     ', dest);
    console.log('  From:   ', email.trim());
    console.log('  Subject:', mailOptions.subject);
    console.log('  Body:\n', mailOptions.text, '\n');
    return res.status(200).json({
      success: true,
      message: 'Message received (SMTP not configured — check server logs).',
    });
  }

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[mailer] ✅  Email sent to ${dest} from ${email.trim()}`);
    return res.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch (err) {
    console.error('[mailer] ❌  Send error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.',
    });
  }
}

module.exports = { handleContact };
