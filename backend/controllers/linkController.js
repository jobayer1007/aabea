const asyncHandler = require('express-async-handler');
const models = require('../models/index');

///////////////////////////////////////////ANNOUNCEMENT////////////////////////////////////////////////

// @desc    Create a new Link     /////////////////////////////////////////Announcement//////
// @route   POST /api/links/
// @access  Private/SystemAdmin || Admin
exports.createNewLink = asyncHandler(async (req, res) => {
  const { linkTitle, link } = req.body;

  const user = await models.User.findOne({
    where: { memberId: req.user.memberId },
  });
  if (user) {
    const newLink = await models.Link.create({
      linkTitle,
      link,
      chapterId: user.chapterId,
      createdby: user.memberId,
      lastUpdatedBy: user.memberId,
    });
    if (newLink) {
      res.json('New Link Created Successfully');
    } else {
      res.status(400);
      throw new Error('Encountered problem while creating new Link');
    }
  } else {
    res.status(400);
    throw new Error('Encountered problem while creating new Link` ');
  }
});

// @desc    GET all LINKS     ///////////////////////////////////////////////
// @route   GET /api/links/chapter/:checkChapter
// @access  Private/SystemAdmin || Admin
exports.getLinks = asyncHandler(async (req, res) => {
  // let subDomain;
  // if (process.env.NODE_ENV === 'development') {
  //   subDomain = 'bd'; // at dev only
  // } else {
  // }
  const { checkChapter } = req.params;
  const subDomain = checkChapter.split('.')[0];
  const chapter = await models.Chapter.findOne({
    where: { subDomain: subDomain },
  });

  if (chapter) {
    const links = await models.Link.findAll({
      where: { chapterId: chapter.chapterId },
    });

    if (links) {
      if (links && links.length !== 0) {
        res.json(links);
      } else {
        res.status(404);
        throw new Error('No Links');
      }
    } else {
      res.status(404);
      throw new Error('Invalid chapter reference!');
    }
  } else {
    res.status(401);
    throw new Error(`Invalid chapter reference: ${checkChapter}`);
  }
});

// @desc    Get an  link by Id     ///////////////////////////////////////////////
// @route   GET /api/links/:id
// @access  Private/Admin || SystemAdmin
exports.getLinkById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const link = await models.Link.findOne({
    where: { linkId: id },
  });

  if (link) {
    res.json(link);
  } else {
    res.status(401);
    throw new Error('Link not found');
  }
});

// @desc   Update a link by Id      ///////////////////////////////////////////////
// @route   PUT /api/links/:id
// @access  Private/Admin || SystemAdmin
exports.updateLinkById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const link = await models.Link.findOne({
    where: { linkId: id },
  });

  if (link) {
    const data = {
      linkTitle: req.body.linkTitle || link.linkTitle,
      link: req.body.link || link.link,
    };

    let { linkTitle, link } = data;
    const updateLink = await models.Link.update(
      {
        linkTitle,
        link,
        lastUpdatedBy: req.user.memberId,
      },
      { where: { linkId: id } }
    );

    if (updateLink == 1) {
      res.send('Link update successful');
    } else {
      res.send('Link update unsuccessful');
    }
  } else {
    res.status(401);
    throw new Error('Link not found');
  }
});

// @desc    Delete a Link     /////////////////////////////////////////////// pending
// @route   DELETE /api/links/:id
// @access  Private/Admin
exports.deleteLink = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const link = await models.Link.findOne({
    where: { linkId: id },
  });

  if (link) {
    models.Link.destroy({
      where: { linkId: id },
    })
      .then((num) => {
        if (num == 1) {
          res.json('Link has been deleted successfully');
        } else {
          res.json('Cannot delete the Link');
        }
      })
      .catch((err) => console.log(err));
  } else {
    res.status(401);
    throw new Error('Link not found');
  }
});
