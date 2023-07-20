const nodemailer = require('nodemailer');
require('dotenv').config();

const { META_PASSWORD, META_EMAIL } = process.env;

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: META_EMAIL,
    pass: META_PASSWORD,
  },
};

// const transport = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   to: 'st.skichko@gmail.com',
//   from: 'st.skichko@meta.ua',
//   subject: 'Test email',
//   html: '<p><strong>Test email</strong> from localhost:3000</p>',
// };

// transport
//   .sendMail(email)
//   .then(() => console.log('Email send success'))
//   .catch(error => console.log(error.message));

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async data => {
  const email = { ...data, from: 'st.skichko@meta.ua' };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;
