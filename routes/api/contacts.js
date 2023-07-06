const express = require('express');

const controller = require('../../controllers/contacts');

const { isValidId, authenticate, validateBody } = require('../../middlewares');
const { addSchema, updateFavoriteSchema } = require('../../models/contact');

const router = express.Router();

router.get('/', authenticate, controller.listContacts);

router.get('/:id', authenticate, isValidId, controller.getContactById);

router.post(
  '/',
  authenticate,
  validateBody(addSchema, 'missing required name field'),
  controller.addContact
);

router.put(
  '/:id',
  authenticate,
  isValidId,
  validateBody(addSchema, 'missing fields'),
  controller.updateContact
);

router.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchema, 'missing field favorite'),
  controller.updateFavorite
);

router.delete('/:id', authenticate, isValidId, controller.removeContact);

module.exports = router;
