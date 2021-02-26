const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

exports.sendConfirmationEmail = function ({ toUserEmail, toUser, hash }) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });

    const message = {
      from: process.env.GOOGLE_USER,
      // to: toUserEmail,
      to: process.env.GOOGLE_USER,
      subject: 'AABEA Team - Activate Account',
      html: `
        <h3>Hello ${toUser}</h3>
        <p>Welcome to AABEA. Thank you for your registration request. Just one more step...</p>
        <p>TO activate your account please follow the below link: </p>
        <p class='text-center'><a href="${process.env.DOMAIN}/activate/${hash}" target="_" >Activate Your Account</a></p>
        <p>Thank You</p>
        <p>AABEA TEAM</p>
      `,
    };

    transporter.sendMail(message, function (err, info) {
      if (err) {
        rej(err);
      } else {
        res(info);
      }
    });
  });
};
