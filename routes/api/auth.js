const express = require('express');
const { validateBody, authenticate, upload } = require('../../middlewares');
const controller = require('../../controllers/auth');
const {
  registerSchema,
  loginSchema,
  changeSubscriptionSchema,
  emailSchema,
} = require('../../models/user');
const router = express.Router();

// signup
router.post('/register', validateBody(registerSchema), controller.register);

// signin
router.post('/login', validateBody(loginSchema), controller.login);

router.get('/verify/:verificationToken', controller.verifyEmail);

router.post('/verify', validateBody(emailSchema), controller.resendVerifyEmail);

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

// upload avatars
router.patch('/avatars', authenticate, upload.single('avatar'), controller.updateAvatar);

module.exports = router;
