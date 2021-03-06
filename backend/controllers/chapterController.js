const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { sendConfirmationEmail } = require('./mailer');
const User = require('../models/User');
const Member = require('../models/Member');
const models = require('../models/index');
const generateToken = require('../utils/generateToken');

// @desc    Create a new Chapter     ///////////////////////////////////////////////
// @route   POST /api/chapters/new
// @access  Private/SystemAdmin
exports.createNewChapter = asyncHandler(async (req, res) => {
  const { chapterName, chapterAddress, chapterEmail, chapterPhone } = req.body;

  const chapterNameExists = await models.Chapter.findOne({
    where: { chapterName: chapterName },
  }); // Check if the Chapter Name already registered
  if (!chapterNameExists) {
    const chapterEmailExists = await models.Chapter.findOne({
      where: { chapterEmail: chapterEmail },
    });
    if (!chapterEmailExists) {
      const newChapter = await models.Chapter.create({
        chapterName,
        chapterAddress,
        chapterEmail,
        chapterPhone,
      });
      if (newChapter) {
        res.json({
          success: true,

          msg: 'New Chapter Created Successfully',
        });
      } else {
        res.status(400);
        throw new Error({
          success: false,
          msg: 'Encountered problem while creating new chapter',
        });
      }
    } else {
      res.status(400);
      throw new Error(
        'A Chapter with Chapter Email:' +
          chapterEmailExists.chapterEmail +
          ' already exist' +
          'where Chapter Name:' +
          chapterEmailExists.chapterName
      );
    }
  } else {
    res.status(400);
    throw new Error(
      'A Chapter with Chapter Name:' +
        chapterNameExists.chapterName +
        ' already exist'
    );
  }
});

// @desc    GET all Chapters     ///////////////////////////////////////////////
// @route   GET /api/chapters
// @access  Private/SystemAdmin
exports.getChapters = asyncHandler(async (req, res) => {
  const chapters = await models.Chapter.findAll();
  res.json(chapters);
  // const members = await models.Member.findAll();
  // res.json(members);
});
