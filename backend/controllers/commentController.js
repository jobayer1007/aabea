const asyncHandler = require('express-async-handler');
const models = require('../models/index');

///////////////////////////////////////////Comment////////////////////////////////////////////////

// @desc    Create a new Comment     /////////////////////////////////////////Announcement//////
// @route   POST /api/comment
// @access  Private
exports.createNewComment = asyncHandler(async (req, res) => {
  const { comment, blogId } = req.body;

  const user = await models.User.findOne({
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
