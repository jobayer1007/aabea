import express from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
const router = express.Router();
import User from '../models/User.js';
import { protect } from '../middleware/authMiddleware.js';
import {
  getUsers,
  getUserById,
  authUser,
  getUserProfile,
  registerUser,
} from '../controllers/userController.js';

router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);

router.route('/register').post(registerUser);
router.route('/').get(getUsers);
router.route('/:id').get(getUserById);

// Add a User/////////////////////////////////////////////////

// Update a User///////////////////////////////////////////////////////
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  const data = {
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    isAdmin: req.body.isAdmin,
  };

  let { username, email, password, isAdmin } = data;

  User.update(
    {
      username,
      email,
      password,
      isAdmin,
    },
    { where: { id: id } }
  )
    .then((num) => {
      if (num == 1) {
        res.send({ message: 'User updated successfully' });
      } else {
        res.send({ message: 'User update unsuccessful' });
      }
    })
    .catch((err) => console.log(err));
});

// Delete an User//////////////////////////////////////////
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  User.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: 'User has been deleted successfully' });
      } else {
        res.send({ message: 'Cannot delet the user' });
      }
    })
    .catch((err) => console.log(err));
});

export default router;
