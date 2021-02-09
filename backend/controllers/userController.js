const asyncHandler = require('express-async-handler');
// import asyncHandler from 'express-async-handler';
const bcrypt = require('bcryptjs');
// import bcrypt from 'bcryptjs';
const User = require('../models/User');
// import User from '../models/User.js';
const generateToken = require('../utils/generateToken');
// import generateToken from '../utils/generateToken.js';

// @desc    Auth User & get Token     ///////////////////////////////////////////////
// @route   POST /api/users/login
// @access  Public
exports.authUser = asyncHandler(async (req, res) => {
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
        image: user.image,
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
exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ where: { id: req.user.id } });

  if (user) {
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      image: user.image,
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
exports.registerUser = asyncHandler(async (req, res) => {
  const {
    email,
    password,
    userRole,
    firstName,
    mInit,
    lastName,
    address1,
    address2,
    city,
    state,
    zipcode,
    alternateEmail,
    primaryPhone,
    alternatePhone,
    degree,
    degreeYear,
    major,
    collegeName,
    status,
    balance,
  } = req.body;

  const userExists = await User.findOne({ where: { email: email } });

  // let { username, email, password, isAdmin } = data;
  if (userExists) {
    res.status(400);
    throw new Error('User Already Exists');
  } else {
    const member = await Member.create({
      firstName,
      mInit,
      lastName,
      address1,
      address2,
      city,
      state,
      zipcode,
      primaryEmail: email,
      alternateEmail,
      primaryPhone,
      alternatePhone,
      degree,
      degreeYear,
      major,
      collegeName,
      status,
      balance,
    });

    if (member) {
      res.status(201).json({
        message: 'member created successfully.',
      });
    } else {
      res.status(400);
      throw new Error('Invalid Member Data');
    }

    const user = await User.create({
      userRole,
      email,
      // image: '/images/sample.jpg',
      password: bcrypt.hashSync(password, 10),
    });

    if (user) {
      res.status(201).json({
        id: user.userId,

        email: user.email,
        userRole: user.userRole,
        image: user.image,
        token: generateToken(user.userId),
      });
    } else {
      res.status(400);
      throw new Error('Invalid User Data');
    }
  }
});

// @desc    GET all Users     ///////////////////////////////////////////////
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll();

  res.json(users);
});

// @desc    Get a  User by Id     ///////////////////////////////////////////////
// @route   GET /api/users/:id
// @access  Private/Admin
exports.getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (user) {
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      image: user.image,
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
exports.updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ where: { id: req.user.id } });

  if (user) {
    const data = {
      username: req.body.username || user.username,
      email: req.body.email || user.email,
      image: req.body.image || user.image,
      password: bcrypt.hashSync(req.body.password, 10) || user.password,
      isAdmin: user.isAdmin,
    };

    let { username, email, password, isAdmin, image } = data;

    const updatedUser = await User.update(
      {
        username,
        email,
        password,
        isAdmin,
        image,
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
exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.id } });

  if (user) {
    const data = {
      username: req.body.username || user.username,
      email: req.body.email || user.email,
      image: req.body.image || user.image,
      // password: bcrypt.hashSync(req.body.password, 10) || user.password,
      isAdmin: req.body.isAdmin,
    };

    let { username, email, isAdmin, image } = data;

    const updatedUser = await User.update(
      {
        username,
        email,
        image,
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
exports.deleteUser = asyncHandler(async (req, res) => {
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

// export {
//   authUser,
//   getUserProfile,
//   updateUserProfile,
//   getUsers,
//   getUserById,
//   updateUser,
//   registerUser,
//   deleteUser,
// };
