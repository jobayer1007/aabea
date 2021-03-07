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

// @desc    Create a new Payment Type     ///////////////////////////////////////////////
// @route   POST /api/chapters/paymentType
// @access  Private/Admin
exports.createNewPaymentType = asyncHandler(async (req, res) => {
  const {
    paymentTypeName,
    paymentTypeAmount,
    paymentTypeDescription,
  } = req.body;

  const paymentType = await models.PaymentType.findOne({
    where: { paymentTypeName: paymentTypeName },
  }); // Check if the Chapter Name already registered
  if (!paymentType) {
    const newPaymentType = await models.PaymentType.create({
      paymentTypeName,
      paymentTypeAmount,
      paymentTypeDescription,
    });
    if (newPaymentType) {
      res.json('New Payment Type Created Successfully');
    } else {
      res.status(400);
      throw new Error('Encountered problem while creating new chapter');
    }
  } else {
    res.status(400);
    throw new Error(
      'A Payment Type with Name:' +
        paymentType.paymentTypeName +
        ' already exist' +
        'where Payment Amount is:' +
        paymentType.paymentTypeAmount
    );
  }
});

// @desc    GET all Payment Types     ///////////////////////////////////////////////
// @route   GET /api/chapters/paymentType
// @access  Private
exports.getPaymentTypes = asyncHandler(async (req, res) => {
  const paymentTypes = await models.PaymentType.findAll();
  res.json(paymentTypes);
  // const members = await models.Member.findAll();
  // res.json(members);
});

// @desc    Delete a PaymentType     /////////////////////////////////////////////// pending
// @route   DELETE /api/chapters/paymentType/:id
// @access  Private/Admin
exports.deletePaymentType = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const paymentType = await models.PaymentType.findOne({
    where: { paymentTypeId: id },
  });
  console.log(paymentType.paymentTypeId);
  console.log(paymentType.paymentTypeName);

  if (paymentType) {
    models.PaymentType.destroy({
      where: { paymentTypeId: id },
    })
      .then((num) => {
        if (num == 1) {
          res.json({ message: 'Payment Type has been deleted successfully' });
        } else {
          res.json({ message: 'Cannot delete the Payment Type' });
        }
      })
      .catch((err) => console.log(err));
  } else {
    res.status(401);
    throw new Error('Payment Type not found');
  }
});
