const express = require('express');
const router = express.Router();
const {
  createNewHelpContact,
  getHelpContacts,
  getHelpContactById,
  updateHelpContactById,
  deleteHelpContact,
} = require('../controllers/helpController');
const { protect, admin } = require('../middleware/authMiddleware');

// Help Contacts/////////////////////////////////////////////////
router.route('/chapter/:checkChapter').get(getHelpContacts);
router
  .route('/:id')
  .get(getHelpContactById)
  .put(protect, admin, updateHelpContactById)
  .delete(protect, admin, deleteHelpContact);
router.route('/').post(protect, admin, createNewHelpContact);

module.exports = router;
