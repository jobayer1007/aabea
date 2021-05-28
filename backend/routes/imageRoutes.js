const express = require('express');
const router = express.Router();

const { protect, admin } = require('../middleware/authMiddleware');

const {
  getAllImages,
  addNewImage,
  deleteImage,
  getImageById,
  getAllNavbarImages,
  getAllHomeScreenImages,
  getAllImagesByEvent,
} = require('../controllers/imageController');

router.route('/').get(getAllImages);
router.route('/navbar').get(getAllNavbarImages);
router.route('/homeScreen').get(getAllHomeScreenImages);
router.route('/event').get(getAllImagesByEvent);
router.route('/new').post(protect, admin, addNewImage);
router.route('/:id').get(getImageById).delete(protect, admin, deleteImage);

module.exports = router;
