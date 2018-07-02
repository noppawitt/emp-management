const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

module.exports = nodemailer.createTransport(smtpTransport({
  host: 'smtp.gmail.com',
  auth: {
    user: 'i.plas.sa.tic@gmail.com',
    pass: 'chaisitsak'
  },
  secure: true
}));
