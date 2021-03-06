const express = require('express');
const router = express.Router();
const {
  createNewBlog,
  getBlogs,
  getBlogById,
  updateBlogById,
  deleteblog,
} = require('../controllers/blogController');
const { protect, admin } = require('../middleware/authMiddleware');

// Announcement/////////////////////////////////////////////////
router.route('/chapter/:checkChapter').get(getBlogs);
router.route('/').post(protect, createNewBlog);
router
  .route('/:id')
  .get(protect, getBlogById)
  .put(protect, updateBlogById)
  .delete(protect, deleteblog);

module.exports = router;
