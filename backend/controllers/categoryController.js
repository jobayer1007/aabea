const asyncHandler = require('express-async-handler');
const models = require('../models/index');

///////////////////////////////////////////Category////////////////////////////////////////////////

// @desc    Create a new Category     /////////////////////////////////////////Announcement//////
// @route   POST /api/category
// @access  Private
exports.createNewCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const user = await models.User.findOne({
    where: { memberId: req.user.memberId },
  });
  if (user) {
    const newCategory = await models.Category.create({
      name,
      createdBy: user.memberId,
      lastUpdatedBy: user.memberId,
      chapterId: user.chapterId,
    });
    if (newCategory) {
      res.json('New Category Created Successfully');
    } else {
      res.status(400);
      throw new Error('Encountered problem while creating new Category');
    }
  } else {
    res.status(400);
    throw new Error('Encountered problem while creating new Category');
  }
});

// @desc    GET all Category     ///////////////////////////////////////////////
// @route   GET /api/category
// @access  Private
exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await models.Category.findAll();
  res.json(categories);
});

// @desc    Get an  category by Id     ///////////////////////////////////////////////
// @route   GET /api/category/:id
// @access  Private
exports.getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const category = await models.Category.findOne({
    where: { categoryId: id },
  });

  if (category) {
    res.json(category);
  } else {
    res.status(401);
    throw new Error('Category not found');
  }
});

// @desc   Update an  category by Id      ///////////////////////////////////////////////
// @route   PUT /api/category/:id
// @access  Private/Admin || SystemAdmin
exports.updateCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const category = await models.Category.findOne({
    where: { categoryId: id },
  });

  if (category) {
    const data = {
      name: req.body.name || category.name,
    };

    let { name } = data;
    const updatedCategory = await models.Category.update(
      {
        name,
      },
      { where: { categoryId: id } }
    );

    if (updatedCategory == 1) {
      res.send('category update successful');
    } else {
      res.send('category update unsuccessful');
    }
  } else {
    res.status(401);
    throw new Error('category not found');
  }
});

// @desc    Delete an category     /////////////////////////////////////////////// pending
// @route   DELETE /api/category/:id
// @access  Private/Admin
exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const category = await models.Category.findOne({
    where: { categoryId: id },
  });

  if (category) {
    models.Category.destroy({
      where: { categoryId: id },
    })
      .then((num) => {
        if (num == 1) {
          res.json('Category has been deleted successfully');
        } else {
          res.json('Cannot delete the Category');
        }
      })
      .catch((err) => console.log(err));
  } else {
    res.status(401);
    throw new Error('Category not found');
  }
});
