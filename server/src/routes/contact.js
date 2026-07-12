'use strict';

const express = require('express');
const { contactLimiter } = require('../middleware/validation.js');
const { handleContact }  = require('../controllers/contactController.js');

const router = express.Router();

/**
 * POST /api/contact
 * Body: { name: string, email: string, message: string, honeypot?: string }
 */
router.post('/', contactLimiter, handleContact);

module.exports = router;
