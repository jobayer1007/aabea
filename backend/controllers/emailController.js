const asyncHandler = require('express-async-handler');
const models = require('../models/index');

///////////////////////////////////////////Email////////////////////////////////////////////////

// @desc    Send a new Email     ///////////////////////////////////////////////
// @route   POST /api/emails
// @access  Private/SystemAdmin || Admin
exports.sendNewEmail = asyncHandler(async (req, res) => {
  console.log('email sent');
  // const { title, body, id } = req.body;

  // const user = await models.User.findOne({ where: { memberId: id } });
  // if (user) {
  //   const newAnnouncement = await models.Announcement.create({
  //     title,
  //     body,
  //     chapterId: user.chapterId,
  //     createdby: user.memberId,
  //   });
  //   if (newAnnouncement) {
  //     res.json('New Announcement Created Successfully');
  //   } else {
  //     res.status(400);
  //     throw new Error('Encountered problem while creating new Announcement');
  //   }
  // } else {
  //   res.status(400);
  //   throw new Error('Encountered problem while creating new Announcements');
  // }
});

// @desc    GET all Emails     ///////////////////////////////////////////////
// @route   GET /api/emails
// @access  Private/SystemAdmin || Admin
exports.getAllEmails = asyncHandler(async (req, res) => {
  const emails = await models.Email.findAll();
  if (emails && emails.length !== 0) {
    res.json(emails);
  } else {
    res.status(404);
    throw new Error('No Email');
  }
});

// @desc    Get an  Email by Id     ///////////////////////////////////////////////
// @route   GET /api/emails/:id
// @access  Private/Admin || SystemAdmin
exports.getEmailById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const email = await models.Email.findOne({
    where: { emailId: id },
  });

  if (email) {
    res.json(email);
  } else {
    res.status(401);
    throw new Error('Email not found');
  }
});
