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
} = require('../controllers/eventController');

router.route('/').get(getAllEvents);
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

// Event Registration
router.route('/register').post(registerEventGuest);

module.exports = router;
