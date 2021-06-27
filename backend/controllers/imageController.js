const dotenv = require('dotenv');
dotenv.config();
const Sequelize = require('sequelize');

const asyncHandler = require('express-async-handler');
const models = require('../models/index');
const { Event, EventImageGallery } = require('../models/index');

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
  const { imageName, imageDescription, eventId, image, checkChapter } =
    req.body;

  // Find Chapter
  let subDomain;
  if (process.env.NODE_ENV === 'development') {
    subDomain = 'bd'; // at dev only
  } else {
    subDomain = checkChapter.split('.')[0];
  }
  // const subDomain = checkChapter.split('.')[0];

  const chapter = await models.Chapter.findOne({
    where: { subDomain: subDomain },
  });

  if (chapter) {
    const event = await models.Event.findOne({ where: { eventId: eventId } });
    if (event) {
      const t = await sequelize.transaction();

      try {
        const ImageLibrary = await models.ImageLibrary.create(
          {
            imageName,
            imageDescription,
            eventId,
            image,
            createdBy: req.user.memberId,
            lastUpdatedBy: req.user.memberId,
            chapterId: chapter.chapterId,
          },
          { transaction: t }
        );

        await models.EventImageGallery.create(
          {
            imageId: ImageLibrary.imageId,
            eventId: eventId,
            imageDescription: imageDescription,
            image: image,
            createdBy: req.user.memberId,
            lastUpdatedBy: req.user.memberId,
            chapterId: chapter.chapterId,
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
        chapterId: chapter.chapterId,
      });
      if (newImage) {
        res.json(`New Image Added Successfully`);
      } else {
        res.status(400);
        throw new Error('Encountered problem while adding new image');
      }
    }
  } else {
    res.status(404);
    throw new Error('Invalid Chapter Domain: ' + checkChapter);
  }
});

// @desc    GET all Images     ///////////////////////////////////////////////
// @route   GET /api/image/chapter/:checkChapter
// @access  Public
exports.getAllImages = asyncHandler(async (req, res) => {
  // Find Chapter
  let subDomain;
  if (process.env.NODE_ENV === 'development') {
    subDomain = 'bd'; // at dev only
  } else {
    subDomain = checkChapter.split('.')[0];
  }
  const { checkChapter } = req.params;
  // const subDomain = checkChapter.split('.')[0];

  const chapter = await models.Chapter.findOne({
    where: { subDomain: subDomain },
  });

  if (chapter) {
    const images = await models.ImageLibrary.findAll({
      // include: models.Event,
      // include: { model: Event, include: EventImageGallery },
      where: { chapterId: chapter.chapterId },
      order: [['createdAt', 'DESC']],
    });
    if (images && images.length !== 0) {
      res.json(images);
    } else {
      res.status(404);
      throw new Error('No image');
    }
  } else {
    res.status(404);
    throw new Error('Invalid Chapter Domain: ' + checkChapter);
  }
});

// @desc    GET all Navbar Images     ///////////////////////////////////////////////
// @route   GET /api/image/navbar/chapter/:checkChapter
// @access  Public
exports.getAllNavbarImages = asyncHandler(async (req, res) => {
  // Find Chapter
  let subDomain;
  if (process.env.NODE_ENV === 'development') {
    subDomain = 'bd'; // at dev only
  } else {
    subDomain = checkChapter.split('.')[0];
  }
  const { checkChapter } = req.params;
  // const subDomain = checkChapter.split('.')[0];

  const chapter = await models.Chapter.findOne({
    where: { subDomain: subDomain },
  });

  if (chapter) {
    const images = await models.ImageLibrary.findAll({
      where: { chapterId: chapter.chapterId, imageName: 'navbarImage' },
      order: [['createdAt', 'DESC']],
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
// @route   GET /api/image/homeScreen/chapter/:checkChapter
// @access  Public
exports.getAllHomeScreenImages = asyncHandler(async (req, res) => {
  // Find Chapter
  let subDomain;
  if (process.env.NODE_ENV === 'development') {
    subDomain = 'bd'; // at dev only
  } else {
    subDomain = checkChapter.split('.')[0];
  }
  const { checkChapter } = req.params;
  // const subDomain = checkChapter.split('.')[0];

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
// @route   GET /api/image/event/chapter/:checkChapter
// @access  Public
exports.getAllImagesByEvent = asyncHandler(async (req, res) => {
  // Find Chapter
  let subDomain;
  if (process.env.NODE_ENV === 'development') {
    subDomain = 'bd'; // at dev only
  } else {
    subDomain = checkChapter.split('.')[0];
  }
  const { checkChapter } = req.params;
  // const subDomain = checkChapter.split('.')[0];

  const chapter = await models.Chapter.findOne({
    where: { subDomain: subDomain },
  });

  if (chapter) {
    // const eventGallery = await models.Event.findAll({
    //   where: { chapterId: chapter.chapterId },
    //   include: [
    //     {
    //       model: EventImageGallery,
    //     },
    //   ],
    // });

    const eventGallery = await models.Event.findAll({
      include: models.EventImageGallery,
      where: { chapterId: chapter.chapterId },
      order: [['createdAt', 'DESC']],
    });
    if (eventGallery && eventGallery.length !== 0) {
      res.json(eventGallery);
    } else {
      res.status(404);
      throw new Error('No image');
    }
  } else {
    res.status(404);
    throw new Error('Invalid Chapter Domain: ' + checkChapter);
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
    const imageEvent = await models.EventImageGallery.findOne({
      where: { imageId: id },
    });

    if (imageEvent) {
      const t = await sequelize.transaction();

      try {
        models.EventImageGallery.destroy(
          {
            where: { imageId: id },
          },
          { transaction: t }
        );

        models.ImageLibrary.destroy(
          {
            where: { imageId: id },
          },
          { transaction: t }
        );
        await t.commit();
        res.json('The Image has been deleted successfully');
      } catch (error) {
        await t.rollback();
        res.status(401);
        throw new Error(
          'Encountered problem while deleting the image' + ' ' + error
        );
      }
    } else {
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
    }
  } else {
    res.status(401);
    throw new Error('Image was not found');
  }
});
