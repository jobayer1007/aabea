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

// @desc    Fetch all Users     ///////////////////////////////////////////////
// @route   GET /api/users
// @access  Public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll();

  res.send(users);
});

// @desc    Fetch a single Users     ///////////////////////////////////////////////
// @route   GET /api/users/:id
// @access  Public
const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (user) {
    res.send(user);
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});

export { authUser, getUserProfile, getUsers, getUserById, registerUser };
