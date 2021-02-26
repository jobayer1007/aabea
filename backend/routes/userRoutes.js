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
} = require('../controllers/userController');
const {
  getUserPaymentDetails,
  updatePaymentToPaid,
} = require('../controllers/paymentController');

router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// USER's Payment
router.route('/payment').get(protect, getUserPaymentDetails);
router.route('/:id/pay').post(protect, updatePaymentToPaid);

router.route('/register').post(registerUser);
router.route('/activate/:hash').post(verifyUserEmail);
router.route('/dashboard').get(protect, getUsers);
router
  .route('/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);
router.route('/:id').delete(protect, admin, deleteUser);

// Add a User/////////////////////////////////////////////////

// Update a User///////////////////////////////////////////////////////

// Delete an User//////////////////////////////////////////

module.exports = router;
