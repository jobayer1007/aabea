const Sequelize = require('sequelize');
const dotenv = require('dotenv');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { sendConfirmationEmail } = require('./mailer');
const User = require('../models/User');
const Member = require('../models/Member');
const models = require('../models/index');
const generateToken = require('../utils/generateToken');
const { generateId } = require('../utils/generateId');

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

// @desc    Create a new Event     ///////////////////////////////////////////////
// @route   POST /api/events/new
// @access  Private/Admin
exports.createNewEvent = asyncHandler(async (req, res) => {
  const {
    eventName,
    eventDescription,
    // eventStartDate,
    // eventEndDate,
    // eventStartTime,
    // eventEndTime,
    eventDate,
    eventAddress,
    adultFee,
    minorFee,
    cap,
  } = req.body;

  const events = await models.Event.findAll();
  const newEvent = await models.Event.create({
    eventId: generateId(events),
    eventName,
    eventDescription,
    eventDate,
    eventAddress,
    adultFee,
    minorFee,
    cap,
    createdBy: req.user.memberId,
    lastUpdatedBy: req.user.memberId,
    chapterId: req.user.chapterId,
  });
  if (newEvent) {
    res.json(newEvent);
  } else {
    res.status(400);
    throw new Error('Encountered problem while creating new Event');
  }
});

// @desc    GET all Events     ///////////////////////////////////////////////
// @route   GET /api/events
// @access  Public
exports.getAllEvents = asyncHandler(async (req, res) => {
  // Find Chapter
  const subDomain = 'bd.aabea.org'; // at dev only
  // const chapterName = 'Bangladesh';
  const chapter = await models.Chapter.findOne({
    where: { subDomain: subDomain },
  });
  // console.log(chapter.chapterId);

  if (chapter) {
    const events = await models.Event.findAll(
      { include: models.EventImageGallery },
      { include: models.EventContact },
      {
        where: { chapterId: chapter.chapterId },
      }
    );
    if (events && events.length !== 0) {
      res.json(events);
      // console.log(cMembers);
    } else {
      res.status(404);
      throw new Error('No Events');
    }
  } else {
    res.status(404);
    throw new Error('Invalid Chapter Domain');
  }
});

// @desc    Get a  Event by Id     ///////////////////////////////////////////////
// @route   GET /api/events/:id
// @access  Public
exports.getEventById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const event = await models.Event.findOne({
    where: { eventId: id },
    // include: models.EventImageGallery,
    include: models.EventContact,
  });
  // console.log(user.memberId);

  if (event) {
    res.json(event);
    // console.log(event);
  } else {
    res.status(401);
    throw new Error('Event not found');
  }
});

// @desc    Update Event by Id       ///////////////////////////////////////////////
// @route   PUT /api/events/:id
// @access  Private/Admin
exports.updateEvent = asyncHandler(async (req, res) => {
  const event = await models.Event.findOne({
    where: { eventId: req.params.id },
  });

  if (event) {
    const data = {
      eventName: req.body.eventName || event.eventName,
      eventDescription: req.body.eventDescription || event.eventDescription,
      eventDate: req.body.eventDate || event.eventDate,
      eventAddress: req.body.eventAddress || event.eventAddress,
      adultFee: req.body.adultFee || event.adultFee,
      minorFee: req.body.minorFee || event.minorFee,
      cap: req.body.minorFee || event.minorFee,
      lastUpdatedBy: req.user.memberId,
      chapterId: req.user.chapterId,
    };

    let {
      eventName,
      eventDescription,
      eventDate,
      eventAddress,
      adultFee,
      minorFee,
      cap,
      lastUpdatedBy,
      chapterId,
    } = data;
    const updatedEvent = await models.Event.update(
      {
        eventName,
        eventDescription,
        eventDate,
        eventAddress,
        adultFee,
        minorFee,
        cap,
        lastUpdatedBy,
        chapterId,
      },
      { where: { eventId: req.params.id } }
    );

    if (updatedEvent == 1) {
      res.json(updatedEvent);
    } else {
      res.send({ message: 'Event update unsuccessful' });
    }
  } else {
    res.status(401);
    throw new Error('Event not found');
  }
});

// @desc    Delete an Event by Id     /////////////////////////////////////////////// pending
// @route   DELETE /api/events/:id
// @access  Private/Admin
exports.deleteEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const event = await models.Event.findOne({
    where: { eventId: id },
  });

  if (event) {
    models.Event.destroy({
      where: { eventId: id },
    })
      .then((num) => {
        if (num == 1) {
          res.json('Event has been deleted successfully');
        } else {
          res.json('Cannot delete the Event');
        }
      })
      .catch((err) => console.log(err));
  } else {
    res.status(401);
    throw new Error('Event not found');
  }
});

// /////////////////////////////Event Contacts //////////////////////////////

// @desc    Create a new Event Contact     ///////////////////////////////////////////////
// @route   POST /api/events/newContact/:id
// @access  Private/Admin
exports.createNewEventContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { memberId, positionName, contactEmail, contactPhone } = req.body;

  const contactExists = await models.EventContact.findOne({
    where: {
      eventId: id,
      memberId: memberId,
    },
  });
  if (contactExists) {
    res.status(400);
    throw new Error(`Member already present in the Event Contact list`);
  } else {
    const member = await models.Member.findOne({
      where: { memberId: memberId },
    }); // Check if the memberId id valid

    if (member) {
      const newContact = await models.EventContact.create({
        eventId: id,
        memberId,
        positionName,
        contactName:
          member.mInit + ' ' + member.firstName + ' ' + member.lastName,
        contactEmail,
        contactPhone,
        createdBy: req.user.memberId,
        lastUpdatedBy: req.user.memberId,
        chapterId: req.user.chapterId,
      });
      if (newContact) {
        res.json(
          `New Contact as ${newContact.positionName} for the Event : ${newContact.eventId} has been set Successfully`
        );
      } else {
        res.status(400);
        throw new Error(
          'Encountered problem while creating new Contact for the event'
        );
      }
    } else {
      res.status(400);
      throw new Error('Invalid Member Reference!');
    }
  }
});

// @desc    GET all Event Contacts     ///////////////////////////////////////////////
// @route   GET /api/events/contacts/:id
// @access  Public
exports.getEventContacts = asyncHandler(async (req, res) => {
  const { id } = req.params;

  console.log(id);
  const event = await models.Event.findOne({
    where: { eventId: id },
  });

  if (event) {
    const contacts = await models.EventContact.findAll(
      // { include: models.Member },
      {
        where: { eventId: id },
      }
    );
    if (contacts && contacts.length !== 0) {
      res.json(contacts);
      // console.log(contacts);
    } else {
      res.status(404);
      throw new Error('No Contacts');
    }
  } else {
    res.status(404);
    throw new Error('Invalid Event Id!');
  }
});

// @desc    Get a  Event Contact by Id     ///////////////////////////////////////////////
// @route   GET /api/events/contactby/:id
// @access  Private
exports.getEventContactById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // console.log(id);
  const eContact = await models.EventContact.findOne({
    where: { eventContactId: id },
    include: models.Member,
  });
  // console.log(user.memberId);

  if (eContact) {
    res.json(eContact);
    // console.log(eContact);
  } else {
    res.status(401);
    throw new Error('Member not found');
  }
});

// @desc    Update Event Contact by Id       ///////////////////////////////////////////////
// @route   PUT /api/events/contactby/:id
// @access  Private/Admin || systemAdmin || Committee Member
exports.updateEventContactById = asyncHandler(async (req, res) => {
  const eContact = await models.EventContact.findOne({
    where: { eventContactId: req.params.id },
  });

  if (eContact) {
    const member = await models.Member.findOne({
      where: { memberId: req.body.memberId },
    });

    if (member) {
      const data = {
        memberId: req.body.memberId || eContact.memberId,
        positionName: req.body.positionName || eContact.positionName,
        contactName: member.mInit + member.firstName + member.lastName,
        contactEmail: req.body.contactEmail || eContact.contactEmail,
        contactPhone: req.body.contactPhone || eContact.contactPhone,
      };

      let {
        memberId,
        positionName,
        contactName,
        contactEmail,
        contactPhone,
      } = data;
      const updatedEContact = await models.EventContact.update(
        {
          memberId,
          positionName,
          contactName,
          contactEmail,
          contactPhone,
          lastUpdatedBy: req.user.memberId,
        },
        { where: { eventContactId: req.params.id } }
      );

      if (updatedEContact == 1) {
        res.json({ message: 'Event Contact updated successfully' });
      } else {
        res.send({ message: 'Event Contact update unsuccessful' });
      }
    } else {
      res.status(401);
      throw new Error('Invalid Member Reference');
    }
  } else {
    res.status(401);
    throw new Error('Event Contact not found');
  }
});

// @desc    Delete an Event Contact by Id     ///////////////////////////////////////////////
// @route   DELETE /api/events/contactby/:id
// @access  Private/Admin
exports.deleteEventContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const eContact = await models.EventContact.findOne({
    where: { eventContactId: id },
  });

  if (eContact) {
    models.EventContact.destroy({
      where: { eventContactId: id },
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

// /////////////////////////////Event Publish //////////////////////////////
// @desc    Publish Event by Id       ///////////////////////////////////////////////
// @route   PUT /api/events/publish/:id
// @access  Private/Admin
exports.publishEvent = asyncHandler(async (req, res) => {
  const event = await models.Event.findOne({
    where: { eventId: req.params.id },
  });

  if (event) {
    const updatedEvent = await models.Event.update(
      {
        eventStatus: true,
      },
      { where: { eventId: req.params.id } }
    );

    if (updatedEvent == 1) {
      res.json('Event published successfully');
    } else {
      res.send('Event publish unsuccessful');
    }
  } else {
    res.status(401);
    throw new Error('Event not found');
  }
});

// @desc    unPublish Event by Id       ///////////////////////////////////////////////
// @route   PUT /api/events/unpublish/:id
// @access  Private/Admin
exports.unPublishEvent = asyncHandler(async (req, res) => {
  const event = await models.Event.findOne({
    where: { eventId: req.params.id },
  });

  if (event) {
    const updatedEvent = await models.Event.update(
      {
        eventStatus: false,
      },
      { where: { eventId: req.params.id } }
    );

    if (updatedEvent == 1) {
      res.json('Event un-published successfully');
    } else {
      res.send('Event un-publish unsuccessful');
    }
  } else {
    res.status(401);
    throw new Error('Event not found');
  }
});

// /////////////////////////////Event Registration //////////////////////////////

// @desc    Register a new guest     ///////////////////////////////////////////////
// @route   POST /api/events/register
// @access  Public
exports.registerEventGuest = asyncHandler(async (req, res) => {
  const {
    eventId,
    eventName,
    mInit,
    firstName,
    lastName,
    isMember,
    memberId,
    email,
    phone,
    numberOfAdults,
    numberOfMinors,
    paymentResult,
  } = req.body;
  const event = await models.Event.findOne({
    where: { eventId: eventId, eventStatus: true },
  });

  if (event) {
    const member = await models.Member.findOne({
      where: { memberId: memberId },
    });
    if (member) {
      const t = await sequelize.transaction();

      try {
        const register = await models.EventRegistration.findAll();
        const guestRegister = await models.EventRegistration.create(
          {
            registrationId: generateId(register),
            eventId,
            eventName,
            mInit,
            firstName,
            lastName,
            isMember,
            memberId,
            email,
            phone,
            numberOfAdults,
            numberOfMinors,
            chapterId: event.chapterId,
          },
          { transaction: t }
        );

        await models.EventPayment.create(
          {
            eventId,
            registrationId: guestRegister.registrationId,
            amount: paymentResult.purchase_units[0].amount.value,
            payerId: paymentResult.payer.email_address,
            paymentId: paymentResult.id,
            paymentStatus: paymentResult.status,
            paymentTime: paymentResult.update_time,
            chapterId: event.chapterId,
          },
          { transaction: t }
        );

        await t.commit();
        res.send('Event Registration successful');
      } catch (error) {
        await t.rollback();
        res.status(400);
        throw new Error(
          'Something Went Wrong with event registration, Please contact the Administrator' +
            error
        );
      }
    } else {
      res.status(400);
      throw new Error('Invalid Member Reference');
    }
  } else {
    res.status(400);
    throw new Error('Event not found');
  }
});
