const express = require('express');
const router = express.Router();

const { protect, admin } = require('../middleware/authMiddleware');

const {
  getAllImages,
  addNewImage,
  deleteImage,
} = require('../controllers/imageController');

router.route('/').get(getAllImages);
router.route('/new').post(protect, admin, addNewImage);
router.route('/:id').delete(protect, admin, deleteImage);

module.exports = router;
