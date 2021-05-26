const express = require('express');
const router = express.Router();
const {
  createNewCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategory,
} = require('../controllers/categoryController');
const { protect, admin } = require('../middleware/authMiddleware');

// Announcement/////////////////////////////////////////////////
router.route('/').post(protect, admin, createNewCategory);
router.route('/').get(getCategories);
router
  .route('/:id')
  .get(getCategoryById)
  .put(protect, admin, updateCategoryById)
  .delete(protect, admin, deleteCategory);

module.exports = router;
