const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Member = require('../models/Member');
const models = require('../models/index');
const generateToken = require('../utils/generateToken');

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
        const payment = await models.Payment.create({
          chapterId: member.chapterId,
          memberId: member.memberId,
          amount: req.body.paymentResult.purchase_units[0].amount.value,
          year: new Date().getFullYear(),
          payerId: req.body.paymentResult.payer.email_address,
          paymentId: req.body.paymentResult.id,
          paymentStatus: req.body.paymentResult.status,
          paymentTime: req.body.paymentResult.update_time,
          paymentType: req.body.paymentTypeName,
        });

        if (payment) {
          res.send('Your Nomination Fee has been Paid Successfully');
        } else {
          res.status(401);
          throw new Error(
            'Sorry! Your Nomination Fee Payment was unsuccessfull'
          );
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

    // Roll
    // const t = await sequelize.transaction();

    // try {
    //   // Then, we do some calls passing this transaction as an option:

    //   ,
    //     { transaction: t }
    //   );

    //  ,
    //     { transaction: t }
    //   );

    //   await pendingUser.destroy({ transaction: t });

    //   await t.commit();
    //   res.status(201).json('account has been Activated Successfully.');
    // } catch (error) {
    //   // If the execution reaches this line, an error was thrown.
    //   // We rollback the transaction.
    //   await t.rollback();
    //   res
    //     .status(400)
    //     .send(
    //       'msg: Encountered a problem while approving member, error:' + error
    //     );
    // }
    // Roll end

    // if (member) {
    //   // try {
    //   for (let i = 0; i < totalYear; i++) {
    //     const year = new Date(member.NextPaymentDueIn).getFullYear() + i;
    //     console.log(year);
    //     const payment = await models.Payment.create({
    //       // paymentType,
    //       memberId: member.memberId,
    //       amount: req.body.paymentResult.purchase_units[0].amount.value,
    //       year: year,
    //       payerId: req.body.paymentResult.payer.email_address,
    //       paymentId: req.body.paymentResult.id,
    //       paymentStatus: req.body.paymentResult.status,
    //       paymentTime: req.body.paymentResult.update_time,
    //       paymentType: req.body.paymentTypeName,
    //     });

    //     if (payment) {
    //       console.log('payment inserted:' + i);
    //       // res.send('payment inserted:' + i);
    //     } else {
    //       res.status(401);
    //       throw new Error('couldnt create payment');
    //     }
    //   }
    //   console.log('Outside For loop');

    //   res.send('payment inserted:');
    // } catch (error) {
    //   return res.json(
    //     'Encountered a problem while saving payment, error:' + error
    //   );
    // }

    // const payment = await models.Payment.create({
    //   // paymentType,
    //   memberId: member.memberId,
    //   amount: req.body.purchase_units[0].amount.value,
    //   year: new Date().getFullYear(),
    //   payerId: req.body.payer.email_address,
    //   paymentId: req.body.id,
    //   paymentStatus: req.body.status,
    //   paymentTime: req.body.update_time,
    //   paymentType: req.body.paymentTypeName,
    // }); // Create default payment status
    // const paymentLinkedMember = await member.addPayment(payment);
    // if (payment) {
    //   console.log('payment linked');

    //   member.isPaid = true;
    //   const updatedMember = await member.save();

    //   if (updatedMember) {
    //     res.send('payment successful');
    //   } else {
    //     res.status(401);
    //     throw new Error('Something went wrong with payment');
    //   }
    // } else {
    //   res.status(401);
    //   throw new Error('Payment not found');
    // }
    // } else {
    //   res.status(401);
    //   throw new Error('Member not found');
    // }
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
          console.log('Donation linked');
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
  // console.log(`Domain: ${checkChapter}`);
  // console.log(`guest: ${guest}`);
  // console.log(`email: ${email}`);
  // console.log(`firstName: ${firstName}`);
  // console.log(`mInit: ${mInit}`);
  // console.log(`lastName: ${lastName}`);
  // console.log(`amount: ${paymentResult.purchase_units[0].amount.value}`);
  const subDomain = checkChapter.split('.')[0];

  const chapter = await models.Chapter.findOne({
    where: { subDomain: subDomain },
  });
  // console.log(chapter);
  if (chapter) {
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
          console.log('Donation linked');
          res.send('Donation successful');
        } else {
          res.status(401);
          throw new Error('Payment not found');
        }
      } else {
        // res.status(401);
        // throw new Error('Member not found');

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
