const asyncHandler = require('express-async-handler');
const Sequelize = require('sequelize');
const { Comment, Reply } = require('../models/index');
// const Comment = require('../models/Comment');
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

///////////////////////////////////////////Blog////////////////////////////////////////////////

// @desc    Create a new Blog     /////////////////////////////////////////Announcement//////
// @route   POST /api/blog
// @access  Private
exports.createNewBlog = asyncHandler(async (req, res) => {
  const { title, body, category, photoId } = req.body;

  const user = await models.Member.findOne({
    where: { memberId: req.user.memberId },
  });
  if (user) {
    const categoryExist = await models.Category.findOne({
      where: { name: category },
    });

    if (categoryExist) {
      const newBlog = await models.Blog.create({
        title,
        body,
        userId: user.memberId,
        userName: user.firstName + ' ' + user.lastName,
        profilePicture: user.profilePicture,
        categoryId: categoryExist.categoryId,
        photoId,
        chapterId: user.chapterId,
      });
      if (newBlog) {
        res.json('New Blog Created Successfully');
      } else {
        res.status(400);
        throw new Error('Encountered problem while creating new Blog');
      }
    } else {
      const t = await sequelize.transaction();
      // console.log(user.memberId);

      try {
        const newCategory = await models.Category.create(
          {
            name: category,
            createdBy: user.memberId,
            lastUpdatedBy: user.memberId,
            chapterId: user.chapterId,
          },
          { transaction: t }
        );

        await models.Blog.create(
          {
            title,
            body,
            userId: user.memberId,
            userName: user.firstName + ' ' + user.lastName,
            profilePicture: user.profilePicture,
            categoryId: newCategory.categoryId,
            photoId,
            chapterId: user.chapterId,
          },
          { transaction: t }
        );

        await t.commit();
        res.json('New Blog Created Successfully');
      } catch (error) {
        await t.rollback();
        res
          // .status(400)
          .send(
            'msg: Encountered a problem while creating blog, error:' + error
          );
      }
    }
  } else {
    res.status(400);
    throw new Error('Encountered problem while creating new Blog');
  }
});

// @desc    GET all Blog     ///////////////////////////////////////////////
// @route   GET /api/blog/chapter/:checkChapter
// @access  Private
exports.getBlogs = asyncHandler(async (req, res) => {
  let subDomain;
  if (process.env.NODE_ENV === 'development') {
    subDomain = 'bd'; // at dev only
  }
  const { checkChapter } = req.params;
  // const subDomain = checkChapter.split('.')[0];

  const chapter = await models.Chapter.findOne({
    where: { subDomain: subDomain },
  });

  if (chapter) {
    const blogs = await models.Blog.findAll({
      where: { chapterId: chapter.chapterId },
    });
    res.json(blogs);
  } else {
    res.status(401);
    throw new Error('Invalid chapter reference: ' + checkChapter);
  }
});

// @desc    Get an  blog by Id     ///////////////////////////////////////////////
// @route   GET /api/blog/:id
// @access  Private
exports.getBlogById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    // const blog = await models.Blog.findOne(
    //   {
    //     where: { blogId: id },
    //     // include: [models.Comment({ include: [models.Reply] })],
    //     include: [{ model: Comment }],
    //   }
    //   // { include: models.Comment }
    // );

    const blog = await models.Blog.findOne({
      where: { blogId: id },
      include: [
        {
          model: Comment,

          include: [
            {
              model: Reply,
            },
          ],
        },
      ],
    });

    // console.log(blog);
    if (blog) {
      res.json(blog);
    }
  } catch (error) {
    res.status(401);
    throw new Error('Blog not found' + error);
  }
});

// @desc   Update a blog by Id      ///////////////////////////////////////////////
// @route   PUT /api/blog/:id
// @access  Private
exports.updateBlogById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const blog = await models.Blog.findOne({
    where: { blogId: id },
  });

  if (blog) {
    const data = {
      title: req.body.title || blog.title,
      body: req.body.body || blog.body,
      categoryId: req.body.categoryId || blog.categoryId,
      photoId: req.body.photoId || blog.photoId,
    };

    let { title, body, categoryId, photoId } = data;
    const updatedBlog = await models.Blog.update(
      {
        title,
        body,
        categoryId,
        photoId,
      },
      { where: { blogId: id } }
    );

    if (updatedBlog == 1) {
      res.send('blog update successful');
    } else {
      res.send('blog update unsuccessful');
    }
  } else {
    res.status(401);
    throw new Error('blog not found');
  }
});

// @desc    Delete a blog     /////////////////////////////////////////////// pending
// @route   DELETE /api/blog/:id
// @access  Private/Admin
exports.deleteblog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const blog = await models.Blog.findOne({
    where: { blogId: id },
  });

  if (blog) {
    models.Blog.destroy({
      where: { blogId: id },
    })
      .then((num) => {
        if (num == 1) {
          res.json('Blog has been deleted successfully');
        } else {
          res.json('Cannot delete the Blog');
        }
      })
      .catch((err) => console.log(err));
  } else {
    res.status(401);
    throw new Error('Blog not found');
  }
});
