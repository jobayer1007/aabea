const dotenv = require('dotenv');
dotenv.config();
const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');

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

// @desc    Add a new Document     ///////////////////////////////////////////////
// @route   POST /api/doc/new
// @access  Private/SystemAdmin || admin
exports.addNewDocument = asyncHandler(async (req, res) => {
  const {
    documentType,
    documentName,
    documentDescription,
    document,
    checkChapter,
  } = req.body;

  // Find Chapter
  // let subDomain;
  // if (process.env.NODE_ENV === 'development') {
  //   subDomain = 'bd'; // at dev only
  // } else {
  //   subDomain = checkChapter.split('.')[0];
  // }
  const subDomain = checkChapter.split('.')[0];

  const chapter = await models.Chapter.findOne({
    where: { subDomain: subDomain },
  });

  if (chapter) {
    const t = await sequelize.transaction();

    try {
      await models.Document.create(
        {
          // documentType,
          documentName,
          documentDescription,
          document,
          createdBy: req.user.memberId,
          lastUpdatedBy: req.user.memberId,
          chapterId: chapter.chapterId,
        },
        { transaction: t }
      );

      await t.commit();
      res.json(`New document added successfully`);
    } catch (error) {
      await t.rollback();
      res.status(400);
      throw new Error(
        'Encountered problem while adding new document' + ' ' + error
      );
    }
  } else {
    res.status(404);
    throw new Error('Invalid Chapter Domain: ' + checkChapter);
  }
});

// @desc    GET all Documents     ///////////////////////////////////////////////
// @route   GET /api/doc/chapter/:checkChapter
// @access  Public/private
exports.getAllDocuments = asyncHandler(async (req, res) => {
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
    const documents = await models.Document.findAll({
      where: { chapterId: chapter.chapterId },
    });
    if (documents && documents.length !== 0) {
      res.json(documents);
    } else {
      res.status(404);
      throw new Error('No document');
    }
  } else {
    res.status(404);
    throw new Error('Invalid Chapter Domain: ' + checkChapter);
  }
});

// @desc    Get a Document by Id     ///////////////////////////////////////////////
// @route   GET /api/doc/:id
// @access  Public
exports.getDocumentById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  console.log('document Id :' + id);
  const document = await models.Document.findOne({
    where: { documentId: id },
  });

  if (document) {
    // console.log('document path: ' + document.document);
    // const file = path.join(path.resolve(), `${document.document}`);
    // console.log('file path: ' + file);
    // console.log(path.resolve());
    // const data = fs.readFileSync(file, 'utf-8');
    // console.log(`the data is ${data}`);

    // FOR LOCAL
    res.sendFile(
      path.join(path.resolve(), `${document.document}`),
      `${document.documentName}`,
      (err) => {
        if (err) {
          res.status(500).send('error' + err);
        } else {
          console.log('file was downloaded');
        }
      }
    );

    // FOR SERVER

    // res.send(document);
  } else {
    res.status(401);
    throw new Error('document not found');
  }
});

// @desc    Delete a Document by Id     /////////////////////////////////////////////// pending
// @route   DELETE /api/doc/:id
// @access  Private/Admin
exports.deleteDocument = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const document = await models.Document.findOne({
    where: { documentId: id },
  });

  if (document) {
    const t = await sequelize.transaction();

    try {
      models.Document.destroy(
        {
          where: { documentId: id },
        },
        { transaction: t }
      );

      await t.commit();
      res.json('The document has been deleted successfully');
    } catch (error) {
      await t.rollback();
      res.status(401);
      throw new Error(
        'Encountered problem while deleting the document' + ' ' + error
      );
    }
  } else {
    res.status(401);
    throw new Error('Document was not found');
  }
});
