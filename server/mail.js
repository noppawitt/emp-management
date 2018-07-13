const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

module.exports = nodemailer.createTransport(smtpTransport({
<<<<<<< HEAD
  host: 'smtp.gmail.com',
  auth: {
    user: 'i.plas.sa.tic@gmail.com',
    pass: 'chaisitsak'
=======
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
>>>>>>> 2ef84c28b7d073fae1de484c4f2e765e8e8276f6
  },
  secure: true
}));
