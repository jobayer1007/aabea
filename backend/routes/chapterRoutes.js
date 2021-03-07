const express = require('express');
const router = express.Router();
const {
  createNewChapter,
  getChapters,
  createNewPaymentType,
  getPaymentTypes,
  deletePaymentType,
} = require('../controllers/chapterController');

// Add a New Chapter/////////////////////////////////////////////////
router.route('/new').post(createNewChapter);

// Get All Chapter ///////////////////////////////////////////
router.route('/systemAdmin').get(getChapters);

// PaymentType/////////////////////////////////////////////////
router.route('/paymentType').post(createNewPaymentType).get(getPaymentTypes);
router.route('/paymentType/:id').delete(deletePaymentType);

module.exports = router;
