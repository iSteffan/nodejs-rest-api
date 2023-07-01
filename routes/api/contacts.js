const express = require('express');

const controller = require('../../controllers/contacts');

const { validateBody, isValidId } = require('../../helpers');

const { schemas } = require('../../models/contacts');

const router = express.Router();

router.get('/', controller.listContacts);

router.get('/:id', isValidId, controller.getContactById);

router.post('/', validateBody(schemas.addSchema), controller.addContact);

router.put('/:id', isValidId, validateBody(schemas.addSchema), controller.updateContact);

router.patch(
  '/:id/favorite',
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  controller.updateFavorite
);

router.delete('/:id', isValidId, controller.removeContact);

module.exports = router;
