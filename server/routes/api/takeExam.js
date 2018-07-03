const router = require('express').Router();
const TakeExamController = require('../../controllers/TakeExamController');

router.get('/fetchEPRList', TakeExamController.fetchEPRList);

router.get('/fetchAllExam', TakeExamController.fetchAllExam);

module.exports = router;
