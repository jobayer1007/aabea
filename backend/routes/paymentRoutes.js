const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');

const {
  updatePaymentToPaid,
  getUserPaymentDetails,
} = require('../controllers/paymentController');

// USER's Payment
// router.route('/payment').get(protect, getUserPaymentDetails);
// router.route('/payment/pay').post(protect, updatePaymentToPaid);

// Add a User/////////////////////////////////////////////////

// Update a User///////////////////////////////////////////////////////

// Delete an User//////////////////////////////////////////

module.exports = router;
