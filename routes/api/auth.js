const express = require('express');

// const ctrl = require('../../controllers/auth');

// const { validateBody } = require('../../middlewares');
const controller = require('../../controllers/auth');

// const { registerSchema } = require('../../models/users');

const router = express.Router();

// signup
router.post('/register', controller.register);

// signin
// router.post('/login', validateBody(schemas.loginSchema), ctrl.login);

module.exports = router;
