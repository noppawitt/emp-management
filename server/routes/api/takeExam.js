const router = require('express').Router();
const TakeExamController = require('../../controllers/TakeExamController');

router.get('/fetchAllExam', TakeExamController.fetchAllExam);

router.post('/uploadAnswer', TakeExamController.updateAnswer);

module.exports = router;
