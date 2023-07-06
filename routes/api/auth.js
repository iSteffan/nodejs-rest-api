const express = require('express');
const { validateBody, authenticate } = require('../../middlewares');
const controller = require('../../controllers/auth');
const { registerSchema, loginSchema } = require('../../models/user');
const router = express.Router();

// signup
router.post('/register', validateBody(registerSchema), controller.register);

// signin
router.post('/login', validateBody(loginSchema), controller.login);

// logout
router.post('/logout', authenticate, controller.logout);

// current
router.get('/current', authenticate, controller.getCurrent);

module.exports = router;
