const fetch = require('node-fetch');
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
      req.user = await models.User.findOne({
        where: { memberId: decoded.id, userRole: decoded.role },
      });
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not Authorized, Token Failed');
    }
  }
  // console.log(`token: ${token}`);
  // console.log(`req.headers.authorization: ${req.headers.authorization}`);
  if (!token) {
    res.status(401);
    throw new Error('Not Authorized, NO token');
  }
});

exports.admin = (req, res, next) => {
  if (
    req.user &&
    (req.user.userRole === 'admin' || req.user.userRole === 'systemAdmin')
  ) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

exports.systemAdmin = (req, res, next) => {
  if (req.user && req.user.userRole === 'systemAdmin') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an system admin');
  }
};

// export { protect, admin };

///////////Captcha///////////////////////////////////////////////

exports.captcha = asyncHandler(async (req, res, next) => {
  // let token;
  if (
    req.body.captcha === undefined ||
    req.body.captcha === '' ||
    req.body.captcha === null
  ) {
    res.status(401);
    throw new Error('Please select captcha');
  }
  try {
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${req.body.captcha}&remoteip=${req.ip}`;

    // console.log(process.env.NODE_ENV)
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // };
    console.log('Captcha Received:' + req.body.captcha);
    console.log('URL:' + verifyUrl);

    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${req.body.captcha}&remoteip=${req.ip}`,
      { method: 'POST' }
    );
    const data = await response.json();
    console.log(data);
    if (data.success) {
      next();
    } else {
      res.status(401);
      throw new Error('Failed captcha verification');
    }
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error('Failed captcha verification!' + ' ' + error);
  }
});
