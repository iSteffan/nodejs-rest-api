const express = require('express');

const controller = require('../../controllers/contacts');

const { isValidId, authenticate } = require('../../middlewares');

const router = express.Router();

router.get('/', authenticate, controller.listContacts);

router.get('/:id', authenticate, isValidId, controller.getContactById);

router.post('/', authenticate, controller.addContact);

router.put('/:id', authenticate, isValidId, controller.updateContact);

router.patch('/:id/favorite', authenticate, isValidId, controller.updateFavorite);

router.delete('/:id', authenticate, isValidId, controller.removeContact);

module.exports = router;
