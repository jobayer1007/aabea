const express = require('express');
const router = express.Router();
const {
  createNewHelpContact,
  getHelpContacts,
  getHelpContactById,
  updateHelpContactById,
  deleteHelpContact,
} = require('../controllers/helpContactController');
const { protect, admin } = require('../middleware/authMiddleware');

// Announcement/////////////////////////////////////////////////
router.route('/').post(protect, admin, createNewHelpContact);
router.route('/').get(getHelpContacts);
router
  .route('/:id')
  .get(getHelpContactById)
  .put(protect, admin, updateHelpContactById)
  .delete(protect, admin, deleteHelpContact);

module.exports = router;
