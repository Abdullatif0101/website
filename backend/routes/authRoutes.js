const express = require('express');
const { registerAdmin, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register-admin', registerAdmin); // Remember to disable in production
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);

module.exports = router;
