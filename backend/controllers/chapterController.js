const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { sendConfirmationEmail } = require('./mailer');
const User = require('../models/User');
const Member = require('../models/Member');
const models = require('../models/index');
const generateToken = require('../utils/generateToken');

// @desc    Create a new Chapter     ///////////////////////////////////////////////
// @route   POST /api/chapters/new
// @access  Private/SystemAdmin
exports.createNewChapter = asyncHandler(async (req, res) => {
  const { chapterName, chapterAddress, chapterEmail, chapterPhone } = req.body;

  const chapterNameExists = await models.Chapter.findOne({
    where: { chapterName: chapterName },
  }); // Check if the Chapter Name already registered
  if (!chapterNameExists) {
    const chapterEmailExists = await models.Chapter.findOne({
      where: { chapterEmail: chapterEmail },
    });
    if (!chapterEmailExists) {
      const newChapter = await models.Chapter.create({
        chapterName,
        chapterAddress,
        chapterEmail,
        chapterPhone,
      });
      if (newChapter) {
        res.json('New Chapter Created Successfully');
      } else {
        res.status(400);
        throw new Error('Encountered problem while creating new chapter');
      }
    } else {
      res.status(400);
      throw new Error(
        'A Chapter with Chapter Email:' +
          chapterEmailExists.chapterEmail +
          ' already exist' +
          'where Chapter Name:' +
          chapterEmailExists.chapterName
      );
    }
  } else {
    res.status(400);
    throw new Error(
      'A Chapter with Chapter Name:' +
        chapterNameExists.chapterName +
        ' already exist'
    );
  }
});

// @desc    GET all Chapters     ///////////////////////////////////////////////
// @route   GET /api/chapters
// @access  Private/SystemAdmin
exports.getChapters = asyncHandler(async (req, res) => {
  const chapters = await models.Chapter.findAll();
  if (chapters && chapters.length !== 0) {
    res.json(chapters);
  } else {
    res.status(401);
    throw new Error('No Chapter found');
  }
  // const members = await models.Member.findAll();
  // res.json(members);
});

// @desc    Delete a PaymentType     /////////////////////////////////////////////// pending
// @route   DELETE /api/chapters/:id
// @access  Private/Admin
exports.deleteChapter = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const chapter = await models.Chapter.findOne({
    where: { chapterId: id },
  });

  if (chapter) {
    models.Chapter.destroy({
      where: { chapterId: id },
    })
      .then((num) => {
        if (num == 1) {
          res.json('Chapter has been deleted successfully');
        } else {
          res.json('Cannot delete the Chapter');
        }
      })
      .catch((err) => console.log(err));
  } else {
    res.status(401);
    throw new Error('Chapter not found');
  }
});

// @desc    Create a new Payment Type     ///////////////////////////////////////////////
// @route   POST /api/chapters/paymentType
// @access  Private/Admin
exports.createNewPaymentType = asyncHandler(async (req, res) => {
  const {
    paymentTypeName,
    paymentTypeAmount,
    paymentTypeDescription,
  } = req.body;

  const paymentType = await models.PaymentType.findOne({
    where: { paymentTypeName: paymentTypeName },
  }); // Check if the Chapter Name already registered
  if (!paymentType) {
    const newPaymentType = await models.PaymentType.create({
      paymentTypeName,
      paymentTypeAmount,
      paymentTypeDescription,
      chapterId: req.user.chapterId,
    });
    if (newPaymentType) {
      res.json('New Payment Type Created Successfully');
    } else {
      res.status(400);
      throw new Error('Encountered problem while creating new chapter');
    }
  } else {
    res.status(400);
    throw new Error(
      'A Payment Type with Name:' +
        paymentType.paymentTypeName +
        ' already exist' +
        'where Payment Amount is:' +
        paymentType.paymentTypeAmount
    );
  }
});

// @desc    GET all Payment Types     ///////////////////////////////////////////////
// @route   GET /api/chapters/paymentType
// @access  Private
exports.getPaymentTypes = asyncHandler(async (req, res) => {
  const paymentTypes = await models.PaymentType.findAll();

  if (paymentTypes && paymentTypes.length !== 0) {
    res.json(paymentTypes);
  } else {
    res.status(404);
    throw new Error('No Payment Types Found');
  }
  // const members = await models.Member.findAll();
  // res.json(members);
});

// @desc    Delete a PaymentType     /////////////////////////////////////////////// pending
// @route   DELETE /api/chapters/paymentType/:id
// @access  Private/Admin
exports.deletePaymentType = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const paymentType = await models.PaymentType.findOne({
    where: { paymentTypeId: id },
  });
  console.log(paymentType.paymentTypeId);
  console.log(paymentType.paymentTypeName);

  if (paymentType) {
    models.PaymentType.destroy({
      where: { paymentTypeId: id },
    })
      .then((num) => {
        if (num == 1) {
          res.json({ message: 'Payment Type has been deleted successfully' });
        } else {
          res.json({ message: 'Cannot delete the Payment Type' });
        }
      })
      .catch((err) => console.log(err));
  } else {
    res.status(401);
    throw new Error('Payment Type not found');
  }
});

///////////////////////////////////////////MISSION////////////////////////////////////////////////

// @desc    Create a new MISSION     /////////////////////////////////////////MISSION//////
// @route   POST /api/chapters/mission
// @access  Private/SystemAdmin || Admin
exports.createMission = asyncHandler(async (req, res) => {
  const { title, body, id } = req.body;

  const user = await models.User.findOne({ where: { memberId: id } });
  if (user) {
    const newMission = await models.Mission.create({
      title,
      body,
      chapterId: user.chapterId,
      createdby: user.memberId,
    });
    if (newMission) {
      res.json('New Mission Created Successfully');
    } else {
      res.status(400);
      throw new Error('Encountered problem while creating new Mission');
    }
  } else {
    res.status(400);
    throw new Error('Encountered problem while creating new Mission');
  }
});

// @desc    GET Mission     ///////////////////////////////////////////////
// @route   GET /api/chapters/mission
// @access  Private/SystemAdmin || Admin
exports.getMission = asyncHandler(async (req, res) => {
  const mission = await models.Mission.findAll();
  res.json(mission);
});

// @desc    Get Mission by Id     ///////////////////////////////////////////////
// @route   GET /api/chapters/mission/:id
// @access  Private/Admin || SystemAdmin
exports.getMissionById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const mission = await models.Mission.findOne({
    where: { chapterId: id },
  });

  if (mission) {
    res.json(mission);
  } else {
    res.status(401);
    throw new Error('mission not found');
  }
});

// @desc   Update an  announcement by Id      ///////////////////////////////////////////////
// @route   PUT /api/chapters/mission/:id
// @access  Private/Admin || SystemAdmin
exports.updateMissionById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const mission = await models.Mission.findOne({
    where: { chapterId: id },
  });

  if (mission) {
    const data = {
      title: req.body.title || mission.title,
      body: req.body.body || mission.body,
    };

    let { title, body } = data;
    const updatedMission = await models.Mission.update(
      {
        title,
        body,
      },
      { where: { chapterId: id } }
    );

    if (updatedMission == 1) {
      res.send('Mission update successful');
    } else {
      res.send('Mission update unsuccessful');
    }
  } else {
    res.status(401);
    throw new Error('Mission not found');
  }
});

// @desc    Delete an Announcement     /////////////////////////////////////////////// pending
// @route   DELETE /api/chapters/mission/:id
// @access  Private/Admin
exports.deleteMission = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const mission = await models.Mission.findOne({
    where: { chapterId: id },
  });

  if (mission) {
    models.Mission.destroy({
      where: { chapterId: id },
    })
      .then((num) => {
        if (num == 1) {
          res.json('Mission has been deleted successfully');
        } else {
          res.json('Cannot delete the Mission');
        }
      })
      .catch((err) => console.log(err));
  } else {
    res.status(401);
    throw new Error('Mission not found');
  }
});

///////////////////////////////////////////VISSION////////////////////////////////////////////////

// @desc    Create a new VISSION     /////////////////////////////////////////VISSION//////
// @route   POST /api/chapters/vission
// @access  Private/SystemAdmin || Admin
exports.createVission = asyncHandler(async (req, res) => {
  const { title, body, id } = req.body;

  const user = await models.User.findOne({ where: { memberId: id } });
  if (user) {
    const newVission = await models.Vission.create({
      title,
      body,
      chapterId: user.chapterId,
      createdby: user.memberId,
    });
    if (newVission) {
      res.json('Vission Created Successfully');
    } else {
      res.status(400);
      throw new Error('Encountered problem while creating Vission');
    }
  } else {
    res.status(400);
    throw new Error('Encountered problem while creating new Vission');
  }
});

// @desc    GET Vission     ///////////////////////////////////////////////
// @route   GET /api/chapters/vission
// @access  Private/SystemAdmin || Admin
exports.getVission = asyncHandler(async (req, res) => {
  const vission = await models.Vission.findAll();
  res.json(vission);
});

// @desc    Get Vission by Id     ///////////////////////////////////////////////
// @route   GET /api/chapters/vission/:id
// @access  Private/Admin || SystemAdmin
exports.getVissionById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const vission = await models.Vission.findOne({
    where: { chapterId: id },
  });

  if (vission) {
    res.json(vission);
  } else {
    res.status(401);
    throw new Error('vission not found');
  }
});

// @desc   Update an  vission by Id      ///////////////////////////////////////////////
// @route   PUT /api/chapters/vission/:id
// @access  Private/Admin || SystemAdmin
exports.updateVissionById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const vission = await models.Vission.findOne({
    where: { chapterId: id },
  });

  if (vission) {
    const data = {
      title: req.body.title || vission.title,
      body: req.body.body || vission.body,
    };

    let { title, body } = data;
    const updatedVission = await models.Vission.update(
      {
        title,
        body,
      },
      { where: { chapterId: id } }
    );

    if (updatedVission == 1) {
      res.send('Vission update successful');
    } else {
      res.send('Vission update unsuccessful');
    }
  } else {
    res.status(401);
    throw new Error('Vission not found');
  }
});

// @desc    Delete an Vission     /////////////////////////////////////////////// pending
// @route   DELETE /api/chapters/announcements/:id
// @access  Private/Admin
exports.deleteVission = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const vission = await models.Vission.findOne({
    where: { chapterId: id },
  });

  if (vission) {
    models.Vission.destroy({
      where: { chapterId: id },
    })
      .then((num) => {
        if (num == 1) {
          res.json('Vission has been deleted successfully');
        } else {
          res.json('Cannot delete the Vission');
        }
      })
      .catch((err) => console.log(err));
  } else {
    res.status(401);
    throw new Error('Vission not found');
  }
});

///////////////////////////////////////////HISTORY////////////////////////////////////////////////

// @desc    Create a new HISTORY     /////////////////////////////////////////HISTORY//////
// @route   POST /api/chapters/history
// @access  Private/SystemAdmin || Admin
exports.createHistory = asyncHandler(async (req, res) => {
  const { title, body, id } = req.body;

  const user = await models.User.findOne({ where: { memberId: id } });
  if (user) {
    const newHistory = await models.History.create({
      title,
      body,
      chapterId: user.chapterId,
      createdby: user.memberId,
    });
    if (newHistory) {
      res.json('History Created Successfully');
    } else {
      res.status(400);
      throw new Error('Encountered problem while creating History');
    }
  } else {
    res.status(400);
    throw new Error('Encountered problem while creating new History');
  }
});

// @desc    GET history     ///////////////////////////////////////////////
// @route   GET /api/chapters/history
// @access  Private/SystemAdmin || Admin
exports.getHistory = asyncHandler(async (req, res) => {
  const history = await models.History.findAll();
  res.json(history);
});

// @desc    Get History by Id     ///////////////////////////////////////////////
// @route   GET /api/chapters/history/:id
// @access  Private/Admin || SystemAdmin
exports.getHistoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const history = await models.History.findOne({
    where: { chapterId: id },
  });

  if (history) {
    res.json(history);
  } else {
    res.status(401);
    throw new Error('history not found');
  }
});

// @desc   Update history by Id      ///////////////////////////////////////////////
// @route   PUT /api/chapters/history/:id
// @access  Private/Admin || SystemAdmin
exports.updateHistoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const history = await models.History.findOne({
    where: { chapterId: id },
  });

  if (history) {
    const data = {
      title: req.body.title || history.title,
      body: req.body.body || history.body,
    };

    let { title, body } = data;
    const updatedHistory = await models.History.update(
      {
        title,
        body,
      },
      { where: { chapterId: id } }
    );

    if (updatedHistory == 1) {
      res.send('History update successful');
    } else {
      res.send('History update unsuccessful');
    }
  } else {
    res.status(401);
    throw new Error('History not found');
  }
});

// @desc    Delete history     /////////////////////////////////////////////// pending
// @route   DELETE /api/chapters/history/:id
// @access  Private/Admin
exports.deleteHistory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const history = await models.History.findOne({
    where: { chapterId: id },
  });

  if (history) {
    models.History.destroy({
      where: { chapterId: id },
    })
      .then((num) => {
        if (num == 1) {
          res.json('History has been deleted successfully');
        } else {
          res.json('Cannot delete the History');
        }
      })
      .catch((err) => console.log(err));
  } else {
    res.status(401);
    throw new Error('History not found');
  }
});
