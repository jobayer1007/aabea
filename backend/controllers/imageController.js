const dotenv = require('dotenv');
dotenv.config();
const asyncHandler = require('express-async-handler');
const models = require('../models/index');

// @desc    Add a new Image     ///////////////////////////////////////////////
// @route   POST /api/image/new
// @access  Private/SystemAdmin || admin
exports.addNewImage = asyncHandler(async (req, res) => {
  const { imageName, imageDescription, imageLink, image } = req.body;

  const newImage = await models.ImageLibrary.create({
    imageName,
    imageDescription,
    imageLink,
    image,
    createdBy: req.user.memberId,
    lastUpdatedBy: req.user.memberId,
    chapterId: req.user.chapterId,
  });
  if (newImage) {
    res.json(`New Image Added Successfully`);
  } else {
    res.status(400);
    throw new Error('Encountered problem while adding new image');
  }
});

// @desc    GET all Images     ///////////////////////////////////////////////
// @route   GET /api/image
// @access  Public
exports.getAllImages = asyncHandler(async (req, res) => {
  // Find Chapter
  const subDomain = 'bd.aabea.org'; // at dev only
  // const chapterName = 'Bangladesh';
  const chapter = await models.Chapter.findOne({
    where: { subDomain: subDomain },
  });
  console.log('chapter.chapterId:' + chapter.chapterId);

  if (chapter) {
    const images = await models.ImageLibrary.findAll({
      where: { chapterId: chapter.chapterId },
    });
    if (images && images.length !== 0) {
      res.json(images);
    } else {
      res.status(404);
      throw new Error('No image');
    }
  } else {
    res.status(404);
    throw new Error('Invalid Chapter Domain');
  }
});

// @desc    GET all Navbar Images     ///////////////////////////////////////////////
// @route   GET /api/image/navbar
// @access  Public
exports.getAllNavbarImages = asyncHandler(async (req, res) => {
  // Find Chapter
  const subDomain = 'bd.aabea.org'; // at dev only
  // const chapterName = 'Bangladesh';
  const chapter = await models.Chapter.findOne({
    where: { subDomain: subDomain },
  });
  // console.log(chapter.chapterId);

  if (chapter) {
    const images = await models.ImageLibrary.findAll({
      where: { chapterId: chapter.chapterId, imageName: 'navbarImage' },
    });
    if (images && images.length !== 0) {
      res.json(images);
    } else {
      res.status(404);
      throw new Error('No image');
    }
  } else {
    res.status(404);
    throw new Error('Invalid Chapter Domain');
  }
});

// @desc    GET all Navbar Images     ///////////////////////////////////////////////
// @route   GET /api/image/homeScreen
// @access  Public
exports.getAllHomeScreenImages = asyncHandler(async (req, res) => {
  // Find Chapter
  const subDomain = 'bd.aabea.org'; // at dev only
  // const chapterName = 'Bangladesh';
  const chapter = await models.Chapter.findOne({
    where: { subDomain: subDomain },
  });
  // console.log(chapter.chapterId);

  if (chapter) {
    const images = await models.ImageLibrary.findAll({
      where: { chapterId: chapter.chapterId, imageName: 'homeScreenImage' },
    });
    if (images && images.length !== 0) {
      res.json(images);
    } else {
      res.status(404);
      throw new Error('No image');
    }
  } else {
    res.status(404);
    throw new Error('Invalid Chapter Domain');
  }
});

// @desc    Get Image by Id     ///////////////////////////////////////////////
// @route   GET /api/image/:id
// @access  Private/Admin || SystemAdmin
exports.getImageById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const image = await models.ImageLibrary.findOne({
    where: { imageId: id },
  });

  if (image) {
    res.json(image);
  } else {
    res.status(401);
    throw new Error('image not found');
  }
});

// @desc    Delete an image by Id     /////////////////////////////////////////////// pending
// @route   DELETE /api/image/:id
// @access  Private/Admin
exports.deleteImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const image = await models.ImageLibrary.findOne({
    where: { imageId: id },
  });

  if (image) {
    models.ImageLibrary.destroy({
      where: { imageId: id },
    })
      .then((num) => {
        if (num == 1) {
          res.json('The Image has been deleted successfully');
        } else {
          res.json('Cannot delete the image');
        }
      })
      .catch((err) => console.log(err));
  } else {
    res.status(401);
    throw new Error('Image was not found');
  }
});
