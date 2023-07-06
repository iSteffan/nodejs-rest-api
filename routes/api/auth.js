const express = require('express');
const { validateBody } = require('../../middlewares');
const controller = require('../../controllers/auth');
const { registerSchema, loginSchema } = require('../../models/user');
const router = express.Router();

// signup
router.post('/register', validateBody(registerSchema), controller.register);

// signin
router.post('/login', validateBody(loginSchema), controller.login);

module.exports = router;
