const express = require('express');
const router = express.Router();
const {
  sendNewEmail,
  getAllEmails,
  getEmailById,
} = require('../controllers/emailController');
const { protect, admin } = require('../middleware/authMiddleware');

// Email/////////////////////////////////////////////////
router.route('/').post(protect, admin, sendNewEmail);
router.route('/chapter/:checkChapter').get(protect, admin, getAllEmails);
router.route('/:id').get(protect, admin, getEmailById);

module.exports = router;
