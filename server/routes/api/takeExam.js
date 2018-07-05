const router = require('express').Router();
const TakeExamController = require('../../controllers/TakeExamController');

router.get('/fetchAllExam', TakeExamController.fetchAllExam);

router.get('/fetchEPRList', TakeExamController.fetchEPRList);

router.get('/fetchExamId', TakeExamController.fetchExamId);

router.get('/checkProgress', TakeExamController.findUploadedCategory);

router.post('/uploadAnswer', TakeExamController.updateAnswer);

module.exports = router;
