// This file is no longer used — see api/contact.js and api/health.js
module.exports = (_req, res) => res.status(404).json({ message: 'Use /api/contact or /api/health' });
