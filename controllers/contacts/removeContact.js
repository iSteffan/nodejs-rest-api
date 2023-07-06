const { Contact } = require('../../models/contact');
const { HttpError } = require('../../helpers');

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

module.exports = removeContact;
