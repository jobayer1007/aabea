const Sequelize = require('sequelize');
const asyncHandler = require('express-async-handler');
const models = require('../models/index');
const { sendEmail } = require('./mailer');

const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

///////////////////////////////////////////Email////////////////////////////////////////////////

// @desc    Send a new Email     ///////////////////////////////////////////////
// @route   POST /api/emails
// @access  Private/SystemAdmin || Admin
exports.sendNewEmail = asyncHandler(async (req, res) => {
  const chapterSetting = await models.ChapterSettings.findOne({
    where: { chapterId: req.user.chapterId },
  });

  if (chapterSetting) {
    const t = await sequelize.transaction();
    try {
      await await models.Email.create(
        {
          title: req.body.title,
          body: req.body.body,
          sendBy: req.user.userName,
          sentTo: req.body.emailReceipent,
          attachments: req.body.uploadedFiles,
          chapterId: req.user.chapterId,
        },
        { transaction: t }
      );

      await sendEmail(
        {
          fromAdmin: chapterSetting.chapterEmail,
          pass: chapterSetting.password,
          emailReceipent: req.body.emailReceipent,
          emailTitle: req.body.title,
          emailBody: req.body.body,
          attachments: req.body.uploadedFiles,
          domain: req.body.checkChapter,
        },
        { transaction: t }
      );

      await t.commit();
      res.send('email sent successfully');
    } catch (error) {
      console.log(error);
      await t.rollback();
      res.status(400);
      throw new Error(
        'Something Went Wrong with email sent, Please contact the system admin' +
          error
      );
    }
  } else {
    res.status(400);
    throw new Error('Invalid Chapter Reference');
  }
});

// @desc    GET all Emails     ///////////////////////////////////////////////
// @route   GET /api/emails/chapter/:checkChapter
// @access  Private/SystemAdmin || Admin
exports.getAllEmails = asyncHandler(async (req, res) => {
  // Find Chapter
  // let subDomain;
  // if (process.env.NODE_ENV === 'development') {
  //   subDomain = 'bd'; // at dev only
  // } else {
  //   subDomain = checkChapter.split('.')[0];
  // }
  const { checkChapter } = req.params;
  const subDomain = checkChapter.split('.')[0];
  const chapter = await models.Chapter.findOne({
    where: { subDomain: subDomain },
  });

  if (chapter) {
    const emails = await models.Email.findAll({
      where: { chapterId: chapter.chapterId },
      order: [['createdAt', 'DESC']],
    });
    if (emails && emails.length !== 0) {
      res.json(emails);
    } else {
      res.status(404);
      throw new Error('No Email');
    }
  } else {
    res.status(404);
    throw new Error('Invalid chapter reference!');
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
