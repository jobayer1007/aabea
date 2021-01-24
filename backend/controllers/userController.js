import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth User & get Token     ///////////////////////////////////////////////
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email: email } });

  if (user) {
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        token: null,
        message: 'Invalid Password!',
      });
    } else {
      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user.id),
      });
    }
  } else {
    res.status(401);
    throw new Error('Invalid User');
  }
});

// @desc    Get loggedIn user Profile     ///////////////////////////////////////////////
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ where: { id: req.user.id } });

  if (user) {
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('User not found');
  }
});

// @desc    Register a new User     ///////////////////////////////////////////////
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  // const data = {
  //   username: req.body.username,
  //   email: req.body.email,
  //   password: bcrypt.hashSync(req.body.password, 10),
  //   isAdmin: req.body.isAdmin,
  // };

  const { username, email, password } = req.body;

  const userExists = await User.findOne({ where: { email: email } });

  // let { username, email, password, isAdmin } = data;
  if (userExists) {
    res.status(400);
    throw new Error('User Already Exists');
  } else {
    const user = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, 10),
    });

    if (user) {
      res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user.id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid User Data');
    }
  }
  // Insert Into Table
  // User.create({
  //   username,
  //   email,
  //   password,
  //   isAdmin,
  // }).catch((err) => console.log(err));
});

// @desc    GET all Users     ///////////////////////////////////////////////
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll();

  res.json(users);
});

// @desc    Get a  User by Id     ///////////////////////////////////////////////
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (user) {
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});

// @desc    Update User Profile     ///////////////////////////////////////////////
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ where: { id: req.user.id } });

  if (user) {
    const data = {
      username: req.body.username || user.username,
      email: req.body.email || user.email,

      password: bcrypt.hashSync(req.body.password, 10) || user.password,
      isAdmin: user.isAdmin,
    };

    let { username, email, password, isAdmin } = data;

    const updatedUser = await User.update(
      {
        username,
        email,
        password,
        isAdmin,
      },
      { where: { id: req.user.id } }
    );

    if (updatedUser == 1) {
      res.json({ message: 'User updated successfully' });
    } else {
      res.send({ message: 'User update unsuccessful' });
    }
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});

// @desc    Update User      ///////////////////////////////////////////////
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.id } });

  if (user) {
    const data = {
      username: req.body.username || user.username,
      email: req.body.email || user.email,

      // password: bcrypt.hashSync(req.body.password, 10) || user.password,
      isAdmin: req.body.isAdmin,
    };

    let { username, email, isAdmin } = data;

    const updatedUser = await User.update(
      {
        username,
        email,

        isAdmin,
      },
      { where: { id: req.params.id } }
    );
    console.log(updatedUser);
    if (updatedUser == 1) {
      res.json({ message: 'User updated successfully' });
    } else {
      res.send({ message: 'User update unsuccessful' });
    }
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});

// @desc    Delete User     ///////////////////////////////////////////////
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  User.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.json({ message: 'User has been deleted successfully' });
      } else {
        res.json({ message: 'Cannot delet the user' });
      }
    })
    .catch((err) => console.log(err));
});

export {
  authUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  registerUser,
  deleteUser,
};
