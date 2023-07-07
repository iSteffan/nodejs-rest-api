const express = require('express');
const { validateBody, authenticate } = require('../../middlewares');
const controller = require('../../controllers/auth');
const { registerSchema, loginSchema, changeSubscriptionSchema } = require('../../models/user');
const router = express.Router();

// signup
router.post('/register', validateBody(registerSchema), controller.register);

// signin
router.post('/login', validateBody(loginSchema), controller.login);

// logout
router.post('/logout', authenticate, controller.logout);

// current
router.get('/current', authenticate, controller.getCurrent);

// update Subscription
router.patch(
  '/',
  authenticate,
  validateBody(changeSubscriptionSchema),
  controller.changeSubscription
);

module.exports = router;
