const asyncHandler = require('express-async-handler');
const models = require('../models/index');

///////////////////////////////////////////ANNOUNCEMENT////////////////////////////////////////////////

// @desc    Create a new Announcement     /////////////////////////////////////////Announcement//////
// @route   POST /api/announcement
// @access  Private/SystemAdmin || Admin
exports.createNewAnnouncement = asyncHandler(async (req, res) => {
  const { title, body, id } = req.body;

  const user = await models.User.findOne({ where: { memberId: id } });
  if (user) {
    const newAnnouncement = await models.Announcement.create({
      title,
      body,
      chapterId: user.chapterId,
      createdby: user.memberId,
    });
    if (newAnnouncement) {
      res.json('New Announcement Created Successfully');
    } else {
      res.status(400);
      throw new Error('Encountered problem while creating new Announcement');
    }
  } else {
    res.status(400);
    throw new Error('Encountered problem while creating new Announcements');
  }
});

// @desc    GET all Announcements     ///////////////////////////////////////////////
// @route   GET /api/announcements
// @access  Private/SystemAdmin || Admin
exports.getAnnouncements = asyncHandler(async (req, res) => {
  const announcements = await models.Announcement.findAll();
  res.json(announcements);
});

// @desc    Get an  announcement by Id     ///////////////////////////////////////////////
// @route   GET /api/announcements/:id
// @access  Private/Admin || SystemAdmin
exports.getAnnouncementById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const announcement = await models.Announcement.findOne({
    where: { announcementId: id },
  });

  if (announcement) {
    res.json(announcement);
  } else {
    res.status(401);
    throw new Error('Announcement not found');
  }
});

// @desc   Update an  announcement by Id      ///////////////////////////////////////////////
// @route   PUT /api/announcements/:id
// @access  Private/Admin || SystemAdmin
exports.updateAnnouncementById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const announcement = await models.Announcement.findOne({
    where: { announcementId: id },
  });

  if (announcement) {
    const data = {
      title: req.body.title || announcement.title,
      body: req.body.body || announcement.body,
    };

    let { title, body } = data;
    const updatedAnnouncement = await models.Announcement.update(
      {
        title,
        body,
      },
      { where: { announcementId: id } }
    );

    if (updatedAnnouncement == 1) {
      res.send('announcement update successful');
    } else {
      res.send('announcement update unsuccessful');
    }
  } else {
    res.status(401);
    throw new Error('announcement not found');
  }
});

// @desc    Delete an Announcement     /////////////////////////////////////////////// pending
// @route   DELETE /api/announcements/:id
// @access  Private/Admin
exports.deleteAnnouncement = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const announcement = await models.Announcement.findOne({
    where: { announcementId: id },
  });

  if (announcement) {
    models.Announcement.destroy({
      where: { announcementId: id },
    })
      .then((num) => {
        if (num == 1) {
          res.json('Announcement has been deleted successfully');
        } else {
          res.json('Cannot delete the Announcement');
        }
      })
      .catch((err) => console.log(err));
  } else {
    res.status(401);
    throw new Error('Announcement not found');
  }
});
