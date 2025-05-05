const express = require('express');
const router = express.Router();
const { register, login, me } = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Me (Get user info with token)
router.get('/me', verifyToken, me);

module.exports = router;
