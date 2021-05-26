const express = require('express');
const router = express.Router();
const {
  createNewComment,
  updateCommentById,
  deleteComment,
} = require('../controllers/commentController');
const { protect, admin } = require('../middleware/authMiddleware');

// Announcement/////////////////////////////////////////////////
router.route('/').post(protect, createNewComment);
// router.route('/').get(getComments);
router
  .route('/:id')
  // .get(protect, getCommentById)
  .put(protect, updateCommentById)
  .delete(protect, deleteComment);

module.exports = router;
