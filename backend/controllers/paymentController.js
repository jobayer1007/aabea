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

  // const tYear = jsonObj.getInt(totalYear);
  // console.log(tYear);
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
        const t = await sequelize.transaction();

        try {
          const yearOfPayments = member.NextPaymentDueIn + parseInt(totalYear);
          console.log(yearOfPayments);
          for (let i = 0; i < totalYear; i++) {
            const year = member.NextPaymentDueIn + i;
            console.log(year);
            await models.Payment.create(
              {
                // paymentType,
                memberId: member.memberId,
                amount: req.body.paymentResult.purchase_units[0].amount.value,
                year: year,
                payerId: req.body.paymentResult.payer.email_address,
                paymentId: req.body.paymentResult.id,
                paymentStatus: req.body.paymentResult.status,
                paymentTime: req.body.paymentResult.update_time,
                // paymentType: req.body.paymentTypeName,
              },
              { transaction: t }
            );
          }

          await models.Member.update(
            {
              status: 'active',
              isPaid: true,
              NextPaymentDueIn: yearOfPayments,
            },
            { where: { memberId: req.user.memberId } },
            { transaction: t }
          );

          await t.commit();
          res.status(201).json('Payment Successfull.');
        } catch (error) {
          await t.rollback();
          res
            .status(400)
            .send(
              'msg: Encountered a problem while approving member, error:' +
                error
            );
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
      const donate = await models.Donation.create({
        firstName: member.firstName,
        mInit: member.mInit,
        lastName: member.lastName,
        email: member.primaryEmail,
        // donationType:
        amount: req.body.purchase_units[0].amount.value,
        payerId: req.body.payer.email_address,
        paymentId: req.body.id,
        paymentStatus: req.body.status,
        paymentTime: req.body.update_time,
      }); // Create default payment status
      const donationLinkedMember = await member.addDonation(donate);
      if (donationLinkedMember) {
        console.log('Donation linked');
        res.send('Donation successful');
      } else {
        res.status(401);
        throw new Error('Payment not found');
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

// @desc    Get loggedIn user PaymentS      ///////////////////////////////////////////////
// @route   GET /api/users/payment
// @access  Private
exports.getUserDonationDetails = asyncHandler(async (req, res) => {
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