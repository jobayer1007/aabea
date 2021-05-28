const express = require('express');
const router = express.Router();
const {
  createNewLink,
  getLinks,
  getLinkById,
  updateLinkById,
  deleteLink,
} = require('../controllers/linkController');
const { protect, admin } = require('../middleware/authMiddleware');

// Announcement/////////////////////////////////////////////////
router.route('/').post(protect, admin, createNewLink);
router.route('/').get(getLinks);
router
  .route('/:id')
  .get(getLinkById)
  .put(protect, admin, updateLinkById)
  .delete(protect, admin, deleteLink);

module.exports = router;
