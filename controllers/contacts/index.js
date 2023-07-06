const listContacts = require('./listContacts');
const getContactById = require('./getContactById');
const addContact = require('./addContact');
const updateContact = require('./updateContact');
const updateFavorite = require('./updateFavorite');
const removeContact = require('./removeContact');
const { controllerWrapper } = require('../../helpers');

module.exports = {
  getContactById: controllerWrapper(getContactById),
  listContacts: controllerWrapper(listContacts),
  addContact: controllerWrapper(addContact),
  updateContact: controllerWrapper(updateContact),
  updateFavorite: controllerWrapper(updateFavorite),
  removeContact: controllerWrapper(removeContact),
};
