const jwt = require('jsonwebtoken');
// import jwt from 'jsonwebtoken';
const asyncHandler = require('express-async-handler');
// import asyncHandler from 'express-async-handler';
const User = require('../models/User');
const models = require('../models/index');

// import User from '../models/User.js';

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = await models.User.findByPk(decoded.id);
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not Authorized, Token Failed');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not Authorized, NO token');
  }
});

exports.admin = (req, res, next) => {
  if (req.user && req.user.userRole === 'admin') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

// export { protect, admin };
