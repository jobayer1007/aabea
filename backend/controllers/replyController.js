const asyncHandler = require('express-async-handler');
const models = require('../models/index');

///////////////////////////////////////////Reply////////////////////////////////////////////////

// @desc    Create a new Reply     /////////////////////////////////////////Announcement//////
// @route   POST /api/reply
// @access  Private
exports.createNewReply = asyncHandler(async (req, res) => {
  const { reply, commentId, blogId } = req.body;

  const user = await models.User.findOne({
    where: { memberId: req.user.memberId },
  });
  if (user) {
    const blog = await models.Blog.findOne({
      where: { blogId: blogId },
    });
    if (blog) {
      const comment = await models.Comment.findOne({
        where: { commentId: commentId },
      });

      if (comment) {
        const newReply = await models.Reply.create({
          reply,
          userId: user.memberId,
          chapterId: user.chapterId,
          blogId,
          commentId,
        });
        if (newReply) {
          res.json('New Reply Created Successfully');
        } else {
          res.status(400);
          throw new Error('Encountered problem while creating new Reply');
        }
      } else {
        res.status(404);
        throw new Error('Comment not found');
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

// @desc   Update a reply by Id      ///////////////////////////////////////////////
// @route   PUT /api/reply/:id
// @access  Private
exports.updateReplyById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const reply = await models.Comment.findOne({
    where: { replyId: id },
  });

  if (reply) {
    const data = {
      reply: req.body.reply || reply.reply,
    };

    let { reply } = data;
    const updatedReply = await models.Reply.update(
      {
        reply,
      },
      { where: { replyId: id } }
    );

    if (updatedReply == 1) {
      res.send('Reply update successful');
    } else {
      res.send('Reply update unsuccessful');
    }
  } else {
    res.status(404);
    throw new Error('Reply not found');
  }
});

// @desc    Delete a reply     /////////////////////////////////////////////// pending
// @route   DELETE /api/reply/:id
// @access  Private
exports.deleteReply = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const reply = await models.Reply.findOne({
    where: { replyId: id },
  });

  if (reply) {
    models.Reply.destroy({
      where: { replyId: id },
    })
      .then((num) => {
        if (num == 1) {
          res.json('Reply has been deleted successfully');
        } else {
          res.json('Cannot delete the Reply');
        }
      })
      .catch((err) => console.log(err));
  } else {
    res.status(401);
    throw new Error('Reply not found');
  }
});
