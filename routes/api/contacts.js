const express = require('express');

const controller = require('../../controllers/contacts');

const { isValidId } = require('../../middlewares');

const router = express.Router();

router.get('/', controller.listContacts);

router.get('/:id', isValidId, controller.getContactById);

router.post('/', controller.addContact);

router.put('/:id', isValidId, controller.updateContact);

router.patch('/:id/favorite', isValidId, controller.updateFavorite);

router.delete('/:id', isValidId, controller.removeContact);

module.exports = router;
