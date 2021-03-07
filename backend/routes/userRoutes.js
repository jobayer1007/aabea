const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
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
} = require('../controllers/userController');
const {
  getUserPaymentDetails,
  updatePaymentToPaid,
  memberDonation,
  getUserDonationDetails,
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

router.route('/register').post(registerUser);
router.route('/activate/:hash').post(verifyUserEmail);
router.route('/pending').get(getPendingUsers);
router.route('/:id/pending').get(getPendingUserById).post(approveUser);
router.route('/:id/admin').post(createAdminUser);
router.route('/dashboard').get(protect, getUsers);
router.route('/:id').get(getUserById).put(updateUser);
router.route('/:id').delete(protect, admin, deleteUser);
router.route('/:id/admin').delete(deleteAdminUser);

// Add a User/////////////////////////////////////////////////

// Update a User///////////////////////////////////////////////////////

// Delete an User//////////////////////////////////////////

// DEV Only: Register SystemAdmin////////////////////////////
router.route('/register/systemAdmin').post(registerSystemAdmin);

module.exports = router;
