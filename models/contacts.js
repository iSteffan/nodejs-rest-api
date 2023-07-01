// const fs = require('fs/promises');
// const path = require('path');
// const contactsPath = path.join(__dirname, 'contacts.json');
// const { nanoid } = require('nanoid');

// async function listContacts() {
//   try {
//     const contacts = await fs.readFile(contactsPath);
//     return JSON.parse(contacts);
//   } catch (error) {
//     console.log(error.message);
//   }
//   // Повертає масив контактів.
// }

// async function getContactById(contactId) {
//   try {
//     const contacts = await listContacts();
//     const result = contacts.find(item => item.id === contactId);
//     return result || null;
//   } catch (error) {
//     console.log(error.message);
//   }
//   // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
// }

// async function removeContact(contactId) {
//   try {
//     const contacts = await listContacts();
//     const index = contacts.findIndex(item => item.id === contactId);
//     if (index === -1) {
//       return null;
//     }
//     const [result] = contacts.splice(index, 1);
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return result;
//   } catch (error) {
//     console.log(error.message);
//   }
//   // Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
// }

// async function addContact(data) {
//   try {
//     const contacts = await listContacts();
//     const newContact = {
//       id: nanoid(),
//       ...data,
//     };
//     contacts.push(newContact);
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return newContact;
//   } catch (error) {
//     console.log(error.message);
//   }
//   // Повертає об'єкт доданого контакту.
// }

// async function updateContact(id, data) {
//   try {
//     const contacts = await listContacts();
//     const index = contacts.findIndex(item => item.id === id);
//     if (index === -1) {
//       return null;
//     }
//     contacts[index] = { id, ...data };
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return contacts[index];
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

contactSchema.post('save', handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  schemas,
};
