const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { sendConfirmationEmail } = require('./mailer');
const User = require('../models/User');
const Member = require('../models/Member');
const models = require('../models/index');
const generateToken = require('../utils/generateToken');

// @desc    Auth User & get Token     ///////////////////////////////////////////////
// @route   POST /api/users/login
// @access  Public
exports.authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await models.User.findOne({
    where: { email: email },
    include: models.Member,
  });

  if (user) {
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        token: null,
        message: 'Invalid Password!',
      });
    } else {
      console.log(JSON.stringify(user));
      res.json({
        userId: user.userId,
        userName: user.userName,
        email: user.email,
        userRole: user.userRole,
        image: user.image,
        memberId: user.memberId,
        status: user.member.status,
        token: generateToken(user.userId),
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
  const user = await models.User.findOne({
    where: { memberId: req.user.memberId },
  });
  // console.log(user);
  if (user) {
    const member = await models.Member.findOne({
      where: { memberId: req.user.memberId },
    });
    if (member) {
      res.json(member);
    } else {
      res.status(401);
      throw new Error('Member not found');
    }
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
    // userRole,
    firstName,
    mInit,
    lastName,
    address1,
    // address2,
    city,
    state,
    zipcode,
    // alternateEmail,
    primaryPhone,
    // alternatePhone,
    degree,
    degreeYear,
    major,
    collegeName,
    // status,
    // balance,
  } = req.body;
  // console.log(email);
  const userExists = await models.User.findOne({ where: { email: email } }); // Check if the user already registered

  if (userExists) {
    res.status(400);
    throw new Error('User Already Exists');
  } else {
    const userExistsInPendingRegister = await models.PendingRegister.findOne({
      where: { email: email },
    }); // // Check if the user already registered but email not verified

    if (userExistsInPendingRegister) {
      res.status(400);
      throw new Error(
        'Please visit your email address and activate your account'
      );
    } else {
      const pendingUserRegister = await models.PendingRegister.create({
        email,
        firstName,
        mInit,
        lastName,
        address1,
        city,
        state,
        zipcode,
        primaryPhone,
        degree,
        degreeYear,
        major,
        collegeName,
        password: bcrypt.hashSync(password, 10),
      });

      if (pendingUserRegister) {
        const sendVerificationEmail = await sendConfirmationEmail({
          toUserEmail: pendingUserRegister.email,
          toUser: pendingUserRegister.firstName,
          hash: pendingUserRegister.pendingId,
        });

        if (sendVerificationEmail) {
          res.json(
            'Just one more step! Please visit your email address and activate your account'
          );
        } else {
          res.status(400);
          throw new Error(
            'Something Went Wrong with verification Email sending, Please contact the Administrator'
          );
        }
      } else {
        res.status(400);
        throw new Error(
          'Something Went Wrong, Please contact the Administrator'
        );
      }
    }
  }
});

// @desc    Verify a new User Email     ///////////////////////////////////////////////
// @route   POST /api/users/activate/:hash
// @access  Public
exports.verifyUserEmail = asyncHandler(async (req, res) => {
  const { hash } = req.params;
  const { email } = req.body;
  console.log(hash);
  const pendingUser = await models.PendingRegister.findOne({
    where: { email: email },
  });

  if (pendingUser) {
    if (pendingUser.pendingId === hash) {
      const member = await models.Member.create({
        primaryEmail: email,
        firstName: pendingUser.firstName,
        mInit: pendingUser.mInit,
        lastName: pendingUser.lastName,
        address1: pendingUser.address1,
        // address2,
        city: pendingUser.city,
        state: pendingUser.state,
        zipcode: pendingUser.zipcode,
        // alternateEmail,
        primaryPhone: pendingUser.primaryPhone,
        // alternatePhone,
        degree: pendingUser.degree,
        degreeYear: pendingUser.degreeYear,
        major: pendingUser.major,
        collegeName: pendingUser.collegeName,
        // status,
        // balance,
      });

      // if (member) {
      //   res.status(201).json({
      //     message: 'member created successfully.',
      //   });
      // } else {
      //   res.status(400);
      //   throw new Error('Invalid Member Data');
      // }
      // const username = () => {
      //   return `${firstName} ${lastName}`;
      // };
      // console.log(member.userName);
      const user = await models.User.create({
        // userRole,
        userName: pendingUser.firstName + ' ' + pendingUser.lastName,
        email: pendingUser.email,
        // image: '/images/sample.jpg',
        // password: bcrypt.hashSync(password, 10),
        password: pendingUser.password,
      });

      const userLinkedMember = await member.addUser(user);

      if (user && member) {
        await pendingUser.destroy();
        res
          .status(201)
          .json(
            'Your account has been Activated Successfully, Please login to access youraccount'
          );
      } else {
        res.status(400);
        throw new Error('Invalid User Data');
      }
    } else {
      res.status(400);
      throw new Error('Activation Link is Invalid');
    }
  } else {
    res.status(400);
    throw new Error('Cannot Validate User Email');
  }
});

// @desc    GET all Users     ///////////////////////////////////////////////
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await models.User.findAll({ include: models.Member });
  res.json(users);
  // const members = await models.Member.findAll();
  // res.json(members);
});

// @desc    Get a  User by Id     ///////////////////////////////////////////////
// @route   GET /api/users/:id
// @access  Private/Admin
exports.getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const user = await models.User.findOne({
    where: { userId: id },
  });
  console.log(user.userId);
  console.log(user.memberId);

  if (user) {
    const member = await models.Member.findOne({
      where: { memberId: user.memberId },
    });
    if (member) {
      res.json(member);
    } else {
      res.status(401);
      throw new Error('Member not found');
    }
  } else {
    res.status(401);
    throw new Error('User not found');
  }
});

// @desc    Update User Profile     ///////////////////////////////////////////////
// @route   PUT /api/users/profile
// @access  Private
exports.updateUserProfile = asyncHandler(async (req, res) => {
  // res.send('success');
  const user = await models.User.findOne({
    where: { userId: req.user.userId },
  });

  if (user) {
    const member = await models.Member.findOne({
      where: { memberId: req.user.memberId },
    });
    if (member) {
      const data = {
        firstName: req.body.firstName || member.firstName,
        mInit: req.body.mInit || member.mInit,
        lastName: req.body.lastName || member.lastName,
        address1: req.body.address1 || member.address1,
        address2: req.body.address2 || member.address2,
        city: req.body.city || member.city,
        state: req.body.state || member.state,
        zipcode: req.body.zipcode || member.zipcode,
        primaryEmail: member.primaryEmail,
        alternateEmail: req.body.alternateEmail || member.alternateEmail,
        primaryPhone: req.body.primaryPhone || member.primaryPhone,
        alternatePhone: req.body.alternatePhone || member.alternatePhone,
        degree: req.body.degree || member.degree,
        degreeYear: req.body.degreeYear || member.degreeYear,
        major: req.body.major || member.major,
        collegeName: req.body.collegeName || member.collegeName,
        status: req.body.status || member.status,
        balance: req.body.balance || member.balance,

        // image: req.body.image || user.image,
        password: bcrypt.hashSync(req.body.password, 10) || user.password,
        userRole: req.body.userRole || user.userRole,
      };

      let {
        primaryEmail,
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
      } = data;
      const updatedMember = await models.Member.update(
        {
          primaryEmail,

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
        },
        { where: { memberId: req.user.memberId } }
      );

      if (updatedMember == 1) {
        const updatedUser = await models.User.update(
          {
            userName: firstName + ' ' + lastName,
            password,
            userRole,
            // image,
          },
          { where: { userId: req.user.userId } }
        );

        if (updatedUser == 1) {
          res.json({ message: 'User updated successfully' });
        } else {
          res.send({ message: 'User update unsuccessful' });
        }
      } else {
        res.send({ message: 'Member update unsuccessful' });
      }
    } else {
      res.status(401);
      throw new Error('Member not found');
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
  const user = await models.User.findOne({ where: { userId: req.params.id } });

  if (user) {
    const member = await models.Member.findOne({
      where: { memberId: user.memberId },
    });
    if (member) {
      const data = {
        firstName: req.body.firstName || member.firstName,
        mInit: req.body.mInit || member.mInit,
        lastName: req.body.lastName || member.lastName,
        address1: req.body.address1 || member.address1,
        address2: req.body.address2 || member.address2,
        city: req.body.city || member.city,
        state: req.body.state || member.state,
        zipcode: req.body.zipcode || member.zipcode,
        // primaryEmail: member.primaryEmail,
        alternateEmail: req.body.alternateEmail || member.alternateEmail,
        primaryPhone: req.body.primaryPhone || member.primaryPhone,
        alternatePhone: req.body.alternatePhone || member.alternatePhone,
        degree: req.body.degree || member.degree,
        degreeYear: req.body.degreeYear || member.degreeYear,
        major: req.body.major || member.major,
        collegeName: req.body.collegeName || member.collegeName,
        status: req.body.status || member.status,
        balance: req.body.balance || member.balance,

        // image: req.body.image || user.image,
        // password: bcrypt.hashSync(req.body.password, 10) || user.password,
        userRole: req.body.userRole || user.userRole,
      };

      let {
        // primaryEmail,
        // password,
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
      } = data;
      const updatedMember = await models.Member.update(
        {
          // primaryEmail,

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
          // balance,
        },
        { where: { memberId: user.memberId } }
      );

      if (updatedMember == 1) {
        const updatedUser = await models.User.update(
          {
            // password,
            userName: firstName + ' ' + lastName,
            userRole,
            // image,
          },
          { where: { userId: user.userId } }
        );

        if (updatedUser == 1) {
          res.json({ message: 'User updated successfully' });
        } else {
          res.send({ message: 'User update unsuccessful' });
        }
      } else {
        res.send({ message: 'Member update unsuccessful' });
      }
    } else {
      res.status(401);
      throw new Error('Member not found');
    }
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});

// @desc    Delete User     /////////////////////////////////////////////// pending
// @route   DELETE /api/users/:id
// @access  Private
exports.deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const user = await models.User.findOne({
    where: { userId: id },
  });
  console.log(user.userId);
  console.log(user.memberId);

  if (user) {
    models.Member.destroy({
      where: { memberId: user.memberId },
    })
      .then((num) => {
        if (num == 1) {
          models.User.destroy({ where: { userId: id } })
            .then((des) => {
              if (des == 1) {
                res.json({ message: 'User has been deleted successfully' });
              } else {
                res.json({ message: 'Cannot delete the user' });
              }
            })
            .catch((err) => console.log(err));
        } else {
          res.json({ message: 'Cannot delete the member' });
        }
      })
      .catch((err) => console.log(err));
  } else {
    res.status(401);
    throw new Error('User not found');
  }
});
