import express from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
const router = express.Router();
import User from '../models/User.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  getUsers,
  getUserById,
  authUser,
  getUserProfile,
  registerUser,
  deleteUser,
  updateUserProfile,
  updateUser,
} from '../controllers/userController.js';

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

export default router;
