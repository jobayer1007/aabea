const nodemailer = require('nodemailer');
const path = require('path');

exports.sendConfirmationEmail = function ({
  fromAdmin,
  pass,
  toUserEmail,
  toUser,
  hash,
  domain,
}) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: fromAdmin,
        pass: pass,
      },
    });

    const message = {
      from: fromAdmin,
      to: toUserEmail,
      // to: process.env.GOOGLE_USER,
      subject: 'AABEA Team - Activate Account',
      html: `
        <h3>Hello ${toUser}</h3>
        <p>Welcome to AABEA. Thank you for your registration request. Just one more step...</p>
        <p>TO activate your account please follow the below link: </p>
        <p class='text-center'><a href="http://${domain}/activate/${hash}" target="_" >Activate Your Account</a></p>
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

exports.sendCongratulationsEmail = function ({
  fromAdmin,
  pass,
  toUserEmail,
  toUser,
  domain,
}) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: fromAdmin,
        pass: pass,
      },
    });

    const message = {
      from: fromAdmin,
      to: toUserEmail,
      // to: process.env.GOOGLE_USER,
      subject: 'AABEA Team - Congratulations!',
      html: `
        <h3>Hello ${toUser}</h3>
        <p>Congratulations! Your account registration request has been approved.</p>
        <p>You can now Log In.</p>
        <p>To Log In Follow the Link below:</p>
        <p class='text-center'><a href="http://${domain}.garbalife.com/login" target="_" >Log In</a></p>
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

exports.getPasswordResetURL = ({ user, token, domain }) =>
  `http://${domain}/password/reset/${user.memberId}/${token}`;

// exports.resetPasswordTemplate = ({fromAdmin,
//   pass,user, url}) => {
//   const from = fromAdmin;
//   // to: toUserEmail,
//   const to = user.email;
//   const subject = '🌻 AABEA Password Reset 🌻';
//   const html = `
//   <p>Hey ${user.name || user.email},</p>
//   <p>We heard that you lost your AABEA password. Sorry about that!</p>
//   <p>But don’t worry! You can use the following link to reset your password:</p>
//   <a href=${url}>${url}</a>
//   <p>If you don’t use this link within 1 hour, it will expire.</p>
//   <p>Do something outside today! </p>
//   <p>–Your friends at AABEA</p>
//   `;

//   return { from, to, subject, html };
// };

exports.sendPasswordResetEmail = function ({
  fromAdmin,
  pass,
  toUserEmail,
  user,
  url,
}) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: fromAdmin,
        pass: pass,
      },
    });

    const message = {
      from: fromAdmin,
      to: toUserEmail,
      // to: process.env.GOOGLE_USER,
      subject: '🌻 AABEA Password Reset 🌻',
      html: `
      <p>Hey ${user.name || user.email},</p>
      <p>We heard that you lost your AABEA password. Sorry about that!</p>
      <p>But don’t worry! You can use the following link to reset your password:</p>
      <a href=${url}>${url}</a>
      <p>If you don’t use this link within 1 hour, it will expire.</p>
      <p>Do something outside today! </p>
      <p>–Your friends at AABEA</p>
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

// ////////////////////////Event Registration Confirmation email/////////////////////

exports.sendRegistrationConfirmationEmail = function ({
  fromAdmin,
  pass,
  event,
  guestRegister,
  paymentSummary,
}) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: fromAdmin,
        pass: pass,
      },
    });

    const message = {
      from: fromAdmin,
      to: guestRegister.email,
      // to: process.env.GOOGLE_USER,
      subject: `AABEA Team - Event-${event.eventId} Registration Confirmation! `,
      html: `
        <h3>Hello ${guestRegister.firstName}</h3>
        <p>Congratulations! Your event registration successfull.</p>
        <p>Please find below your registration details:</p>
        <br/>
        <hr/>
        <h4>Event</h4>
        <p>Event Name: ${event.eventName}</p>
        <p>Description: ${event.eventDescription}</p>
        <p>Date: </p>
        <p>Start Date: ${new Date(event.eventDate[0].value)}</p>
        <p>End Date: ${new Date(event.eventDate[1].value)}</p>
        <p>Address: ${event.eventAddress}</p>
        <p>Adult Fee: ${event.adultFee}</p>
        <p>Minor Fee: ${event.minorFee}</p>

        <br/>
        <hr/>
        <h4>Registration Summary</h4>
        <p>Event registration Id : ${guestRegister.registrationId}</p>
        <p>Reference Member Id : ${guestRegister.memberId}</p>
        <p>Name : ${guestRegister.mInit} ${guestRegister.firstName} ${
        guestRegister.lastName
      }</p>
        <p>Email : ${guestRegister.email}</p>
        <p>Phone : ${guestRegister.phone}</p>
        <p>Number of adults : ${guestRegister.numberOfAdults}</p>
        <p>Number of minors : ${guestRegister.numberOfMinors}</p>
        <br/>
        <hr/>
        <h4>Payment Summary</h4>
        <p>Amount Paid : ${paymentSummary.amount}</p>
        <p>Payer Id : ${paymentSummary.payerId}</p>
        <p>Payment ID : ${paymentSummary.paymentId}</p>
        <p>Payment Status : ${paymentSummary.paymentStatus}</p>
        <p>Payment Time : ${paymentSummary.paymentTime}</p>

        <br/>
        <br/>
        <hr/>
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

// ////////////////////////Payment Confirmation email/////////////////////

exports.sendPaymentConfirmationEmail = function ({
  fromAdmin,
  pass,
  member,
  payment,
}) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: fromAdmin,
        pass: pass,
      },
    });

    const message = {
      from: fromAdmin,
      to: member.primaryEmail,
      // to: process.env.GOOGLE_USER,
      subject: `AABEA Team - Payment Confirmation! `,
      html: `
        <h3>Hello ${member.firstName}</h3>
        <p>Congratulations! Your payment is successfull.</p>
        <p>Please find below your payment details:</p>
        <br/>
        <hr/>
        <h4>Payment Type : ${payment.paymentType}</h4>
        <p>Member Id: ${member.memberId}</p>
        <p>Name: ${member.mInit} ${member.firstName} ${member.lastName}</p>
        <p>Amount Paid : ${payment.amount}</p>
        <p>Payer Id : ${payment.payerId}</p>
        <p>Payment ID : ${payment.paymentId}</p>
        <p>Payment Status : ${payment.paymentStatus}</p>
        <p>Payment Time : ${payment.paymentTime}</p>

        <br/>
       
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

// ////////////////////////Donation Confirmation email/////////////////////

exports.sendDonationConfirmationEmail = function ({
  fromAdmin,
  pass,
  member,
  donate,
}) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: fromAdmin,
        pass: pass,
      },
    });

    const message = {
      from: fromAdmin,
      to: member.primaryEmail,
      // to: process.env.GOOGLE_USER,
      subject: `AABEA Team - Donation Confirmation! `,
      html: `
        <h3>Hello ${member.firstName}</h3>
        <p>Congratulations! Your donation is successfull.</p>
        <p>Please find below your donation details:</p>
        <br/>
        <hr/>
        <h4>Payment Type : ${donate.donationType}</h4>
        <p>Member Id: ${member.memberId}</p>
        <p>Name: ${member.mInit} ${member.firstName} ${member.lastName}</p>
        <p>Amount Paid : ${donate.amount}</p>
        <p>Payer Id : ${donate.payerId}</p>
        <p>Payment ID : ${donate.paymentId}</p>
        <p>Payment Status : ${donate.paymentStatus}</p>
        <p>Payment Time : ${donate.paymentTime}</p>

        <br/>
       
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

// ////////////////////////GUEST Donation Confirmation email/////////////////////

exports.sendGuestDonationConfirmationEmail = function ({
  fromAdmin,
  pass,
  donate,
}) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: fromAdmin,
        pass: pass,
      },
    });

    const message = {
      from: fromAdmin,
      to: donate.email,
      // to: process.env.GOOGLE_USER,
      subject: `AABEA Team - Donation Confirmation! `,
      html: `
        <h3>Hello ${donate.firstName}</h3>
        <p>Congratulations! Your donation is successfull.</p>
        <p>Please find below your donation details:</p>
        <br/>
        <hr/>
        <h4>Payment Type : ${donate.donationType}</h4>
        <p>Name: ${donate.mInit} ${donate.firstName} ${donate.lastName}</p>
        <p>Email : ${donate.email}</p>
        <p>Amount Paid : ${donate.amount}</p>
        <p>Payer Id : ${donate.payerId}</p>
        <p>Payment ID : ${donate.paymentId}</p>
        <p>Payment Status : ${donate.paymentStatus}</p>
        <p>Payment Time : ${donate.paymentTime}</p>

        <br/>
       
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

// ////////////////////////Send email/////////////////////

exports.sendEmail = function ({
  fromAdmin,
  pass,
  emailReceipent,
  emailTitle,
  emailBody,
  attachments,
  domain,
}) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: fromAdmin,
        pass: pass,
      },
    });

    const files = attachments.map((attachment) => {
      console.log(path.join(`the file path is : ${attachment}`));
      console.log(path.join(path.resolve(), `${attachment}`));
      console.log(
        path.join(path.resolve().split('/backend')[0], `${attachment}`)
      );
      console.log(`filename: ${attachment.split('/image-')[1]}`);
      return {
        filename: `${attachment.split('/image-')[1]}`,
        path: `/home/aabea/apps/aabea-app${attachment}`,
      };
    });
    // path: `/home/aabea/apps/aabea-app${attachment}`,

    const message = {
      from: fromAdmin,
      to: emailReceipent,
      // to: process.env.GOOGLE_USER,
      subject: `${emailTitle}`,
      html: `
        ${emailBody}
      `,
      attachments: files,
      // {
      //   path: path.join(path.resolve(), `${attachments}`),
      // },
      // {
      //   path: path.join(path.resolve(), `${attachments}`),
      // },

      // [
      //   {
      //     filename: 'text1.txt',
      //     content: 'hello world!',
      //   },
      // ],
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

////////reference for bcc
// const mailData = {
//   from: 'xyz@xyz.com',
//   to: 'recipient@xyz.com',
//   bcc: 'bcc@xyz.com',
//   subject: 'Sample Mail',
//   html: text,
//   envelope: {
//       from: 'xyz@xyz.com',
//       to: 'recipient@xyz.com'
//   }
// }
