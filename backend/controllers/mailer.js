const nodemailer = require('nodemailer');

exports.sendConfirmationEmail = function ({ toUser, hash }) {
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
      to: toUserEmail,
      // to: process.env.GOOGLE_USER,
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

exports.sendCongratulationsEmail = function ({ toUser }) {
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
      to: toUserEmail,
      // to: process.env.GOOGLE_USER,
      subject: 'AABEA Team - Congratulations!',
      html: `
        <h3>Hello ${toUser}</h3>
        <p>Congratulations! Your account registration request has been approved.</p>
        <p>You can now Log In.</p>
        <p>To Log In Follow the Link below:</p>
        <p class='text-center'><a href="${process.env.DOMAIN}/login" target="_" >Log In</a></p>
        <p>Thank You and Welcome to AABEA</p>
        <p>Best Wishes,</p>
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

// Password Reset

exports.transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GOOGLE_USER,
    pass: process.env.GOOGLE_PASSWORD,
  },
});

exports.getPasswordResetURL = (user, token) =>
  `http://localhost:3000/password/reset/${user.memberId}/${token}`;

exports.resetPasswordTemplate = (user, url) => {
  const from = process.env.GOOGLE_USER;
  // to: toUserEmail,
  const to = process.env.GOOGLE_USER;
  const subject = '🌻 AABEA Password Reset 🌻';
  const html = `
  <p>Hey ${user.name || user.email},</p>
  <p>We heard that you lost your AABEA password. Sorry about that!</p>
  <p>But don’t worry! You can use the following link to reset your password:</p>
  <a href=${url}>${url}</a>
  <p>If you don’t use this link within 1 hour, it will expire.</p>
  <p>Do something outside today! </p>
  <p>–Your friends at AABEA</p>
  `;

  return { from, to, subject, html };
};
