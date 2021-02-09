const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getUsers,
  getUserById,
  authUser,
  getUserProfile,
  registerUser,
  deleteUser,
  updateUserProfile,
  updateUser,
} = require('../controllers/userController');

router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/register').post(registerUser);
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
