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
router.route('/:id/publish').put(protect, admin, publishEvent);
router.route('/:id/unpublish').put(protect, admin, unPublishEvent);

// Event Contact
router.route('/:id/newContact').post(protect, admin, createNewEventContact);
router.route('/:id/contacts').post(getEventContacts);

router
  .route('/contacts/:id')
  .get(getEventContactById)
  .put(protect, admin, updateEventContactById)
  .delete(protect, admin, deleteEventContact);

// Event Registration
router.route('/register').post(registerEventGuest);

module.exports = router;
