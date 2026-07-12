'use strict';

const rateLimit = require('express-rate-limit');

/**
 * Allow 10 contact-form submissions per 15 minutes per IP.
 * Returns HTTP 429 with a JSON body on rate-limit breach.
 */
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP — please try again in 15 minutes.',
  },
});

/**
 * Validates the contact form fields.
 * Returns { valid: true } or { valid: false, message: '...' }.
 */
function validateContact(body) {
  const { name, email, message } = body;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return { valid: false, message: 'Name must be at least 2 characters.' };
  }
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return { valid: false, message: 'A valid email address is required.' };
  }
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return { valid: false, message: 'Message must be at least 10 characters.' };
  }
  if (name.trim().length > 100 || email.trim().length > 200 || message.trim().length > 4000) {
    return { valid: false, message: 'One or more fields exceed maximum length.' };
  }

  return { valid: true };
}

module.exports = { contactLimiter, validateContact };
