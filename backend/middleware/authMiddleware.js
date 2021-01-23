import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = await User.findByPk(decoded.id);
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

export { protect };
