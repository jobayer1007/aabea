const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Member = require('../models/Member');
const models = require('../models/index');
const generateToken = require('../utils/generateToken');
const {
  sendPaymentConfirmationEmail,
  sendDonationConfirmationEmail,
  sendGuestDonationConfirmationEmail,
} = require('./mailer');

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

// // @desc    Get loggedIn user PaymentS      ///////////////////////////////////////////////
// // @route   GET /api/users/payment
// // @access  Private
// exports.getUserPaymentDetails = asyncHandler(async (req, res) => {
//   const user = await models.User.findOne({
//     where: { memberId: req.user.memberId },
//   });
//   // console.log(user);
//   if (user) {
//     const member = await models.Member.findOne({
//       where: { memberId: req.user.memberId },
//     });
//     if (member) {
//       const payments = await models.Payment.findAll({
//         where: { memberId: req.user.memberId },
//       });

//       if (payments && payments.length !== 0) {
//         res.json(payments);
//       } else {
//         res.status(404);
//         throw new Error('No Payment Found');
//       }

//       // res.status(201).json({ isPaid: member.isPaid });
//     } else {
//       res.status(401);
//       throw new Error('Member not found');
//     }
//   } else {
//     res.status(401);
//     throw new Error('User not found');
//   }
// });

////////////////////////////////////////////////////////////////////////
// @desc    Get loggedIn user PaymentS      ///////////////////////////////////////////////
// @route   GET /api/users/payment
// @access  Private
exports.getUserPaymentDetails = asyncHandler(async (req, res) => {
  const payments = await models.Payment.findAll({
    where: { memberId: req.user.memberId },
  });

  if (payments && payments.length !== 0) {
    res.json(payments);
  } else {
    res.status(404);
    throw new Error('No Payment Found');
  }
});

// @desc    Update Payment to Paid     ///////////////////////////////////////////////
// @route   POST /api/users/:id/pay
// @access  Private
exports.updatePaymentToPaid = asyncHandler(async (req, res) => {
  const totalYear = req.body.qty;
  console.log(totalYear);

  const user = await models.User.findOne({
    where: { memberId: req.params.id },
  });
  // console.log(user);
  if (user) {
    const member = await models.Member.findOne({
      where: { memberId: req.user.memberId },
    });
    if (member) {
      const chapterSetting = await models.ChapterSettings.findOne({
        where: { chapterId: member.chapterId },
      });
      if (
        member.status === 'inactive' &&
        req.body.paymentTypeName === 'nominationFee'
      ) {
        res.status(401);
        throw new Error(
          'Please Pay your registration fee first to activate your account'
        );
      } else if (
        member.status === 'active' &&
        req.body.paymentTypeName === 'nominationFee'
      ) {
        const nominationFeeCheck = await models.Payment.findOne({
          where: {
            memberId: member.memberId,
            paymentType: 'nominationFee',
            year: new Date().getFullYear(),
          },
        });

        if (nominationFeeCheck) {
          res.send('You have already paid the nomination fee');
        } else {
          try {
            const payment = await models.Payment.create({
              chapterId: member.chapterId,
              memberId: member.memberId,
              year: new Date().getFullYear(),
              paymentType: req.body.paymentTypeName,
              amount: req.body.paymentResult.purchase_units[0].amount.value,
              payerId: req.body.paymentResult.payer.email_address,
              paymentId: req.body.paymentResult.id,
              paymentStatus: req.body.paymentResult.status,
              paymentTime: req.body.paymentResult.update_time,
            });

            if (payment) {
              await sendPaymentConfirmationEmail({
                fromAdmin: chapterSetting.chapterEmail,
                pass: chapterSetting.password,
                member,
                payment,
              });
              res.send('Your Nomination Fee has been Paid Successfully');
            }
          } catch (error) {
            res.status(401);
            throw new Error(
              'Sorry! Your Nomination Fee Payment was unsuccessfull' +
                ' ' +
                error
            );
          }
        }
      } else {
        const paymentType = await models.PaymentType.findOne({
          where: { paymentTypeName: req.body.paymentTypeName },
        });
        if (paymentType) {
          const t = await sequelize.transaction();

          try {
            const yearOfPayments =
              member.nextPaymentDueIn + parseInt(totalYear);
            console.log(yearOfPayments);
            for (let i = 0; i < totalYear; i++) {
              const year = member.nextPaymentDueIn + i;
              console.log(year);
              await models.Payment.create(
                {
                  // paymentType,
                  chapterId: member.chapterId,
                  memberId: member.memberId,
                  // amount: req.body.paymentResult.purchase_units[0].amount.value,
                  year: year,
                  paymentType: req.body.paymentTypeName,
                  amount: paymentType.paymentTypeAmount,
                  payerId: req.body.paymentResult.payer.email_address,
                  paymentId: req.body.paymentResult.id,
                  paymentStatus: req.body.paymentResult.status,
                  paymentTime: req.body.paymentResult.update_time,
                },
                { transaction: t }
              );
            }

            await models.Member.update(
              {
                status: 'active',
                isPaid: true,
                nextPaymentDueIn: yearOfPayments,
              },
              { where: { memberId: req.user.memberId } },
              { transaction: t }
            );

            const payment = {
              paymentType: req.body.paymentTypeName,
              amount: req.body.paymentResult.purchase_units[0].amount.value,
              payerId: req.body.paymentResult.payer.email_address,
              paymentId: req.body.paymentResult.id,
              paymentStatus: req.body.paymentResult.status,
              paymentTime: req.body.paymentResult.update_time,
            };

            await sendPaymentConfirmationEmail({
              fromAdmin: chapterSetting.chapterEmail,
              pass: chapterSetting.password,
              member,
              payment,
            });

            await t.commit();
            res.status(201).json('Payment Successfull.');
          } catch (error) {
            await t.rollback();
            res.send(
              'msg: Encountered a problem while making Payments, error:' + error
            );
          }
        } else {
          res.status(401);
          throw new Error('Invalid Payment Type');
        }
      }
    } else {
      res.status(401);
      throw new Error('Member not found');
    }
  } else {
    res.status(401);
    throw new Error('User not found');
  }
});

// @desc    Update Donate to Paid     ///////////////////////////////////////////////
// @route   POST /api/users/:id/donate
// @access  Private
exports.memberDonation = asyncHandler(async (req, res) => {
  const user = await models.User.findOne({
    where: { memberId: req.params.id },
  });
  // console.log(user);
  if (user) {
    const member = await models.Member.findOne({
      where: { memberId: req.user.memberId },
    });

    if (member) {
      const chapterSetting = await models.ChapterSettings.findOne({
        where: { chapterId: member.chapterId },
      });
      try {
        const donate = await models.Donation.create({
          chapterId: member.chapterId,
          firstName: member.firstName,
          mInit: member.mInit,
          lastName: member.lastName,
          email: member.primaryEmail,
          memberId: member.memberId,
          donationType: req.body.donationTypeName,
          amount: req.body.paymentResult.purchase_units[0].amount.value,
          payerId: req.body.paymentResult.payer.email_address,
          paymentId: req.body.paymentResult.id,
          paymentStatus: req.body.paymentResult.status,
          paymentTime: req.body.paymentResult.update_time,
        }); // Create default payment status

        if (donate) {
          await sendDonationConfirmationEmail({
            fromAdmin: chapterSetting.chapterEmail,
            pass: chapterSetting.password,
            member,
            donate,
          });
          res.send('Donation successful');
        }
      } catch (error) {
        res.status(401);
        throw new Error('Donation unsuccessfull' + error);
      }
    } else {
      res.status(401);
      throw new Error('Member not found');
    }
  } else {
    res.status(401);
    throw new Error('User not found');
  }
});

// @desc    Get loggedIn user Donation details      ///////////////////////////////////////////////
// @route   GET /api/users/:id/donate
// @access  Private
exports.getUserDonationDetails = asyncHandler(async (req, res) => {
  // console.log(req.user.memberId);
  const donations = await models.Donation.findAll({
    where: { memberId: req.user.memberId },
  });

  if (donations && donations.length !== 0) {
    res.json(donations);
  } else {
    res.status(404);
    throw new Error('No Donation Found');
  }
});

// @desc    Update Donate to Paid   for GUEST  ///////////////////////////////////////////////
// @route   POST /api/users/donate
// @access  Public
exports.guestDonation = asyncHandler(async (req, res) => {
  const {
    checkChapter,
    guest,
    email,
    firstName,
    mInit,
    lastName,
    paymentResult,
  } = req.body;

  let subDomain;
  if (process.env.NODE_ENV === 'development') {
    subDomain = 'bd'; // at dev only
  } else {
    subDomain = checkChapter.split('.')[0];
  }
  // const subDomain = checkChapter.split('.')[0];

  const chapter = await models.Chapter.findOne({
    where: { subDomain: subDomain },
  });
  // console.log(chapter);
  if (chapter) {
    const chapterSetting = await models.ChapterSettings.findOne({
      where: { chapterId: chapter.chapterId },
    });
    if (guest) {
      const member = await models.Member.findOne({
        where: { primaryEmail: email },
      });

      if (member) {
        const donate = await models.Donation.create({
          chapterId: member.chapterId,
          firstName: member.firstName,
          mInit: member.mInit,
          lastName: member.lastName,
          email: member.primaryEmail,
          memberId: member.memberId,
          donationType: req.body.donationTypeName,
          amount: req.body.paymentResult.purchase_units[0].amount.value,
          payerId: req.body.paymentResult.payer.email_address,
          paymentId: req.body.paymentResult.id,
          paymentStatus: req.body.paymentResult.status,
          paymentTime: req.body.paymentResult.update_time,
        }); // Create default payment status

        if (donate) {
          await sendDonationConfirmationEmail({
            fromAdmin: chapterSetting.chapterEmail,
            pass: chapterSetting.password,
            member,
            donate,
          });
          res.send('Donation successful');
        } else {
          res.status(401);
          throw new Error('Payment not found');
        }
      } else {
        const donate = await models.Donation.create({
          chapterId: chapter.chapterId,
          firstName: firstName,
          mInit: mInit,
          lastName: lastName,
          email: email,
          // donationType:
          amount: paymentResult.purchase_units[0].amount.value,
          payerId: paymentResult.payer.email_address,
          paymentId: paymentResult.id,
          paymentStatus: paymentResult.status,
          paymentTime: paymentResult.update_time,
        }); // Create default payment status
        if (donate) {
          await sendGuestDonationConfirmationEmail({
            fromAdmin: chapterSetting.chapterEmail,
            pass: chapterSetting.password,
            donate,
          });
          res.send(
            'Donation successful! Thank you for your donation. However, we counld not find your provided email address to our member list.'
          );
        } else {
          res.status(401);
          throw new Error('Sorry! The donation was unsuccessful');
        }
      }
    } else {
      const donate = await models.Donation.create({
        chapterId: chapter.chapterId,
        firstName: firstName,
        mInit: mInit,
        lastName: lastName,
        email: email,
        // donationType:
        amount: paymentResult.purchase_units[0].amount.value,
        payerId: paymentResult.payer.email_address,
        paymentId: paymentResult.id,
        paymentStatus: paymentResult.status,
        paymentTime: paymentResult.update_time,
      }); // Create default payment status
      if (donate) {
        await sendGuestDonationConfirmationEmail({
          fromAdmin: chapterSetting.chapterEmail,
          pass: chapterSetting.password,
          donate,
        });
        res.send('Donation successful! Thank you for your donation.');
      } else {
        res.status(401);
        throw new Error('Sorry! The donation was unsuccessful');
      }
    }
  } else {
    res.status(401);
    throw new Error('Sorry Invalid chapter.');
  }
});
