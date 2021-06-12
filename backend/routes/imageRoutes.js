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

router.route('/chapter/:checkChapter').get(getAllImages);
// router.route('/chapter/:checkChapter').get(getAllImagesByEvent);
router.route('/navbar/chapter/:checkChapter').get(getAllNavbarImages);
router.route('/homeScreen/chapter/:checkChapter').get(getAllHomeScreenImages);
router.route('/event/chapter/:checkChapter').get(getAllImagesByEvent);
router.route('/new').post(protect, admin, addNewImage);
router.route('/:id').get(getImageById).delete(protect, admin, deleteImage);

module.exports = router;
