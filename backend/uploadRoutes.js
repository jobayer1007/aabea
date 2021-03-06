const express = require('express');
const path = require('path');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
	destination(req, file, cb) {
    cb(null, '/home/aabea/apps/aabea-app/uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
  // Experiment
  // filename(req, file, cb) {
  //   if (path.extname(file.originalname) === 'pdf') {
  //     cb(null, `${file.fieldname}-${Date.now()}.png`);
  //   } else {
  //     cb(
  //       null,
  //       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
  //     );
  //   }
  // },
});

// /jpg|png|gif|webp|tiff|psd|raw|bmp|heif|indd/

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif|webp|tiff|psd|raw|bmp|heif|indd|svg|pdf|jfif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images or pdf Only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post('/', upload.single('image'), (req, res) => {
	res.send(`/uploads/${req.file.filename}`);
  console.log(req.file.path);
});

module.exports = router;
