'use strict';

require('dotenv').config();

const express      = require('express');
const cors         = require('cors');
const contactRoute = require('./routes/contact.js');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── CORS ────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:4173', // Vite preview
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., curl, Postman in dev)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origin ${origin} not allowed`));
      }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
);

// ── Body parsing ────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ── Routes ──────────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) =>
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
);

app.use('/api/contact', contactRoute);

// 404 catch-all
app.use((_req, res) => res.status(404).json({ success: false, message: 'Route not found.' }));

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('[server] Unhandled error:', err.message);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

// ── Start ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Portfolio server running on http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
  console.log(`   Contact: POST http://localhost:${PORT}/api/contact\n`);

  if (!process.env.SMTP_USER || process.env.SMTP_USER.startsWith('your_')) {
    console.warn('⚠  SMTP not configured — email sends will be MOCKED to console.');
    console.warn('   Copy server/.env.example to server/.env and fill in credentials.\n');
  }
});
