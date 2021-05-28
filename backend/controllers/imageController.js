const dotenv = require('dotenv');
dotenv.config();
const Sequelize = require('sequelize');

const asyncHandler = require('express-async-handler');
const models = require('../models/index');

const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// @desc    Add a new Image     ///////////////////////////////////////////////
// @route   POST /api/image/new
// @access  Private/SystemAdmin || admin
exports.addNewImage = asyncHandler(async (req, res) => {
  const { imageName, imageDescription, eventId, image } = req.body;

  const event = await models.Event.findOne({ where: { eventId: eventId } });
  if (event) {
    const t = await sequelize.transaction();

    try {
      await models.EventImageGallery.create(
        {
          eventId: eventId,
          imageDescription: imageDescription,
          image: image,
          createdBy: req.user.memberId,
          lastUpdatedBy: req.user.memberId,
          chapterId: req.user.chapterId,
        },
        { transaction: t }
      );

      await models.ImageLibrary.create(
        {
          imageName,
          imageDescription,
          eventId,
          image,
          createdBy: req.user.memberId,
          lastUpdatedBy: req.user.memberId,
          chapterId: req.user.chapterId,
        },
        { transaction: t }
      );

      await t.commit();
      res.json(`New Image Added Successfully`);
    } catch (error) {
      await t.rollback();
      res.status(400);
      throw new Error(
        'Encountered problem while adding new image' + ' ' + error
      );
    }
  } else {
    const newImage = await models.ImageLibrary.create({
      imageName,
      imageDescription,
      eventId,
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
  }
});

// @desc    GET all Images     ///////////////////////////////////////////////
// @route   GET /api/image
// @access  Public
exports.getAllImages = asyncHandler(async (req, res) => {
  // Find Chapter
  let subDomain;
  if (process.env.NODE_ENV === 'development') {
    subDomain = 'bd'; // at dev only
  } else {
    subDomain = req.body.subDomain;
  }
  console.log(subDomain);
  const chapter = await models.Chapter.findOne({
    where: { subDomain: subDomain },
  });

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
  let subDomain;
  if (process.env.NODE_ENV === 'development') {
    subDomain = 'bd'; // at dev only
  } else {
    subDomain = req.body.subDomain;
  }
  console.log(subDomain);
  const chapter = await models.Chapter.findOne({
    where: { subDomain: subDomain },
  });

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
  let subDomain;
  if (process.env.NODE_ENV === 'development') {
    subDomain = 'bd'; // at dev only
  } else {
    subDomain = req.body.subDomain;
  }
  console.log(subDomain);
  const chapter = await models.Chapter.findOne({
    where: { subDomain: subDomain },
  });

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

// @desc    GET all Images by Event     ///////////////////////////////////////////////
// @route   GET /api/image/event
// @access  Public
exports.getAllImagesByEvent = asyncHandler(async (req, res) => {
  // Find Chapter
  let subDomain;
  if (process.env.NODE_ENV === 'development') {
    subDomain = 'bd'; // at dev only
  } else {
    subDomain = req.body.subDomain;
  }
  console.log(subDomain);
  const chapter = await models.Chapter.findOne({
    where: { subDomain: subDomain },
  });

  if (chapter) {
    const eventGallery = await models.Event.findAll({
      where: { chapterId: chapter.chapterId },
      include: [
        {
          model: EventImageGallery,
        },
      ],
    });
    if (eventGallery && eventGallery.length !== 0) {
      res.json(eventGallery);
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
