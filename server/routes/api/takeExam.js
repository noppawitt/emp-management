const router = require('express').Router();
const TakeExamController = require('../../controllers/TakeExamController');

router.get('/fetchAllExam', TakeExamController.fetchAllExam);

router.post('/uploadAnswer', TakeExamController.updateAnswer);

router.post('/checkProgress', TakeExamController.findUploadedCategory);

module.exports = router;
