const express = require('express');
const router = express.Router();

const { protect, admin, systemAdmin } = require('../middleware/authMiddleware');

const {
  getAllEvents,
  createNewEvent,
  getEventById,
  deleteEvent,
  updateEvent,
  createNewEventContact,
  getEventContacts,
  getEventContactById,
  updateEventContactById,
  deleteEventContact,
  publishEvent,
  unPublishEvent,
  registerEventGuest,
  registerMemberCheck,
} = require('../controllers/eventController');

// Event Registration
router.route('/register').post(registerEventGuest);
router.route('/register/:memberId').get(registerMemberCheck);

router.route('/chapter/:checkChapter').get(getAllEvents);
router.route('/new').post(protect, admin, createNewEvent);
router
  .route('/:id')
  .get(getEventById)
  .put(protect, admin, updateEvent)
  .delete(protect, admin, deleteEvent);

// Publis Event
router.route('/publish/:id').put(protect, admin, publishEvent);
router.route('/unpublish/:id').put(protect, admin, unPublishEvent);

// Event Contact
router.route('/newContact/:id').post(protect, admin, createNewEventContact);
router.route('/contacts/:id').get(getEventContacts);

router
  .route('/contactby/:id')
  .get(getEventContactById)
  .put(protect, admin, updateEventContactById)
  .delete(protect, admin, deleteEventContact);

module.exports = router;
