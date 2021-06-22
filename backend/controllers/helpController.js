const asyncHandler = require('express-async-handler');
const models = require('../models/index');

// /////////////////////////////Help Contacts //////////////////////////////

// @desc    Create a new Help Contact     ///////////////////////////////////////////////
// @route   POST /api/helps/
// @access  Private/Admin
exports.createNewHelpContact = asyncHandler(async (req, res) => {
  const { memberId, helpFor, contactEmail, contactPhone, isTrue } = req.body;

  const contactExists = await models.HelpContact.findOne({
    where: {
      memberId: memberId,
    },
  });
  if (contactExists) {
    res.status(400);
    throw new Error(`Member already present in the help contact list`);
  } else {
    const member = await models.Member.findOne({
      where: { memberId: memberId },
    }); // Check if the memberId id valid

    if (member) {
      const newContact = await models.HelpContact.create({
        memberId,
        helpFor,
        contactName:
          member.mInit + ' ' + member.firstName + ' ' + member.lastName,
        contactEmail,
        contactPhone,
        profilePicture: member.profilePicture,
        isTrue,
        createdBy: req.user.memberId,
        lastUpdatedBy: req.user.memberId,
        chapterId: req.user.chapterId,
      });
      if (newContact) {
        res.json(`New Contact has been set successfully`);
      } else {
        res.status(400);
        throw new Error('Encountered problem while creating new Contact');
      }
    } else {
      res.status(400);
      throw new Error('Invalid Member Reference!');
    }
  }
});

// @desc    GET all Help Contacts     ///////////////////////////////////////////////
// @route   GET /api/helps/chapter/:checkChapter
// @access  Public
exports.getHelpContacts = asyncHandler(async (req, res) => {
  let subDomain;
  if (process.env.NODE_ENV === 'development') {
    subDomain = 'bd'; // at dev only
  } else {
    subDomain = checkChapter.split('.')[0];
  }
  const { checkChapter } = req.params;
  // const subDomain = checkChapter.split('.')[0];

  const chapter = await models.Chapter.findOne({
    where: { subDomain: subDomain },
  });

  if (chapter) {
    const helpContacts = await models.HelpContact.findAll({
      where: { chapterId: chapter.chapterId },
    });

    if (helpContacts) {
      if (helpContacts) {
        res.json(helpContacts);
        // console.log(contacts);
      } else {
        res.status(404);
        throw new Error('No Contacts');
      }
    } else {
      res.status(404);
      throw new Error('Invalid chapter reference! :' + checkChapter);
    }
  } else {
    res.status(401);
    throw new Error(`Invalid chapter reference: ${checkChapter}`);
  }
});

// @desc    Get a  Help Contact by Id     ///////////////////////////////////////////////
// @route   GET /api/helps/:id
// @access  Private
exports.getHelpContactById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // console.log(id);
  const helpContact = await models.HelpContact.findOne({
    where: { helpContactId: id },
  });
  // console.log(user.memberId);

  if (helpContact) {
    res.json(helpContact);
    // console.log(eContact);
  } else {
    res.status(401);
    throw new Error('Contact not found');
  }
});

// @desc    Update Help Contact by Id       ///////////////////////////////////////////////
// @route   PUT /api/Helps/:id
// @access  Private/Admin || systemAdmin || Committee Member
exports.updateHelpContactById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const helpContact = await models.HelpContact.findOne({
    where: { helpContactId: id },
  });

  if (helpContact) {
    const member = await models.Member.findOne({
      where: { memberId: req.body.memberId },
    });

    if (member) {
      const data = {
        memberId: req.body.memberId || helpContact.memberId,
        helpFor: req.body.helpFor || helpContact.helpFor,
        contactName:
          member.mInit + ' ' + member.firstName + ' ' + member.lastName,
        contactEmail: req.body.contactEmail || helpContact.contactEmail,
        contactPhone: req.body.contactPhone || helpContact.contactPhone,
        profilePicture: member.profilePicture || helpContact.profilePicture,
        isTrue: req.body.isTrue || helpContact.isTrue,
      };

      let {
        memberId,
        helpFor,
        contactName,
        contactEmail,
        contactPhone,
        profilePicture,
        isTrue,
      } = data;
      const updatedHelpContact = await models.HelpContact.update(
        {
          memberId,
          helpFor,
          contactName,
          contactEmail,
          contactPhone,
          profilePicture,
          isTrue,
          lastUpdatedBy: req.user.memberId,
        },
        { where: { helpContactId: req.params.id } }
      );

      if (updatedHelpContact == 1) {
        res.json({ message: 'Help Contact updated successfully' });
      } else {
        res.send({ message: 'Help Contact update unsuccessful' });
      }
    } else {
      res.status(404);
      throw new Error('Invalid Member Reference');
    }
  } else {
    res.status(404);
    throw new Error('Help Contact not found');
  }
});

// @desc    Delete a help Contact by Id     ///////////////////////////////////////////////
// @route   DELETE /api/helps/:id
// @access  Private/Admin
exports.deleteHelpContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const helpContact = await models.HelpContact.findOne({
    where: { helpContactId: id },
  });

  if (helpContact) {
    models.HelpContact.destroy({
      where: { helpContactId: id },
    })
      .then((num) => {
        if (num == 1) {
          res.json('Contact has been deleted successfully');
        } else {
          res.json('Cannot delete the Contact');
        }
      })
      .catch((err) => console.log(err));
  } else {
    res.status(401);
    throw new Error('Contact not found');
  }
});
