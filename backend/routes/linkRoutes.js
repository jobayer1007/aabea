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

// Links/////////////////////////////////////////////////
router.route('/chapter/:checkChapter').get(getLinks);
router
  .route('/:id')
  .get(getLinkById)
  .put(protect, admin, updateLinkById)
  .delete(protect, admin, deleteLink);
router.route('/').post(protect, admin, createNewLink);

module.exports = router;
