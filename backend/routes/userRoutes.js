const express = require('express');
const router = express.Router();
const { protect, admin, systemAdmin } = require('../middleware/authMiddleware');
const {
  getUsers,
  getUserById,
  authUser,
  getUserProfile,
  registerUser,
  verifyUserEmail,
  deleteUser,
  updateUserProfile,
  updateUser,
  getPendingUsers,
  getPendingUserById,
  approveUser,
  registerSystemAdmin,
  createAdminUser,
  deleteAdminUser,
  verifyEmailResend,
  sendPasswordResetEmail,
  receiveNewPassword,
} = require('../controllers/userController');
const {
  getUserPaymentDetails,
  updatePaymentToPaid,
  memberDonation,
  getUserDonationDetails,
  guestDonation,
} = require('../controllers/paymentController');

router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// USER's Payment
router.route('/payment').get(protect, getUserPaymentDetails);
router.route('/:id/pay').post(protect, updatePaymentToPaid);
router.route('/donate').get(protect, getUserDonationDetails);
router.route('/:id/donate').post(protect, memberDonation);
router.route('/donate').post(guestDonation);

router.route('/register').post(registerUser);
router.route('/verifyResend').post(verifyEmailResend);
router.route('/activate/:hash').post(verifyUserEmail);
router.route('/pending/chapter/:checkChapter').get(protect, getPendingUsers);
router
  .route('/:id/pending')
  .get(protect, getPendingUserById)
  .post(protect, admin, approveUser);
router
  .route('/:id/admin')
  .post(protect, admin, createAdminUser)
  .delete(protect, admin, deleteAdminUser);
router.route('/chapter/:checkChapter').get(protect, getUsers);
router.route('/:id').get(getUserById).put(protect, admin, updateUser);
router.route('/:id').delete(protect, admin, deleteUser);

// Password Reset
router.route('/:checkChapter').post(sendPasswordResetEmail);
router.route('/newPassword/:id/:token').put(receiveNewPassword);

// Add a User/////////////////////////////////////////////////

// Update a User///////////////////////////////////////////////////////

// Delete an User//////////////////////////////////////////

// DEV Only: Register SystemAdmin////////////////////////////
router.route('/register/systemAdmin').post(registerSystemAdmin);

module.exports = router;
