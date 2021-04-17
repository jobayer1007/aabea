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

// @desc    Create a new Committee member     ///////////////////////////////////////////////
// @route   POST /api/committee/new
// @access  Private/SystemAdmin || admin
exports.createNewCommitteeMember = asyncHandler(async (req, res) => {
  const { memberId, position, period, bio } = req.body;
  const tenure1 = [new Date(period[0]), new Date(period[1])];

  console.log(period);
  console.log(memberId);
  console.log(position);
  console.log(bio);
  console.log(tenure1);
  // Look for the member's existence in the committee table for the given tenure
  const memberExists = await models.Committee.findOne({
    where: {
      memberId: memberId,
      tenure: { [Sequelize.Op.contains]: [period[0], period[1]] },
    },
  });

  if (memberExists) {
    res.status(400);
    throw new Error(
      `Member already present in the committee list for the given tenure as: ${memberExists.position} `
    );
  } else {
    const member = await models.Member.findOne({
      where: { memberId: memberId },
    }); // Check if the memberId id valid

    if (member) {
      const newCMember = await models.Committee.create({
        memberId,
        position,
        tenure: period,
        bio,
        chapterId: req.user.chapterId,
      });
      if (newCMember) {
        res.json(
          `New Committee Member as ${newCMember.position} for the tenure: ${newCMember.tenure} has been set Successfully`
        );
      } else {
        res.status(400);
        throw new Error(
          'Encountered problem while creating new committee Member'
        );
      }
    } else {
      res.status(400);
      throw new Error('Invalid Member Reference!');
    }
  }
});

// @desc    GET all committee member     ///////////////////////////////////////////////
// @route   GET /api/committee
// @access  Private/Admin
exports.getCommitteeMembers = asyncHandler(async (req, res) => {
  // Find Chapter
  const subDomain = 'bd.aabea.org'; // at dev only
  // const chapterName = 'Bangladesh';
  const chapter = await models.Chapter.findOne({
    where: { subDomain: subDomain },
  });
  // console.log(chapter.chapterId);

  if (chapter) {
    const cMembers = await models.Committee.findAll(
      { include: models.Member },
      {
        where: { chapterId: chapter.chapterId },
      }
    );
    if (cMembers && cMembers.length !== 0) {
      res.json(cMembers);
      // console.log(cMembers);
    } else {
      res.status(404);
      throw new Error('No Committee');
    }
  } else {
    res.status(404);
    throw new Error('Invalid Chapter Domain');
  }
});

// @desc    Get a  committee member by Id     ///////////////////////////////////////////////
// @route   GET /api/committee/:id
// @access  Private
exports.getCommitteeMemberById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const cMember = await models.Committee.findOne({
    where: { cId: id },
    include: models.Member,
  });
  // console.log(user.memberId);

  if (cMember) {
    res.json(cMember);
    console.log(cMember);
  } else {
    res.status(401);
    throw new Error('Member not found');
  }
});

// @desc    Update committee member by Id       ///////////////////////////////////////////////
// @route   PUT /api/committee/:id
// @access  Private/Admin || systemAdmin || Committee Member
exports.updateCommitteeMember = asyncHandler(async (req, res) => {
  const cMember = await models.Committee.findOne({
    where: { cId: req.params.id },
  });

  if (cMember) {
    const member = await models.Member.findOne({
      where: { memberId: req.body.cMemberId },
    });

    if (member) {
      const data = {
        memberId: req.body.cMemberId || cMember.memberId,
        position: req.body.position || cMember.position,
        tenure: req.body.period || cMember.tenure,
        bio: req.body.bio || cMember.bio,
      };

      let { memberId, position, tenure, bio } = data;
      const updatedCMember = await models.Committee.update(
        {
          memberId,
          position,
          tenure,
          bio,
        },
        { where: { cId: req.params.id } }
      );

      if (updatedCMember == 1) {
        res.json({ message: 'Committee Member updated successfully' });
      } else {
        res.send({ message: 'Committee Member update unsuccessful' });
      }
    } else {
      res.status(401);
      throw new Error('Invalid Member Reference');
    }
  } else {
    res.status(401);
    throw new Error('Committee Member not found');
  }
});

// @desc    Delete a committee member by Id     /////////////////////////////////////////////// pending
// @route   DELETE /api/committee/:id
// @access  Private/Admin
exports.deleteCommitteeMember = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const cMember = await models.Committee.findOne({
    where: { cId: id },
  });

  if (cMember) {
    models.Committee.destroy({
      where: { cId: id },
    })
      .then((num) => {
        if (num == 1) {
          res.json('Committee Member has been deleted successfully');
        } else {
          res.json('Cannot delete the Committee Member');
        }
      })
      .catch((err) => console.log(err));
  } else {
    res.status(401);
    throw new Error('Committee Member not found');
  }
});
