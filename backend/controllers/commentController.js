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

///////////////////////////////////////////Comment////////////////////////////////////////////////

// @desc    Create a new Comment     /////////////////////////////////////////Announcement//////
// @route   POST /api/comment
// @access  Private
exports.createNewComment = asyncHandler(async (req, res) => {
  const { comment, blogId } = req.body;

  const user = await models.Member.findOne({
    where: { memberId: req.user.memberId },
  });
  if (user) {
    const blog = await models.Blog.findOne({
      where: { blogId: blogId },
    });
    if (blog) {
      const newComment = await models.Comment.create({
        comment,
        userId: user.memberId,
        userName: user.firstName + ' ' + user.lastName,
        profilePicture: user.profilePicture,
        chapterId: user.chapterId,
        blogId,
      });
      if (newComment) {
        res.json('New Comment Created Successfully');
      } else {
        res.status(400);
        throw new Error('Encountered problem while creating new Comment');
      }
    } else {
      res.status(404);
      throw new Error('Blog not found');
    }
  } else {
    res.status(404);
    throw new Error('Invalid user');
  }
});

// @desc   Update a comment by Id      ///////////////////////////////////////////////
// @route   PUT /api/comment/:id
// @access  Private
exports.updateCommentById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const comment = await models.Comment.findOne({
    where: { commentId: id },
  });

  if (comment) {
    const data = {
      comment: req.body.comment || comment.comment,
    };

    let { comment } = data;
    const updatedComment = await models.Comment.update(
      {
        comment,
      },
      { where: { commentId: id } }
    );

    if (updatedComment == 1) {
      res.send('Comment update successful');
    } else {
      res.send('Comment update unsuccessful');
    }
  } else {
    res.status(401);
    throw new Error('Comment not found');
  }
});

// @desc    Delete a Comment     /////////////////////////////////////////////// pending
// @route   DELETE /api/comment/:id
// @access  Private
exports.deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const comment = await models.Comment.findOne({
    where: { commentId: id },
  });

  if (comment) {
    const t = await sequelize.transaction();

    try {
      models.Reply.destroy(
        {
          where: { commentId: id },
        },
        { transaction: t }
      );

      models.Comment.destroy(
        {
          where: { commentId: id },
        },
        { transaction: t }
      );

      await t.commit();
      res.send('Comment deleted successfully');
    } catch (error) {
      await t.rollback();
      res.status(400);
      throw new Error(
        'Something Went Wrong, Please contact the Administrator' + error
      );
    }
    models.Comment.destroy({
      where: { commentId: id },
    })
      .then((num) => {
        if (num == 1) {
          res.json('Comment has been deleted successfully');
        } else {
          res.json('Cannot delete the Comment');
        }
      })
      .catch((err) => console.log(err));
  } else {
    res.status(401);
    throw new Error('Comment not found');
  }
});
