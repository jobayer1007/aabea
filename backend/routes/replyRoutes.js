const express = require('express');
const router = express.Router();
const {
  createNewReply,
  updateReplyById,
  deleteReply,
} = require('../controllers/replyController');
const { protect, admin } = require('../middleware/authMiddleware');

// Announcement/////////////////////////////////////////////////
router.route('/').post(protect, createNewReply);
// router.route('/').get(getReplys);
router
  .route('/:id')
  // .get(protect, getReplyById)
  .put(protect, updateReplyById)
  .delete(protect, deleteReply);

module.exports = router;
