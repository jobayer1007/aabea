const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Member = require('../models/Member');
const models = require('../models/index');
const generateToken = require('../utils/generateToken');

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
  const user = await models.User.findOne({
    where: { memberId: req.params.id },
  });
  // console.log(user);
  if (user) {
    const member = await models.Member.findOne({
      where: { memberId: req.user.memberId },
    });

    if (member) {
      const payment = await models.Payment.create({
        // paymentType,
        amount: req.body.purchase_units[0].amount.value,
        payerId: req.body.payer.email_address,
        paymentId: req.body.id,
        paymentStatus: req.body.status,
        paymentTime: req.body.update_time,
      }); // Create default payment status
      const paymentLinkedMember = await member.addPayment(payment);
      if (paymentLinkedMember) {
        console.log('payment linked');

        member.isPaid = true;
        const updatedMember = await member.save();

        if (updatedMember) {
          res.send('payment successful');
        } else {
          res.status(401);
          throw new Error('Something went wrong with payment');
        }
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
