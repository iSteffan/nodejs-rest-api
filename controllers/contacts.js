// const express = require('express');
// // const Joi = require('joi');
// const schema = require('../../schemas/contacts');

// const contacts = require('../../models/contacts');

// const { HttpError } = require('../../helpers');

// const router = express.Router();

// // const addSchema = Joi.object({
// //   name: Joi.string().required(),
// //   email: Joi.string().required(),
// //   phone: Joi.string().required(),
// // });

// router.get('/', async (req, res, next) => {
//   try {
//     const result = await contacts.listContacts();
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get('/:id', async (req, res, next) => {
//   try {
//     console.log(req.params);
//     const { id } = req.params;
//     console.log(id);

//     const result = await contacts.getContactById(id);
//     if (!result) {
//       throw HttpError(404, 'Not found');
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post('/', async (req, res, next) => {
//   try {
//     const { error } = schema.validate(req.body);
//     if (error) {
//       throw HttpError(400, 'missing required name field');
//     }
//     const result = await contacts.addContact(req.body);
//     res.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete('/:id', async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await contacts.removeContact(id);
//     if (!result) {
//       throw HttpError(404, 'Not found');
//     }
//     res.json({
//       message: 'contact deleted',
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.put('/:id', async (req, res, next) => {
//   try {
//     const { error } = schema.validate(req.body);
//     if (error) {
//       throw HttpError(400, 'missing fields');
//     }
//     const { id } = req.params;
//     const result = await contacts.updateContact(id, req.body);
//     if (!result) {
//       throw HttpError(404, 'Not found');
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = router;

const { Contact, schemas } = require('../models/contacts');
const { HttpError, controllerWrapper } = require('../helpers');

const listContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  // const result = await Book.findOne({_id: id})
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { error } = schemas.addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, 'missing required name field');
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { error } = schemas.addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, 'missing fields');
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json({
    message: 'Delete success',
  });
};

const updateFavorite = async (req, res) => {
  const { error } = schemas.updateFavoriteSchema.validate(req.body);
  if (error) {
    throw HttpError(400, 'missing field favorite');
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

module.exports = {
  listContacts: controllerWrapper(listContacts),
  getContactById: controllerWrapper(getContactById),
  addContact: controllerWrapper(addContact),
  updateContact: controllerWrapper(updateContact),
  updateFavorite: controllerWrapper(updateFavorite),
  removeContact: controllerWrapper(removeContact),
};
