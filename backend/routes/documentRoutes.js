const express = require('express');
const router = express.Router();

const { protect, admin } = require('../middleware/authMiddleware');

const {
  getAllDocuments,
  addNewDocument,
  getDocumentById,
  deleteDocument,
} = require('../controllers/documentController');

router.route('/chapter/:checkChapter').get(getAllDocuments);
router.route('/new').post(protect, admin, addNewDocument);
router
  .route('/:id')
  .get(getDocumentById)
  .delete(protect, admin, deleteDocument);

module.exports = router;
