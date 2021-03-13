const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

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
        // userId: user.userId,
        userName: user.userName,
        email: user.email,
        userRole: user.userRole,
        image: user.image,
        memberId: user.memberId,
        status: user.member.status,
        memberSince: user.member.startDate,
        token: generateToken(user.memberId),
      });
    }
  } else {
    const userPending = await models.PendingRegister.findOne({
      where: { email: email },
    });

    if (userPending) {
      const passwordIsValid = bcrypt.compareSync(
        password,
        userPending.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          token: null,
          message: 'Invalid Password!',
        });
      } else {
        if (userPending.emailVerified === false) {
          res.status(401);
          throw new Error(
            'Please visite your mailbox to verify your Email address.'
          );
        } else {
          res.status(401);
          throw new Error(
            'Your application is under review. You will be notified once it is reviewed!'
          );
        }
      }
    } else {
      res.status(401);
      throw new Error('Invalid User');
    }
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
  // const userrole = await modeks.User.findOne({ where: {userRole:}})
  const userExists = await models.Member.findOne({
    where: { primaryEmail: email },
  }); // Check if the Member already registered

  if (!userExists) {
    const userExistsInPendingRegister = await models.PendingRegister.findOne({
      where: { email: email },
    }); // // Check if the user already registered but email not verified

    if (userExistsInPendingRegister) {
      res.status(400);
      throw new Error(
        'Please visit your email address and activate your account'
      );
    } else {
      // const id = generateUniqueId({
      //   length: 32,
      //   useLetters: false,
      // });
      // console.log(id);
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
  } else {
    res.status(400);
    throw new Error('User Already Exists');
  }
  // } else {
  //   const userExistsInPendingRegister = await models.PendingRegister.findOne({
  //     where: { email: email },
  //   }); // // Check if the user already registered but email not verified

  //   if (userExistsInPendingRegister) {
  //     res.status(400);
  //     throw new Error(
  //       'Please visit your email address and activate your account'
  //     );
  //   } else {
  //     const pendingUserRegister = await models.PendingRegister.create({
  //       email,
  //       firstName,
  //       mInit,
  //       lastName,
  //       address1,
  //       city,
  //       state,
  //       zipcode,
  //       primaryPhone,
  //       degree,
  //       degreeYear,
  //       major,
  //       collegeName,
  //       password: bcrypt.hashSync(password, 10),
  //     });

  //     if (pendingUserRegister) {
  //       const sendVerificationEmail = await sendConfirmationEmail({
  //         toUserEmail: pendingUserRegister.email,
  //         toUser: pendingUserRegister.firstName,
  //         hash: pendingUserRegister.pendingId,
  //       });

  //       if (sendVerificationEmail) {
  //         res.json(
  //           'Just one more step! Please visit your email address and activate your account'
  //         );
  //       } else {
  //         res.status(400);
  //         throw new Error(
  //           'Something Went Wrong with verification Email sending, Please contact the Administrator'
  //         );
  //       }
  //     } else {
  //       res.status(400);
  //       throw new Error(
  //         'Something Went Wrong, Please contact the Administrator'
  //       );
  //     }
  //   }
  // }
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
      const updateEmailVarified = await models.PendingRegister.update(
        {
          emailVerified: true,
        },
        { where: { pendingId: hash } }
      );

      if (updateEmailVarified == 1) {
        res.json(
          'Your Email Verification Successfull! An admin will review your application now. Once reviewed, you will be notified! Thank You.'
        );
      } else {
        res.status(400);
        throw new Error('Email Verification Unsuccessfull!');
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

// @desc    GET all Pending Users     ///////////////////////////////////////////////
// @route   GET /api/users/pending
// @access  Private/Admin
exports.getPendingUsers = asyncHandler(async (req, res) => {
  const pendingUsers = await models.PendingRegister.findAll({
    where: { emailVerified: true },
  });
  res.json(pendingUsers);
  // const members = await models.Member.findAll();
  // res.json(members);
});

// @desc    Get a  Pending User by Id     ///////////////////////////////////////////////
// @route   GET /api/users/:id/pending
// @access  Private/Admin
exports.getPendingUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const pendingUser = await models.PendingRegister.findOne({
    where: { pendingId: id },
  });
  console.log('ID:' + pendingUser.pendingId);
  console.log('Email Verified:' + pendingUser.emailVerified);
  console.log('Status:' + pendingUser.status);

  if (pendingUser) {
    res.json(pendingUser);
    console.log(pendingUser.pendingId);
  } else {
    res.status(401);
    throw new Error('User not found');
  }
});

// @desc    Approve Pending User      ///////////////////////////////////////////////
// @route   POST /api/users/:id/pending
// @access  Private/Admin
exports.approveUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const pendingUser = await models.PendingRegister.findOne({
    where: { pendingId: id },
  });

  if (pendingUser && pendingUser.emailVerified === true) {
    // First, we start a transaction and save it into a variable
    const t = await sequelize.transaction();

    try {
      // Then, we do some calls passing this transaction as an option:

      const member = await models.Member.create(
        {
          primaryEmail: pendingUser.email,
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
          NextPaymentDueIn: new Date().getFullYear(),
          // status: 'inactive'
          // balance,
        },
        { transaction: t }
      );

      // const user = await member.addUser(
      await models.User.create(
        {
          // userRole,
          memberId: member.memberId,
          userName: pendingUser.firstName + ' ' + pendingUser.lastName,
          email: pendingUser.email,
          // image: '/images/sample.jpg',
          // password: bcrypt.hashSync(password, 10),
          password: pendingUser.password,
        },
        { transaction: t }
      );

      await pendingUser.destroy({ transaction: t });

      // If the execution reaches this line, no errors were thrown.
      // We commit the transaction.
      await t.commit();
      res.status(201).json('account has been Approved Successfully.');
    } catch (error) {
      // If the execution reaches this line, an error was thrown.
      // We rollback the transaction.
      await t.rollback();
      res
        .status(400)
        .send(
          'msg: Encountered a problem while approving member, error:' + error
        );
    }
  } else {
    res.status(404);
    throw new Error('User Not Found');
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
    where: { memberId: id },
  });
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
    where: { memberId: req.user.memberId },
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
          { where: { memberId: req.user.memberId } }
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
  const user = await models.User.findOne({
    where: { memberId: req.params.id },
  });

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
          { where: { memberId: user.memberId } }
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
    where: { memberId: id },
  });
  console.log(user.memberId);
  console.log(user.memberId);

  if (user) {
    models.Member.destroy({
      where: { memberId: user.memberId },
    })
      .then((num) => {
        if (num == 1) {
          models.User.destroy({ where: { memberId: id } })
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

// @desc    Create Admin User      ///////////////////////////////////////////////
// @route   POST /api/users/:id/admin
// @access  Private/SystemAdmin
exports.createAdminUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const user = await models.User.findOne({
    where: { memberId: id },
  });
  console.log(user.memberId);
  if (user) {
    const member = await models.Member.findOne({
      where: { memberId: user.memberId },
    });

    if (member) {
      const newAdmin = await models.User.create({
        userRole: 'admin',
        memberId: member.memberId,
        userName: member.firstName + ' ' + member.lastName,
        email: member.primaryEmail,
        // image: '/images/sample.jpg',
        // password: bcrypt.hashSync(password, 10),
        password: user.password,
      });
      if (newAdmin) {
        res.status(201).json('Admin User Created Successfully.');
      } else {
        res.status(401);
        throw new Error('Could not Create Admin User');
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

exports.deleteAdminUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const user = await models.User.findOne({
    where: { memberId: id, userRole: 'admin' },
  });
  console.log(user.userId);
  console.log(user.memberId);

  if (user) {
    models.User.destroy({
      where: { memberId: user.memberId, userRole: 'admin' },
    })
      .then((num) => {
        if (num == 1) {
          res.json({ message: 'Admin User has been deleted successfully' });
        } else {
          res.json({ message: 'Cannot delete the Admin User' });
        }
      })
      .catch((err) => console.log(err));
  } else {
    res.status(401);
    throw new Error('User not found');
  }
});

///////////////////////////////////////////DEV ONLY////////////////////////////////////

const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);
// @desc    Register a SystemAdmin     ///////////////////////////////////////////////
// @route   POST /api/users/register/systemadmin
// @access  Public
exports.registerSystemAdmin = asyncHandler(async (req, res) => {
  const {
    email,
    password,
    userRole,
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
    status,
    chapterId,
    // balance,
  } = req.body;
  // console.log(email);
  // const userrole = await modeks.User.findOne({ where: {userRole:}})
  const userExists = await models.Member.findOne({
    where: { primaryEmail: email },
  }); // Check if the Member already registered

  if (!userExists) {
    const t = await sequelize.transaction();

    try {
      // Then, we do some calls passing this transaction as an option:

      const member = await models.Member.create(
        {
          primaryEmail: email,
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
          status,
          chapterId,
          NextPaymentDueIn: new Date().getFullYear(),
          // balance,
        },
        { transaction: t }
      );

      // await member.addUser(
      await models.User.create(
        {
          userRole,
          memberId: member.memberId,
          userName: firstName + ' ' + lastName,
          email,
          // image: '/images/sample.jpg',
          // password: bcrypt.hashSync(password, 10),
          password: bcrypt.hashSync(password, 10),
          chapterId,
        },
        { transaction: t }
      );

      // If the execution reaches this line, no errors were thrown.
      // We commit the transaction.
      await t.commit();
      res.status(201).json('SystemAdmin has been Created Successfully.');
    } catch (error) {
      // If the execution reaches this line, an error was thrown.
      // We rollback the transaction.
      await t.rollback();
      res
        .status(400)
        .send(
          'msg: Encountered a problem while creating SystemAdmin, error:' +
            error
        );
    }
  } else {
    res.status(400);
    throw new Error('User Already Exists');
  }
});
