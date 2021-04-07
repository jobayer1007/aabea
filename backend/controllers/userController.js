const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {
  sendConfirmationEmail,
  sendCongratulationsEmail,
  getPasswordResetURL,
  resetPasswordTemplate,
  transporter,
} = require('./mailer');
const User = require('../models/User');
const Member = require('../models/Member');
const models = require('../models/index');
const { generateToken, passwordResetToken } = require('../utils/generateToken');
const { generateId } = require('../utils/generateId');

// @desc    Auth User & get Token     ///////////////////////////////////////////////
// @route   POST /api/users/login
// @access  Public
exports.authUser = asyncHandler(async (req, res) => {
  const { userRole, email, password } = req.body;

  const user = await models.User.findOne({
    where: { email: email, userRole: userRole },
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
      const loggedInUser = await models.User.update(
        {
          last_login: new Date(),
        },
        { where: { email: email, userRole: userRole } }
      );
      // console.log(JSON.stringify(user));
      res.json({
        chapterId: user.chapterId,
        memberId: user.memberId,
        userRole: user.userRole,
        email: user.email,
        status: user.member.status,
        userName: user.userName,
        image: user.image,
        last_login: user.last_login,
        memberSince: user.member.startDate,
        // token: generateToken(user.memberId),
        token: generateToken(user.memberId, user.userRole),
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
          // res.status(401);
          // throw new Error(
          //   'Please visite your mailbox to verify your Email address.'
          // );
          return res.status(401).json({
            // token: generateToken(userPending.pendingId),
            message:
              'Please visite your mailbox to verify your Email address.!!!!!!!!!!',
          });
        } else {
          res.status(402);
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
    certificate,
  } = req.body;

  // Find Chapter
  const subDomain = 'bd.aabea.org'; // at dev only
  // const chapterName = 'Bangladesh';
  const chapter = await models.Chapter.findOne({
    where: { subDomain: subDomain },
  });
  console.log(chapter.chapterId);

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
        'Please check your email address and verify your account'
      );
    } else {
      // const id = generateUniqueId({
      //   length: 32,
      //   useLetters: false,
      // });
      // console.log(id);
      const pendingUserRegister = await models.PendingRegister.create({
        chapterId: chapter.chapterId,
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
        certificate,
        password: bcrypt.hashSync(password, 10),
      });

      if (pendingUserRegister) {
        const sendVerificationEmail = await sendConfirmationEmail({
          toUserEmail: pendingUserRegister.email,
          toUser: pendingUserRegister.firstName,
          hash: pendingUserRegister.pendingId,
        });

        if (sendVerificationEmail) {
          res.json('Please check your email to verify your account');
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
});

// @desc    Verify a new User Email     ///////////////////////////////////////////////
// @route   POST /api/users/activate/:hash
// @access  Public
exports.verifyUserEmail = asyncHandler(async (req, res) => {
  const { hash } = req.params;
  // const { email } = req.body;
  console.log(hash);
  const pendingUser = await models.PendingRegister.findOne({
    where: { pendingId: hash },
  });

  if (pendingUser) {
    if (pendingUser.emailVerified !== true) {
      // if (pendingUser.pendingId === hash) {
      const updateEmailVarified = await models.PendingRegister.update(
        {
          emailVerified: true,
        },
        { where: { pendingId: hash } }
      );

      if (updateEmailVarified == 1) {
        res.json(
          'Your email verification is successfull! Admin will review your application. Once review is done, you will be notified! Thank You.'
        );
      } else {
        res.status(400);
        throw new Error('Email verification unsuccessfull!');
      }
      // } else {
      //   res.status(400);
      //   throw new Error('Activation Link is Invalid');
      // }
    } else {
      res.status(400);
      throw new Error('Your email is already verified.');
    }
  } else {
    res.status(400);
    throw new Error('Invalid link.');
  }
});

// @desc    Verify Email Resend     ///////////////////////////////////////////////
// @route   POST /api/users/verifyResend
// @access  Public
exports.verifyEmailResend = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userPending = await models.PendingRegister.findOne({
    where: { email: email },
  });

  if (userPending) {
    const passwordIsValid = bcrypt.compareSync(password, userPending.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        token: null,
        message: 'Invalid Credentials!',
      });
    } else {
      if (userPending.emailVerified === false) {
        const sendVerificationEmail = await sendConfirmationEmail({
          toUserEmail: userPending.email,
          toUser: userPending.firstName,
          hash: userPending.pendingId,
        });

        if (sendVerificationEmail) {
          res.json(
            'An email with verification link has been sent! Please check your email to verify your account'
          );
        } else {
          res.status(400);
          throw new Error(
            'Something Went Wrong with verification Email sending, Please contact the Administrator'
          );
        }
      }
    }
  } else {
    res.status(401);
    throw new Error('Invalid User');
  }
});

// @desc    GET all Pending Users     ///////////////////////////////////////////////
// @route   GET /api/users/pending
// @access  Private/Admin
exports.getPendingUsers = asyncHandler(async (req, res) => {
  const pendingUsers = await models.PendingRegister.findAll({
    where: { emailVerified: true, chapterId: req.user.chapterId },
  });
  res.json(pendingUsers);
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
      const users = await models.User.findAll();
      const member = await models.Member.create(
        {
          memberId: generateId(users),
          chapterId: req.user.chapterId,
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
          certificates: pendingUser.certificate,
          nextPaymentDueIn: new Date().getFullYear(),
        },
        { transaction: t }
      );

      // const user = await member.addUser(
      await models.User.create(
        {
          // userRole,
          chapterId: req.user.chapterId,
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
      await sendCongratulationsEmail({
        toUserEmail: member.primaryEmail,
        toUser: member.firstName,
      });
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
  const users = await models.User.findAll(
    { include: models.Member },
    {
      where: { chapterId: req.user.chapterId },
    }
  );
  if (users && users.length !== 0) {
    res.json(users);
  } else {
    res.status(404);
    throw new Error('No User');
  }
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

        profilePicture: req.body.image || user.profilePicture,
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
        profilePicture,
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
          profilePicture,
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

// @desc    Delete User     ///////////////////////////////////////////////
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
        chapterId: member.chapterId,
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

// @desc    DELETE Admin User      ///////////////////////////////////////////////
// @route   DELETE /api/users/:id/admin
// @access  Private/SystemAdmin
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

// @desc    Send Password Reset Email     ///////////////////////////////////////////////
// @route   POST /api/users/:email
// @access  Public
exports.sendPasswordResetEmail = asyncHandler(async (req, res) => {
  const { email } = req.params;

  const user = await models.User.findOne({ where: { email: email } });

  if (user) {
    console.log(user.email);
    // res.json(user);

    const token = passwordResetToken(user);
    const url = getPasswordResetURL(user, token);
    const emailTemplate = resetPasswordTemplate(user, url);
    console.log(token);
    const sendEmail = () => {
      transporter.sendMail(emailTemplate, (err, info) => {
        if (err) {
          res.status(500).json('Error sending email');
        }
        console.log(`** Email sent **`, info.response);
        res.json(
          'An email with the password reset link has been sent into your mailbox. Please check your email.'
        );
      });
    };
    sendEmail();
  } else {
    res.status(401);
    throw new Error('Invalid User / No user with that email');
  }
});

// @desc    Send Password Reset Email     ///////////////////////////////////////////////
// @route   POST /api/users/:userId/:token
// @access  Public
exports.receiveNewPassword = asyncHandler(async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const user = await models.User.findOne({ where: { memberId: id } });

  if (user) {
    // const matchToken = async function (token) {
    //   return await bcrypt.compare(token, this.password);
    // };

    // const tokenToVerify = passwordResetToken(user);
    // console.log(token);
    // console.log(tokenToVerify);
    const secret = user.password + '-' + user.updatedAt;
    // const secret2 = user.password + '-' + user.createdAt;
    try {
      const payload = await jwt.verify(token, secret);

      if (payload.id === user.memberId) {
        console.log('token verified');
        models.User.update(
          { password: bcrypt.hashSync(password, 10) },
          { where: { memberId: id } }
        )
          .then((updatedUser) => {
            if (updatedUser) {
              res.status(202).json('Password changed successfull');
            }
          })
          .catch((error) => {
            res.status(401);
            throw new Error(
              'Password change Unsuccessful. Please contact the admin'
            );
          });
      }
    } catch (error) {
      console.log(error);
      // res.json(error);
      res.status(404);
      throw new Error('Invalid Token: ' + error);
    }
    // await jwt
    //   .verify(token, secret)

    //   .then(
    //     (payload) => {
    //       if (payload.id === user.memberId) {
    //         console.log('token verified');
    //         models.User.update(
    //           { password: bcrypt.hashSync(password, 10) },
    //           { where: { memberId: id } }
    //         )
    //           .then((updatedUser) => {
    //             if (updatedUser) {
    //               res.status(202).json('Password changed successfull');
    //             }
    //           })
    //           .catch((error) => {
    //             res.status(401);
    //             throw new Error(
    //               'Password change Unsuccessful. Please contact the admin'
    //             );
    //           });
    //       }
    //     }
    //     // else {
    //     //   res.status(404);
    //     //   throw new Error('Invalid Token');
    //     // }
    //   )
    //   .catch((error) => {
    //     console.log(error);
    //     // res.json(error);
    //     res.status(404);
    //     throw new Error('Invalid Token' + error);
    //   });
    // const payloadToVerify = jwt.verify(tokenToVerify, secret);
    // console.log(payload);
    // console.log(payloadToVerify);
  } else {
    res.status(404);
    throw new Error('Invalid User / No user with that email');
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
    chapterId,
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
  } = req.body;
  // console.log(email);
  // const userrole = await modeks.User.findOne({ where: {userRole:}})
  const userExists = await models.Member.findOne({
    where: { primaryEmail: email },
  }); // Check if the Member already registered

  if (!userExists) {
    const t = await sequelize.transaction();
    // const users = await models.User.findAll();
    const systemAdminId = '11111';
    try {
      // Then, we do some calls passing this transaction as an option:

      const member = await models.Member.create(
        {
          chapterId,
          // memberId: generateId(users),
          memberId: systemAdminId,
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
          isPaid: true,
          nextPaymentDueIn: new Date().getFullYear(),
          // balance,
        },
        { transaction: t }
      );

      // await member.addUser(
      await models.User.create(
        {
          chapterId,
          userRole,
          memberId: member.memberId,
          userName: firstName + ' ' + lastName,
          email,
          // image: '/images/sample.jpg',
          // password: bcrypt.hashSync(password, 10),
          password: bcrypt.hashSync(password, 10),
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
